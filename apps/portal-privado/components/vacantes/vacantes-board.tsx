"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { isFieldHidden, type Vacancy, type VacancyVisibleFields } from "@shared/vacancy-types";
import { SECTORS } from "@shared/site-content";
import { createVacancyAction, setVacancyStatusAction, toggleFieldHiddenAction } from "./actions";

const STATUS_LABEL: Record<string, string> = {
  abierta: "Abierta",
  en_proceso: "En proceso",
  cerrada: "Cerrada",
};

const STATUS_TONE: Record<string, string> = {
  abierta: "bg-tertiary-fixed text-tertiary",
  en_proceso: "bg-surface-container text-primary",
  cerrada: "bg-surface-container-low text-secondary",
};

export function VacantesBoard({
  vacancies,
  applicationCounts,
}: {
  vacancies: Vacancy[];
  applicationCounts: Record<string, number>;
}) {
  const [sectorFilter, setSectorFilter] = useState<string>("Todas");
  const [search, setSearch] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    return vacancies.filter((v) => {
      if (sectorFilter !== "Todas" && v.sector !== sectorFilter) return false;
      if (search && !`${v.title} ${v.city}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [vacancies, sectorFilter, search]);

  function toggleField(id: string, field: keyof VacancyVisibleFields, currentlyHidden: boolean) {
    startTransition(() => {
      toggleFieldHiddenAction(id, field, !currentlyHidden);
    });
  }

  function cycleStatus(v: Vacancy) {
    const order = ["abierta", "en_proceso", "cerrada"];
    const next = order[(order.indexOf(v.status) + 1) % order.length];
    startTransition(() => {
      setVacancyStatusAction(v.id, next);
    });
  }

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto px-gutter lg:px-margin py-space-lg w-full flex flex-col gap-space-lg">
        {/* Encabezado */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-primary material-symbols-outlined text-headline-lg">work_outline</span>
              <h1 className="font-headline-xl text-headline-xl text-on-surface">Vacantes Activas</h1>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Espectro completo — desde cargos operativos hasta posiciones ejecutivas. {vacancies.length}{" "}
              vacantes registradas.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setNewOpen(true)}
            className="inline-flex items-center gap-2 bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md px-5 py-2.5 rounded-lg shadow-sm transition-all duration-150 self-start lg:self-auto"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>Crear Nueva Vacante</span>
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md">
          <div className="flex items-center gap-2 overflow-x-auto p-1 bg-surface-container-low rounded-xl">
            {["Todas", ...SECTORS].map((s) => (
              <button
                key={s}
                onClick={() => setSectorFilter(s)}
                className={
                  sectorFilter === s
                    ? "px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm whitespace-nowrap"
                    : "px-3.5 py-1.5 rounded-lg text-secondary hover:text-on-surface font-label-md text-label-md transition-colors whitespace-nowrap"
                }
              >
                {s}
              </button>
            ))}
          </div>
          <div className="relative min-w-[280px] md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[20px]">search</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-surface-container-lowest text-on-surface text-body-md placeholder:text-secondary focus:outline-none shadow-sm"
              placeholder="Buscar por cargo o ciudad..."
              type="text"
            />
          </div>
        </div>

        {/* Lista de vacantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {filtered.map((v) => (
            <div key={v.id} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col gap-space-sm">
              <div className="flex items-start justify-between gap-2">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold ${STATUS_TONE[v.status]}`}>
                  {v.sector}
                </span>
                <button
                  type="button"
                  onClick={() => cycleStatus(v)}
                  disabled={isPending}
                  className="text-[11px] text-secondary hover:text-primary underline-offset-2 hover:underline disabled:opacity-50"
                  title="Cambiar estado"
                >
                  {STATUS_LABEL[v.status]}
                </button>
              </div>
              <h3 className="font-headline-lg text-headline-sm text-on-surface font-bold">{v.title}</h3>
              <p className="font-label-md text-label-md text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">location_on</span> {v.city} ·{" "}
                {v.modality}
              </p>

              <div className="flex flex-col gap-2 bg-surface-container-low p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Salario: {isFieldHidden(v, "salaryRange") ? "Oculto al público" : v.salaryRange}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer" title="Ocultar salario al público">
                    <input
                      type="checkbox"
                      checked={isFieldHidden(v, "salaryRange")}
                      onChange={() => toggleField(v.id, "salaryRange", isFieldHidden(v, "salaryRange"))}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-surface-container-highest peer-checked:bg-primary-container rounded-full transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    Cliente: {isFieldHidden(v, "clientCompany") ? "Oculto al público" : v.clientCompany}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer" title="Ocultar cliente al público">
                    <input
                      type="checkbox"
                      checked={isFieldHidden(v, "clientCompany")}
                      onChange={() => toggleField(v.id, "clientCompany", isFieldHidden(v, "clientCompany"))}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-surface-container-highest peer-checked:bg-primary-container rounded-full transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                  </label>
                </div>
              </div>

              {v.mission && (
                <p className="font-body-sm text-body-sm text-on-surface-variant">{v.mission}</p>
              )}

              <Link
                href={`/postulaciones/${v.id}`}
                className="mt-auto inline-flex items-center justify-center gap-2 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md px-3 py-2 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">groups</span>
                {applicationCounts[v.id] ?? 0} postulación{(applicationCounts[v.id] ?? 0) === 1 ? "" : "es"}
              </Link>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-secondary font-body-md py-space-lg">
              No hay vacantes que coincidan con el filtro.
            </p>
          )}
        </div>
      </div>

      {/* Modal Crear Nueva Vacante */}
      {newOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest max-w-2xl w-full rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="bg-surface-container-low p-space-md flex items-center justify-between sticky top-0">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-headline-lg">add_business</span>
                <div>
                  <h3 className="font-headline-lg text-headline-sm text-on-surface font-bold">Crear Nueva Vacante</h3>
                  <p className="font-body-sm text-body-sm text-secondary">Se publica en la Bolsa de Empleos al guardar</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNewOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <form
              className="p-space-lg flex flex-col gap-space-md"
              action={async (formData) => {
                await createVacancyAction(formData);
                setNewOpen(false);
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1">Título del cargo</label>
                  <input name="title" required className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" placeholder="Ej: Auxiliar de Enfermería" />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1">Empresa / Cliente</label>
                  <input name="clientCompany" className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" placeholder="Nombre real del cliente" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1">Sector</label>
                  <select name="sector" required className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none">
                    {SECTORS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1">Nivel del cargo</label>
                  <select name="positionLevel" className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none">
                    <option value="">Sin definir</option>
                    <option>Operativo</option>
                    <option>Administrativo</option>
                    <option>Profesional</option>
                    <option>Coordinación</option>
                    <option>Gerencia</option>
                    <option>Dirección</option>
                    <option>Ejecutivo</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1">Ciudad</label>
                  <input name="location" required className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" placeholder="Ej: Bogotá" />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1">Modalidad</label>
                  <select name="modality" className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none">
                    <option>Presencial</option>
                    <option>Remoto</option>
                    <option>Híbrido</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1">Rango salarial (real)</label>
                <input name="salaryRange" className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" placeholder="Ej: $2.000.000 - $2.500.000 COP" />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1">Descripción</label>
                <textarea name="description" rows={3} className="w-full p-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" placeholder="Funciones principales, requisitos..." />
              </div>
              <div className="flex flex-col gap-2 bg-surface-container-low p-3 rounded-lg">
                <label className="flex items-center gap-2 text-body-sm text-on-surface">
                  <input type="checkbox" name="hideSalary" defaultChecked className="accent-primary" />
                  Ocultar salario al público (recomendado)
                </label>
                <label className="flex items-center gap-2 text-body-sm text-on-surface">
                  <input type="checkbox" name="hideClient" defaultChecked className="accent-primary" />
                  Ocultar nombre del cliente al público (recomendado)
                </label>
              </div>

              <div className="flex flex-col gap-space-sm bg-surface-container-low p-3 rounded-lg">
                <span className="font-label-sm text-label-sm text-primary font-semibold uppercase tracking-wide text-[11px]">
                  Criterios de filtro (opcional) — para puntuar postulaciones
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface mb-1">Años mínimos de experiencia</label>
                    <input name="minExperienceYears" type="number" step="0.5" min={0} className="w-full h-10 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md focus:outline-none" />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface mb-1">Nivel de estudios mínimo</label>
                    <select name="minEducationLevel" className="w-full h-10 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md focus:outline-none">
                      <option value="">Sin definir</option>
                      <option>Bachiller</option>
                      <option>Técnico</option>
                      <option>Tecnólogo</option>
                      <option>Profesional</option>
                      <option>Especialización</option>
                      <option>Maestría</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface mb-1">Salario mínimo presupuestado</label>
                    <input name="salaryMin" type="number" min={0} className="w-full h-10 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md focus:outline-none" />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface mb-1">Salario máximo presupuestado</label>
                    <input name="salaryMax" type="number" min={0} className="w-full h-10 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md focus:outline-none" />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface mb-1">Nivel de Excel requerido</label>
                    <select name="requiredExcelLevel" className="w-full h-10 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md focus:outline-none">
                      <option value="">Sin definir</option>
                      <option>Básico</option>
                      <option>Intermedio</option>
                      <option>Avanzado</option>
                    </select>
                  </div>
                </div>
                <p className="font-body-sm text-[11px] text-secondary">
                  Lo que dejes en blanco no se usa para puntuar — no penaliza a los candidatos.
                </p>
              </div>
              <div className="flex items-center justify-end gap-3 pt-space-xs">
                <button type="button" onClick={() => setNewOpen(false)} className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors">
                  Descartar
                </button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-all">
                  Publicar Vacante
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
