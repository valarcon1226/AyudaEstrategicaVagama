"use server";

import { revalidatePath } from "next/cache";
import { createLead } from "@shared/leads";

export type LeadState = { ok: boolean; error?: string } | null;

function str(formData: FormData, key: string): string | undefined {
  const v = formData.get(key);
  const s = typeof v === "string" ? v.trim() : "";
  return s || undefined;
}

function num(formData: FormData, key: string): number | undefined {
  const v = str(formData, key);
  if (v === undefined) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export async function submitLeadAction(_prevState: LeadState, formData: FormData): Promise<LeadState> {
  const contactName = str(formData, "contactName");
  const companyName = str(formData, "companyName");
  const corporateEmail = str(formData, "corporateEmail");
  const phone = str(formData, "phone");
  const dataConsent = formData.get("dataConsent") === "on";

  if (!contactName || !companyName || !corporateEmail || !phone) {
    return { ok: false, error: "Faltan campos obligatorios." };
  }
  if (!dataConsent) {
    return { ok: false, error: "Debes autorizar el tratamiento de tus datos personales para continuar." };
  }

  await createLead({
    contactName,
    contactRole: str(formData, "contactRole"),
    companyName,
    corporateEmail,
    phone,
    serviceInterest: str(formData, "serviceInterest"),
    vacanciesCount: num(formData, "vacanciesCount"),
    hiringLocation: str(formData, "hiringLocation"),
    positionLevel: str(formData, "positionLevel"),
    estimatedStartDate: str(formData, "estimatedStartDate"),
    needDescription: str(formData, "needDescription"),
    offeredSalary: str(formData, "offeredSalary"),
    additionalBenefits: str(formData, "additionalBenefits"),
    workSchedule: str(formData, "workSchedule"),
    vacancyLocation: str(formData, "vacancyLocation"),
    preferredContactTime: str(formData, "preferredContactTime"),
    dataConsent,
  });

  revalidatePath("/planes-empresariales");
  return { ok: true };
}
