import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 210px; overflow: visible">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Q3 roadmap</span>
          <span class="sp-context"><button class="sp-icon-button" data-part="edit" aria-label="Edit">${n(`pencil`)}</button></span>
          <span style="position: relative">
            <button class="sp-icon-button" data-part="trigger" data-subject aria-haspopup="menu" aria-expanded="false" aria-label="More actions">
              ${n(`kebab`,`sp-icon--dots`)}
            </button>
            <div class="sp-menu" data-part="menu" role="menu" style="top: 32px; right: 0">
              <button class="sp-menu-item" role="menuitem" data-part="menu-rename">Rename</button>
              <button class="sp-menu-item" role="menuitem">Duplicate</button>
              <button class="sp-menu-item" role="menuitem">Move to…</button>
              <button class="sp-menu-item" role="menuitem">Delete</button>
            </div>
          </span>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack">
            <div class="sp-line" style="width: 86%"></div>
            <div class="sp-line" style="width: 62%"></div>
            <div class="sp-line" style="width: 74%"></div>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`menu`),a=e(r,`trigger`),o=e=>{t(i,`data-open`,e),t(a,`data-open`,e),a.setAttribute(`aria-expanded`,String(e))};a.addEventListener(`click`,()=>o(!0));for(let e of i.querySelectorAll(`.sp-menu-item`))e.addEventListener(`click`,()=>o(!1));r.addEventListener(`keydown`,e=>{e.key===`Escape`&&o(!1)}),r.addEventListener(`pointerdown`,e=>{let t=e.target;!i.contains(t)&&!a.contains(t)&&o(!1)})}export{r as mount};