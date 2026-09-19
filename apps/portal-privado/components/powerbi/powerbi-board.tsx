"use client";

// TODO: datos de ejemplo (mock) — reemplazar por consultas reales una vez esté
// conectada la base de datos y/o el embed real de Power BI (ver decisiones de
// arquitectura: "Analítica/BI: dashboard propio vs. embeber Power BI").
// Contenido tomado del diseño de Stitch ("Portal Privado - Power BI & Estadísticas Avanzadas").

const KPIS = [
  {
    label: "Facturación YTD / ARR",
    icon: "account_balance",
    value: "$1,480,000",
    unit: "USD",
    trend: "+24.8% vs año previo",
  },
  {
    label: "Tasa Éxito C-Suite",
    icon: "verified",
    value: "92.4%",
    trend: "+4.1% benchmark 81%",
    footer: { label: "Tiempo medio a terna:", value: "14 días" },
  },
  {
    label: "Ticket Medio / Fee",
    icon: "price_check",
    value: "$31,200",
    unit: "USD",
    trend: "+$6,700 vs benchmark $24.5k",
  },
  {
    label: "Retención Clientes",
    icon: "handshake",
    value: "96.4%",
    trend: "NPS Corporativo: 94 pts",
    footer: { label: "Clientes Recurrentes:", value: "41 Enterprise" },
  },
  {
    label: "Pipeline Ponderado",
    icon: "filter_alt",
    value: "$460,000",
    unit: "USD",
    trend: "32 mandatos activos",
  },
];

const MONTHS = [
  { m: "Ene", retainer: 60, contingencia: 25 },
  { m: "Feb", retainer: 72, contingencia: 28 },
  { m: "Mar", retainer: 80, contingencia: 30 },
  { m: "Abr", retainer: 95, contingencia: 20 },
  { m: "May", retainer: 85, contingencia: 35 },
  { m: "Jun", retainer: 110, contingencia: 30 },
  { m: "Jul", retainer: 120, contingencia: 40 },
  { m: "Ago", retainer: 130, contingencia: 38 },
  { m: "Sep", retainer: 115, contingencia: 25 },
  { m: "Oct", retainer: 145, contingencia: 45 },
  { m: "Nov", retainer: 160, contingencia: 50 },
  { m: "Dic", retainer: 172, contingencia: 48 },
];

const FUNNEL = [
  { stage: "1. Talentos Mapeados (Longlist)", value: "1,840", pct: 100, pctLabel: "100%", color: "bg-primary-container" },
  { stage: "2. Preseleccionados & Screening", value: "320", pct: 65, pctLabel: "17.3%", color: "bg-primary/80" },
  { stage: "3. Presentados en Terna a Cliente", value: "98", pct: 42, pctLabel: "5.3%", color: "bg-secondary" },
  { stage: "4. Entrevistas Finales (Junta/CEO)", value: "42", pct: 26, pctLabel: "2.3%", color: "bg-tertiary-container" },
  { stage: "5. Ofertas Aceptadas & Onboarding", value: "38 Placements", pct: 20, pctLabel: "2.06%", color: "bg-tertiary-fixed-dim" },
];

const SALARY_BANDS = [
  { role: "Chief Executive Officer (CEO)", range: "$220k – $310k USD", left: 60, width: 35, color: "bg-primary-container", median: "Mediana: $265k" },
  { role: "Chief Technology Officer / AI", range: "$160k – $220k USD", left: 45, width: 28, color: "bg-primary", median: "Mediana: $190k (+18% YoY)" },
  { role: "Chief Financial Officer (CFO)", range: "$150k – $200k USD", left: 40, width: 25, color: "bg-secondary", median: "Mediana: $175k" },
  { role: "VP of Growth & RevOps", range: "$130k – $175k USD", left: 32, width: 22, color: "bg-tertiary-container", median: "Mediana: $152k" },
];

const PARTNERS = [
  { name: "Carlos Mendoza", title: "Managing Partner", practice: "C-Level & Board", placements: 8, revenue: "$249,600 USD", quota: 100, quotaLabel: "128%", nps: "9.8 / 10" },
  { name: "Sofía Valdés", title: "Senior Partner Tech", practice: "Fintech & AI", placements: 6, revenue: "$186,000 USD", quota: 95, quotaLabel: "108%", nps: "9.6 / 10" },
  { name: "Mariana Ruiz", title: "Associate Partner", practice: "Retail & Ops", placements: 5, revenue: "$155,000 USD", quota: 82, quotaLabel: "94%", nps: "9.2 / 10" },
];

