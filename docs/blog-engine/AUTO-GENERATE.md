# Auto Generate: corrección del alcance
Fecha: 2026-09-21.

## Diferencia encontrada
El Preview de PR16 aporta CMS, generación puntual, traducción puntual e imágenes puntuales. No equivale al motor Auto Generate de las referencias. Los ocho temas fijos y el mensaje genérico de espera no cumplen el contrato de selección inteligente y progreso real.

## Fuente canónica
OneDrive: 00 Inpulza/Desarrolllos/inpulza-seo-blog-engine/docs/METHODOLOGY.md y XL_HOMES_OPERATIONAL_PORTING_BRIEF.md.
Implementaciones consultadas: XL-Home/server/blog/routes.ts y Healing-Minds-web-Next/server/blog/admin-routes.ts, generation/storage.ts y client/src/pages/admin/BlogAdminPage.tsx.

## Sprints correctivos
1. Inteligencia editorial: candidatos IA, diversidad, comparación determinista y juez semántico, fuentes institucionales verificadas, brief con evidencia, escritura, expansión, limpieza y SEO con reparación acotada.
2. Imágenes contextuales: plan hero/inline, prompts relacionados con secciones reales, alt text asistido por visión y colocación como candidatos pendientes de revisión.
3. Auto Generate visible: una acción, progreso real persistido y SSE, recuperación tras recarga, checkpoints por etapa, EN/ES, verificación final y enlaces al borrador. No publicar automáticamente.

## Criterios de aceptación
- El botón Auto Generate aparece al entrar al administrador, antes del formulario manual.
- Una corrida prepara tema, investigación, H1/cuerpo, slug, extracto, meta title, meta description, tags, hero, dos imágenes interiores y alt text; traducción al otro idioma seleccionada por defecto.
- El progreso muestra estados y resultados reales del servidor, nunca porcentajes inventados.
- Una recarga o petición repetida no duplica artículos ni cobros. Una etapa con resultado incierto se detiene para inspección.
- Las imágenes y fuentes mantienen su revisión, y ambos idiomas requieren revisión clínica antes de publicar.
- Probar comportamiento de servidor, navegador móvil/escritorio y cinco tamaños; verificar Preview y SHA. Prueba con IA real pendiente de clave autorizada, no sustituible por mocks.

## Estado
Sprint 1 en desarrollo. La ausencia de clave OpenAI impide certificar calidad de artículos, imágenes y traducción reales. El acceso y las pruebas del CMS no prueban el motor completo.
