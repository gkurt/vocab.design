import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r={rtl:`Reading starts on the right, and the bar fills the other way.`,ltr:`The same panel, the same markup, the other reading direction.`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 340px; height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Direction</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="rtl" data-axis="Set to" data-term="rtl">
            <button class="sp-segment" type="button" data-part="seg-rtl" value="rtl">rtl</button>
            <button class="sp-segment" type="button" data-part="seg-ltr" value="ltr">ltr</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 6px 16px">
          <div class="sp-row" style="align-items: flex-start; gap: 20px">
            <div
              class="sp-surface"
              data-part="panel"
              data-subject
              data-pose="[dir=rtl]"
              dir="rtl"
              style="display: flex; flex-direction: column; gap: 10px; flex: 0 0 auto; width: 300px; height: 196px; padding: 10px"
            >
              <div class="sp-row" data-part="nav" style="gap: 2px">
                <span class="sp-nav-item">Charts</span>
                <span class="sp-nav-item" data-part="nav-tides" data-current>Tides</span>
                <span class="sp-nav-item">Winds</span>
              </div>
              <div class="sp-divider"></div>
              <div class="sp-row" data-part="back-row" style="gap: 8px">
                <span data-part="chev-rtl" style="display: inline-flex">${n(`chevronRight`)}</span>
                <span data-part="chev-ltr" style="display: inline-flex" hidden>${n(`chevronLeft`)}</span>
                <span class="sp-text sp-text--ink sp-grow">Back to the fleet</span>
                <span style="display: inline-flex">${n(`kebab`)}</span>
              </div>
              <div class="sp-stack" style="gap: 6px">
                <div class="sp-row sp-row--between">
                  <span class="sp-label">Upload</span>
                  <span class="sp-label">62%</span>
                </div>
                <div class="sp-progress" data-part="progress" style="--sp-value: 62%">
                  <div class="sp-progress-fill"></div>
                </div>
              </div>
              <div class="sp-row" data-part="status-row" style="gap: 8px">
                ${n(`check`)}
                <span class="sp-text sp-text--ink sp-grow">Berth confirmed</span>
                ${n(`star`,`sp-icon--filled`)}
              </div>
              <div class="sp-row sp-row--between">
                <span class="sp-label" data-part="clock">12:40</span>
                <span class="sp-label" data-part="distance">1,240 m</span>
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout"
                style="flex: 0 0 auto; height: 22px; max-width: 442px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let a=e(i,`panel`),o=e(i,`chev-rtl`),s=e(i,`chev-ltr`),c=e(i,`readout`),l=e=>{let n=r[e];n&&(a.dir=e,t(o,`hidden`,e!==`rtl`),t(s,`hidden`,e!==`ltr`),c.textContent=n)};e(i,`switcher`).addEventListener(`change`,e=>l(e.detail)),l(`rtl`)}export{i as mount};