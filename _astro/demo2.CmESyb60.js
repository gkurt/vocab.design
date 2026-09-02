import{n as e,t}from"./parts.C-YLuC7Q.js";import{n}from"./measure.DK7AY2_i.js";var r=202,i=10,a=`Nothing exported yet`,o=`Exported 24 rows as CSV`;function s(s){let c=(e,t)=>`
    <li class="sp-list-item">
      <span class="sp-grow">${e}</span>
      <span class="sp-text">${t}</span>
    </li>`;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" data-part="frame" style="width: 320px; height: 234px">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Reports</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="app-export" type="button" style="position: relative">
            Export
            <span data-part="new-dot" aria-hidden="true"
                  style="position: absolute; top: -3px; right: -3px; width: 8px; height: 8px; border-radius: 50%; background: var(--sp-accent)"></span>
          </button>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 8px">
          <ul class="sp-list sp-surface">
            ${c(`Q3 revenue`,`9:04`)}
            ${c(`Churn by plan`,`Yesterday`)}
            ${c(`Trial funnel`,`Monday`)}
          </ul>
          <span class="sp-label" data-part="status" role="status">${a}</span>
        </div>

        <div data-part="spot" style="position: absolute; z-index: 1; pointer-events: none; border-radius: 8px; outline: 2px solid var(--sp-accent); box-shadow: 0 0 0 999px var(--sp-scrim)"></div>

        <div class="sp-surface" data-part="bubble" data-subject role="dialog" aria-label="What is new"
             style="position: absolute; z-index: 2; width: ${r}px; padding: 12px; box-shadow: var(--sp-shadow)">
          <span class="sp-chip" style="background: var(--sp-accent-soft); border-color: transparent; cursor: default; font-weight: 600">New</span>
          <p class="sp-text sp-text--ink" style="margin: 8px 0 10px">Export straight to CSV. No spreadsheet step, no reformatting.</p>
          <div class="sp-row sp-row--between">
            <span class="sp-label" style="font-size: 11px">Added this week</span>
            <button class="sp-button sp-button--sm" data-part="ack" type="button">Got it</button>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" style="gap: 8px">
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="replay" type="button">Show the announcement again</button>
      </div>
    </div>
  `;let l=e(s,`frame`),u=e(s,`app-export`),d=e(s,`spot`),f=e(s,`bubble`),p=e(s,`new-dot`),m=e(s,`status`),h=()=>{let e=n(u,l);d.style.left=`${e.left-5}px`,d.style.top=`${e.top-5}px`,d.style.width=`${e.width+10}px`,d.style.height=`${e.height+10}px`;let t=e.left+e.width/2-r/2;f.style.left=`${Math.min(Math.max(t,i),l.offsetWidth-r-i)}px`,f.style.top=`${e.top+e.height+i}px`},g=e=>{d.hidden=!e,f.hidden=!e,p.hidden=!e,t(l,`data-seen`,!e),e&&h()};e(s,`ack`).addEventListener(`click`,()=>g(!1)),e(s,`replay`).addEventListener(`click`,()=>g(!0)),u.addEventListener(`click`,()=>{m.textContent=o,m.dataset.done=``}),g(!0)}export{s as mount};