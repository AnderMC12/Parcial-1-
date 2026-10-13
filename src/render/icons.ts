/**
 * Iconos de línea (trazo 2px, caja 24×24) equivalentes a los usados en el
 * wireframe de Figma. Son decorativos: siempre `aria-hidden` y acompañados de
 * texto visible o de una etiqueta accesible en el control que los contiene.
 *
 * Handoff: si el equipo de diseño exporta los SVG originales desde Figma,
 * basta con reemplazar los `path` de este archivo — ningún otro módulo cambia.
 */

export type IconName = 'search' | 'chevron-down' | 'x-circle' | 'arrow-left' | 'chevron-right';

const PATHS: Record<IconName, string> = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'x-circle': '<circle cx="12" cy="12" r="9"/><path d="m15 9-6 6M9 9l6 6"/>',
  'arrow-left': '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  'chevron-right': '<path d="m9 6 6 6-6 6"/>',
};

export function icon(name: IconName, size = 20, className = ''): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="${className}" aria-hidden="true" focusable="false">${PATHS[name]}</svg>`;
}
