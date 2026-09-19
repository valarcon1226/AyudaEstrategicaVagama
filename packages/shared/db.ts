import "server-only";
import { PrismaClient } from "@prisma/client";

// Singleton estándar de Prisma para Next.js — evita abrir demasiadas
// conexiones cuando el servidor de desarrollo recarga en caliente.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
