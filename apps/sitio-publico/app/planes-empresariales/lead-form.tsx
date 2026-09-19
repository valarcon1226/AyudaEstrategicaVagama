"use client";

import { useActionState } from "react";
import { submitLeadAction, type LeadState } from "./actions";
import { CONTACT } from "@shared/site-content";

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

export function LeadForm() {
  const [state, formAction, pending] = useActionState<LeadState, FormData>(submitLeadAction, null);

  if (state?.ok) {
    return (
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col items-center gap-space-sm text-center">
        <span className="material-symbols-outlined text-tertiary text-4xl">check_circle</span>
        <h3 className="font-headline-lg text-headline-sm text-on-surface font-bold">¡Recibido!</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Te contactaremos pronto. Si es urgente, escríbenos directo por WhatsApp al {CONTACT.phone}.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-lg max-h-[80vh] overflow-y-auto">
      <div className="flex flex-col gap-space-sm">
        <span className="font-label-md text-label-md text-primary font-semibold uppercase tracking-wide text-[11px]">
          Datos de contacto
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          <Field label="Nombre completo *">
            <input name="contactName" required className={inputClass} />
          </Field>
          <Field label="Cargo">
            <input name="contactRole" className={inputClass} />
          </Field>
          <Field label="Nombre de la empresa *">
            <input name="companyName" required className={inputClass} />
          </Field>
          <Field label="Correo corporativo *">
            <input name="corporateEmail" type="email" required className={inputClass} />
          </Field>
          <Field label="Teléfono de contacto *">
            <input name="phone" required className={inputClass} />
          </Field>
        </div>
      </div>

      <div className="flex flex-col gap-space-sm">
        <span className="font-label-md text-label-md text-primary font-semibold uppercase tracking-wide text-[11px]">
          Información de la necesidad
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          <Field label="Servicio de interés">
            <select name="serviceInterest" className={inputClass}>
              <option value="">Selecciona…</option>
              <option>Headhunting</option>
              <option>Evaluación de talento</option>
              <option>Assessment</option>
              <option>Consultoría RH</option>
              <option>Capacitación</option>
              <option>Otro</option>
            </select>
          </Field>
          <Field label="Número de vacantes a cubrir">
            <input name="vacanciesCount" type="number" min={1} className={inputClass} />
          </Field>
          <Field label="Ciudad o país de la contratación">
            <input name="hiringLocation" className={inputClass} />
          </Field>
          <Field label="Nivel de la posición">
            <select name="positionLevel" className={inputClass}>
              <option value="">Selecciona…</option>
              <option>Operativo</option>
              <option>Administrativo</option>
              <option>Profesional</option>
              <option>Coordinación</option>
              <option>Gerencia</option>
              <option>Dirección</option>
              <option>Ejecutivo</option>
            </select>
          </Field>
          <Field label="Fecha estimada de inicio del proceso">
            <input name="estimatedStartDate" className={inputClass} placeholder="Ej: en 2 semanas" />
          </Field>
        </div>
      </div>

      <div className="flex flex-col gap-space-sm">
        <span className="font-label-md text-label-md text-primary font-semibold uppercase tracking-wide text-[11px]">
          Detalles de la solicitud
        </span>
        <Field label="Describa brevemente su necesidad o reto actual">
          <textarea name="needDescription" rows={3} className="w-full p-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          <Field label="Salario para la posición">
            <input name="offeredSalary" className={inputClass} />
          </Field>
          <Field label="Beneficios adicionales">
            <input name="additionalBenefits" className={inputClass} />
          </Field>
          <Field label="Horario de trabajo">
            <input name="workSchedule" className={inputClass} />
          </Field>
          <Field label="Ubicación de la vacante">
            <input name="vacancyLocation" className={inputClass} />
          </Field>
        </div>
      </div>

      <div className="flex flex-col gap-space-sm">
        <span className="font-label-md text-label-md text-primary font-semibold uppercase tracking-wide text-[11px]">
          Agenda
        </span>
        <Field label="Horario preferido para contacto">
          <select name="preferredContactTime" className={inputClass}>
            <option value="">Selecciona…</option>
            <option>Mañana</option>
            <option>Tarde</option>
            <option>Cualquier horario</option>
          </select>
        </Field>
      </div>

      <label className="flex items-start gap-2 text-body-sm text-on-surface-variant">
        <input type="checkbox" name="dataConsent" required className="mt-0.5 accent-primary" />
        <span>Autorizo el tratamiento de mis datos personales de acuerdo con la Política de Privacidad. *</span>
      </label>

      {state?.error && <p className="text-error font-body-sm text-body-sm">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md px-5 py-3 rounded-lg shadow-sm transition-all disabled:opacity-60"
      >
        {pending ? "Enviando..." : "Solicitar Consulta Gratuita"}
      </button>
    </form>
  );
}
