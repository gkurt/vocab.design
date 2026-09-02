import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n={slate:{hex:`#23262B`,label:`slate`},accent:{hex:`#3557E8`,label:`accent blue`},plum:{hex:`#8A2C6E`,label:`plum`}},r=[`slate`,`accent`,`plum`],i=`slate`;function a(a){let o=r.map(e=>`
      <button data-part="swatch-${e}" type="button" aria-label="${n[e]?.label}"
              style="width: 24px; height: 24px; padding: 0; border-radius: 50%; cursor: pointer;
                     border: 2px solid transparent; background: ${n[e]?.hex};
                     box-shadow: 0 0 0 1px var(--sp-line)"></button>`).join(``),s=(e,r)=>{let a=n[i]?.hex??`#23262B`,o=r?`currentColor`:a;return`
      <button data-part="${e}" ${r?`data-subject`:``} data-ink="${i}" type="button"
              style="display: inline-flex; align-items: center; gap: 8px; padding: 9px 13px; border-radius: var(--sp-radius);
                     border: 1px solid ${o}; background: transparent; color: ${a}; font: inherit; font-size: 13px;
                     font-weight: 500; cursor: pointer">
        ${t(`share`)}
        <span data-part="${e}-label" style="border-bottom: 1px solid ${o}; padding-bottom: 1px">Share file</span>
      </button>`};a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">color</span>
          <div class="sp-row" data-part="swatches" style="gap: 8px">${o}</div>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 16px; align-items: flex-start">
          <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 7px; align-items: flex-start">
            ${s(`control`,!0)}
            <span class="sp-label">currentColor</span>
          </div>
          <div class="sp-context sp-stack" style="flex: 1 1 0; min-width: 0; gap: 7px; align-items: flex-start">
            ${s(`twin`,!1)}
            <span class="sp-label">${n[i]?.hex}</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 16px 0 0; min-height: 40px">
          One declaration moved on each control. On the left the parts that said currentColor came with it; on the right they stayed where they were written.
        </p>
      </div>
    </div>
  `;let c=e(a,`control`),l=e(a,`twin`),u=l.querySelector(`svg`),d=e(a,`twin-label`),f=n[i]?.hex??`#23262B`;u?.setAttribute(`style`,`stroke: ${f}`),d.style.borderBottomColor=f;let p=t=>{let i=n[t];if(i){for(let e of[c,l])e.dataset.ink=t,e.style.color=i.hex;for(let n of r){let r=e(a,`swatch-${n}`);r.style.borderColor=n===t?`var(--sp-ink)`:`transparent`,n===t?r.setAttribute(`data-selected`,``):r.removeAttribute(`data-selected`)}}};p(i);for(let t of r)e(a,`swatch-${t}`).addEventListener(`click`,()=>p(t))}export{a as mount};