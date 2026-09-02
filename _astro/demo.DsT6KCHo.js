import{n as e,t}from"./parts.C-YLuC7Q.js";var n={keyboard:{arrived:`Tab key`,visible:`matches`,note:`Focus arrived by keyboard, so the ring is drawn.`},pointer:{arrived:`Pointer press`,visible:`does not match`,note:`Focus arrived by pointer, so no ring is drawn.`}};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 386px">
        <span class="sp-heading sp-context">Export ledger</span>
        <p class="sp-text sp-context" style="margin: 6px 0 0">March, CSV, 1,204 rows.</p>
        <div class="sp-row" style="margin-top: 12px">
          <button class="sp-button" type="button" data-part="save" data-subject data-route="keyboard" data-sim-focus>Download</button>
        </div>
        <div class="sp-surface sp-context" style="margin-top: 14px; padding: 8px 10px">
          <div class="sp-row sp-row--between" style="height: 18px">
            <span class="sp-label">Focus arrived by</span>
            <span class="sp-text sp-text--ink" data-part="arrived" style="font-size: 12px">${n.keyboard.arrived}</span>
          </div>
          <div class="sp-row sp-row--between" style="height: 18px; margin-top: 2px">
            <span class="sp-label">:focus</span>
            <span class="sp-text sp-text--ink" style="font-size: 12px">matches</span>
          </div>
          <div class="sp-row sp-row--between" style="height: 18px; margin-top: 2px">
            <span class="sp-label">:focus-visible</span>
            <span class="sp-text sp-text--ink" data-part="visible" style="font-size: 12px">${n.keyboard.visible}</span>
          </div>
          <p class="sp-text" data-stage-verdict data-part="note" style="margin: 6px 0 0; height: 18px; font-size: 12px; white-space: nowrap">
            ${n.keyboard.note}
          </p>
        </div>
      </div>
    </div>
  `;let i=e(r,`save`),a=e(r,`arrived`),o=e(r,`visible`),s=e(r,`note`),c=e=>{i.dataset.route=e,t(i,`data-sim-focus`,e===`keyboard`),a.textContent=n[e].arrived,o.textContent=n[e].visible,s.textContent=n[e].note};r.addEventListener(`keydown`,e=>{e.key===`Tab`&&c(`keyboard`)}),i.addEventListener(`click`,()=>c(`pointer`))}export{r as mount};