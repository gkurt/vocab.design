import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=12,n=360/t,r={complementary:{picks:[1,7],note:`Opposite hues, the furthest apart the wheel allows, so the pair vibrates unless one of them is given far less room.`},analogous:{picks:[0,1,2],note:`Neighbours inside sixty degrees. Nothing in the set can separate anything by hue, so lightness has to do that work.`},triadic:{picks:[1,5,9],note:`Three hues a third of the wheel apart, evenly spaced and evenly loud, which is exactly why one of them has to lead.`},split:{picks:[1,6,8],note:`The complement swapped for the two hues either side of it: the opposition survives, the vibration does not.`}},i=`complementary`,a=[3,2,1],o=78,s=78,c=(e,t)=>{let n=(t-90)*Math.PI/180;return`${(o+e*Math.cos(n)).toFixed(2)} ${(s+e*Math.sin(n)).toFixed(2)}`},l=(e,t,n,r)=>`M${c(t,n)} A${t} ${t} 0 0 1 ${c(t,r)} L${c(e,r)} A${e} ${e} 0 0 0 ${c(e,n)} Z`,u=(e,t=.68,n=.15)=>`oklch(${t} ${n} ${e})`;function d(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Rule" data-part="segmented" data-value="${i}">
            <button class="sp-segment" data-part="seg-complementary" value="complementary">Comp</button>
            <button class="sp-segment" data-part="seg-analogous" value="analogous">Analog</button>
            <button class="sp-segment" data-part="seg-triadic" value="triadic">Triad</button>
            <button class="sp-segment" data-part="seg-split" value="split">Split</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <svg viewBox="0 0 156 156" style="flex: 0 0 auto; display: block; width: 152px; height: 152px" aria-hidden="true">
            <g class="sp-context">${Array.from({length:t},(e,t)=>`<path d="${l(40,62,t*n+1.2,(t+1)*n-1.2)}" fill="${u(t*n)}" opacity="0.32"></path>`).join(``)}</g>
            <g data-part="set" data-subject data-rule="${i}">${[0,1,2].map(e=>`<path data-part="lifted-${e}" d="" fill="none" style="display: none"></path>`).join(``)}</g>
            <polygon data-part="chord" points="" fill="none" stroke="var(--sp-muted)" stroke-width="1.2" opacity="0.75"></polygon>
          </svg>

          <div class="sp-stack sp-context sp-grow" style="gap: 6px">
            <div class="sp-row" data-part="strip" style="gap: 0; border-radius: var(--sp-radius); overflow: hidden">${a.map((e,t)=>`
      <span class="sp-swatch" data-part="cell-${t}" style="flex: ${e} 1 0; height: 92px; border-radius: 0; --sp-swatch: transparent"></span>`).join(``)}</div>
            <div class="sp-row sp-row--between">
              <span class="sp-label" style="font-size: 10px">Hue angles</span>
              <span class="sp-text" data-part="angles" style="font-size: 11px">&nbsp;</span>
            </div>
            <span class="sp-label" style="font-size: 10px">Widths: 60 / 30 / 10</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 10px 0 0; min-height: 58px">&nbsp;</p>
      </div>
    </div>
  `;let s=e(o,`set`),d=e(o,`chord`),f=e(o,`angles`),p=e(o,`note`),m=t=>{let i=r[t];if(i){s.dataset.rule=t;for(let t of[0,1,2]){let r=i.picks[t],a=e(o,`lifted-${t}`),s=e(o,`cell-${t}`);if(r===void 0){a.style.display=`none`,s.hidden=!0;continue}a.style.display=``,a.setAttribute(`d`,l(38,72,r*n+1.2,(r+1)*n-1.2)),a.setAttribute(`fill`,u(r*n)),s.hidden=!1,s.style.setProperty(`--sp-swatch`,u(r*n,.7-t*.09,.15))}d.setAttribute(`points`,i.picks.map(e=>c(30,(e+.5)*n)).join(` `)),f.textContent=i.picks.map(e=>`${e*n}°`).join(`, `),p.textContent=i.note}};m(i),e(o,`segmented`).addEventListener(`change`,e=>m(e.detail))}export{d as mount};