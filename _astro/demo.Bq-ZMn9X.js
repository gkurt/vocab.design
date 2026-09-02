import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=322,n=190,r=2,i=100,a=2,o=6,s=62,c=[42,58,47,63,51,68,55,72,60,78,64,82],l=[{key:`banked`,label:`banked`,w:222,h:131,note:`Banked: the average segment sits at 45 degrees, where a difference in slope is easiest to judge.`},{key:`wide`,label:`wide`,w:t,h:86,note:`Wide and short: the slopes flatten, and a series that swings 15 points a week reads as a drift.`},{key:`tall`,label:`tall`,w:134,h:n,note:`Tall and narrow: the same twelve numbers, and every week reads as a spike.`}],u=c.slice(1).reduce((e,t,n)=>e+Math.abs(t-(c[n]??0)),0)/(c.length-1),d=96/(c.length-1);function f(e){let t=e.w-r,n=e.h-r,a=u/i*n,o=d/i*t;return Math.atan(a/o)*180/Math.PI}var p=c.map((e,t)=>`${(a+t*d).toFixed(2)},${(i-e).toFixed(2)}`).join(` `),m=e=>`
  <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 10px; font-size: 11px">
    ${e.label}
  </button>`;function h(a){let c=l[0];a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Utilisation, percent, 12 weeks</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="shapes" data-axis="Shape" data-value="${c.key}">
            ${l.map(m).join(``)}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 8px 12px">
          <div style="display: flex; align-items: flex-end; gap: 12px; flex: 0 0 auto; height: ${n}px">
            <div style="position: relative; flex: 0 0 auto; width: ${t}px; height: ${n}px">
              <svg
                data-part="frame"
                data-subject
                data-shape="${c.key}"
                data-angle="${Math.round(f(c))}"
                viewBox="0 0 ${i} ${i}"
                preserveAspectRatio="none"
                aria-hidden="true"
                style="position: absolute; left: 0; bottom: 0; width: ${c.w}px; height: ${c.h}px; overflow: visible;
                       background: var(--sp-surface); border-left: ${r}px solid var(--sp-muted);
                       border-bottom: ${r}px solid var(--sp-muted);
                       transition: width 0.4s var(--sp-ease), height 0.4s var(--sp-ease)"
              >
                <polyline
                  points="${p}"
                  fill="none"
                  stroke="var(--sp-accent)"
                  stroke-width="${r}"
                  stroke-linejoin="round"
                  vector-effect="non-scaling-stroke"
                />
              </svg>
            </div>

            <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 2px; align-self: stretch">
              <span class="sp-label">Average segment</span>
              <span class="sp-heading" data-part="angle" style="font-size: 20px; line-height: 1.2">0°</span>
              <svg viewBox="0 0 96 72" width="96" height="72" aria-hidden="true" style="display: block; margin-top: 4px">
                <line x1="${o}" y1="${s}" x2="66" y2="${s}" stroke="var(--sp-line)" stroke-width="${r}" />
                <line
                  x1="${o}" y1="${s}" x2="${o+68*Math.SQRT1_2}" y2="${s-68*Math.SQRT1_2}"
                  stroke="var(--sp-muted)" stroke-width="${r}" stroke-dasharray="5 4"
                />
                <g
                  data-part="ray"
                  style="transform-box: view-box; transform-origin: ${o}px ${s}px; transform: rotate(0deg);
                         transition: transform 0.4s var(--sp-ease)"
                >
                  <line x1="${o}" y1="${s}" x2="60" y2="${s}" stroke="var(--sp-accent)" stroke-width="${r}" />
                </g>
              </svg>
              <span class="sp-label" style="font-size: 10px">dashed: 45°</span>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" data-shape="${c.key}" style="flex: 0 0 auto; height: 40px"></span>
        </div>
      </div>
    </div>
  `;let u=e(a,`frame`),d=e(a,`angle`),h=e(a,`ray`),g=e(a,`readout`),_=e=>{let t=l.find(t=>t.key===e);if(!t)return;let n=f(t);u.dataset.shape=t.key,g.dataset.shape=t.key,u.dataset.angle=String(Math.round(n)),u.style.width=`${t.w}px`,u.style.height=`${t.h}px`,d.textContent=`${Math.round(n)}°`,h.style.transform=`rotate(${(-n).toFixed(1)}deg)`,g.textContent=t.note};e(a,`shapes`).addEventListener(`change`,e=>_(e.detail)),_(c.key)}export{h as mount};