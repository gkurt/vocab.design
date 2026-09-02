import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[{key:`1`,date:`12 Mar`,iso:`2025-03-12`,label:`Keel laid`,done:!0},{key:`2`,date:`04 May`,iso:`2025-05-04`,label:`Frames fitted`,done:!0},{key:`3`,date:`19 Jun`,iso:`2025-06-19`,label:`Hull launched`,done:!0,note:`Towed to the fitting-out quay that evening; trials followed.`},{key:`4`,date:`28 Aug`,iso:`2025-08-28`,label:`Rig stepped`,done:!1},{key:`5`,date:`15 Oct`,iso:`2025-10-15`,label:`Sea trials`,done:!1}],r=42;function i(e,n){let i=e.done?`background: var(--sp-accent); border-color: var(--sp-accent)`:`background: var(--sp-surface)`,a=n?``:`<span aria-hidden="true" style="position: absolute; left: 5px; top: 18px; bottom: -6px; width: 1px; background: var(--sp-line)"></span>`,o=e.note?`
      <div data-part="slot-${e.key}" style="height: ${r}px; margin-top: 2px">
        <button
          class="sp-button sp-button--quiet sp-button--sm"
          type="button"
          data-part="details"
          aria-expanded="false"
          aria-controls="vd-tl-note"
          style="padding-left: 0"
        >Details</button>
        <div class="sp-row" data-part="note" id="vd-tl-note" hidden style="align-items: flex-start; gap: 6px">
          <span class="sp-text sp-grow" style="font-size: 12px">${e.note}</span>
          <button
            class="sp-icon-button"
            type="button"
            data-part="note-hide"
            aria-label="Hide detail"
            style="width: 22px; height: 22px"
          >${t(`close`)}</button>
        </div>
      </div>`:``;return`
    <li data-part="entry-${e.key}" style="position: relative; padding: 0 0 14px 20px">
      ${a}
      <span
        aria-hidden="true"
        style="position: absolute; left: 0; top: 5px; width: 11px; height: 11px; border: 1px solid var(--sp-line); border-radius: 50%; ${i}"
      ></span>
      <div class="sp-row" style="gap: 10px">
        <time class="sp-label" datetime="${e.iso}" style="width: 46px; flex: 0 0 auto">${e.date}</time>
        <span class="sp-text sp-text--ink sp-grow">${e.label}</span>
      </div>
      ${o}
    </li>`}function a(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 320px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Hull 214</span>
          <span class="sp-label">2025</span>
        </div>
        <div class="sp-body" style="padding: 14px 16px">
          <ol
            class="sp-list sp-surface"
            data-part="timeline"
            data-subject
            style="padding: 14px 14px 2px; margin: 0; list-style: none"
          >
            ${n.map((e,t)=>i(e,t===n.length-1)).join(``)}
          </ol>
        </div>
      </div>
    </div>
  `;let r=e(t,`details`),a=e(t,`note`),o=e(t,`note-hide`),s=e=>{a.hidden=!e,r.hidden=e,r.setAttribute(`aria-expanded`,String(e))};r.addEventListener(`click`,()=>s(!0)),o.addEventListener(`click`,()=>s(!1))}export{a as mount};