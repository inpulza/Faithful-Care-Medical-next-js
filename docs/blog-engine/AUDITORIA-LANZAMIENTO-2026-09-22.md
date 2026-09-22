# Auditoría previa a producción

Jordan solicitó tres jueces independientes antes del despliegue. Revisaron el conjunto de los sprints PR11–20 contra main, no únicamente el cambio visual final. PR20 reúne el lanzamiento completo para evitar desplegar etapas parciales.

## Veredictos y correcciones
| Juez | Resultado | Correcciones verificadas |
|---|---|---|
| UI/UX | Favorable | Advertencia al salir, recargar o cerrar sesión con cambios; guardar/descartar libera salida; aviso de dependencias antes de retirar un artículo. |
| Código, arquitectura y seguridad | Favorable | Reserva atómica de cuota antes de gastar texto; concurrencia y admisión interrumpida; cinco imágenes coherentes con edición y traducción. |
| SEO/GEO/AEO | Favorable condicionado a integrar aviso de dependencias, ya integrado | Slug estable tras primera publicación; fecha original preservada al republicar; aviso de interlinks entrantes. |

Los jueces no encontraron P0/P1 ni bypass de autenticación, CSRF, XSS o SSRF en su revisión. Esto describe el alcance de la auditoría, no garantiza ausencia absoluta de fallos.

## Cobertura
Las nuevas pruebas reproducen la pérdida de edición y su cancelación, publicación/retirada local, límite de imágenes, carreras entre solicitudes manuales y automáticas, reintentos con la misma clave, interrupción de admisión, edición posterior a publicación y conservación de fecha. La prueba de navegador usa cinco tamaños: 390×844, 1024×768, 1440×900, 1920×1080 y 3440×1440. Los proveedores externos se simulan en los tests de concurrencia.
Se corrigieron además el idioma declarado del preview español y el respeto a movimiento reducido. La verificación de la versión final en Preview y producción se registra separadamente con SHA y resultados reales.

## Arquitectura y límites
El sistema es un monolito modular con separación parcial de adaptadores, no arquitectura hexagonal estricta. Extraer puertos explícitos y descomprimir módulos para facilitar lectura son mejoras P3, no bloqueantes del lanzamiento.
El catálogo de fuentes puede ampliarse de forma controlada. La extensión de artículos es una decisión editorial, no una regla de Google. La estructura clara, fuentes, enlaces y texto accesible ayudan a comprender el contenido, sin garantizar posicionamiento ni citas de IA. Referencia: https://developers.google.com/search/docs/appearance/ai-features

## Condiciones operativas
- Neon y Blob de producción separados de Preview, autorizados expresamente el 22 septiembre.
- Credenciales exclusivamente en variables protegidas y carpeta 05. Pass, nunca en código ni este informe.
- Aplicar las seis migraciones existentes en la base nueva; las correcciones de los jueces no añaden migraciones.
- Google permanece desactivado mientras no se autorice la transferencia de la conexión de agencia.
- Publicar el motor no publica los borradores de Preview. La prueba del panel en producción conserva artículos privados.
- CI/E2E correctos, clasificación de notas de Code Review y SHA del Preview antes de fusionar. Conservar ramas remotas y verificar el dominio final después.
