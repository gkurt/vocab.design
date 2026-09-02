import{n as e}from"./parts.C-YLuC7Q.js";var t=`example.com/invoices`,n=`example.com/invoices/2043`,r={rest:`Due 14 March. No reminders sent.`,acted:`Reminder sent just now.`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-chip sp-grow" data-part="address" data-page="list" style="justify-content: flex-start; cursor: default">${t}</span>
        </div>
        <div class="sp-body">
          <div class="sp-surface" style="padding: 12px">
            <div class="sp-row sp-row--between sp-context">
              <span class="sp-heading" style="font-size: 14px">Invoice 2043</span>
              <span class="sp-chip" data-part="status" data-state="unpaid" style="cursor: default">Unpaid</span>
            </div>
            <div class="sp-row" style="align-items: flex-start; gap: 12px; margin-top: 12px">
              <div class="sp-stack" style="gap: 4px">
                <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="action" data-subject>Send reminder</button>
              </div>
              <div class="sp-stack sp-context" style="gap: 4px">
                <a class="sp-button sp-button--ghost sp-button--sm" href="https://${n}" data-part="destination"
                   style="display: inline-flex; align-items: center; text-decoration: none">Open full invoice</a>
              </div>
            </div>
          </div>
          <div class="sp-row sp-context" style="height: 22px; margin-top: 8px">
            <span class="sp-text" data-part="peek" style="font-size: 12px; white-space: nowrap"></span>
            <span class="sp-text sp-grow" data-part="outcome" data-event="none"
                  style="font-size: 12px; white-space: nowrap; text-align: right">${r.rest}</span>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(i,`address`),o=e(i,`status`),s=e(i,`outcome`),c=e(i,`peek`),l=e(i,`destination`);e(i,`action`).addEventListener(`click`,()=>{o.dataset.state=`sent`,o.textContent=`Reminder sent`,s.dataset.event=`acted`,s.textContent=r.acted}),l.addEventListener(`pointerenter`,()=>{c.textContent=n}),l.addEventListener(`pointerleave`,()=>{c.textContent=``}),l.addEventListener(`click`,e=>{e.preventDefault(),a.dataset.page=`invoice`,a.textContent=n,s.dataset.event=`navigated`})}export{i as mount};