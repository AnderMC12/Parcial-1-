# Explorer App — Vanilla TypeScript

Aplicación web que obtiene información de países desde una API, la muestra en
tarjetas y permite buscarla y filtrarla en el navegador. Construida con **Vite,
TypeScript y Tailwind CSS v4**, sin framework de interfaz.

- **Versión evaluada:** etiqueta [`entrega-lab-3`](https://github.com/AnderMC12/Parcial-1-/releases/tag/entrega-lab-3)
  · [ver el código en esa etiqueta](https://github.com/AnderMC12/Parcial-1-/tree/entrega-lab-3)
- **Producción (Vercel):** <https://explorer-app-anderson-u20240406.vercel.app>
- **Espejo (GitHub Pages):** <https://andermc12.github.io/Parcial-1-/>
- **Diseño original (Figma):** <https://www.figma.com/design/ShSMYUKkpsRwDY8dRO8sR1/WireFrame>

---

## 1. Qué hace

- Carga el listado de países con una petición tipada y lo guarda en memoria.
- Muestra cada país en una tarjeta con bandera, nombre, población, región y capital.
- Permite buscar por nombre, sin distinguir mayúsculas ni acentos.
- Permite filtrar por región. Búsqueda y región se aplican de forma combinada.
- Aplica un retardo de 300 ms a la búsqueda por texto; el selector de región
  responde de inmediato.
- Comunica tres estados distintos: cargando, sin coincidencias y error al
  obtener los datos.
- Cada tarjeta enlaza a una ficha con los datos completos del país y sus
  fronteras.

## 2. Requisitos y ejecución

Node.js 20 o superior.

```bash
git clone https://github.com/AnderMC12/Parcial-1-.git
cd Parcial-1-
git checkout entrega-lab-3     # versión evaluada
npm install
npm run dev                    # http://localhost:5173
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente. |
| `npm run build` | Verifica los tipos y genera el sitio en `dist/`. |
| `npm run preview` | Sirve `dist/` para revisarlo antes de publicar. |
| `npm run typecheck` | Solo la verificación de tipos. |

## 3. Organización del código

```
src/
├── types/        Interfaces. Qué forma tienen los datos.
│   ├── country.ts          Country, Region y CountryFilters: el modelo del dominio.
│   └── rest-countries.ts   RawCountry: la forma que devuelve la API, sin normalizar.
├── api/          Obtención de datos y manejo de errores.
│   └── countries.ts        fetchCountries(): Promise<Country[]>, validación y CountriesError.
├── utils/        Funciones reutilizables, sin DOM.
│   ├── format.ts           Población, normalización de texto, valores ausentes, escapado.
│   ├── filter.ts           Búsqueda y región combinadas; regiones disponibles.
│   └── debounce.ts         Retardo genérico con cancelación.
├── render/       Generación de marcado y estados visuales.
│   ├── card.ts             Tarjeta de país.
│   ├── list.ts             Rejilla, contador y opciones del selector.
│   ├── states.ts           Carga (esqueleto), vacío y error.
│   ├── icons.ts            Iconos de línea.
│   └── icons-mount.ts      Inserta los iconos declarados en el HTML.
├── styles/
│   └── main.css            Design Tokens con @theme y capa de componentes.
├── main.ts       Coordina la pantalla principal: carga, eventos y actualización.
└── detail.ts     Coordina la ficha de detalle.
```

La dirección de las dependencias es siempre la misma: `main.ts` conoce a `api`,
`utils` y `render`; `render` conoce a `types` y `utils`; `api` conoce a `types`.
Ningún módulo de `utils` o `render` importa a `main.ts`, y ninguna función se
define en dos sitios.

**Por qué dos interfaces para lo mismo.** `RawCountry` describe lo que llega de
la API, con casi todos los campos opcionales porque la fuente omite claves
enteras en territorios sin capital, idiomas o moneda. `Country` describe lo que
la interfaz necesita: estructura plana y sin valores nulos. La traducción entre
ambas ocurre en un único punto, `toCountry`, así que un cambio en la API se
resuelve ahí y no se propaga a las tarjetas.

**Validación en tiempo de ejecución.** Una anotación de tipo orienta al
compilador pero no comprueba el JSON recibido: `as Country[]` solo silenciaría
el error. Por eso `api/countries.ts` incluye el guardia `isRawCountry`, que
descarta cualquier elemento sin código ni nombre antes de mapearlo. No se usa
`any` en ninguna parte del proyecto.

## 4. Fuente de datos

La aplicación lee un archivo JSON servido junto con el sitio:
`public/countries.json`, que Vite publica en la raíz. Son 250 países y pesa
110 kB.

**Por qué un archivo y no la API en vivo.** REST Countries retiró las versiones
v1 a v4 de su API. El endpoint `https://restcountries.com/v3.1/all` ya no
devuelve países, sino un error de versión obsoleta; y como esa respuesta llega
sin cabeceras CORS, el navegador la reporta como fallo de CORS. La versión v5
sigue disponible, pero exige una clave de acceso que en un sitio estático
quedaría expuesta en el código público del repositorio.

El enunciado del laboratorio contempla este caso. Se conserva la petición
mediante `fetch`, el tipado y el manejo de errores: lo único que cambia es la
URL de la que se leen los datos, porque `fetch` sirve igual un archivo estático
que un endpoint remoto.

**Cómo se construyó el archivo.** Los datos de países proceden de
[mledoze/countries](https://github.com/mledoze/countries), que es el conjunto
que alimenta a REST Countries; la población viene del
[dataset de población del Banco Mundial](https://github.com/datasets/population),
unida por el código ISO 3166-1 alpha-3; y las banderas se referencian desde
[flagcdn.com](https://flagcdn.com). La estructura del archivo reproduce la de
REST Countries v3.1, de modo que la interfaz `RawCountry` y la función
`toCountry` siguen siendo válidas sin cambios.

Treinta y cinco territorios pequeños —Antártida, las Islas Cook, Åland y
similares— no tienen población registrada. Se muestran con «No disponible» en
lugar de un hueco, que es precisamente el tratamiento de datos ausentes que pide
el enunciado.

**Cómo cambiar de fuente.** Una sola línea en `src/api/countries.ts`:

```ts
export const DATA_SOURCE = './countries.json';
```

Para usar el archivo facilitado por la docente, se sustituye
`public/countries.json` por el suyo. Para volver a una API remota, se pone aquí
su URL absoluta, por ejemplo
`https://api.restcountries.com/v5/countries?api-key=TU_CLAVE`. Si la nueva
fuente tiene otra estructura, se ajustan `RawCountry` y `toCountry`; el resto
del proyecto no se toca.

### Manejo de errores

`fetchCountries` lanza siempre un `CountriesError` con el motivo clasificado:

| `kind` | Cuándo ocurre | Qué ve la persona usuaria |
|---|---|---|
| `red` | `fetch` falla o se agota el tiempo de espera de 10 s. | Mensaje de conexión y botón de reintentar. |
| `respuesta` | El servidor responde con un código distinto de 2xx. | Mensaje con el código recibido. |
| `formato` | El cuerpo no es JSON, no es una lista o no contiene países válidos. | Aviso de respuesta inesperada. |

## 5. Búsqueda, filtro y debounce

Ambos filtros son independientes y una cadena vacía significa «sin filtro». De
ahí sale el comportamiento pedido sin necesidad de lógica adicional: al limpiar
el texto se conserva la región activa, y al elegir «Todas las regiones» se
conserva el texto escrito. El filtrado se aplica siempre sobre la lista ya
cargada en memoria; nunca vuelve a consultar la red.

El campo de texto pasa por `debounce(update, 300)`. Cada pulsación cancela la
actualización pendiente y reinicia la espera, de modo que la lista se recalcula
una sola vez cuando la persona deja de escribir. El selector de región llama a
`update()` directamente, porque un cambio de selección es una decisión única.

## 6. Estados de la interfaz

| Estado | Cómo se ve | Cómo comprobarlo |
|---|---|---|
| Carga | Seis tarjetas de esqueleto con animación. | Recargar la página; se ve mientras llega la respuesta. |
| Vacío | Tarjeta con el término buscado y un botón para limpiar filtros. | Buscar un texto que no exista, por ejemplo `zzzz`. |
| Error | Tarjeta con el motivo del fallo y un botón para reintentar. | Activar el modo sin conexión en las herramientas del navegador y recargar. |

Vacío y error se distinguen a propósito: una búsqueda sin coincidencias no es un
fallo del sistema, y confundirlas haría creer que la aplicación está rota.

## 7. Accesibilidad y diseño adaptable

La interfaz mantiene los Design Tokens definidos en `@theme`: color, tipografía,
espaciado, radios y puntos de quiebre con nombre semántico (`tablet:`,
`desktop:`). El detalle está en [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md)
y la guía viva navegable en `design-system.html`.

| Punto de quiebre | Rejilla |
|---|---|
| Mobile `<768px` | Una columna. |
| Tablet `≥768px` | Dos columnas; buscador y filtro en una fila. |
| Desktop `≥1024px` | Tres columnas. |

El conteo de resultados vive en una región viva, de modo que un lector de
pantalla anuncia los cambios de estado y el número de coincidencias. Las
decisiones de accesibilidad están documentadas en
[`docs/ACCESIBILIDAD.md`](docs/ACCESIBILIDAD.md).

## 8. Convención de commits

A partir de la sesión correspondiente, los cambios siguen
[Conventional Commits](https://www.conventionalcommits.org/es/): `feat:` para
funcionalidad nueva, `fix:` para correcciones, `refactor:` para reestructurar
sin cambiar el comportamiento y `docs:` para documentación. Los commits
anteriores a esa sesión se conservan tal como estaban.

## 9. Flujo de trabajo

El repositorio sigue GitHub Flow. La rama `main` está protegida y exige un Pull
Request para integrar cualquier cambio. Cada rama genera una URL de vista previa
en Vercel, y la integración en `main` despliega a producción automáticamente.

| Mejora | Pull Request |
|---|---|
| Evitar desbordamiento horizontal con búsquedas de una palabra larga | [#1](https://github.com/AnderMC12/Parcial-1-/pull/1) |
| Enlaces de despliegue, captura y flujo de trabajo en el README | [#2](https://github.com/AnderMC12/Parcial-1-/pull/2) |

## 10. Documentación del proyecto

- [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) — tokens, escala tipográfica y componentes.
- [`docs/ACCESIBILIDAD.md`](docs/ACCESIBILIDAD.md) — decisiones WCAG 2.1 AA y ratios de contraste.
- [`docs/HANDOFF.md`](docs/HANDOFF.md) — trazabilidad entre Figma y el código.
- [`docs/MEJORAS-UX.md`](docs/MEJORAS-UX.md) — diferencias respecto al wireframe y su motivo.
- [`docs/REVISION-PARES.md`](docs/REVISION-PARES.md) — guion de revisión entre pares.
- `references/` — frames exportados de Figma.
- `Responsively-Screenshots/` — capturas del sitio en los tres tamaños.
