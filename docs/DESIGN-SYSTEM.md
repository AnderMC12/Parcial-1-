# Design System — Explorer App

Fuente única: `src/styles/main.css`, bloque `@theme`. La guía viva navegable es
`design-system.html`.

## Color

| Token | Valor | Uso | Contraste |
|---|---|---|---|
| `--color-background` | `#edf7d2` | Fondo de página | — |
| `--color-surface` | `#edf7b5` | Tarjetas, campos, cabecera | — |
| `--color-surface-raised` | `#f6fbe0` | Hover de tarjeta, caja de bandera | — |
| `--color-accent` | `#c9c19f` | Píldoras y etiquetas | — |
| `--color-accent-strong` | `#b6ad86` | Hover de píldora | — |
| `--color-primary` | `#5b5b5b` | Botón principal, enlace de salto | 6.6:1 sobre blanco |
| `--color-text-primary` | `#5b5b5b` | Texto principal | 5.9:1 sobre `surface` |
| `--color-text-secondary` | `#5f5e5b` | Texto de apoyo | 5.7:1 sobre `surface` |
| `--color-on-accent` | `#3d3c3a` | Texto sobre `accent` | 6.1:1 |
| `--color-on-primary` | `#ffffff` | Texto sobre `primary` | 6.6:1 |
| `--color-border` | `#c6d199` | Divisores decorativos | — |
| `--color-border-strong` | `#7f8a5e` | Bordes de componentes interactivos | 3.3:1 sobre fondo |
| `--color-focus` | `#33691e` | Anillo de foco | 5.9:1 sobre fondo |
| `--color-disabled` | `#bdbdbd` | Fondo deshabilitado | — |

Tres valores cambian respecto al archivo de Figma; el motivo está en
`ACCESIBILIDAD.md` y son los únicos ajustes de paleta:
`text-secondary`, `on-accent` y `border-strong`.

## Tipografía

Familia única: **Inter** (400/500/600/700), con pila de respaldo del sistema.

| Token | Tamaño / interlineado | Peso | Uso |
|---|---|---|---|
| `text-title` | 28 / 36 | 700 | `<h1>` de cada página |
| `text-subtitle` | 18 / 24 | 600 | Marca y `<h2>` de sección |
| `text-card` | 15 / 20 | 500 | Nombre de país, títulos de bloque |
| `text-body` | 14 / 20 | 400 | Contenido y valores de la ficha |
| `text-label` | 13 / 18 | 500 | Etiquetas, metadatos, conteos |
| `text-button` | 15 / 20 | 600 | Botones |

## Espaciado

Escala de 4: `xs 4` · `sm 8` · `md 16` · `lg 24` · `xl 32` · `2xl 48`.
Se usa en padding, margin y `gap` (`p-md`, `gap-sm`, `mt-lg`).

## Radios y elevación

`radius-flag 8` · `radius-field 10` · `radius-card 12` · `radius-pill 999`.
`shadow-card` para reposo y `shadow-raised` para hover y para la bandera del detalle.

## Puntos de quiebre

`tablet: 768px` · `desktop: 1024px` · `wide: 1280px`.

## Componentes

| Clase | Origen en Figma | Notas |
|---|---|---|
| `.card` + `.card-link` | `Card` (26:31) | Enlace real; estados hover y active. |
| `.field` | `SearchField` (26:39), `RegionFilter` (26:42) | Altura 48 px, borde `border-strong`. |
| `.btn` `.btn-primary` `.btn-quiet` | `Button` (26:30) | Estados default / hover / active / disabled. |
| `.pill` | Píldoras de frontera (13:132…) | Altura mínima 44 px. |
| `.badge` | `accent-badge` (45:40, 45:41) | Etiqueta de dato. |
| `.stat-row` | `stat-*` (13:114…) | Fila `dt`/`dd` con divisor. |
| `.skip-link` | Nuevo | Requisito de accesibilidad. |
