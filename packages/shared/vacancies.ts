import "server-only";
import { prisma } from "./db";
import {
  isFieldHidden,
  toPublicVacancy,
  type PublicVacancy,
  type Vacancy,
  type VacancyVisibleFields,
} from "./vacancy-types";

// Capa de datos de vacantes sobre Postgres (Supabase) vía Prisma. Los tipos y
// funciones puras (isFieldHidden, toPublicVacancy) viven en ./vacancy-types
// para poder importarse también desde componentes cliente.
export { isFieldHidden, toPublicVacancy, type PublicVacancy, type Vacancy, type VacancyVisibleFields };

function getVisibleFields(v: Vacancy): VacancyVisibleFields {
  return (v.visibleFields as VacancyVisibleFields) ?? {};
}

export async function listVacancies(): Promise<Vacancy[]> {
  return prisma.vacancy.findMany({ orderBy: { createdAt: "desc" } });
}

export async function listPublicVacancies(): Promise<Vacancy[]> {
  return prisma.vacancy.findMany({
    where: { status: "abierta" },
    orderBy: { createdAt: "desc" },
  });
}

export async function getVacancy(id: string): Promise<Vacancy | null> {
  return prisma.vacancy.findUnique({ where: { id } });
}

export async function createVacancy(data: {
  title: string;
  clientCompany: string;
  sector: string;
  city: string;
  modality: string;
  salaryRange: string;
  mission?: string;
  status?: string;
  hideSalary: boolean;
  hideClientCompany: boolean;
  // Criterios objetivo para el filtro de puntuación de postulaciones — todos
  // opcionales; si no se llenan, ese criterio simplemente no puntúa.
  minExperienceYears?: number;
  minEducationLevel?: string;
  salaryMin?: number;
  salaryMax?: number;
  requiredExcelLevel?: string;
}): Promise<Vacancy> {
  return prisma.vacancy.create({
    data: {
      title: data.title,
      clientCompany: data.clientCompany,
      sector: data.sector,
      city: data.city,
      modality: data.modality,
      salaryRange: data.salaryRange,
      mission: data.mission,
      status: data.status ?? "abierta",
      minExperienceYears: data.minExperienceYears,
      minEducationLevel: data.minEducationLevel,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      requiredExcelLevel: data.requiredExcelLevel,
      visibleFields: {
        salaryRange: !data.hideSalary,
        clientCompany: !data.hideClientCompany,
      },
    },
  });
}

export async function updateVacancyStatus(id: string, status: string): Promise<Vacancy> {
  return prisma.vacancy.update({ where: { id }, data: { status } });
}

export async function setFieldVisible(
  id: string,
  field: keyof VacancyVisibleFields,
  visible: boolean
): Promise<Vacancy> {
  const current = await prisma.vacancy.findUniqueOrThrow({ where: { id } });
  const visibleFields = { ...getVisibleFields(current), [field]: visible };
  return prisma.vacancy.update({ where: { id }, data: { visibleFields } });
}
