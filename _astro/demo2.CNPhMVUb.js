import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 250px">
        <div class="sp-topbar sp-context">
          <button
            class="sp-button sp-button--quiet sp-button--sm"
            type="button"
            data-part="trigger"
            aria-haspopup="menu"
            aria-expanded="false"
          >Edit</button>
          <span class="sp-grow"></span>
          <span class="sp-label">Minutes, draft 3</span>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack" style="gap: 8px">
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 96%"></div>
            <div class="sp-line" style="width: 62%"></div>
          </div>
          <div style="height: 18px; margin-top: 18px">
            <span class="sp-label" data-part="readout" data-choice="none">Nothing pasted yet</span>
          </div>
        </div>
        <div class="sp-menu" data-part="menu" role="menu" aria-label="Edit" style="left: 10px; top: 44px">
          <button class="sp-menu-item" type="button" role="menuitem" data-part="item-undo">Undo</button>
          <button class="sp-menu-item" type="button" role="menuitem">Cut</button>
          <button
            class="sp-menu-item"
            type="button"
            role="menuitem"
            data-part="parent-item"
            aria-haspopup="menu"
            aria-expanded="false"
          ><span class="sp-grow">Paste special</span>${n(`chevronRight`)}</button>
          <button class="sp-menu-item" type="button" role="menuitem">Delete</button>
        </div>
        <div class="sp-menu" data-part="submenu" data-subject role="menu" aria-label="Paste special" style="left: 176px">
          <button class="sp-menu-item" type="button" role="menuitem" data-value="formatting" data-label="keep formatting">Keep formatting</button>
          <button class="sp-menu-item" type="button" role="menuitem" data-value="style" data-label="match style">Match style</button>
          <button class="sp-menu-item" type="button" role="menuitem" data-part="sub-plain" data-value="plain" data-label="plain text">Plain text</button>
        </div>
      </div>
    </div>
  `;let i=e(r,`trigger`),a=e(r,`menu`),o=e(r,`submenu`),s=e(r,`parent-item`),c=e(r,`readout`);o.style.top=`${a.offsetTop+s.offsetTop-4}px`;let l=e=>{t(o,`data-open`,e),t(s,`data-active`,e),s.setAttribute(`aria-expanded`,String(e))},u=e=>{t(a,`data-open`,e),t(i,`data-open`,e),i.setAttribute(`aria-expanded`,String(e)),e||l(!1)};i.addEventListener(`click`,()=>u(!0)),s.addEventListener(`click`,()=>l(!0));for(let e of a.querySelectorAll(`.sp-menu-item`))e!==s&&e.addEventListener(`click`,()=>u(!1));for(let e of o.querySelectorAll(`.sp-menu-item`))e.addEventListener(`click`,()=>{c.textContent=`Pasted as ${e.dataset.label}`,c.dataset.choice=e.dataset.value??`none`,u(!1)});r.addEventListener(`keydown`,e=>{e.key===`Escape`&&(o.hasAttribute(`data-open`)?l(!1):u(!1))}),r.addEventListener(`pointerdown`,e=>{let t=e.target;i.contains(t)||a.contains(t)||o.contains(t)||u(!1)})}export{r as mount};