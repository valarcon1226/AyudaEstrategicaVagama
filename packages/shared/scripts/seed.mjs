// Siembra inicial de la base de datos real (Supabase). Ejecutar con:
//   node packages/shared/scripts/seed.mjs
import { randomBytes, scryptSync } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Carga DATABASE_URL desde packages/shared/.env (script standalone, sin Next.js).
const envPath = path.join(__dirname, "..", ".env");
for (const line of readFileSync(envPath, "utf-8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
}

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

const VACANCIES = [
  { title: "Asistente Administrativa", sector: "Industrial", city: "Cota, Colombia" },
  { title: "Auxiliar de Enfermería", sector: "Salud", city: "Tunja, Colombia" },
  { title: "Gerente General", sector: "Industrial", city: "Cota, Colombia" },
  { title: "Director Operativo", sector: "Industrial", city: "Cota, Colombia" },
  { title: "Mensajero Motorizado", sector: "Transporte", city: "Pereira, Colombia" },
  { title: "Auxiliar de Farmacia", sector: "Salud", city: "Pereira, Colombia" },
  { title: "Auxiliar de Enfermería", sector: "Salud", city: "México" },
  { title: "Operario de Tanqueo", sector: "Servicios Aeroportuarios", city: "Tumaco e Ipiales, Colombia" },
  { title: "Auxiliar de Enfermería", sector: "Salud", city: "Bogotá, Colombia" },
  { title: "Asesor Comercial", sector: "Industrial", city: "Medellín, Colombia" },
  { title: "Gestor de Operaciones Terrestres", sector: "Transporte", city: "Duitama, Colombia" },
];

async function main() {
  const adminEmail = "seleccionayudaestrategica@gmail.com";
  const existingAdmin = await prisma.portalUser.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const tempPassword = "AyudaEstrategica2026!";
    await prisma.portalUser.create({
      data: {
        name: "Aida Gamboa",
        email: adminEmail,
        passwordHash: hashPassword(tempPassword),
        role: "ADMIN",
        permissions: ["vacantes", "empresas", "calendario", "finanzas", "powerbi"],
      },
    });
    console.log("Admin creado:", adminEmail, "/ password temporal:", tempPassword);
  } else {
    console.log("Admin ya existía, no se creó de nuevo.");
  }

  const existingVacancies = await prisma.vacancy.count();
  if (existingVacancies === 0) {
    for (const v of VACANCIES) {
      await prisma.vacancy.create({
        data: {
          title: v.title,
          clientCompany: "Cliente confidencial",
          sector: v.sector,
          city: v.city,
          modality: "Presencial",
          salaryRange: "No especificado",
          status: "abierta",
          visibleFields: { salaryRange: false, clientCompany: false },
        },
      });
    }
    console.log(`${VACANCIES.length} vacantes creadas.`);
  } else {
    console.log(`Ya existían ${existingVacancies} vacantes, no se volvieron a crear.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
