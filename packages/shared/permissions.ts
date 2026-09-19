// Constantes y tipos de roles/permisos SIN dependencias de servidor (fs,
// cookies, etc.) — seguro de importar desde componentes cliente. La lógica
// real (hash, sesiones, lectura/escritura) vive en ./auth (server-only).

export const PERMISSION_MODULES = [
  "vacantes",
  "empresas",
  "calendario",
  "finanzas",
  "powerbi",
] as const;
export type PermissionModule = (typeof PERMISSION_MODULES)[number];

export const PERMISSION_LABELS: Record<PermissionModule, string> = {
  vacantes: "Gestión de Vacantes",
  empresas: "Empresas & CRM",
  calendario: "Calendario",
  finanzas: "Finanzas",
  powerbi: "Power BI",
};

export type Role = "admin" | "partner";

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: PermissionModule[];
  createdAt: string;
};

export function hasPermission(
  user: Pick<PublicUser, "role" | "permissions">,
  mod: PermissionModule
): boolean {
  return user.role === "admin" || user.permissions.includes(mod);
}
