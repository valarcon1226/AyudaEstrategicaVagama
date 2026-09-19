"use client";

import { useActionState } from "react";
import { submitLeadAction, type LeadState } from "./actions";
import { CONTACT } from "@shared/site-content";

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
    <form action={formAction} className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        <div>
          <label className="block font-label-md text-label-md text-on-surface mb-1">Empresa</label>
          <input name="companyName" required className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" />
        </div>
        <div>
          <label className="block font-label-md text-label-md text-on-surface mb-1">Nombre de contacto</label>
          <input name="contactName" required className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        <div>
          <label className="block font-label-md text-label-md text-on-surface mb-1">Correo</label>
          <input name="email" type="email" required className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" />
        </div>
        <div>
          <label className="block font-label-md text-label-md text-on-surface mb-1">Teléfono</label>
          <input name="phone" required className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" />
        </div>
      </div>
      <div>
        <label className="block font-label-md text-label-md text-on-surface mb-1">¿Qué necesitas?</label>
        <textarea name="message" rows={3} placeholder="Ej: cargo a cubrir, cantidad de personas, ciudad..." className="w-full p-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" />
      </div>
      {state?.error && <p className="text-error font-body-sm text-body-sm">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md px-5 py-3 rounded-lg shadow-sm transition-all disabled:opacity-60"
      >
        {pending ? "Enviando..." : "Agendar Cita"}
      </button>
    </form>
  );
}
