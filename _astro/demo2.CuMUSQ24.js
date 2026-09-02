import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`red`,label:`Red`,srgb:`color(srgb 1 0 0)`,p3:`color(display-p3 1 0 0)`,atSrgb:[160,126.7],atP3:[170,128.9]},{key:`green`,label:`Green`,srgb:`color(srgb 0 1 0)`,p3:`color(display-p3 0 1 0)`,atSrgb:[75,66.7],atP3:[66.3,46.7]},{key:`cyan`,label:`Cyan`,srgb:`color(srgb 0 1 1)`,p3:`color(display-p3 0 1 1)`,atSrgb:[56.3,126.7],atP3:[51.9,116.7]}],n=`red`,r=`160,126.7 75,66.7 37.5,186.7`,i=`170,128.9 66.3,46.7 37.5,186.7`;function a(a){let o=t.find(e=>e.key===n)??t[0];if(!o)return;let s=(e,t,r,i)=>`
    <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 5px">
      <div class="sp-swatch" data-part="swatch-${e}"${i?` data-subject data-hue="${n}"`:``}
           style="height: 72px; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35); --sp-swatch: ${r}"></div>
      <span class="sp-label sp-context">${t}</span>
      <span class="sp-text sp-context" data-part="code-${e}"
            style="font-size: 10px; line-height: 1.2; white-space: nowrap">${r}</span>
    </div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 444px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Hue family" data-value="${n}">
            ${t.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <div class="sp-row" style="flex: 1 1 auto; min-width: 0; gap: 10px; align-items: flex-start">
            ${s(`srgb`,`sRGB`,o.srgb,!1)}
            ${s(`p3`,`Display P3`,o.p3,!0)}
          </div>

          <div class="sp-stack sp-context" style="flex: 0 0 auto; gap: 5px; align-items: center">
            <div data-part="diagram" style="padding: 3px; border-radius: 6px; background: var(--sp-sunken)">
              <svg viewBox="28 36 160 162" style="display: block; width: 102px; height: 102px" aria-hidden="true">
                <polygon points="${i}" fill="var(--sp-ink)" fill-opacity="0.34" stroke="var(--sp-ink)"
                         stroke-width="4" stroke-linejoin="round"></polygon>
                <polygon points="${r}" fill="var(--sp-sunken)" stroke="var(--sp-muted)" stroke-width="4"
                         stroke-linejoin="round" stroke-dasharray="9 7"></polygon>
                <circle data-part="mark-srgb" cx="${o.atSrgb[0]}" cy="${o.atSrgb[1]}" r="6"
                        fill="var(--sp-sunken)" stroke="var(--sp-muted)" stroke-width="2.5"></circle>
                <circle data-part="mark-p3" cx="${o.atP3[0]}" cy="${o.atP3[1]}" r="6.5"
                        fill="var(--sp-ink)" stroke="var(--sp-sunken)" stroke-width="2.5"></circle>
              </svg>
            </div>
            <div class="sp-stack" style="gap: 2px; align-items: flex-start">
              <span class="sp-label" style="font-size: 9px">solid: Display P3</span>
              <span class="sp-label" style="font-size: 9px">dashed: sRGB</span>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 9px 0 0; height: 30px; font-size: 10.5px; line-height: 1.35">
          On an sRGB display these two blocks are the same colour, because the wider value has already been mapped
          back in. Only a P3 screen separates them.
        </p>
      </div>
    </div>
  `;let c=e(a,`swatch-p3`),l=e(a,`swatch-srgb`),u=e(a,`mark-srgb`),d=e(a,`mark-p3`),f=n=>{let r=t.find(e=>e.key===n);r&&(c.dataset.hue=n,c.style.setProperty(`--sp-swatch`,r.p3),l.style.setProperty(`--sp-swatch`,r.srgb),e(a,`code-p3`).textContent=r.p3,e(a,`code-srgb`).textContent=r.srgb,u.setAttribute(`cx`,String(r.atSrgb[0])),u.setAttribute(`cy`,String(r.atSrgb[1])),d.setAttribute(`cx`,String(r.atP3[0])),d.setAttribute(`cy`,String(r.atP3[1])))};f(n),e(a,`segmented`).addEventListener(`change`,e=>f(e.detail))}export{a as mount};