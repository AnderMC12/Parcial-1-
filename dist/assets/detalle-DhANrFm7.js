import{m}from"./icons-mount-BEkM_R_D.js";import{f as u,S as f,e as l,C as b,l as d,t as g,a as x}from"./format-ks33K8dX.js";const s=document.querySelector("#detail-status"),n=document.querySelector("#detail");m();function c(e){n&&(n.hidden=!0),s&&(s.hidden=!1,s.innerHTML=e)}function o(e,t){const a=document.querySelector(e);a&&(a.textContent=t)}function h(e){document.title=`${e.name} — Explorer App`,o("#country-name",e.name),o("#stat-capital",d(e.capital)),o("#stat-region",g(e.subregion??e.region)),o("#stat-population",x(e.population)),o("#stat-languages",d(e.languages)),o("#stat-currency",d(e.currencies));const t=document.querySelector("#country-flag");t&&e.flagUrl&&(t.src=e.flagUrl,t.alt=e.flagAlt??`Bandera de ${e.name}`);const a=document.querySelector("#borders-list");a&&(e.borders.length===0?a.outerHTML='<p class="mt-md text-body text-text-secondary">Sin fronteras terrestres.</p>':a.innerHTML=e.borders.map(r=>`<li><a class="pill" href="./detalle.html?code=${encodeURIComponent(r)}">${l(r)}</a></li>`).join("")),s&&(s.hidden=!0),n&&(n.hidden=!1)}function y(e,t){const a=new Map(t.map(r=>[r.code,r.name]));for(const r of document.querySelectorAll("#borders-list a")){const i=new URL(r.href,window.location.href).searchParams.get("code")??"";r.textContent=a.get(i)??i}}async function p(){const e=new URLSearchParams(window.location.search).get("code")??"";c(`
    <div class="animate-pulse rounded-card border border-border bg-surface p-lg">
      <p class="text-body text-text-secondary">Cargando la ficha del país…</p>
    </div>`);try{const t=await u(),a=t.find(r=>r.code===e.trim().toUpperCase());if(!a){c(`
        <div class="rounded-card border border-border-strong bg-surface p-lg">
          <h1 class="text-title text-text-primary">Ese país no está en el catálogo</h1>
          <p class="mt-xs text-body text-text-secondary">
            El enlace apunta al código “${l(e)||f}”, que no corresponde a
            ningún país de la fuente de datos.
          </p>
          <a class="btn btn-primary mt-md" href="./index.html">Ir al inicio</a>
        </div>`);return}h(a),y(a,t)}catch(t){const a=t instanceof b?t.message:"Ocurrió un problema inesperado al obtener los datos.";c(`
      <div class="rounded-card border border-border-strong bg-surface p-lg text-center">
        <p class="text-card text-text-primary">No se pudo cargar la ficha</p>
        <p class="mt-xs text-body text-text-secondary">${l(a)}</p>
        <button type="button" class="btn btn-primary mt-md" data-retry>Reintentar</button>
      </div>`)}}document.addEventListener("click",e=>{const t=e.target;t instanceof Element&&t.closest("[data-retry]")&&p()});p();
