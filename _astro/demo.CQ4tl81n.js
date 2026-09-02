import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{r}from"./measure.DK7AY2_i.js";var i=[{name:`Poster.pdf`,glyph:`copy`},{name:`Sketches`,glyph:`inbox`},{name:`Notes.txt`,glyph:`pencil`}],a=8;function o(o){let s=i.map((e,t)=>`
      <div
        class="sp-option sp-surface"
        role="option"
        aria-selected="false"
        data-part="tile-${t+1}"
        ${t===1?`data-subject`:``}
        style="display: flex; flex-direction: column; gap: 8px; padding: 8px"
      >
        <span style="display: flex; align-items: center; justify-content: center; height: 44px; border-radius: 5px; background: var(--sp-sunken); color: var(--sp-muted)">
          ${n(e.glyph)}
        </span>
        <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 500">${e.name}</span>
      </div>`).join(``);o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 218px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Files</span>
          ${n(`search`)}
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-grid" role="listbox" aria-label="Files" data-part="grid" style="grid-template-columns: repeat(3, 1fr)">
            ${s}
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="legend" style="font-size: 12px">
            Primary press selects. Secondary press asks for options.
          </span>
        </div>
        <div class="sp-menu" data-part="menu" role="menu" aria-label="File actions">
          <button class="sp-menu-item" type="button" role="menuitem" data-part="menu-open">Open</button>
          <button class="sp-menu-item" type="button" role="menuitem" data-part="menu-rename">Rename</button>
          <button class="sp-menu-item" type="button" role="menuitem">Duplicate</button>
          <button class="sp-menu-item" type="button" role="menuitem">Move to trash</button>
        </div>
      </div>
    </div>
  `;let c=o.querySelector(`.sp-frame`),l=e(o,`grid`),u=e(o,`menu`),d=e=>{for(let t of l.children)t.setAttribute(`aria-selected`,String(t===e))},f=(e,t)=>{let n=r({clientX:e,clientY:t},c),i=Math.min(n.x,c.offsetWidth-u.offsetWidth-a),o=Math.min(n.y,c.offsetHeight-u.offsetHeight-a);u.style.left=`${Math.max(i,a)}px`,u.style.top=`${Math.max(o,a)}px`};for(let e of l.children)e.addEventListener(`click`,()=>d(e)),e.addEventListener(`contextmenu`,n=>{n.preventDefault(),d(e),f(n.clientX,n.clientY),t(u,`data-open`,!0)});for(let e of u.querySelectorAll(`.sp-menu-item`))e.addEventListener(`click`,()=>t(u,`data-open`,!1));o.addEventListener(`keydown`,e=>{e.key===`Escape`&&t(u,`data-open`,!1)}),o.addEventListener(`pointerdown`,e=>{u.contains(e.target)||t(u,`data-open`,!1)})}export{o as mount};