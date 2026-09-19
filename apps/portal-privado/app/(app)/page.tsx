import { VacantesBoard } from "@/components/vacantes/vacantes-board";
import { listVacancies } from "@shared/vacancies";
import { requirePermission } from "@shared/auth";

export default async function Page() {
  await requirePermission("vacantes");
  const vacancies = await listVacancies();
  return <VacantesBoard vacancies={vacancies} />;
}
