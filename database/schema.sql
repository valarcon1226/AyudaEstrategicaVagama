-- ============================================================
-- SCHEMA: Ayuda Estratégica HR Platform
-- Base de datos: PostgreSQL (Supabase)
-- Ejecutar en: Supabase SQL Editor
-- ============================================================

-- 1. EMPRESAS (Clientes de Ayuda Estratégica)
-- ============================================================
CREATE TABLE IF NOT EXISTS empresas (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre      TEXT NOT NULL,
  pais        TEXT,
  sector      TEXT,
  email       TEXT,
  telefono    TEXT,
  logo_url    TEXT,         -- URL en Supabase Storage
  notas       TEXT,
  estado      TEXT DEFAULT 'activo' CHECK (estado IN ('activo','inactivo','prospecto')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. VACANTES (Publicadas por Ayuda Estratégica para sus clientes)
-- ============================================================
CREATE TABLE IF NOT EXISTS vacantes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id      UUID REFERENCES empresas(id) ON DELETE SET NULL,
  titulo          TEXT NOT NULL,
  descripcion     TEXT,
  requisitos      TEXT,
  ubicacion       TEXT,
  modalidad       TEXT DEFAULT 'presencial' CHECK (modalidad IN ('presencial','hibrido','remoto')),
  experiencia_min INT DEFAULT 0,      -- años mínimos de experiencia
  categoria       TEXT,               -- ej: 'operativo', 'táctico', 'ejecutivo'
  salario_rango   TEXT,               -- ej: '3M - 5M COP'
  estado          TEXT DEFAULT 'activa' CHECK (estado IN ('activa','cerrada','en_proceso','pausada')),
  publicada_en    TEXT[] DEFAULT '{}', -- ['linkedin', 'indeed', 'web']
  featured        BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 3. APLICACIONES (Candidatos que aplican a vacantes)
-- ============================================================
CREATE TABLE IF NOT EXISTS aplicaciones (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vacante_id      UUID REFERENCES vacantes(id) ON DELETE CASCADE,
  nombre          TEXT NOT NULL,
  apellido        TEXT,
  email           TEXT NOT NULL,
  telefono        TEXT,
  pais            TEXT,
  ciudad          TEXT,
  cv_url          TEXT,              -- URL en Supabase Storage (PDF)
  linkedin_url    TEXT,
  experiencia_anos INT,
  estado          TEXT DEFAULT 'recibido' CHECK (
    estado IN (
      'recibido',       -- recién llegó
      'primer_filtro',  -- revisado por n8n / primer screening
      'calificado',     -- pasa al recruiter
      'entrevista',     -- en proceso de entrevista
      'terna',          -- en terna final
      'descartado',     -- no aplica
      'contratado'      -- proceso cerrado exitoso
    )
  ),
  notas           TEXT,              -- notas internas del recruiter
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CITAS (Agenda del recruiter — empresas y candidatos)
-- ============================================================
CREATE TABLE IF NOT EXISTS citas (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo            TEXT NOT NULL CHECK (tipo IN ('empresa','candidato','interna','seguimiento')),
  empresa_id      UUID REFERENCES empresas(id) ON DELETE SET NULL,
  aplicacion_id   UUID REFERENCES aplicaciones(id) ON DELETE SET NULL,
  titulo          TEXT NOT NULL,
  descripcion     TEXT,
  fecha_hora      TIMESTAMPTZ NOT NULL,
  duracion_min    INT DEFAULT 60,
  estado          TEXT DEFAULT 'pendiente' CHECK (
    estado IN ('pendiente','confirmada','completada','cancelada','reagendada')
  ),
  modalidad       TEXT DEFAULT 'virtual' CHECK (modalidad IN ('virtual','presencial','telefonica')),
  link_reunion    TEXT,              -- Google Meet / Zoom URL
  notas           TEXT,
  google_event_id TEXT,              -- ID del evento en Google Calendar (Flow 4)
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PERFILES (Extiende auth.users de Supabase para recruiters/admins)
-- ============================================================
CREATE TABLE IF NOT EXISTS perfiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre      TEXT,
  apellido    TEXT,
  rol         TEXT DEFAULT 'recruiter' CHECK (rol IN ('recruiter','admin','viewer')),
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE empresas    ENABLE ROW LEVEL SECURITY;
ALTER TABLE vacantes    ENABLE ROW LEVEL SECURITY;
ALTER TABLE aplicaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE citas       ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfiles    ENABLE ROW LEVEL SECURITY;

-- VACANTES: lectura pública (para el Job Board), escritura solo autenticados
CREATE POLICY "vacantes_lectura_publica"
  ON vacantes FOR SELECT
  USING (estado = 'activa');

CREATE POLICY "vacantes_gestion_auth"
  ON vacantes FOR ALL
  USING (auth.role() = 'authenticated');

-- APLICACIONES: inserción pública (para formulario del Job Board), lectura solo auth
CREATE POLICY "aplicaciones_insertar_publico"
  ON aplicaciones FOR INSERT
  WITH CHECK (true);

CREATE POLICY "aplicaciones_lectura_auth"
  ON aplicaciones FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "aplicaciones_actualizar_auth"
  ON aplicaciones FOR UPDATE
  USING (auth.role() = 'authenticated');

-- EMPRESAS: solo usuarios autenticados
CREATE POLICY "empresas_solo_auth"
  ON empresas FOR ALL
  USING (auth.role() = 'authenticated');

-- CITAS: solo usuarios autenticados
CREATE POLICY "citas_solo_auth"
  ON citas FOR ALL
  USING (auth.role() = 'authenticated');

-- PERFILES: cada usuario ve y edita solo el suyo
CREATE POLICY "perfiles_propio"
  ON perfiles FOR ALL
  USING (auth.uid() = id);

-- ============================================================
-- TRIGGERS: auto-actualizar updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION actualizar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_empresas_updated_at
  BEFORE UPDATE ON empresas
  FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_vacantes_updated_at
  BEFORE UPDATE ON vacantes
  FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_aplicaciones_updated_at
  BEFORE UPDATE ON aplicaciones
  FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_citas_updated_at
  BEFORE UPDATE ON citas
  FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

-- ============================================================
-- STORAGE BUCKETS (ejecutar desde Supabase Dashboard o SQL)
-- ============================================================
-- Bucket para CVs (privado — solo recruiters pueden leer)
INSERT INTO storage.buckets (id, name, public)
VALUES ('cvs', 'cvs', false)
ON CONFLICT (id) DO NOTHING;

-- Bucket para logos de empresas (público — se muestra en Job Board)
INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: CVs solo los pueden subir anónimos, leer solo auth
CREATE POLICY "cvs_upload_publico"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'cvs');

CREATE POLICY "cvs_lectura_auth"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'cvs' AND auth.role() = 'authenticated');

-- Logos: públicos para lectura, escritura solo auth
CREATE POLICY "logos_lectura_publica"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'logos');

CREATE POLICY "logos_escritura_auth"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'logos' AND auth.role() = 'authenticated');

-- ============================================================
-- DATOS DE PRUEBA (opcional — comentar en producción)
-- ============================================================
/*
INSERT INTO empresas (nombre, pais, sector, email) VALUES
  ('Medycare Colombia', 'Colombia', 'Salud', 'rrhh@medycare.com'),
  ('DHI Global', 'México', 'Salud & Estética', 'hr@dhi.com'),
  ('Transportes Rincón', 'Colombia', 'Logística', 'admin@transportesrincon.com');

INSERT INTO vacantes (titulo, descripcion, ubicacion, modalidad, experiencia_min, categoria, estado) VALUES
  ('Auxiliar de Enfermería', 'Se requiere auxiliar con licencia vigente...', 'Bogotá', 'presencial', 1, 'operativo', 'activa'),
  ('Gerente de Operaciones', 'Perfil ejecutivo con experiencia en logística...', 'CDMX', 'hibrido', 5, 'ejecutivo', 'activa'),
  ('Asesor Comercial', 'Perfil comercial con manejo de CRM...', 'Medellín', 'presencial', 2, 'táctico', 'activa');
*/
