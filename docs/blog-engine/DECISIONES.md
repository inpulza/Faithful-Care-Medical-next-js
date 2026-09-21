# Decisiones
- Mantengo Next.js/App Router del cliente. Adapto contratos de los motores existentes sin copiar su aplicación Express.
- Creo bases y almacenamiento aislados por entorno. No conecto la base Preview a producción.
- Mantengo las operaciones IA desactivadas hasta contar con credencial autorizada y validar el modelo/coste reales.
- Uso sitemap submit y URL Inspection. La Indexing API general no corresponde a estos artículos.
- La publicación es una acción del editor autenticado desde el dashboard y queda registrada. No requiere una confirmación clínica adicional.
- La puntuación de fuentes expresa identidad/autoridad/disponibilidad, no demuestra cada afirmación clínica.
- Las imágenes IA son candidatos nuevos, sin reutilizar imágenes generadas en rondas anteriores.
- El control Google usa la propiedad y dominio fijos del cliente. No acepta destinos arbitrarios.
- La revisión automática rechazó exportar el refresh token y client secret de agencia a Vercel Preview por faltar autorización específica del destino. Se mantiene bloqueado; no se sustituye con una transferencia indirecta.
- PRs encadenados, sin merge ni borrado de ramas remotas. La aprobación visual precede al lanzamiento.

- 2026-09-21, instrucción expresa de Jordan: se eliminan la confirmación del nombre de la doctora y la aprobación manual de fuentes. La acción Publish del usuario autenticado es suficiente cuando pasan las comprobaciones técnicas. Esta decisión sustituye los requisitos anteriores de confirmación clínica en la UI.
- XL Homes es la referencia principal para separar preview, edición y acciones de la fila; Healing Minds aporta la vista del artículo con el mismo contenido e imágenes del render público. Se mantienen los colores y botones de Faithful Care.
- Se soportan tablas accesibles y listas también en traducción. Los enlaces a artículos relacionados se seleccionan entre páginas publicadas del mismo idioma y categoría; nunca se enlazan borradores.
