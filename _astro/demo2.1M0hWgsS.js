import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var r=[{mark:`PR`,who:`Priya`,text:`I can do Thursday instead`,at:`4:02`},{mark:`SA`,who:`Sam`,text:`Thursday works for me too`,at:`4:03`},{mark:`JO`,who:`Jo`,text:`Is the 8:15 ferry still running?`,at:`4:03`},{mark:`MW`,who:`Max`,text:`Timetable says 8:40 now`,at:`4:04`},{mark:`EL`,who:`Ella`,text:`Booking the later one then`,at:`4:05`},{mark:`PR`,who:`Priya`,text:`Sent the link to everyone`,at:`4:06`}],i={digest:`One row for the same six comments, with the count and the newest line. One interruption, and the reading is done before the app is opened.`,separate:`Six comments delivered as six alerts. The same information, six interruptions, and the last one buries the first.`};function a(a){let o=r.map(e=>`
      <div class="sp-surface sp-row" style="gap: 8px; height: 27px; padding: 0 8px; background: var(--sp-surface)">
        <span class="sp-label" style="flex: 0 0 auto; width: 22px; font-size: 10px">${e.mark}</span>
        <span class="sp-grow" style="font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${e.who}: ${e.text}</span>
        <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">${e.at}</span>
      </div>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Notifications</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="lane-pick" data-value="digest" data-axis="Delivery" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="pick-digest" type="button" value="digest" style="padding: 4px 9px; font-size: 12px">Digested</button>
            <button class="sp-segment" data-part="pick-separate" type="button" value="separate" style="padding: 4px 9px; font-size: 12px">As they arrive</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div class="sp-row sp-row--between sp-context" data-part="lane" data-interruptions="1" style="height: 18px">
            <span class="sp-label" style="font-size: 10px">Today</span>
            <span class="sp-label" data-part="cost" style="font-size: 10px">1 interruption</span>
          </div>
          <div data-part="box" style="position: relative; flex: 1 1 auto">

            <div data-part="digest-lane" style="position: absolute; inset: 0">
              <div
                class="sp-surface sp-row"
                data-part="digest"
                data-subject
                style="gap: 10px; height: 54px; padding: 0 10px; background: var(--sp-surface); box-shadow: var(--sp-shadow)"
              >
                ${n(`bell`)}
                <span class="sp-grow" style="min-width: 0">
                  <span class="sp-heading" style="display: block; font-size: 12px">6 new comments on Ferry timetable</span>
                  <span class="sp-text" style="display: block; margin-top: 1px; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">Priya: Sent the link to everyone</span>
                </span>
                <span class="sp-chip" style="flex: 0 0 auto; padding: 2px 8px; font-size: 11px; white-space: nowrap; cursor: default">6</span>
              </div>
            </div>

            <div class="sp-stack sp-context" data-part="separate-lane" hidden style="position: absolute; inset: 0; gap: 4px">${o}</div>

          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px; line-height: 1.35">${i.digest}</span>
    </div>
  `;let s=e(a,`digest-lane`),c=e(a,`separate-lane`),l=e(a,`lane`),u=e(a,`cost`),d=e(a,`note`);e(a,`lane-pick`).addEventListener(`change`,e=>{let n=e.detail===`separate`?`separate`:`digest`;t(s,`hidden`,n!==`digest`),t(c,`hidden`,n!==`separate`),l.dataset.interruptions=n===`digest`?`1`:`6`,u.textContent=n===`digest`?`1 interruption`:`6 interruptions`,d.textContent=i[n]})}export{a as mount};