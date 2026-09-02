import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={sneaky:`The extra line was added by a box that was already ticked, on the delivery screen.`,fair:`The same offer, left off: nothing reaches the basket that the buyer did not choose.`},n={sneaky:`
    <span class="sp-text" style="display: block; font-size: 10px">Recommended for you</span>
    <span class="sp-row" style="gap: 8px; margin-top: 4px">
      <button class="sp-checkbox" data-part="opt-in" type="button" role="checkbox" aria-checked="true" data-checked></button>
      <span class="sp-text" style="font-size: 11px">Keep my parcel protected, and my order on its usual delivery date.</span>
    </span>`,fair:`
    <span class="sp-text" style="display: block; font-size: 10px">Optional extra</span>
    <span class="sp-row" style="gap: 8px; margin-top: 4px">
      <button class="sp-checkbox" data-part="opt-in" type="button" role="checkbox" aria-checked="false"></button>
      <span class="sp-text" style="font-size: 11px">Add parcel protection for 2.99. Your delivery date is the same either way.</span>
    </span>`},r={sneaky:`75.49`,fair:`72.50`},i=(e,t,n=``)=>`
  <div class="sp-row sp-row--between" ${n}>
    <span class="sp-text" style="font-size: 12px">${e}</span>
    <span class="sp-text sp-text--ink" style="font-size: 12px">${t}</span>
  </div>`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Checkout</span>
          <span class="sp-text">Step 2 of 3</span>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" data-part="offer" style="padding: 8px 10px">
            <span class="sp-label" style="display: block; font-size: 10px">Delivery</span>
            ${n.sneaky}
          </div>
          <div class="sp-surface sp-grow" style="display: flex; flex-direction: column; gap: 4px; padding: 8px 10px">
            <span class="sp-label" style="font-size: 10px">Your basket</span>
            ${i(`Trail runners, size 9`,`68.00`)}
            ${i(`Delivery`,`4.50`)}
            <div data-part="sneak-slot" style="height: 18px">
              ${i(`Parcel protection`,`2.99`,`data-part="sneak-row" data-subject data-mode="sneaky" data-pose="[data-mode=sneaky]"`)}
            </div>
            <div class="sp-divider" style="margin: 2px 0"></div>
            <div class="sp-row sp-row--between">
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">Total</span>
              <span class="sp-text sp-text--ink" data-part="total" data-mode="sneaky" style="font-size: 12px; font-weight: 600">${r.sneaky}</span>
            </div>
          </div>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="font-size: 11px; width: 296px">${t.sneaky}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="sneaky" data-axis="Sneak into basket" data-term="sneaky">
          <button class="sp-segment" data-part="mode-sneaky" value="sneaky">With</button>
          <button class="sp-segment" data-part="mode-fair" value="fair">Without</button>
        </sp-segmented>
      
    </div>
  `;let o=e(a,`offer`),s=e(a,`sneak-row`),c=e(a,`total`),l=e(a,`verdict`);e(a,`mode`).addEventListener(`change`,e=>{let i=e.detail===`fair`?`fair`:`sneaky`;o.innerHTML=`<span class="sp-label" style="display: block; font-size: 10px">Delivery</span>${n[i]}`,s.dataset.mode=i,s.hidden=i===`fair`,c.dataset.mode=i,c.textContent=r[i],l.textContent=t[i]})}export{a as mount};