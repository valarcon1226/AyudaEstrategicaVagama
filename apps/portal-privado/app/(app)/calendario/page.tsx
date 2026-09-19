import { CalendarioBoard } from "@/components/calendario/calendario-board";
import { requirePermission } from "@shared/auth";

export default async function Page() {
  await requirePermission("calendario");
  return <CalendarioBoard />;
}
