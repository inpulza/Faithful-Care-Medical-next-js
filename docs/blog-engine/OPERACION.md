# OperaciÃ³n y lanzamiento

## Acceso
/admin/login y /admin/blog. Las credenciales reales estÃ¡n en 05. Pass/Blog Engine/admin-preview.json. No se aÃ±aden contraseÃ±as a Git ni a documentos.
Cambiar username, hash o secreto de sesiÃ³n revoca las sesiones anteriores. Generar el hash con passwordHash de server/blog/auth.ts y guardarlo directamente en la configuraciÃ³n protegida, sin imprimir la contraseÃ±a.

## Flujo editorial
1. Revisar el catÃ¡logo de fuentes, comprobar sus URLs y aprobar solo las pertinentes.
2. Elegir un tema del plan, generar un borrador EN o ES y revisar el texto.
3. Traducir automÃ¡ticamente la versiÃ³n guardada; la pareja requiere una revisiÃ³n clÃ­nica independiente.
4. Subir o generar candidatos de imÃ¡genes, revisarlos, completar alt y seleccionar hero/posiciones inline.
5. Revisar la vista previa y las comprobaciones. Enviar a revisiÃ³n, identificar al clÃ­nico que realmente revisÃ³ y confirmar la publicaciÃ³n.
6. Consultar el registro Google. Si hay error, corregir la causa y usar el reintento del editor. No interpretar una consulta de URL Inspection como solicitud ni garantÃ­a de indexaciÃ³n.

## PreparaciÃ³n de producciÃ³n
- Resolver credencial/modelos IA y autorizaciÃ³n de la conexiÃ³n Google.
- Crear base y Blob de producciÃ³n exclusivos, conservando Preview separado.
- Aplicar migrations/blog/*.sql en orden mediante scripts/blog-migrate.mjs con DATABASE_URL del entorno de destino. Las migraciones son aditivas e idempotentes.
- Configurar variables de .env.example por entorno; no copiar marcadores [SENSITIVE] de un env pull. Vercel no devuelve los valores sensibles al descargarlos.
- Configurar modelos y lÃ­mites. Probar una generaciÃ³n EN, su traducciÃ³n ES y un candidato de cada rol antes de habilitar la operaciÃ³n.
- Resolver notas vÃ¡lidas de Code Review, obtener aprobaciÃ³n visual, comprobar CI/E2E y SHA exacto del deployment.
- Fusionar los PRs encadenados mediante GitHub, conservando las ramas. Verificar los diffs al cambiar sus bases para evitar incluir commits ya fusionados.
- Confirmar login y dos idiomas con el SHA final; publicar Ãºnicamente un artÃ­culo clÃ­nicamente revisado y comprobar su URL canÃ³nica, sitemap y respuesta real de Google.

## RecuperaciÃ³n
BLOG_ENABLED y NEXT_PUBLIC_BLOG_ENABLED permiten ocultar el blog y sus enlaces mediante redeploy. Desactivar BLOG_AI_ENABLED, BLOG_IMAGES_ENABLED y BLOG_GSC_ENABLED detiene cada integraciÃ³n.
Unpublish retira artÃ­culo y sitemap, conserva datos e historial y permite corregirlo.
No borrar bases, tablas, objetos Blob ni ramas como parte de una reversiÃ³n rutinaria.
Una interrupciÃ³n de IA no debe provocar un reintento ciego: revisar el historial. La clave de operaciÃ³n impide guardar dos veces la misma generaciÃ³n.

## Modelos y variables de Preview (2026-09-21)
- Texto y traducción: BLOG_AI_MODEL=gpt-5.6-sol; se usa max_completion_tokens y razonamiento low para la familia GPT-5. El nombre BLOG_TEXT_MODEL del ejemplo anterior era incorrecto.
- Portadas e imágenes interiores: BLOG_IMAGE_MODEL=gpt-image-2.5-sunburst. Cada candidato parte de un prompt nuevo, nunca de una imagen generada anterior.
- Las selecciones están preparadas en código. La ejecución real y la calidad editorial no están validadas hasta disponer de OPENAI_API_KEY autorizado para este cliente.
- Vercel: proyecto faithful-care-medical-next-js > Settings > Environment Variables > Preview. Añadir la clave como Sensitive y definir los dos modelos; activar BLOG_AI_ENABLED y BLOG_IMAGES_ENABLED al preparar la prueba controlada. Hacer redeploy después de guardar.
- Usuario, hash de contraseña, secreto de sesión, base y Blob ya están configurados en Preview. La contraseña legible vive en 05. Pass; Vercel recibe su hash. Nunca usar NEXT_PUBLIC_ para claves, contraseñas ni tokens.
- Desde el deployment Preview, abrir /admin/login. La protección de Vercel y el login editorial son dos accesos distintos. PR16 contiene el Preview integrado de los sprints anteriores.
- Prueba real pendiente: generar EN, guardar, revisar imágenes, traducir a ES, revisar ambas versiones y publicar en Preview. Cada idioma se aprueba por separado. La publicación de Preview usa su propia base y no afecta al dominio de producción.
- Google continúa desactivado y pendiente de autorización de su transferencia de credenciales; no depende de la clave de OpenAI.
Referencias oficiales: https://developers.openai.com/api/docs/models/gpt-image-2.5-sunburst y https://developers.openai.com/api/docs/models/gpt-5.6-sol.
