# Estado del motor editorial
Actualizado: 2026-09-22. Lanzamiento autorizado por Jordan tras tres auditorías. PR20 consolida los sprints anteriores contra main; producción pendiente de verificación final.

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
La CI previa aprobó 137 pruebas. Las correcciones de los jueces añaden cobertura de cuotas, edición y traducción; su HEAD se verifica nuevamente antes del merge. E2E completo desktop/mobile pasa con carga real de hero e inline, selección, revisión, publicación local, canonical, sitemap, privacidad y retirada. Matriz visual: 390x844, 1024x768, 1440x900, 1920x1080, 3440x1440.
Las imágenes sólidas y textos repetidos de las pruebas son fixtures técnicos, no contenido aprobado.
PR20 contiene la revisión vigente del editor. Se verifican su SHA, CI y E2E antes de entregar el Preview; no se fusiona sin revisión visual.

## Infraestructura
Base Neon exclusiva Preview: store_Lw5RawlG6y0OQ228.
Blob exclusivo Preview: store_JnznGYac5bcOTMQb.
Login creado; credenciales en la carpeta 05. Pass/Blog Engine del cliente.
No se han compartido claves de Healing Minds ni XL Homes.

## Auditoría previa al lanzamiento, 22 septiembre 2026
Tres jueces independientes revisaron UI/UX, código/arquitectura/seguridad y SEO/GEO/AEO sobre el conjunto main...HEAD.
- UI: protección al salir con cambios sin guardar; aviso de artículos enlazados antes de retirar una publicación.
- Arquitectura: reserva atómica de las tres imágenes antes de gastar texto, sin aumentar cuota; admisión interrumpida falla cerrada; límite de cinco imágenes coherente con edición y traducción.
- SEO: URL estable después de la primera publicación y conservación de la fecha original al republicar.
- Accesibilidad: idioma español del preview y respeto a movimiento reducido.
La estructura actual es un monolito modular. Extraer puertos/adaptadores más estrictos es deuda no bloqueante, no una arquitectura hexagonal ya completada.

## Infraestructura de lanzamiento
Jordan autorizó crear Neon y Blob exclusivos para producción el 22 septiembre, separados de Preview.
Neon: store_2nuLxUFybOvoXHPG, proyecto lingering-scene-01334650.
Blob: store_O9MNqK9tSltNxbl6.
Ambos se conectan únicamente al entorno production del proyecto Faithful Care. No compartir recursos de otros clientes.

## Estado de integraciones
OpenAI se probó realmente en Preview: texto, traducción e imágenes; los artículos siguen privados. El despliegue necesita configurar y verificar las variables propias de producción.
Google continúa desactivado: la transferencia de la credencial de agencia requiere autorización específica y no está incluida en la autorización de los dos recursos de almacenamiento. El sitemap público y sus metadatos no dependen de esa credencial.
El lanzamiento del motor no autoriza publicar automáticamente los artículos de Preview. Producción comienza sin artículos publicados.
