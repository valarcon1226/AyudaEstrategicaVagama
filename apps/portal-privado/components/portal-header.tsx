"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { COMPANY } from "@shared/site-content";
import type { PermissionModule, Role } from "@shared/permissions";
import { logoutAction } from "@/app/(app)/actions";

const NAV_ITEMS: { href: string; label: string; icon: string; module: PermissionModule; dot?: boolean }[] = [
  { href: "/", label: "Gestión de Vacantes", icon: "work_outline", module: "vacantes" },
  { href: "/empresas", label: "Empresas & CRM", icon: "domain", module: "empresas" },
  { href: "/calendario", label: "Calendario", icon: "calendar_today", module: "calendario", dot: true },
  { href: "/finanzas", label: "Finanzas", icon: "account_balance", module: "finanzas" },
  { href: "/powerbi", label: "Power BI", icon: "bar_chart", module: "powerbi" },
];

type HeaderUser = {
  name: string;
  email: string;
  role: Role;
  permissions: PermissionModule[];
};

export function PortalHeader({ user }: { user: HeaderUser }) {
  const pathname = usePathname();
  const visibleItems = NAV_ITEMS.filter(
    (item) => user.role === "admin" || user.permissions.includes(item.module)
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-md shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
      <div className="h-16 w-full px-4 lg:px-8 max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link className="flex items-center gap-2.5" href="/">
            <span className="font-headline-lg text-lg font-bold tracking-tight text-on-surface">
              {COMPANY.brandName}
            </span>
          </Link>
        </div>
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-[#eff4ff] border border-[#dce9ff]/60 overflow-x-auto max-w-[46vw]">
          {visibleItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary-container text-white font-label-md text-[13px] font-semibold shadow-sm transition-all whitespace-nowrap shrink-0"
                    : "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-secondary hover:text-on-surface font-label-md text-[13px] transition-all whitespace-nowrap shrink-0"
                }
              >
                <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                <span>{item.label}</span>
                {item.dot && <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />}
              </Link>
            );
          })}
          {user.role === "admin" && (
            <Link
              href="/admin/usuarios"
              className={
                pathname === "/admin/usuarios"
                  ? "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary-container text-white font-label-md text-[13px] font-semibold shadow-sm transition-all whitespace-nowrap shrink-0"
                  : "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-secondary hover:text-on-surface font-label-md text-[13px] transition-all whitespace-nowrap shrink-0"
              }
            >
              <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              <span>Usuarios</span>
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <span className="block font-bold text-sm text-on-surface leading-tight">{user.name}</span>
            <span className="block font-body-sm text-xs text-secondary leading-tight">
              {user.email} · {user.role === "admin" ? "Admin" : "Partner"}
            </span>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center justify-center p-2 rounded-lg border border-outline-variant/60 text-secondary hover:text-on-surface hover:bg-surface-container-low transition-colors"
              title="Cerrar sesión"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
