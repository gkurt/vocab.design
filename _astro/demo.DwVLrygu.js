import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={width:280,height:173},r=173,i=n.width-r,a={ruled:`Cut the square off, and the remainder has the same ratio again.`,plain:`Without the rules it is just a card, which is rather the point.`},o=[42,26,16];function s(s){let c=o.map(e=>`
      <div class="sp-row sp-row--between" style="align-items: baseline">
        <span style="font-size: ${e}px; line-height: 1; font-weight: 600">Aa</span>
        <span class="sp-label">${e}</span>
      </div>`).join(``);s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Proportion</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Overlay" data-part="switcher" data-value="ruled">
            <button class="sp-segment" type="button" data-part="seg-ruled" value="ruled">ruled</button>
            <button class="sp-segment" type="button" data-part="seg-plain" value="plain">plain</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 16px">
          <div class="sp-row" style="align-items: flex-start; gap: 20px">
            <div class="sp-stack" style="flex: 0 0 auto; gap: 0">
              <div data-part="ruler" style="position: relative; width: ${n.width}px; height: 20px">
                <span
                  class="sp-label"
                  data-part="mark-large"
                  hidden
                  style="position: absolute; left: 0; bottom: 2px; width: ${r}px; text-align: center; color: var(--sp-accent)"
                >1.618</span>
                <span
                  class="sp-label"
                  data-part="mark-small"
                  hidden
                  style="position: absolute; left: ${r}px; bottom: 2px; width: ${i}px; text-align: center; color: var(--sp-accent)"
                >1</span>
              </div>
              <div
                class="sp-surface"
                data-part="card"
                data-subject
                style="position: relative; display: grid; grid-template-columns: ${r}px 1fr; width: ${n.width}px; height: ${n.height}px; overflow: hidden"
              >
                <div style="display: flex; align-items: flex-end; padding: 10px; background: var(--sp-accent-soft)">
                  <span class="sp-label" style="color: var(--sp-accent)">Falmouth, 06:12</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 7px; min-width: 0; padding: 10px">
                  <span class="sp-heading" style="font-size: 13px">Berth 14</span>
                  <div class="sp-line" style="width: 92%"></div>
                  <div class="sp-line" style="width: 74%"></div>
                  <div class="sp-line" style="width: 84%"></div>
                  <span class="sp-grow"></span>
                  <span class="sp-button sp-button--sm" style="cursor: default; text-align: center">Book</span>
                </div>
                <div data-part="rules" style="position: absolute; inset: 0; pointer-events: none">
                  <div style="position: absolute; left: ${r}px; top: 0; bottom: 0; border-left: 1px dashed var(--sp-accent)"></div>
                  <div style="position: absolute; left: ${r}px; right: 0; top: ${i}px; border-top: 1px dashed var(--sp-accent)"></div>
                </div>
              </div>
            </div>
            <div class="sp-stack sp-context" style="flex: 0 0 auto; width: 124px; gap: 8px">
              <span class="sp-label" style="color: var(--sp-ink); font-weight: 600">Type scale</span>
              ${c}
              <span class="sp-label">ratio 1.618</span>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="flex: 0 0 auto; height: 22px; max-width: 442px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let l=e(s,`rules`),u=e(s,`mark-large`),d=e(s,`mark-small`),f=e(s,`readout`),p=e=>{let n=a[e];if(!n)return;let r=e===`ruled`;for(let e of[l,u,d])t(e,`hidden`,!r);f.textContent=n};e(s,`switcher`).addEventListener(`change`,e=>p(e.detail)),p(`ruled`)}export{s as mount};