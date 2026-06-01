/**
 * supabase-client.js
 * Configuración del cliente Supabase para el Frontend público.
 *
 * ⚠️  IMPORTANTE:
 *  - La ANON KEY es segura en el frontend (respeta las políticas RLS).
 *  - NUNCA pongas la SERVICE KEY aquí.
 *  - Reemplaza los valores de SUPABASE_URL y SUPABASE_ANON_KEY
 *    con los de tu proyecto en: https://supabase.com/dashboard → Settings → API
 */

// ─── Configuración ───────────────────────────────────────────
const SUPABASE_URL      = 'https://TU_PROYECTO.supabase.co';  // ← reemplazar
const SUPABASE_ANON_KEY = 'TU_ANON_KEY_AQUI';                // ← reemplazar

// Carga el cliente de Supabase (via CDN en el HTML)
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── URLs de Webhooks n8n ─────────────────────────────────────
// Reemplaza con las URLs públicas de tu instancia n8n
const N8N = {
  WEBHOOK_LEADS: 'https://TU_N8N.com/webhook/company-leads',  // Flow 3
  WEBHOOK_CV:    'https://TU_N8N.com/webhook/cv-upload',       // Flow 2
};

// ─── Exports globales ─────────────────────────────────────────
window.AE = window.AE || {};
window.AE.db  = db;
window.AE.n8n = N8N;

console.log('[AE] Supabase client initialized ✓');
