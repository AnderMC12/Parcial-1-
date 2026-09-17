import '../styles/main.css';
import { mountIcons } from '../lib/icons-mount';
import { REGIONS, searchCountries } from '../data/countries';
import { countryCardList, emptyState } from '../components/countryCard';
import { $, escapeHtml, param, wireSearchField } from '../lib/dom';

const query = param('q');
const region = param('region');

const input = $<HTMLInputElement>('#q');
if (input) input.value = query;

const select = $<HTMLSelectElement>('#region');
if (select) {
  for (const value of REGIONS) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    option.selected = value === region;
    select.append(option);
  }
}

const results = searchCountries({ query, region });

const list = $<HTMLUListElement>('#results-list');
if (list) {
  list.innerHTML = results.length
    ? countryCardList(results)
    : emptyState(escapeHtml(query), escapeHtml(region));
}

// Región viva: el lector de pantalla anuncia el conteo tras cada búsqueda.
const count = $('#results-count');
if (count) {
  const plural = results.length === 1 ? 'resultado encontrado' : 'resultados encontrados';
  count.textContent = `${results.length} ${plural}`;
}

const echo = $('#results-query');
if (echo) {
  if (query && region) echo.textContent = `“${query}” en ${region}`;
  else if (query) echo.textContent = `“${query}”`;
  else if (region) echo.textContent = region;
  else echo.textContent = 'todos los países';
}

const form = $<HTMLFormElement>('#search-form');
if (form) wireSearchField(form);

mountIcons();
