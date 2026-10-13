import type { Country, CountryFilters } from '../types/country';
import { normalize } from './format';

/**
 * Aplica búsqueda y región de forma combinada: un país se muestra solo si
 * cumple ambos criterios a la vez.
 *
 * Cada criterio vacío equivale a «sin filtro», y de ahí sale el comportamiento
 * que pide el enunciado: al limpiar el texto se conserva la región activa, y al
 * elegir «todas las regiones» se conserva el texto escrito. No hace falta
 * ninguna lógica extra, porque los dos filtros son independientes entre sí.
 *
 * Se trabaja siempre sobre la lista ya cargada en memoria: filtrar no vuelve a
 * consultar la red.
 */
export function filterCountries(
  countries: readonly Country[],
  { query, region }: CountryFilters,
): Country[] {
  const needle = normalize(query);

  return countries.filter((country) => {
    const matchesQuery = needle === '' || normalize(country.name).includes(needle);
    const matchesRegion = region === '' || country.region === region;
    return matchesQuery && matchesRegion;
  });
}

/** Regiones presentes en los datos cargados, ordenadas para el selector. */
export function availableRegions(countries: readonly Country[]): string[] {
  const regions = new Set<string>();
  for (const country of countries) regions.add(country.region);
  return [...regions].sort((a, b) => a.localeCompare(b, 'es'));
}
