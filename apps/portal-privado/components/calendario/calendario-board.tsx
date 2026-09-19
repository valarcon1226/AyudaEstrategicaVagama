"use client";

import { useState } from "react";
import { CONTACT } from "@shared/site-content";

// TODO: datos de ejemplo (mock) — reemplazar por eventos reales sincronizados
// con Google Calendar / Outlook 365 una vez esté conectada la integración.
// Contenido tomado del diseño de Stitch ("Portal Privado - Calendario & Agendamiento").

const KPIS = [
  {
    label: "Citas Programadas",
    icon: "event_available",
    iconBg: "bg-surface-container",
    value: "18",
    badge: "+3 vs anterior",
    badgeIcon: "trending_up",
    note: "Capacidad semanal al 78%",
    progress: 78,
    progressColor: "bg-primary",
  },
  {
    label: "Presentaciones Terna",
    icon: "groups",
    iconBg: "bg-primary-fixed",
    value: "4",
    badge: "Críticas",
    badgeTone: "pill" as const,
    note: "Directorios FinTech y Retail C-Level",
    progress: 100,
    progressColor: "bg-primary-container",
  },
  {
    label: "Horas de Enfoque / Filtro",
    icon: "psychology",
    iconBg: "bg-surface-container-high",
    value: "14.5",
    valueUnit: "hrs",
    note: "Evaluación técnica y mapping confidencial",
    progress: 65,
    progressColor: "bg-tertiary",
  },
  {
    label: "Tasa Asistencia / Puntualidad",
    icon: "verified",
    iconBg: "bg-tertiary-fixed",
    value: "98.4%",
    badge: "Seguro",
    badgeIcon: "lock",
    note: "Conexión con Salas Blindadas",
    progress: 98,
    progressColor: "bg-tertiary-container",
  },
];

type CalEvent = {
  tag: string;
  tagClass: string;
  icon: string;
  iconClass: string;
  title: string;
  subtitle?: string;
  time: string;
  marginTop: string;
  height: string;
  boxClass: string;
  emphasis?: boolean;
};

