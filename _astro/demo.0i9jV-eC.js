import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`copy`,label:`Save as a copy`,status:`Saved as a copy`},{key:`template`,label:`Save as a template`,status:`Saved as a template`}];function i(i){let a=r.map(({key:e,label:t})=>`<button class="sp-menu-item" role="menuitem" data-part="item-${e}" data-key="${e}">${t}</button>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Pitch deck</span></div>
        <div class="sp-body">
          <div class="sp-row sp-row--between">
            <span class="sp-text sp-context" data-part="status" data-action="none">Draft, not saved</span>
            <div data-part="split" data-subject role="group" aria-label="Save" style="position: relative; display: flex">
              <button class="sp-button" data-part="main" style="border-radius: var(--sp-radius) 0 0 var(--sp-radius)">Save</button>
              <span style="width: 1px; background: var(--sp-accent-ink); opacity: 0.35"></span>
              <button
                class="sp-button sp-row"
                data-part="arrow"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-controls="save-menu"
                aria-label="More save options"
                style="border-radius: 0 var(--sp-radius) var(--sp-radius) 0; padding: 7px 8px"
              >
                ${n(`chevronDown`)}
              </button>
              <div class="sp-menu" id="save-menu" data-part="menu" role="menu" aria-label="Save options" style="top: 38px; right: 0">
                ${a}
              </div>
            </div>
          </div>
          <div class="sp-divider sp-context" style="margin: 14px 0"></div>
          <div class="sp-stack sp-context">
            <div class="sp-line" style="width: 78%"></div>
            <div class="sp-line" style="width: 62%"></div>
            <div class="sp-line" style="width: 70%"></div>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(i,`main`),s=e(i,`arrow`),c=e(i,`menu`),l=e(i,`status`),u=e=>{t(c,`data-open`,e),s.setAttribute(`aria-expanded`,String(e))},d=(e,t)=>{l.dataset.action=e,l.textContent=t};o.addEventListener(`click`,()=>{u(!1),d(`save`,`Saved just now`)}),s.addEventListener(`click`,()=>u(!0));for(let e of c.querySelectorAll(`.sp-menu-item`)){let t=r.find(t=>t.key===e.dataset.key);e.addEventListener(`click`,()=>{t&&d(t.key,t.status),u(!1)})}i.addEventListener(`keydown`,e=>{e.key===`Escape`&&u(!1)}),i.addEventListener(`pointerdown`,e=>{let t=e.target;!c.contains(t)&&!s.contains(t)&&u(!1)})}export{i as mount};