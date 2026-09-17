import '../styles/main.css';
import { mountIcons } from '../lib/icons-mount';
import { COUNTRIES, FEATURED_CODES, getCountry, REGIONS } from '../data/countries';
import { countryCardList } from '../components/countryCard';
import { $, wireSearchField } from '../lib/dom';

const list = $<HTMLUListElement>('#featured-list');
if (list) {
  const featured = FEATURED_CODES
    .map(getCountry)
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  list.innerHTML = countryCardList(featured);
}

// El filtro de región se rellena desde los datos para que diseño y datos no se desincronicen.
const select = $<HTMLSelectElement>('#region');
if (select) {
  for (const region of REGIONS) {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    select.append(option);
  }
}

const total = $('#country-total');
if (total) total.textContent = String(COUNTRIES.length);

const form = $<HTMLFormElement>('#search-form');
if (form) wireSearchField(form);

mountIcons();
