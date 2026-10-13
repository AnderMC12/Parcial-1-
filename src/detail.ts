import './styles/main.css';

import { CountriesError, fetchCountries } from './api/countries';
import { mountIcons } from './render/icons-mount';
import type { Country } from './types/country';
import {
  SIN_DATO,
  escapeHtml,
  formatPopulation,
  listOrFallback,
  textOrFallback,
} from './utils/format';

/**
 * Coordinador de la pantalla de detalle.
 *
 * Reutiliza la misma capa de API que la pantalla principal, de modo que la
 * validación y el manejo de errores están escritos una sola vez.
 */

const status = document.querySelector<HTMLElement>('#detail-status');
const panel = document.querySelector<HTMLElement>('#detail');

mountIcons();

function showStatus(html: string): void {
  if (panel) panel.hidden = true;
  if (status) {
    status.hidden = false;
    status.innerHTML = html;
  }
}

function setText(selector: string, value: string): void {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
}

function render(country: Country): void {
  document.title = `${country.name} — Explorer App`;

  setText('#country-name', country.name);
  setText('#stat-capital', listOrFallback(country.capital));
  setText('#stat-region', textOrFallback(country.subregion ?? country.region));
  setText('#stat-population', formatPopulation(country.population));
  setText('#stat-languages', listOrFallback(country.languages));
  setText('#stat-currency', listOrFallback(country.currencies));

  const flag = document.querySelector<HTMLImageElement>('#country-flag');
  if (flag && country.flagUrl) {
    flag.src = country.flagUrl;
    // Aquí la bandera sí es información: es el contenido principal de la
    // pantalla, no un adorno junto a un nombre repetido.
    flag.alt = country.flagAlt ?? `Bandera de ${country.name}`;
  }

  const borders = document.querySelector<HTMLUListElement>('#borders-list');
  if (borders) {
    if (country.borders.length === 0) {
      borders.outerHTML =
        '<p class="mt-md text-body text-text-secondary">Sin fronteras terrestres.</p>';
    } else {
      borders.innerHTML = country.borders
        .map(
          (code) =>
            `<li><a class="pill" href="./detalle.html?code=${encodeURIComponent(code)}">${escapeHtml(code)}</a></li>`,
        )
        .join('');
    }
  }

  if (status) status.hidden = true;
  if (panel) panel.hidden = false;
}

/** Sustituye los códigos de frontera por los nombres de cada país vecino. */
function labelBorders(country: Country, all: readonly Country[]): void {
  const byCode = new Map(all.map((item) => [item.code, item.name]));
  for (const link of document.querySelectorAll<HTMLAnchorElement>('#borders-list a')) {
    const code = new URL(link.href, window.location.href).searchParams.get('code') ?? '';
    link.textContent = byCode.get(code) ?? code;
  }
  void country;
}

async function load(): Promise<void> {
  const code = new URLSearchParams(window.location.search).get('code') ?? '';

  showStatus(`
    <div class="animate-pulse rounded-card border border-border bg-surface p-lg">
      <p class="text-body text-text-secondary">Cargando la ficha del país…</p>
    </div>`);

  try {
    const countries = await fetchCountries();
    const country = countries.find((item) => item.code === code.trim().toUpperCase());

    if (!country) {
      showStatus(`
        <div class="rounded-card border border-border-strong bg-surface p-lg">
          <h1 class="text-title text-text-primary">Ese país no está en el catálogo</h1>
          <p class="mt-xs text-body text-text-secondary">
            El enlace apunta al código “${escapeHtml(code) || SIN_DATO}”, que no corresponde a
            ningún país de la fuente de datos.
          </p>
          <a class="btn btn-primary mt-md" href="./index.html">Ir al inicio</a>
        </div>`);
      return;
    }

    render(country);
    labelBorders(country, countries);
  } catch (error) {
    const message =
      error instanceof CountriesError
        ? error.message
        : 'Ocurrió un problema inesperado al obtener los datos.';
    showStatus(`
      <div class="rounded-card border border-border-strong bg-surface p-lg text-center">
        <p class="text-card text-text-primary">No se pudo cargar la ficha</p>
        <p class="mt-xs text-body text-text-secondary">${escapeHtml(message)}</p>
        <button type="button" class="btn btn-primary mt-md" data-retry>Reintentar</button>
      </div>`);
  }
}

document.addEventListener('click', (event) => {
  const target = event.target;
  if (target instanceof Element && target.closest('[data-retry]')) void load();
});

void load();
