import{i as h,m as w}from"./icons-mount-BEkM_R_D.js";import{e as d,l as C,t as S,a as $,n as m,f as E,C as L}from"./format-ks33K8dX.js";function q(e){const t=d(e.name),r=d(C(e.capital)),n=d(S(e.region)),s=$(e.population),p=e.flagUrl?`<img src="${d(e.flagUrl)}" alt="" loading="lazy" decoding="async"
           class="aspect-[3/2] w-full rounded-flag border border-border bg-surface-raised object-cover" />`:`<span class="grid aspect-[3/2] w-full place-items-center rounded-flag border border-border bg-surface-raised text-label text-text-secondary">
         Bandera no disponible
       </span>`;return`
    <li>
      <a class="card-link h-full" href="./detalle.html?code=${encodeURIComponent(e.code)}"
         aria-label="Ver detalle de ${t}">
        <article class="flex h-full flex-col gap-sm rounded-card border border-border-strong bg-surface p-[12px] shadow-card">
          ${p}
          <h3 class="flex items-center justify-between gap-sm break-words text-card text-text-primary">
            <span>${t}</span>
            <span class="shrink-0 text-text-secondary">${h("chevron-right",18)}</span>
          </h3>
          <dl class="mt-auto grid gap-xs text-label">
            <div class="flex items-baseline justify-between gap-sm">
              <dt class="text-text-secondary">Población</dt>
              <dd class="text-right text-text-primary">${s}</dd>
            </div>
            <div class="flex items-baseline justify-between gap-sm">
              <dt class="text-text-secondary">Región</dt>
              <dd class="text-right text-text-primary">${n}</dd>
            </div>
            <div class="flex items-baseline justify-between gap-sm">
              <dt class="text-text-secondary">Capital</dt>
              <dd class="break-words text-right text-text-primary">${r}</dd>
            </div>
          </dl>
        </article>
      </a>
    </li>`}function k(e,t){e.innerHTML=t.map(q).join("")}function R(e){return e===0?"Sin resultados":e===1?"1 país encontrado":`${e} países encontrados`}function T(e,t){const r=e.value;e.length=1;for(const n of t){const s=document.createElement("option");s.value=n,s.textContent=n,e.append(s)}e.value=r}function j(e=6){return`
    <li aria-hidden="true">
      <div class="flex h-full animate-pulse flex-col gap-sm rounded-card border border-border bg-surface p-[12px]">
        <div class="aspect-[3/2] w-full rounded-flag bg-surface-raised"></div>
        <div class="h-4 w-2/3 rounded-flag bg-surface-raised"></div>
        <div class="mt-auto grid gap-xs">
          <div class="h-3 w-full rounded-flag bg-surface-raised"></div>
          <div class="h-3 w-5/6 rounded-flag bg-surface-raised"></div>
          <div class="h-3 w-4/6 rounded-flag bg-surface-raised"></div>
        </div>
      </div>
    </li>`.repeat(e)}function H(e,t){return`
    <li class="col-span-full rounded-card border border-border-strong bg-surface p-lg text-center">
      <p class="break-words text-card text-text-primary">
        Sin coincidencias para ${[e&&`“${d(e)}”`,t&&`la región ${d(t)}`].filter(Boolean).join(" en ")||"esa búsqueda"}.
      </p>
      <p class="mt-xs text-body text-text-secondary">
        Revisa la ortografía o amplía la región a “Todas las regiones”.
      </p>
      <button type="button" class="btn btn-quiet mt-md" data-reset>Limpiar filtros</button>
    </li>`}function M(e){return`
    <li class="col-span-full rounded-card border border-border-strong bg-surface p-lg text-center">
      <p class="text-card text-text-primary">No se pudieron cargar los países</p>
      <p class="mt-xs text-body text-text-secondary">${d(e)}</p>
      <button type="button" class="btn btn-primary mt-md" data-retry>Reintentar</button>
    </li>`}function O(e,t){let r;const n=(...s)=>{r!==void 0&&clearTimeout(r),r=setTimeout(()=>{r=void 0,e(...s)},t)};return n.cancel=()=>{r!==void 0&&clearTimeout(r),r=void 0},n}const U=300;function B(e,{query:t,region:r}){const n=m(t);return e.filter(s=>{const p=n===""||m(s.name).includes(n),y=r===""||s.region===r;return p&&y})}function F(e){const t=new Set;for(const r of e)t.add(r.region);return[...t].sort((r,n)=>r.localeCompare(n,"es"))}let b=[];const g=document.querySelector("#search-form"),a=document.querySelector("#q"),u=document.querySelector("[data-clear]"),o=document.querySelector("#region"),i=document.querySelector("#results-list"),c=document.querySelector("#results-count");w();function N(){return{query:(a==null?void 0:a.value)??"",region:(o==null?void 0:o.value)??""}}function x(){u&&a&&(u.hidden=a.value.trim().length===0)}function l(){if(!i)return;const e=N(),t=B(b,e);t.length===0?i.innerHTML=H(e.query,e.region):k(i,t),c&&(c.textContent=R(t.length)),x()}async function v(){if(i){i.innerHTML=j(),c&&(c.textContent="Cargando países…");try{b=await E(),o&&T(o,F(b)),l()}catch(e){const t=e instanceof L?e.message:"Ocurrió un problema inesperado al obtener los datos.";i.innerHTML=M(t),c&&(c.textContent="No se pudieron cargar los países")}}}const f=O(l,U);a==null||a.addEventListener("input",()=>{x(),f()});g==null||g.addEventListener("submit",e=>{e.preventDefault(),f.cancel(),l()});o==null||o.addEventListener("change",()=>{f.cancel(),l()});u==null||u.addEventListener("click",()=>{a&&(a.value="",f.cancel(),l(),a.focus())});i==null||i.addEventListener("click",e=>{const t=e.target;if(t instanceof Element){if(t.closest("[data-retry]")){v();return}t.closest("[data-reset]")&&(a&&(a.value=""),o&&(o.value=""),f.cancel(),l(),a==null||a.focus())}});v();
