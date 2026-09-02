import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=444,r=190,i=10,a={quadrants:`Primary optical area, two fallow corners, and the terminal area.`,gravity:`Reading gravity: sweeps left to right, each starting a little lower.`,off:`The page alone: evenly weighted, which is the model's one condition.`},o=[[`primary optical area`,`left: 0; top: 0`,`left: 8px; bottom: 6px`],[`strong fallow area`,`right: 0; top: 0`,`right: 8px; bottom: 6px`],[`weak fallow area`,`left: 0; bottom: 0`,`left: 8px; top: 6px`],[`terminal area`,`right: 0; bottom: 0`,`right: 8px; top: 6px`]],s=e=>e.map(e=>`<div class="sp-line" style="width: ${e}%; height: 6px"></div>`).join(``);function c(c){let l=(e,t,n)=>`
    <div style="position: absolute; ${t}; width: calc(50% - 1px); height: calc(50% - 1px); border: 1px dashed var(--sp-accent); border-radius: 6px">
      <span style="position: absolute; ${n}; padding: 1px 5px; border-radius: 4px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 9px; font-weight: 600; white-space: nowrap">${e}</span>
    </div>`;c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Overlay</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Show" data-part="switcher" data-value="quadrants">
            <button class="sp-segment" type="button" data-part="seg-quadrants" value="quadrants">quadrants</button>
            <button class="sp-segment" type="button" data-part="seg-gravity" value="gravity">gravity</button>
            <button class="sp-segment" type="button" data-part="seg-off" value="off">page only</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="page" style="position: relative; flex: 0 0 auto; width: ${n}px; height: ${r}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div class="sp-context" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; padding: 12px 16px">
              <div class="sp-row sp-row--between">
                <span class="sp-row" style="gap: 7px">
                  <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: var(--sp-accent)"></span>
                  <span class="sp-heading" style="font-size: 12px">Foundry Weekly</span>
                </span>
                <span class="sp-label">Number 214</span>
              </div>
              <div class="sp-row" style="gap: 18px; align-items: flex-start">
                <div class="sp-stack" style="flex: 1 1 0; gap: 7px">${s([100,92,100,86,96,74])}</div>
                <div class="sp-stack" style="flex: 1 1 0; gap: 7px">${s([94,100,88,100,90,68])}</div>
              </div>
              <div class="sp-row sp-row--between">
                <span class="sp-label">Printed Thursdays</span>
                <span class="sp-button sp-button--sm" style="cursor: default">Subscribe</span>
              </div>
            </div>
            <div data-part="quadrants" data-subject style="position: absolute; inset: ${i}px; pointer-events: none">
              ${o.map(([e,t,n])=>l(e,t,n)).join(``)}
            </div>
            <svg
              data-part="gravity"
              hidden
              viewBox="0 0 424 170"
              aria-hidden="true"
              style="position: absolute; left: ${i}px; top: ${i}px; width: 424px; height: 170px; pointer-events: none; overflow: visible"
            >
              <g fill="none" stroke="var(--sp-accent)" stroke-width="5" stroke-linecap="round" opacity="0.22">
                <path d="M16 18 H392 M16 62 H400 M20 106 H404 M28 150 H408" />
              </g>
              <g fill="none" stroke="var(--sp-accent)" stroke-width="10" stroke-linecap="round" opacity="0.34">
                <path d="M16 18 L408 150" />
              </g>
              <g fill="var(--sp-accent)">
                <circle cx="16" cy="18" r="9" />
                <circle cx="408" cy="150" r="9" />
              </g>
            </svg>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 22px; max-width: 430px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let u=e(c,`quadrants`),d=e(c,`gravity`),f=e(c,`readout`),p=e=>{let n=a[e];n&&(t(u,`hidden`,e!==`quadrants`),t(d,`hidden`,e!==`gravity`),f.textContent=n)};e(c,`switcher`).addEventListener(`change`,e=>p(e.detail)),p(`quadrants`)}export{c as mount};