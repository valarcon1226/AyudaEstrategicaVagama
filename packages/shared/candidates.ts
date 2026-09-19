import "server-only";
import { readJsonFile, writeJsonFile } from "./file-store";

// Postulaciones de candidatos (Bolsa de Empleos del sitio público) — aparecen
// en el pipeline del portal privado para la vacante correspondiente. Los
// campos exactos del formulario de candidatos todavía no los confirma la
// dueña; estos son los mínimos razonables mientras llega esa respuesta.

export type CandidateApplication = {
  id: string;
  vacancyId: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  status: "nueva" | "en_revision" | "descartada" | "en_proceso";
  createdAt: string;
};

const FILE = "candidate-applications.json";

export async function listApplications(): Promise<CandidateApplication[]> {
  return readJsonFile<CandidateApplication[]>(FILE, []);
}

export async function listApplicationsForVacancy(
  vacancyId: string
): Promise<CandidateApplication[]> {
  const all = await listApplications();
  return all.filter((a) => a.vacancyId === vacancyId);
}

export async function createApplication(
  data: Omit<CandidateApplication, "id" | "createdAt" | "status">
): Promise<CandidateApplication> {
  const all = await listApplications();
  const application: CandidateApplication = {
    ...data,
    id: `app-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    status: "nueva",
    createdAt: new Date().toISOString(),
  };
  all.unshift(application);
  await writeJsonFile(FILE, all);
  return application;
}

export async function updateApplicationStatus(
  id: string,
  status: CandidateApplication["status"]
): Promise<CandidateApplication | undefined> {
  const all = await listApplications();
  const idx = all.findIndex((a) => a.id === id);
  if (idx === -1) return undefined;
  all[idx] = { ...all[idx], status };
  await writeJsonFile(FILE, all);
  return all[idx];
}
