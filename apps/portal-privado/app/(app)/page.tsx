import { VacantesBoard } from "@/components/vacantes/vacantes-board";
import { listVacancies } from "@shared/vacancies";
import { countApplicationsByVacancy } from "@shared/candidates";
import { requirePermission } from "@shared/auth";

export default async function Page() {
  await requirePermission("vacantes");
  const [vacancies, applicationCounts] = await Promise.all([
    listVacancies(),
    countApplicationsByVacancy(),
  ]);
  return <VacantesBoard vacancies={vacancies} applicationCounts={applicationCounts} />;
}
