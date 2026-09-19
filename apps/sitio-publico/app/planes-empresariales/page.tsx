import { PRICING, ASSESSMENT_TOOLS, HR_MANAGEMENT_PHASES, CONTACT } from "@shared/site-content";
import { LeadForm } from "./lead-form";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-gutter lg:px-margin py-space-xl w-full flex flex-col gap-space-xl">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-headline-xl text-headline-xl text-on-surface">Planes para Empresas</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">
          Reclutamiento, evaluación directiva y gestión humana — cotizado según el perfil y alcance de tu
          necesidad.
        </p>
      </div>

      {/* Reclutamiento */}
      <section className="flex flex-col gap-space-md">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Reclutamiento y Selección</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {PRICING.recruitmentPlans.map((plan) => (
            <div key={plan.name} className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-sm">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md font-semibold self-start">
                {plan.name}
              </span>
              <ul className="flex flex-col gap-1.5 font-body-md text-body-md text-on-surface-variant">
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-tertiary text-[18px] mt-0.5">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-space-sm border-t border-surface-container-low mt-space-sm">
                <span className="font-body-sm text-body-sm text-secondary">Entrega: {plan.deliveryDays}</span>
                <span className="font-body-sm text-body-sm text-secondary">Garantía: {plan.guaranteeMonths} meses</span>
              </div>
              <span className="font-headline-sm text-headline-sm text-primary">{plan.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Evaluaciones */}
      <section id="evaluaciones" className="flex flex-col gap-space-md">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Evaluación Directiva</h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
          Diagnóstico 360° combinando herramientas psicométricas y de integridad: {" "}
          {ASSESSMENT_TOOLS.map((t) => t.code).join(", ")}.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {PRICING.assessmentPackages.map((pkg) => (
            <div key={pkg.name} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-1.5">
              <span className="font-label-md text-label-md text-primary font-semibold">{pkg.name}</span>
              <span className="font-headline-lg text-headline-lg text-on-surface">
                ${pkg.totalCop.toLocaleString("es-CO")}
              </span>
              <span className="font-body-sm text-body-sm text-secondary">
                {pkg.evaluations} evaluaciones · ${pkg.perUnitCop.toLocaleString("es-CO")} c/u
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{pkg.benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gestión Humana */}
      <section id="gestion-humana" className="flex flex-col gap-space-md">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Gestión Humana</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-space-sm">
          {HR_MANAGEMENT_PHASES.map((p) => (
            <div key={p.phase} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-1">
              <span className="font-label-md text-label-md text-primary font-semibold">{p.phase}</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{p.detail}</p>
            </div>
          ))}
        </div>
        <p className="font-body-sm text-body-sm text-secondary">
          Consultoría, capacitación, employer branding y outplacement se cotizan por proyecto o alcance.
        </p>
      </section>

      {/* Agendar cita */}
      <section id="agendar-cita" className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg items-start pt-space-md">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-space-sm">Agendar una Cita</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Cuéntanos qué cargo o servicio necesitas y te contactamos para coordinar una llamada de
            diagnóstico. También puedes escribirnos directo por WhatsApp al {CONTACT.phone} o al correo{" "}
            {CONTACT.emails[0]}.
          </p>
          <p className="font-body-sm text-body-sm text-secondary mt-space-sm">
            Horario de atención: {CONTACT.hours.weekdays} · {CONTACT.hours.saturday} ({CONTACT.hours.timezone})
          </p>
        </div>
        <LeadForm />
      </section>
    </div>
  );
}
