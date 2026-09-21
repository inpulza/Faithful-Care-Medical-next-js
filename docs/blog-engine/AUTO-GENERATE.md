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
33 pruebas del blog y TypeScript pasan. Las pruebas de navegador cubren login, borrador privado, estados, filtros, generador, recuperación, imágenes reales en Blob, publicación solo local, índice lateral, categorías, canonical/sitemap, privacidad y retirada.
Además de las pruebas simuladas, se completó una ejecución real de las 15 etapas en Vercel Preview: run 8520081a-7d77-40e9-86a1-0aaaf1b97c6b, código 99b8b8582e9c956f3f74aee4ecea5fd061b1bb07. Se guardaron dos borradores EN/ES, una portada y dos imágenes interiores, alt text por visión y SEO traducido. Nada se publicó. Las respuestas usan JSON Schema estricto; el brief permite una sola reparación y mantiene la comprobación literal de evidencia.
Se capturan cinco tamaños: 390x844, 1024x768, 1440x900, 1920x1080 y 3440x1440.
Los PR17–20 tienen CI y Vercel verdes. En el código de la ejecución real pasaron 133 pruebas y las pruebas de navegador. La revisión posterior de ambos borradores cubrió los cinco tamaños, sin errores de página ni consola y sin nuevas generaciones.

## Pendientes para cerrar el motor completo
- Autorización explícita del destino Vercel para conectar las credenciales de Google; la revisión automática rechazó previamente esa transferencia. No se reintentó.
- Revisión visual de Jordan y revisión clínica de contenido real.
- Revisiones de código vigentes de todos los PR y aprobación final para producción.
Los PR siguen en borrador. Producción no se modificó.

## Conexión y credenciales
La clave autorizada de agencia se leyó directamente desde su archivo original en 05. Pass. OPENAI_API_KEY es Sensitive y solo está configurada para Preview en feat/blog-xl-layout-faithful-brand. BLOG_AI_ENABLED y BLOG_IMAGES_ENABLED están activos en esa rama. La nueva configuración se aplicó mediante redeploy; no se modificó producción.
Los modelos verificados con la cuenta son gpt-5.6-sol para texto, traducción y visión, y gpt-image-2.5-sunburst para imágenes. Las credenciales se leen solo en servidor: OPENAI_API_KEY, DATABASE_URL, BLOB_READ_WRITE_TOKEN, BLOG_ADMIN_PASSWORD_HASH y BLOG_ADMIN_SESSION_SECRET nunca llevan NEXT_PUBLIC_. La contraseña de administrador se conserva en la carpeta protegida del cliente; Vercel utiliza su hash scrypt y un secreto de sesión distinto.
Los archivos temporales de carga, cookies y credenciales de QA se retiran al acabar las verificaciones. No se guardan estados de navegador ni trazas con sesiones. Las originales en 05. Pass y los secretos necesarios de Vercel se conservan.

## Repetir la revisión sin generar ni publicar
La prueba tests/blog-real-review.e2e.mjs requiere BLOG_RUN_REAL=1, BLOG_PREVIEW_URL, EXPECTED_SHA y BLOG_PASS_DIRECTORY. Lee admin-preview.json y un cookie jar temporal de acceso a Preview directamente en memoria. Exige un run ya completado, abre los artículos por su título, comprueba su privacidad y revisión pendiente, captura los cinco tamaños y cierra la sesión. Bloquea las mutaciones de generación, edición y publicación; no incurre en nuevas llamadas de IA.
La prueba real detectó dos fallos de formato previos al guardado. Se corrigieron con esquemas estructurados y se conservaron ambos runs fallidos. El contador interno de generación del Preview se restableció una vez, después de comprobar que esos dos intentos no habían guardado artículos ni imágenes. No se modificaron límites de producción ni cuotas del proveedor.

## Revisión editorial pendiente
Los borradores de prueba demuestran el funcionamiento del motor, no aprobación médica. Además de la revisión clínica, conviene pulir la repetición de avisos y la frase sobre la fuente suministrada en el artículo de prueba. No se marcaron fuentes, imágenes ni contenido clínico como aprobados para forzar una publicación.
Referencias técnicas: https://developers.openai.com/api/docs/guides/structured-outputs y https://github.com/StefanTerdell/zod-to-json-schema.

## Revisión del editor y estructura de contenido
El editor abre en Preview; texto, imágenes y SEO/enlaces se separan en pestañas. Publicación, revisión opcional y Google están en Manage, dentro de la fila del dashboard. No hay confirmaciones de doctora ni aprobación manual de fuentes. La selección visual de imágenes se mantiene.
La generación propone 1000–1500 palabras útiles, respuesta inicial, secciones descriptivas, listas y preguntas concretas. Las tablas solo se solicitan cuando ayudan y están respaldadas por las fuentes. El saneamiento conserva caption, cabeceras y celdas; el render permite desplazamiento de tablas en móvil. La traducción verifica que no desaparezcan filas, celdas o listas.
El brief incluye hasta tres candidatos de artículos relacionados, publicados en el mismo idioma y categoría, con coincidencia temática. El redactor los usa solo cuando encajan; se mantienen los enlaces a servicios/contacto y las citas institucionales. El control de publicación valida la existencia de cada destino interno.
Estas prácticas mejoran lectura, navegación y claridad semántica. No prometen citas de IA ni rankings. Referencia oficial: https://developers.google.com/search/docs/appearance/ai-features . Google exige contenido útil y accesible; no existe una etiqueta especial que garantice aparecer en sus respuestas con IA.
Para próximas webs: copiar la organización de la UI y el flujo, configurar identidad, rutas, catálogo de autoridad e idiomas del cliente y probar el recorrido completo antes de Preview. Evitar introducir confirmaciones manuales que el cliente no necesita. Las fuentes siguen teniendo puntuación y trazabilidad aunque no requieran aprobación humana.
