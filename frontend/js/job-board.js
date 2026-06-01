/**
 * job-board.js
 * Carga y muestra las vacantes activas desde Supabase.
 * Usado en: frontend/job-board.html
 */

(function () {
  'use strict';

  const container   = document.getElementById('vacantes-grid');
  const loader      = document.getElementById('vacantes-loader');
  const emptyState  = document.getElementById('vacantes-empty');
  const filterForm  = document.getElementById('filter-form');
  const searchInput = document.getElementById('search-input');
  const filterCat   = document.getElementById('filter-categoria');
  const filterMod   = document.getElementById('filter-modalidad');

  let todasLasVacantes = [];

  // ── Inicializar ───────────────────────────────────────────────
  async function init() {
    await cargarVacantes();
    setupFiltros();
  }

  // ── Cargar vacantes desde Supabase ────────────────────────────
  async function cargarVacantes() {
    try {
      showLoader(true);

      const db = window.AE?.db;

      if (!db) {
        // Modo demo: usar datos de ejemplo
        console.warn('[AE] Supabase no configurado — cargando datos demo');
        todasLasVacantes = getDemoVacantes();
      } else {
        const { data, error } = await db
          .from('vacantes')
          .select(`
            id, titulo, descripcion, ubicacion, modalidad,
            experiencia_min, categoria, salario_rango, created_at,
            empresas ( nombre, logo_url )
          `)
          .eq('estado', 'activa')
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false });

        if (error) throw error;
        todasLasVacantes = data || [];
      }

      renderVacantes(todasLasVacantes);

    } catch (err) {
      console.error('[AE] Error cargando vacantes:', err);
      showError();
    } finally {
      showLoader(false);
    }
  }

  // ── Renderizar tarjetas ───────────────────────────────────────
  function renderVacantes(vacantes) {
    if (!container) return;

    container.innerHTML = '';

    if (!vacantes || vacantes.length === 0) {
      emptyState?.classList.remove('hidden');
      return;
    }

    emptyState?.classList.add('hidden');

    vacantes.forEach(v => {
      const card = document.createElement('article');
      card.className = 'card group cursor-pointer hover:shadow-elevated transition-all duration-300';
      card.setAttribute('data-id', v.id);

      const empresa = v.empresas?.nombre || 'Ayuda Estratégica';
      const diasAgo = getDiasAtras(v.created_at);

      card.innerHTML = `
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-secondary text-xl">work</span>
            </div>
            <div>
              <p class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">${empresa}</p>
              <h3 class="font-bold text-on-surface text-lg leading-tight">${escapeHtml(v.titulo)}</h3>
            </div>
          </div>
          <span class="badge-activa shrink-0">Activa</span>
        </div>

        <p class="text-on-surface-variant text-sm leading-relaxed mb-5 line-clamp-2">
          ${escapeHtml(v.descripcion || 'Consulta los detalles de esta posición.')}
        </p>

        <div class="flex flex-wrap gap-2 mb-5">
          ${v.modalidad ? `<span class="chip">${getModalidadIcon(v.modalidad)} ${capitalize(v.modalidad)}</span>` : ''}
          ${v.ubicacion ? `<span class="chip"><span class="material-symbols-outlined text-xs">location_on</span> ${escapeHtml(v.ubicacion)}</span>` : ''}
          ${v.experiencia_min ? `<span class="chip"><span class="material-symbols-outlined text-xs">workspace_premium</span> ${v.experiencia_min}+ años</span>` : ''}
          ${v.categoria ? `<span class="chip">${capitalize(v.categoria)}</span>` : ''}
        </div>

        <div class="flex items-center justify-between">
          <span class="text-xs text-on-surface-variant">${diasAgo}</span>
          <a href="vacante.html?id=${v.id}"
             class="inline-flex items-center gap-1.5 text-secondary font-bold text-sm
                    hover:gap-3 transition-all duration-200 group-hover:text-primary">
            Ver posición
            <span class="material-symbols-outlined text-base">arrow_forward</span>
          </a>
        </div>
      `;

      container.appendChild(card);
    });
  }

  // ── Filtros ───────────────────────────────────────────────────
  function setupFiltros() {
    [searchInput, filterCat, filterMod].forEach(el => {
      if (el) el.addEventListener('input', aplicarFiltros);
    });
  }

  function aplicarFiltros() {
    const texto     = searchInput?.value?.toLowerCase() || '';
    const categoria = filterCat?.value || '';
    const modalidad = filterMod?.value || '';

    const filtradas = todasLasVacantes.filter(v => {
      const matchTexto = !texto ||
        v.titulo?.toLowerCase().includes(texto) ||
        v.descripcion?.toLowerCase().includes(texto) ||
        v.ubicacion?.toLowerCase().includes(texto);

      const matchCategoria = !categoria || v.categoria === categoria;
      const matchModalidad = !modalidad || v.modalidad === modalidad;

      return matchTexto && matchCategoria && matchModalidad;
    });

    renderVacantes(filtradas);
  }

  // ── Helpers ───────────────────────────────────────────────────
  function showLoader(show) {
    loader?.classList.toggle('hidden', !show);
    container?.classList.toggle('hidden', show);
  }

  function showError() {
    if (container) {
      container.innerHTML = `
        <div class="col-span-full text-center py-16 text-on-surface-variant">
          <span class="material-symbols-outlined text-5xl block mb-4 opacity-30">error</span>
          <p class="font-medium">No pudimos cargar las vacantes. Intenta de nuevo.</p>
        </div>
      `;
    }
  }

  function getDiasAtras(dateStr) {
    if (!dateStr) return '';
    const dias = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
    if (dias === 0) return 'Publicada hoy';
    if (dias === 1) return 'Publicada ayer';
    return `Hace ${dias} días`;
  }

  function getModalidadIcon(m) {
    const icons = { presencial: '🏢', hibrido: '🔄', remoto: '🏠' };
    return icons[m] || '💼';
  }

  function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function getDemoVacantes() {
    return [
      {
        id: 'demo-1', titulo: 'Auxiliar de Enfermería', descripcion: 'Se requiere auxiliar con licencia vigente y mínimo 1 año de experiencia en clínicas o centros médicos.',
        ubicacion: 'Bogotá', modalidad: 'presencial', experiencia_min: 1, categoria: 'operativo',
        salario_rango: '1.8M - 2.5M COP', created_at: new Date(Date.now() - 86400000).toISOString(),
        empresas: { nombre: 'Medycare Colombia', logo_url: null }
      },
      {
        id: 'demo-2', titulo: 'Gerente de Operaciones', descripcion: 'Perfil ejecutivo con experiencia en logística y cadena de suministro. Manejo de equipos de +50 personas.',
        ubicacion: 'CDMX', modalidad: 'hibrido', experiencia_min: 5, categoria: 'ejecutivo',
        salario_rango: '35k - 50k MXN', created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
        empresas: { nombre: 'Transportes Rincón', logo_url: null }
      },
      {
        id: 'demo-3', titulo: 'Asesor Comercial Senior', descripcion: 'Perfil comercial con manejo de CRM, prospección B2B y cumplimiento de metas de ventas mensuales.',
        ubicacion: 'Medellín', modalidad: 'presencial', experiencia_min: 3, categoria: 'táctico',
        salario_rango: '3M - 5M COP + comisiones', created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
        empresas: { nombre: 'Ayuda Estratégica', logo_url: null }
      },
    ];
  }

  // ── Arrancar ──────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', init);

})();
