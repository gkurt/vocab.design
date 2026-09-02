import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={record:`Sent because somebody placed an order. It joins no list and needs no way out of one.`,campaign:`The promotion took the room the delivery detail had, and the mail now needs consent and a way out.`};function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Order #4471</span><span class="sp-label">Quay Books</span>
        </div>
        <div class="sp-body" style="padding: 10px">
          <article
            class="sp-surface"
            data-part="mail"
            data-subject
            data-pose="[data-mode=record]"
            data-mode="record"
            style="display: flex; flex-direction: column; gap: 8px; height: 100%; padding: 11px 12px"
          >
            <div class="sp-row sp-context" style="gap: 8px">
              <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 11px; font-weight: 500">Quay Books</span>
              <span class="sp-text" style="flex: 0 0 auto; font-size: 10px">Today 11:02</span>
            </div>

            <div data-part="lead" style="flex: 0 0 auto">
              <span class="sp-heading" style="display: block; font-size: 15px">Paid, and arriving Friday 12 September</span>
              <span class="sp-text" style="display: block; margin-top: 2px; font-size: 12px">Order #4471 &middot; 24.00 &middot; card ending 4192</span>
            </div>

            <div data-part="slot" style="position: relative; flex: 0 0 auto; height: 74px">
              <div class="sp-stack" data-part="detail" style="position: absolute; inset: 0; gap: 4px">
                <span class="sp-label" style="font-size: 10px">Sent to</span>
                <span class="sp-text" style="font-size: 12px">20 Harbour Row, Portsmouth PO1 2AA</span>
                <span class="sp-text" style="font-size: 12px">Two titles, tracked, no signature needed</span>
              </div>
              <div
                class="sp-surface"
                data-part="promo"
                hidden
                style="position: absolute; inset: 0; display: flex; align-items: center; gap: 10px; padding: 8px 10px; background: var(--sp-accent-soft); border-color: transparent"
              >
                <span class="sp-grow" style="min-width: 0">
                  <span class="sp-text sp-text--ink" style="display: block; font-size: 12px; font-weight: 600">Complete the shelf</span>
                  <span class="sp-text" style="display: block; font-size: 11px">20% off any three titles this week</span>
                </span>
                <button class="sp-button sp-button--sm" data-part="promo-cta" type="button" style="flex: 0 0 auto">Shop the sale</button>
              </div>
            </div>

            <div class="sp-row sp-context" data-part="foot" style="gap: 8px; height: 30px; margin-top: auto">
              <span class="sp-text sp-grow" data-part="foot-text" style="min-width: 0; font-size: 10px; line-height: 1.35">${t.record}</span>
              <span
                class="sp-text sp-text--ink"
                data-part="unsub-note"
                style="flex: 0 0 auto; font-size: 10px; text-decoration: underline; visibility: hidden"
              >Unsubscribe</span>
            </div>
          </article>
        </div>
      </div>
      <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="record" data-axis="Version" data-term="record">
        <button class="sp-segment" data-part="mode-record" value="record">As a record</button>
        <button class="sp-segment" data-part="mode-campaign" value="campaign">With a campaign in it</button>
      </sp-segmented>
    </div>
  `;let r=e(n,`mail`),i=e(n,`detail`),a=e(n,`promo`),o=e(n,`foot-text`),s=e(n,`unsub-note`);e(n,`mode`).addEventListener(`change`,e=>{let n=e.detail===`campaign`?`campaign`:`record`;r.dataset.mode=n,i.hidden=n===`campaign`,a.hidden=n===`record`,o.textContent=t[n],s.style.visibility=n===`campaign`?`visible`:`hidden`})}export{n as mount};