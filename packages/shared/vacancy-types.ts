// Tipos y funciones puras sobre Vacancy, sin dependencias de servidor — seguro
// de importar desde componentes cliente. El acceso a datos (Prisma/Postgres)
// vive en ./vacancies.

import type { Vacancy as PrismaVacancy } from "@prisma/client";

export type Vacancy = PrismaVacancy;

export type VacancyVisibleFields = {
  salaryRange?: boolean;
  clientCompany?: boolean;
};

export type PublicVacancy = {
  id: string;
  title: string;
  sector: string;
  positionLevel: string | null;
  city: string;
  modality: string;
  salaryRange: string | null;
  clientCompany: string | null;
  mission: string | null;
  status: string;
};

function getVisibleFields(v: Vacancy): VacancyVisibleFields {
  return (v.visibleFields as VacancyVisibleFields) ?? {};
}

export function isFieldHidden(v: Vacancy, field: keyof VacancyVisibleFields): boolean {
  return getVisibleFields(v)[field] === false;
}

export function toPublicVacancy(v: Vacancy): PublicVacancy {
  const vis = getVisibleFields(v);
  return {
    id: v.id,
    title: v.title,
    sector: v.sector,
    positionLevel: v.positionLevel,
    city: v.city,
    modality: v.modality,
    salaryRange: vis.salaryRange === false ? null : v.salaryRange,
    clientCompany: vis.clientCompany === false ? null : v.clientCompany,
    mission: v.mission,
    status: v.status,
  };
}
