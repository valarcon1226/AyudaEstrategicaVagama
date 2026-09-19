"use client";

import { useActionState, useMemo, useState } from "react";
import type { PublicVacancy } from "@shared/vacancy-types";
import { SECTORS } from "@shared/site-content";
import { applyToVacancyAction, type ApplyState } from "./actions";

export function JobBoard({ vacancies }: { vacancies: PublicVacancy[] }) {
  const [sectorFilter, setSectorFilter] = useState<string>("Todas");
  const [applyTo, setApplyTo] = useState<PublicVacancy | null>(null);

  const filtered = useMemo(
    () => vacancies.filter((v) => sectorFilter === "Todas" || v.sector === sectorFilter),
    [vacancies, sectorFilter]
  );

  return (
    <div className="max-w-7xl mx-auto px-gutter lg:px-margin py-space-xl w-full flex flex-col gap-space-lg">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-headline-xl text-headline-xl text-on-surface">Vacantes Abiertas</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">
          Tú pides, nosotros buscamos — cargos operativos, administrativos y ejecutivos en Colombia y
          México.
        </p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto p-1 bg-surface-container-low rounded-xl mx-auto">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {filtered.map((v) => (
          <div key={v.id} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col gap-space-sm">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold self-start">
              {v.sector}
            </span>
            <h3 className="font-headline-lg text-headline-sm text-on-surface font-bold">{v.title}</h3>
            <p className="font-label-md text-label-md text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">location_on</span> {v.city} ·{" "}
              {v.modality}
            </p>
            {v.salaryRange && (
              <p className="font-body-sm text-body-sm text-on-surface-variant">Salario: {v.salaryRange}</p>
            )}
            <button
              type="button"
              onClick={() => setApplyTo(v)}
              className="mt-auto inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md px-4 py-2.5 rounded-lg shadow-sm transition-all"
            >
              Aplicar
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-secondary font-body-md py-space-lg">
            No hay vacantes abiertas en este sector por ahora.
          </p>
        )}
      </div>

      {applyTo && <ApplyModal vacancy={applyTo} onClose={() => setApplyTo(null)} />}
    </div>
  );
}

const inputClass =
  "w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none";
const labelClass = "block font-label-sm text-label-sm text-on-surface mb-1";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-space-sm">
      <span className="font-label-md text-label-md text-primary font-semibold uppercase tracking-wide text-[11px]">
        {title}
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">{children}</div>
    </div>
  );
}

