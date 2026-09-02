import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n={w:96,h:54},r=8,i=n.w*2+r+20,a=[{key:`share`,title:`Share`,glyph:`share`,on:!0},{key:`alerts`,title:`Alerts`,glyph:`bell`,on:!1},{key:`agenda`,title:`Agenda`,glyph:`calendar`,on:!0},{key:`tune`,title:`Tuning`,glyph:`sliders`,on:!1}],o={on:`On, until 6pm`,off:`Off`};function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 246px; height: auto">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">System controls</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; gap: 16px">
          <div
            data-part="panel"
            style="display: grid; grid-template-columns: repeat(2, ${n.w}px); gap: ${r}px; width: ${i}px; padding: 10px;
                   border-radius: 14px; background: var(--sp-surface); border: 1px solid var(--sp-line)"
          >
            <button
              type="button"
              data-part="tile"
              data-subject
              data-state="off"
              aria-pressed="false"
              style="grid-column: 1 / -1; display: flex; align-items: center; gap: 10px; height: ${n.h}px; padding: 0 10px; border-radius: 10px;
                     background: var(--sp-sunken); border: 1px solid var(--sp-line); color: var(--sp-ink); font: inherit; text-align: left; cursor: pointer"
            >
              <span
                data-part="symbol"
                style="display: flex; align-items: center; justify-content: center; flex: 0 0 30px; width: 30px; height: 30px; border-radius: 9px;
                       background: var(--sp-surface); color: var(--sp-ink)"
              >${t(`eyeOff`)}</span>
              <span style="display: flex; flex-direction: column; gap: 1px; min-width: 0">
                <span data-part="title" style="font-size: 12.5px; font-weight: 500; white-space: nowrap">Deep Focus</span>
                <span class="sp-label" data-part="value" style="font-size: 11px; white-space: nowrap">${o.off}</span>
              </span>
            </button>
            ${a.map(e=>`
    <div
      class="sp-context"
      data-part="sys-${e.key}"
      data-state="${e.on?`on`:`off`}"
      style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; width: ${n.w}px; height: ${n.h}px;
             border-radius: 10px; background: ${e.on?`var(--sp-accent)`:`var(--sp-sunken)`};
             color: ${e.on?`var(--sp-accent-ink)`:`var(--sp-ink)`}; border: 1px solid var(--sp-line)"
    >
      ${t(e.glyph)}
      <span style="font-size: 11px; white-space: nowrap">${e.title}</span>
    </div>`).join(``)}
          </div>
        </div>
      </div>
    </div>
  `;let c=e(s,`tile`),l=e(s,`symbol`),u=e(s,`value`),d=e=>{c.dataset.state=e?`on`:`off`,c.setAttribute(`aria-pressed`,String(e)),c.style.background=e?`var(--sp-accent-soft)`:`var(--sp-sunken)`,c.style.borderColor=e?`var(--sp-accent)`:`var(--sp-line)`,l.style.background=e?`var(--sp-accent)`:`var(--sp-surface)`,l.style.color=e?`var(--sp-accent-ink)`:`var(--sp-ink)`,u.textContent=e?o.on:o.off};c.addEventListener(`click`,()=>d(c.dataset.state!==`on`)),d(!1)}export{s as mount};