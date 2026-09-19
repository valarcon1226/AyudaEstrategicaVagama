"use client";

import { useState } from "react";
import Link from "next/link";

// TODO: datos de ejemplo (mock) — reemplazar por lectura real desde Postgres.
// Contenido tomado del diseño de Stitch ("Portal Privado - Tab 2: CRM, Empresas y Leads Pendientes").
const METRICS = [
  {
    icon: "corporate_fare",
    iconBg: "bg-surface-container",
    label: "Clientes Activos",
    value: "24",
    trendIcon: "trending_up",
    trendTone: "good" as const,
    trend: "+3 incorporadas este trimestre",
  },
  {
    icon: "mark_email_unread",
    iconBg: "bg-secondary-container",
    label: "Leads Web B2B por Atender",
    value: "18",
    trendTone: "urgent" as const,
    trend: "4 nuevos hoy sin llamada inicial",
    badge: true,
  },
  {
    icon: "monetization_on",
    iconBg: "bg-tertiary-fixed",
    label: "Facturación Q2",
    value: "$142,000",
    valueUnit: "USD",
    trendIcon: "arrow_upward",
    trendTone: "good" as const,
    trend: "108% sobre objetivo de retención",
  },
  {
    icon: "assignment_turned_in",
    iconBg: "bg-surface-container-high",
    label: "Tasa de Cierre C-Suite",
    value: "92%",
    valueSuffix: "Terna a Contratado",
    progress: 92,
  },
];

const LEADS = [
  {
    initials: "KF",
    company: "Kuantum Financial",
    tag: "Retained C-Level",
    tagTone: "primary" as const,
    contact: "Carlos Mendoza (Solicitante)",
    role: "Managing Director LatAm",
    email: "carlos.mendoza@kuantumfin.io • +52 55 4910 8820",
    time: "Hace 25 min",
    urgent: true,
    brief:
      "Búsqueda confidencial de Chief Risk Officer (CRO) para licencia bancaria digital en México y Colombia. Urgencia alta, inicio de terna en menos de 15 días.",
    status: "Sin Contactar / Nuevo Lead",
    statusIcon: "notification_important",
    actionIcon: "call",
  },
  {
    initials: "FI",
    company: "Fintech Inov",
    tag: "Embedded Squad",
    tagTone: "secondary" as const,
    contact: "Laura Restrepo",
    role: "Head of Talent Acquisition",
    email: "lrestrepo@fintechinov.co • +57 312 876 5432",
    time: "Hace 1 hora",
    brief:
      "Cierre de ronda Serie A. Necesitan 1 VP of Product y 2 Engineering Leads especialistas en pagos transfronterizos. Solicitan demo de calibración de perfiles.",
    status: "En Espera de Primera Llamada",
    statusIcon: "schedule",
    actionIcon: "mail",
  },
  {
    initials: "LA",
    company: "LogiTech Andean",
    tag: "Retained C-Level",
    tagTone: "primary" as const,
    contact: "Felipe Gómez",
    role: "Chief Executive Officer",
    email: "fgomez@logitech-andean.com • +56 9 8344 1122",
    time: "Hace 2 horas",
    brief:
      "Reemplazo de Country Manager Chile y apertura de operaciones en Perú. Desean conocer condiciones de retainer exclusivo y garantía de terna.",
    status: "Sin Contactar / Nuevo Lead",
    statusIcon: "ring_volume",
    statusIconTone: "good" as const,
    actionIcon: "call",
  },
  {
    initials: "BH",
    company: "BioHealth Corp",
    tag: "Contingencia Executive",
    tagTone: "tertiary" as const,
    contact: "Mariana Vega",
    role: "VP Human Resources",
    email: "m.vega@biohealthlatam.org • +54 11 5566 7788",
    time: "Hoy 10:15 AM",
    brief:
      "Director Médico Regional y Regulatory Affairs Manager para Cono Sur. Solicitan propuesta formal de honorarios y firma de acuerdo NDA previo.",
    status: "En Espera de Primera Llamada",
    statusIcon: "mail_outline",
    actionIcon: "videocam",
  },
];

