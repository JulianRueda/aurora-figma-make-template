# Aurora · Figma Make & Antigravity Template

Plantilla reutilizable con el **Sistema de Diseño Editorial-Trust y UX de Aurora** (React 19 + TypeScript + Vite + Tailwind CSS v4 + `lucide-react`), lista para importar en **Figma Make / Code Layers** o abrir en **Google Antigravity**.

## Qué incluye este repositorio

- `AGENTS.md`, `CLAUDE.md` y `guidelines/Guidelines.md` — Instrucciones automáticas para que el agente de Figma Make construya cualquier producto digital respetando tokens, tipografía (`Playfair Display` + `DM Sans`), responsive dual (`@media` + `@container aurora-preview`), autoguardado y Modo Evaluador UX/UI.
- `src/index.css` — Sistema de diseño CSS completo precargado (`--forest`, `--sun`, `--bg`, tarjetas, formularios, drawer lateral, skeleton e impresión `@media print`).
- `.figma/` — Configuración nativa para previsualización instantánea en Figma Make y Code Layers.
- `.agents/skills/aurora/` — Skill `/aurora` incluida en el repositorio para equipos que trabajen con Google Antigravity.

## Cómo usarla en Figma Make

1. Marca este repositorio como **Template repository** en GitHub (*Settings → General → Template repository*).
2. En **Figma Make** o **Code Layers**, elige **Import / Clone from GitHub** y selecciona este repositorio (o una copia creada desde el template).
3. En el chat de Figma Make escribe tu prompt con tres entradas:

```text
Crea una página para [Nombre del producto o marca]:

- Objetivo de negocio: [Qué conversión buscas lograr y qué fricción eliminas]
- Público objetivo: [Segmentos o perfiles de usuario]
- Proceso de alto nivel: [Etapas principales del flujo]
```
