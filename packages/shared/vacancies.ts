import "server-only";
import { readJsonFile, writeJsonFile } from "./file-store";

// Vacantes reales — compartidas entre el portal privado (donde se gestionan)
// y el sitio público (donde se muestran en la Bolsa de Empleos). Por ahora
// persisten en data/vacancies.json en la raíz del repo; cuando se conecte
// Postgres (decisión de arquitectura), esta es la capa a reemplazar.

export type Vacancy = {
  id: string;
  title: string;
  clientCompany: string;
  sector: string;
  location: string;
  modality: "Presencial" | "Remoto" | "Híbrido";
  salaryRange: string;
  description: string;
  status: "abierta" | "en_proceso" | "cerrada";
  createdAt: string;
  // Cada campo sensible se puede ocultar en la vista pública — la dueña pidió
  // que los partners puedan decidir, vacante por vacante, si el salario o el
  // nombre del cliente se muestran o no en la Bolsa de Empleos.
  hidden: {
    salary: boolean;
    clientCompany: boolean;
  };
};

const FILE = "vacancies.json";

export async function listVacancies(): Promise<Vacancy[]> {
  return readJsonFile<Vacancy[]>(FILE, []);
}

export async function listPublicVacancies(): Promise<Vacancy[]> {
  const all = await listVacancies();
  return all.filter((v) => v.status === "abierta");
}

export async function getVacancy(id: string): Promise<Vacancy | undefined> {
  const all = await listVacancies();
  return all.find((v) => v.id === id);
}

export async function createVacancy(
  data: Omit<Vacancy, "id" | "createdAt">
): Promise<Vacancy> {
  const all = await listVacancies();
  const vacancy: Vacancy = {
    ...data,
    id: `vac-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  all.push(vacancy);
  await writeJsonFile(FILE, all);
  return vacancy;
}

export async function updateVacancy(
  id: string,
  patch: Partial<Omit<Vacancy, "id" | "createdAt">>
): Promise<Vacancy | undefined> {
  const all = await listVacancies();
  const idx = all.findIndex((v) => v.id === id);
  if (idx === -1) return undefined;
  all[idx] = { ...all[idx], ...patch };
  await writeJsonFile(FILE, all);
  return all[idx];
}

export async function setFieldHidden(
  id: string,
  field: keyof Vacancy["hidden"],
  hidden: boolean
): Promise<Vacancy | undefined> {
  const all = await listVacancies();
  const idx = all.findIndex((v) => v.id === id);
  if (idx === -1) return undefined;
  all[idx] = { ...all[idx], hidden: { ...all[idx].hidden, [field]: hidden } };
  await writeJsonFile(FILE, all);
  return all[idx];
}

// Vista segura para el sitio público: nunca expone un campo marcado como oculto.
export type PublicVacancy = Omit<Vacancy, "hidden" | "salaryRange" | "clientCompany"> & {
  salaryRange: string | null;
  clientCompany: string | null;
};

export function toPublicVacancy(v: Vacancy): PublicVacancy {
  const { hidden, ...rest } = v;
  return {
    ...rest,
    salaryRange: hidden.salary ? null : v.salaryRange,
    clientCompany: hidden.clientCompany ? null : v.clientCompany,
  };
}
