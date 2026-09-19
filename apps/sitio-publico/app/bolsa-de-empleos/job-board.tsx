"use client";

import { useActionState, useMemo, useState } from "react";
import type { PublicVacancy } from "@shared/vacancies";
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
              <span className="material-symbols-outlined text-[16px]">location_on</span> {v.location} ·{" "}
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

function ApplyModal({ vacancy, onClose }: { vacancy: PublicVacancy; onClose: () => void }) {
  const [state, formAction, pending] = useActionState<ApplyState, FormData>(applyToVacancyAction, null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4">
      <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-surface-container-low p-space-md flex items-center justify-between">
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
          <form action={formAction} className="p-space-lg flex flex-col gap-space-md">
            <input type="hidden" name="vacancyId" value={vacancy.id} />
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1">Nombre completo</label>
              <input name="fullName" required className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1">Correo</label>
              <input name="email" type="email" required className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1">Teléfono</label>
              <input name="phone" required className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1">Mensaje (opcional)</label>
              <textarea name="message" rows={3} className="w-full p-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" />
            </div>
            {state?.error && <p className="text-error font-body-sm text-body-sm">{state.error}</p>}
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md px-4 py-2.5 rounded-lg shadow-sm transition-all disabled:opacity-60"
            >
              {pending ? "Enviando..." : "Enviar postulación"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
