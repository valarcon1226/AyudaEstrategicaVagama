"use server";

import { revalidatePath } from "next/cache";
import { createApplication } from "@shared/candidates";

export type ApplyState = { ok: boolean; error?: string } | null;

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

function bool(formData: FormData, key: string): boolean | undefined {
  const v = str(formData, key);
  if (v === undefined) return undefined;
  return v === "true";
}

export async function applyToVacancyAction(
  _prevState: ApplyState,
  formData: FormData
): Promise<ApplyState> {
  const vacancyId = str(formData, "vacancyId");
  const fullName = str(formData, "fullName");
  const email = str(formData, "email");
  const phone = str(formData, "phone");
  const residenceCity = str(formData, "residenceCity");
  const lastThreeEmployers = str(formData, "lastThreeEmployers");

  if (!fullName || !email || !phone) {
    return { ok: false, error: "Faltan campos obligatorios." };
  }

  await createApplication({
    vacancyId,
    fullName,
    email,
    phone,
    residenceCity,
    age: num(formData, "age"),
    nationality: str(formData, "nationality"),
    linkedin: str(formData, "linkedin"),
    cvUrl: str(formData, "cvUrl"),
    educationLevel: str(formData, "educationLevel"),
    degreeObtained: str(formData, "degreeObtained"),
    totalExperienceYears: num(formData, "totalExperienceYears"),
    currentOrLastPosition: str(formData, "currentOrLastPosition"),
    sectorExperience: str(formData, "sectorExperience"),
    peopleLed: str(formData, "peopleLed"),
    lastThreeEmployers,
    salaryExpectation: num(formData, "salaryExpectation"),
    salaryNegotiable: bool(formData, "salaryNegotiable"),
    currentlyEmployed: bool(formData, "currentlyEmployed"),
    noticePeriod: str(formData, "noticePeriod"),
    travelAvailability: str(formData, "travelAvailability"),
    relocationAvailability: str(formData, "relocationAvailability"),
    preferredModality: str(formData, "preferredModality"),
    excelLevel: str(formData, "excelLevel"),
    specificTools: str(formData, "specificTools"),
    languages: str(formData, "languages"),
  });

  revalidatePath("/bolsa-de-empleos");
  return { ok: true };
}
