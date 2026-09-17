import{i as t}from"./icons-mount-BOTelSTY.js";function r(a){return`
    <li>
      <a class="card-link" href="./detalle.html?code=${a.code}"
         aria-label="Ver detalle de ${a.name}">
        <article class="card">
          <span class="flex h-8 w-12 shrink-0 items-center justify-center rounded-flag border border-border bg-surface-raised text-card tracking-wide text-text-secondary"
                aria-hidden="true">${a.iso2}</span>
          <span class="min-w-0 flex-1">
            <span class="block truncate text-card text-text-primary">${a.name}</span>
            <span class="block truncate text-label text-text-secondary">Capital: ${a.capital}</span>
          </span>
          <span class="shrink-0 text-text-secondary">${t("chevron-right",18)}</span>
        </article>
      </a>
    </li>`}function c(a){return a.map(r).join("")}function l(a,e){return`
    <li class="rounded-card border border-border-strong bg-surface p-lg text-center tablet:col-span-2 desktop:col-span-3">
      <p class="text-card text-text-primary">Sin coincidencias para ${[a&&`“${a}”`,e&&`la región ${e}`].filter(Boolean).join(" en ")||"esa búsqueda"}.</p>
      <p class="mt-xs text-body text-text-secondary">Revisa la ortografía o amplía la región a “Todas”.</p>
      <a class="btn btn-quiet mt-md" href="./index.html">Volver al inicio</a>
    </li>`}export{c,l as e};
