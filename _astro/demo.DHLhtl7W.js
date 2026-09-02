import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=436,n=180,r={narrow:{width:216,margin:16,note:`The tinted band is the margin: 16 px each side, the same on every screen in the product.`},medium:{width:320,margin:24,note:`The tinted band is the margin: 24 px each side. It steps up with the window, it does not scale.`},wide:{width:432,margin:32,note:`The tinted band is the margin: 32 px each side. Surplus width goes here, not into longer lines.`}},i=`color-mix(in srgb, var(--sp-accent) 16%, var(--sp-sunken))`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Window width</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Size" data-part="switcher" data-value="narrow">
            <button class="sp-segment" type="button" data-part="seg-narrow" value="narrow">narrow</button>
            <button class="sp-segment" type="button" data-part="seg-medium" value="medium">medium</button>
            <button class="sp-segment" type="button" data-part="seg-wide" value="wide">wide</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px">
          <div style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: ${t}px; height: ${n}px">
            <div
              data-part="surface"
              style="position: relative; display: flex; width: ${r.narrow?.width}px; height: 100%; padding: ${r.narrow?.margin}px;
                     background: ${i}; border: 1px solid var(--sp-line); border-radius: 12px"
            >
              <span
                data-part="band"
                data-subject
                data-margin="16"
                aria-hidden="true"
                style="position: absolute; left: 0; top: 0; bottom: 0; width: ${r.narrow?.margin}px; pointer-events: none"
              ></span>
              <div
                data-part="content"
                data-margin="16"
                style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 auto; min-width: 0; padding: 9px 12px;
                       background: var(--sp-surface); border-radius: 6px"
              >
                <span class="sp-heading" style="flex: 0 0 auto; font-size: 13px">Berth transfer</span>
                <div class="sp-line" style="flex: 0 0 auto; height: 7px; width: 96%"></div>
                <div class="sp-line" style="flex: 0 0 auto; height: 7px; width: 88%"></div>
                <div class="sp-line" style="flex: 0 0 auto; height: 7px; width: 61%"></div>
                <span class="sp-button sp-button--sm" style="flex: 0 0 auto; align-self: flex-start; margin-top: auto; cursor: default">Confirm</span>
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 40px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let o=e(a,`surface`),s=e(a,`content`),c=e(a,`band`),l=e(a,`readout`),u=e=>{let t=r[e];t&&(o.style.width=`${t.width}px`,o.style.padding=`${t.margin}px`,c.style.width=`${t.margin}px`,c.dataset.margin=String(t.margin),s.dataset.margin=String(t.margin),l.textContent=t.note)};e(a,`switcher`).addEventListener(`change`,e=>u(e.detail)),u(`narrow`)}export{a as mount};