import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=`3`,r=(e,t,n,r,i)=>`
  <div class="sp-list-item" data-part="${e}" style="gap: 9px; padding: 5px 8px; align-items: center">
    <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">${t}</span>
    <span class="sp-grow" style="display: flex; flex-direction: column; gap: 1px">
      <span style="font-size: 12.5px; font-weight: 500">${n}</span>
      <span class="sp-label" style="font-size: 11px">${r}</span>
    </span>
    <span class="sp-label" data-part="${e}-age" style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">${i}</span>
  </div>`,i=(e,t)=>`
  <span class="sp-label" style="display: flex; gap: 8px; font-size: 11px; line-height: 12px">
    <span class="sp-grow">${e}</span>
    <span style="flex: 0 0 auto">${t}</span>
  </span>`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour workspace</span>
          <span style="position: relative; display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px" data-part="bell" data-unread="${n}">
            ${t(`bell`)}
            <span
              data-part="badge"
              style="position: absolute; top: 1px; right: 0; min-width: 14px; height: 14px; padding: 0 3px; border-radius: 999px;
                     background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 9px; font-weight: 600; line-height: 14px; text-align: center"
            >${n}</span>
          </span>
        </div>

        <div class="sp-body" style="padding: 8px">
          <div class="sp-surface" data-part="tray" data-subject style="display: flex; flex-direction: column; height: 100%; overflow: hidden">
            <div class="sp-row" style="gap: 8px; padding: 7px 8px 7px 12px; border-bottom: 1px solid var(--sp-line)">
              <span class="sp-heading sp-grow" style="font-size: 13px">Notifications</span>
              <button
                class="sp-button sp-button--ghost sp-button--sm"
                type="button"
                data-part="clear"
                style="padding: 3px 9px; font-size: 12px"
              >Clear all</button>
            </div>

            <div style="position: relative; flex: 1 1 auto; min-height: 0">
              <div
                data-part="list"
                style="position: absolute; inset: 0; padding: 4px 6px; transition: opacity 0.2s, visibility 0.2s"
              >
                ${r(`row-deploy`,`WA`,`Deploy finished`,`web-app · production`,`4 min ago`)}
                ${r(`row-mention`,`PJ`,`Priya mentioned you`,`Design review`,`22 min ago`)}

                <button
                  class="sp-list-item"
                  type="button"
                  data-part="group"
                  aria-expanded="false"
                  aria-controls="vd-nc-members"
                  style="width: 100%; gap: 9px; padding: 6px 8px; align-items: center; border: 0; background: transparent;
                         color: inherit; font: inherit; text-align: left; cursor: pointer"
                >
                  <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">BI</span>
                  <span class="sp-grow" style="display: flex; flex-direction: column; gap: 1px">
                    <span style="font-size: 12.5px; font-weight: 500">Billing</span>
                    <span class="sp-label" style="font-size: 11px">3 receipts</span>
                  </span>
                  <span class="sp-label" data-part="group-age" style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">1 hr ago</span>
                  ${t(`chevronRight`,`sp-icon--chevron`)}
                </button>

                <div
                  data-part="members"
                  id="vd-nc-members"
                  style="display: flex; flex-direction: column; gap: 1px; height: 40px; padding: 2px 12px 0 41px;
                         opacity: 0; visibility: hidden; transition: opacity 0.18s, visibility 0.18s"
                >
                  ${i(`Invoice 4821 paid`,`1 hr ago`)}
                  ${i(`Invoice 4822 paid`,`1 hr ago`)}
                  ${i(`Card ending 4417 expires soon`,`3 hr ago`)}
                </div>
              </div>

              <div
                class="sp-empty"
                data-part="empty"
                style="position: absolute; inset: 0; gap: 6px; padding: 12px; opacity: 0; visibility: hidden;
                       transition: opacity 0.2s, visibility 0.2s"
              >
                <span class="sp-empty-mark">${t(`bell`)}</span>
                <span class="sp-text sp-text--ink" style="font-size: 13px">You are all caught up</span>
                <span class="sp-label" style="font-size: 11px">Cleared items stay in Archive for 30 days</span>
                <button
                  class="sp-button sp-button--ghost sp-button--sm"
                  type="button"
                  data-part="restore"
                  style="margin-top: 2px; padding: 3px 9px; font-size: 12px"
                >Undo clear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(a,`list`),s=e(a,`empty`),c=e(a,`group`),l=e(a,`members`),u=e(a,`bell`),d=e(a,`badge`),f=e=>{c.setAttribute(`aria-expanded`,String(e)),l.style.opacity=e?`1`:`0`,l.style.visibility=e?`visible`:`hidden`},p=e=>{o.style.opacity=e?`0`:`1`,o.style.visibility=e?`hidden`:`visible`,s.style.opacity=e?`1`:`0`,s.style.visibility=e?`visible`:`hidden`,u.dataset.unread=e?`0`:n,d.style.visibility=e?`hidden`:`visible`,e&&f(!1)};c.addEventListener(`click`,()=>f(!0)),e(a,`clear`).addEventListener(`click`,()=>p(!0)),e(a,`restore`).addEventListener(`click`,()=>p(!1)),f(!1),p(!1)}export{a as mount};