const ACTIVE_ACCOUNTS = [
  {
    initials: "ML",
    name: "MercadoLibre",
    tag: "Retainer Tier 1",
    detail: "3 Mandatos C-Suite en curso • Reclutador a cargo: Carlos Mendoza",
    nps: "9.8/10",
    extra: "Contrato marco renovado hasta Dic 2025",
  },
  {
    initials: "KV",
    name: "Kavak",
    tag: "Exclusive Executive",
    detail: "2 Búsquedas Directivas (CFO Regional, VP Growth) • Reclutador: Carlos Mendoza",
    nps: "9.5/10",
    extra: "En etapa de evaluación psicométrica",
  },
  {
    initials: "RP",
    name: "Rappi Inc.",
    tag: "Retainer Tier 1",
    detail: "4 Procesos simultáneos Fintech & Turbo • Co-lead con Sofía Valdés",
    nps: "9.9/10",
    extra: "SLA promedio de entrega de terna: 14 días",
  },
];

const CALIBRATION_ACCOUNTS = [
  {
    initials: "Nu",
    name: "Nubank LatAm",
    tag: "Plan Retained C-Suite",
    contact: "Mariana Ruiz • VP of People & Culture",
    meta: "Reunión: Hoy, 03:00 PM",
    metaIcon: "calendar_today",
    location: "São Paulo / Remoto",
    status: "Diagnóstico Pendiente",
  },
  {
    initials: "FG",
    name: "Fintech Global",
    tag: "Exclusive Search",
    contact: "Andrés Morales • Chief Technology Officer",
    meta: "Terna Finalista hoy 11:30 AM",
    metaIcon: "groups",
    status: "En Calibración",
  },
];

