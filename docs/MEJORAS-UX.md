# Mejoras de UX sobre el wireframe

Cada cambio conserva la estructura y la identidad visual de la propuesta original.

## 1. Se retira el cromo de teléfono

El wireframe simula un iPhone: barra de estado iOS (9:41, señal, wifi, batería),
marco negro redondeado e indicador de home. Son útiles para presentar una maqueta,
pero en una web real ocupan espacio, no son interactivos y confunden a un lector de
pantalla. Se sustituyen por una cabecera web con la marca y la navegación, que además
da un ancla fija en tablet y desktop.

## 2. El desplegable simulado pasa a ser un `<select>` nativo

"Región: Todos ⌄" era un rectángulo con un icono. Ahora es un control real: se abre
con teclado, usa el selector nativo en móvil y su valor viaja en la URL.

## 3. La búsqueda filtra en vivo sobre los datos cargados

La primera versión navegaba a una página de resultados aparte. Al incorporar el
consumo de la API, el listado y la búsqueda viven en la misma pantalla: los datos se
piden una sola vez y los filtros se aplican en memoria, con un retardo de 300 ms en
el campo de texto. Se evita así una recarga completa por cada búsqueda.

## 4. Estados que el wireframe no cubría

- **Vacío:** "Sin coincidencias para X" + qué hacer + enlace de vuelta.
- **Error:** código de país desconocido en la URL.
- **Sin fronteras:** islas como Japón o Australia muestran "Sin fronteras terrestres"
  en lugar de una sección vacía.
- **Hover y active** en tarjetas, píldoras y botones.

## 5. Banderas reales desde la fuente de datos

El placeholder `#d9d9d9` y el mensaje "Bandera no disponible" se sustituyen por la
imagen de la bandera que entrega la API.

Hubo un paso intermedio que conviene registrar. Una versión anterior usaba el emoji
de bandera, pero Windows no incluye la fuente correspondiente y el navegador acababa
dibujando las letras indicadoras regionales en crudo: el resultado cambiaba según el
sistema operativo. Al pasar a consumir la API, las banderas llegan como imágenes SVG
y el problema desaparece en todas las plataformas. Si un país no trae imagen, la
tarjeta muestra una caja con la leyenda correspondiente en lugar de un hueco.

## 6. Jerarquía de lectura en el detalle

El wireframe pone el nombre del país debajo de una imagen de 239 px de alto. En la
implementación el `<h1>` sigue debajo de la bandera en móvil, pero en desktop la ficha
se reparte en dos columnas: bandera y nombre a la izquierda, datos y fronteras a la
derecha. Se evita así una columna de 1120 px de ancho con filas de dos palabras.

## 7. Copia revisada

"Buscar país…" se mantiene, pero los títulos pasan a voz activa y frase concreta:
"Busca un país", "Resultados para «Argent»", "Sin coincidencias para «xyz»".

## 8. Contraste

Tres valores de color se oscurecen para cumplir AA. El detalle está en `ACCESIBILIDAD.md`.
