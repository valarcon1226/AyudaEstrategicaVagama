import { FinanzasBoard } from "@/components/finanzas/finanzas-board";
import { requirePermission } from "@shared/auth";

export default async function Page() {
  await requirePermission("finanzas");
  return <FinanzasBoard />;
}
