import './styles/main.css';

import { CountriesError, fetchCountries } from './api/countries';
import { mountIcons } from './render/icons-mount';
import { renderCountries, renderRegionOptions, resultsLabel } from './render/list';
import { emptyState, errorState, loadingState } from './render/states';
import type { Country } from './types/country';
import { SEARCH_DEBOUNCE_MS, debounce } from './utils/debounce';
import { availableRegions, filterCountries } from './utils/filter';

/**
 * Coordinador de la pantalla principal.
 *
 * Su única responsabilidad es unir las piezas: pedir los datos a `api`,
 * aplicarles las funciones de `utils` y entregar el resultado a `render`. No
 * contiene lógica de filtrado ni genera marcado por su cuenta.
 */

/** Única copia de los datos en memoria. Se carga una vez y se filtra sobre ella. */
let countries: Country[] = [];

const form = document.querySelector<HTMLFormElement>('#search-form');
const input = document.querySelector<HTMLInputElement>('#q');
const clearButton = document.querySelector<HTMLButtonElement>('[data-clear]');
const select = document.querySelector<HTMLSelectElement>('#region');
const list = document.querySelector<HTMLUListElement>('#results-list');
const counter = document.querySelector<HTMLElement>('#results-count');

mountIcons();

/** Lee el estado actual de los dos controles. */
function currentFilters(): { query: string; region: string } {
  return {
    query: input?.value ?? '',
    region: select?.value ?? '',
  };
}

/** Muestra u oculta el botón de borrar según haya texto que borrar. */
function syncClearButton(): void {
  if (clearButton && input) clearButton.hidden = input.value.trim().length === 0;
}

/** Aplica los filtros vigentes y redibuja la lista y el contador. */
function update(): void {
  if (!list) return;
  const filters = currentFilters();
  const results = filterCountries(countries, filters);

  if (results.length === 0) {
    list.innerHTML = emptyState(filters.query, filters.region);
  } else {
    renderCountries(list, results);
  }

  if (counter) counter.textContent = resultsLabel(results.length);
  syncClearButton();
}

/** Carga inicial: pasa por los estados de carga y, si falla, por el de error. */
async function load(): Promise<void> {
  if (!list) return;

  list.innerHTML = loadingState();
  if (counter) counter.textContent = 'Cargando países…';

  try {
    countries = await fetchCountries();
    if (select) renderRegionOptions(select, availableRegions(countries));
    update();
  } catch (error) {
    const message =
      error instanceof CountriesError
        ? error.message
        : 'Ocurrió un problema inesperado al obtener los datos.';
    list.innerHTML = errorState(message);
    if (counter) counter.textContent = 'No se pudieron cargar los países';
  }
}

// El texto espera 300 ms sin pulsaciones antes de recalcular. Cada tecla
// cancela la actualización pendiente y reinicia la cuenta.
const updateSoon = debounce(update, SEARCH_DEBOUNCE_MS);

input?.addEventListener('input', () => {
  syncClearButton();
  updateSoon();
});

// Enter no debe recargar la página: el filtrado ya ocurre en memoria. Se
// cancela el retraso pendiente para que el resultado aparezca al instante.
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  updateSoon.cancel();
  update();
});

// Elegir una región es una decisión única, así que se refleja de inmediato.
select?.addEventListener('change', () => {
  updateSoon.cancel();
  update();
});

clearButton?.addEventListener('click', () => {
  if (!input) return;
  input.value = '';
  updateSoon.cancel();
  update();
  input.focus();
});

// Los botones de los estados vacío y de error se crean y destruyen con cada
// redibujado, así que se escuchan desde el contenedor, que sí es permanente.
list?.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  if (target.closest('[data-retry]')) {
    void load();
    return;
  }

  if (target.closest('[data-reset]')) {
    if (input) input.value = '';
    if (select) select.value = '';
    updateSoon.cancel();
    update();
    input?.focus();
  }
});

void load();
