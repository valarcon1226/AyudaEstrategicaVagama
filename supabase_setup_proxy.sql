-- 1. Tabla para el Formulario de Contacto (Leads Empresas)
CREATE TABLE leads_empresas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    empresa TEXT NOT NULL,
    pais TEXT,
    plan_interes TEXT,
    cargos TEXT,
    email TEXT NOT NULL,
    estado TEXT DEFAULT 'nuevo'
);

-- Habilitar RLS para leads_empresas
ALTER TABLE leads_empresas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir inserts publicos a leads_empresas" ON leads_empresas FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir lecturas a autenticados en leads_empresas" ON leads_empresas FOR SELECT USING (auth.role() = 'authenticated');

-- 2. Tabla para el Formulario de Candidatos (Postulaciones)
CREATE TABLE postulaciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    vacante_id TEXT,
    vacante_titulo TEXT,
    nombre TEXT NOT NULL,
    telefono TEXT,
    correo TEXT NOT NULL,
    edad INTEGER,
    nacionalidad TEXT,
    estado_civil TEXT,
    ciudad TEXT,
    barrio TEXT,
    nivel_estudios TEXT,
    anios_exp NUMERIC,
    experiencia_laboral TEXT,
    situacion_actual TEXT,
    idiomas TEXT,
    nivel_idioma TEXT,
    aspiracion TEXT,
    cv_url TEXT,
    estado TEXT DEFAULT 'nuevo'
);

-- Habilitar RLS para postulaciones
ALTER TABLE postulaciones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir inserts publicos a postulaciones" ON postulaciones FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir lecturas a autenticados en postulaciones" ON postulaciones FOR SELECT USING (auth.role() = 'authenticated');

-- 3. Configurar Bucket para Hojas de Vida
INSERT INTO storage.buckets (id, name, public) VALUES ('hojas_de_vida', 'hojas_de_vida', true) ON CONFLICT DO NOTHING;

-- Habilitar Políticas del Bucket para permitir subidas anónimas
CREATE POLICY "Permitir subidas anonimas a hojas_de_vida" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'hojas_de_vida');
CREATE POLICY "Permitir lectura publica a hojas_de_vida" ON storage.objects FOR SELECT TO public USING (bucket_id = 'hojas_de_vida');
