import type { Country } from '../data/countries';
import { icon } from './icons';

/**
 * Componente `Card` del Design System de Figma (nodo 26:31).
 * Se entrega como enlace real para que el prototipo sea navegable con
 * teclado, con clic central y con lectores de pantalla.
 */
export function countryCard(country: Country): string {
  return `
    <li>
      <a class="card-link" href="./detalle.html?code=${country.code}"
         aria-label="Ver detalle de ${country.name}">
        <article class="card">
          <span class="flex h-8 w-12 shrink-0 items-center justify-center rounded-flag border border-border bg-surface-raised text-card tracking-wide text-text-secondary"
                aria-hidden="true">${country.iso2}</span>
          <span class="min-w-0 flex-1">
            <span class="block truncate text-card text-text-primary">${country.name}</span>
            <span class="block truncate text-label text-text-secondary">Capital: ${country.capital}</span>
          </span>
          <span class="shrink-0 text-text-secondary">${icon('chevron-right', 18)}</span>
        </article>
      </a>
    </li>`;
}

export function countryCardList(countries: Country[]): string {
  return countries.map(countryCard).join('');
}

/** Estado vacío: explica qué pasó y ofrece la acción siguiente. */
export function emptyState(query: string, region: string): string {
  const what = [query && `“${query}”`, region && `la región ${region}`]
    .filter(Boolean)
    .join(' en ');
  return `
    <li class="rounded-card border border-border-strong bg-surface p-lg text-center tablet:col-span-2 desktop:col-span-3">
      <p class="text-card text-text-primary">Sin coincidencias para ${what || 'esa búsqueda'}.</p>
      <p class="mt-xs text-body text-text-secondary">Revisa la ortografía o amplía la región a “Todas”.</p>
      <a class="btn btn-quiet mt-md" href="./index.html">Volver al inicio</a>
    </li>`;
}
