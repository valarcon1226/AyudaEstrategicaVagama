import { COMPANY, CONTACT } from "@shared/site-content";

export function PortalFooter() {
  return (
    <footer className="w-full bg-surface-container-low shadow-[0_-1px_4px_rgba(15,23,42,0.03)] mt-space-xl">
      <div className="w-full px-gutter lg:px-margin max-w-7xl mx-auto py-space-xl flex flex-col gap-space-md">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-md">
          <div className="max-w-md">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              {COMPANY.brandName}
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{COMPANY.about}</p>
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant flex flex-col gap-1">
            <span>{CONTACT.emails[0]}</span>
            <span>{CONTACT.phone} (WhatsApp)</span>
            <span>{CONTACT.address}</span>
            <span>
              {CONTACT.hours.weekdays} · {CONTACT.hours.saturday}
            </span>
          </div>
        </div>
        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md text-center md:text-left border-t border-surface-container">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © {new Date().getFullYear()} {COMPANY.legalName} — Portal privado, uso exclusivo del equipo
            interno.
          </p>
        </div>
      </div>
    </footer>
  );
}
