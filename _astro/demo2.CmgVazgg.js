import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`inbox`,name:`Inbox`,glyph:`inbox`,rows:[`Ferry timetable change`,`Bookbinder, ready Friday`,`Two receipts`]},{key:`calendar`,name:`Calendar`,glyph:`calendar`,rows:[`Tue 09:30 Studio visit`,`Wed 14:00 Print run`,`Fri 18:00 Ferry`]},{key:`search`,name:`Search`,glyph:`search`,rows:[`Recent: paper weights`,`Recent: ferry pass`,`Recent: Kew opening`]},{key:`settings`,name:`Settings`,glyph:`sliders`,rows:[`Account`,`Notifications`,`Storage`]}],i=[[20,16],[124,16],[20,52],[124,52]],a=[72,34],o={hub:`Every task hangs off this one screen, and the map beside it has no edge between any two of them. That is the shape, and the whole of it.`,spoke:`Inside a task there is one way out and it goes home. Crossing to another task means leaving this one, returning to the hub, and starting again from there.`};function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 214px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" data-part="title" style="font-size: 13px">Home</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">

          <div class="sp-grid" data-part="hub" data-subject style="grid-template-columns: repeat(4, 1fr); gap: 10px">${r.map(e=>`
      <button
        class="sp-surface"
        type="button"
        data-part="tile-${e.key}"
        style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; height: 88px; padding: 0; font: inherit; font-size: 12px; color: var(--sp-ink); cursor: pointer"
      >
        <span style="display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 10px; background: var(--sp-accent-soft); color: var(--sp-accent)">${n(e.glyph)}</span>
        ${e.name}
      </button>`).join(``)}</div>

          <div class="sp-stack" data-part="spoke" data-task="none" style="gap: 8px" hidden>
            <div class="sp-row">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="back">Back to home</button>
            </div>
            <ul class="sp-list sp-surface sp-context" data-part="task-rows" style="padding: 2px 8px"></ul>
          </div>

        </div>
      </div>
      <div class="sp-row sp-context" style="width: 452px; gap: 14px; align-items: center">
        <svg role="img" aria-label="A star graph: four task nodes, each joined only to the hub in the centre" viewBox="0 0 144 68" width="144" height="68" style="flex: 0 0 auto">
          ${i.map(([e,t])=>`<line x1="${a[0]}" y1="${a[1]}" x2="${e}" y2="${t}" stroke="var(--sp-line)" stroke-width="2" />`).join(``)}
          ${i.map(([e,t],n)=>`<circle data-part="node-${r[n]?.key}" cx="${e}" cy="${t}" r="6" fill="var(--sp-line)" />`).join(``)}
          <circle data-part="node-hub" cx="${a[0]}" cy="${a[1]}" r="9" fill="var(--sp-accent)" />
        </svg>
        <span class="sp-text" data-stage-verdict data-part="note" style="flex: 1 1 auto; height: 44px; font-size: 11px">${o.hub}</span>
      </div>
    </div>
  `;let c=e(s,`hub`),l=e(s,`spoke`),u=e(s,`title`),d=e(s,`task-rows`),f=e(s,`note`),p=t=>{e(s,`node-hub`).setAttribute(`fill`,t===`hub`?`var(--sp-accent)`:`var(--sp-line)`);for(let n of r)e(s,`node-${n.key}`).setAttribute(`fill`,t===n.key?`var(--sp-accent)`:`var(--sp-line)`)},m=()=>{t(c,`hidden`,!1),t(l,`hidden`,!0),l.dataset.task=`none`,u.textContent=`Home`,f.textContent=o.hub,p(`hub`)},h=e=>{d.innerHTML=e.rows.map(e=>`<li class="sp-list-item">${e}</li>`).join(``),l.dataset.task=e.key,t(c,`hidden`,!0),t(l,`hidden`,!1),u.textContent=e.name,f.textContent=o.spoke,p(e.key)};for(let t of r)e(s,`tile-${t.key}`).addEventListener(`click`,()=>h(t));e(s,`back`).addEventListener(`click`,m)}export{s as mount};