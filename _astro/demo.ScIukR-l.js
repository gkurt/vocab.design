import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{name:`tomato`,hex:`#FF6347`},{name:`coral`,hex:`#FF7F50`},{name:`papayawhip`,hex:`#FFEFD5`},{name:`khaki`,hex:`#F0E68C`},{name:`wheat`,hex:`#F5DEB3`},{name:`seagreen`,hex:`#2E8B57`},{name:`teal`,hex:`#008080`},{name:`cornflowerblue`,hex:`#6495ED`},{name:`dodgerblue`,hex:`#1E90FF`},{name:`rebeccapurple`,hex:`#663399`},{name:`thistle`,hex:`#D8BFD8`},{name:`gainsboro`,hex:`#DCDCDC`}],r=`tomato`,i=`inset 0 0 0 1px rgb(16 24 40 / 0.16)`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-grid" data-part="grid" data-subject data-picked="${r}"
             style="grid-template-columns: repeat(3, 1fr)">${n.map(({name:e})=>`
      <button class="sp-stack" data-part="cell-${e}" data-name="${e}" type="button"
              style="gap: 3px; padding: 0; border: 0; background: transparent; font: inherit; cursor: pointer; text-align: left">
        <span class="sp-swatch" style="width: 100%; height: 26px; box-shadow: ${i}; --sp-swatch: ${e}"></span>
        <span class="sp-label" style="font-size: 10px; color: var(--sp-ink)">${e}</span>
      </button>`).join(``)}</div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px">
          <span class="sp-row" style="gap: 6px">
            <span class="sp-swatch" data-part="readout-chip" style="width: 14px; height: 14px; box-shadow: ${i}"></span>
            <span class="sp-text sp-text--ink" data-part="readout" data-name="${r}" style="font-size: 12px">&nbsp;</span>
          </span>
          <span class="sp-label" style="font-size: 11px">resolves to</span>
        </div>

      </div>
    </div>
  `;let o=e(a,`grid`),s=e(a,`readout`),c=e(a,`readout-chip`),l=r=>{let l=n.find(e=>e.name===r);if(l){o.dataset.picked=r;for(let{name:o}of n){let n=e(a,`cell-${o}`),s=o===r;t(n,`data-picked`,s);let c=n.querySelector(`.sp-swatch`);c&&(c.style.boxShadow=s?`0 0 0 2px var(--sp-accent), ${i}`:i)}s.dataset.name=r,s.textContent=`${l.name} = ${l.hex}`,c.style.setProperty(`--sp-swatch`,l.name)}};l(r);for(let{name:t}of n)e(a,`cell-${t}`).addEventListener(`click`,()=>l(t))}export{a as mount};