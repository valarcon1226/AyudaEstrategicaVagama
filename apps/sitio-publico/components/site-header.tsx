"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { COMPANY, PORTAL_URL } from "@shared/site-content";

const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/bolsa-de-empleos", label: "Bolsa de Empleos" },
  { href: "/planes-empresariales", label: "Planes para Empresas" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-container shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <div className="h-20 w-full px-gutter lg:px-margin max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-headline-lg text-xl font-bold tracking-tight text-on-surface leading-none">
            {COMPANY.brandName}
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "px-4 py-2 rounded-xl bg-surface-container text-primary font-semibold text-sm transition-all shadow-sm"
                    : "px-4 py-2 text-on-surface-variant hover:text-primary font-medium text-sm transition-colors"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={PORTAL_URL}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-surface-container-low hover:bg-surface-container text-on-surface font-medium text-sm rounded-xl border border-outline-variant/40 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-lg leading-none">login</span>
            <span>Log In</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/40 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-2xl leading-none">
              {open ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden flex flex-col gap-1 px-gutter py-3 border-t border-surface-container bg-surface-container-lowest">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "px-4 py-2.5 rounded-xl bg-surface-container text-primary font-semibold text-sm transition-all"
                    : "px-4 py-2.5 text-on-surface-variant hover:text-primary font-medium text-sm transition-colors"
                }
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={PORTAL_URL}
            className="flex sm:hidden items-center gap-2 px-4 py-2.5 mt-1 bg-surface-container-low text-on-surface font-medium text-sm rounded-xl border border-outline-variant/40"
          >
            <span className="material-symbols-outlined text-lg leading-none">login</span>
            <span>Log In</span>
          </a>
        </nav>
      )}
    </header>
  );
}
