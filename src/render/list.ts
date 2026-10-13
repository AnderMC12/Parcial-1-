import type { Country } from '../types/country';
import { countryCard } from './card';

/** Pinta la rejilla de tarjetas a partir de la lista ya filtrada. */
export function renderCountries(container: HTMLElement, countries: readonly Country[]): void {
  container.innerHTML = countries.map(countryCard).join('');
}

/** Texto del contador que se anuncia en la región viva. */
export function resultsLabel(total: number): string {
  if (total === 0) return 'Sin resultados';
  return total === 1 ? '1 país encontrado' : `${total} países encontrados`;
}

/** Rellena el selector de región conservando la opción «todas». */
export function renderRegionOptions(select: HTMLSelectElement, regions: readonly string[]): void {
  const current = select.value;
  select.length = 1; // conserva la primera opción, que es «Todas las regiones»
  for (const region of regions) {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    select.append(option);
  }
  select.value = current;
}
