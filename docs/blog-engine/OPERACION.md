# Operación y lanzamiento

## Acceso
/admin/login y /admin/blog. Las credenciales reales están en 05. Pass/Blog Engine/admin-preview.json. No se añaden contraseñas a Git ni a documentos.
Cambiar username, hash o secreto de sesión revoca las sesiones anteriores. Generar el hash con passwordHash de server/blog/auth.ts y guardarlo directamente en la configuración protegida, sin imprimir la contraseña.

## Flujo editorial
1. Revisar el catálogo de fuentes, comprobar sus URLs y aprobar solo las pertinentes.
2. Elegir un tema del plan, generar un borrador EN o ES y revisar el texto.
3. Traducir automáticamente la versión guardada; la pareja requiere una revisión clínica independiente.
4. Subir o generar candidatos de imágenes, revisarlos, completar alt y seleccionar hero/posiciones inline.
5. Revisar la vista previa y las comprobaciones. Enviar a revisión, identificar al clínico que realmente revisó y confirmar la publicación.
6. Consultar el registro Google. Si hay error, corregir la causa y usar el reintento del editor. No interpretar una consulta de URL Inspection como solicitud ni garantía de indexación.

## Preparación de producción
- Resolver credencial/modelos IA y autorización de la conexión Google.
- Crear base y Blob de producción exclusivos, conservando Preview separado.
- Aplicar migrations/blog/*.sql en orden mediante scripts/blog-migrate.mjs con DATABASE_URL del entorno de destino. Las migraciones son aditivas e idempotentes.
- Configurar variables de .env.example por entorno; no copiar marcadores [SENSITIVE] de un env pull. Vercel no devuelve los valores sensibles al descargarlos.
- Configurar modelos y límites. Probar una generación EN, su traducción ES y un candidato de cada rol antes de habilitar la operación.
- Resolver notas válidas de Code Review, obtener aprobación visual, comprobar CI/E2E y SHA exacto del deployment.
- Fusionar los PRs encadenados mediante GitHub, conservando las ramas. Verificar los diffs al cambiar sus bases para evitar incluir commits ya fusionados.
- Confirmar login y dos idiomas con el SHA final; publicar únicamente un artículo clínicamente revisado y comprobar su URL canónica, sitemap y respuesta real de Google.

## Recuperación
BLOG_ENABLED y NEXT_PUBLIC_BLOG_ENABLED permiten ocultar el blog y sus enlaces mediante redeploy. Desactivar BLOG_AI_ENABLED, BLOG_IMAGES_ENABLED y BLOG_GSC_ENABLED detiene cada integración.
Unpublish retira artículo y sitemap, conserva datos e historial y permite corregirlo.
No borrar bases, tablas, objetos Blob ni ramas como parte de una reversión rutinaria.
Una interrupción de IA no debe provocar un reintento ciego: revisar el historial. La clave de operación impide guardar dos veces la misma generación.
