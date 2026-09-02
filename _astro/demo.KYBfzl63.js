import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[{key:`inbox`,label:`Inbox`,glyph:`inbox`},{key:`starred`,label:`Starred`,glyph:`star`},{key:`schedule`,label:`Schedule`,glyph:`calendar`},{key:`settings`,label:`Settings`,glyph:`sliders`}],r=152,i=52;function a(a){let o=n.map(({key:e,label:n,glyph:r},i)=>`
      <li>
        <span class="sp-nav-item" data-part="nav-${e}" style="display: flex; align-items: center; gap: 8px"${i===0?` data-current`:``}>
          ${t(r)}
          <span data-part="label-${e}" style="white-space: nowrap">${n}</span>
        </span>
      </li>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px; flex-direction: row">
        <aside
          data-part="sidebar"
          data-subject
          data-mode="wide"
          style="width: ${r}px; flex: 0 0 auto; display: flex; flex-direction: column; gap: 12px; padding: 10px 8px; border-right: 1px solid var(--sp-line); background: var(--sp-surface); overflow: hidden; transition: width 0.24s var(--sp-ease)"
        >
          <div class="sp-row sp-row--between" style="min-height: 28px">
            <span class="sp-label" data-part="label-brand" style="padding-left: 2px; white-space: nowrap">Harbour</span>
            <button class="sp-icon-button" data-part="collapse" aria-label="Collapse sidebar">${t(`chevronLeft`)}</button>
            <button class="sp-icon-button" data-part="expand" aria-label="Expand sidebar" hidden>${t(`chevronRight`)}</button>
          </div>
          <nav aria-label="Sections">
            <ul class="sp-nav">${o}</ul>
          </nav>
          <div class="sp-row" data-part="footer" style="margin-top: auto; min-height: 28px">
            <span class="sp-avatar">MK</span>
            <span class="sp-label" data-part="label-account" style="white-space: nowrap">Mira K.</span>
          </div>
        </aside>
        <main class="sp-context sp-grow" style="padding: 14px 16px; background: var(--sp-sunken)">
          <span class="sp-heading">Inbox</span>
          <div class="sp-stack" style="margin-top: 12px">
            <div class="sp-line" style="width: 92%"></div>
            <div class="sp-line" style="width: 84%"></div>
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 62%"></div>
          </div>
        </main>
      </div>
    </div>
  `;let s=e(a,`sidebar`),c=e(a,`collapse`),l=e(a,`expand`),u=[e(a,`label-brand`),e(a,`label-account`),...n.map(({key:t})=>e(a,`label-${t}`))],d=e=>{let t=e===`rail`;s.dataset.mode=e,s.style.width=`${t?i:r}px`;for(let e of u)e.hidden=t;c.hidden=t,l.hidden=!t};c.addEventListener(`click`,()=>d(`rail`)),l.addEventListener(`click`,()=>d(`wide`))}export{a as mount};