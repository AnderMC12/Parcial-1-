import '../styles/main.css';
import { mountIcons } from '../lib/icons-mount';
import { formatPopulation, getCountry } from '../data/countries';
import { $, param } from '../lib/dom';

const country = getCountry(param('code', 'ARG'));
const shell = $('#detail');
const missing = $('#detail-missing');

if (!country) {
  if (shell) shell.hidden = true;
  if (missing) missing.hidden = false;
} else {
  document.title = `${country.name} — Explorer App`;

  const set = (selector: string, value: string): void => {
    const node = $(selector);
    if (node) node.textContent = value;
  };

  set('#country-name', country.name);
  set('#country-flag', country.iso2);
  set('#stat-capital', country.capital);
  set('#stat-region', country.subregion);
  set('#stat-population', formatPopulation(country.population));
  set('#stat-languages', country.languages.join(', '));
  set('#stat-currency', country.currency);

  const hero = $('#flag-hero');
  if (hero) hero.setAttribute('aria-label', `Distintivo de ${country.name}: ${country.iso2}`);

  const borders = $<HTMLUListElement>('#borders-list');
  const bordersSection = $('#borders-section');
  const neighbours = country.borders
    .map(getCountry)
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  if (borders && bordersSection) {
    if (neighbours.length === 0) {
      const reason = country.borders.length
        ? 'Los países fronterizos aún no están en este catálogo.'
        : 'Sin fronteras terrestres.';
      borders.outerHTML = `<p class="mt-md text-body text-text-secondary">${reason}</p>`;
    } else {
      borders.innerHTML = neighbours
        .map(
          (n) => `<li><a class="pill" href="./detalle.html?code=${n.code}">${n.name}</a></li>`,
        )
        .join('');
    }
  }
}

mountIcons();
