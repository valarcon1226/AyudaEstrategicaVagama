# Ayuda Estratégica — HR B2B Platform

Plataforma de Reclutamiento Estratégico y Outsourcing de RRHH para Colombia, México y LatAm.

## Arquitectura

```
GitHub (este repo)
    ↓ push a main
GitHub Actions (CI/CD)
    ↓ build + deploy FTP
GoDaddy Hosting (sitio público)

+ Supabase (PostgreSQL + Auth + Storage)
+ n8n VPS (automatizaciones)
```

## Estructura del Proyecto

```
frontend/       ← Sitio público (se despliega a GoDaddy public_html/)
dashboard/      ← Panel privado recruiters (GoDaddy public_html/panel/)
database/       ← Schema SQL para Supabase
n8n-workflows/  ← Backups JSON de flujos n8n
strategic_core/ ← Design system
```

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Compilar CSS (watch mode durante desarrollo)
npm run dev

# Build final para producción
npm run build:all
```

## Despliegue

El despliegue es **automático** al hacer push a `main`:

```bash
git add .
git commit -m "descripción del cambio"
git push origin main
# → GitHub Actions construye el CSS y despliega a GoDaddy vía FTP
```

## Configuración Requerida (Secrets en GitHub)

Ver `.github/workflows/deploy.yml` para la lista de secrets necesarios.

## Tech Stack

- **Frontend**: HTML + Vanilla JS + TailwindCSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Automatizaciones**: n8n (self-hosted)
- **Hosting**: GoDaddy
- **CI/CD**: GitHub Actions → FTP Deploy
