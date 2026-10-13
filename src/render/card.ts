import type { Country } from '../types/country';
import { escapeHtml, formatPopulation, listOrFallback, textOrFallback } from '../utils/format';
import { icon } from './icons';

/**
 * Tarjeta de país.
 *
 * Todos los datos pasan por los ayudantes de formato, así que un campo ausente
 * en la fuente se muestra como «No disponible» y nunca como `undefined` o
 * `null`. La tarjeta es un enlace real para que el teclado y los lectores de
 * pantalla la alcancen igual que el ratón.
 */
export function countryCard(country: Country): string {
  const name = escapeHtml(country.name);
  const capital = escapeHtml(listOrFallback(country.capital));
  const region = escapeHtml(textOrFallback(country.region));
  const population = formatPopulation(country.population);

  // La bandera lleva texto alternativo vacío a propósito: el nombre del país
  // está justo al lado, y repetirlo obligaría al lector de pantalla a decir
  // dos veces lo mismo en cada una de las tarjetas.
  const flag = country.flagUrl
    ? `<img src="${escapeHtml(country.flagUrl)}" alt="" loading="lazy" decoding="async"
           class="aspect-[3/2] w-full rounded-flag border border-border bg-surface-raised object-cover" />`
    : `<span class="grid aspect-[3/2] w-full place-items-center rounded-flag border border-border bg-surface-raised text-label text-text-secondary">
         Bandera no disponible
       </span>`;

  return `
    <li>
      <a class="card-link h-full" href="./detalle.html?code=${encodeURIComponent(country.code)}"
         aria-label="Ver detalle de ${name}">
        <article class="flex h-full flex-col gap-sm rounded-card border border-border-strong bg-surface p-[12px] shadow-card">
          ${flag}
          <h3 class="flex items-center justify-between gap-sm break-words text-card text-text-primary">
            <span>${name}</span>
            <span class="shrink-0 text-text-secondary">${icon('chevron-right', 18)}</span>
          </h3>
          <dl class="mt-auto grid gap-xs text-label">
            <div class="flex items-baseline justify-between gap-sm">
              <dt class="text-text-secondary">Población</dt>
              <dd class="text-right text-text-primary">${population}</dd>
            </div>
            <div class="flex items-baseline justify-between gap-sm">
              <dt class="text-text-secondary">Región</dt>
              <dd class="text-right text-text-primary">${region}</dd>
            </div>
            <div class="flex items-baseline justify-between gap-sm">
              <dt class="text-text-secondary">Capital</dt>
              <dd class="break-words text-right text-text-primary">${capital}</dd>
            </div>
          </dl>
        </article>
      </a>
    </li>`;
}
