import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";import{r}from"./measure.DK7AY2_i.js";var i=[`Brand guidelines.pdf`,`Q3 roadmap.key`,`Offsite photos`],a=8;function o(o){let s=i.map((e,t)=>`
      <li class="sp-list-item" data-part="row-${t+1}">
        <span class="sp-grow sp-text sp-text--ink">${e}</span>
      </li>`).join(``);o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 220px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Shared with me</span>
          ${n(`search`)}
        </div>
        <div class="sp-body sp-context" data-part="page" style="padding: 0">
          <ul class="sp-list" data-part="files">${s}</ul>
        </div>
        <div class="sp-menu" data-part="menu" data-subject role="menu" aria-label="File actions">
          <button class="sp-menu-item" role="menuitem" data-part="menu-open">Open</button>
          <button class="sp-menu-item" role="menuitem">Rename</button>
          <button class="sp-menu-item" role="menuitem">Copy link</button>
          <button class="sp-menu-item" role="menuitem">Move to trash</button>
        </div>
      </div>
    </div>
  `;let c=o.querySelector(`.sp-frame`),l=e(o,`menu`),u,d=e=>{t(l,`data-open`,e),e||u?.removeAttribute(`data-selected`)},f=(e,t)=>{let n=r({clientX:e,clientY:t},c),i=Math.min(n.x,c.offsetWidth-l.offsetWidth-a),o=Math.min(n.y,c.offsetHeight-l.offsetHeight-a);l.style.left=`${Math.max(i,a)}px`,l.style.top=`${Math.max(o,a)}px`};for(let t of e(o,`files`).children)t.addEventListener(`contextmenu`,e=>{e.preventDefault(),u?.removeAttribute(`data-selected`),u=t,t.setAttribute(`data-selected`,``),f(e.clientX,e.clientY),d(!0)});for(let e of l.querySelectorAll(`.sp-menu-item`))e.addEventListener(`click`,()=>d(!1));o.addEventListener(`keydown`,e=>{e.key===`Escape`&&d(!1)}),o.addEventListener(`pointerdown`,e=>{l.contains(e.target)||d(!1)})}export{o as mount};