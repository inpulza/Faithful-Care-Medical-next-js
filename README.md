# Faithful Care Medical — Next.js

Sitio bilingüe de Faithful Care Medical Services migrado a **Next.js App Router**.

## Requisitos

- Node.js 20.9 o superior
- npm

## Desarrollo local

```bash
npm ci
npm run dev
```

La aplicación se sirve por defecto en `http://localhost:3000`.

## Verificación

```bash
npm run check
npm run build
npm start -- --hostname 127.0.0.1 --port 3100
BASE_URL=http://127.0.0.1:3100 npm test
```

Los tests validan las 37 rutas canónicas EN/ES, redirects 301, SEO, archivos de descubrimiento, 404, imágenes y el contrato de `/api/contact`.

## Variables de entorno

Copiar `.env.example` a `.env.local` y definir:

- `FCMS_RESEND_API`: API key de Resend usada por `/api/contact`.

No guardar secretos en Git. En Vercel, configurar la variable en los entornos **Production**, **Preview** y **Development** que necesiten envío real.

## Vercel

Configuración esperada:

- Framework: Next.js
- Root directory: raíz del repositorio
- Install command: `npm install`/autodetect
- Build command: `npm run build`
- Output directory: autodetect de Next.js
- Production branch: `main`

El dominio público actual permanece sin cambios hasta conectarlo explícitamente en Vercel.
