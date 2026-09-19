// Script único para crear el primer usuario admin. Ejecutar con:
//   node packages/shared/scripts/seed-admin.mjs
import { randomBytes, scryptSync } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "..", "..", "data");
const usersFile = path.join(dataDir, "users.json");

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

mkdirSync(dataDir, { recursive: true });

const existing = existsSync(usersFile) ? JSON.parse(readFileSync(usersFile, "utf-8")) : [];

if (existing.some((u) => u.email === "seleccionayudaestrategica@gmail.com")) {
  console.log("El admin ya existe, no se creó de nuevo.");
  process.exit(0);
}

const PERMISSION_MODULES = ["vacantes", "empresas", "calendario", "finanzas", "powerbi"];
const TEMP_PASSWORD = "AyudaEstrategica2026!";

const admin = {
  id: `user-${Date.now()}-seed`,
  name: "Aida Gamboa",
  email: "seleccionayudaestrategica@gmail.com",
  passwordHash: hashPassword(TEMP_PASSWORD),
  role: "admin",
  permissions: PERMISSION_MODULES,
  createdAt: new Date().toISOString(),
};

existing.push(admin);
writeFileSync(usersFile, JSON.stringify(existing, null, 2), "utf-8");

console.log("Usuario admin creado:");
console.log("  Correo:    " + admin.email);
console.log("  Password:  " + TEMP_PASSWORD + "  (cámbiala después de iniciar sesión)");
