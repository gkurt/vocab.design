import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[{key:`inbox`,label:`Inbox`,glyph:`inbox`,heading:`Inbox`,note:`12 unread since Tuesday.`},{key:`agenda`,label:`Agenda`,glyph:`calendar`,heading:`Agenda`,note:`Three slots left this week.`},{key:`saved`,label:`Saved`,glyph:`star`,heading:`Saved`,note:`Eight threads kept for later.`},{key:`settings`,label:`Settings`,glyph:`sliders`,heading:`Settings`,note:`Notifications, rules, signatures.`}],r=76,i=46,a=6,o=52,s=46,c=30;function l(l){let u=n.map(({key:e,label:r,glyph:o},s)=>`
      <button
        type="button"
        data-part="nav-${e}"
        data-key="${e}"
        style="position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center;
               gap: 2px; width: 100%; height: ${i}px; margin-bottom: ${s===n.length-1?0:a}px;
               padding: 0; border: 0; background: transparent; color: var(--sp-muted); font: inherit; cursor: pointer"
      >
        <span style="display: flex; align-items: center; justify-content: center; height: ${c}px">${t(o)}</span>
        <span style="font-size: 11px; line-height: 1">${r}</span>
      </button>`).join(``);l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 282px; flex-direction: row">
        <nav
          data-part="rail"
          data-subject
          aria-label="Sections"
          style="width: ${r}px; flex: 0 0 auto; display: flex; flex-direction: column; align-items: center;
                 gap: 10px; padding: 10px 0; background: var(--sp-surface); border-right: 1px solid var(--sp-line)"
        >
          <button
            class="sp-button sp-context"
            type="button"
            data-part="compose"
            aria-label="New message"
            style="display: flex; align-items: center; justify-content: center; width: 44px; height: 36px;
                   padding: 0; border-radius: 12px"
          >${t(`plus`)}</button>
          <div data-part="items" style="position: relative; width: 100%">
            <span
              data-part="indicator"
              aria-hidden="true"
              style="position: absolute; left: ${30/2}px; top: 0; width: ${s}px; height: ${c}px;
                     border-radius: 999px; background: var(--sp-accent-soft); transition: top 0.24s var(--sp-ease)"
            ></span>
            ${u}
          </div>
        </nav>
        <main class="sp-context sp-grow" data-part="pane" data-view="inbox" style="padding: 14px 16px; background: var(--sp-sunken)">
          <span class="sp-heading" data-part="pane-title">Inbox</span>
          <p class="sp-text" data-part="pane-note" style="margin: 6px 0 12px; height: 18px">12 unread since Tuesday.</p>
          <div class="sp-stack">
            <div class="sp-surface" style="height: 34px"></div>
            <div class="sp-surface" style="height: 34px"></div>
            <div class="sp-surface" style="height: 34px"></div>
          </div>
        </main>
      </div>
    </div>
  `;let d=e(l,`indicator`),f=e(l,`pane`),p=e(l,`pane-title`),m=e(l,`pane-note`),h=n.map(t=>e(l,`nav-${t.key}`)),g=e=>{let t=n.findIndex(t=>t.key===e),r=n[t];r&&(d.style.top=`${t*o}px`,h.forEach((e,n)=>{let r=n===t;e.style.color=r?`var(--sp-ink)`:`var(--sp-muted)`,r?e.setAttribute(`data-current`,``):e.removeAttribute(`data-current`),r?e.setAttribute(`aria-current`,`page`):e.removeAttribute(`aria-current`)}),f.dataset.view=e,p.textContent=r.heading,m.textContent=r.note)};for(let e of h)e.addEventListener(`click`,()=>g(e.dataset.key??``));g(`inbox`)}export{l as mount};