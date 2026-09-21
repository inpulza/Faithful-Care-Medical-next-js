# Revisión del motor
Fecha: 2026-09-21. Comparación contra main 2041fc1e6fae826f381f741ee39b484804b9513d.

## Hallazgos válidos y resueltos
- El sitemap pasó a ser asíncrono: actualizados los contratos existentes que lo leían sin await.
- Las imágenes debían pertenecer al almacén del cliente y estar revisadas para esa pareja editorial: validación de entrada y bloqueo de publicación; prueba de intento de reutilización entre artículos ajenos.
- Las imágenes inline necesitaban insertarse en el cuerpo: renderizado tras la sección seleccionada, alt escapado y posiciones validadas.
- La vista previa iframe chocaba con X-Frame-Options: documento sandbox vía srcDoc; mantenidas las cabeceras globales.
- Las rutas clínicas del blog necesitaban frontera de navegación y títulos seguros: extendido el aislamiento existente, sin habilitar rastreadores para artículos.
- Las generaciones simultáneas del mismo tema podían eludir el chequeo inicial: índices únicos de operación activa y tema/idioma; prueba de concurrencia.
- El original de una traducción podía cambiar durante el guardado: bloqueo de fila y versión dentro de la transacción; rechazo probado.
- El listado móvil crecía hasta ocultar el editor: altura limitada y scroll propio.
- El menú del blog en páginas españolas apuntaba al archivo inglés: corregidos título y ruta.
- Vercel descarga marcadores [SENSITIVE]: no interpretarlos como credenciales/hostname reales en el servidor local de pruebas.

## Notas externas
Las consultas de PR11-16 deben repetirse tras el último push. Hasta la revisión de e969a7a no había revisiones de código; solo comentarios de despliegue Vercel. La ausencia de notas no equivale a una aprobación humana.

## Decisiones pendientes
Credencial/modelos IA, autorización específica de conexión Google en Vercel, revisión visual y lanzamiento. No se ocultan estos pendientes con un resultado de CI.
