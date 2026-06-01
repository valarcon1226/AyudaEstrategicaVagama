/**
 * apply-form.js
 * Carga los detalles de la vacante y maneja el envío del formulario de postulación.
 */

(function () {
  'use strict';

  // Configuración de n8n para candidatos (Reemplazar con el Webhook real de n8n)
  window.AE = window.AE || {};
  window.AE.n8n = window.AE.n8n || {};
  const WEBHOOK_CANDIDATOS = 'TU_N8N_WEBHOOK_CANDIDATOS_AQUI';

  const form = document.getElementById('apply-form');
  const fileInput = document.getElementById('f_cv');
  const filenameDisplay = document.getElementById('cv-filename');
  const submitBtn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('success-msg');

  // Elementos de detalle de vacante
  const jobContainer = document.getElementById('job-content');
  const jobLoader = document.getElementById('job-loader');
  
  let currentJobTitle = 'Candidatura Espontánea';
  let currentJobId = null;

  // ── 1. Inicializar ──────────────────────────────────────────────
  async function init() {
    const params = new URLSearchParams(window.location.search);
    currentJobId = params.get('id');

    if (currentJobId) {
      await cargarDetallesVacante(currentJobId);
    } else {
      // Si no hay ID, mostrar modo "Aplicación General"
      jobLoader.classList.add('hidden');
      jobContainer.classList.remove('hidden');
      document.getElementById('job-title').textContent = 'Aplicación General';
      document.getElementById('job-description').textContent = 'Envíanos tu hoja de vida para tenerte en cuenta en futuras oportunidades que hagan match con tu perfil.';
    }

    setupFileInput();
    setupFormSubmit();
  }

  // ── 2. Cargar detalles de la vacante ───────────────────────────
  async function cargarDetallesVacante(id) {
    try {
      const db = window.AE?.db;
      if (!db) {
        console.warn('[AE] Supabase no configurado — no se puede cargar la vacante');
        jobLoader.classList.add('hidden');
        jobContainer.classList.remove('hidden');
        return;
      }

      const { data, error } = await db
        .from('vacantes')
        .select('*, empresas(nombre)')
        .eq('id', id)
        .single();

      if (error || !data) throw error || new Error('No encontrada');

      // Llenar UI
      currentJobTitle = data.titulo;
      document.getElementById('job-title').textContent = data.titulo;
      document.getElementById('job-company').textContent = data.empresas?.nombre || 'Ayuda Estratégica';
      document.getElementById('job-description').textContent = data.descripcion;
      document.getElementById('job-salary').textContent = data.salario_rango || 'A convenir';
      
      document.getElementById('job-modality').innerHTML = `<span class="material-symbols-outlined text-sm">home_work</span> ${capitalize(data.modalidad)}`;
      document.getElementById('job-location').innerHTML = `<span class="material-symbols-outlined text-sm">location_on</span> ${data.ubicacion || 'No especificada'}`;
      document.getElementById('job-experience').innerHTML = `<span class="material-symbols-outlined text-sm">workspace_premium</span> ${data.experiencia_min}+ años`;
      document.getElementById('job-category').innerHTML = `<span class="material-symbols-outlined text-sm">category</span> ${capitalize(data.categoria)}`;

    } catch (err) {
      console.error('Error cargando vacante:', err);
      document.getElementById('job-title').textContent = 'Vacante no encontrada';
      document.getElementById('job-description').textContent = 'La vacante que buscas no existe o ya ha sido cerrada.';
      form.style.display = 'none'; // Ocultar formulario si no existe
    } finally {
      jobLoader.classList.add('hidden');
      jobContainer.classList.remove('hidden');
    }
  }

  // ── 3. Manejo del input de archivo (CV) ─────────────────────────
  function setupFileInput() {
    if (!fileInput) return;
    
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB
          alert('El archivo es demasiado grande. Máximo 5MB.');
          fileInput.value = '';
          filenameDisplay.textContent = 'Ningún archivo seleccionado';
          return;
        }
        filenameDisplay.textContent = file.name;
        filenameDisplay.classList.add('text-[#115cb9]', 'font-bold');
      } else {
        filenameDisplay.textContent = 'Ningún archivo seleccionado';
        filenameDisplay.classList.remove('text-[#115cb9]', 'font-bold');
      }
    });
  }

  // ── 4. Envío del Formulario (FormData a n8n) ────────────────────
  function setupFormSubmit() {
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Preparar botón
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">progress_activity</span> Enviando...';
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-75');

      try {
        // Crear FormData para enviar tanto los campos de texto como el archivo binario
        const formData = new FormData(form);
        
        // Agregar campos del sistema
        formData.append('fecha_aplicacion', new Date().toISOString());
        formData.append('vacante_id', currentJobId || 'general');
        formData.append('vacante_titulo', currentJobTitle);

        // Enviar al Webhook de n8n
        if (WEBHOOK_CANDIDATOS.includes('TU_N8N')) {
          console.warn('[AE] Webhook de n8n no configurado. Simulando envío en modo demo...');
          await new Promise(r => setTimeout(r, 1500)); // Simular delay
        } else {
          const res = await fetch(WEBHOOK_CANDIDATOS, {
            method: 'POST',
            body: formData // No setear Content-Type, el navegador lo hace automáticamente para FormData
          });

          if (!res.ok) throw new Error('Error en la respuesta del servidor');
        }

        // Mostrar éxito
        form.classList.add('hidden');
        document.querySelector('#application-section > div.mb-10').classList.add('hidden');
        successMsg.classList.remove('hidden');

        // Scroll al mensaje de éxito
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });

      } catch (err) {
        console.error('Error enviando aplicación:', err);
        alert('Hubo un error al enviar tu postulación. Por favor intenta nuevamente.');
        
        // Restaurar botón
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-75');
      }
    });
  }

  // ── Helpers ─────────────────────────────────────────────────────
  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  document.addEventListener('DOMContentLoaded', init);

})();
