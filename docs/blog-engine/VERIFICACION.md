# Verificación

## Comandos reproducibles
- npm run check
- npm run test:blog
- npm run build
- npm test contra un servidor de producción en BASE_URL (la CI inicia y detiene ese servidor).
- node scripts/blog-dev.mjs y node tests/blog-ui.e2e.mjs: base PGlite local aislada, acceso y borradores privados en móvil/escritorio, archivo EN/ES y cinco viewports.
- node --import tsx tests/blog-complete.e2e.mjs: requiere almacenamiento Preview mediante BLOG_PREVIEW_ENV_FILE y BLOB_PUBLIC_HOSTNAME; valida carga real, selección hero/inline, vista previa, publicación local, canonical/sitemap, privacidad y retirada.
- node tests/blog-preview.e2e.mjs: requiere BLOG_PREVIEW_URL, EXPECTED_SHA y BLOG_PASS_DIRECTORY. Usa cookies de acceso Vercel existentes y verifica el SHA exacto antes de operar. Nunca publica su borrador técnico.

## Evidencia obtenida
TypeScript pasa. 16 pruebas del motor pasan, incluyendo concurrencia de generación, traducción desactualizada, credenciales, CSRF, fuentes, propiedad de imágenes y controles de publicación.
E2E completo desktop/mobile y matriz visual 390x844, 1024x768, 1440x900, 1920x1080 y 3440x1440 pasan.
CI de e969a7abecff00d4ed761927232249f4bde9fdfb: build y 115 pruebas pasan, además del E2E protegido nuevo. Los cambios posteriores de revisión deben usar su propia CI.
Preview e969a7abecff00d4ed761927232249f4bde9fdfb: SHA, login/logout, persistencia real, borrador oculto/404, fuente HTTP saludable, Blob real y selección, vista previa aislada y matriz de cinco viewports pasan.

## Límites
Las pruebas de IA validan contratos y fallos, no generación real. No hay credencial autorizada configurada.
GCC nativo verifica siteOwner de sc-domain:faithfulcaremedical.com. El flujo de la aplicación Vercel permanece sin credenciales y los envíos están desactivados.
Producción y contenido médico público no se modificaron. No merge sin revisión visual, CI/E2E de HEAD y clasificación de notas de Code Review.
