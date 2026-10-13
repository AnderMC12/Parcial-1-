import { escapeHtml } from '../utils/format';

/**
 * Estados de la interfaz.
 *
 * Los tres son visualmente distintos a propósito: una búsqueda sin
 * coincidencias no es un fallo del sistema, y confundirlas haría que la
 * persona usuaria creyera que la aplicación está rota cuando solo escribió mal
 * un nombre.
 */

/** Carga: esqueleto con la misma forma que las tarjetas reales. */
export function loadingState(count = 6): string {
  const card = `
    <li aria-hidden="true">
      <div class="flex h-full animate-pulse flex-col gap-sm rounded-card border border-border bg-surface p-[12px]">
        <div class="aspect-[3/2] w-full rounded-flag bg-surface-raised"></div>
        <div class="h-4 w-2/3 rounded-flag bg-surface-raised"></div>
        <div class="mt-auto grid gap-xs">
          <div class="h-3 w-full rounded-flag bg-surface-raised"></div>
          <div class="h-3 w-5/6 rounded-flag bg-surface-raised"></div>
          <div class="h-3 w-4/6 rounded-flag bg-surface-raised"></div>
        </div>
      </div>
    </li>`;
  return card.repeat(count);
}

/** Vacío: la petición funcionó, pero los filtros no dejan ningún país. */
export function emptyState(query: string, region: string): string {
  const what = [
    query && `“${escapeHtml(query)}”`,
    region && `la región ${escapeHtml(region)}`,
  ]
    .filter(Boolean)
    .join(' en ');

  return `
    <li class="col-span-full rounded-card border border-border-strong bg-surface p-lg text-center">
      <p class="break-words text-card text-text-primary">
        Sin coincidencias para ${what || 'esa búsqueda'}.
      </p>
      <p class="mt-xs text-body text-text-secondary">
        Revisa la ortografía o amplía la región a “Todas las regiones”.
      </p>
      <button type="button" class="btn btn-quiet mt-md" data-reset>Limpiar filtros</button>
    </li>`;
}

/** Error: no se pudieron obtener los datos. Siempre ofrece reintentar. */
export function errorState(message: string): string {
  return `
    <li class="col-span-full rounded-card border border-border-strong bg-surface p-lg text-center">
      <p class="text-card text-text-primary">No se pudieron cargar los países</p>
      <p class="mt-xs text-body text-text-secondary">${escapeHtml(message)}</p>
      <button type="button" class="btn btn-primary mt-md" data-retry>Reintentar</button>
    </li>`;
}
