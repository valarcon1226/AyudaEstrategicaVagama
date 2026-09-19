"use client";

import { useTransition } from "react";
import type { CandidateApplication } from "@shared/candidates";
import type { MatchResult } from "@shared/matching";
import { setApplicationStatusAction } from "./actions";

const STATUS_LABEL: Record<string, string> = {
  nueva: "Nueva",
  en_revision: "En revisión",
  en_proceso: "En proceso",
  descartada: "Descartada",
};

function scoreTone(score: number | null) {
  if (score === null) return "bg-surface-container text-secondary";
  if (score >= 75) return "bg-tertiary-fixed text-tertiary";
  if (score >= 50) return "bg-amber-100 text-amber-800";
  return "bg-error-container text-on-error-container";
}

export function ApplicationsList({
  vacancyId,
  items,
}: {
  vacancyId: string;
  items: { application: CandidateApplication; match: MatchResult }[];
}) {
  const [, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-space-md">
      {items.map(({ application: a, match }) => (
        <div key={a.id} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
          <div className="flex items-start justify-between gap-space-sm">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">{a.fullName}</h3>
              <p className="font-body-sm text-body-sm text-secondary">
                {a.email} · {a.phone}
                {a.residenceCity ? ` · ${a.residenceCity}` : ""}
              </p>
            </div>
            <span className={`shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full font-label-md text-label-md font-bold ${scoreTone(match.score)}`}>
              {match.score === null ? "Sin criterios" : `${match.score}% afinidad`}
            </span>
          </div>

          {match.breakdown.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {match.breakdown.map((b) => (
                <span key={b.key} className="text-[11px] px-2 py-1 rounded bg-surface-container-low text-on-surface-variant">
                  {b.label}: {b.score}% <span className="text-secondary">(peso {b.weight}%)</span>
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-space-md gap-y-1 text-body-sm text-on-surface-variant">
            {a.educationLevel && <span>🎓 {a.educationLevel}{a.degreeObtained ? ` — ${a.degreeObtained}` : ""}</span>}
            {a.totalExperienceYears != null && <span>💼 {a.totalExperienceYears} años de experiencia</span>}
            {a.currentOrLastPosition && <span>Cargo actual/último: {a.currentOrLastPosition}</span>}
            {a.salaryExpectation != null && (
              <span>
                💰 Aspira ${a.salaryExpectation.toLocaleString("es-CO")}
                {a.salaryNegotiable ? " (negociable)" : ""}
              </span>
            )}
            {a.preferredModality && <span>Modalidad preferida: {a.preferredModality}</span>}
            {a.excelLevel && <span>Excel: {a.excelLevel}</span>}
            {a.languages && <span>Idiomas: {a.languages}</span>}
            {a.linkedin && (
              <a href={a.linkedin} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                LinkedIn ↗
              </a>
            )}
            {a.cvUrl && (
              <a href={a.cvUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                Hoja de vida ↗
              </a>
            )}
          </div>

          <div className="flex items-center justify-between pt-space-xs border-t border-surface-container-low">
            <span className="text-[11px] text-secondary">
              Postuló {new Date(a.createdAt).toLocaleDateString("es-CO")}
            </span>
            <select
              defaultValue={a.status}
              onChange={(e) =>
                startTransition(() => {
                  setApplicationStatusAction(a.id, vacancyId, e.target.value);
                })
              }
              className="h-9 px-2.5 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm focus:outline-none"
            >
              {Object.entries(STATUS_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-center text-secondary font-body-md py-space-lg">
          Todavía no hay postulaciones para esta vacante.
        </p>
      )}
    </div>
  );
}
