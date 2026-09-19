"use server";

import { revalidatePath } from "next/cache";
import { createVacancy, setFieldHidden, updateVacancy, type Vacancy } from "@shared/vacancies";

export async function toggleFieldHiddenAction(
  id: string,
  field: keyof Vacancy["hidden"],
  hidden: boolean
) {
  await setFieldHidden(id, field, hidden);
  revalidatePath("/");
}

export async function setVacancyStatusAction(id: string, status: Vacancy["status"]) {
  await updateVacancy(id, { status });
  revalidatePath("/");
}

export async function createVacancyAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const clientCompany = String(formData.get("clientCompany") ?? "").trim() || "Cliente confidencial";
  const sector = String(formData.get("sector") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const modality = String(formData.get("modality") ?? "Presencial") as Vacancy["modality"];
  const salaryRange = String(formData.get("salaryRange") ?? "").trim() || "No especificado";
  const description = String(formData.get("description") ?? "").trim();
  const hideSalary = formData.get("hideSalary") === "on";
  const hideClient = formData.get("hideClient") === "on";

  if (!title || !sector || !location) return;

  await createVacancy({
    title,
    clientCompany,
    sector,
    location,
    modality,
    salaryRange,
    description,
    status: "abierta",
    hidden: { salary: hideSalary, clientCompany: hideClient },
  });
  revalidatePath("/");
}
