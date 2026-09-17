# Revisión entre pares

Formato sugerido: 30 minutos, dos revisores, el autor no defiende — sólo toma nota.
Cada hallazgo se registra como *Bloqueante*, *Importante* o *Menor*.

## Guion (lo que se revisa, en este orden)

### 1. Wireframe y flujo (5 min)
- ¿Se puede completar la tarea principal —encontrar un país y ver su ficha— sin explicación previa?
- ¿El botón de volver lleva a donde el usuario espera?
- ¿Hay algún callejón sin salida (pantalla sin acción siguiente)?

### 2. Design System (5 min)
- Abrir `design-system.html`. ¿Algún color, tamaño o radio del sitio no aparece ahí?
- Buscar en el código valores en crudo: `grep -rn "#[0-9a-fA-F]\{6\}" src/ *.html` debería
  devolver resultados sólo dentro de `@theme` y de la guía de estilos.
- ¿Los nombres de token describen el uso (`surface`, `on-accent`) y no el valor (`verde-claro`)?

### 3. Componentes (5 min)
- ¿Cada componente tiene sus estados: reposo, hover, foco, activo, deshabilitado?
- ¿Se repite marcado que debería ser un componente?
- ¿Los componentes funcionan con texto largo (nombres de país de 20+ caracteres)?

### 4. Adaptabilidad (5 min)
Revisar en 360, 768, 1024 y 1440 px, y con zoom al 200 %:
- ¿Aparece scroll horizontal en algún punto?
- ¿Se rompe alguna rejilla o se solapa algún texto?
- ¿Los objetivos táctiles siguen siendo cómodos en móvil?

### 5. Accesibilidad (5 min)
- Recorrer una pantalla completa sólo con teclado.
- ¿El foco es visible siempre y el orden es lógico?
- Pasar Lighthouse y axe DevTools; anotar cualquier hallazgo por debajo de 100.

### 6. Handoff (5 min)
- ¿`HANDOFF.md` permite localizar en el código cualquier elemento del Figma?
- ¿Las diferencias respecto al diseño están justificadas por escrito?
- ¿Un compañero puede clonar, instalar y levantar el proyecto siguiendo sólo el README?

## Plantilla de registro

| # | Área | Hallazgo | Severidad | Acordado | Estado |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |

**Revisor 1:** ______________  **Revisor 2:** ______________  **Fecha:** __________
