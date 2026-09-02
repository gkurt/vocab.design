import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 254px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Orders</span></div>
        <div
          class="sp-row"
          data-part="banner"
          data-subject
          style="flex: 0 0 auto; gap: 10px; padding: 9px 10px 9px 12px; background: var(--sp-accent-soft); border-bottom: 1px solid var(--sp-accent)"
        >
          <span class="sp-row" style="flex: 0 0 auto; color: var(--sp-accent)">${t(`alert`)}</span>
          <span class="sp-grow sp-text sp-text--ink" style="font-size: 13px">Your card expires this month.</span>
          <button class="sp-button sp-button--sm" type="button" data-part="fix" style="flex: 0 0 auto">Update card</button>
          <button class="sp-icon-button" type="button" data-part="dismiss" aria-label="Dismiss this message" style="flex: 0 0 auto">${t(`close`)}</button>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <div class="sp-surface" style="padding: 10px 12px">
            <div class="sp-row sp-row--between"><span class="sp-text sp-text--ink">Order 4192</span><span class="sp-text">Dispatched</span></div>
            <div class="sp-divider" style="margin: 9px 0"></div>
            <div class="sp-row sp-row--between"><span class="sp-text sp-text--ink">Order 4188</span><span class="sp-text">Delivered</span></div>
            <div class="sp-divider" style="margin: 9px 0"></div>
            <div class="sp-row sp-row--between"><span class="sp-text sp-text--ink">Order 4171</span><span class="sp-text">Refunded</span></div>
          </div>
          <p class="sp-text" data-part="state" data-state="showing" style="margin: auto 0 0 2px; font-size: 12px; white-space: nowrap">
            3 orders in the last 30 days.
          </p>
        </div>
      </div>
    </div>
  `;let r=e(n,`banner`),i=e(n,`state`);e(n,`dismiss`).addEventListener(`click`,()=>{r.hidden=!0,i.dataset.state=`dismissed`,i.textContent=`Reminder hidden until your next sign in.`})}export{n as mount};