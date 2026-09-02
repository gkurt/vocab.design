import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`newest`,label:`Newest`},{key:`oldest`,label:`Oldest`},{key:`priority`,label:`Priority`},{key:`assignee`,label:`Assignee`}],i=`newest`;function a(a){let o=r.map(({key:e,label:t})=>`
      <button class="sp-menu-item" role="menuitemradio" data-part="opt-${e}" data-key="${e}" aria-checked="${e===i}">
        <span style="width: 14px; display: inline-flex">${e===i?n(`check`):``}</span>
        <span>${t}</span>
      </button>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 200px">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Issues</span>
          <div style="position: relative">
            <span class="sp-context">
              <button
                class="sp-button sp-button--quiet"
                data-part="trigger"
                data-value="${i}"
                aria-haspopup="menu"
                aria-expanded="false"
                style="display: inline-flex; align-items: center; justify-content: space-between; gap: 6px; white-space: nowrap; flex: 0 0 auto; min-width: 120px"
              >
                <span data-part="label">Newest</span>
                <span data-part="chev" style="display: inline-flex; transition: transform 0.18s var(--sp-ease)">${n(`chevronDown`)}</span>
              </button>
            </span>
            <div class="sp-menu" data-part="panel" data-subject role="menu" aria-label="Sort order" style="top: 36px; right: 0; min-width: 148px">
              ${o}
            </div>
          </div>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack">
            <div class="sp-surface sp-row" style="padding: 8px 10px">
              <span class="sp-line" style="width: 120px"></span>
            </div>
            <div class="sp-surface sp-row" style="padding: 8px 10px">
              <span class="sp-line" style="width: 168px"></span>
            </div>
            <div class="sp-surface sp-row" style="padding: 8px 10px">
              <span class="sp-line" style="width: 92px"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(a,`trigger`),c=e(a,`panel`),l=e(a,`label`),u=e(a,`chev`),d=e=>{t(c,`data-open`,e),t(s,`data-open`,e),s.setAttribute(`aria-expanded`,String(e)),u.style.transform=e?`rotate(180deg)`:`rotate(0deg)`},f=e=>{let t=r.find(t=>t.key===e.dataset.key);if(t){for(let t of c.children)t.setAttribute(`aria-checked`,String(t===e));for(let t of c.children){let r=t.firstElementChild;r&&(r.innerHTML=t===e?n(`check`):``)}s.dataset.value=t.key,l.textContent=t.label,d(!1)}};s.addEventListener(`click`,()=>d(!0));for(let t of r)e(a,`opt-${t.key}`).addEventListener(`click`,e=>f(e.currentTarget));a.addEventListener(`keydown`,e=>{e.key===`Escape`&&d(!1)}),a.addEventListener(`pointerdown`,e=>{let t=e.target;!c.contains(t)&&!s.contains(t)&&d(!1)})}export{a as mount};