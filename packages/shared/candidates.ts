import "server-only";
import { prisma } from "./db";
import type { CandidateApplication as PrismaCandidateApplication } from "@prisma/client";

// Postulaciones de candidatos (Bolsa de Empleos del sitio público) — tabla
// postulaciones en Supabase. Campos según informacion adicional/preguntas.xlsx
// (hoja "información candidatos").

export type CandidateApplication = PrismaCandidateApplication;

export async function listApplications(): Promise<CandidateApplication[]> {
  return prisma.candidateApplication.findMany({ orderBy: { createdAt: "desc" } });
}

export async function listApplicationsForVacancy(vacancyId: string): Promise<CandidateApplication[]> {
  return prisma.candidateApplication.findMany({
    where: { vacancyId },
    orderBy: { createdAt: "desc" },
  });
}

export async function countApplicationsByVacancy(): Promise<Record<string, number>> {
  const rows = await prisma.candidateApplication.groupBy({
    by: ["vacancyId"],
    _count: { _all: true },
  });
  const counts: Record<string, number> = {};
  for (const row of rows) {
    if (row.vacancyId) counts[row.vacancyId] = row._count._all;
  }
  return counts;
}

export async function createApplication(data: {
  vacancyId?: string;
  fullName: string;
  residenceCity?: string;
  phone: string;
  email: string;
  age?: number;
  nationality?: string;
  linkedin?: string;
  educationLevel?: string;
  degreeObtained?: string;
  totalExperienceYears?: number;
  currentOrLastPosition?: string;
  sectorExperience?: string;
  peopleLed?: string;
  lastThreeEmployers?: string;
  salaryExpectation?: number;
  salaryNegotiable?: boolean;
  currentlyEmployed?: boolean;
  noticePeriod?: string;
  travelAvailability?: string;
  relocationAvailability?: string;
  preferredModality?: string;
  excelLevel?: string;
  specificTools?: string;
  languages?: string;
  cvUrl?: string;
}): Promise<CandidateApplication> {
  return prisma.candidateApplication.create({ data });
}

export async function updateApplicationStatus(id: string, status: string): Promise<CandidateApplication> {
  return prisma.candidateApplication.update({ where: { id }, data: { status } });
}
