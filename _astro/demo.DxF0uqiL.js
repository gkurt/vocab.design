import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n={before:`The order is still a draft. Everything on this screen can still be changed.`,after:`A page of its own: a reference to quote, what was bought, and when it lands.`};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 254px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Rowan &amp; Vale</span>
          <span class="sp-label" data-part="step" style="font-size: 11px">Checkout, step 3 of 3</span>
        </div>
        <div class="sp-body" style="position: relative">

          <section class="sp-surface sp-context" data-part="checkout" style="display: flex; flex-direction: column; gap: 7px; height: 100%; padding: 12px 14px">
            <span class="sp-heading" style="font-size: 13px">Review and pay</span>
            <div class="sp-row sp-row--between" style="height: 16px">
              <span class="sp-text" style="font-size: 12px">Cotton overshirt, size M</span>
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-variant-numeric: tabular-nums">78.00</span>
            </div>
            <div class="sp-row sp-row--between" style="height: 16px">
              <span class="sp-text" style="font-size: 12px">Delivery, standard</span>
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-variant-numeric: tabular-nums">4.50</span>
            </div>
            <span class="sp-divider"></span>
            <div class="sp-row sp-row--between" style="height: 18px">
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">Total</span>
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600; font-variant-numeric: tabular-nums">82.50</span>
            </div>
            <button class="sp-button" data-part="place" type="button" style="width: 100%; margin-top: auto">Place order</button>
          </section>

          <section
            class="sp-surface"
            data-part="receipt"
            data-subject
            hidden
            style="position: absolute; inset: 12px; display: flex; flex-direction: column; gap: 8px; padding: 12px 14px"
          >
            <div class="sp-row" style="gap: 8px; height: 20px">
              ${t(`check`)}
              <span class="sp-heading" data-part="receipt-title" style="font-size: 14px">Order placed</span>
            </div>
            <div
              class="sp-row sp-row--between"
              data-part="reference"
              style="gap: 8px; padding: 6px 10px; background: var(--sp-accent-soft); border-radius: 6px"
            >
              <span class="sp-text" style="font-size: 11px">Order reference</span>
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600; letter-spacing: 0.04em">K7Q-4218-MB</span>
            </div>
            <span class="sp-text" data-part="receipt-summary" style="font-size: 12px">
              Cotton overshirt, size M. 82.50 paid by card ending 4192.
            </span>
            <span class="sp-text" data-part="receipt-next" style="font-size: 12px">
              Arriving Tuesday 26 May. A copy of this page is on its way to your inbox.
            </span>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="track" type="button" style="width: 100%; margin-top: auto">
              Track this order
            </button>
          </section>

        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-stage-verdict data-part="note" style="width: 300px; font-size: 11px">${n.before}</span>
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="restart" type="button">Start over</button>
      </div>
    </div>
  `;let i=e(r,`checkout`),a=e(r,`receipt`),o=e(r,`step`),s=e(r,`note`),c=e=>{i.hidden=e,a.hidden=!e,o.textContent=e?`Order complete`:`Checkout, step 3 of 3`,s.textContent=e?n.after:n.before};e(r,`place`).addEventListener(`click`,()=>c(!0)),e(r,`restart`).addEventListener(`click`,()=>c(!1))}export{r as mount};