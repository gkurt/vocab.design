import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`oklch(0.55 0.19 264)`,n=`oklch(0.85 0.155 95)`,r=264,i=95,a=Math.PI/180,o=33,s=e=>[50+o*Math.cos(e*a),50-o*Math.sin(e*a)],c=e=>s(e).map(e=>e.toFixed(1)).join(`,`),l=(e,t)=>Array.from({length:41},(n,r)=>c(e+(t-e)*r/40)).join(` `),u=[{key:`srgb`,label:`sRGB`,method:`in srgb`,note:`the middle lands on grey`,path:`${c(r)} ${c(i)}`,chord:!0},{key:`shorter`,label:`Shorter`,method:`in oklch shorter hue`,note:`the smaller arc, through cyan`,path:l(r,i),chord:!1},{key:`longer`,label:`Longer`,method:`in oklch longer hue`,note:`the long way, through magenta`,path:l(r,455),chord:!1}],d=`srgb`,f=e=>`linear-gradient(to right ${e}, ${t}, ${n})`,p=`conic-gradient(${Array.from({length:25},(e,t)=>`oklch(0.72 0.12 ${(90-t*15+360)%360}) ${t*15}deg`).join(`, `)})`;function m(a){let o=u.find(e=>e.key===d)??u[0];if(!o)return;let[c,l]=s(r),[m,h]=s(i),g=[(c+m)/2,(l+h)/2];a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 444px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Interpolation" data-value="${d}">
            ${u.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 7px">
            <div data-part="ramp" data-subject data-mode="${d}"
                 style="height: 62px; border-radius: 6px; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35);
                        background-image: ${f(o.method)}"></div>
            <div class="sp-row sp-row--between sp-context" style="gap: 8px">
              <span class="sp-text sp-text--ink" data-part="method" style="font-size: 11px">${o.method}</span>
              <span class="sp-text" data-stage-verdict data-part="note" style="font-size: 10.5px">${o.note}</span>
            </div>
            <div class="sp-row sp-row--between sp-context" style="gap: 8px">
              <span class="sp-text" style="font-size: 10px">${t}</span>
              <span class="sp-text" style="font-size: 10px">${n}</span>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 0 0 auto; gap: 5px; align-items: center">
            <div data-part="wheel" style="position: relative; width: 92px; height: 92px; border-radius: 50%;
                 background-image: ${p}">
              <svg viewBox="0 0 100 100" style="position: absolute; inset: 0; width: 100%; height: 100%" aria-hidden="true">
                <polyline data-part="route" points="${o.path}" fill="none" stroke="var(--sp-ink)" stroke-width="3.5"
                          stroke-linecap="round" stroke-linejoin="round"></polyline>
                <circle data-part="mid" cx="${g[0].toFixed(1)}" cy="${g[1].toFixed(1)}" r="4.5"
                        fill="#8a8a8a" stroke="#ffffff" stroke-width="2"></circle>
                <circle cx="${c.toFixed(1)}" cy="${l.toFixed(1)}" r="5"
                        fill="${t}" stroke="#ffffff" stroke-width="2"></circle>
                <circle cx="${m.toFixed(1)}" cy="${h.toFixed(1)}" r="5"
                        fill="${n}" stroke="#ffffff" stroke-width="2"></circle>
              </svg>
            </div>
            <span class="sp-label" style="font-size: 10px">Route taken</span>
          </div>
        </div>

      </div>
    </div>
  `;let _=e(a,`ramp`),v=e(a,`route`),y=e(a,`mid`),b=t=>{let n=u.find(e=>e.key===t);n&&(_.dataset.mode=t,_.style.backgroundImage=f(n.method),v.setAttribute(`points`,n.path),v.setAttribute(`stroke-dasharray`,n.chord?`7 5`:`none`),n.chord?y.removeAttribute(`hidden`):y.setAttribute(`hidden`,``),e(a,`method`).textContent=n.method,e(a,`note`).textContent=n.note)};b(d),e(a,`segmented`).addEventListener(`change`,e=>b(e.detail))}export{m as mount};