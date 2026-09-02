import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`red`,label:`Red`,hex:`#E5342B`,rgb:`229 52 43`,unit:`0.898 0.204 0.169`},{key:`green`,label:`Green`,hex:`#2FA84F`,rgb:`47 168 79`,unit:`0.184 0.659 0.31`},{key:`blue`,label:`Blue`,hex:`#2F5FE0`,rgb:`47 95 224`,unit:`0.184 0.373 0.878`}],n=`red`,r=[{key:`hex`,write:e=>e.hex},{key:`rgb`,write:e=>`rgb(${e.rgb})`},{key:`srgb`,write:e=>`color(srgb ${e.unit})`}];function i(i){let a=t.find(e=>e.key===n)??t[0];if(!a)return;let o=r.map(e=>`
      <div class="sp-row" style="gap: 9px">
        <span class="sp-swatch" data-part="chip-${e.key}" style="flex: 0 0 auto; width: 20px; height: 20px;
              box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35); --sp-swatch: ${e.write(a)}"></span>
        <span data-part="code-${e.key}" style="font-size: 11.5px; letter-spacing: 0.01em">${e.write(a)}</span>
      </div>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 432px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Hue" data-value="${n}">
            ${t.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <span class="sp-label sp-context" style="display: block; margin-top: 11px">sRGB</span>
        <div class="sp-stack" data-part="space" data-subject data-hue="${n}"
             style="gap: 6px; margin-top: 5px; padding: 9px 10px; border-radius: var(--sp-radius);
                    border: 1px solid var(--sp-line); background: var(--sp-surface)">
          ${o}
        </div>

        <div class="sp-context">
          <div class="sp-row" style="gap: 8px; margin-top: 14px">
            <div class="sp-swatch" data-part="near" style="flex: 1 1 0; height: 34px;
                 box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35); --sp-swatch: color(srgb ${a.unit})"></div>
            <div class="sp-swatch" data-part="wide" style="flex: 1 1 0; height: 34px;
                 box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35); --sp-swatch: color(display-p3 ${a.unit})"></div>
          </div>
          <div class="sp-row" style="gap: 8px; margin-top: 3px">
            <span class="sp-text" style="flex: 1 1 0; font-size: 10.5px">srgb</span>
            <span class="sp-text" style="flex: 1 1 0; font-size: 10.5px">display-p3</span>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(i,`space`),c=e(i,`near`),l=e(i,`wide`),u=n=>{let a=t.find(e=>e.key===n);if(a){s.dataset.hue=n;for(let t of r){let n=t.write(a);e(i,`chip-${t.key}`).style.setProperty(`--sp-swatch`,n),e(i,`code-${t.key}`).textContent=n}c.style.setProperty(`--sp-swatch`,`color(srgb ${a.unit})`),l.style.setProperty(`--sp-swatch`,`color(display-p3 ${a.unit})`)}};u(n),e(i,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{i as mount};