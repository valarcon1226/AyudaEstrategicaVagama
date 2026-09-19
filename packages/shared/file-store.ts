import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

// Almacenamiento simple en JSON en /data en la raíz del repo — puente
// temporal para que el portal privado y el sitio público lean/escriban
// los mismos datos mientras se conecta Postgres (decisión de arquitectura).
// No usar para datos sensibles ni con escrituras concurrentes reales.
//
// Importante: NO usar __dirname aquí. Next.js empaqueta este archivo y en
// tiempo de ejecución __dirname apunta a la ruta del chunk compilado
// (dentro de .next/server/...), no a la ubicación real del código fuente —
// eso hacía que nunca encontrara data/users.json y el login siempre fallara.
// process.cwd() sí es confiable: siempre es la carpeta del app (apps/<app>)
// desde donde se corre `next dev`/`next build`/`next start`.

function resolveDataDir(): string {
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    const candidate = path.join(dir, "data");
    try {
      // Buscamos la carpeta "data" que además tenga package.json hermano en la raíz del repo.
      if (require("node:fs").existsSync(path.join(dir, "package.json")) &&
          require("node:fs").existsSync(path.join(dir, "apps"))) {
        return candidate;
      }
    } catch {
      // sigue buscando
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  // Fallback razonable: dos niveles arriba de apps/<app-name>.
  return path.join(process.cwd(), "..", "..", "data");
}

const DATA_DIR = resolveDataDir();

export async function readJsonFile<T>(fileName: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, fileName), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJsonFile<T>(fileName: string, data: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, fileName), JSON.stringify(data, null, 2), "utf-8");
}
