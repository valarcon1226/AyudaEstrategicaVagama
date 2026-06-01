/**
 * contact-form.js
 * Maneja el formulario de la Landing Page (contacto.html).
 * Envía el lead al webhook de n8n → Flow 3: Company Leads
 */

(function () {
  'use strict';

  const form    = document.getElementById('contact-form');
  const btn     = document.getElementById('submit-btn');
  const toast   = document.getElementById('success-toast');
  const toastErr= document.getElementById('error-toast');

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // ── 1. Recolectar datos del formulario
    const payload = {
      source:       'web-landing-contacto',
      timestamp:    new Date().toISOString(),
      empresa:      document.getElementById('empresa')?.value?.trim() || '',
      pais:         document.getElementById('pais')?.value || '',
      email:        document.getElementById('email')?.value?.trim() || '',
      cargos:       document.getElementById('cargos')?.value?.trim() || '',
      plan_interes: document.getElementById('plan')?.value || 'no especificado',
    };

    // ── 2. Validación básica
    if (!payload.empresa || !payload.email) {
      showToast(toastErr, 'Por favor completa todos los campos requeridos.');
      return;
    }

    if (!isValidEmail(payload.email)) {
      showToast(toastErr, 'Por favor ingresa un correo electrónico válido.');
      return;
    }

    // ── 3. Estado de carga
    setLoading(btn, true);

    try {
      // ── 4. Enviar al webhook n8n (Flow 3)
      const webhookUrl = window.AE?.n8n?.WEBHOOK_LEADS;

      if (!webhookUrl || webhookUrl.includes('TU_N8N')) {
        // Modo demo: simular éxito si no hay webhook configurado
        console.warn('[AE] n8n webhook no configurado — modo demo');
        await sleep(1200);
      } else {
        const res = await fetch(webhookUrl, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
      }

      // ── 5. Éxito
      form.reset();
      setLoading(btn, false, 'success');
      showToast(toast, '¡Solicitud enviada! Le contactaremos en menos de 24 horas.');

      // Resetear botón después de 5 segundos
      setTimeout(() => setLoading(btn, false, 'idle'), 5000);

    } catch (err) {
      console.error('[AE] Error enviando formulario:', err);
      setLoading(btn, false, 'idle');
      showToast(toastErr, 'Ocurrió un error. Por favor intente de nuevo o escríbanos directamente.');
    }
  });

  // ── Helpers ──────────────────────────────────────────────────

  function setLoading(button, loading, state = 'loading') {
    if (!button) return;

    const states = {
      loading: {
        html:     '<span class="material-symbols-outlined animate-spin">progress_activity</span> Enviando...',
        classes:  ['opacity-75', 'cursor-not-allowed'],
        disabled: true,
      },
      success: {
        html:     '<span class="material-symbols-outlined">check_circle</span> Solicitud enviada',
        classes:  ['bg-green-600', '!bg-green-600'],
        disabled: true,
      },
      idle: {
        html:     'Agendar Cita de Consultoría <span class="material-symbols-outlined">calendar_today</span>',
        classes:  [],
        disabled: false,
      },
    };

    const s = states[state] || states.idle;
    button.innerHTML = s.html;
    button.disabled  = s.disabled;

    // Limpiar clases de estado previas
    button.classList.remove('opacity-75', 'cursor-not-allowed', 'bg-green-600');
    s.classes.forEach(cls => button.classList.add(cls));
  }

  function showToast(el, message) {
    if (!el) return;
    const msgEl = el.querySelector('[data-toast-message]');
    if (msgEl) msgEl.textContent = message;

    el.classList.remove('hidden', 'opacity-0');
    el.classList.add('toast-enter');

    setTimeout(() => {
      el.classList.add('opacity-0');
      setTimeout(() => {
        el.classList.add('hidden');
        el.classList.remove('opacity-0', 'toast-enter');
      }, 400);
    }, 5000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

})();
