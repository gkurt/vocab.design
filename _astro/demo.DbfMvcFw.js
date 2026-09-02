import{n as e}from"./parts.C-YLuC7Q.js";var t=[{id:1,day:`Tue`,date:`2 Sep`},{id:2,day:`Tue`,date:`16 Sep`},{id:3,day:`Tue`,date:`30 Sep`},{id:4,day:`Tue`,date:`14 Oct`},{id:5,day:`Tue`,date:`28 Oct`},{id:6,day:`Tue`,date:`11 Nov`}],n=[{id:`this`,label:`This event`},{id:`following`,label:`This and following`},{id:`all`,label:`All events`}],r=64,i=t.map(e=>`
    <button
      type="button"
      data-part="occ-${e.id}"
      data-state="kept"
      data-scope="out"
      aria-label="${e.day} ${e.date}"
      style="flex: 0 0 auto; width: ${r}px; height: 34px; padding: 0; border: 1px solid var(--sp-line); border-radius: 6px;
             background: var(--sp-surface); color: var(--sp-ink); font: inherit; cursor: pointer"
    >
      <span style="display: block; font-size: 9px; color: var(--sp-muted); line-height: 1.2">${e.day}</span>
      <span data-part="date-${e.id}" style="display: block; font-size: 11px; line-height: 1.3">${e.date}</span>
    </button>`).join(``),a=n.map(e=>`<button type="button" class="sp-chip" data-part="scope-${e.id}" style="flex: 0 0 auto; font-size: 11px">${e.label}</button>`).join(``);function o(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 306px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Event</span>
          <span class="sp-label" style="flex: 0 0 auto; white-space: nowrap">Series</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center">
          <div class="sp-surface" style="flex: 0 0 auto; width: 442px; padding: 12px">
            <div class="sp-heading" style="font-size: 14px">Team standup</div>
            <div
              data-part="rule"
              data-subject
              data-exceptions="0"
              style="display: flex; align-items: baseline; gap: 6px; margin-top: 4px; font-size: 12px; color: var(--sp-muted)"
            >
              <span>Every second Tuesday at 9:30, until 16 Dec</span>
              <span data-part="rule-exceptions" style="flex: 0 0 auto; width: 84px; color: var(--sp-warn)"></span>
            </div>
            <div class="sp-divider" style="margin: 10px 0"></div>
            <span class="sp-label" style="font-size: 10px">Next six occurrences</span>
            <div style="display: flex; gap: 6px; margin-top: 5px">${i}</div>
            <div class="sp-divider" style="margin: 10px 0"></div>
            <span class="sp-label" style="font-size: 10px">This change applies to</span>
            <div class="sp-row" style="margin-top: 5px; gap: 6px">
              ${a}
              <span class="sp-grow"></span>
              <button type="button" class="sp-button sp-button--sm" data-part="apply" style="flex: 0 0 auto">Skip it</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(r,`rule`),s=e(r,`rule-exceptions`),c=new Map(t.map(t=>[t.id,e(r,`occ-${t.id}`)])),l=new Map(n.map(t=>[t.id,e(r,`scope-${t.id}`)])),u,d=`this`,f=new Set,p=e=>u===void 0?!1:d===`all`?!0:d===`following`?e>=u:e===u,m=()=>{for(let n of t){let t=c.get(n.id),i=e(r,`date-${n.id}`);if(!t)continue;let a=f.has(n.id),o=p(n.id);t.dataset.state=a?`skipped`:`kept`,t.dataset.scope=o?`in`:`out`,n.id===u?t.setAttribute(`data-selected`,``):t.removeAttribute(`data-selected`),t.style.background=a?`transparent`:o?`var(--sp-accent-soft)`:`var(--sp-surface)`,t.style.borderStyle=a?`dashed`:`solid`,t.style.borderColor=a?`var(--sp-line)`:o?`var(--sp-accent)`:`var(--sp-line)`,t.style.boxShadow=n.id===u?`inset 0 0 0 2px var(--sp-accent)`:`none`,t.style.color=a?`var(--sp-muted)`:`var(--sp-ink)`,i.style.textDecoration=a?`line-through`:`none`}for(let e of n){let t=l.get(e.id);t&&(e.id===d?t.setAttribute(`data-selected`,``):t.removeAttribute(`data-selected`))}o.dataset.exceptions=String(f.size),s.textContent=f.size?`${f.size} skipped`:``};for(let e of t)c.get(e.id)?.addEventListener(`click`,()=>{u=e.id,m()});for(let e of n)l.get(e.id)?.addEventListener(`click`,()=>{d=e.id,m()});e(r,`apply`).addEventListener(`click`,()=>{if(u!==void 0){for(let e of t)p(e.id)&&f.add(e.id);m()}}),m()}export{o as mount};