"use server";

import { revalidatePath } from "next/cache";
import {
  createVacancy,
  setFieldVisible,
  updateVacancyStatus,
  type VacancyVisibleFields,
} from "@shared/vacancies";

export async function toggleFieldHiddenAction(
  id: string,
  field: keyof VacancyVisibleFields,
  hidden: boolean
) {
  await setFieldVisible(id, field, !hidden);
  revalidatePath("/");
}

export async function setVacancyStatusAction(id: string, status: string) {
  await updateVacancyStatus(id, status);
  revalidatePath("/");
}

export async function createVacancyAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const clientCompany = String(formData.get("clientCompany") ?? "").trim() || "Cliente confidencial";
  const sector = String(formData.get("sector") ?? "").trim();
  const city = String(formData.get("location") ?? "").trim();
  const modality = String(formData.get("modality") ?? "Presencial");
  const salaryRange = String(formData.get("salaryRange") ?? "").trim() || "No especificado";
  const mission = String(formData.get("description") ?? "").trim();
  const hideSalary = formData.get("hideSalary") === "on";
  const hideClient = formData.get("hideClient") === "on";

  const minExperienceYearsRaw = String(formData.get("minExperienceYears") ?? "").trim();
  const minEducationLevel = String(formData.get("minEducationLevel") ?? "").trim() || undefined;
  const salaryMinRaw = String(formData.get("salaryMin") ?? "").trim();
  const salaryMaxRaw = String(formData.get("salaryMax") ?? "").trim();
  const requiredExcelLevel = String(formData.get("requiredExcelLevel") ?? "").trim() || undefined;

  if (!title || !sector || !city) return;

  await createVacancy({
    title,
    clientCompany,
    sector,
    city,
    modality,
    salaryRange,
    mission,
    status: "abierta",
    hideSalary,
    hideClientCompany: hideClient,
    minExperienceYears: minExperienceYearsRaw ? Number(minExperienceYearsRaw) : undefined,
    minEducationLevel,
    salaryMin: salaryMinRaw ? Number(salaryMinRaw) : undefined,
    salaryMax: salaryMaxRaw ? Number(salaryMaxRaw) : undefined,
    requiredExcelLevel,
  });
  revalidatePath("/");
}
