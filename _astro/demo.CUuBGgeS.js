import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=444,r=212,i={path:`Two sweeps across the top, then a run down the left edge: the first words of each line are what is reliably seen.`,cold:`The far end of every line, and the column beside it, collect almost no fixations at all.`,off:`The page on its own. Nothing about the scan is in the layout; it is what dense text gets.`};function a(a){let o=e=>e.map(e=>`<div class="sp-line" style="width: ${e}"></div>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Overlay</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Show" data-part="switcher" data-value="path">
            <button class="sp-segment" type="button" data-part="seg-path" value="path">scan path</button>
            <button class="sp-segment" type="button" data-part="seg-cold" value="cold">cold zone</button>
            <button class="sp-segment" type="button" data-part="seg-off" value="off">page only</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="page" style="position: relative; width: ${n}px; height: ${r}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div class="sp-context" style="display: flex; gap: 14px; padding: 12px">
              <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 9px">
                <span class="sp-heading">Berthing and harbour dues</span>
                ${o([`96%`,`92%`,`88%`])}
                <span class="sp-heading" style="font-size: 13px; margin-top: 2px">Overnight moorings</span>
                ${o([`90%`,`84%`,`94%`,`78%`,`86%`])}
              </div>
              <div class="sp-stack" style="flex: 0 0 auto; width: 106px; gap: 8px">
                <span class="sp-label">Related</span>
                ${o([`88%`,`72%`,`80%`,`64%`])}
              </div>
            </div>
            <div
              data-part="cold"
              hidden
              style="position: absolute; top: 8px; right: 8px; bottom: 8px; left: 244px; border: 1px dashed var(--sp-warn); border-radius: 6px; background: repeating-linear-gradient(45deg, var(--sp-line) 0 4px, transparent 4px 10px)"
            >
              <span class="sp-label" style="position: absolute; left: 0; right: 0; bottom: 6px; text-align: center">rarely fixated</span>
            </div>
            <svg
              data-part="path"
              data-subject
              viewBox="0 0 320 192"
              aria-hidden="true"
              style="position: absolute; left: 10px; top: 12px; width: 320px; height: 192px; pointer-events: none; overflow: visible"
            >
              <g fill="none" stroke="var(--sp-accent)" stroke-width="11" stroke-linecap="round" opacity="0.34">
                <path d="M10 10 H290" />
                <path d="M10 62 H228" />
                <path d="M10 10 V178" />
              </g>
              <g fill="var(--sp-accent)">
                <circle cx="302" cy="10" r="9" />
                <circle cx="240" cy="62" r="9" />
                <circle cx="10" cy="182" r="9" />
              </g>
              <g fill="var(--sp-accent-ink)" font-size="11" font-weight="600" text-anchor="middle" font-family="inherit">
                <text x="302" y="14">1</text>
                <text x="240" y="66">2</text>
                <text x="10" y="186">3</text>
              </g>
            </svg>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 32px; max-width: 430px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let s=e(a,`path`),c=e(a,`cold`),l=e(a,`readout`),u=e=>{let n=i[e];n&&(t(s,`hidden`,e!==`path`),t(c,`hidden`,e!==`cold`),l.textContent=n)};e(a,`switcher`).addEventListener(`change`,e=>u(e.detail)),u(`path`)}export{a as mount};