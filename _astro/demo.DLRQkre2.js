import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=262,n=[{key:`triadic`,label:`Triad`,offsets:[0,120,240],spacing:`120° apart`,note:`Three hues a third of the wheel apart. Evenly spaced means evenly loud, so one leads and the other two are accents.`},{key:`split`,label:`Split`,offsets:[0,150,210],spacing:`150° and 210°`,note:`The complement swapped for the two hues either side of it. Still three, no longer evenly spaced.`},{key:`square`,label:`Square`,offsets:[0,90,180,270],spacing:`90° apart`,note:`Four hues, a quarter of the wheel apart. The same idea one step further, and one step harder to balance.`}],r=`triadic`,i=4,a=e=>(t+e)%360,o=e=>`oklch(0.62 0.115 ${e})`,s=e=>`oklch(0.45 0.1 ${e})`,c=e=>`oklch(0.5 0.1 ${e})`,l=e=>`oklch(0.94 0.025 ${e})`,u=e=>`oklch(0.78 0.07 ${e})`,d=e=>`oklch(0.4 0.08 ${e})`,f=Math.PI/180,p=34,m=e=>[50+p*Math.cos(e*f),50-p*Math.sin(e*f)],h=e=>m(e).map(e=>e.toFixed(1)).join(`,`),g=`conic-gradient(${Array.from({length:37},(e,t)=>`oklch(0.8 0.055 ${(90-t*10+360)%360}) ${t*10}deg`).join(`, `)})`;function _(t){let f=n.find(e=>e.key===r)??n[0];if(!f)return;let p=Array.from({length:i},(e,t)=>`
      <span class="sp-swatch" data-part="swatch-${t}"${t>=(f.offsets.length??0)?` hidden`:``}
            style="flex: 0 0 auto; width: 42px; height: 42px; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.3);
                   --sp-swatch: ${o(a(f.offsets[t]??0))}"></span>`).join(``),_=Array.from({length:i},(e,t)=>`
      <circle data-part="mark-${t}"${t>=f.offsets.length?` hidden`:``} r="7.5" stroke="#ffffff" stroke-width="2"
              cx="${m(a(f.offsets[t]??0))[0].toFixed(1)}" cy="${m(a(f.offsets[t]??0))[1].toFixed(1)}"
              fill="${o(a(f.offsets[t]??0))}"></circle>`).join(``);t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 444px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Scheme" data-term="triadic" data-value="${r}">
            ${n.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 14px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack sp-context" style="flex: 0 0 auto; gap: 5px; align-items: center">
            <div data-part="wheel" style="position: relative; width: 116px; height: 116px; border-radius: 50%;
                 background-image: ${g}">
              <svg viewBox="0 0 100 100" style="position: absolute; inset: 0; width: 100%; height: 100%" aria-hidden="true">
                <polygon data-part="frame" points="${f.offsets.map(e=>h(a(e))).join(` `)}" fill="none"
                         stroke="#23262b" stroke-width="2" stroke-linejoin="round" opacity="0.5"></polygon>
                ${_}
              </svg>
            </div>
            <span class="sp-label" data-part="spacing" style="font-size: 10px">${f.spacing}</span>
          </div>

          <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 9px">
            <div class="sp-row" data-part="palette" data-subject data-pose="[data-scheme=triadic]" data-scheme="${r}"
                 style="gap: 8px; height: 42px">${p}</div>

            <div class="sp-surface sp-context" data-part="applied" style="overflow: hidden">
              <div data-part="app-header" style="display: flex; align-items: center; height: 26px; padding: 0 10px;
                   font-size: 11.5px; font-weight: 600; color: #ffffff; background: ${s(a(f.offsets[0]??0))}">Field guide</div>
              <div class="sp-row" style="gap: 8px; padding: 9px 10px">
                <span class="sp-line" style="flex: 1 1 auto; height: 7px"></span>
                <span data-part="app-chip" style="flex: 0 0 auto; padding: 2px 9px; border-radius: 999px; font-size: 11px;
                      background: ${l(a(f.offsets[1]??0))}; border: 1px solid ${u(a(f.offsets[1]??0))};
                      color: ${d(a(f.offsets[1]??0))}">New</span>
                <button class="sp-button sp-button--sm" data-part="app-button" type="button"
                        style="flex: 0 0 auto; padding: 4px 12px; font-size: 11.5px; color: #ffffff;
                               background: ${c(a(f.offsets[2]??0))}">Save</button>
              </div>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 9px 0 0; height: 30px; font-size: 10.5px; line-height: 1.35">${f.note}</p>
      </div>
    </div>
  `;let v=e(t,`palette`),y=r=>{let f=n.find(e=>e.key===r);if(!f)return;v.dataset.scheme=r;for(let n=0;n<i;n++){let r=f.offsets[n],i=e(t,`swatch-${n}`),s=e(t,`mark-${n}`);if(r===void 0){i.hidden=!0,s.setAttribute(`hidden`,``);continue}let c=a(r);i.hidden=!1,i.style.setProperty(`--sp-swatch`,o(c)),s.removeAttribute(`hidden`),s.setAttribute(`cx`,m(c)[0].toFixed(1)),s.setAttribute(`cy`,m(c)[1].toFixed(1)),s.setAttribute(`fill`,o(c))}e(t,`frame`).setAttribute(`points`,f.offsets.map(e=>h(a(e))).join(` `)),e(t,`app-header`).style.background=s(a(f.offsets[0]??0));let p=e(t,`app-chip`),g=a(f.offsets[1]??0);p.style.background=l(g),p.style.borderColor=u(g),p.style.color=d(g),e(t,`app-button`).style.background=c(a(f.offsets[2]??0)),e(t,`spacing`).textContent=f.spacing,e(t,`note`).textContent=f.note};y(r),e(t,`segmented`).addEventListener(`change`,e=>y(e.detail))}export{_ as mount};