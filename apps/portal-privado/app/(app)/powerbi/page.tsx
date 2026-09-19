import { PowerbiBoard } from "@/components/powerbi/powerbi-board";
import { requirePermission } from "@shared/auth";

export default async function Page() {
  await requirePermission("powerbi");
  return <PowerbiBoard />;
}
