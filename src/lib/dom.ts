/** Helpers mínimos compartidos por las páginas. */

export function $<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T | null {
  return root.querySelector<T>(selector);
}

export function param(name: string, fallback = ''): string {
  return new URLSearchParams(window.location.search).get(name) ?? fallback;
}

/** Escapa texto que proviene de la URL antes de inyectarlo en el DOM. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Sincroniza el botón "limpiar" del campo de búsqueda: sólo existe cuando hay
 * texto, para no ofrecer un control sin efecto.
 */
export function wireSearchField(form: HTMLFormElement): void {
  const input = form.querySelector<HTMLInputElement>('input[type="search"]');
  const clear = form.querySelector<HTMLButtonElement>('[data-clear]');
  if (!input || !clear) return;

  const sync = (): void => {
    clear.hidden = input.value.trim().length === 0;
  };

  clear.addEventListener('click', () => {
    input.value = '';
    sync();
    input.focus();
  });

  input.addEventListener('input', sync);
  sync();
}
