import{n as e}from"./parts.C-YLuC7Q.js";var t=`example.com/plans`,n={none:`Nothing followed yet`,"new-tab":`Opened ${t} in a new tab`,followed:`Followed to ${t}`};function r(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 248px">
        <div class="sp-topbar sp-context">
          <span class="sp-chip sp-grow" style="justify-content: flex-start; cursor: default">example.com/help/change-your-plan</span>
        </div>
        <div class="sp-body">
          <div class="sp-surface" style="padding: 12px">
            <div class="sp-heading sp-context" style="font-size: 14px">Changing your plan</div>
            <p class="sp-prose" style="margin: 8px 0 0">
              Every workspace starts on the free tier. Compare what each tier includes on the
              <a
                href="https://example.com/plans"
                data-part="link"
                data-subject
                style="color: var(--sp-accent)"
              >plans page</a>, then upgrade from billing settings.
            </p>
          </div>
          <div class="sp-row sp-context" style="height: 24px; margin-top: 8px">
            <span class="sp-text" data-part="peek" style="font-size: 12px; white-space: nowrap"></span>
            <span
              class="sp-text sp-grow"
              data-part="trail"
              data-event="none"
              role="status"
              style="text-align: right; white-space: nowrap"
            >${n.none}</span>
          </div>
        </div>
      </div>
    </div>
  `;let r=e(t,`link`),i=e(t,`peek`),a=e(t,`trail`),o=e=>{a.dataset.event=e,a.textContent=n[e]};r.addEventListener(`pointerenter`,()=>{i.textContent=r.getAttribute(`href`)?.replace(/^https?:\/\//,``)??``}),r.addEventListener(`pointerleave`,()=>{i.textContent=``}),r.addEventListener(`click`,e=>{e.preventDefault(),r.setAttribute(`data-visited`,``),r.style.color=`var(--sp-muted)`,o(`followed`)}),r.addEventListener(`auxclick`,e=>{e.button===1&&(e.preventDefault(),o(`new-tab`))})}export{r as mount};