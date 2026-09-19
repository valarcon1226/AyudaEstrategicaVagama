"use client";

// TODO: datos de ejemplo (mock) — reemplazar por lectura real desde el sistema
// de facturación/contabilidad una vez esté decidido (ver brief de la dueña).
// Contenido tomado del diseño de Stitch ("Portal Privado - Finanzas & Facturación
// Ejecutiva"), reestilizado con los mismos tokens de color que el resto del
// portal — el export original de esa pantalla usaba una paleta distinta
// (azul/slate) al resto de las pantallas y se unificó aquí.

const KPIS = [
  {
    label: "Total Facturado",
    icon: "payments",
    iconBg: "bg-surface-container",
    value: "$218,400",
    unit: "USD",
    trend: "+18% vs. trimestre anterior",
    trendTone: "good" as const,
  },
  {
    label: "Cuentas por Cobrar",
    icon: "pending_actions",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    value: "$46,800",
    unit: "USD",
    trend: "4 clientes con saldo pendiente",
    trendTone: "warn" as const,
  },
  {
    label: "En Acuerdos / Cuotas",
    icon: "handshake",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    value: "$32,500",
    unit: "USD",
    trend: "3 planes fraccionados activos",
    trendTone: "neutral" as const,
  },
  {
    label: "Gastos Operativos",
    icon: "pie_chart",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    value: "$14,250",
    unit: "USD",
    trend: "Herramientas, sourcing & data",
    trendTone: "neutral" as const,
  },
  {
    label: "Margen Neto",
    icon: "insights",
    iconBg: "bg-tertiary-fixed",
    value: "88.5%",
    trend: "Rentabilidad neta de mandatos",
    trendTone: "good" as const,
  },
];

const LEDGER = [
  {
    folio: "#CC-2024-041",
    date: "14 Nov 2024",
    initials: "KF",
    client: "Kuantum FinTech",
    role: "VP of Engineering",
    concept: "Placement (Cierre)",
    amount: "$18,500",
    balance: "Resta: $18,500",
    balanceTone: "urgent" as const,
    due: "28 Nov 2024",
    dueNote: "En 3 días",
    dueUrgent: true,
    status: "Próximo a Vencer",
    statusTone: "warn" as const,
    actions: ["download", "payments", "send"],
  },
  {
    folio: "#CC-2024-042",
    date: "18 Nov 2024",
    initials: "KV",
    client: "Kavak LatAm",
    role: "CFO Regional",
    concept: "Cuota Diferida 2/3",
    amount: "$12,000",
    balance: "Resta: $6,000",
    balanceTone: "neutral" as const,
    due: "05 Dic 2024",
    dueNote: "En 10 días",
    status: "Acuerdo Vigente",
    statusTone: "primary" as const,
    actions: ["download", "payments", "send"],
  },
  {
    folio: "#CC-2024-043",
    date: "20 Nov 2024",
    initials: "LT",
    client: "LogiTech Andean",
    role: "Country Manager Col.",
    concept: "Retainer Inicial",
    amount: "$9,800",
    balance: "Resta: $9,800",
    balanceTone: "neutral" as const,
    due: "12 Dic 2024",
    dueNote: "En 17 días",
    status: "Al Día / En Plazo",
    statusTone: "neutral" as const,
    actions: ["download", "payments", "send"],
  },
  {
    folio: "#CC-2024-039",
    date: "02 Nov 2024",
    initials: "RP",
    client: "Rappi LatAm",
    role: "Principal Data Architect",
    concept: "Setup Fee & Dossier",
    amount: "$6,500",
    balance: "Liquidado ($0)",
    balanceTone: "good" as const,
    due: "15 Nov 2024",
    dueNote: "Conciliado",
    status: "Cobrado",
    statusTone: "good" as const,
    actions: ["receipt", "visibility"],
  },
];

const UPCOMING = [
  { month: "NOV", day: "28", client: "Kuantum FinTech", detail: "Cierre Placement VP Engineering", amount: "$18,500", urgent: true },
  { month: "DIC", day: "05", client: "Kavak México", detail: "Cuota 2/3 - Mandato CFO", amount: "$6,000" },
  { month: "DIC", day: "12", client: "LogiTech Andean", detail: "Anticipo Retainer Mandato", amount: "$9,800" },
];

