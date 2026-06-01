/**
 * cv-upload.js
 * Maneja el upload de CVs y el formulario de aplicación a vacantes.
 * Flujo:
 *   1. Usuario llena el form + adjunta su CV (PDF)
 *   2. PDF sube a Supabase Storage (bucket 'cvs')
 *   3. Se crea registro en tabla 'aplicaciones' con la URL del CV
 *   4. Se dispara el webhook n8n → Flow 2: Filter Applicants
 */

(function () {
  'use strict';

  const form       = document.getElementById('apply-form');
  const fileInput  = document.getElementById('cv-file');
  const fileLabel  = document.getElementById('file-label');
  const submitBtn  = document.getElementById('apply-btn');
  const successMsg = document.getElementById('apply-success');
  const errorMsg   = document.getElementById('apply-error');

  if (!form) return;

  // ── Leer ID de la vacante desde la URL (?id=xxx)
  const params    = new URLSearchParams(window.location.search);
  const vacanteId = params.get('id');

  if (!vacanteId) {
    console.warn('[AE] No se encontró ID de vacante en la URL');
  }

  // ── Preview del archivo seleccionado ─────────────────────────
  if (fileInput && fileLabel) {
    fileInput.addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
        fileLabel.textContent = `✓ ${file.name} (${formatBytes(file.size)})`;
        fileLabel.classList.add('text-secondary', 'font-semibold');
      }
    });
  }

  // ── Submit del formulario ─────────────────────────────────────
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const file = fileInput?.files[0];
    const payload = {
      nombre:           document.getElementById('nombre')?.value?.trim() || '',
      apellido:         document.getElementById('apellido')?.value?.trim() || '',
      email:            document.getElementById('apply-email')?.value?.trim() || '',
      telefono:         document.getElementById('telefono')?.value?.trim() || '',
      pais:             document.getElementById('apply-pais')?.value || '',
      ciudad:           document.getElementById('ciudad')?.value?.trim() || '',
      experiencia_anos: parseInt(document.getElementById('experiencia')?.value) || 0,
      linkedin_url:     document.getElementById('linkedin')?.value?.trim() || '',
      vacante_id:       vacanteId,
    };

    // Validación básica
    if (!payload.nombre || !payload.email) {
      showMsg(errorMsg, 'Por favor completa nombre y correo electrónico.');
      return;
    }
    if (!file) {
      showMsg(errorMsg, 'Por favor adjunta tu hoja de vida en formato PDF.');
      return;
    }
    if (file.type !== 'application/pdf') {
      showMsg(errorMsg, 'Solo se aceptan archivos PDF.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showMsg(errorMsg, 'El archivo es muy grande. Máximo 5 MB.');
      return;
    }

    setLoading(true);

    try {
      const db = window.AE?.db;
      let cvUrl = null;

      // ── 1. Subir CV a Supabase Storage ──────────────────────
      if (db) {
        const timestamp  = Date.now();
        const safeName   = `${timestamp}_${payload.email.replace(/[^a-z0-9]/gi, '_')}.pdf`;
        const storagePath = `${vacanteId || 'sin-vacante'}/${safeName}`;

        const { data: uploadData, error: uploadError } = await db.storage
          .from('cvs')
          .upload(storagePath, file, {
            contentType: 'application/pdf',
            upsert: false,
          });

        if (uploadError) throw uploadError;

        // Obtener URL firmada (válida 1 año — recruiters la usarán)
        const { data: signedUrl } = await db.storage
          .from('cvs')
          .createSignedUrl(storagePath, 60 * 60 * 24 * 365);

        cvUrl = signedUrl?.signedUrl || storagePath;

        // ── 2. Insertar aplicación en PostgreSQL ─────────────
        const { error: dbError } = await db
          .from('aplicaciones')
          .insert({
            ...payload,
            cv_url: cvUrl,
            estado: 'recibido',
          });

        if (dbError) throw dbError;
      } else {
        // Modo demo
        console.warn('[AE] Supabase no configurado — modo demo');
        await sleep(1500);
        cvUrl = 'demo-cv-url';
      }

      // ── 3. Notificar a n8n → Flow 2 ─────────────────────────
      const webhookUrl = window.AE?.n8n?.WEBHOOK_CV;
      if (webhookUrl && !webhookUrl.includes('TU_N8N')) {
        await fetch(webhookUrl, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({
            ...payload,
            cv_url:    cvUrl,
            source:    'web-job-board',
            timestamp: new Date().toISOString(),
          }),
        }).catch(err => console.warn('[AE] n8n webhook falló (no crítico):', err));
      }

      // ── 4. Éxito ─────────────────────────────────────────────
      form.classList.add('hidden');
      successMsg?.classList.remove('hidden');

    } catch (err) {
      console.error('[AE] Error al enviar aplicación:', err);
      showMsg(errorMsg, 'Ocurrió un error. Por favor intenta de nuevo o envíanos tu CV directamente a seleccion@ayudaestrategica.com');
    } finally {
      setLoading(false);
    }
  });

  // ── Helpers ───────────────────────────────────────────────────
  function setLoading(loading) {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    submitBtn.innerHTML = loading
      ? '<span class="material-symbols-outlined animate-spin">progress_activity</span> Enviando...'
      : 'Enviar mi Aplicación <span class="material-symbols-outlined">send</span>';
  }

  function showMsg(el, text) {
    if (!el) return;
    el.textContent = text;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 6000);
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

})();
