export function ComingSoon({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="max-w-7xl mx-auto px-gutter lg:px-margin py-space-lg w-full">
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col items-center text-center gap-space-md py-space-xl">
        <span className="material-symbols-outlined text-primary text-[40px]">{icon}</span>
        <h1 className="font-headline-xl text-headline-xl text-on-surface">{title}</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
          Esta sección todavía está en construcción — llega en la siguiente etapa del portal privado.
        </p>
      </div>
    </div>
  );
}
