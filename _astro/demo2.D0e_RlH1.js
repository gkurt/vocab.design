import{t as e}from"./icons.CLHbLdSV.js";var t=[{key:`wide`,label:`desktop`,width:356},{key:`mid`,label:`tablet`,width:222},{key:`narrow`,label:`phone`,width:140}],n=`Shipped: order #4471, arrives Friday 12 Sept`,r=`A quick update about your recent order with us`,i=`display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis`;function a(e){let t=e.key===`narrow`;return`
    <div class="sp-row" style="gap: 8px">
      <span class="sp-label sp-context" style="flex: 0 0 auto; width: 52px; font-size: 10px; text-align: right">${e.label}</span>
      <div class="sp-surface" data-part="pane-${e.key}" style="flex: 0 0 auto; width: ${e.width}px; padding: 5px 9px">
        <span class="sp-text sp-context" style="display: block; font-size: 10px">Quay Books</span>
        <span
          class="sp-text sp-text--ink"
          data-part="front-${e.key}"
          data-load="front"
          ${t?`data-subject`:``}
          style="margin-top: 1px; font-size: 12px; ${i}"
        >${n}</span>
        <span
          class="sp-text sp-text--ink"
          data-part="back-${e.key}"
          data-load="back"
          style="margin-top: 2px; font-size: 12px; ${i}"
        >${r}</span>
      </div>
    </div>`}function o(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 314px">
        <div class="sp-topbar sp-context">
          ${e(`inbox`)}<span class="sp-heading sp-grow">Inbox</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 9px">
          ${t.map(a).join(``)}
          <span class="sp-text sp-context" data-stage-verdict data-part="note" style="margin-top: auto; font-size: 11px; line-height: 1.35">
            The client picks the width, never the sender. Only the line whose meaning arrived before the cut survives it.
          </span>
        </div>
      </div>
    </div>
  `;for(let e of n.querySelectorAll(`[data-load]`))e.dataset.cut=e.scrollWidth-e.clientWidth>1?`yes`:`no`}export{o as mount};