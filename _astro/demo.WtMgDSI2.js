import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r={rest:`Nothing added yet. The basket already holds a line, which is why an added line has to be marked as the new one.`,added:`The add is confirmed where it happened: the new line marked, a subtotal, and both routes out. The product page never left.`,browse:`Opened from the cart icon with nothing just added: the same panel, doing the other half of its job.`,dismissed:`Dismissed by the reader, not by a timer. The page is exactly where it was, and the count carries the basket.`,checkout:`Checkout is the one route out that does leave this page, which is why it is a choice rather than the only door.`},i=`<span style="flex: 0 0 auto; width: 28px; height: 28px; border-radius: 6px; background: var(--sp-sunken)"></span>`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 272px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour Supply</span>
          <button
            class="sp-button sp-button--quiet sp-button--sm"
            data-part="cart"
            data-count="2"
            type="button"
            aria-label="Basket"
            style="flex: 0 0 auto; display: inline-flex; align-items: center; gap: 6px"
          >
            ${n(`inbox`)}<span data-part="cart-count" style="font-size: 12px; font-variant-numeric: tabular-nums">2</span>
          </button>
        </div>

        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 9px">
          <div class="sp-row" style="flex: 0 0 auto; gap: 12px; align-items: flex-start">
            <span style="flex: 0 0 auto; width: 116px; height: 92px; border: 1px solid var(--sp-line); border-radius: var(--sp-radius); background: var(--sp-surface)"></span>
            <span style="flex: 1 1 auto; min-width: 0">
              <span class="sp-heading" style="display: block; font-size: 13px">Cedar chopping board, 38cm</span>
              <span class="sp-text sp-text--ink" style="display: block; margin-top: 2px; font-size: 12.5px; font-weight: 600">34.00</span>
              <span class="sp-text" style="display: block; margin-top: 6px; font-size: 11px; line-height: 1.4">End grain, oiled, and heavy enough to stay put.</span>
            </span>
          </div>
          <div class="sp-row" style="flex: 0 0 auto; gap: 8px">
            <button class="sp-button sp-button--sm" data-part="add" type="button" style="flex: 0 0 auto">Add to basket</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" style="flex: 0 0 auto">Save</button>
          </div>
          <div class="sp-stack" style="flex: 0 0 auto; gap: 6px; margin-top: 2px">
            <div class="sp-line" style="width: 92%"></div>
            <div class="sp-line" style="width: 84%"></div>
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 76%"></div>
          </div>
        </div>

        <div
          class="sp-popover"
          data-part="panel"
          data-subject
          style="top: 44px; right: 10px; z-index: 2; width: 236px; min-width: 0; padding: 10px; --sp-arrow-x: 206px"
        >
          <div class="sp-row sp-row--between" style="gap: 8px">
            <span class="sp-heading" style="font-size: 12.5px">Your basket</span>
            <button class="sp-icon-button" data-part="close" type="button" aria-label="Close" style="flex: 0 0 auto; width: 24px; height: 24px">${n(`close`)}</button>
          </div>

          <div class="sp-stack" style="gap: 6px; margin-top: 8px; height: 74px">
            <div class="sp-row" data-part="old-line" style="flex: 0 0 auto; gap: 8px; height: 34px">
              ${i}
              <span style="flex: 1 1 auto; min-width: 0">
                <span class="sp-text sp-text--ink" style="display: block; font-size: 11px; line-height: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">Linen tea towel</span>
                <span class="sp-label" style="display: block; font-size: 10px; line-height: 13px">Quantity 2</span>
              </span>
              <span class="sp-text sp-text--ink" style="flex: 0 0 auto; font-size: 11px; font-weight: 600">18.00</span>
            </div>
            <div class="sp-row" data-part="new-line" hidden style="flex: 0 0 auto; gap: 8px; height: 34px">
              ${i}
              <span style="flex: 1 1 auto; min-width: 0">
                <span class="sp-text sp-text--ink" style="display: block; font-size: 11px; line-height: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">Cedar chopping board</span>
                <span class="sp-chip" style="padding: 0 6px; font-size: 9.5px; line-height: 14px; border-color: var(--sp-accent); background: var(--sp-accent-soft); cursor: default">Just added</span>
              </span>
              <span class="sp-text sp-text--ink" style="flex: 0 0 auto; font-size: 11px; font-weight: 600">34.00</span>
            </div>
          </div>

          <div class="sp-divider" style="margin-top: 8px"></div>
          <div class="sp-row sp-row--between" data-part="subtotal" data-total="18.00" style="margin-top: 7px">
            <span class="sp-label" style="font-size: 11px">Subtotal</span>
            <span class="sp-text sp-text--ink" data-part="subtotal-value" style="font-size: 12px; font-weight: 600; font-variant-numeric: tabular-nums">18.00</span>
          </div>
          <div class="sp-row" style="gap: 8px; margin-top: 9px">
            <button class="sp-button sp-button--sm" data-part="checkout" type="button" style="flex: 0 0 auto">Checkout</button>
            <button class="sp-button sp-button--quiet sp-button--sm" data-part="keep" type="button" style="flex: 0 0 auto; color: var(--sp-muted); font-size: 12px">Keep shopping</button>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px; line-height: 1.35">${r.rest}</span>
    </div>
  `;let o=e(a,`panel`),s=e(a,`cart`),c=e(a,`cart-count`),l=e(a,`new-line`),u=e(a,`subtotal`),d=e(a,`subtotal-value`),f=e(a,`note`),p=!1,m=e=>{f.textContent=r[e]};e(a,`add`).addEventListener(`click`,()=>{p=!0,l.hidden=!1,l.dataset.state=`added`,s.dataset.count=`3`,c.textContent=`3`,u.dataset.total=`52.00`,d.textContent=`52.00`,t(o,`data-open`,!0),m(`added`)}),s.addEventListener(`click`,()=>{t(o,`data-open`,!0),m(p?`added`:`browse`)});for(let n of[`close`,`keep`])e(a,n).addEventListener(`click`,()=>{t(o,`data-open`,!1),m(`dismissed`)});e(a,`checkout`).addEventListener(`click`,()=>m(`checkout`))}export{a as mount};