import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=3,r=6e3,i=`or press Shift ${n} times`;function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 296px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Support</span>
          <span class="sp-label" style="font-size: 11px; white-space: nowrap">This device may not be private</span>
        </div>

        <div class="sp-body" data-part="view" data-state="page" style="position: relative">
          <div data-part="page" tabindex="0" style="position: absolute; inset: 12px; transition: opacity 0.18s, visibility 0.18s">
            <div class="sp-stack sp-context" style="gap: 7px; padding: 44px 4px 0">
              <span class="sp-heading" style="font-size: 13px">If you are being controlled or hurt at home</span>
              <p class="sp-text" style="margin: 0; font-size: 11.5px; line-height: 1.5">
                You can call the helpline at any hour. It is free, it does not appear on a phone bill, and you do not
                have to give your name.
              </p>
              <p class="sp-text" style="margin: 0; font-size: 11.5px; line-height: 1.5">
                Whoever controls this device may be able to see this page later. There are instructions further down
                for clearing your browser history, and the button above leaves now.
              </p>
            </div>

            <div style="position: absolute; top: 0; right: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 4px">
              <button
                class="sp-button"
                type="button"
                data-part="exit"
                data-subject
                style="display: inline-flex; align-items: center; gap: 6px; flex: 0 0 auto; padding: 6px 12px; font-size: 12.5px; white-space: nowrap"
              >${t(`share`)}Exit this page</button>
              <span
                class="sp-label sp-context"
                data-part="counter"
                data-count="0"
                style="height: 14px; font-size: 10.5px; line-height: 14px; white-space: nowrap"
                >${i}</span
              >
            </div>
          </div>

          <div
            class="sp-context"
            data-part="dest"
            style="position: absolute; inset: 12px; display: flex; flex-direction: column; justify-content: center; gap: 10px;
                   opacity: 0; visibility: hidden; transition: opacity 0.18s, visibility 0.18s"
          >
            <span class="sp-heading" style="font-size: 13px">Weather for the week</span>
            <div class="sp-row" style="gap: 8px">
              ${[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`].map(e=>`
                    <span class="sp-surface" style="display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1 1 auto; padding: 8px 0">
                      <span class="sp-label" style="font-size: 10.5px">${e}</span>
                      <span class="sp-line" style="width: 26px"></span>
                    </span>`).join(``)}
            </div>
            <p class="sp-text" data-stage-verdict data-part="note" style="margin: 0; font-size: 11.5px; line-height: 1.5">
              The support page was replaced in this tab's history rather than added to it, so going back does not
              return to it. That is all this control can promise: it cannot clear a synced history, a monitoring
              app, or a network log.
            </p>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reset" style="align-self: flex-start; font-size: 12px">
              Show the page again
            </button>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(a,`view`),c=e(a,`page`),l=e(a,`dest`),u=e(a,`counter`),d=0,f,p=e=>{d=e,u.dataset.count=String(e),u.textContent=e===0?i:`Shift ${e} of ${n}`},m=e=>{s.dataset.state=e?`left`:`page`,c.style.opacity=e?`0`:`1`,c.style.visibility=e?`hidden`:`visible`,l.style.opacity=e?`1`:`0`,l.style.visibility=e?`visible`:`hidden`,o.clearTimeout(f),f=void 0,p(0)};e(a,`exit`).addEventListener(`click`,()=>m(!0)),e(a,`reset`).addEventListener(`click`,()=>m(!1)),a.addEventListener(`keydown`,e=>{if(!(e.key!==`Shift`||e.repeat)&&s.dataset.state!==`left`){if(d+1>=n)return m(!0);p(d+1),o.clearTimeout(f),f=o.setTimeout(()=>p(0),r)}}),m(!1)}export{a as mount};