const DAYS: { label: string; date: string; today?: boolean; events: CalEvent[] }[] = [
  {
    label: "LUN",
    date: "21",
    events: [
      {
        tag: "",
        tagClass: "",
        icon: "",
        iconClass: "",
        title: "Revisión Pipeline Semanal",
        time: "08:30 - 09:15",
        marginTop: "mt-0",
        height: "h-14",
        boxClass: "bg-surface-container-high/60 text-on-surface-variant",
      },
      {
        tag: "FILTRO",
        tagClass: "bg-emerald-100 text-emerald-800",
        icon: "videocam",
        iconClass: "text-emerald-700",
        title: "Alejandro Ramos",
        subtitle: "CFO Vacancy (Ex-MercadoLibre)",
        time: "10:30 - 11:30",
        marginTop: "mt-4",
        height: "h-28",
        boxClass: "bg-emerald-50 text-emerald-950 shadow-sm",
      },
      {
        tag: "",
        tagClass: "",
        icon: "lock",
        iconClass: "",
        title: "Bloque Enfoque",
        subtitle: "Talent Mapping C-Suite",
        time: "15:30 - 16:30",
        marginTop: "mt-12",
        height: "h-20",
        boxClass: "bg-secondary-fixed/50 text-on-secondary-fixed shadow-xs",
      },
    ],
  },
  {
    label: "MAR",
    date: "22",
    events: [
      {
        tag: "B2B CALL",
        tagClass: "bg-indigo-100 text-indigo-800",
        icon: "call",
        iconClass: "text-indigo-700",
        title: "Kuantum Financial",
        subtitle: "CEO Requerimiento CRO",
        time: "09:30 - 10:15",
        marginTop: "mt-8",
        height: "h-24",
        boxClass: "bg-indigo-50 text-indigo-950 shadow-sm",
      },
      {
        tag: "CALIBRACIÓN",
        tagClass: "bg-amber-100 text-amber-800",
        icon: "rule",
        iconClass: "text-amber-700",
        title: "Diego Navarro",
        subtitle: "VP Operations (Rappi)",
        time: "14:00 - 14:45",
        marginTop: "mt-16",
        height: "h-24",
        boxClass: "bg-amber-50 text-amber-950 shadow-sm",
      },
    ],
  },
  {
    label: "MIÉ (HOY)",
    date: "23",
    today: true,
    events: [
      {
        tag: "TERNA C-SUITE",
        tagClass: "bg-white/20 text-white uppercase tracking-wider",
        icon: "videocam",
        iconClass: "",
        title: "VP Engineering Presentation",
        subtitle: "Fintech Global Corp • Google Meet Sala Segura",
        time: "11:00 - 12:15 (En 15 min)",
        marginTop: "mt-16",
        height: "h-32",
        boxClass: "bg-primary-container text-on-primary shadow-md ring-2 ring-primary",
        emphasis: true,
      },
      {
        tag: "FILTRO",
        tagClass: "bg-emerald-100 text-emerald-800",
        icon: "mic",
        iconClass: "text-emerald-700",
        title: "Lucía Valenzuela",
        subtitle: "Head of Risk & Legal",
        time: "15:30 - 16:15",
        marginTop: "mt-20",
        height: "h-20",
        boxClass: "bg-emerald-50 text-emerald-950 shadow-sm",
      },
    ],
  },
  {
    label: "JUE",
    date: "24",
    events: [
      {
        tag: "TERNA",
        tagClass: "bg-primary/10 text-primary",
        icon: "groups",
        iconClass: "text-primary",
        title: "Terna Chief Data Officer",
        subtitle: "Banco Regional Andino",
        time: "08:30 - 09:30",
        marginTop: "mt-2",
        height: "h-24",
        boxClass: "bg-primary-container/10 text-on-surface shadow-xs",
      },
      {
        tag: "",
        tagClass: "",
        icon: "lock",
        iconClass: "",
        title: "Headhunting Confidencial",
        subtitle: "Sourcing directivo Board",
        time: "11:00 - 13:00",
        marginTop: "mt-12",
        height: "h-28",
        boxClass: "bg-surface-container-high text-on-surface shadow-xs",
      },
      {
        tag: "B2B CALL",
        tagClass: "bg-indigo-100 text-indigo-800",
        icon: "",
        iconClass: "",
        title: "Grupo Alianza Logística",
        time: "16:30 - 17:15",
        marginTop: "mt-16",
        height: "h-20",
        boxClass: "bg-indigo-50 text-indigo-950 shadow-xs",
      },
    ],
  },
  {
    label: "VIE",
    date: "25",
    events: [
      {
        tag: "FILTRO",
        tagClass: "bg-emerald-100 text-emerald-800",
        icon: "person_search",
        iconClass: "text-emerald-700",
        title: "Martín Sotomayor",
        subtitle: "Managing Director LatAm",
        time: "10:00 - 11:00",
        marginTop: "mt-10",
        height: "h-24",
        boxClass: "bg-emerald-50 text-emerald-950 shadow-sm",
      },
      {
        tag: "TERNA FINAL",
        tagClass: "bg-primary/20 text-primary",
        icon: "handshake",
        iconClass: "text-primary",
        title: "Revisión de Oferta C-Level",
        subtitle: "Board Nexa Energy",
        time: "14:00 - 15:00",
        marginTop: "mt-14",
        height: "h-24",
        boxClass: "bg-primary-container/15 text-on-surface shadow-xs",
      },
      {
        tag: "",
        tagClass: "",
        icon: "",
        iconClass: "",
        title: "Cierre Operativo Semanal",
        time: "17:00",
        marginTop: "mt-12",
        height: "h-16",
        boxClass: "bg-surface-container-high/70 text-secondary shadow-xs",
      },
    ],
  },
];

