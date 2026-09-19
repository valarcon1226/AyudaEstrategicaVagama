// Información real del negocio, tomada de las respuestas de la dueña
// (respuestas_brief_ayuda_estrategica.txt, 17/09/2026) y de sus materiales
// comerciales oficiales ("Portafolio de servicios 2026" y "Oferta comercial —
// Evaluaciones Ejecutivas", carpeta "informacion adicional"). Fuente única
// para que el portal privado y, más adelante, el sitio público usen los
// mismos datos reales en vez de duplicarlos o inventarlos.

export const COMPANY = {
  legalName: "AIDAGAMBOA SAS",
  // Marca real según el membrete de sus propios documentos comerciales:
  // "Ayuda Estratégica · por Aida Gamboa". "Aida Gamboa" es la fundadora,
  // no el nombre de marca — antes lo usábamos al revés, ya corregido.
  brandName: "Ayuda Estratégica",
  founderName: "Aida Gamboa",
  byline: "por Aida Gamboa",
  tagline: "Conectamos talento con propósito.",
  taglineLong: "Psicología, gestión humana e impacto organizacional.",
  about:
    "Somos un equipo de psicología y gestión humana que conecta talento con organizaciones que buscan dejar huella. Publicamos vacantes estratégicas, compartimos buenas prácticas y acompañamos procesos de selección con ética, sensibilidad y visión de impacto. Creemos en el poder de las personas como motor de transformación y en la importancia de construir culturas organizacionales donde el talento florezca y genere valor sostenible.",
  positioning:
    "Espectro completo de selección: desde cargos operativos y administrativos hasta posiciones ejecutivas y C-Suite — tú pides, nosotros buscamos.",
} as const;

export const CONTACT = {
  emails: ["seleccionayudaestrategica@gmail.com", "seleccionayudaestrategica2@gmail.com"],
  phone: "+57 315 415 5910",
  whatsapp: "+57 315 415 5910",
  linkedin: "https://www.linkedin.com/in/seleccion-ayuda-estrategica",
  domain: "ayudaestrategica.com",
  address: "Cra. 11 Bis #124A-66, Bogotá, Colombia",
  isRemoteOnly: false,
  hours: {
    weekdays: "Lunes a viernes, 9:00 a.m. – 5:00 p.m.",
    saturday: "Sábados, 9:00 a.m. – 11:00 a.m.",
    timezone: "GMT-5 (Colombia)",
  },
  bookingContact: {
    name: "Aida Gamboa Rivera",
    title: "Consultora estratégica en Talento Humano",
  },
} as const;

// URL del portal privado (ATS/CRM interno) — el botón "Log In" del sitio
// público apunta aquí. En local corre en el puerto 3001; en producción será
// un subdominio (ej. portal.ayudaestrategica.com) una vez esté desplegado.
export const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL ?? "http://localhost:3001";

export const TEAM = {
  size: 4,
  publiclyVisible: false, // la dueña pidió mantener al equipo en privado (sin fotos/bios públicas)
} as const;

export const SECTORS = ["Salud", "Transporte", "Servicios Aeroportuarios", "Industrial"] as const;

export const OPERATING_COUNTRIES = ["Colombia", "México"] as const;

export const LEGAL = {
  // Términos de servicio formales: aún en proceso de creación (no publicar como definitivos).
  termsOfServiceStatus: "en_preparacion",
  // No hay NDA estándar como documento separado; existe política de privacidad
  // que protege la información de candidatos y clientes.
  hasStandaloneNda: false,
  hasPrivacyPolicy: true,
  // Sin certificaciones/membresías formales todavía (ISO, AESC, etc.) — no mostrar sellos.
  certifications: [] as string[],
} as const;

