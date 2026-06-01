/**
 * auth.js — Dashboard Privado
 * Maneja la autenticación con Supabase Auth.
 * Protege todas las páginas del dashboard.
 */

// ── Config Supabase (panel privado — misma instancia, ANON key)
const SUPABASE_URL      = 'https://mrwxqnqieemykkxlylkr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_4FNzCfISif9FQkrxAO2cMA_IykrXWEP';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Exponer globalmente para los demás módulos del dashboard
window.AE = window.AE || {};
window.AE.db = db;

/**
 * Verifica si hay sesión activa.
 * Si no hay sesión, redirige al login.
 * Llamar en el <head> de cada página del dashboard.
 */
async function requireAuth() {
  const { data: { session } } = await db.auth.getSession();

  if (!session) {
    window.location.href = 'login.html';
    return null;
  }

  // Cargar perfil del usuario
  const { data: perfil } = await db
    .from('perfiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  window.AE.user    = session.user;
  window.AE.perfil  = perfil;
  window.AE.session = session;

  // Actualizar UI con el nombre del usuario
  const userNameEl = document.getElementById('user-name');
  if (userNameEl) userNameEl.textContent = perfil?.nombre || session.user.email;

  return session;
}

/**
 * Cierra sesión y redirige al login.
 */
async function signOut() {
  await db.auth.signOut();
  window.location.href = 'login.html';
}

// Escuchar cambios de estado de auth
db.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    window.location.href = 'login.html';
  }
});