const EXPENSES = [
  { label: "LinkedIn Recruiter Enterprise", amount: "$8,200", pct: 58, color: "bg-primary-container" },
  { label: "Hogan Assessment & Buró", amount: "$3,450", pct: 24, color: "bg-indigo-500" },
  { label: "Infraestructura Nube & Bóveda", amount: "$2,600", pct: 18, color: "bg-secondary" },
];

const BANKS = [
  { initials: "US", tone: "bg-surface-container text-primary", bank: "JPMorgan Chase (USD)", detail: "Mandatos Globales •••• 9104", balance: "$164,200" },
  { initials: "CO", tone: "bg-amber-100 text-amber-800", bank: "Bancolombia Corp", detail: "Operaciones Andean •••• 4218", balance: "$54,200" },
];

const ICON_ACTION_LABEL: Record<string, string> = {
  download: "Descargar PDF",
  payments: "Registrar Pago",
  send: "Notificar Cliente",
  receipt: "Descargar Comprobante",
  visibility: "Ver Auditoría",
};

export function FinanzasBoard() {
  return (
    <div className="max-w-7xl mx-auto px-gutter lg:px-margin py-space-lg w-full flex flex-col gap-space-lg">
      {/* Titular y acciones */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container border border-surface-container-high text-primary text-xs font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Tesorería Privada
            </span>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-low text-secondary text-xs font-medium border border-surface-container">
              Q4 2024
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
            Tesorería & Facturación de Mandatos
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Control centralizado de honorarios profesionales, acuerdos diferidos, cartera activa y
            reconciliación contable de operaciones de alta gerencia.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 bg-surface-container-lowest px-3.5 py-2.5 rounded-xl border border-surface-container shadow-xs text-on-surface-variant text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            <span>Q4 2024 (Oct - Dic)</span>
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </div>
          <button className="inline-flex items-center gap-2 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-surface-container px-4 py-2.5 rounded-xl shadow-xs text-sm font-semibold transition-all">
            <span className="material-symbols-outlined text-[18px] text-secondary">receipt_long</span>
            <span>Registrar Gasto</span>
          </button>
          <button className="inline-flex items-center gap-2 bg-primary-container hover:bg-primary text-on-primary px-5 py-2.5 rounded-xl shadow-sm hover:shadow text-sm font-semibold transition-all">
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Nueva Cuenta de Cobro</span>
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
        {KPIS.map((k) => (
          <div key={k.label} className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">{k.label}</span>
              <span className={`w-10 h-10 rounded-xl ${k.iconBg} ${k.iconColor ?? "text-primary"} flex items-center justify-center`}>
                <span className="material-symbols-outlined text-[20px]">{k.icon}</span>
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-on-surface font-headline-xl tracking-tight leading-none mb-2">
                {k.value} {k.unit && <span className="text-xs font-medium text-secondary uppercase">{k.unit}</span>}
              </div>
              <div
                className={
                  k.trendTone === "good"
                    ? "flex items-center gap-1.5 text-xs font-semibold text-tertiary"
                    : k.trendTone === "warn"
                      ? "flex items-center gap-1.5 text-xs text-amber-700 font-medium"
                      : "flex items-center gap-1.5 text-xs text-secondary"
                }
              >
                {k.trendTone === "good" && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-tertiary-fixed">
                    <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>
                  </span>
                )}
                {k.trendTone === "warn" && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                <span>{k.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Layout principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-8 flex flex-col gap-space-md">
          {/* Tabla de cuentas de cobro */}
          <div className="bg-surface-container-lowest p-4 lg:p-5 rounded-xl border border-surface-container shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center bg-surface-container-low p-1 rounded-xl border border-surface-container overflow-x-auto">
              <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-primary bg-surface-container-lowest shadow-xs transition-all whitespace-nowrap">
                Todas (8)
              </button>
              <button className="px-4 py-1.5 rounded-lg text-xs font-medium text-secondary hover:text-on-surface transition-all whitespace-nowrap">
                Por Cobrar (4)
              </button>
              <button className="px-4 py-1.5 rounded-lg text-xs font-medium text-secondary hover:text-on-surface transition-all whitespace-nowrap">
                Acuerdos Diferidos (2)
              </button>
              <button className="px-4 py-1.5 rounded-lg text-xs font-medium text-secondary hover:text-on-surface transition-all whitespace-nowrap">
                Cobradas (2)
              </button>
            </div>
            <div className="relative w-full sm:w-72">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[18px]">search</span>
              <input
                className="w-full pl-9 pr-3.5 py-2 bg-surface-container-low border border-surface-container rounded-xl text-xs text-on-surface placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Buscar por cliente, CC o rol..."
                type="text"
              />
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-surface-container shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/80 border-b border-surface-container text-[11px] font-bold text-secondary uppercase tracking-wider">
                    <th className="py-4 px-5">Folio / Fecha</th>
                    <th className="py-4 px-5">Cliente & Mandato</th>
                    <th className="py-4 px-5">Concepto</th>
                    <th className="py-4 px-5 text-right">Monto & Saldo</th>
                    <th className="py-4 px-5">Vencimiento</th>
                    <th className="py-4 px-5">Estado</th>
                    <th className="py-4 px-5 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container text-sm">
                  {LEDGER.map((row) => (
                    <tr key={row.folio} className="hover:bg-surface-container-low/70 transition-colors">
                      <td className="py-4 px-5">
                        <div className="font-bold text-on-surface font-mono text-xs">{row.folio}</div>
                        <div className="text-[11px] text-secondary">{row.date}</div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-surface-container text-primary font-extrabold flex items-center justify-center text-xs shrink-0">
                            {row.initials}
                          </div>
                          <div>
                            <div className="font-bold text-on-surface text-sm">{row.client}</div>
                            <div className="text-xs text-secondary">{row.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface-variant text-xs font-medium border border-surface-container">
                          {row.concept}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="font-bold text-on-surface">
                          {row.amount} <span className="text-[11px] font-normal text-secondary">USD</span>
                        </div>
                        <div
                          className={
                            row.balanceTone === "urgent"
                              ? "text-xs font-semibold text-rose-600"
                              : row.balanceTone === "good"
                                ? "text-xs font-bold text-tertiary"
                                : "text-xs text-secondary font-medium"
                          }
                        >
                          {row.balance}
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="text-xs font-medium text-on-surface">{row.due}</div>
                        <span
                          className={
                            row.dueUrgent
                              ? "inline-flex items-center text-[11px] font-bold text-rose-600"
                              : row.status === "Cobrado"
                                ? "text-[11px] text-tertiary font-semibold"
                                : "text-[11px] text-secondary"
                          }
                        >
                          {row.dueUrgent && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1 animate-pulse" />}
                          {row.dueNote}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={
                            row.statusTone === "warn"
                              ? "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/70 text-xs font-semibold whitespace-nowrap"
                              : row.statusTone === "primary"
                                ? "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-primary border border-surface-container-high text-xs font-semibold whitespace-nowrap"
                                : row.statusTone === "good"
                                  ? "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-fixed text-tertiary border border-tertiary-container/30 text-xs font-semibold whitespace-nowrap"
                                  : "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant border border-surface-container text-xs font-semibold whitespace-nowrap"
                          }
                        >
                          <span
                            className={
                              row.statusTone === "warn"
                                ? "w-1.5 h-1.5 rounded-full bg-amber-500"
                                : row.statusTone === "primary"
                                  ? "w-1.5 h-1.5 rounded-full bg-primary"
                                  : row.statusTone === "good"
                                    ? "w-1.5 h-1.5 rounded-full bg-tertiary"
                                    : "w-1.5 h-1.5 rounded-full bg-secondary"
                            }
                          />
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {row.actions.map((icon) => (
                            <button
                              key={icon}
                              className="p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-container-low transition-colors"
                              title={ICON_ACTION_LABEL[icon]}
                            >
                              <span className="material-symbols-outlined text-[18px]">{icon}</span>
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-surface-container-low/60 border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-secondary">
              <div>
                Mostrando <span className="font-semibold text-on-surface">4</span> de{" "}
                <span className="font-semibold text-on-surface">8</span> acuerdos fiscales vigentes en Q4
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-surface-container bg-surface-container-lowest text-secondary font-medium disabled:opacity-40" disabled>
                  Anterior
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-semibold shadow-xs">1</button>
                <button className="px-3 py-1.5 rounded-lg border border-surface-container bg-surface-container-lowest text-on-surface-variant font-medium">2</button>
                <button className="px-3 py-1.5 rounded-lg border border-surface-container bg-surface-container-lowest text-on-surface-variant font-medium">
                  Siguiente
                </button>
              </div>
            </div>
          </div>

          {/* Proyección de recaudos */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">stacked_bar_chart</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Proyección de Recaudos (Noviembre - Diciembre)</h3>
              </div>
              <span className="text-xs font-semibold text-secondary">Meta Estimada: $46,800 USD</span>
            </div>
            <div className="w-full bg-surface-container-low rounded-full h-3.5 flex overflow-hidden p-0.5 border border-surface-container">
              <div className="bg-rose-500 rounded-l-full h-full" style={{ width: "39%" }} title="Urgente ($18,500)" />
              <div className="bg-indigo-500 h-full" style={{ width: "26%" }} title="Cuotas Diferidas ($12,000)" />
              <div className="bg-primary rounded-r-full h-full" style={{ width: "35%" }} title="Término Ordinario ($16,300)" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
                <div>
                  <p className="text-xs text-secondary font-medium">Urgente (&lt; 3 días)</p>
                  <p className="text-base font-bold text-on-surface font-headline-sm">$18,500 <span className="text-xs font-normal text-secondary">USD</span></p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
                <span className="w-3 h-3 rounded-full bg-indigo-500 shrink-0" />
                <div>
                  <p className="text-xs text-secondary font-medium">Cuotas Diferidas</p>
                  <p className="text-base font-bold text-on-surface font-headline-sm">$12,000 <span className="text-xs font-normal text-secondary">USD</span></p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-surface-container">
                <span className="w-3 h-3 rounded-full bg-primary shrink-0" />
                <div>
                  <p className="text-xs text-secondary font-medium">Término Ordinario</p>
                  <p className="text-base font-bold text-on-surface font-headline-sm">$16,300 <span className="text-xs font-normal text-secondary">USD</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Widgets laterales */}
        <div className="lg:col-span-4 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">notification_important</span>
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Próximos Vencimientos</h3>
              </div>
              <a className="text-xs font-bold text-primary hover:underline" href="#">Ver Todo</a>
            </div>
            <div className="flex flex-col gap-3">
              {UPCOMING.map((u) => (
                <div
                  key={u.client}
                  className={
                    u.urgent
                      ? "p-3.5 rounded-xl bg-rose-50/60 border border-rose-100 flex items-center gap-3.5"
                      : "p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex items-center gap-3.5"
                  }
                >
                  <div className={`w-11 h-11 rounded-xl bg-surface-container-lowest border shadow-xs flex flex-col items-center justify-center shrink-0 ${u.urgent ? "border-rose-200 text-rose-600" : "border-surface-container text-on-surface-variant"}`}>
                    <span className={`text-[9px] uppercase font-extrabold tracking-wider leading-none ${u.urgent ? "text-rose-500" : "text-secondary"}`}>{u.month}</span>
                    <span className="text-base font-extrabold leading-none mt-0.5 font-headline-sm">{u.day}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-on-surface text-xs truncate">{u.client}</h4>
                      <span className={`font-extrabold text-xs font-mono ${u.urgent ? "text-rose-600" : "text-on-surface"}`}>{u.amount}</span>
                    </div>
                    <p className="text-[11px] text-secondary truncate mt-0.5">{u.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">donut_small</span>
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Gastos Operativos Firma</h3>
              </div>
              <span className="text-xs font-bold text-secondary bg-surface-container-low px-2 py-0.5 rounded-md">Noviembre</span>
            </div>
            <div className="flex flex-col gap-3.5">
              {EXPENSES.map((e) => (
                <div key={e.label} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-on-surface-variant">{e.label}</span>
                    <span className="font-bold text-on-surface font-mono">
                      {e.amount} <span className="text-[10px] text-secondary font-normal">USD</span>
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-low rounded-full h-2 overflow-hidden">
                    <div className={`${e.color} h-full rounded-full`} style={{ width: `${e.pct}%` }} />
                  </div>
                  <p className="text-[11px] text-secondary">{e.pct}% del presupuesto mensual</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-tertiary-fixed text-tertiary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">account_balance</span>
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Conciliación Bancaria</h3>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> 100% Conciliado
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {BANKS.map((b) => (
                <div key={b.bank} className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-xs shrink-0 ${b.tone}`}>
                      {b.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-on-surface">{b.bank}</h4>
                      <p className="text-[11px] text-secondary">{b.detail}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-on-surface font-mono">{b.balance}</div>
                    <span className="text-[10px] text-tertiary font-semibold">Auditada</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container flex items-start gap-2.5">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">verified_user</span>
              <p className="text-[11px] text-secondary leading-snug">
                Retención de impuestos aplicada según el país del contrato. Aún no hay sistema de
                facturación/contabilidad conectado — pendiente de integrar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
