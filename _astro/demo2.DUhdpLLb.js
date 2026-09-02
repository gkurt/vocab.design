import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[{key:`first`,name:`First recipe`,glyph:`check`,earned:!0},{key:`saves`,name:`Ten saved`,glyph:`heart`,earned:!0},{key:`night`,name:`Night owl`,glyph:`eye`,earned:!0},{key:`weeks`,name:`Five weeks`,glyph:`calendar`,earned:!1},{key:`batch`,name:`Big batch`,glyph:`inbox`,earned:!1},{key:`mentor`,name:`Ten answers`,glyph:`share`,earned:!1}],r={background:`var(--sp-accent-soft)`,border:`1px solid var(--sp-accent)`,color:`var(--sp-accent)`},i={background:`var(--sp-sunken)`,border:`1px dashed var(--sp-line)`,color:`var(--sp-muted)`};function a(e,t){e.style.background=t.background,e.style.border=t.border,e.style.color=t.color}function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 460px; height: 292px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-avatar" style="flex: 0 0 auto; width: 26px; height: 26px; font-size: 11px">DR</span>
          <span class="sp-grow" style="min-width: 0">
            <span class="sp-heading" style="display: block; font-size: 12.5px; line-height: 15px">Dana Ruiz</span>
            <span class="sp-label" style="display: block; font-size: 10px; line-height: 12px">Cooking since 2024</span>
          </span>
          <span class="sp-chip" data-part="count" data-earned="3" style="flex: 0 0 auto; padding: 2px 9px; font-size: 10.5px; cursor: default; white-space: nowrap">3 of 6 earned</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 9px">
          <div class="sp-surface" style="flex: 0 0 auto; padding: 12px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px">
            ${n.map(e=>`
    <div class="sp-stack" data-part="tile-${e.key}" style="align-items: center; gap: 4px; text-align: center">
      <span
        data-part="medal-${e.key}"
        data-state="${e.earned?`earned`:`locked`}"
        ${e.key===`weeks`?`data-subject`:``}
        style="flex: 0 0 auto; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; transition: background-color 0.24s var(--sp-ease), border-color 0.24s var(--sp-ease), color 0.24s var(--sp-ease)"
      >${t(e.glyph)}</span>
      <span class="sp-text sp-text--ink" style="flex: 0 0 auto; height: 14px; font-size: 10.5px; line-height: 14px; white-space: nowrap">${e.name}</span>
      <span class="sp-text" data-part="status-${e.key}" style="flex: 0 0 auto; height: 13px; font-size: 10px; line-height: 13px">${e.earned?`Earned`:`Locked`}</span>
    </div>
  `).join(``)}
          </div>

          <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 9px">
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="advance" type="button" style="flex: 0 0 auto; padding: 4px 9px; font-size: 11px; white-space: nowrap">Log a fifth week</button>
            <span class="sp-text" data-stage-verdict data-part="note" style="flex: 1 1 auto; font-size: 10.5px; line-height: 1.3">The fifth week is the milestone the dashed marker is waiting for.</span>
          </div>
        </div>
      </div>
    </div>
  `;for(let t of n)a(e(o,`medal-${t.key}`),t.earned?r:i);let s=e(o,`medal-weeks`),c=e(o,`status-weeks`),l=e(o,`count`),u=e(o,`advance`),d=e(o,`note`);u.addEventListener(`click`,()=>{s.dataset.state!==`earned`&&(s.dataset.state=`earned`,a(s,r),c.textContent=`Earned just now`,l.dataset.earned=`4`,l.textContent=`4 of 6 earned`,u.textContent=`Fifth week logged`,u.setAttribute(`aria-disabled`,`true`),d.textContent=`Awarded, dated, and not the kind of marker that goes away when the streak does.`)})}export{o as mount};