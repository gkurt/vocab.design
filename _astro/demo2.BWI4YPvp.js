import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=11,n=132,r={1:`Ratio 1: eleven CSS pixels across, eleven device pixels across. One sample each, and the stair steps are the shape.`,2:`Ratio 2: the same eleven CSS pixel box, painted with twenty two device pixels. The box did not grow, the samples did.`,3:`Ratio 3: thirty three device pixels in the same box. A 1x file stretched over that is the softness people notice.`};function i(e,t){let n=e-.5,r=t-.5;if(n*n+r*r>.4*.4)return!1;if(e<.4||e>.7)return!0;let i=.22*(1-(e-.4)/.3);return Math.abs(r)>i}function a(e){let t=n/e,r=[];for(let n=0;n<e;n++){let a=(n+.5)/e,o=-1;for(let s=0;s<=e;s++){let c=s<e&&i((s+.5)/e,a);c&&o<0&&(o=s),!c&&o>=0&&(r.push(`<span style="position: absolute; left: ${o*t}px; top: ${n*t}px; width: ${(s-o)*t}px; height: ${t}px; background: var(--sp-ink)"></span>`),o=-1)}}return r.join(``)}var o=`color-mix(in srgb, var(--sp-muted) 38%, transparent)`,s=`repeating-linear-gradient(to right, ${o} 0 1px, transparent 1px var(--sp-cell)),
              repeating-linear-gradient(to bottom, ${o} 0 1px, transparent 1px var(--sp-cell))`,c=e=>`
  <div ${e} style="position: relative; width: ${n}px; height: ${n}px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 4px; overflow: hidden">
    <div data-part="ink" style="position: absolute; inset: 0"></div>
    <span aria-hidden="true" style="position: absolute; inset: 0; background-image: ${s}"></span>
  </div>`;function l(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Device pixel ratio</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Ratio" data-value="1">
            <button class="sp-segment" type="button" data-part="seg-1x" value="1">1x</button>
            <button class="sp-segment" type="button" data-part="seg-2x" value="2">2x</button>
            <button class="sp-segment" type="button" data-part="seg-3x" value="3">3x</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px 14px">
          <div style="display: flex; gap: 24px">
            <div class="sp-stack sp-context" style="gap: 6px; align-items: center">
              <span class="sp-label">shipped at 1x</span>
              ${c(`data-part="reference"`)}
            </div>
            <div class="sp-stack" style="gap: 6px; align-items: center">
              <span class="sp-label" data-part="subject-label">shipped at 1x</span>
              ${c(`data-part="plate" data-subject data-dpr="1"`)}
            </div>
          </div>
          <span class="sp-label sp-context">1 cell = 1 device pixel</span>
        </div>
        <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="max-width: 440px; text-align: center"></span>
      </div>
    </div>
  `;let o=e(i,`reference`),s=e(i,`plate`),l=e(i,`subject-label`),u=e(i,`readout`),d=(r,i)=>{r.style.setProperty(`--sp-cell`,`${n/(t*i)}px`),e(r,`ink`).innerHTML=a(t*i)},f=e=>{let t=r[e],n=Number(e);!t||!n||(s.dataset.dpr=e,l.textContent=`shipped at ${e}x`,u.textContent=t,d(s,n))};e(i,`switcher`).addEventListener(`change`,e=>f(e.detail)),d(o,1),f(`1`)}export{l as mount};