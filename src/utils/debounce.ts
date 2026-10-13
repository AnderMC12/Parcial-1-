/**
 * Retrasa la ejecución de `fn` hasta que pasen `delay` milisegundos sin nuevas
 * llamadas. Cada llamada cancela la pendiente y reinicia la espera.
 *
 * Se usa en el campo de búsqueda: sin esto la lista se recalcularía en cada
 * pulsación de tecla. El selector de región no lo usa, porque un cambio de
 * selección es una decisión única y debe reflejarse de inmediato.
 */
export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  delay: number,
): ((...args: A) => void) & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debounced = (...args: A): void => {
    if (timer !== undefined) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      fn(...args);
    }, delay);
  };

  debounced.cancel = (): void => {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  };

  return debounced;
}

/** Espera aplicada a la búsqueda por texto, en milisegundos. */
export const SEARCH_DEBOUNCE_MS = 300;
