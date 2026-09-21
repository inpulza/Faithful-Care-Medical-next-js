# Auto Generate y adaptación de XL Homes
Fecha: 2026-09-21.

## Alcance corregido
El PR16 aportó un CMS con generación, traducción e imágenes puntuales. No equivalía al motor Auto Generate solicitado. Los PR17–19 incorporan la cadena automática; esta rama añade la organización y UI de XL Homes con el diseño de Faithful Care.

## Referencias verificadas
- Metodología: 00 Inpulza/Desarrolllos/inpulza-seo-blog-engine/docs/METHODOLOGY.md y XL_HOMES_OPERATIONAL_PORTING_BRIEF.md.
- XL Homes: inpulza/XL-Home, main 798c822b7c0469f7546a240a9d10e50c49095895. BlogAdminPage, BlogPage, BlogPostPage, LinkLibraryPanel, SourcesLinkHealthPanel y motor server/blog.
- Healing Minds: server/blog/admin-routes.ts y generation/storage.ts.
- Branding: tokens existentes de Faithful Care, azul primary, turquesa secondary, Inter y DM Serif Display.

## Sprints implementados
1. PR17: candidatos IA, diversidad, comparación determinista y juez semántico, fuentes institucionales verificadas, brief con evidencia, escritura, expansión, limpieza y SEO con reparación acotada.
2. PR18: plan de portada y dos imágenes interiores por secciones reales, alt text asistido por visión, candidatos pendientes de revisión.
3. PR19: Auto Generate, 15 etapas persistidas, progreso SSE, recuperación tras recarga, EN/ES y verificación final. Prepara borradores privados; requiere revisión antes de publicar.
4. Rama feat/blog-xl-layout-faithful-brand: tablero con contadores, búsqueda, filtros y miniaturas; generador en diálogo; imágenes separadas por función; biblioteca de fuentes, historial y citas por artículo; archivo público con destacado y categorías; índice lateral activo en escritorio y desplegable móvil.

## Datos y recuperación
Las migraciones 005 y 006 añaden historial del motor y copias de investigación. Se aplicaron a la base Preview aislada.
Cada consulta registra un evento. Las lecturas saludables se conservan 24 horas y se reutilizan solo si corresponden al último chequeo saludable. Un chequeo fallido invalida la copia y revoca aprobación. El botón de chequeo siempre consulta la URL en vivo. La UI distingue calidad del enlace, aprobación de fuente y revisión clínica.
El navegador coordina las etapas: al cerrar la pestaña, la petición ya iniciada puede terminar; al volver, continúa desde el último checkpoint. No existe un trabajador permanente en segundo plano. Una operación incierta se detiene sin repetir a ciegas la llamada de pago.

## Verificación y límites
31 pruebas del blog y TypeScript pasan. Las pruebas de navegador cubren login, borrador privado, estados, filtros, generador, recuperación, imágenes reales en Blob, publicación solo local, índice lateral, categorías, canonical/sitemap, privacidad y retirada.
La prueba del proveedor en la cadena automática usa respuestas simuladas; verifica coordinación y persistencia, no calidad real de OpenAI.
Se capturan cinco tamaños: 390x844, 1024x768, 1440x900, 1920x1080 y 3440x1440.
Los PR17–19 tienen CI y Vercel verdes. El nuevo PR requiere sus propios checks y verificación del SHA desplegado.

## Pendientes para cerrar el motor completo
- Clave OpenAI autorizada y prueba real de un artículo EN/ES con portada, dos imágenes interiores y alt text.
- Autorización explícita del destino Vercel para conectar las credenciales de Google; la revisión automática rechazó previamente esa transferencia. No se reintentó.
- Revisión visual de Jordan y revisión clínica de contenido real.
- Revisiones de código vigentes de todos los PR y aprobación final para producción.
Los PR siguen en borrador. Producción no se modificó.
