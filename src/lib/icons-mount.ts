import { icon, type IconName } from '../components/icons';

/**
 * Inserta los iconos declarados en el HTML como `<span data-icon="search">`.
 * Mantener el marcado libre de SVG hace las páginas mucho más legibles y
 * permite cambiar el set de iconos en un solo archivo.
 */
export function mountIcons(root: ParentNode = document): void {
  for (const node of root.querySelectorAll<HTMLElement>('[data-icon]')) {
    const name = node.dataset.icon as IconName | undefined;
    if (!name) continue;
    const size = Number(node.dataset.iconSize ?? 18);
    node.innerHTML = icon(name, size);
  }
}
