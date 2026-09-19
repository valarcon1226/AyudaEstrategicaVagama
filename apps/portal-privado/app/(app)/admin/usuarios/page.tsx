import { listUsers, requireAdmin, toPublicUser } from "@shared/auth";
import { UsersManager } from "./users-manager";

export default async function Page() {
  const currentUser = await requireAdmin();
  const users = (await listUsers()).map(toPublicUser);

  return (
    <div className="max-w-5xl mx-auto px-gutter lg:px-margin py-space-lg w-full flex flex-col gap-space-lg">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-primary material-symbols-outlined text-headline-lg">admin_panel_settings</span>
          <h1 className="font-headline-xl text-headline-xl text-on-surface">Usuarios y Permisos</h1>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Solo los administradores pueden crear usuarios y decidir qué módulos ve cada partner.
        </p>
      </div>
      <UsersManager users={users} currentUserId={currentUser.id} />
    </div>
  );
}
