import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=420,n=20,r=380,i=3,a=[8,16,24],o=16,s=`position: absolute; top: 0; bottom: 0; pointer-events: none`,c=[`Ferry`,`Chandler`,`Slipway`].map(e=>`
      <div class="sp-surface" style="padding: 10px; display: flex; flex-direction: column; gap: 8px">
        <span class="sp-label">${e}</span>
        <div class="sp-line" style="width: 90%"></div>
        <div class="sp-line" style="width: 68%"></div>
      </div>`).join(``);function l(l){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Gutter</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Width" data-value="${o}">${a.map(e=>`<button class="sp-segment" type="button" data-part="seg-${e}" value="${e}">${e}px</button>`).join(``)}</sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px">
          <div data-part="rack" data-gutter="${o}" style="position: relative; width: ${t}px; height: 132px; padding-inline: ${n}px">
            <div class="sp-grid" data-part="grid" style="grid-template-columns: repeat(${i}, 1fr); gap: ${o}px; height: 100%">
              ${c}
            </div>
            <div class="sp-context" data-part="margin-left" style="${s}; left: 0; width: ${n}px; background: var(--sp-line); opacity: 0.7"></div>
            <div class="sp-context" data-part="margin-right" style="${s}; right: 0; width: ${n}px; background: var(--sp-line); opacity: 0.7"></div>
            <div data-part="gutter-1" data-subject data-size="${o}" style="${s}; background: var(--sp-accent-soft)"></div>
            <div data-part="gutter-2" data-size="${o}" style="${s}; background: var(--sp-accent-soft)"></div>
          </div>
          <div class="sp-row sp-context" style="gap: 16px; height: 18px">
            <span class="sp-row" style="gap: 6px">
              <span class="sp-swatch" style="width: 14px; height: 14px; --sp-swatch: var(--sp-accent-soft)"></span>
              <span class="sp-label" data-part="legend-gutter" style="font-variant-numeric: tabular-nums"></span>
            </span>
            <span class="sp-row" style="gap: 6px">
              <span class="sp-swatch" style="width: 14px; height: 14px; --sp-swatch: var(--sp-line)"></span>
              <span class="sp-label">margin ${n}px, outside the grid</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(l,`rack`),d=e(l,`grid`),f=[e(l,`gutter-1`),e(l,`gutter-2`)],p=e(l,`legend-gutter`),m=e=>{let t=(r-e*2)/i;u.dataset.gutter=String(e),d.style.gap=`${e}px`,f.forEach((r,i)=>{r.dataset.size=String(e),r.style.left=`${n+t*(i+1)+e*i}px`,r.style.width=`${e}px`}),p.textContent=`gutter ${e}px, 2 of them, columns ${Math.round(t)}px`};e(l,`switcher`).addEventListener(`change`,e=>m(Number(e.detail))),m(o)}export{l as mount};