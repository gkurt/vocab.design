import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=`color-mix(in oklab, var(--sp-accent) 30%, var(--sp-surface))`,r=`color-mix(in oklab, var(--sp-accent) 13%, var(--sp-surface))`,i=`color-mix(in oklab, var(--sp-muted) 18%, var(--sp-surface))`,a=`radial-gradient(circle at 86% 104%, ${n} 0 41%, ${r} 41% 64%, ${i} 64%)`,o={bottom:`The action sits in the easy band, under the thumb with no regrip.`,top:`In the far corner the same action is diagonally across from the thumb: regrip, or a second hand.`},s=(e,t)=>`
  <span class="sp-row" style="gap: 8px">
    <span class="sp-swatch" style="flex: 0 0 auto; width: 14px; height: 14px; border: 1px solid var(--sp-line); --sp-swatch: ${e}"></span>
    <span class="sp-text">${t}</span>
  </span>`;function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Primary action</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Placement" data-part="switcher" data-value="bottom">
            <button class="sp-segment" type="button" data-part="seg-bottom" value="bottom">bottom bar</button>
            <button class="sp-segment" type="button" data-part="seg-top" value="top">top corner</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; gap: 16px; padding: 12px 14px">
          <div data-part="phone" style="flex: 0 0 auto; padding: 5px; background: var(--sp-ink); border-radius: 24px">
            <div data-part="screen" style="position: relative; width: 148px; height: 214px; background: var(--sp-surface); border-radius: 19px; overflow: hidden">
              <div data-part="map" data-subject style="position: absolute; inset: 0; background: ${a}"></div>
              <div class="sp-context" style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; padding: 10px">
                <div class="sp-row sp-row--between" style="height: 26px">
                  <span class="sp-heading" style="font-size: 12px">Orders</span>
                  <span data-part="actions-top" style="display: inline-flex">
                    <span class="sp-button sp-button--sm" style="cursor: default; font-size: 12px; padding: 4px 9px">Pay</span>
                  </span>
                </div>
                <div class="sp-stack" style="gap: 8px">
                  <div class="sp-line" style="width: 88%"></div>
                  <div class="sp-line" style="width: 66%"></div>
                  <div class="sp-line" style="width: 78%"></div>
                </div>
                <div class="sp-row" data-part="actions-bottom" style="gap: 8px; height: 34px">
                  <span class="sp-button" style="flex: 1 1 auto; justify-content: center; text-align: center; cursor: default; font-size: 13px; padding: 7px 0">Pay</span>
                  <span class="sp-icon-button" style="flex: 0 0 auto; background: var(--sp-surface); border: 1px solid var(--sp-line); cursor: default">${t(`heart`)}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 10px">
            <span class="sp-label">Right thumb reach</span>
            <div class="sp-stack" style="gap: 6px">
              ${s(n,`easy`)}
              ${s(r,`stretch`)}
              ${s(i,`hard`)}
            </div>
            <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 60px"></span>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(c,`actions-bottom`),u=e(c,`actions-top`),d=e(c,`readout`),f=e=>{let t=o[e];t&&(l.style.visibility=e===`bottom`?``:`hidden`,u.style.visibility=e===`top`?``:`hidden`,d.textContent=t)};e(c,`switcher`).addEventListener(`change`,e=>f(e.detail)),f(`bottom`)}export{c as mount};