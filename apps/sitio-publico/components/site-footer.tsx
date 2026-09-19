import Link from "next/link";
import { COMPANY, CONTACT } from "@shared/site-content";

export function SiteFooter() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-surface-container mt-space-xl">
      <div className="max-w-7xl mx-auto px-gutter lg:px-margin py-space-xl grid grid-cols-1 md:grid-cols-3 gap-space-lg">
        <div>
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{COMPANY.brandName}</span>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 max-w-sm">{COMPANY.about}</p>
        </div>
        <div className="flex flex-col gap-1 font-body-sm text-body-sm text-on-surface-variant">
          <span className="font-label-md text-label-md text-on-surface mb-1">Contacto</span>
          <span>{CONTACT.emails[0]}</span>
          <span>{CONTACT.phone} (WhatsApp)</span>
          <span>{CONTACT.address}</span>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="text-primary hover:underline">
            LinkedIn
          </a>
        </div>
        <div className="flex flex-col gap-1 font-body-sm text-body-sm text-on-surface-variant">
          <span className="font-label-md text-label-md text-on-surface mb-1">Navegación</span>
          <Link href="/bolsa-de-empleos" className="hover:text-primary transition-colors">Bolsa de Empleos</Link>
          <Link href="/planes-empresariales" className="hover:text-primary transition-colors">Planes para Empresas</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-gutter lg:px-margin py-space-md border-t border-surface-container">
        <p className="font-body-sm text-body-sm text-on-surface-variant text-center">
          © {new Date().getFullYear()} {COMPANY.legalName} — {COMPANY.byline}.
        </p>
      </div>
    </footer>
  );
}
