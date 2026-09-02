import{n as e}from"./parts.C-YLuC7Q.js";var t=[{key:`ink`,name:`Ink`,hex:`#1F2933`},{key:`slate`,name:`Slate`,hex:`#52606D`},{key:`sky`,name:`Sky`,hex:`#2F80ED`},{key:`moss`,name:`Moss`,hex:`#2F9E44`},{key:`amber`,name:`Amber`,hex:`#E8A33D`},{key:`ember`,name:`Ember`,hex:`#D9480F`},{key:`plum`,name:`Plum`,hex:`#7C3AED`},{key:`rose`,name:`Rose`,hex:`#E64980`}],n=`sky`;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 360px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Brand palette</span>
          <span class="sp-label">8 samples</span>
        </div>

        <div class="sp-grid" data-part="palette" role="listbox" aria-label="Brand palette"
             style="grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 12px">${t.map(({key:e,name:t,hex:r},i)=>`
      <button data-part="sw-${e}" role="option" aria-selected="${e===n}" aria-label="${t} ${r}"
              style="display: flex; flex-direction: column; gap: 5px; padding: 0; border: 0; background: transparent; cursor: pointer; text-align: left">
        <span class="sp-swatch" data-part="block-${e}" ${i===0?`data-subject`:``}
              style="height: 34px; border: 1px solid rgb(16 24 40 / 0.14); --sp-swatch: ${r}"></span>
        <span class="sp-text sp-text--ink" style="font-size: 12px">${t}</span>
        <span class="sp-label" style="font-size: 11px; margin-top: -3px">${r}</span>
      </button>`).join(``)}</div>

        <div class="sp-divider" style="margin: 14px 0"></div>

        <div class="sp-row sp-context" data-part="sample" data-swatch="${n}">
          <span class="sp-label" style="width: 74px">Label colour</span>
          <span class="sp-swatch" data-part="applied"
                style="width: 26px; height: 26px; border: 1px solid rgb(16 24 40 / 0.14); --sp-swatch: #2F80ED"></span>
          <span class="sp-grow sp-text sp-text--ink" data-part="applied-name">Sky</span>
          <span class="sp-text" data-part="applied-hex" style="width: 66px; text-align: right">#2F80ED</span>
        </div>
      </div>
    </div>
  `;let i=e(r,`sample`),a=e(r,`applied`),o=e(r,`applied-name`),s=e(r,`applied-hex`),c=t.map(t=>({entry:t,el:e(r,`sw-${t.key}`),block:e(r,`block-${t.key}`)})),l=e=>{let n=t.find(t=>t.key===e);if(n){i.dataset.swatch=e,a.style.setProperty(`--sp-swatch`,n.hex),o.textContent=n.name,s.textContent=n.hex;for(let t of c){let n=t.entry.key===e;t.el.setAttribute(`aria-selected`,String(n)),t.block.style.boxShadow=n?`0 0 0 2px var(--sp-surface), 0 0 0 4px var(--sp-ink)`:``}}};l(n);for(let e of c)e.el.addEventListener(`click`,()=>l(e.entry.key))}export{r as mount};