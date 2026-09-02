import{n as e,t}from"./parts.C-YLuC7Q.js";var n={wheelchair:`<circle cx="-2" cy="-7" r="6.5"/><circle cx="8" cy="-3.5" r="3"/><path d="M-6 -16v6h5l4 3h4"/><circle cx="-6" cy="-19" r="2.4"/>`,pram:`<circle cx="-5" cy="-2.5" r="2.5"/><circle cx="6" cy="-2.5" r="2.5"/><path d="M-7 -6h11"/><path d="M-3 -15a9 9 0 0 1 8 9"/><path d="M-3 -15h-3l-3 9"/><path d="M5 -15l4-3"/>`,trolley:`<circle cx="-4" cy="-2.5" r="2.5"/><circle cx="5" cy="-2.5" r="2.5"/><rect x="-7" y="-15" width="14" height="9" rx="1.5"/><path d="M7 -15l3-3"/>`,suitcase:`<circle cx="-3" cy="-2" r="2"/><circle cx="4" cy="-2" r="2"/><rect x="-5" y="-14" width="10" height="10" rx="1.5"/><path d="M3 -14v-5h4"/>`},r={wheelchair:`Wheelchair`,pram:`Pram`,trolley:`Delivery trolley`,suitcase:`Suitcase`},i={pram:[72,32],wheelchair:[173,45],trolley:[262,58],suitcase:[338,58]},a=`wheelchair`;function o(o){let s=e=>{let[t,r]=i[e];return`<g data-part="figure-${e}" transform="translate(${t} ${r})" style="color: var(--sp-muted)">${n[e]}</g>`},c=Object.keys(r).map(e=>`
      <button class="sp-button sp-button--quiet" data-part="pick-${e}"
              style="display: flex; align-items: center; gap: 5px; padding: 2px 6px; font-size: 10.5px; font-weight: 500">
        <svg width="20" height="20" viewBox="-11 -22 24 24" fill="none" stroke="currentcolor" stroke-width="1.6"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${n[e]}</svg>
        <span>${r[e]}</span>
      </button>`).join(``);o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-surface" data-part="kerb" data-subject data-who="${a}" style="padding: 6px 10px 4px">
          <svg viewBox="0 0 400 78" width="100%" height="78" fill="none" stroke="currentcolor" stroke-width="1.6"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: block">
            <path d="M4 32H140l66 26h190v20H4Z" fill="var(--sp-sunken)" stroke="none"/>
            <path d="M4 32H140l66 26h190" stroke="var(--sp-muted)" stroke-width="2"/>
            <path d="M140 32l66 26" data-part="ramp" stroke="var(--sp-accent)" stroke-width="3.5"/>
            <text x="8" y="26" font-size="9.5" fill="var(--sp-muted)" stroke="none">pavement</text>
            <text x="214" y="52" font-size="9.5" fill="var(--sp-muted)" stroke="none">road</text>
            <text x="140" y="72" font-size="9.5" fill="var(--sp-muted)" stroke="none">the cut</text>
            ${s(`pram`)}
            ${s(`wheelchair`)}
            ${s(`trolley`)}
            ${s(`suitcase`)}
          </svg>
          <div class="sp-row sp-row--wrap" data-part="legend" style="gap: 2px 4px; margin-top: 4px">${c}</div>
        </div>
      </div>
    </div>
  `;let l=e(o,`kerb`),u=Object.keys(r),d=n=>{l.dataset.who=n;for(let r of u){let i=r===n;e(o,`figure-${r}`).style.color=i?`var(--sp-accent)`:`var(--sp-muted)`,e(o,`figure-${r}`).style.strokeWidth=i?`2.2`:`1.6`;let a=e(o,`pick-${r}`);t(a,`data-selected`,i),a.style.boxShadow=i?`inset 0 0 0 1px var(--sp-ink)`:``}};d(a);for(let t of u)e(o,`pick-${t}`).addEventListener(`click`,()=>d(t))}export{o as mount};