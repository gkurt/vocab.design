import{n as e}from"./parts.C-YLuC7Q.js";var t={sending:`Sending`,sent:`Sent`,delivered:`Delivered`,read:`Read`},n={sending:900,sent:1300,delivered:1600,read:0},r={sending:`sent`,sent:`delivered`,delivered:`read`},i=[`Are we still on for Thursday?`,`Bring the tide tables if you have them.`];function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 440px; height: 230px">
        <div class="sp-topbar sp-context">
          <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">ID</span>
          <span class="sp-heading sp-grow" style="font-size: 13px">Ines Duarte</span>
          <span class="sp-text">Thursday</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: flex-end; gap: 8px">
          ${i.map(e=>`
      <div class="sp-row sp-context" style="justify-content: flex-start">
        <span class="sp-text sp-text--ink" style="max-width: 220px; padding: 7px 10px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 12px 12px 12px 3px; font-size: 12px">${e}</span>
      </div>`).join(``)}
          <div class="sp-row" style="justify-content: flex-end">
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px; width: 236px; padding: 7px 10px; background: var(--sp-accent-soft); border-radius: 12px 12px 3px 12px">
              <span class="sp-text sp-text--ink" style="align-self: flex-start; font-size: 12px">Yes, 9am at the harbour office. Tables are in my bag.</span>
              <span
                class="sp-row"
                data-part="marker"
                data-subject
                data-state="sent"
                role="status"
                style="justify-content: flex-end; gap: 4px; width: 96px; height: 14px; color: var(--sp-muted)"
              >
                <span data-part="marker-label" style="font-size: 10px; line-height: 14px; white-space: nowrap">Sent</span>
                <span data-part="marker-time" hidden style="font-size: 10px; line-height: 14px; white-space: nowrap">14:32</span>
                <span data-part="tick-wait" hidden style="display: inline-block; width: 11px; height: 11px; border: 1.6px solid currentColor; border-radius: 50%"></span>
                <span data-part="tick-single" style="display: inline-flex"><svg viewBox="0 0 18 12" width="15" height="10" aria-hidden="true"><path d="M1.8 6.4 5.2 9.8 12.6 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                <span data-part="tick-double" hidden style="display: inline-flex"><svg viewBox="0 0 18 12" width="15" height="10" aria-hidden="true"><path d="M1.4 6.4 4.4 9.6 10.4 2.4M7.2 6.4 10.2 9.6 16.2 2.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="sp-row sp-context">
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="send" type="button" style="flex: 0 0 auto; white-space: nowrap">Send again</button>
      </div>
    </div>
  `;let s=e(a,`marker`),c=e(a,`marker-label`),l=e(a,`marker-time`),u=e(a,`tick-wait`),d=e(a,`tick-single`),f=e(a,`tick-double`),p,m=e=>{s.dataset.state=e,c.textContent=t[e],l.hidden=e!==`read`,u.hidden=e!==`sending`,d.hidden=e!==`sent`,f.hidden=e!==`delivered`&&e!==`read`,s.style.color=e===`read`?`var(--sp-accent)`:`var(--sp-muted)`},h=e=>{m(e);let t=r[e];t&&(p=o.setTimeout(()=>h(t),n[e]))};e(a,`send`).addEventListener(`click`,()=>{o.clearTimeout(p),h(`sending`)}),m(`sent`)}export{a as mount};