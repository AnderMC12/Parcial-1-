# Handoff — Figma ⇄ Código

## 1. Origen

| Recurso | Ubicación |
|---|---|
| Archivo Figma | `WireFrame` · `ShSMYUKkpsRwDY8dRO8sR1` |
| Página *Pantallas* | `01-Home` (13:7) · `02-Resultados` (13:55) · `03-Detalle del país` (13:98) |
| Página *Design System* | Button 26:30 · Card 26:31 · Header 26:37 · SearchField 26:39 · RegionFilter 26:42 · BackButton 26:45 |

## 2. Trazabilidad

| Nodo Figma | Archivo del repositorio |
|---|---|
| Variables de color, spacing y text styles | `src/styles/main.css` → `@theme` |
| `Card` 26:31 | `src/components/countryCard.ts` + `.card` / `.card-link` |
| `SearchField` 26:39 / `RegionFilter` 26:42 | `.field` (clase compartida) |
| `Button` 26:30 (4 estados) | `.btn`, `.btn-primary`, `.btn-quiet`, `[aria-disabled]` |
| `accent-badge` 45:40 / 45:41 | `.badge` |
| `pill-*` 13:132…13:140 | `.pill` |
| `stat-*` 13:114…13:128 | `.stat-row` + `<dl>` en `detalle.html` |
| `01-Home` 13:7 | `index.html` + `src/pages/home.ts` |
| `02-Resultados` 13:55 | `resultados.html` + `src/pages/results.ts` |
| `03-Detalle del país` 13:98 | `detalle.html` + `src/pages/detail.ts` |

## 3. Diferencias deliberadas respecto al archivo de Figma

Documentadas en `MEJORAS-UX.md` y `ACCESIBILIDAD.md`. En resumen:
barra de estado iOS eliminada, desplegable sustituido por `<select>` nativo,
banderas reales en lugar de placeholder, tres colores oscurecidos por contraste,
y estados vacío/error añadidos.

## 4. Iconos

Los iconos (`search`, `chevron-down`, `x-circle`, `arrow-left`, `chevron-right`) están
dibujados como trazo de 2 px en caja de 24×24 dentro de `src/components/icons.ts`, que
es la geometría del set usado en el wireframe. Si diseño exporta los SVG originales
desde Figma, se reemplazan los `path` de ese archivo y nada más cambia.

## 5. Imágenes de referencia y capturas

Las exportaciones de los frames de Figma viven en `references/` y las capturas del
sitio en ejecución en `Responsively-Screenshots/`. Cada carpeta tiene su propio
`README.md` con la lista exacta de archivos y anchos esperados.

## 6. Checklist de entrega

- [ ] `npm run build` termina sin errores ni avisos de TypeScript.
- [ ] Las cuatro páginas se ven correctamente a 360, 768, 1024 y 1440 px.
- [ ] Las imágenes de Figma están en `references/` y las capturas en `Responsively-Screenshots/`.
- [ ] El repositorio está en GitHub y GitHub Pages sirve el sitio.
- [ ] Revisión entre pares completada (`REVISION-PARES.md`).
