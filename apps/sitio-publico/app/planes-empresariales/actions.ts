"use server";

import { revalidatePath } from "next/cache";
import { createLead } from "@shared/leads";

export type LeadState = { ok: boolean; error?: string } | null;

// Campos mínimos mientras la dueña confirma el formulario completo que
// deben responder las empresas — no inventar más campos de la cuenta.
export async function submitLeadAction(_prevState: LeadState, formData: FormData): Promise<LeadState> {
  const companyName = String(formData.get("companyName") ?? "").trim();
  const contactName = String(formData.get("contactName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!companyName || !contactName || !email || !phone) {
    return { ok: false, error: "Faltan campos obligatorios." };
  }

  await createLead({ companyName, contactName, email, phone, message });
  revalidatePath("/planes-empresariales");
  return { ok: true };
}
