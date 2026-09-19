import "server-only";
import { readJsonFile, writeJsonFile } from "./file-store";

// Leads de empresas (formulario "Agendar Cita" del sitio público) — aparecen
// en el portal privado como "Leads Web B2B por Atender". Los campos exactos
// del formulario todavía no los confirma la dueña; estos son los mínimos
// razonables mientras llega esa respuesta (no inventar más de la cuenta).

export type CompanyLead = {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
  status: "nuevo" | "contactado" | "calificado";
  createdAt: string;
};

const FILE = "company-leads.json";

export async function listLeads(): Promise<CompanyLead[]> {
  return readJsonFile<CompanyLead[]>(FILE, []);
}

export async function createLead(
  data: Omit<CompanyLead, "id" | "createdAt" | "status">
): Promise<CompanyLead> {
  const all = await listLeads();
  const lead: CompanyLead = {
    ...data,
    id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    status: "nuevo",
    createdAt: new Date().toISOString(),
  };
  all.unshift(lead);
  await writeJsonFile(FILE, all);
  return lead;
}

export async function updateLeadStatus(
  id: string,
  status: CompanyLead["status"]
): Promise<CompanyLead | undefined> {
  const all = await listLeads();
  const idx = all.findIndex((l) => l.id === id);
  if (idx === -1) return undefined;
  all[idx] = { ...all[idx], status };
  await writeJsonFile(FILE, all);
  return all[idx];
}
