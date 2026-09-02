import{n as e,t}from"./parts.C-YLuC7Q.js";import{n}from"./measure.DK7AY2_i.js";var r=196,i=12;function a(a){let o=(e,t)=>`
    <li class="sp-list-item">
      <span class="sp-grow">${e}</span>
      <span class="sp-text">${t}</span>
    </li>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" data-part="frame" style="width: 420px; height: 236px">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Reports</span>
          <div style="position: relative">
            <button class="sp-button sp-button--ghost sp-button--sm sp-context" data-part="anchor" type="button">Group by</button>
            <button
              data-part="beacon"
              type="button"
              aria-label="What does Group by do?"
              style="position: absolute; top: -9px; right: -9px; display: flex; align-items: center; justify-content: center;
                     width: 20px; height: 20px; padding: 0; border: 0; border-radius: 50%; background: transparent; cursor: pointer"
            >
              <span
                class="sp-pulse"
                aria-hidden="true"
                style="width: 10px; height: 10px; border-radius: 50%; background: var(--sp-accent);
                       box-shadow: 0 0 0 3px var(--sp-accent-soft)"
              ></span>
            </button>
          </div>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 8px">
          <ul class="sp-list sp-surface">
            ${o(`Q3 revenue`,`9:04`)}
            ${o(`Churn by plan`,`Yesterday`)}
            ${o(`Trial funnel`,`Monday`)}
          </ul>
          <span class="sp-label" data-part="status">3 reports, newest first.</span>
        </div>

        <div
          class="sp-popover"
          data-part="callout"
          data-subject
          role="dialog"
          aria-label="Group by"
          style="z-index: 2; width: ${r}px"
        >
          <span class="sp-heading" style="font-size: 13px">Group by</span>
          <p class="sp-text" style="margin: 6px 0 10px">Stack rows under a shared owner or plan.</p>
          <div class="sp-row sp-row--between">
            <span class="sp-label" style="font-size: 11px">Tip 1 of 1</span>
            <button class="sp-button sp-button--sm" data-part="ack" type="button">Got it</button>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" style="gap: 8px">
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="rearm" type="button">Show the mark again</button>
      </div>
    </div>
  `;let s=e(a,`frame`),c=e(a,`beacon`),l=e(a,`anchor`),u=e(a,`callout`),d=e(a,`status`),f=()=>{let e=n(l,s),t=e.left+e.width/2,a=Math.min(Math.max(t-r+40,i),s.offsetWidth-r-i);u.style.left=`${a}px`,u.style.top=`${e.top+e.height+i}px`,u.style.setProperty(`--sp-arrow-x`,`${Math.round(t-a-4)}px`)},p=e=>{e&&f(),t(u,`data-open`,e)},m=e=>{c.hidden=!e,e||p(!1)};e(a,`beacon`).addEventListener(`click`,()=>p(!0)),e(a,`ack`).addEventListener(`click`,()=>m(!1)),e(a,`rearm`).addEventListener(`click`,()=>m(!0)),l.addEventListener(`click`,()=>{d.textContent=`Grouped by owner.`,d.dataset.grouped=``}),m(!0)}export{a as mount};