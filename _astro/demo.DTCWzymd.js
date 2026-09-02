import{n as e,r as t,t as n}from"./parts.C-YLuC7Q.js";var r=[{key:`search`,name:`Search`,h:28},{key:`social`,name:`Social`,h:88},{key:`email`,name:`Email`,h:148},{key:`direct`,name:`Direct`,h:208},{key:`ads`,name:`Ads`,h:268},{key:`other`,name:`Other`,h:328}],i={l:.68,c:.13},a=[{name:`Mon`,shares:[34,18,12,16,12,8]},{name:`Tue`,shares:[30,22,10,18,12,8]},{name:`Wed`,shares:[26,16,20,14,16,8]},{name:`Thu`,shares:[38,14,12,12,14,10]}],o=0,s=e=>`oklch(${i.l} ${i.c} ${e})`,c=`inset 0 0 0 2px var(--sp-surface), inset 0 0 0 4px var(--sp-ink)`;function l(i){let l=a.map(e=>`
      <div class="sp-row" style="gap: 8px">
        <span class="sp-label" style="flex: 0 0 26px; font-size: 10px">${e.name}</span>
        <div class="sp-row" style="flex: 1 1 auto; gap: 2px; height: 18px">
          ${e.shares.map((e,t)=>{let n=r[t];return`<span class="sp-swatch" data-part="band" data-series="${n?.key}"
                        style="flex: ${e} 1 0; height: 18px; border-radius: 3px; --sp-swatch: ${s(n?.h??0)}"></span>`}).join(``)}
        </div>
      </div>`).join(``),u=r.map((e,t)=>`
      <button class="sp-button sp-button--quiet" data-part="key-${t}" data-series="${e.key}"
              style="display: flex; align-items: center; gap: 5px; padding: 2px 5px; font-size: 10.5px; font-weight: 500">
        <span class="sp-swatch" style="flex: 0 0 auto; width: 10px; height: 10px; --sp-swatch: ${s(e.h)}"></span>
        <span>${e.name}</span>
      </button>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 424px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Sessions by source</span>
        </div>

        <div class="sp-surface" data-part="palette" data-subject data-series="${r[o]?.key}"
             style="margin-top: 10px; padding: 10px 12px 12px">
          <div class="sp-row sp-row--wrap" data-part="legend" style="gap: 4px 6px">${u}</div>
          <div class="sp-stack" data-part="bars" style="gap: 6px; margin-top: 10px">${l}</div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 16px">
          <span class="sp-label">Source</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-series="${r[o]?.key}" style="font-size: 11px"></span>
        </div>
      </div>
    </div>
  `;let d=e(i,`palette`),f=e(i,`readout`),p=t(i,`band`),m=r.map((t,n)=>e(i,`key-${n}`)),h=e=>{let t=r[e];if(!t)return;d.dataset.series=t.key;for(let e of p)e.style.boxShadow=e.dataset.series===t.key?c:``;m.forEach((t,r)=>{let i=r===e;n(t,`data-selected`,i),t.style.boxShadow=i?`inset 0 0 0 1px var(--sp-ink)`:``});let i=a.reduce((t,n)=>t+(n.shares[e]??0),0);f.dataset.series=t.key,f.textContent=`${t.name} · ${(i/a.length).toFixed(1)}% of the week · H ${t.h}`};h(o),m.forEach((e,t)=>{e.addEventListener(`click`,()=>h(t))})}export{l as mount};