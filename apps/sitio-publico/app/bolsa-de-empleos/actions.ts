"use server";

import { revalidatePath } from "next/cache";
import { createApplication } from "@shared/candidates";

export type ApplyState = { ok: boolean; error?: string } | null;

// Campos mínimos mientras la dueña confirma el formulario completo que
// deben responder los candidatos — no inventar más campos de la cuenta.
export async function applyToVacancyAction(
  _prevState: ApplyState,
  formData: FormData
): Promise<ApplyState> {
  const vacancyId = String(formData.get("vacancyId") ?? "");
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!vacancyId || !fullName || !email || !phone) {
    return { ok: false, error: "Faltan campos obligatorios." };
  }

  await createApplication({ vacancyId, fullName, email, phone, message });
  revalidatePath("/bolsa-de-empleos");
  return { ok: true };
}
