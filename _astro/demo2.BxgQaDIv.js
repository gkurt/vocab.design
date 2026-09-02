import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={phone:{width:258,cols:1,template:`1fr`},tablet:{width:348,cols:2,template:`repeat(2, 1fr)`},desktop:{width:438,cols:3,template:`repeat(3, 1fr)`}},n=34;function r(r){let i=[78,64,71].map((e,t)=>`
        <div
          class="sp-surface"
          data-part="card-${t+1}"
          style="display: flex; align-items: center; justify-content: center; min-width: 0; min-height: 0; padding: 4px"
        >
          <div class="sp-line" style="width: ${e}%"></div>
        </div>`).join(``);r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 302px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Viewport</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Device" data-part="switcher" data-value="phone">
            <button class="sp-segment" type="button" data-part="seg-phone" value="phone">phone</button>
            <button class="sp-segment" type="button" data-part="seg-tablet" value="tablet">tablet</button>
            <button class="sp-segment" type="button" data-part="seg-desktop" value="desktop">desktop</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; padding: 12px">
          <div
            class="sp-context"
            data-part="viewport"
            data-width="phone"
            style="width: ${t.phone?.width}px; height: 172px; padding: 8px; background: var(--sp-bg); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div
              data-part="page"
              data-subject
              data-cols="1"
              style="display: flex; flex-direction: column; gap: 5px; height: 100%; padding: 8px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              <div class="sp-row" style="flex: 0 0 auto; gap: 8px">
                <span class="sp-label" style="font-size: 11px; color: var(--sp-ink); font-weight: 600">Harbour</span>
                <span class="sp-label" style="font-size: 11px">Log</span>
                <span class="sp-label" style="font-size: 11px">About</span>
              </div>
              <div
                data-part="media"
                style="flex: 0 0 auto; width: 100%; aspect-ratio: 6 / 1; border-radius: 5px; background: linear-gradient(115deg, #3f6ad8, #7cc0d8 60%, #e0b06a)"
              ></div>
              <div
                class="sp-grid"
                data-part="grid"
                style="flex: 1 1 auto; min-height: 0; gap: 5px; grid-template-columns: ${t.phone?.template}; grid-auto-rows: 1fr"
              >
                ${i}
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="margin-top: 11px; font-size: 12px; font-variant-numeric: tabular-nums"></span>
        </div>
      </div>
    </div>
  `;let a=e(r,`viewport`),o=e(r,`page`),s=e(r,`grid`),c=e(r,`readout`),l=e=>{let r=t[e];r&&(a.style.width=`${r.width}px`,a.dataset.width=e,o.dataset.cols=String(r.cols),s.style.gridTemplateColumns=r.template,c.textContent=`${r.width}px · ${r.cols} column${r.cols===1?``:`s`} · media ${r.width-n}px wide`)};e(r,`switcher`).addEventListener(`change`,e=>l(e.detail)),l(`phone`)}export{r as mount};