function ApplyModal({ vacancy, onClose }: { vacancy: PublicVacancy; onClose: () => void }) {
  const [state, formAction, pending] = useActionState<ApplyState, FormData>(applyToVacancyAction, null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4">
      <div className="bg-surface-container-lowest max-w-2xl w-full rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-surface-container-low p-space-md flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-headline-lg text-headline-sm text-on-surface font-bold">Aplicar a la vacante</h3>
            <p className="font-body-sm text-body-sm text-secondary">{vacancy.title}</p>
          </div>
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        {state?.ok ? (
          <div className="p-space-lg flex flex-col items-center gap-space-sm text-center">
            <span className="material-symbols-outlined text-tertiary text-4xl">check_circle</span>
            <p className="font-body-md text-body-md text-on-surface">
              ¡Listo! Recibimos tu postulación. Nos pondremos en contacto contigo.
            </p>
            <button onClick={onClose} className="mt-space-sm px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md">
              Cerrar
            </button>
          </div>
        ) : (
          <form action={formAction} className="p-space-lg flex flex-col gap-space-lg overflow-y-auto">
            <input type="hidden" name="vacancyId" value={vacancy.id} />

            <Section title="Datos personales">
              <Field label="Nombre completo *">
                <input name="fullName" required className={inputClass} />
              </Field>
              <Field label="Ciudad de residencia *">
                <input name="residenceCity" required className={inputClass} />
              </Field>
              <Field label="Teléfono *">
                <input name="phone" required className={inputClass} />
              </Field>
              <Field label="Correo electrónico *">
                <input name="email" type="email" required className={inputClass} />
              </Field>
              <Field label="Edad">
                <input name="age" type="number" min={0} className={inputClass} />
              </Field>
              <Field label="Nacionalidad">
                <input name="nationality" className={inputClass} />
              </Field>
              <Field label="LinkedIn (opcional)">
                <input name="linkedin" className={inputClass} placeholder="linkedin.com/in/..." />
              </Field>
              <Field label="Enlace a tu hoja de vida (Drive, Dropbox...)">
                <input name="cvUrl" className={inputClass} />
              </Field>
            </Section>

            <Section title="Nivel de estudios">
              <Field label="Nivel de estudios">
                <select name="educationLevel" className={inputClass}>
                  <option value="">Selecciona…</option>
                  <option>Bachiller</option>
                  <option>Técnico</option>
                  <option>Tecnólogo</option>
                  <option>Profesional</option>
                  <option>Especialización</option>
                  <option>Maestría</option>
                </select>
              </Field>
              <Field label="Título obtenido">
                <input name="degreeObtained" className={inputClass} />
              </Field>
            </Section>

            <Section title="Experiencia laboral">
              <Field label="Años totales de experiencia">
                <input name="totalExperienceYears" type="number" step="0.5" min={0} className={inputClass} />
              </Field>
              <Field label="Cargo actual o último cargo">
                <input name="currentOrLastPosition" className={inputClass} />
              </Field>
              <Field label="Sector en el que ha trabajado">
                <input name="sectorExperience" className={inputClass} />
              </Field>
              <Field label="Personas lideradas (si aplica)">
                <input name="peopleLed" className={inputClass} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Empresas donde ha trabajado (últimos 3 empleos) *">
                  <textarea name="lastThreeEmployers" required rows={2} className="w-full p-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" placeholder="Mínimo dos empresas" />
                </Field>
              </div>
            </Section>

            <Section title="Expectativa salarial">
              <Field label="Aspiración salarial mensual">
                <input name="salaryExpectation" type="number" min={0} className={inputClass} />
              </Field>
              <Field label="¿Es negociable?">
                <select name="salaryNegotiable" className={inputClass}>
                  <option value="">Selecciona…</option>
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </Field>
            </Section>

            <Section title="Disponibilidad">
              <Field label="¿Trabaja actualmente?">
                <select name="currentlyEmployed" className={inputClass}>
                  <option value="">Selecciona…</option>
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </Field>
              <Field label="Tiempo de preaviso para retiro">
                <input name="noticePeriod" className={inputClass} />
              </Field>
              <Field label="Disponibilidad para viajar">
                <input name="travelAvailability" className={inputClass} />
              </Field>
              <Field label="Disponibilidad para cambio de residencia">
                <input name="relocationAvailability" className={inputClass} />
              </Field>
              <Field label="Modalidad preferida">
                <select name="preferredModality" className={inputClass}>
                  <option value="">Selecciona…</option>
                  <option>Presencial</option>
                  <option>Híbrida</option>
                  <option>Remota</option>
                </select>
              </Field>
            </Section>

            <Section title="Competencias">
              <Field label="Nivel de Excel">
                <select name="excelLevel" className={inputClass}>
                  <option value="">Selecciona…</option>
                  <option>Básico</option>
                  <option>Intermedio</option>
                  <option>Avanzado</option>
                </select>
              </Field>
              <Field label="Herramientas específicas (SAP, Power BI, CRM, ATS...)">
                <input name="specificTools" className={inputClass} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Idiomas y nivel">
                  <input name="languages" className={inputClass} placeholder="Ej: Inglés avanzado, Portugués básico" />
                </Field>
              </div>
            </Section>

            {state?.error && <p className="text-error font-body-sm text-body-sm">{state.error}</p>}
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md px-4 py-2.5 rounded-lg shadow-sm transition-all disabled:opacity-60 shrink-0"
            >
              {pending ? "Enviando..." : "Enviar postulación"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
