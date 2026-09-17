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

## 3. La búsqueda es un formulario GET

Enviar el formulario navega a `resultados.html?q=…&region=…`. Con eso el prototipo
es navegable de verdad, cada resultado se puede compartir y el botón Atrás del
navegador funciona como espera el usuario.

## 4. Estados que el wireframe no cubría

- **Vacío:** "Sin coincidencias para X" + qué hacer + enlace de vuelta.
- **Error:** código de país desconocido en la URL.
- **Sin fronteras:** islas como Japón o Australia muestran "Sin fronteras terrestres"
  en lugar de una sección vacía.
- **Hover y active** en tarjetas, píldoras y botones.

## 5. Distintivo de país en lugar de rectángulos grises

El placeholder `#d9d9d9` y el mensaje "Bandera no disponible" se sustituyen por el
código ISO 3166-1 alpha-2 del país dentro de una caja con los tokens del sistema.

La primera versión usaba el emoji de bandera, pero Windows no incluye la fuente
correspondiente y el navegador acaba dibujando las letras indicadoras regionales en
crudo: el resultado cambiaba según el sistema operativo de quien abría el sitio. El
código de dos letras se ve idéntico en todas partes, no requiere red ni assets, y
mantiene el sitio completamente estático.

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
