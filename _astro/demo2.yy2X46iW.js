import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`duplicate`,label:`Duplicate`},{key:`rename`,label:`Rename`},{key:`archive`,label:`Archive`}];function i(i){let a=r.map(({key:e,label:t})=>`<button class="sp-menu-item" role="menuitem" data-part="item-${e}" data-key="${e}">${t}</button>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Design tokens</span>
          <span style="position: relative">
            <button
              class="sp-button sp-button--ghost sp-button--sm sp-row"
              data-part="trigger"
              data-subject
              aria-haspopup="menu"
              aria-expanded="false"
              aria-controls="actions-menu"
              style="gap: 4px"
            >
              Actions
              ${n(`chevronDown`)}
            </button>
            <div class="sp-menu" id="actions-menu" data-part="menu" role="menu" aria-label="Actions" style="top: 34px; right: 0">
              ${a}
            </div>
          </span>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack">
            <div class="sp-line" style="width: 82%"></div>
            <div class="sp-line" style="width: 64%"></div>
            <div class="sp-line" style="width: 71%"></div>
          </div>
          <div class="sp-divider" style="margin: 14px 0"></div>
          <div class="sp-row sp-row--between">
            <span class="sp-label">Last command</span>
            <span class="sp-text" data-part="status" data-action="none">None yet</span>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(i,`trigger`),s=e(i,`menu`),c=e(i,`status`),l=e=>{t(s,`data-open`,e),t(o,`data-open`,e),o.setAttribute(`aria-expanded`,String(e))};o.addEventListener(`click`,()=>l(!0));for(let e of s.querySelectorAll(`.sp-menu-item`))e.addEventListener(`click`,()=>{c.dataset.action=e.dataset.key??`none`,c.textContent=(e.textContent??``).trim(),l(!1)});i.addEventListener(`keydown`,e=>{e.key===`Escape`&&l(!1)}),i.addEventListener(`pointerdown`,e=>{let t=e.target;!s.contains(t)&&!o.contains(t)&&l(!1)})}export{i as mount};