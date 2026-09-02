import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`rename`,label:`Rename`,mark:`pencil`},{key:`move`,label:`Move to folder`,mark:`share`},{key:`archive`,label:`Archive`,mark:`inbox`},{key:`delete`,label:`Delete`,mark:`trash`}];function i(i){let a=r.map(({key:e,label:t,mark:r})=>`
      <button class="sp-menu-item" role="menuitem" data-part="item-${e}" data-key="${e}">
        ${n(r)}
        <span>${t}</span>
      </button>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 204px">
        <div class="sp-topbar" role="toolbar" aria-label="Document actions" style="gap: 4px">
          <span class="sp-context" style="display: contents">
            <button class="sp-icon-button" data-part="act-star" aria-label="Star">${n(`star`)}</button>
            <button class="sp-icon-button" data-part="act-copy" aria-label="Duplicate">${n(`copy`)}</button>
            <button class="sp-icon-button" data-part="act-share" aria-label="Share">${n(`share`)}</button>
          </span>
          <span class="sp-grow"></span>
          <div style="position: relative">
            <span class="sp-context">
              <button
                class="sp-button sp-button--quiet sp-button--sm"
                data-part="more"
                aria-haspopup="menu"
                aria-expanded="false"
                style="display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; flex: 0 0 auto"
              >
                <span>More</span>
                <span data-part="chev" style="display: inline-flex; transition: transform 0.18s var(--sp-ease)">${n(`chevronDown`)}</span>
              </button>
            </span>
            <div class="sp-menu" data-part="menu" data-subject role="menu" aria-label="More actions" style="top: 32px; right: 0; min-width: 168px">
              ${a}
            </div>
          </div>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" style="flex: 1 1 auto; padding: 12px; display: flex; flex-direction: column; gap: 8px">
            <span class="sp-line" style="width: 62%"></span>
            <span class="sp-line" style="width: 84%"></span>
            <span class="sp-line" style="width: 46%"></span>
          </div>
          <span class="sp-text" data-part="readout" data-value="none" role="status" style="white-space: nowrap">No action run yet</span>
        </div>
      </div>
    </div>
  `;let o=e(i,`more`),s=e(i,`menu`),c=e(i,`chev`),l=e(i,`readout`),u=e=>{t(s,`data-open`,e),t(o,`data-open`,e),o.setAttribute(`aria-expanded`,String(e)),c.style.transform=e?`rotate(180deg)`:`rotate(0deg)`};o.addEventListener(`click`,()=>u(!0));for(let{key:t,label:n}of r)e(i,`item-${t}`).addEventListener(`click`,()=>{l.dataset.value=t,l.textContent=`${n} ran`,u(!1)});i.addEventListener(`keydown`,e=>{e.key===`Escape`&&u(!1)}),i.addEventListener(`pointerdown`,e=>{let t=e.target;!s.contains(t)&&!o.contains(t)&&u(!1)})}export{i as mount};