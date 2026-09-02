import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[`appearance: none`,`border: 0`,`background: transparent`,`padding: 7px 4px`,`font: inherit`,`font-size: 13px`,`color: var(--sp-ink)`,`cursor: default`].join(`; `);function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Quarter report</span>
          <span class="sp-text" data-part="readout" data-reads="away" style="width: 140px; text-align: right">Pointer away</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px">
          <div class="sp-row" style="align-items: center; gap: 28px">
            <div style="display: flex; flex-direction: column; align-items: center; width: 150px">
              <button class="sp-button sp-button--sm" type="button" data-part="raised" data-subject>Export CSV</button>
            </div>
            <div class="sp-context" style="display: flex; flex-direction: column; align-items: center; width: 150px">
              <button type="button" data-part="flat" style="${n}">Export CSV</button>
            </div>
          </div>
          <div style="position: relative; width: 100%; height: 34px">
            <div
              class="sp-surface sp-context"
              data-part="receipt-empty"
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--sp-muted)"
            >
              Nothing exported yet
            </div>
            <div
              class="sp-surface"
              data-part="receipt"
              hidden
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 13px"
            >
              quarter-report.csv exported
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`raised`),a=e(r,`flat`),o=e(r,`readout`),s=(e,t)=>{o.dataset.reads=e,o.textContent=t};a.addEventListener(`pointerenter`,()=>{t(a,`data-hovered`,!0),a.style.textDecoration=`underline`,a.style.cursor=`pointer`,s(`label`,`Reads as a label`)}),a.addEventListener(`pointerleave`,()=>{t(a,`data-hovered`,!1),a.style.textDecoration=``,a.style.cursor=`default`,s(`away`,`Pointer away`)}),i.addEventListener(`pointerenter`,()=>{t(i,`data-hovered`,!0),s(`pressable`,`Reads as pressable`)}),i.addEventListener(`pointerleave`,()=>{t(i,`data-hovered`,!1),t(i,`data-pressed`,!1),s(`away`,`Pointer away`)}),i.addEventListener(`pointerdown`,()=>t(i,`data-pressed`,!0)),i.addEventListener(`pointerup`,()=>t(i,`data-pressed`,!1));let c=()=>{e(r,`receipt`).hidden=!1,e(r,`receipt-empty`).hidden=!0};for(let e of[i,a])e.addEventListener(`click`,c)}export{r as mount};