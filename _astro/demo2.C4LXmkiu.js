import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=`display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 6px 2px; font-size: 11px`,i=(e,t,n)=>`
  <li class="sp-list-item">
    <span class="sp-avatar">${e}</span>
    <div class="sp-stack sp-grow" style="gap: 5px">
      <div class="sp-line" style="width: ${t}%"></div>
      <div class="sp-line" style="width: ${n}%"></div>
    </div>
  </li>`,a=(e,t)=>`
  <li class="sp-list-item">
    ${n(e)}
    <div class="sp-line" style="width: ${t}%"></div>
  </li>`,o=[{key:`inbox`,label:`Inbox`,glyph:`inbox`,screen:`<ul class="sp-list">${i(`AR`,78,54)}${i(`MK`,64,46)}${i(`TS`,82,38)}</ul>`},{key:`search`,label:`Search`,glyph:`search`,screen:`
      <span class="sp-label">Recent</span>
      <div class="sp-row sp-row--wrap" style="margin-top: 8px">
        <span class="sp-chip">tide charts</span>
        <span class="sp-chip">gulls</span>
        <span class="sp-chip">field notes</span>
      </div>`},{key:`saved`,label:`Saved`,glyph:`star`,screen:`<ul class="sp-list">${a(`star`,84)}${a(`star`,62)}${a(`star`,74)}</ul>`},{key:`alerts`,label:`Alerts`,glyph:`bell`,screen:`<ul class="sp-list">${a(`bell`,70)}${a(`bell`,88)}</ul>`}];function s(i){let a=o.map(e=>`
      <li style="flex: 1 1 0">
        <span class="sp-nav-item" data-part="dest-${e.key}" style="${r}">
          ${n(e.glyph)}<span>${e.label}</span>
        </span>
      </li>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 198px; height: 292px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" data-part="title">Inbox</span>
        </div>
        <div class="sp-body sp-context">${o.map(e=>`<div data-part="screen-${e.key}" hidden>${e.screen}</div>`).join(``)}</div>
        <nav
          data-part="bar"
          data-subject
          aria-label="Main"
          style="flex: 0 0 auto; padding: 4px; border-top: 1px solid var(--sp-line); background: var(--sp-surface)"
        >
          <ul class="sp-nav" style="flex-direction: row">${a}</ul>
        </nav>
      </div>
    </div>
  `;let s=e(i,`title`),c=n=>{for(let r of o){let a=e(i,`dest-${r.key}`),o=r.key===n.key;t(a,`data-current`,o),o?a.setAttribute(`aria-current`,`page`):a.removeAttribute(`aria-current`),e(i,`screen-${r.key}`).hidden=!o}s.textContent=n.label};for(let t of o)e(i,`dest-${t.key}`).addEventListener(`click`,()=>c(t));c(o[0])}export{s as mount};