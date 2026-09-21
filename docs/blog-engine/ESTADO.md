# Estado del motor editorial
Actualizado: 2026-09-21. Producción sin cambios; PRs en borrador.

## Implementado y comprobado
- Acceso protegido, sesiones revocables, CSRF, cuotas y PostgreSQL aislado.
- Blog EN/ES renderizado en servidor, canonical, schema, sitemap y navegación.
- Catálogo de fuentes MedlinePlus con comprobación real de HTTP, cualificación automática y puntuación explicada.
- Plan de ocho temas bilingües basado en servicios reales. Generación y traducción de borradores, operaciones persistentes y control de duplicados.
- Hero e imágenes inline en Blob del cliente: WebP, metadatos eliminados, revisión, alt y pertenencia al artículo o su traducción.
- Preview privado integrado y edición visual. Publicación desde el dashboard por el editor autenticado, sin confirmación clínica adicional ni aprobación manual de fuentes.
- Auditoría de página canónica y sitemap, envío de sitemap y consulta URL Inspection preparados. Preview nunca envía artículos a Google.
- Aislamiento de rastreadores al navegar hacia y desde artículos sanitarios.

## Evidencia
37 pruebas del blog pasan. E2E completo desktop/mobile pasa con carga real de hero e inline, selección, revisión, publicación local, canonical, sitemap, privacidad y retirada. Matriz visual: 390x844, 1024x768, 1440x900, 1920x1080, 3440x1440.
Las imágenes sólidas y textos repetidos de las pruebas son fixtures técnicos, no contenido aprobado.
PR20 contiene la revisión vigente del editor. Se verifican su SHA, CI y E2E antes de entregar el Preview; no se fusiona sin revisión visual.

## Infraestructura
Base Neon exclusiva Preview: store_Lw5RawlG6y0OQ228.
Blob exclusivo Preview: store_JnznGYac5bcOTMQb.
Login creado; credenciales en la carpeta 05. Pass/Blog Engine del cliente.
No se han compartido claves de Healing Minds ni XL Homes.

## Pendientes que requieren Jordan
1. Credencial OpenAI autorizada para probar generación, traducción e imágenes reales; los tres caminos siguen desactivados.
2. Autorización explícita para almacenar la conexión Google de agencia en variables cifradas de este proyecto Vercel. La revisión automática rechazó la transferencia concreta a Preview; no se ejecutó.
3. Revisión visual y autorización de paso a producción. La conexión nativa GCC ya verificó siteOwner para sc-domain:faithfulcaremedical.com, pero eso no prueba la conexión de la aplicación desplegada.

## No se considera terminado
La ejecución real de los proveedores, la revisión clínica de artículos reales, los envíos Google de producción y el lanzamiento final siguen pendientes. Un sitemap enviado no equivale a una URL indexada.
