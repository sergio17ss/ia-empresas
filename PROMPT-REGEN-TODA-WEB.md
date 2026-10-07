# PROMPT MAESTRO — Regenerar todos los artículos pendientes al estándar editorial (multiagente, fases 1-6)

## Cómo usar este prompt
Pégalo en `opencode run --model opencode/big-pickle --agent mains/seo-content-writer "<PROMPT>"` (o pega en la TUI de OpenCode).
OpenCode debe orquestar internamente SUS agentes por fase (usa el agente correcto para cada fase, no haga todo con uno solo).
Big-pickle funciona por CLI (verificado 2026-10-02).

## Objetivo
Llevar TODOS LOS ARTÍCULOS pendientes de iatodopyme.com al estándar editorial completo (mismo nivel
que `guias/cuanto-cuesta-implementar-ia/`: 5213 palabras, 21 H2,​8 FAQ,​10 tablas). Trabaja con tu
pipeline de agentes, fase por fase:(1) `mains/seo-serp-researcher` (SERP/keyword,​2) `mains/seo-search-intent-analyst`
(intención del usuario,​3) `mains/seo-semantic-researcher` (semántica/LSI,​4) `mains/seo-content-architect`
(arquitectura/H2,TOC,​5) `mains/seo-experience-evidence` (experiencia real/fuentes/E-E-A-T,​6) `mains/seo-content-writer`
(redacción final del HTML). Aplica TODAS las fases a cada artículo, UNO a uno, antes de pasar al siguiente.

## Estándar por artículo (obligatorio todo)
- **≥4500 palabras** de texto real en el `<article>` (contenido denso, no relleno).
- **≥15 secciones H2** jerarquizadas(H2+H3): intro para quién es, contexto del sector, criterios
  de selección, tabla comparativa (≥6 filas reales), cuadro de precios 2026 en € y USD, trampas/flaws reales,
  casos de uso, veredicto/implantación, FAQ. Cada H2 con `id` único y ancla TOC.

- **≥3 tablas `<table>`** HTML reales con `<th>`. **≥6 preguntas FAQ** VISIBLES en el artículo (H2/H3)
  Y replicadas en el JSON-LD `FAQPage` (`"@type":"FAQPage"` con `mainEntity` de `"Question"`/`"acceptedAnswer"`).
- **Ángulo de experto**: recomendación concreta y matizada(no neutral genérico), flaw oculto real específico
  (limitación/coste oculto de esa herramienta que no se comenta), precios verídicos 2026. Español natural,
  SIN afirmaciones falsas, SIN la palabra "domin", sin relleno ni enlaces rotos.

## Reglas de edición (CRÍTICO)
- Toca SOLO el bloque `<article>...</article>` y (si existe) el bloque `FAQPage` JSON-LD de cada archivo.

- Respeta INTACTOS:`<head>` (con GA4 `G-K73MPH7X53`), header, footer, nav, breadcrumb externo, canonical,
  links CSS (`../../css/style.css`). No renombres archivos/directorios ni slug. No toques nada fuera del repo.,
  no edites archivos que no están en la lista.
- Tras escribir CADA artículo: verifica balance de `<article>`/`<div>`/`<table>`, JSON-LD parseable, words ≥4500,
  H2≥15, y 0 residuos de agente(SIN "PENDIENTE:", SIN ANSI, SIN blockquotes de autoría. Borra los `.md` de briefs temporales al terminar.



## Lista de artículos pendientes (trabaja TODOS, UNO a uno)
### Comparativas
1. comparativas/chatgpt-vs-claude-vs-gemini/index.html — ChatGPT vs Claude vs Gemini para empresa
2. comparativas/ia-contabilidad-finanzas/index.html — IA para contabilidad y finanzas (incluye contexto Verifactu/Ley Crea y Crece
3. comparativas/software-ia-ventas/index.html — software IA para equipos de ventas
4. comparativas/ia-rrhh-reclutamiento/index.html — IA para RRHH y reclutamiento (AI Act/RGPD.org
5. comparativas/ia-para-marketing/index.html — IA para marketing digital y contenido
6. comparativas/ia-abogados/index.html — IA para despachos de abogados'
7. comparativas/ia-logistica/index.html — IA para logística y cadena de suministro'
8. comparativas/ia-agencias-marketing/index.html — IA para agencias de marketing'
9. comparativas/ia-consultoras/index.html — IA para consultoras y servicios profesionales'
10. comparativas/ia-educacion/index.html — IA para centros educativos y formación'
11. comparativas/ia-clinicas-consultorios/index.html — IA para clínicas y consultorios (médico/dental'
12. comparativas/ia-restaurantes/index.html — IA para restaurantes y hostelería'
13. comparativas/ia-ecommerce-ventas/index.html — IA para ecommerce y tiendas online'
14. comparativas/ia-contadores/index.html — IA para contadores (subir H2≥15; palabras ya ~4800'
15. comparativas/ia-dentistas/index.html — IA para clínicas dentales (subir H2≥15; palabras ya ~6400'
### Guías
16. guias/guia-implementar-ia-pyme/index.html — guía práctica de implementar IA en una pyme'
17. guias/prompt-engineering-empresas/index.html — prompt engineering para empresas (subir a ≥4500 y ≥15 H2'
18. guias/ia-ai-act-cumplimiento/index.html — cumplimiento IA Act (subir H2≥15; ya ~3600'
19. guias/crear-chatbot-ia-web/index.html — crear chatbot IA para web (subir a ≥4500,H2≥15'
20. guias/ahorro-pymes-ia/index.html — ahorro de costes con IA en pymes'
21. guias/informe-ia-espana-2026/index.html — informe IA España enumerala 2026''
22. guias/elegir-herramienta-ia-negocio/index.html — cómo elegir herramienta IA para tu negocio(,subir H2≥15'
23. guias/rag-ia-datos/index.html — RAG con datos de empresa (,H2≥14→15'
24. guias/roi-real-empresas-ia/index.html — ROI real de IA en empresas (,H2 a≥15'
25. guias/futuro-ia-empresarial/index.html — futuro IA empresarial (,H2 a≥15; ya ~3500'
### Herramientas-IA (ya regeneradas, solo subir si H2<15 o requisito pendiente)
26. herramientas-ia/jasper-ai/index.html — Jasper: regenerar al estándar completo (,742→≥4500',
27. herramientas-ia/intercom-fin/index.html — Intercom/IA para soporte (,~4000,TAB optimized',H2 a≥15'
### Nota
- `comparativas/herramientas-ia-gratuitas` YA regenerado y desplegado — NO tocar'.-
- Las páginas índice (`comparativas/`,`guias/`,`herramientas-ia/`, `index.html`) son thumbs/listados — NO tocar'.âsea



## Entrega final (cuando hayas procesado TODOS)
Reporta UNA tabla Markdown, una fila por artículo`: ruta | palabras | H2 | tablas | FAQ | estado (OK/revisar`.1


 NO desplegues nada ni lo toques fuera de estos archivos (la publicación la hace Hermes tras validación con seo-qa-gates. Queda entregado a Hermes para validación final antes de publicar'.