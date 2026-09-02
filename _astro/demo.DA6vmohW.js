import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[`position: absolute`,`top: -3px`,`right: -5px`,`display: inline-flex`,`align-items: center`,`justify-content: center`,`min-width: 17px`,`height: 17px`,`padding: 0 4px`,`border: 2px solid var(--sp-surface)`,`border-radius: 999px`,`background: var(--sp-accent)`,`color: var(--sp-accent-ink)`,`font-size: 10px`,`font-weight: 700`,`line-height: 1`,`pointer-events: none`].join(`; `);function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Mailbox</span>
          <span data-part="host-count" style="position: relative; display: inline-flex; margin-right: 8px">
            <span class="sp-context" style="display: inline-flex">
              <button class="sp-icon-button" type="button" data-part="inbox" aria-label="Inbox, 9 unread">${t(`inbox`)}</button>
            </span>
            <span data-part="badge" data-subject data-count="9" style="${n}">9<span class="sp-visually-hidden"> unread</span></span>
          </span>
          <span class="sp-context" data-part="host-dot" style="position: relative; display: inline-flex">
            <button class="sp-icon-button" type="button" data-part="bell" aria-label="Alerts, updated">${t(`bell`)}</button>
            <span
              data-part="dot"
              style="position: absolute; top: 0; right: 0; width: 9px; height: 9px; border: 2px solid var(--sp-surface); border-radius: 50%; background: var(--sp-accent); pointer-events: none"
            ></span>
          </span>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <ul class="sp-list sp-surface" style="padding: 4px 6px">
            <li class="sp-list-item"><span class="sp-avatar">RK</span><span class="sp-grow">Rota for next week</span><span class="sp-label">09:14</span></li>
            <li class="sp-list-item"><span class="sp-avatar">TM</span><span class="sp-grow">Invoice 4192 is due</span><span class="sp-label">08:02</span></li>
            <li class="sp-list-item"><span class="sp-avatar">JD</span><span class="sp-grow">Re: harbour photos</span><span class="sp-label">Yesterday</span></li>
          </ul>
          <div class="sp-row sp-row--between" style="margin-top: auto">
            <span class="sp-text" data-part="readout" style="white-space: nowrap">Nothing has arrived yet</span>
            <button class="sp-button sp-button--sm" type="button" data-part="arrive" style="flex: 0 0 auto">Message arrives</button>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`badge`),a=e(r,`inbox`),o=e(r,`readout`),s=9;e(r,`arrive`).addEventListener(`click`,()=>{s+=1,i.dataset.count=String(s),i.innerHTML=`${s}<span class="sp-visually-hidden"> unread</span>`,a.setAttribute(`aria-label`,`Inbox, ${s} unread`),o.textContent=`One message arrived, one count went up`})}export{r as mount};