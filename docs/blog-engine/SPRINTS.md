# Faithful Care: motor editorial bilingüe
Fecha: 2026-09-21. Base: inpulza/Faithful-Care-Medical-next-js @ 2041fc1e6fae826f381f741ee39b484804b9513d.

## Referencias verificadas
Healing Minds: main remoto 087f5c84a6a4f066038260cc5a7550bc8201937e. XL Homes Next.js: main remoto 7cbfd4e932074af8051bc4059d6b89b160a09604. Revisados login, esquema, estados editoriales, traducción, links, generación y publicación. Piloto metodológico: inpulza/XL-Home. Método canónico: inpulza-seo-blog-engine/docs/METHODOLOGY.md y XL_HOMES_OPERATIONAL_PORTING_BRIEF.md.
Vercel Faithful Care: prj_b3fsRo4umfNT77dQ6ywkOM2PD58l. CLI autenticada. Inicialmente solo RESEND_API_KEY en Preview/Production. Conector Vercel devolvió 403, sin implicar un fallo del proyecto.

## Sprints
1. Acceso y persistencia: PostgreSQL aislado, migración, scrypt, sesiones privadas, límite persistente de login, CSRF y estados editoriales.
2. Blog EN/ES: HTML del servidor, archivo/artículo, canonical, schema, traducciones publicadas, sitemap y diseño Faithful Care.
3. Calidad y enlaces: rutas reales, catálogo de fuentes, comprobación de salud, puntuación explicada, publicación bloqueada ante fallos.
4. Research y generación: temas del cliente, memoria de contenido, borradores privados, cuotas y trazabilidad.
5. Traducción: parejas EN/ES, slugs/enlaces adaptados, revisión independiente.
6. Imágenes: hero e inline, almacenamiento propio, alt, selección y revisión humana.
7. Google: auditoría del sitio, sitemap submit y URL Inspection con GCC existente, resultados y reintentos registrados.
8. Entrega: checks/build/E2E desktop y móvil, matriz 390/1024/1440/1920/3440, Preview con SHA exacto y revisión PR.

## Decisiones y límites
Adapto contratos probados sin copiar datos clínicos, rutas antiguas ni secretos de otros clientes. Una base/bucket por cliente. Toda generación queda en draft. Publicación humana y aprobación visual antes de merge. No afirmo autoría/revisión médica sin confirmación. Sitemap enviado no significa indexación. La Indexing API de Google solo admite JobPosting/BroadcastEvent, no artículos generales.
Desarrollo fuera de OneDrive. No publicación de contenido médico de prueba en producción.

## Infraestructura y cierre
PostgreSQL y Blob exclusivos de Preview creados mediante la integración Vercel existente. Login propio configurado. Pendientes: credencial IA, autorización de transferencia de conexión Google, revisión visual y lanzamiento. Ver ESTADO.md y OPERACION.md para evidencias y límites actualizados.
