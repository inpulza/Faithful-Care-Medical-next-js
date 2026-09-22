# Operación y lanzamiento

## Acceso
/admin/login y /admin/blog. Las credenciales reales están en 05. Pass/Blog Engine/admin-preview.json. No se añaden contraseñas a Git ni a documentos.
Cambiar username, hash o secreto de sesión revoca las sesiones anteriores. Generar el hash con passwordHash de server/blog/auth.ts y guardarlo directamente en la configuración protegida, sin imprimir la contraseña.

## Flujo editorial vigente (petición de Jordan, 21 septiembre 2026)
1. Auto Generate prepara el artículo, sus imágenes y la traducción como borradores privados.
2. Preview abre el artículo para leerlo con portada, imágenes interiores, índice y tiempo de lectura. Edit text permite corregir texto con formato; Images agrupa portada e interiores; SEO & links muestra metadatos y conexiones.
3. Las fuentes se cualifican automáticamente: URL exacta del catálogo institucional, calidad mínima 70/100, respuesta saludable y comprobación de menos de 7 días. La base conserva resultado e historial; no hay botones de aprobar fuentes. Check article y Publish renuevan comprobaciones caducadas o fallidas.
4. La selección de imágenes conserva su revisión visual y alt text. Una imagen ajena a la biblioteca del artículo no puede usarse para publicar.
5. En la fila del dashboard, Manage contiene Check article, Send to review, Publish y Return to draft/Unpublish. Pasar por pending_review es opcional. Publicar requiere una acción explícita del editor autenticado y los controles técnicos; no pide nombre ni checkbox de la doctora. Se registra el usuario que publica, sin atribuir una revisión clínica inexistente.
6. Cada idioma se publica de manera independiente. Google visibility vive en Manage, fuera del editor. Preview nunca envía artículos a Google; URL Inspection no es solicitud ni garantía de indexación.

## Preparación de producción
- Resolver credencial/modelos IA y autorización de la conexión Google.
- Crear base y Blob de producción exclusivos, conservando Preview separado.
- Aplicar migrations/blog/*.sql en orden mediante scripts/blog-migrate.mjs con DATABASE_URL del entorno de destino. Las migraciones son aditivas e idempotentes.
- Configurar variables de .env.example por entorno; no copiar marcadores [SENSITIVE] de un env pull. Vercel no devuelve los valores sensibles al descargarlos.
- Configurar modelos y límites. Probar una generación EN, su traducción ES y un candidato de cada rol antes de habilitar la operación.
- Resolver notas válidas de Code Review, obtener aprobación visual, comprobar CI/E2E y SHA exacto del deployment.
- Fusionar los PRs encadenados mediante GitHub, conservando las ramas. Verificar los diffs al cambiar sus bases para evitar incluir commits ya fusionados.
- Confirmar login y dos idiomas con el SHA final; publicar únicamente el artículo que el editor haya decidido publicar y comprobar su URL canónica, sitemap y respuesta real de Google.

## Recuperación
BLOG_ENABLED y NEXT_PUBLIC_BLOG_ENABLED permiten ocultar el blog y sus enlaces mediante redeploy. Desactivar BLOG_AI_ENABLED, BLOG_IMAGES_ENABLED y BLOG_GSC_ENABLED detiene cada integración.
Unpublish retira artículo y sitemap, conserva datos e historial y permite corregirlo.
No borrar bases, tablas, objetos Blob ni ramas como parte de una reversión rutinaria.
Una interrupción de IA no debe provocar un reintento ciego: revisar el historial. La clave de operación impide guardar dos veces la misma generación.

## Modelos y variables de Preview (2026-09-21)
- Texto y traducción: BLOG_AI_MODEL=gpt-5.6-sol; se usa max_completion_tokens y razonamiento low para la familia GPT-5. El nombre BLOG_TEXT_MODEL del ejemplo anterior era incorrecto.
- Portadas e imágenes interiores: BLOG_IMAGE_MODEL=gpt-image-2.5-sunburst. Cada candidato parte de un prompt nuevo, nunca de una imagen generada anterior.
- Las selecciones están preparadas en código. La ejecución real de texto, traducción e imágenes se comprobó en Preview; la revisión editorial sigue siendo parte del trabajo antes de publicar.
- Vercel: proyecto faithful-care-medical-next-js > Settings > Environment Variables > Preview. Añadir la clave como Sensitive y definir los dos modelos; activar BLOG_AI_ENABLED y BLOG_IMAGES_ENABLED al preparar la prueba controlada. Hacer redeploy después de guardar.
- Usuario, hash de contraseña, secreto de sesión, base y Blob ya están configurados en Preview. La contraseña legible vive en 05. Pass; Vercel recibe su hash. Nunca usar NEXT_PUBLIC_ para claves, contraseñas ni tokens.
- Desde el deployment Preview, abrir /admin/login. La protección de Vercel y el login editorial son dos accesos distintos. PR16 contiene el Preview integrado de los sprints anteriores.
- Generación real EN/ES e imágenes completada y conservada en borradores. Cada idioma se publica por separado desde el dashboard. La publicación de Preview usa su propia base y no afecta al dominio de producción.
- Google continúa desactivado y pendiente de autorización de su transferencia de credenciales; no depende de la clave de OpenAI.
Referencias oficiales: https://developers.openai.com/api/docs/models/gpt-image-2.5-sunburst y https://developers.openai.com/api/docs/models/gpt-5.6-sol.

## Decisión de lanzamiento, 22 septiembre 2026
Jordan autorizó desplegar después de tres jueces y crear la base/Blob de producción con facturación por uso del plan existente. PR20 se consolida contra main para desplegar el conjunto auditado en una única versión; PR11–19 son los sprints contenidos en él. No desplegar sucesivamente versiones incompletas del motor. Conservar todas las ramas remotas.
La cuota de tres imágenes/hora se reserva antes de iniciar Auto Generate; una operación detenida no devuelve reservas para evitar duplicar gasto incierto. La selección admite hasta cinco imágenes interiores; reemplazar una ubicación existente no aumenta el total.
Después de la primera publicación, conservar el slug. Al retirar un artículo se muestran los artículos publicados que lo enlazan; revisar esas dependencias. Republicar conserva la fecha original.