export const PRICING = {
  // Planes reales de reclutamiento y selección, tal como aparecen en el
  // "Portafolio de servicios 2026" oficial — reemplazan el modelo de 3 planes
  // del diseño original (Contingencia/Retenida/Embedded), que no aplica.
  // Ninguno publica una tarifa fija ("a cotizar según perfil"); internamente
  // la dueña calcula esa cotización como % de UN MES de salario del cargo
  // (ejemplo dado: salario mensual $2.000.000 COP → tarifa $1.000.000, 50%).
  recruitmentPlans: [
    {
      name: "Silver",
      includes: ["Publicación de vacante", "Preselección", "Entrega de 6–10 hojas de vida", "Informe preliminar"],
      deliveryDays: "5–7 días hábiles",
      guaranteeMonths: 2,
      price: "A cotizar según perfil",
    },
    {
      name: "Gold",
      includes: [
        "Todo lo de Silver",
        "Pruebas psicotécnicas",
        "Referenciación",
        "Entrevistas por competencias",
        "Informe final con recomendaciones",
      ],
      deliveryDays: "3–5 días hábiles",
      guaranteeMonths: 4,
      price: "A cotizar según perfil",
    },
  ],
  recruitmentFeeFormula: {
    basis: "monthly_salary_percentage" as const,
    minPercent: 50,
    maxPercent: 70,
    currency: "COP",
    example: { monthlySalary: 2_000_000, fee: 1_000_000, percent: 50 },
    note: "Base interna de cotización — el % dentro del rango 50-70% varía según la complejidad/nivel del cargo. No se publica como tarifa fija.",
  },
  // Evaluaciones ejecutivas (DISC, PIC, IPV, Valanti, Cleaver, 16PF, Kostick) — sí
  // tienen precios fijos reales, de la "Oferta comercial — Evaluaciones Ejecutivas".
  assessmentPackages: [
    { name: "Bronze", evaluations: 5, totalCop: 1_250_000, perUnitCop: 250_000, benefit: "Ideal para cargos clave o equipos pequeños" },
    { name: "Silver", evaluations: 10, totalCop: 2_200_000, perUnitCop: 220_000, benefit: "12% descuento + informe grupal con tablero de control" },
    { name: "Gold", evaluations: 25, totalCop: 4_750_000, perUnitCop: 190_000, benefit: "24% descuento + sesión directiva + dashboard KPIs" },
    { name: "Platinum", evaluations: 50, totalCop: 8_500_000, perUnitCop: 170_000, benefit: "32% descuento + soporte prioritario + acompañamiento trimestral" },
  ],
  training: {
    basis: "project_scope" as const,
    note: "Se cotiza por alcance del proyecto de capacitación (no hay tarifa fija).",
  },
  employerBranding: {
    basis: "project_flat_rate" as const,
    note: "Tarifa por proyecto integral.",
  },
  outplacement: {
    basis: "per_person_or_program" as const,
    note: "Por persona o programa corporativo.",
  },
  consulting: {
    basis: "project_or_hourly" as const,
    note: "Proyectos de diagnóstico, cultura y procesos: tarifa por proyecto o por horas.",
  },
  paymentTerms:
    "Anticipo en servicios retenidos o proyectos de consultoría; hitos según avance (ej. entrega de shortlist, finalización de assessment); plazo general de 30 días calendario tras factura, ajustable según cliente.",
} as const;

// Herramientas de evaluación que respaldan el servicio de "Evaluación Directiva".
export const ASSESSMENT_TOOLS = [
  { code: "DISC", name: "Estilo de Comunicación y Liderazgo", detail: "Identifica patrones conductuales, persuasión y manejo de presión." },
  { code: "PIC", name: "Integridad y Seguridad Organizacional", detail: "Evalúa ética, lealtad y prevención de riesgos." },
  { code: "IPV", name: "Valores y Consistencia Personal", detail: "Radiografía de estabilidad y confiabilidad." },
  { code: "Valanti", name: "Confianza e Integridad Ejecutiva", detail: "Detecta riesgos éticos y fortalece cultura." },
  { code: "Cleaver", name: "Comportamiento bajo Presión", detail: "Analiza respuesta en situaciones críticas." },
  { code: "16 PF", name: "Personalidad 16 Factores", detail: "Mide rasgos como liderazgo, autocontrol y creatividad." },
  { code: "Kostick", name: "Motivaciones y Valores Laborales", detail: "Explora motivaciones internas y relación con la autoridad." },
] as const;

// Fases del servicio de Gestión Humana (portafolio oficial).
export const HR_MANAGEMENT_PHASES = [
  { phase: "Convocatoria", detail: "Identificación de necesidades; publicación." },
  { phase: "Selección", detail: "Preselección; entrevistas; pruebas." },
  { phase: "Onboarding", detail: "Formalización; formación inicial." },
  { phase: "Retención", detail: "Planes de formación; evaluación de desempeño." },
  { phase: "Desvinculación", detail: "Entrevistas de salida; planes de sucesión." },
] as const;

// Clientes reales (portafolio 2026) — la dueña pidió NO mostrar logos/nombres
// de clientes públicamente todavía. Se guarda aquí solo como contexto interno
// de a qué sectores atiende realmente (muy diverso: salud/estética, transporte,
// legal, energía, alimentos, óptica, bienes raíces) — no publicar en el sitio.
export const REAL_CLIENTS_INTERNAL_ONLY = [
  "Jamar", "Dione Skin Clinic", "SIESUA Depilación Láser", "DHIL (Implante y Restauración Capilar)",
  "Laboratorio de Investigación Hormonal", "UCFC (US Colombia Fertility Center)", "RITA Bordados a Mano",
  "Transportes Rincón S.A.", "Hacienda", "Angélica Guatibonza (Dermatóloga)", "Grupo Jurídico Deudu S.A.S.",
  "SO Óptica Ubaté", "MEDYCARE", "Filetto Gourmet", "XM", "Autopago SAS", "ON/OFF Soluciones en línea", "ReneTursa",
] as const;

export const METRICS = {
  retentionRateFirstYear: "90%+",
  placementsToDate: 85,
  averageShortlistDays: 3,
  nps: 95,
  // La dueña confirmó estos valores como los vigentes (17/09/2026), aunque el
  // portafolio oficial de reclutamiento lista una garantía distinta por plan
  // (Silver 2 meses / Gold 4 meses) — hay que aclarar con ella cuál prevalece.
  guarantee: {
    executiveMonths: 6,
    operationalMonths: 2,
  },
} as const;
