import Link from "next/link";
import { notFound } from "next/navigation";
import { requirePermission } from "@shared/auth";
import { getVacancy } from "@shared/vacancies";
import { listApplicationsForVacancy } from "@shared/candidates";
import { scoreApplication } from "@shared/matching";
import { ApplicationsList } from "./applications-list";

export default async function Page({ params }: { params: Promise<{ vacancyId: string }> }) {
  await requirePermission("vacantes");
  const { vacancyId } = await params;

  const vacancy = await getVacancy(vacancyId);
  if (!vacancy) notFound();

  const applications = await listApplicationsForVacancy(vacancyId);
  const items = applications
    .map((application) => ({ application, match: scoreApplication(application, vacancy) }))
    .sort((a, b) => (b.match.score ?? -1) - (a.match.score ?? -1));

  const hasCriteria =
    vacancy.minExperienceYears != null ||
    vacancy.minEducationLevel != null ||
    vacancy.salaryMin != null ||
    vacancy.salaryMax != null ||
    vacancy.requiredExcelLevel != null;

  return (
    <div className="max-w-4xl mx-auto px-gutter lg:px-margin py-space-lg w-full flex flex-col gap-space-lg">
      <div>
        <Link href="/" className="text-primary font-label-md text-label-md hover:underline inline-flex items-center gap-1 mb-space-sm">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span> Volver a Vacantes
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-primary material-symbols-outlined text-headline-lg">groups</span>
          <h1 className="font-headline-xl text-headline-xl text-on-surface">Postulaciones — {vacancy.title}</h1>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {vacancy.city} · {vacancy.modality} · {applications.length} postulación
          {applications.length === 1 ? "" : "es"}
        </p>
        {!hasCriteria && (
          <p className="font-body-sm text-body-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-space-sm inline-block">
            Esta vacante no tiene criterios de filtro definidos (experiencia, estudios, salario, Excel) — el
            puntaje de afinidad no se puede calcular. Edítala para agregarlos.
          </p>
        )}
      </div>

      <ApplicationsList vacancyId={vacancyId} items={items} />
    </div>
  );
}
