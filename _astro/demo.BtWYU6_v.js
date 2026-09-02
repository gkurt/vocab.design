import{n as e,r as t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[85,75,65,55,45],r=[{key:`blue`,label:`Blue`,ok:258,hsl:250},{key:`yellow`,label:`Yellow`,ok:95,hsl:55}],i=(e,t,n)=>{let r=t/100*Math.min(n/100,1-n/100),i=t=>{let i=(t+e/30)%12;return n/100-r*Math.max(-1,Math.min(i-3,9-i,1))};return[i(0),i(8),i(4)]},a=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,o=([e,t,n])=>{let[r,i,o]=[a(e??0),a(t??0),a(n??0)],s=Math.cbrt(.4122214708*r+.5363325363*i+.0514459929*o),c=Math.cbrt(.2119034982*r+.6806995451*i+.1073969566*o),l=Math.cbrt(.0883024619*r+.2817188376*i+.6299787005*o);return .2104542553*s+.793617785*c-.0040720468*l},s=e=>`oklch(${e.toFixed(3)} 0 0)`;function c(a){let c=(e,t)=>{let r=n.map(n=>`<span class="sp-swatch" data-part="swatch"
                    style="flex: 1 1 0; height: 26px; --sw-color: ${e===`oklch`?`oklch(${n/100} 0.08 ${t.ok})`:`hsl(${t.hsl} 70% ${n}%)`}; --sw-grey: ${s(e===`oklch`?n/100:o(i(t.hsl,70,n)))}; --sp-swatch: var(--sw-color)"></span>`).join(``);return`
      <div class="sp-row" style="gap: 6px">
        <span class="sp-label" style="width: 46px">${t.label}</span>
        <span class="sp-row sp-grow" style="gap: 5px">${r}</span>
      </div>`};a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 372px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">L steps 85 · 75 · 65 · 55 · 45</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="color" data-axis="View">
            <button class="sp-segment" data-part="seg-color" value="color">Colour</button>
            <button class="sp-segment" data-part="seg-lightness" value="lightness">Lightness</button>
          </sp-segmented>
        </div>

        <div class="sp-stack" data-part="oklch" data-subject data-view="color" style="gap: 6px; margin-top: 14px">
          <span class="sp-text sp-text--ink">oklch(L 0.08 h)</span>
          ${r.map(e=>c(`oklch`,e)).join(``)}
        </div>

        <div class="sp-divider" style="margin: 14px 0"></div>

        <div class="sp-stack sp-context" data-part="hsl" data-view="color" style="gap: 6px">
          <span class="sp-text sp-text--ink">hsl(h 70% L%)</span>
          ${r.map(e=>c(`hsl`,e)).join(``)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 12px 0 0">
          The same numbers. Only one of the two notations meant the same thing by them.
        </p>
      </div>
    </div>
  `;let l=e(a,`oklch`),u=e(a,`hsl`),d=t(a,`swatch`),f=e=>{l.dataset.view=e,u.dataset.view=e;for(let t of d)t.style.setProperty(`--sp-swatch`,e===`lightness`?`var(--sw-grey)`:`var(--sw-color)`)};f(`color`),e(a,`segmented`).addEventListener(`change`,e=>f(e.detail))}export{c as mount};