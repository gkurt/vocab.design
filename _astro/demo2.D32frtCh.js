import{t as e}from"./icons.CLHbLdSV.js";var t=[{part:`authored`,from:`Harbour Weekly`,time:`09:14`,subject:`Your tide tables for September`,preview:`Spring tides on the 9th, the ferry timetable changes on the 14th, and the boatyard reopens.`,source:`written`},{part:`scraped`,from:`Quay Books`,time:`08:02`,subject:`New this week at Quay Books`,preview:`View this email in your browser. Unsubscribe. Add us to your address book to keep receiving.`,source:`scraped`}],n=`display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis`;function r(e){return`
    <li class="sp-list-item" data-part="row-${e.part}" style="align-items: flex-start; gap: 10px; padding: 10px 11px">
      <span class="sp-grow" style="min-width: 0">
        <span class="sp-row sp-context" style="gap: 8px">
          <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 12px; font-weight: 500; ${n}">${e.from}</span>
          <span class="sp-text" style="flex: 0 0 auto; font-size: 11px">${e.time}</span>
        </span>
        <span class="sp-text sp-text--ink sp-context" style="margin-top: 2px; font-size: 13px; ${n}">${e.subject}</span>
        <span
          class="sp-text"
          data-part="${e.part}-preview"
          data-source="${e.source}"
          ${e.part===`authored`?`data-subject`:``}
          style="margin-top: 2px; font-size: 12px; ${n}"
        >${e.preview}</span>
      </span>
    </li>`}function i(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 224px">
        <div class="sp-topbar sp-context">
          ${e(`inbox`)}<span class="sp-heading sp-grow">Inbox</span><span class="sp-label">2 unread</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <ul class="sp-list sp-surface" data-part="list" style="flex: 0 0 auto; padding: 0 2px">
            ${t.map(r).join(``)}
          </ul>
        </div>
      </div>
    </div>
  `}export{i as mount};