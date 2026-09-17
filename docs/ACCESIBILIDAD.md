# Accesibilidad — WCAG 2.1 nivel AA

## Ajustes de paleta respecto al wireframe

| Elemento | Antes (Figma) | Ahora | Motivo |
|---|---|---|---|
| Texto secundario | `#7d7c7a` sobre `#edf7b5` → **3.5:1** | `#5f5e5b` → **5.7:1** | 1.4.3 Contraste mínimo (4.5:1). |
| Texto sobre `accent` | `#4f4e4c` → 4.7:1 | `#3d3c3a` → **6.1:1** | Margen sobre el mínimo. |
| Borde de componentes | `#e0e0e0` → **1.2:1** | `#7f8a5e` → **3.3:1** | 1.4.11 Contraste de elementos no textuales. |

La identidad verde-oliva del diseño se mantiene intacta: sólo se oscurecen tres
valores dentro de la misma familia cromática.

## Estructura y semántica

- `lang="es"` en cada documento y `<title>` único por página.
- Regiones: `header` / `nav` / `main` / `footer`, con `aria-label` en cada `nav`.
- Un solo `<h1>` por página y jerarquía `h1 → h2 → h3` sin saltos.
- La ficha del país usa `<dl>`/`<dt>`/`<dd>`: la relación dato–valor se anuncia.
- Las listas de países son `<ul>`/`<li>`, así el lector anuncia "lista de N elementos".

## Teclado

- `.skip-link` es el primer elemento tabulable de cada página.
- Foco visible global: contorno de 3 px en `--color-focus` con `outline-offset: 2px`,
  definido con `:focus-visible` para no molestar al usuario de ratón.
- Ningún `tabindex` positivo; el orden de tabulación es el del documento.
- Las tarjetas son `<a>` y los controles son `<button>`/`<input>`/`<select>` nativos:
  se activan con Enter y Espacio sin JavaScript adicional.

## Formularios

- Cada control tiene `<label>` asociado (visualmente oculto con `sr-only`).
- `role="search"` en el formulario y `type="search"` en el campo.
- El botón de borrar tiene texto accesible ("Borrar la búsqueda") y aparece sólo
  cuando hay algo que borrar.
- El filtro de región es un `<select>` nativo en lugar del desplegable simulado del
  wireframe: teclado, lector de pantalla y selector nativo de móvil funcionan solos.

## Contenido dinámico

- El conteo de resultados vive en `role="status"` con `aria-live="polite"`: al
  cambiar la búsqueda se anuncia "3 resultados encontrados".
- Estado vacío con causa y salida: qué se buscó, qué revisar y un enlace de vuelta.
- Estado de error (código de país inexistente en la URL) con su propio mensaje.

## Objetivos táctiles y movimiento

- Botones, píldoras y filas de tarjeta tienen al menos 44 × 44 px (2.5.5).
- Las banderas son emoji con `aria-hidden`; el nombre del país ya está en el texto,
  así que no se duplica información.
- `@media (prefers-reduced-motion: reduce)` desactiva transiciones y scroll suave (2.3.3).

## Cómo verificarlo

1. Navega las tres pantallas usando sólo `Tab`, `Shift+Tab` y `Enter`.
2. Zoom del navegador al 200 % en 1280 px: no debe aparecer scroll horizontal (1.4.10).
3. Lighthouse → Accessibility, y la extensión axe DevTools sobre las cuatro páginas.
4. Lector de pantalla: NVDA en Windows o VoiceOver en macOS/iOS.
