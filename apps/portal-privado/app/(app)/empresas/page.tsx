import { EmpresasBoard } from "@/components/empresas/empresas-board";
import { requirePermission } from "@shared/auth";

export default async function Page() {
  await requirePermission("empresas");
  return <EmpresasBoard />;
}