const SECTORS = [
  { label: "Fintech & Pagos Digitales", pct: "42% ($621k)", swatch: "bg-primary-container" },
  { label: "Enterprise SaaS & AI", pct: "28% ($414k)", swatch: "bg-secondary" },
  { label: "Retail, Logística & E-com", pct: "18% ($266k)", swatch: "bg-tertiary-container" },
  { label: "HealthTech & Pharma", pct: "12% ($177k)", swatch: "bg-surface-variant" },
];

const INSIGHTS = [
  {
    icon: "trending_up",
    tone: "text-tertiary",
    title: "Aceleración de Demanda Tecnológica",
    body: (
      <>
        La demanda de roles directivos de <strong>VP of AI &amp; Machine Learning</strong> creció un{" "}
        <strong>+68%</strong> en México y Colombia. El tiempo de aceptación de oferta cayó a 12 días
        promedio.
      </>
    ),
    footer: { label: "Impacto: Alto en Tarifas Retainer", action: "Ver Candidatos Disponibles →" },
  },
  {
    icon: "monetization_on",
    tone: "text-primary",
    title: "Oportunidad de Venta Cruzada (Upsell)",
    body: (
      <>
        <strong>3 cuentas corporativas en Retainer</strong> (Fintech LatAm) aprobaron rondas de capital
        Serie B en mayo sin mandatos de CFO o Legal Counsel asignados todavía.
      </>
    ),
    footer: { label: "Pipeline Potencial: +$95k USD", action: "Generar Propuesta B2B →" },
  },
  {
    icon: "warning",
    tone: "text-error",
    title: "Riesgo de Competitividad Salarial",
    body: (
      <>
        Los paquetes de compensación para <strong>Chief Risk Officers (CRO)</strong> en banca tradicional
        están quedando 14% por debajo de Neobancos regionales.
      </>
    ),
  },
];

