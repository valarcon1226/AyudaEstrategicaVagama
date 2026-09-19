import type { ReactNode } from "react";
import { PortalHeader } from "@/components/portal-header";
import { PortalFooter } from "@/components/portal-footer";
import { requireUser } from "@shared/auth";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();

  return (
    <>
      <PortalHeader user={{ name: user.name, email: user.email, role: user.role, permissions: user.permissions }} />
      <main className="w-full pt-20 bg-background">{children}</main>
      <PortalFooter />
    </>
  );
}
