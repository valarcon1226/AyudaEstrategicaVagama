import "server-only";
import { prisma } from "./db";
import type { CompanyLead as PrismaCompanyLead } from "@prisma/client";

// Leads de empresas (formulario "Agendar Cita" del sitio público) — tabla
// leads_empresas en Supabase. Campos según informacion adicional/preguntas.xlsx
// (hoja "informacion cliente").

export type CompanyLead = PrismaCompanyLead;

export async function listLeads(): Promise<CompanyLead[]> {
  return prisma.companyLead.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createLead(data: {
  contactName: string;
  contactRole?: string;
  companyName: string;
  corporateEmail: string;
  phone: string;
  serviceInterest?: string;
  vacanciesCount?: number;
  hiringLocation?: string;
  positionLevel?: string;
  estimatedStartDate?: string;
  needDescription?: string;
  offeredSalary?: string;
  additionalBenefits?: string;
  workSchedule?: string;
  vacancyLocation?: string;
  preferredContactTime?: string;
  dataConsent: boolean;
}): Promise<CompanyLead> {
  return prisma.companyLead.create({ data });
}

export async function updateLeadStatus(id: string, status: string): Promise<CompanyLead> {
  return prisma.companyLead.update({ where: { id }, data: { status } });
}