const PENDING_REQUESTS = [
  {
    kind: "Empresa Cliente B2B",
    kindClass: "text-primary",
    name: "Solfin Capital Partners",
    detail: "Llamada Diagnóstico Reestructuración",
    ago: "Hace 34 min",
    slot: "Solicita: Jueves 24 Oct • 15:00 - 15:30",
    primaryLabel: "Aprobar Slot",
    secondaryLabel: "Proponer Otro",
  },
  {
    kind: "Candidato Calificado",
    kindClass: "text-tertiary",
    name: "Rodrigo Peñaloza",
    detail: "Entrevista Técnica CFO Mandate",
    ago: "Hace 2h",
    slot: "Solicita: Viernes 25 Oct • 11:30 - 12:15",
    primaryLabel: "Aprobar Slot",
    secondaryLabel: "Proponer Otro",
  },
  {
    kind: "Alineación Interna",
    kindClass: "text-indigo-700",
    name: "Mariana Soler (Partner)",
    detail: "Calibración de Honorarios Board",
    ago: "Ayer",
    slot: null,
    primaryLabel: "Aceptar 30m",
    secondaryLabel: "Reagendar",
  },
];

const QUICK_TYPES = [
  { dot: "bg-emerald-500", title: "Entrevista Filtro Candidato", detail: "Evaluación Técnica / 45 min" },
  { dot: "bg-primary-container", title: "Presentación de Terna C-Suite", detail: "Con Directorio / 60 min" },
  { dot: "bg-indigo-600", title: "Llamada Diagnóstico B2B", detail: "Calificación Cliente / 30 min" },
];

