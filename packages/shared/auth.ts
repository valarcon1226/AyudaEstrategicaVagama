import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./db";
import { PERMISSION_MODULES, type PermissionModule, type Role, type PublicUser } from "./permissions";

// Autenticación y permisos del portal privado, sobre Postgres (Supabase) vía Prisma.
// - admin: ve todo, puede crear/editar usuarios y sus permisos.
// - partner: solo ve los módulos que el admin le otorgue explícitamente.
// Sin 2FA por ahora (decisión de arquitectura: "no aún no").
export { PERMISSION_MODULES, PERMISSION_LABELS, type PermissionModule, type Role, type PublicUser } from "./permissions";

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  permissions: PermissionModule[];
  createdAt: string;
};

const COOKIE_NAME = "ae_session";
const SESSION_SECRET = process.env.SESSION_SECRET ?? "dev-insecure-secret-change-me";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function toRole(dbRole: "ADMIN" | "PARTNER"): Role {
  return dbRole === "ADMIN" ? "admin" : "partner";
}
function toDbRole(role: Role): "ADMIN" | "PARTNER" {
  return role === "admin" ? "ADMIN" : "PARTNER";
}

function fromDb(u: {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "ADMIN" | "PARTNER";
  permissions: string[];
  createdAt: Date;
}): User {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    passwordHash: u.passwordHash,
    role: toRole(u.role),
    permissions: u.permissions as PermissionModule[],
    createdAt: u.createdAt.toISOString(),
  };
}

function hashPassword(password: string, salt = crypto.randomBytes(16).toString("hex")): string {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = crypto.scryptSync(password, salt, 64).toString("hex");
  const a = Buffer.from(hash, "hex");
  const b = Buffer.from(candidate, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
}

export function toPublicUser(u: User): PublicUser {
  const { passwordHash, ...rest } = u;
  return rest;
}

export function hasPermission(user: Pick<User, "role" | "permissions">, mod: PermissionModule): boolean {
  return user.role === "admin" || user.permissions.includes(mod);
}

export async function listUsers(): Promise<User[]> {
  const rows = await prisma.portalUser.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map(fromDb);
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const row = await prisma.portalUser.findUnique({ where: { email: email.toLowerCase() } });
  return row ? fromDb(row) : undefined;
}

export async function findUserById(id: string): Promise<User | undefined> {
  const row = await prisma.portalUser.findUnique({ where: { id } });
  return row ? fromDb(row) : undefined;
}

export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;
  return verifyPassword(password, user.passwordHash) ? user : null;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role: Role;
  permissions: PermissionModule[];
}): Promise<User> {
  const existing = await findUserByEmail(data.email);
  if (existing) {
    throw new Error("Ya existe un usuario con ese correo.");
  }
  const row = await prisma.portalUser.create({
    data: {
      name: data.name,
      email: data.email.toLowerCase(),
      passwordHash: hashPassword(data.password),
      role: toDbRole(data.role),
      permissions: data.role === "admin" ? [...PERMISSION_MODULES] : data.permissions,
    },
  });
  return fromDb(row);
}

export async function updateUserPermissions(
  id: string,
  permissions: PermissionModule[]
): Promise<User | undefined> {
  const row = await prisma.portalUser.update({ where: { id }, data: { permissions } });
  return fromDb(row);
}

export async function deleteUser(id: string): Promise<void> {
  await prisma.portalUser.delete({ where: { id } });
}

// --- Sesión (cookie firmada, sin librerías externas) ---

export async function createSession(userId: string): Promise<void> {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `${userId}.${exp}`;
  const token = `${payload}.${sign(payload)}`;
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

async function getSessionUserId(): Promise<string | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [userId, expStr, sig] = parts;
  const expected = sign(`${userId}.${expStr}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  if (Date.now() > Number(expStr)) return null;
  return userId;
}

export async function getCurrentUser(): Promise<User | null> {
  const userId = await getSessionUserId();
  if (!userId) return null;
  return (await findUserById(userId)) ?? null;
}

// --- Guards para usar al inicio de cada page.tsx (Server Component) ---

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requirePermission(mod: PermissionModule): Promise<User> {
  const user = await requireUser();
  if (!hasPermission(user, mod)) redirect("/sin-acceso");
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireUser();
  if (user.role !== "admin") redirect("/sin-acceso");
  return user;
}
