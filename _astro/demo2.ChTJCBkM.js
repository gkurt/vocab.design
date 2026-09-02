import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n={brief:{title:`Harbour brief`,body:`A document, opened from a link somebody sent this morning.`},dashboard:{title:`Workspace dashboard`,body:`Every project the team has, most recently touched first.`},files:{title:`Home folder`,body:`Your own files, the ones nobody else on the team can see.`}},r={none:`Nothing pressed yet.`,dashboard:`Home in the toolbar went to the workspace dashboard.`,files:`Home in the sidebar went to your own files.`},i=[{key:`home`,label:`Home`,context:!1},{key:`shared`,label:`Shared`,context:!0},{key:`recent`,label:`Recent`,context:!0}];function a(a){let o=i.map(({key:e,label:t,context:n})=>`<li><span class="sp-nav-item${n?` sp-context`:``}" data-part="nav-${e}">${t}</span></li>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar" style="padding: 8px 10px">
          <span class="sp-heading sp-grow sp-context" style="font-size: 13px">Meridian</span>
          <button class="sp-button sp-button--quiet sp-button--sm" data-part="bar-home" type="button" data-subject>Home</button>
          <button class="sp-icon-button sp-context" data-part="bar-search" type="button" aria-label="Search">${t(`search`)}</button>
        </div>
        <div class="sp-row" style="flex: 1 1 auto; min-height: 0; gap: 0; align-items: stretch">
          <nav aria-label="Sections" style="flex: 0 0 116px; padding: 10px 8px; border-right: 1px solid var(--sp-line)">
            <ul class="sp-nav">${o}</ul>
          </nav>
          <main class="sp-context" data-part="view" data-view="brief"
            style="flex: 1 1 auto; min-width: 0; padding: 12px; background: var(--sp-sunken); overflow: hidden">
            <span class="sp-heading" data-part="view-title" style="display: block; height: 22px; font-size: 14px">${n.brief.title}</span>
            <span class="sp-text" data-part="view-body" style="display: block; height: 36px; margin-top: 6px; font-size: 12px">
              ${n.brief.body}
            </span>
            <div class="sp-stack" style="margin-top: 12px; gap: 7px">
              <span class="sp-line" style="width: 100%"></span>
              <span class="sp-line" style="width: 84%"></span>
              <span class="sp-line" style="width: 62%"></span>
            </div>
          </main>
        </div>
        <div class="sp-row" style="flex: 0 0 auto; height: 32px; padding: 0 12px; border-top: 1px solid var(--sp-line)">
          <span class="sp-label sp-context" data-part="dest" data-where="none" role="status"
            style="font-size: 11px; white-space: nowrap">${r.none}</span>
        </div>
      </div>
    </div>
  `;let s=e(a,`view`),c=e(a,`view-title`),l=e(a,`view-body`),u=e(a,`dest`),d=e=>{s.dataset.view=e,c.textContent=n[e].title,l.textContent=n[e].body,u.dataset.where=e,u.textContent=r[e]};e(a,`bar-home`).addEventListener(`click`,()=>d(`dashboard`)),e(a,`nav-home`).addEventListener(`click`,()=>d(`files`))}export{a as mount};