"use server";

import { revalidatePath } from "next/cache";
import {
  createUser,
  deleteUser,
  listUsers,
  requireAdmin,
  updateUserPermissions,
  PERMISSION_MODULES,
  type PermissionModule,
  type Role,
} from "@shared/auth";

export type CreateUserState = { error?: string; ok?: boolean } | null;

export async function createUserAction(
  _prev: CreateUserState,
  formData: FormData
): Promise<CreateUserState> {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const role = (String(formData.get("role") ?? "partner") as Role) || "partner";
  const permissions = PERMISSION_MODULES.filter((m) => formData.get(`perm_${m}`) === "on");

  if (!name || !email || password.length < 8) {
    return { error: "Nombre, correo y una contraseña de al menos 8 caracteres son obligatorios." };
  }

  try {
    await createUser({ name, email, password, role, permissions });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "No se pudo crear el usuario." };
  }

  revalidatePath("/admin/usuarios");
  return { ok: true };
}

export async function togglePermissionAction(userId: string, mod: PermissionModule, enabled: boolean) {
  await requireAdmin();
  const all = await listUsers();
  const user = all.find((u) => u.id === userId);
  if (!user || user.role === "admin") return;
  const next = enabled
    ? [...new Set([...user.permissions, mod])]
    : user.permissions.filter((p) => p !== mod);
  await updateUserPermissions(userId, next);
  revalidatePath("/admin/usuarios");
}

export async function deleteUserAction(userId: string) {
  const admin = await requireAdmin();
  const all = await listUsers();
  const target = all.find((u) => u.id === userId);
  if (!target) return;
  if (target.id === admin.id) return; // no autoeliminarse
  const remainingAdmins = all.filter((u) => u.role === "admin" && u.id !== userId);
  if (target.role === "admin" && remainingAdmins.length === 0) return; // siempre debe quedar 1 admin
  await deleteUser(userId);
  revalidatePath("/admin/usuarios");
}
