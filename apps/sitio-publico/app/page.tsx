import Link from "next/link";
import { COMPANY, METRICS, SECTORS } from "@shared/site-content";

export default function Page() {
  return (
    <div className="flex flex-col w-full">
      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-surface-container-lowest pb-space-xl pt-space-lg lg:pt-space-xl">
        <div className="absolute -top-32 right-0 w-96 h-96 bg-surface-container-high rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-gutter lg:px-margin relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low text-primary mb-space-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                <span className="font-label-sm text-label-sm uppercase tracking-wider">
                  Selección y Gestión Humana en Colombia y México
                </span>
              </div>
              <h1 className="font-display text-headline-xl-mobile lg:text-display text-on-surface tracking-tight leading-[1.1] mb-space-md">
                {COMPANY.tagline}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-space-lg">
                {COMPANY.positioning}
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm w-full sm:w-auto">
                <Link
                  href="/planes-empresariales"
                  className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary font-label-md text-label-md px-6 py-3.5 rounded-lg shadow-md hover:bg-primary transition-all duration-200"
                >
                  <span className="material-symbols-outlined text-lg">person_search</span>
                  <span>Necesito Contratar Talento</span>
                </Link>
                <Link
                  href="/bolsa-de-empleos"
                  className="inline-flex items-center justify-center gap-2 bg-surface-container-low text-on-surface font-label-md text-label-md px-6 py-3.5 rounded-lg shadow-sm hover:bg-surface-container hover:text-primary transition-all duration-200"
                >
                  <span>Ver Vacantes Abiertas</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-lg">
                {COMPANY.byline} · Consultora estratégica en Talento Humano
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-surface-container-low p-space-md rounded-2xl shadow-xl flex flex-col gap-space-md">
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-2">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                    Nuestro proceso
                  </span>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Diagnóstico → definición de perfil → sourcing → evaluación → shortlist con informes →
                    entrevistas acompañadas → oferta y contratación.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-space-sm">
                  <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between">
                    <span className="font-body-sm text-body-sm text-secondary">Terna final en</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-headline-xl text-headline-xl text-primary font-bold">
                        {METRICS.averageShortlistDays}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface">días</span>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between">
                    <span className="font-body-sm text-body-sm text-secondary">Retención 1er año</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-headline-xl text-headline-xl text-primary-container font-bold">
                        {METRICS.retentionRateFirstYear}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-primary text-on-primary p-4 rounded-xl shadow-md flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-primary text-lg">shield_person</span>
                  <p className="font-body-sm text-body-sm opacity-90">
                    Garantía de reemplazo: {METRICS.guarantee.executiveMonths} meses en cargos ejecutivos ·{" "}
                    {METRICS.guarantee.operationalMonths} meses en cargos operativos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MÉTRICAS */}
      <section className="w-full bg-surface-container-low py-space-xl">
        <div className="max-w-7xl mx-auto px-gutter lg:px-margin">
          <div className="text-center max-w-3xl mx-auto mb-space-lg">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              Resultados reales
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mt-1">
              Cifras de nuestro proceso de selección
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            <MetricCard icon="verified_user" value={METRICS.retentionRateFirstYear} label="Tasa de Retención" note="Permanencia exitosa durante el primer año." />
            <MetricCard icon="groups" value={`${METRICS.placementsToDate}+`} label="Colocaciones" note="Profesionales colocados hasta la fecha, en todos los niveles." />
            <MetricCard icon="schedule" value={`${METRICS.averageShortlistDays} días`} label="Tiempo a Terna" note="Promedio para entregar una terna final." />
            <MetricCard icon="thumb_up" value={String(METRICS.nps)} label="NPS de Clientes" note="Satisfacción reportada por empresas cliente." />
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="w-full bg-background py-space-xl">
        <div className="max-w-7xl mx-auto px-gutter lg:px-margin">
          <div className="text-center max-w-3xl mx-auto mb-space-lg">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              Portafolio de servicios
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mt-1">
              Reclutamiento, evaluación y gestión humana integral
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <ServiceCard
              icon="work_outline"
              title="Reclutamiento y Selección"
              description="Planes Silver y Gold: publicación de vacante, preselección, pruebas psicotécnicas, referenciación y entrevistas por competencias."
              cta={{ href: "/planes-empresariales", label: "Ver planes" }}
            />
            <ServiceCard
              icon="psychology"
              title="Evaluación Directiva"
              description="Paquetes de evaluaciones psicométricas y de integridad (DISC, PIC, 16PF y más) para diagnósticos 360° de líderes y equipos."
              cta={{ href: "/planes-empresariales#evaluaciones", label: "Ver paquetes" }}
            />
            <ServiceCard
              icon="diversity_3"
              title="Gestión Humana"
              description="Acompañamiento en las 5 fases del ciclo del talento: convocatoria, selección, onboarding, retención y desvinculación."
              cta={{ href: "/planes-empresariales#gestion-humana", label: "Ver fases" }}
            />
          </div>
        </div>
      </section>

      {/* SECTORES */}
      <section className="w-full bg-surface-container-low py-space-xl">
        <div className="max-w-7xl mx-auto px-gutter lg:px-margin text-center">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-space-md">
            Espectro completo, en los sectores donde trabajamos hoy
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-space-sm">
            {SECTORS.map((s) => (
              <span
                key={s}
                className="px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="w-full bg-primary text-on-primary py-space-xl">
        <div className="max-w-4xl mx-auto px-gutter lg:px-margin text-center flex flex-col items-center gap-space-md">
          <h2 className="font-headline-xl text-headline-xl">Tú pides, nosotros buscamos.</h2>
          <p className="font-body-lg text-body-lg opacity-90">
            Desde cargos operativos hasta posiciones de alta dirección — cuéntanos qué necesitas.
          </p>
          <Link
            href="/planes-empresariales#agendar-cita"
            className="inline-flex items-center gap-2 bg-surface-container-lowest text-primary font-label-md text-label-md px-6 py-3.5 rounded-lg shadow-md hover:bg-surface-container transition-all"
          >
            <span className="material-symbols-outlined text-lg">calendar_month</span>
            <span>Agendar una cita</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

function MetricCard({ icon, value, label, note }: { icon: string; value: string; label: string; note: string }) {
  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <span className="material-symbols-outlined text-primary text-2xl mb-space-sm">{icon}</span>
      <div>
        <span className="font-metric-display text-metric-display text-on-surface block font-bold">{value}</span>
        <p className="font-headline-sm text-headline-sm text-on-surface mt-1">{label}</p>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{note}</p>
      </div>
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  description,
  cta,
}: {
  icon: string;
  title: string;
  description: string;
  cta: { href: string; label: string };
}) {
  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-sm">
      <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
      <h3 className="font-headline-lg text-headline-lg text-on-surface">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant flex-1">{description}</p>
      <Link href={cta.href} className="inline-flex items-center gap-1 text-primary font-label-md text-label-md hover:underline">
        <span>{cta.label}</span>
        <span className="material-symbols-outlined text-base">arrow_forward</span>
      </Link>
    </div>
  );
}
