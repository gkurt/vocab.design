import{n as e}from"./parts.C-YLuC7Q.js";var t={none:`Nothing recorded yet`,accepted:`Analytics cookies: accepted`,rejected:`Analytics cookies: rejected`};function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Northwind Gazette</span></div>
        <div class="sp-body sp-context" style="overflow: hidden">
          <div class="sp-prose" style="--sp-measure: 46ch">
            <p style="margin: 0"><b>Harbour works to finish late</b></p>
            <p>The east quay reopens in spring, two seasons after the original date, with the ferry ramp rebuilt a metre higher than the one it replaces.</p>
            <p>Councillors were told the delay adds little to the final bill.</p>
          </div>
        </div>

        <div class="sp-surface" data-part="banner" data-subject data-view="notice" role="region" aria-label="Cookies on this site"
             style="position: absolute; left: 12px; right: 12px; bottom: 12px; padding: 12px 14px; box-shadow: var(--sp-shadow)">
          <div class="sp-heading">Cookies on this site</div>
          <p class="sp-text" style="margin: 4px 0 10px">Essential cookies keep the site working. We would also like to set analytics cookies to count visits.</p>
          <div class="sp-row" style="gap: 8px">
            <button class="sp-button sp-button--sm" data-part="accept" type="button">Accept analytics</button>
            <button class="sp-button sp-button--sm" data-part="reject" type="button">Reject analytics</button>
            <button class="sp-button sp-button--quiet sp-button--sm" data-part="manage" type="button">Choose purposes</button>
          </div>
          <div data-part="purposes" hidden>
            <div class="sp-divider" style="margin: 12px 0 10px"></div>
            <div class="sp-row sp-row--between">
              <span class="sp-text sp-text--ink">Essential (always on)</span>
              <button class="sp-switch" type="button" role="switch" aria-checked="true" aria-label="Essential cookies" disabled></button>
            </div>
            <div class="sp-row sp-row--between" style="margin-top: 8px">
              <span class="sp-text sp-text--ink">Analytics</span>
              <button class="sp-switch" data-part="analytics" type="button" role="switch" aria-checked="false" aria-label="Analytics cookies"></button>
            </div>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="save" type="button" style="margin-top: 10px">Save choices</button>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context">
        <span class="sp-text" data-part="record" data-choice="none" role="status">${t.none}</span>
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="reopen" type="button">Reopen notice</button>
      </div>
    </div>
  `;let r=e(n,`banner`),i=e(n,`purposes`),a=e(n,`analytics`),o=e(n,`record`),s=0;for(let e of Object.values(t))o.textContent=e,s=Math.max(s,o.offsetWidth);o.style.minWidth=`${s}px`,o.textContent=t.none;let c=e=>{o.dataset.choice=e,o.textContent=t[e],r.hidden=e!==`none`};e(n,`accept`).addEventListener(`click`,()=>c(`accepted`)),e(n,`reject`).addEventListener(`click`,()=>c(`rejected`)),e(n,`save`).addEventListener(`click`,()=>c(a.getAttribute(`aria-checked`)===`true`?`accepted`:`rejected`)),e(n,`manage`).addEventListener(`click`,()=>{r.dataset.view=`choices`,i.hidden=!1}),a.addEventListener(`click`,()=>{a.setAttribute(`aria-checked`,String(a.getAttribute(`aria-checked`)!==`true`))}),e(n,`reopen`).addEventListener(`click`,()=>{r.dataset.view=`notice`,i.hidden=!0,a.setAttribute(`aria-checked`,`false`),c(`none`)})}export{n as mount};