import { listPublicVacancies, toPublicVacancy } from "@shared/vacancies";
import { JobBoard } from "./job-board";

export default async function Page() {
  const vacancies = (await listPublicVacancies()).map(toPublicVacancy);
  return <JobBoard vacancies={vacancies} />;
}