export function PowerbiBoard() {
  const maxBar = 220;

  return (
    <div className="w-full max-w-7xl mx-auto px-gutter lg:px-margin py-space-md flex flex-col gap-space-lg">
      {/* Toolbar */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm">
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="w-2.5 h-8 bg-primary-container rounded-full" />
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">
                Executive Talent Intelligence & Power BI Analytics
              </h1>
              <p className="font-body-sm text-body-sm text-secondary">
                Telemetría de mandatos directivos, pipeline comercial y modelos de compensación C-Suite
                LatAm
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-sm">sync</span>
              <span>Dataset en tiempo real • Sincronizado hace 3 min</span>
            </span>
          </div>
          <div className="flex items-center gap-space-xs self-start lg:self-auto flex-wrap">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-all shadow-sm">
              <span className="material-symbols-outlined text-base text-secondary">tune</span>
              <span>Slicers Avanzados</span>
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-all shadow-sm">
              <span className="material-symbols-outlined text-base text-secondary">schedule_send</span>
              <span>Programar Reporte Semanal</span>
            </button>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md transition-all shadow-sm">
              <span className="material-symbols-outlined text-base">download</span>
              <span>Exportar (PDF / PBIX)</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm pt-space-xs">
          {[
            { icon: "date_range", label: "Rango Temporal", options: ["Últimos 12 Meses (YTD)", "Q2 2024 Actual", "Q1 2024", "Personalizado (Custom Range)"] },
            { icon: "category", label: "División / Práctica", options: ["Todas las Prácticas (Full Scope)", "Fintech & Banking", "C-Level & Board Advisory", "Tech, Data & Generative AI", "Retail, Supply Chain & E-commerce"] },
            { icon: "public", label: "Jurisdicción / Región", options: ["LatAm Consolidado (Global)", "México (CDMX / MTY / GDL)", "Colombia & Región Andina", "Brasil (São Paulo Hub)", "Chile & Cono Sur"] },
            { icon: "payments", label: "Modelo de Cobro", options: ["Todos los Contratos", "Retained Search Exclusivo (33/33/34)", "Success Fee / Contingencia", "RPO C-Suite Dedicado"] },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">{s.icon}</span> {s.label}
              </label>
              <div className="relative">
                <select className="w-full bg-surface-container-low rounded-lg px-3 py-2 text-on-surface font-body-sm text-body-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-container pr-8 shadow-inner">
                  {s.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-secondary pointer-events-none text-base">
                  expand_more
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
        {KPIS.map((k) => (
          <div key={k.label} className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">{k.label}</span>
                <span className="p-1 rounded bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-base">{k.icon}</span>
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-headline-xl text-headline-xl text-on-surface">{k.value}</span>
                {k.unit && <span className="font-label-sm text-label-sm text-secondary">{k.unit}</span>}
              </div>
              <div className="flex items-center gap-1 mt-1 font-label-sm text-label-sm text-tertiary font-medium">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                <span>{k.trend}</span>
              </div>
            </div>
            {k.footer && (
              <div className="mt-4 pt-2 bg-surface-container-low/70 rounded-lg p-2 flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-secondary">{k.footer.label}</span>
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">{k.footer.value}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Dashboards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <div className="lg:col-span-8 flex flex-col gap-space-lg">
          {/* Combo chart */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md gap-2">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  Evolución de Facturación & Mandatos Colocados por Mes
                </h2>
                <p className="font-body-sm text-body-sm text-secondary">
                  Comparativa mensual de Retainer vs Contingencia (Barras en $k USD) & Placements Efectivos
                  (Línea de Tendencia)
                </p>
              </div>
              <div className="flex items-center gap-space-sm text-xs font-label-sm flex-wrap">
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary-container" /><span>Retainer ($)</span></div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-secondary-fixed-dim" /><span>Contingencia ($)</span></div>
                <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-tertiary-container" /><span>Mandatos Cerrados</span></div>
              </div>
            </div>
            <div className="relative w-full h-72 pt-4">
              <div className="relative z-0 h-56 flex items-end justify-between px-2 gap-1">
                {MONTHS.map((m) => (
                  <div key={m.m} className="flex flex-col items-center gap-1 group flex-1">
                    <div className="w-6 sm:w-8 flex flex-col items-center justify-end rounded-t overflow-hidden">
                      <div className="w-full bg-secondary-fixed-dim" style={{ height: `${(m.contingencia / maxBar) * 200}px` }} />
                      <div className="w-full bg-primary-container" style={{ height: `${(m.retainer / maxBar) * 200}px` }} />
                    </div>
                    <span className="font-body-sm text-body-sm text-secondary group-hover:text-primary transition-colors">{m.m}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 flex flex-wrap items-center justify-between text-xs text-secondary bg-surface-container-low/50 px-3 py-2 rounded-lg">
              <span>Récord Mensual: Noviembre ($210k USD / 9 Mandatos C-Suite)</span>
              <span className="text-tertiary font-medium">84% de facturación originada vía Retainer Exclusivo</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {/* Funnel */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Funnel de Selección C-Suite</h3>
                  <span className="font-label-sm text-label-sm text-secondary">Lead to Hire</span>
                </div>
                <p className="font-body-sm text-body-sm text-secondary mt-1">
                  Filtrado exhaustivo desde Longlist hasta Firma de Contrato
                </p>
                <div className="mt-space-md flex flex-col gap-2">
                  {FUNNEL.map((f) => (
                    <div key={f.stage} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-on-surface">{f.stage}</span>
                        <span className="font-bold text-on-surface">{f.value}</span>
                      </div>
                      <div className="w-full h-7 bg-surface-container-low rounded-lg overflow-hidden flex items-center px-0.5">
                        <div className={`h-full ${f.color} rounded-lg flex items-center justify-end px-2`} style={{ width: `${f.pct}%` }}>
                          <span className="text-white text-xs font-semibold">{f.pctLabel}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-2 bg-surface-container-low p-2.5 rounded-lg flex items-center justify-between text-xs">
                <span className="text-secondary">Eficiencia de Terna:</span>
                <span className="font-bold text-primary">38.7% (1 colocación cada 2.5 candidatos en terna)</span>
              </div>
            </div>

            {/* Salary benchmark */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Benchmark Salarial C-Level</h3>
                  <span className="font-label-sm text-label-sm text-secondary">USD Base Anual</span>
                </div>
                <p className="font-body-sm text-body-sm text-secondary mt-1">
                  Rango negociado en colocaciones efectivas 2024
                </p>
                <div className="mt-space-md flex flex-col gap-4">
                  {SALARY_BANDS.map((b) => (
                    <div key={b.role}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-on-surface">{b.role}</span>
                        <span className="font-medium text-secondary">{b.range}</span>
                      </div>
                      <div className="w-full h-3 bg-surface-container-low rounded-full relative overflow-hidden">
                        <div className={`absolute top-0 h-full ${b.color} rounded-full`} style={{ left: `${b.left}%`, width: `${b.width}%` }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-outline mt-0.5">
                        <span>$100k</span>
                        <span>{b.median}</span>
                        <span>$350k</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-surface-container-low text-xs text-secondary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-primary">info</span>
                <span>Incluye bonos diferidos y paquetes de LTI/Equity negociados por la firma.</span>
              </div>
            </div>
          </div>

          {/* Partner performance table */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-sm gap-2">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Rendimiento por Headhunter / Managing Partner
                </h3>
                <p className="font-body-sm text-body-sm text-secondary">
                  Métricas individuales de colocación, revenue aportado y evaluación de clientes
                </p>
              </div>
              <button className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline">
                <span>Ver Auditoría de Horas y SLA</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead>
                  <tr className="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider">
                    <th className="py-3 px-4 rounded-l-lg">Partner Líder</th>
                    <th className="py-3 px-4">Práctica Primaria</th>
                    <th className="py-3 px-4 text-center">Colocaciones</th>
                    <th className="py-3 px-4">Revenue Aportado</th>
                    <th className="py-3 px-4">Cumplimiento Cuota</th>
                    <th className="py-3 px-4 rounded-r-lg text-right">NPS Evaluación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  {PARTNERS.map((p) => (
                    <tr key={p.name} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-label-sm font-bold shrink-0">
                          {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <div>
                          <span className="font-semibold text-on-surface block">{p.name}</span>
                          <span className="text-xs text-secondary">{p.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-primary">{p.practice}</span>
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-on-surface">{p.placements}</td>
                      <td className="py-3 px-4 font-bold text-on-surface">{p.revenue}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full bg-primary-container" style={{ width: `${p.quota}%` }} />
                          </div>
                          <span className="font-label-sm text-label-sm text-primary font-bold">{p.quotaLabel}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold text-xs">{p.nps}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          {/* Donut */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
            <div className="flex items-center justify-between mb-space-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Distribución por Sector</h3>
              <span className="p-1 rounded bg-surface-container text-secondary">
                <span className="material-symbols-outlined text-sm">pie_chart</span>
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-secondary mb-4">
              % de facturación YTD distribuida por industria cliente
            </p>
            <div className="flex flex-col items-center justify-center my-2 relative">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="none" r="38" stroke="#eff4ff" strokeWidth="14" />
                <circle cx="50" cy="50" fill="none" r="38" stroke="#2563eb" strokeDasharray="100.2 138.5" strokeDashoffset="0" strokeWidth="14" />
                <circle cx="50" cy="50" fill="none" r="38" stroke="#565e74" strokeDasharray="66.8 171.9" strokeDashoffset="-100.2" strokeWidth="14" />
                <circle cx="50" cy="50" fill="none" r="38" stroke="#007d55" strokeDasharray="43.0 195.7" strokeDashoffset="-167" strokeWidth="14" />
                <circle cx="50" cy="50" fill="none" r="38" stroke="#d3e4fe" strokeDasharray="28.6 210.1" strokeDashoffset="-210" strokeWidth="14" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-headline-lg text-headline-lg font-bold text-on-surface leading-none">$1.48M</span>
                <span className="font-body-sm text-body-sm text-secondary">Total Facturado</span>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2.5">
              {SECTORS.map((s) => (
                <div key={s.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-sm ${s.swatch}`} />
                    <span className="font-medium text-on-surface">{s.label}</span>
                  </div>
                  <span className="font-bold text-on-surface">{s.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Copilot */}
          <div className="bg-gradient-to-b from-surface-container-low via-surface-container-lowest to-surface-container-lowest rounded-xl p-space-lg shadow-sm border-l-4 border-l-primary-container flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-primary-container text-on-primary">
                  <span className="material-symbols-outlined text-base">auto_awesome</span>
                </span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Ayuda Estratégica Copilot</h3>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">AI Talent Intelligence Feed</span>
                </div>
              </div>
            </div>
            {INSIGHTS.map((i) => (
              <div key={i.title} className="bg-surface-container-lowest rounded-lg p-3 shadow-xs flex flex-col gap-1.5">
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${i.tone}`}>
                  <span className="material-symbols-outlined text-sm">{i.icon}</span>
                  <span>{i.title}</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface">{i.body}</p>
                {i.footer && (
                  <div className="pt-1 flex items-center justify-between text-[11px] text-secondary">
                    <span>{i.footer.label}</span>
                    <button className="text-primary font-semibold hover:underline">{i.footer.action}</button>
                  </div>
                )}
              </div>
            ))}
            <div className="pt-1">
              <div className="relative">
                <input
                  className="w-full bg-surface-container-lowest rounded-lg py-2 pl-3 pr-10 text-xs text-on-surface placeholder:text-outline border-0 shadow-xs focus:ring-2 focus:ring-primary-container focus:outline-none"
                  placeholder="Pregunta al Copilot (ej: '¿Cuál es el fee promedio en Brasil?')"
                  type="text"
                />
                <button className="absolute right-2 top-2 text-primary hover:text-primary-container">
                  <span className="material-symbols-outlined text-base">send</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Gobernanza & Calidad de Datos</span>
              <span className="material-symbols-outlined text-secondary text-sm">verified_user</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-tertiary font-bold font-headline-sm">
                99.8%
              </div>
              <div>
                <span className="block text-xs font-semibold text-on-surface">Integridad de Pipelines Auditada</span>
                <span className="block text-[11px] text-secondary">Cumplimiento pendiente de confirmar con la dueña</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