export function CalendarioBoard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`https://${CONTACT.domain}/meet/aida-gamboa`);
    } catch {
      // clipboard puede no estar disponible; el enlace ya queda visible en pantalla
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="max-w-[1440px] w-full mx-auto px-margin py-space-lg flex flex-col gap-space-lg">
      {/* Header & Control Hub */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
        <div className="flex flex-col gap-space-xs max-w-2xl">
          <div className="flex items-center gap-space-sm flex-wrap">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[24px]">calendar_month</span>
            </div>
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Agenda Ejecutiva & Coordinación de Entrevistas
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Gestión centralizada de entrevistas filtro, presentación de ternas a directorios y llamadas
                de diagnóstico B2B.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm mt-space-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse inline-block" />
              <span>Sincronización en tiempo real activa (Google Calendar & Microsoft Outlook 365)</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-space-sm self-start lg:self-center shrink-0">
          <button
            type="button"
            onClick={() =>
              alert(
                "Se ha habilitado la herramienta de reserva de Bloque de Enfoque. Selecciona un horario libre en la cuadrícula."
              )
            }
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md"
          >
            <span className="material-symbols-outlined text-[18px]">lock_clock</span>
            <span>Bloque de Enfoque</span>
          </button>
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary hover:bg-primary shadow-sm hover:shadow transition-all font-label-md text-label-md"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>Agendar Nueva Cita</span>
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-surface-container-lowest shadow-xl p-2 z-30">
                <div className="p-2 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Tipo de Requerimiento
                </div>
                {QUICK_TYPES.map((t) => (
                  <a
                    key={t.title}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-container-low transition-colors text-on-surface font-label-md text-label-md"
                    href="#"
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${t.dot}`} />
                    <div>
                      <p className="leading-none">{t.title}</p>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">{t.detail}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Timeline & Mode Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-space-md bg-surface-container-lowest px-space-md py-space-sm rounded-xl shadow-sm">
        <div className="flex items-center gap-space-sm w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
            <button className="p-1.5 rounded-md hover:bg-surface-container-highest text-on-surface-variant transition-colors" title="Semana anterior">
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button className="px-3 py-1 rounded-md text-on-surface hover:bg-surface-container-highest font-label-md text-label-md transition-colors">
              Hoy
            </button>
            <button className="p-1.5 rounded-md hover:bg-surface-container-highest text-on-surface-variant transition-colors" title="Semana siguiente">
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-headline-sm text-on-surface">Semana del 21 al 27 de Octubre, 2024</span>
            <span className="hidden xl:inline-flex px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              GMT-5 (Bogotá/Lima)
            </span>
          </div>
        </div>
        <div className="flex items-center bg-surface-container-low p-1 rounded-lg self-stretch md:self-auto justify-center">
          <button className="px-3 py-1.5 rounded-md font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all">
            Día
          </button>
          <button className="px-4 py-1.5 rounded-md font-label-md text-label-md bg-surface-container-lowest text-primary shadow-sm transition-all font-bold">
            Semana laboral
          </button>
          <button className="px-3 py-1.5 rounded-md font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all">
            Mes
          </button>
          <button className="px-3 py-1.5 rounded-md font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all">
            Lista de compromisos
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {KPIS.map((k) => (
          <div key={k.label} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-start justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">{k.label}</span>
              <span className={`p-2 rounded-lg ${k.iconBg} text-primary`}>
                <span className="material-symbols-outlined text-[20px]">{k.icon}</span>
              </span>
            </div>
            <div className="mt-2">
              <div className="flex items-baseline gap-2">
                <span className="font-metric-display text-metric-display text-on-surface">
                  {k.value}
                  {k.valueUnit && <span className="text-headline-sm font-normal text-secondary"> {k.valueUnit}</span>}
                </span>
                {k.badge && k.badgeTone === "pill" ? (
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
                    {k.badge}
                  </span>
                ) : k.badge ? (
                  <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-1 font-bold">
                    {k.badgeIcon && <span className="material-symbols-outlined text-[16px]">{k.badgeIcon}</span>}
                    {k.badge}
                  </span>
                ) : null}
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{k.note}</p>
            </div>
            <div className="w-full bg-surface-container h-1 rounded-full mt-3 overflow-hidden">
              <div className={`${k.progressColor} h-full rounded-full`} style={{ width: `${k.progress}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Main layout: calendar grid + operations panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-md">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm text-on-surface">Horario Semanal Activo</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container font-medium text-secondary">Semana 43</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 font-body-sm text-body-sm text-on-surface-variant">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary" /><span>Terna C-Suite</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /><span>Filtro Candidato</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /><span>Diagnóstico B2B</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /><span>Calibración</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-secondary" /><span>Enfoque Privado</span></div>
            </div>
          </div>

          <div className="overflow-x-auto relative">
            <div className="min-w-[760px]">
              <div className="grid grid-cols-6 gap-2 bg-surface-container-low p-2 rounded-t-lg text-center font-label-md text-label-md text-on-surface">
                <div className="text-left pl-2 text-on-surface-variant font-label-sm text-label-sm uppercase self-center">Hora</div>
                {DAYS.map((d) => (
                  <div
                    key={d.label}
                    className={d.today ? "py-1 bg-surface-container-lowest rounded-md shadow-xs ring-1 ring-primary/20 text-primary" : "py-1"}
                  >
                    <span className={d.today ? "block text-primary font-label-sm text-label-sm font-bold" : "block text-secondary font-label-sm text-label-sm"}>
                      {d.label}
                    </span>
                    <span className={d.today ? "text-headline-sm font-headline-sm font-bold" : "text-headline-sm font-headline-sm"}>
                      {d.date}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative grid grid-cols-6 gap-2 pt-2">
                <div className="flex flex-col gap-6 py-2 pr-2 text-right font-body-sm text-body-sm text-outline">
                  {["08:30", "09:30", "10:30", "11:30", "12:30", "14:00", "15:30", "17:00"].map((t) => (
                    <div key={t} className="h-12 flex items-center justify-end">{t}</div>
                  ))}
                </div>
                {DAYS.map((d) => (
                  <div
                    key={d.label}
                    className={
                      d.today
                        ? "flex flex-col gap-2 relative bg-surface-container-low/70 p-1 rounded-md min-h-[460px]"
                        : "flex flex-col gap-2 relative bg-surface/50 p-1 rounded-md min-h-[460px]"
                    }
                  >
                    {d.events.map((e, i) => (
                      <div key={i} className={`${e.height} ${e.marginTop} ${e.boxClass} rounded-md p-2.5 flex flex-col justify-between`}>
                        {(e.tag || e.icon) && (
                          <div className="flex items-center justify-between">
                            {e.tag && (
                              <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${e.tagClass}`}>{e.tag}</span>
                            )}
                            {e.emphasis && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
                            {e.icon && !e.emphasis && (
                              <span className={`material-symbols-outlined text-[14px] ${e.iconClass}`}>{e.icon}</span>
                            )}
                          </div>
                        )}
                        <p className="font-label-md text-label-md mt-1 leading-tight font-semibold">{e.title}</p>
                        {e.subtitle && <p className="text-[11px] truncate opacity-80">{e.subtitle}</p>}
                        <span className="text-[10px] block mt-1 opacity-80">{e.time}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm bg-surface-container-low/50 px-3 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-primary">info</span>
              <span>Los eventos con candado no permiten reservas automatizadas de clientes ni candidatos externos.</span>
            </div>
            <button className="text-primary font-label-sm text-label-sm hover:underline">Ajustar zonas horarias</button>
          </div>
        </div>

        {/* Operations panel */}
        <div className="lg:col-span-4 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-md relative overflow-hidden ring-1 ring-primary/20">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">timer</span> En 15 Minutos (11:00 AM)
              </span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Presentación de Terna: VP of Engineering</h2>
            <p className="font-body-md text-body-md text-secondary mt-0.5">Mandato Confidencial • Fintech Global</p>
            <div className="mt-space-md p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-label-sm font-bold">
                    CO
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface leading-tight">Camila Ortiz (Candidata)</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Ex-VP Platform en Nubank</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed rounded text-xs font-bold">96% Fit</span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-label-sm text-xs font-bold">
                  AM
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface leading-tight">Andrés Morales (CTO Cliente)</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Entrevistador Principal</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-space-md">
              <a
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all shadow-sm"
                href="https://meet.google.com"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">video_call</span>
                <span>Unirse a Google Meet Seguro</span>
              </a>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors">
                  <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                  <span>Dossier CV (PDF)</span>
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">lock_person</span>
                  <span>Notas Privadas</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Solicitudes Pendientes</h3>
                <span className="w-5 h-5 rounded-full bg-error-container text-on-error-container font-label-sm text-[11px] flex items-center justify-center font-bold">
                  {PENDING_REQUESTS.length}
                </span>
              </div>
              <button className="font-label-sm text-label-sm text-primary hover:underline">Revisar todas</button>
            </div>
            {PENDING_REQUESTS.map((r) => (
              <div key={r.name} className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`text-[10px] font-bold tracking-wider uppercase ${r.kindClass}`}>{r.kind}</span>
                    <p className="font-label-md text-label-md text-on-surface leading-tight mt-0.5">{r.name}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{r.detail}</p>
                  </div>
                  <span className="text-[11px] text-secondary font-medium">{r.ago}</span>
                </div>
                {r.slot && (
                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded">
                    <span className="material-symbols-outlined text-[14px]">calendar_clock</span>
                    <span>{r.slot}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <button className="flex-1 py-1 px-2 rounded bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-colors">
                    {r.primaryLabel}
                  </button>
                  <button className="flex-1 py-1 px-2 rounded bg-surface-container-highest hover:bg-surface-dim text-on-surface font-label-sm text-label-sm transition-colors">
                    {r.secondaryLabel}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Canales de Reserva & Sync</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Enlaces compartibles de agendamiento automático.</p>
            </div>
            <div className="p-3 rounded-lg bg-surface-container-low">
              <span className="text-xs font-semibold text-secondary block mb-1">Link VIP Clientes Corporativos:</span>
              <div className="flex items-center gap-2 bg-surface-container-lowest p-2 rounded-md">
                <span className="font-body-sm text-body-sm text-primary truncate">{CONTACT.domain}/meet/aida-gamboa</span>
                <button
                  type="button"
                  onClick={copyLink}
                  className="shrink-0 p-1 rounded hover:bg-surface-container text-secondary transition-colors"
                  title="Copiar Enlace"
                >
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                </button>
              </div>
              {copied && (
                <span className="text-[11px] text-tertiary block mt-1 font-medium">¡Enlace copiado al portapapeles!</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Integraciones en vivo</span>
              {[
                { icon: "calendar_today", label: "Google Calendar Exec" },
                { icon: "mail", label: "Microsoft Outlook 365" },
                { icon: "videocam", label: "Zoom / Meet Room Blindada" },
              ].map((i) => (
                <div key={i.label} className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">{i.icon}</span>
                    <span className="font-label-md text-label-md text-on-surface">{i.label}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> Conectado
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-2 flex items-center justify-between bg-surface-container-low p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">do_not_disturb_on</span>
                <div>
                  <p className="font-label-md text-label-md text-on-surface leading-none">Modo Fuera de Oficina</p>
                  <span className="text-[11px] text-on-surface-variant">Bloquea reservas externas</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input className="sr-only peer" type="checkbox" />
                <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-container" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
