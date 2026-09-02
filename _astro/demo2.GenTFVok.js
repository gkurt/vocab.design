import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=300,n=180,r=88,i=8,a=38,o=[{key:`wide`,label:`296`,width:296,note:`A 296 pixel container: three columns. Nobody wrote that width down anywhere, the grid divided by the minimum it was given.`},{key:`medium`,label:`196`,width:196,note:`At 196 the count drops to two. The rule did not change and no breakpoint fired: the same line answered a smaller container.`},{key:`narrow`,label:`124`,width:124,note:`At 124 there is no room for a second track above its minimum, so auto-fit collapses the empties and one card fills the row.`}],s=[`Tide table`,`Berth plan`,`Survey log`,`Permits`],c=e=>Math.max(1,Math.floor((e+i)/96)),l=e=>`
  <button class="sp-segment" type="button" data-part="seg-${e.key}" value="${e.key}" style="padding: 4px 10px; font-size: 11px">
    ${e.label}
  </button>`,u=(e,t)=>`
  <div
    class="sp-surface"
    data-part="card-${t+1}"
    style="display: flex; align-items: center; min-width: 0; height: ${a}px; padding: 0 9px; overflow: hidden;
           background: var(--sp-accent-soft); border-color: var(--sp-accent-soft)"
  >
    <span style="font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${e}</span>
  </div>`;function d(a){let d=o[0];a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 260px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Container width</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="widths" data-value="${d.key}" data-axis="Width">
            ${o.map(l).join(``)}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 10px 12px">
          <div style="display: flex; align-items: flex-start; gap: 12px; flex: 0 0 auto; height: ${n}px">
            <div style="flex: 0 0 auto; width: ${t}px; height: ${n}px">
              <div
                class="sp-grid"
                data-part="grid"
                data-subject
                data-cols="${c(d.width)}"
                style="width: ${d.width}px; gap: ${i}px; align-content: start;
                       grid-template-columns: repeat(auto-fit, minmax(${r}px, 1fr));
                       transition: width 0.42s var(--sp-ease)"
              >
                ${s.map(u).join(``)}
              </div>
            </div>

            <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 3px">
              <span class="sp-label">Columns</span>
              <span class="sp-heading" data-part="count" style="font-size: 26px; line-height: 1.3">1</span>
              <span
                class="sp-surface"
                data-part="rule"
                style="display: block; margin-top: 5px; padding: 7px 8px; font-family: ui-monospace, monospace; font-size: 10px;
                       line-height: 1.5; color: var(--sp-ink)"
              >repeat(auto-fit,<br />&nbsp;&nbsp;minmax(${r}px, 1fr))</span>
            </div>
          </div>
          <span class="sp-text" data-stage-verdict data-part="readout"></span>
        </div>
      </div>
    </div>
  `;let f=e(a,`grid`),p=e(a,`count`),m=e(a,`readout`),h=e=>{let t=o.find(t=>t.key===e);if(!t)return;let n=c(t.width);f.dataset.cols=String(n),f.style.width=`${t.width}px`,p.textContent=String(n),m.textContent=t.note};e(a,`widths`).addEventListener(`change`,e=>h(e.detail)),h(d.key)}export{d as mount};