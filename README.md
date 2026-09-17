# Explorer App — Interfaz web estática

Implementación en **Vite + TypeScript + Tailwind CSS v4** del wireframe *Explorer App*
diseñado en Figma para la asignatura **Diseño Web Adaptable** (UNIVO).

- **Sitio publicado:** <https://andermc12.github.io/Parcial-1-/>
- **Figma:** <https://www.figma.com/design/ShSMYUKkpsRwDY8dRO8sR1/WireFrame>
- **Alcance:** interfaz estática. No hay backend ni consumo de API; los datos viven
  en `src/data/countries.ts` y se empaquetan en tiempo de build.
- **Adaptable a:** Mobile (≥360 px), Tablet (≥768 px) y Desktop (≥1024 px).

---

## 1. Puesta en marcha

```bash
npm install
npm run dev        # servidor de desarrollo en http://localhost:5173
npm run build      # typecheck + build de producción en dist/
npm run preview    # sirve dist/ para revisarlo antes de publicar
```

Requisitos: Node.js 20 o superior.

## 2. Páginas

| Archivo | Pantalla de Figma | Descripción |
|---|---|---|
| `index.html` | `01-Home` | Búsqueda, filtro por región y países recomendados. |
| `resultados.html` | `02-Resultados` | Lista filtrada con conteo y estado vacío. |
| `detalle.html` | `03-Detalle del país` | Ficha del país y países fronterizos. |
| `design-system.html` | Página *Design System* | Guía viva de tokens y componentes. |

El prototipo es navegable de extremo a extremo con enlaces reales:

```
index.html  ──(formulario GET)──▶  resultados.html?q=…&region=…
            └─(tarjeta)────────▶  detalle.html?code=ARG
resultados.html ─(tarjeta)─────▶  detalle.html?code=ARG
detalle.html ─(píldora frontera)▶ detalle.html?code=CHL
```

Todo el estado viaja por la URL, así que cualquier vista se puede compartir,
marcar como favorita y recargar sin perder el contexto.

## 3. Estructura del repositorio

```
Parcial-1-/
├── index.html                  ← 01-Home
├── resultados.html             ← 02-Resultados
├── detalle.html                ← 03-Detalle del país
├── design-system.html          ← guía viva de tokens y componentes
├── package.json                ← dependencias y scripts
├── package-lock.json           ← versiones exactas (no editar a mano)
├── tsconfig.json               ← configuración de TypeScript
├── vite.config.ts              ← build multipágina
├── src/
│   ├── styles/main.css         ← Design Tokens en @theme + capa de componentes
│   ├── data/countries.ts       ← única fuente de datos (estática)
│   ├── components/             ← countryCard.ts · icons.ts
│   ├── lib/                    ← dom.ts · icons-mount.ts
│   └── pages/                  ← home.ts · results.ts · detail.ts · design-system.ts
├── public/                     ← archivos servidos tal cual (favicon.svg)
├── dist/                       ← sitio compilado, listo para abrir o publicar
├── references/                 ← imágenes de los frames de Figma
├── Responsively-Screenshots/   ← capturas del sitio en los tres tamaños
├── docs/                       ← documentación del proyecto
└── .github/workflows/          ← publicación automática en GitHub Pages
```

Cada archivo de `src/` está en su carpeta por responsabilidad: los estilos y
tokens, los datos, los componentes reutilizables, los ayudantes y el punto de
entrada de cada página. Las rutas de importación dependen de esta estructura,
así que mover un archivo rompe la compilación.

## 4. Design Tokens

Todos los tokens se declaran una sola vez con `@theme` en `src/styles/main.css`.
Tailwind v4 genera las utilidades automáticamente a partir del nombre de la variable:

```css
@theme {
  --color-surface: #edf7b5;   /* → bg-surface, text-surface, border-surface */
  --spacing-md: 16px;         /* → p-md, gap-md, mt-md */
  --radius-card: 12px;        /* → rounded-card */
  --text-title: 28px;         /* → text-title (con line-height y weight) */
  --breakpoint-tablet: 768px; /* → tablet:grid-cols-2 */
}
```

No hay un solo color en crudo dentro del marcado: cambiar un token cambia el sitio
completo. El detalle está en [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) y la
guía viva en `design-system.html`.

## 5. Comportamiento adaptable

| Punto de quiebre | Utilidad | Layout |
|---|---|---|
| Mobile `<768px` | base | Una columna. Buscador y filtro apilados. Lista vertical. |
| Tablet `≥768px` | `tablet:` | Buscador + filtro + botón en una fila. Rejilla de 2 columnas. |
| Desktop `≥1024px` | `desktop:` | Rejilla de 3 columnas, rail lateral de regiones, detalle a dos columnas. |

Mobile first: las clases sin prefijo son las de móvil y cada prefijo sólo añade
lo que cambia.

## 6. Publicación en GitHub

```bash
git init
git add .
git commit -m "feat: interfaz web estática de Explorer App"
git branch -M main
git remote add origin https://github.com/<usuario>/explorer-app-web.git
git push -u origin main
```

El repositorio incluye `.github/workflows/deploy.yml`: al hacer push a `main`
compila el sitio y lo publica en GitHub Pages. Actívalo en
**Settings → Pages → Source: GitHub Actions**.

## 7. Imágenes de referencia y capturas

- `references/` — exportaciones PNG de los frames de Figma para Mobile, Tablet y
  Desktop. El listado de archivos está en [`references/README.md`](references/README.md).
- `Responsively-Screenshots/` — capturas del sitio en ejecución a los mismos tres
  anchos, para comparar diseño e implementación. Ver
  [`Responsively-Screenshots/README.md`](Responsively-Screenshots/README.md).

## 8. Documentación del proyecto

- [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) — tokens, escala tipográfica y componentes.
- [`docs/ACCESIBILIDAD.md`](docs/ACCESIBILIDAD.md) — decisiones WCAG 2.1 AA y ratios de contraste.
- [`docs/HANDOFF.md`](docs/HANDOFF.md) — trazabilidad Figma ⇄ código y notas de entrega.
- [`docs/REVISION-PARES.md`](docs/REVISION-PARES.md) — guion y formato de revisión entre pares.
- [`docs/MEJORAS-UX.md`](docs/MEJORAS-UX.md) — qué cambió respecto al wireframe y por qué.
