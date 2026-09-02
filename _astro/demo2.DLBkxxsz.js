import{n as e,t}from"./parts.C-YLuC7Q.js";var n=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,r=e=>{let[t,r,i]=[1,3,5].map(t=>n(Number.parseInt(e.slice(t,t+2),16)/255)),a=.2126*(t??0)+.7152*(r??0)+.0722*(i??0);return a>.008856?116*Math.cbrt(a)-16:903.3*a},i=[{state:`rest`,label:`Rest`,token:`interactive`,step:`blue-3`,hex:`#E7EDFD`},{state:`hovered`,label:`Hovered`,token:`interactive-hover`,step:`blue-4`,hex:`#D6DFFB`},{state:`pressed`,label:`Pressed`,token:`interactive-active`,step:`blue-5`,hex:`#C5D1F9`},{state:`selected`,label:`Selected`,token:`interactive-selected`,step:`blue-6`,hex:`#B4C4F6`}],a=e=>i.find(t=>t.state===e)??i[0],o=`#1B2440`,s=[{key:`filters`,label:`Filters`},{key:`sort`,label:`Sort`}];function c(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="height: 20px">
          <span class="sp-label">Blue scale</span>
          <span class="sp-text sp-text--ink" data-part="readout" style="font-size: 10.5px"></span>
        </div>

        <div data-part="ramp" data-subject style="margin-top: 8px">
          ${i.map(e=>`
    <div class="sp-row" data-part="rung-${e.state}" style="gap: 8px; height: 26px">
      <span data-part="mark-${e.state}" aria-hidden="true"
            style="flex: 0 0 4px; height: 20px; border-radius: 2px; background: transparent"></span>
      <span style="flex: 0 0 74px; height: 20px; display: flex; align-items: center; justify-content: center;
                   border-radius: 5px; font-size: 9px; font-weight: 600; background: ${e.hex}; color: ${o};
                   box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.3)">${e.step}</span>
      <span style="flex: 0 0 58px; font-size: 10.5px">${e.label}</span>
      <span class="sp-grow" style="font-size: 10px">${e.token}</span>
      <span class="sp-text" style="flex: 0 0 118px; text-align: right; font-size: 9.5px;
            font-variant-numeric: tabular-nums">${e.hex} · L* ${r(e.hex).toFixed(1)}</span>
    </div>`).join(``)}
        </div>

        <div class="sp-row sp-context" style="gap: 10px; margin-top: 12px; height: 34px">
          <span class="sp-label" style="flex: 0 0 74px">Live</span>
          ${s.map(e=>`<button class="sp-button sp-button--sm" data-part="live-${e.key}" data-state="rest"
                            style="flex: 0 0 92px; filter: none; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.3)">${e.label}</button>`).join(``)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 9px 0 0; height: 42px; font-size: 10px; line-height: 1.4">
          Each control is painted straight from a rung: no brightness filter, no overlay. Selection outranks hover, so a
          chosen control never brightens again under the pointer and becomes a fifth colour that nobody named.
        </p>
      </div>
    </div>
  `;let c,l=!1,u,d=e=>c===e&&l?`pressed`:u===e?`selected`:c===e?`hovered`:`rest`,f=()=>{for(let t of s){let r=e(n,`live-${t.key}`),i=a(d(t.key));r.dataset.state=i.state,r.style.background=i.hex,r.style.color=o}let r=c?d(c):u?`selected`:`rest`;for(let a of i){let i=a.state===r;t(e(n,`rung-${a.state}`),`data-current`,i),e(n,`mark-${a.state}`).style.background=i?`var(--sp-ink)`:`transparent`}let l=a(r);e(n,`readout`).textContent=`${l.label} · ${l.token} · ${l.step}`};for(let t of s){let r=e(n,`live-${t.key}`);r.addEventListener(`pointerenter`,()=>{c=t.key,f()}),r.addEventListener(`pointerleave`,()=>{c===t.key&&(c=void 0),l=!1,f()}),r.addEventListener(`pointerdown`,()=>{c=t.key,l=!0,f()}),r.addEventListener(`pointerup`,()=>{l=!1,f()}),r.addEventListener(`click`,()=>{u=t.key,l=!1,f()})}f()}export{c as mount};