// Filtro inicial de candidatos — puntuación ponderada determinística, sin
// llamadas a ningún LLM (cero costo de tokens). Compara cada postulación
// contra los criterios "objetivo" que el partner haya definido en la
// vacante (todos opcionales). Un criterio que la vacante no definió
// simplemente no cuenta — no penaliza al candidato.
//
// Pesos por defecto (ajustables aquí mismo): la experiencia pesa más que el
// salario, tal como se pidió explícitamente.

import type { Vacancy } from "./vacancy-types";
import type { CandidateApplication } from "@prisma/client";

const EDUCATION_RANK: Record<string, number> = {
  Bachiller: 1,
  Técnico: 2,
  Tecnólogo: 3,
  Profesional: 4,
  Especialización: 5,
  Maestría: 6,
};

type Criterion = {
  key: string;
  label: string;
  weight: number;
  score: (c: CandidateApplication, v: Vacancy) => number | null; // 0-100, o null si no aplica
};

const CRITERIA: Criterion[] = [
  {
    key: "experience",
    label: "Experiencia",
    weight: 40,
    score: (c, v) => {
      if (v.minExperienceYears == null || c.totalExperienceYears == null) return null;
      if (v.minExperienceYears <= 0) return 100;
      const ratio = c.totalExperienceYears / v.minExperienceYears;
      return Math.max(0, Math.min(100, Math.round(ratio * 100)));
    },
  },
  {
    key: "education",
    label: "Nivel de estudios",
    weight: 25,
    score: (c, v) => {
      if (!v.minEducationLevel || !c.educationLevel) return null;
      const required = EDUCATION_RANK[v.minEducationLevel];
      const actual = EDUCATION_RANK[c.educationLevel];
      if (!required || !actual) return null;
      return Math.max(0, Math.min(100, Math.round((actual / required) * 100)));
    },
  },
  {
    key: "salary",
    label: "Ajuste salarial",
    weight: 15,
    score: (c, v) => {
      if (c.salaryExpectation == null || (v.salaryMin == null && v.salaryMax == null)) return null;
      const max = v.salaryMax ?? v.salaryMin!;
      if (c.salaryExpectation <= max) return 100;
      const overBy = (c.salaryExpectation - max) / max;
      return Math.max(0, Math.round(100 - overBy * 100));
    },
  },
  {
    key: "modality",
    label: "Modalidad",
    weight: 10,
    score: (c, v) => {
      if (!c.preferredModality) return null;
      const normalize = (s: string) => s.toLowerCase().replace("í", "i");
      return normalize(c.preferredModality) === normalize(v.modality) ? 100 : 0;
    },
  },
  {
    key: "excel",
    label: "Nivel de Excel",
    weight: 10,
    score: (c, v) => {
      if (!v.requiredExcelLevel || !c.excelLevel) return null;
      const LEVELS: Record<string, number> = { Básico: 1, Intermedio: 2, Avanzado: 3 };
      const required = LEVELS[v.requiredExcelLevel];
      const actual = LEVELS[c.excelLevel];
      if (!required || !actual) return null;
      return Math.max(0, Math.min(100, Math.round((actual / required) * 100)));
    },
  },
];

export type MatchResult = {
  score: number | null; // null si ningún criterio aplicó (vacante sin requisitos definidos)
  breakdown: { key: string; label: string; weight: number; score: number }[];
};

export function scoreApplication(candidate: CandidateApplication, vacancy: Vacancy): MatchResult {
  const applicable = CRITERIA.map((c) => ({ ...c, result: c.score(candidate, vacancy) })).filter(
    (c) => c.result !== null
  ) as (Criterion & { result: number })[];

  if (applicable.length === 0) {
    return { score: null, breakdown: [] };
  }

  const totalWeight = applicable.reduce((sum, c) => sum + c.weight, 0);
  const weighted = applicable.reduce((sum, c) => sum + c.result * c.weight, 0) / totalWeight;

  return {
    score: Math.round(weighted),
    breakdown: applicable.map((c) => ({ key: c.key, label: c.label, weight: c.weight, score: c.result })),
  };
}
