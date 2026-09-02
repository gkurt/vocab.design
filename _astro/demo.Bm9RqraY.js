import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[25,70,140,195,265,325],r=[100,75,50,25,10],i=100;function a(a){let o=n.map(e=>`<span class="sp-swatch" style="--sp-swatch: oklch(0.68 0.14 ${e})"></span>`).join(``),s=r.map(e=>`<button class="sp-chip" data-part="stop-${e}">${e}%</button>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-grid sp-context"
             style="position: absolute; inset: 0; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); padding: 8px">
          ${o}
        </div>

        <div class="sp-window" data-part="panel" data-subject data-opacity="${i}"
             style="position: absolute; top: 50%; left: 50%; translate: -50% -50%; width: 240px; opacity: ${i/100}; box-shadow: var(--sp-shadow)">
          <div class="sp-row sp-row--between">
            <span class="sp-heading">Export</span>
            <span class="sp-label" data-part="readout">${i}%</span>
          </div>
          <p class="sp-text" style="margin: 6px 0 0">Six frames, one sheet.</p>
          <div class="sp-row" style="margin-top: 12px">
            <button class="sp-button sp-button--sm">Save</button>
            <button class="sp-button sp-button--sm sp-button--ghost">Cancel</button>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="stops">${s}</div>
    </div>
  `;let c=e(a,`panel`),l=e(a,`readout`),u=r.map(t=>({pct:t,el:e(a,`stop-${t}`)})),d=e=>{c.dataset.opacity=String(e),c.style.opacity=String(e/100),l.textContent=`${e}%`;for(let n of u)t(n.el,`data-selected`,n.pct===e)};d(i);for(let e of u)e.el.addEventListener(`click`,()=>d(e.pct))}export{a as mount};