export function EmpresasBoard() {
  const [pipeline, setPipeline] = useState<"actuales" | "leads">("actuales");

  return (
    <div className="max-w-7xl mx-auto px-gutter lg:px-margin py-space-lg w-full">
      {/* Métricas clave superiores */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md bg-surface-container-lowest p-space-md rounded-xl border border-surface-container shadow-xs">
        <div className="flex items-center gap-space-sm">
          <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">query_stats</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Panel Ejecutivo de Rendimiento & CRM
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-label-sm text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-pulse" />
                Live Analytics
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Supervisión en tiempo real de conversión B2B, colocación de ternas y pipeline de ingresos.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/powerbi"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-sm text-label-sm font-semibold shadow-xs hover:shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-[19px]">bar_chart</span>
            <span>Ver Estadísticas Avanzadas & Power BI</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">
        {METRICS.map((m) => (
          <div
            key={m.label}
            className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                {m.label}
              </span>
              <span className={`w-9 h-9 rounded-lg ${m.iconBg} flex items-center justify-center text-primary relative`}>
                <span className="material-symbols-outlined text-[20px]">{m.icon}</span>
                {m.badge && (
                  <span className="w-2.5 h-2.5 rounded-full bg-error absolute -top-0.5 -right-0.5 ring-2 ring-surface-container-lowest" />
                )}
              </span>
            </div>
            {m.valueSuffix ? (
              <>
                <div className="flex items-baseline gap-2">
                  <div className="font-metric-display text-metric-display text-on-surface">{m.value}</div>
                  <span className="font-body-sm text-body-sm text-secondary">{m.valueSuffix}</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5 mt-2 overflow-hidden">
                  <div
                    className="bg-primary-container h-full rounded-full"
                    style={{ width: `${m.progress}%` }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="font-metric-display text-metric-display text-on-surface">
                  {m.value} {m.valueUnit && <span className="text-body-sm font-body-sm text-secondary">{m.valueUnit}</span>}
                </div>
                <div
                  className={
                    m.trendTone === "urgent"
                      ? "mt-space-xs flex items-center gap-1.5 text-error font-label-sm text-label-sm"
                      : "mt-space-xs flex items-center gap-1.5 text-tertiary font-label-sm text-label-sm"
                  }
                >
                  {m.trendTone === "urgent" ? (
                    <span className="w-2 h-2 rounded-full bg-error" />
                  ) : (
                    <span className="material-symbols-outlined text-[16px]">{m.trendIcon}</span>
                  )}
                  <span>{m.trend}</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Leads web por atender */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container shadow-xs mb-space-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container-low">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-error-container/60 text-error flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">contact_phone</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-lg text-headline-sm lg:text-headline-lg text-on-surface">
                  Empresas Pendientes de Contacto / Leads Web por Atender
                </h2>
                <span className="bg-error text-on-error font-label-sm text-xs px-2.5 py-0.5 rounded-full font-bold animate-pulse">
                  4 Nuevos
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Solicitudes ingresadas desde el formulario web empresarial listas para primer contacto y
                vinculación por el Headhunter.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-secondary hidden md:inline">
              SLA de Respuesta: &lt; 2 horas
            </span>
            <button className="px-3 py-1.5 bg-surface-container text-primary hover:bg-surface-container-high rounded-lg font-label-sm text-label-sm flex items-center gap-1 transition-colors">
              <span className="material-symbols-outlined text-[16px]">filter_list</span> Filtrar Leads
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md mt-space-md">
          {LEADS.map((lead) => (
            <div
              key={lead.company}
              className="p-space-md bg-surface-container-low rounded-xl border border-surface-container hover:border-primary/40 transition-all flex flex-col justify-between gap-space-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-lg bg-surface-container-highest text-primary font-headline-sm font-bold flex items-center justify-center">
                    {lead.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">{lead.company}</h4>
                      <span
                        className={
                          lead.tagTone === "primary"
                            ? "bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-xs px-2 py-0.5 rounded font-semibold"
                            : lead.tagTone === "secondary"
                              ? "bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-xs px-2 py-0.5 rounded font-semibold"
                              : "bg-tertiary-fixed text-tertiary font-label-sm text-xs px-2 py-0.5 rounded font-semibold"
                        }
                      >
                        {lead.tag}
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface font-medium mt-0.5 flex items-center gap-1.5">
                      <span>{lead.contact}</span>
                      <span className="text-secondary text-body-sm">• {lead.role}</span>
                    </p>
                    <p className="font-body-sm text-body-sm text-secondary">{lead.email}</p>
                  </div>
                </div>
                <span
                  className={
                    lead.urgent
                      ? "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-xs font-semibold whitespace-nowrap"
                      : "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-xs font-semibold whitespace-nowrap"
                  }
                >
                  {lead.urgent && <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping" />}
                  {lead.time}
                </span>
              </div>
              <div className="bg-surface-container-lowest p-2.5 rounded-lg border border-surface-container text-body-sm text-on-surface-variant">
                <span className="font-label-sm text-label-sm text-on-surface block font-semibold mb-0.5">
                  Desafío & Requerimiento indicado:
                </span>
                &quot;{lead.brief}&quot;
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-surface-container">
                <span className="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-xs">
                  <span
                    className={
                      lead.statusIconTone === "good"
                        ? "material-symbols-outlined text-[16px] text-tertiary"
                        : "material-symbols-outlined text-[16px] text-error"
                    }
                  >
                    {lead.statusIcon}
                  </span>
                  Estatus: <strong>{lead.status}</strong>
                </span>
                <div className="flex items-center gap-1.5">
                  <button className="px-2.5 py-1.5 rounded text-secondary hover:text-on-surface hover:bg-surface-container font-label-sm text-xs transition-colors">
                    Asignar
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-sm text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors">
                    <span className="material-symbols-outlined text-[15px]">{lead.actionIcon}</span>
                    Contactar y Vincular
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cuentas activas y agenda */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
        <div className="xl:col-span-7 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container-low">
              <div>
                <span className="text-label-sm font-label-sm text-primary uppercase tracking-widest block font-semibold">
                  Gestión de Cuentas B2B
                </span>
                <h3 className="font-headline-lg text-headline-sm lg:text-headline-lg text-on-surface">
                  Cuentas y Mandatos Activos en Proceso
                </h3>
              </div>
              <div className="inline-flex bg-surface-container p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPipeline("actuales")}
                  className={
                    pipeline === "actuales"
                      ? "px-3 py-1.5 rounded font-label-sm text-label-sm bg-surface-container-lowest text-on-surface shadow-xs transition-all flex items-center gap-1.5 font-semibold"
                      : "px-3 py-1.5 rounded font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1.5"
                  }
                >
                  <span className="w-2 h-2 rounded-full bg-tertiary-container" />
                  Cuentas Activas (24)
                </button>
                <button
                  type="button"
                  onClick={() => setPipeline("leads")}
                  className={
                    pipeline === "leads"
                      ? "px-3 py-1.5 rounded font-label-sm text-label-sm bg-surface-container-lowest text-on-surface shadow-xs transition-all flex items-center gap-1.5 font-semibold"
                      : "px-3 py-1.5 rounded font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1.5"
                  }
                >
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  En Calibración (6)
                </button>
              </div>
            </div>

            {pipeline === "actuales" ? (
              <div className="flex flex-col gap-space-sm mt-space-md">
                {ACTIVE_ACCOUNTS.map((a) => (
                  <div
                    key={a.name}
                    className="p-space-md bg-surface-container-low rounded-xl border border-surface-container hover:bg-surface-container transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                      <div className="flex items-start gap-space-sm">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center font-headline-sm text-primary font-bold">
                          {a.initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-headline-sm text-headline-sm text-on-surface">{a.name}</h4>
                            <span className="bg-tertiary-fixed text-tertiary font-label-sm text-label-sm px-2 py-0.5 rounded font-semibold">
                              {a.tag}
                            </span>
                          </div>
                          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">{a.detail}</p>
                          <div className="flex items-center gap-space-md mt-2 text-secondary font-body-sm text-body-sm">
                            <span className="text-tertiary font-label-sm font-semibold">NPS Cliente: {a.nps}</span>
                            <span>• {a.extra}</span>
                          </div>
                        </div>
                      </div>
                      <a
                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-surface-container-highest text-primary font-label-sm text-label-sm hover:bg-surface-container hover:text-on-surface transition-colors gap-1 self-start sm:self-center font-semibold"
                        href="#"
                      >
                        <span className="material-symbols-outlined text-[16px]">description</span>
                        Ver Contrato & Vacantes
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-space-sm mt-space-md">
                {CALIBRATION_ACCOUNTS.map((a) => (
                  <div key={a.name} className="p-space-md bg-surface-container-low rounded-xl border border-surface-container">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                      <div className="flex items-start gap-space-sm">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center font-headline-sm text-primary font-bold">
                          {a.initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-headline-sm text-headline-sm text-on-surface">{a.name}</h4>
                            <span className="bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm px-2 py-0.5 rounded">
                              {a.tag}
                            </span>
                          </div>
                          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">{a.contact}</p>
                          <div className="flex items-center gap-space-md mt-2 text-secondary font-body-sm text-body-sm">
                            <span className="flex items-center gap-1 text-tertiary font-semibold">
                              <span className="material-symbols-outlined text-[16px]">{a.metaIcon}</span> {a.meta}
                            </span>
                            {a.location && <span>{a.location}</span>}
                          </div>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                        {a.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Indicadores de calidad de servicio */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container shadow-xs">
            <div className="flex items-center justify-between mb-space-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Métricas de Satisfacción & Conversión B2B
              </h3>
              <span className="font-label-sm text-label-sm text-secondary">Auditoría Trimestral Q2</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
              <div className="bg-surface-container-low p-space-sm rounded-lg border border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-secondary">Retención Clientes</span>
                  <span className="font-headline-sm text-headline-sm text-tertiary font-bold">96.4%</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Cuentas que renuevan retainer anualmente
                </p>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded-lg border border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-secondary">Tiempo a Terna</span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">16 Días</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Benchmark regional: 35 días
                </p>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded-lg border border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-secondary">Valor Promedio</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">$28.5k</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Por posición C-Level cerrada con éxito
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Agenda del día */}
        <div className="xl:col-span-5 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container shadow-xs">
            <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-low">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">calendar_month</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Agenda Diaria</h3>
                </div>
                <p className="font-label-md text-label-md text-primary font-semibold mt-0.5">
                  {new Date().toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })}
                </p>
              </div>
              <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
                <button className="w-7 h-7 rounded flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="w-7 h-7 rounded flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>

            <div className="relative pl-6 flex flex-col gap-space-md mt-space-sm before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-highest">
              <div className="relative flex flex-col gap-1.5 p-space-sm bg-surface-container-low rounded-lg border border-surface-container shadow-xs">
                <span className="absolute -left-[23px] top-3.5 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-surface-container-lowest" />
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-primary font-semibold bg-surface-container px-2 py-0.5 rounded">
                    09:30 AM • 45 min
                  </span>
                  <span className="font-label-sm text-label-sm bg-tertiary-fixed text-tertiary px-2 py-0.5 rounded-full font-semibold">
                    Próxima
                  </span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                  Entrevista Filtro: Alejandro Ramos
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Candidato finalista a VP of Engineering • Ex-MercadoLibre Director
                </p>
                <div className="flex items-center gap-space-sm pt-2">
                  <a
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-container text-on-primary font-label-sm text-label-sm rounded-lg shadow-xs hover:bg-primary transition-colors font-semibold"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-[16px]">video_call</span>
                    Entrar a Zoom
                  </a>
                  <a
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-surface-container-highest text-on-surface font-label-sm text-label-sm rounded-lg hover:bg-surface-container transition-colors"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-[16px]">description</span>
                    Dossier CV
                  </a>
                </div>
              </div>

              <div className="relative flex flex-col gap-1.5 p-space-sm bg-surface-container-low rounded-lg border border-surface-container shadow-xs">
                <span className="absolute -left-[23px] top-3.5 w-3.5 h-3.5 rounded-full bg-tertiary-container ring-4 ring-surface-container-lowest" />
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-tertiary font-semibold bg-tertiary-fixed px-2 py-0.5 rounded">
                    11:30 AM • 60 min
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary">Terna C-Level</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                  Presentación de Terna: Fintech Global + Camila Ortiz
                </h4>
                <div className="bg-surface-container-lowest p-2 rounded text-body-sm font-body-sm text-on-surface-variant border border-surface-container">
                  <span className="font-label-sm text-label-sm text-on-surface block mb-0.5 font-semibold">
                    Participantes confirmados:
                  </span>
                  • Andrés Morales (Hiring Manager / CTO Fintech Global)
                  <br />
                  • Camila Ortiz (Candidata VP Infraestructura)
                  <br />
                  • Carlos Mendoza (Headhunter Moderador)
                </div>
                <div className="flex items-center gap-space-sm pt-2">
                  <a
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-tertiary-container text-on-tertiary font-label-sm text-label-sm rounded-lg shadow-xs hover:bg-tertiary transition-colors font-semibold"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-[16px]">videocam</span>
                    Google Meet
                  </a>
                  <a
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-surface-container-highest text-on-surface font-label-sm text-label-sm rounded-lg hover:bg-surface-container transition-colors"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-[16px]">notes</span>
                    Notas de Cliente
                  </a>
                </div>
              </div>

              <div className="relative flex flex-col gap-1.5 p-space-sm bg-surface-container-low rounded-lg border border-surface-container shadow-xs">
                <span className="absolute -left-[23px] top-3.5 w-3.5 h-3.5 rounded-full bg-secondary ring-4 ring-surface-container-lowest" />
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-secondary font-semibold bg-secondary-container px-2 py-0.5 rounded">
                    03:00 PM • 30 min
                  </span>
                  <span className="font-label-sm text-label-sm bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded font-semibold">
                    Llamada Vinculación
                  </span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                  Llamada Diagnóstico B2B: CEO de LogiTech
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Interesado en Plan Retained para reemplazo confidencial de VP Operations & expansión a
                  México.
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    Dial-in Seguro
                  </span>
                  <a className="text-primary font-label-sm text-label-sm hover:underline font-semibold" href="#">
                    Ver Formulario Web
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sincronización de agenda */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container shadow-xs flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[20px]">sync</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Disponibilidad & Sincronización</h4>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse" title="Sincronizado" />
            </div>
            <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-lg border border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">lock_clock</span>
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface block font-semibold">
                    Bloque de Enfoque C-Level
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary">13:00 - 14:30 (No agendable)</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input defaultChecked className="sr-only peer" type="checkbox" />
                <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-container" />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-space-xs pt-space-xs">
              <button className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high font-label-sm text-label-sm text-on-surface transition-colors font-medium">
                <span className="material-symbols-outlined text-[16px] text-primary">cloud_sync</span>
                Google Calendar
              </button>
              <button className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high font-label-sm text-label-sm text-on-surface transition-colors font-medium">
                <span className="material-symbols-outlined text-[16px] text-primary">mail</span>
                Outlook 365
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
