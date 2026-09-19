import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm text-center flex flex-col items-center gap-space-sm">
        <span className="material-symbols-outlined text-error text-4xl">block</span>
        <h1 className="font-headline-lg text-headline-sm text-on-surface font-bold">Sin acceso a esta sección</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Tu cuenta no tiene permiso para ver esta parte del portal. Pídele a un administrador que te lo
          otorgue.
        </p>
        <Link href="/" className="mt-space-sm px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
