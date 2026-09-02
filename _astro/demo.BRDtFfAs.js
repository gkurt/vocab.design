import{n as e,r as t,t as n}from"./parts.C-YLuC7Q.js";var r={h:258,l:52},i=[{pct:0,name:`grey`},{pct:18,name:`muted`},{pct:40,name:`soft`},{pct:65,name:`vivid`},{pct:92,name:`electric`}],a=40,o=e=>`hsl(${r.h} ${e}% ${r.l}%)`,s=e=>`color-mix(in oklab, ${o(e)} 16%, var(--sp-surface))`;function c(r){let c=i.map(({pct:e})=>`
      <button data-part="stop-${e}" aria-label="saturation ${e} percent"
              style="flex: 1 1 0; height: 44px; padding: 0; border: 0; cursor: pointer; background: ${o(e)}"></button>`).join(``),l=i.map(({pct:e})=>`<span class="sp-label" data-part="tick" style="flex: 1 1 0; text-align: center; font-size: 10px">${e}%</span>`).join(``);r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 340px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <span class="sp-text" data-part="notation" style="font-variant-numeric: tabular-nums">${o(a)}</span>
        </div>

        <div class="sp-row" data-part="ramp" data-subject data-saturation="${a}"
             style="gap: 0; margin-top: 12px; border-radius: 6px; overflow: hidden">${c}</div>
        <div class="sp-row" style="gap: 0; margin-top: 5px">${l}</div>

        <div class="sp-row sp-context" data-part="sample"
             style="margin-top: 16px; padding: 10px 12px; border: 1px solid var(--sp-line); border-radius: var(--sp-radius); background: ${s(a)}">
          <span class="sp-swatch" data-part="dot" style="width: 16px; height: 16px; border-radius: 50%; --sp-swatch: ${o(a)}"></span>
          <span class="sp-grow sp-text sp-text--ink" data-part="name">Reads as soft</span>
          <span class="sp-text" data-part="value" style="width: 52px; text-align: right">S ${a}%</span>
        </div>
      </div>
    </div>
  `;let u=e(r,`ramp`),d=e(r,`sample`),f=e(r,`dot`),p=e(r,`name`),m=e(r,`value`),h=e(r,`notation`),g=i.map(t=>({stop:t,el:e(r,`stop-${t.pct}`)})),_=t(r,`tick`),v=e=>{let t=i.find(t=>t.pct===e);t&&(u.dataset.saturation=String(e),g.forEach((t,r)=>{let i=t.stop.pct===e;n(t.el,`data-selected`,i),t.el.style.boxShadow=i?`inset 0 0 0 2px var(--sp-surface), inset 0 0 0 4px var(--sp-ink)`:``;let a=_[r];a&&(a.style.color=i?`var(--sp-ink)`:``)}),d.style.background=s(e),f.style.setProperty(`--sp-swatch`,o(e)),p.textContent=`Reads as ${t.name}`,m.textContent=`S ${e}%`,h.textContent=o(e))};v(a);for(let e of g)e.el.addEventListener(`click`,()=>v(e.stop.pct))}export{c as mount};