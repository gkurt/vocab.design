import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`file`,title:`File`,commands:[{key:`new`,label:`New sheet`,keys:`Ctrl N`},{key:`open`,label:`Open recent`},{key:`save`,label:`Save`,keys:`Ctrl S`}]},{key:`edit`,title:`Edit`,commands:[{key:`undo`,label:`Undo`,keys:`Ctrl Z`},{key:`cut`,label:`Cut`},{key:`copy`,label:`Copy`},{key:`paste`,label:`Paste`}]},{key:`view`,title:`View`,commands:[{key:`zoom`,label:`Zoom in`},{key:`freeze`,label:`Freeze row`},{key:`fullscreen`,label:`Full screen`}]}];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Quarter.numbers</span>
        </div>
        <div
          class="sp-row"
          data-part="bar"
          data-subject
          role="menubar"
          aria-label="Application"
          style="flex: 0 0 auto; gap: 2px; padding: 4px 8px; border-bottom: 1px solid var(--sp-line); background: var(--sp-surface)"
        >${n.map(({key:e,title:t})=>`
      <button
        class="sp-button sp-button--quiet sp-button--sm"
        type="button"
        role="menuitem"
        data-part="title-${e}"
        data-key="${e}"
        aria-haspopup="true"
        aria-expanded="false"
        aria-controls="vd-menu-${e}"
      >${t}</button>`).join(``)}</div>
        <div class="sp-body sp-context">
          <table class="sp-table" style="--sp-cell-pad: 5px 8px">
            <thead>
              <tr><th>Region</th><th>Q3</th><th>Q4</th></tr>
            </thead>
            <tbody>
              <tr><td>North</td><td>18,420</td><td>21,905</td></tr>
              <tr><td>South</td><td>12,180</td><td>11,640</td></tr>
              <tr><td>East</td><td>9,530</td><td>14,275</td></tr>
            </tbody>
          </table>
          <div class="sp-row sp-row--between" style="margin-top: 12px">
            <span class="sp-label">Last command</span>
            <span class="sp-text" data-part="status" data-action="none">None yet</span>
          </div>
        </div>
        ${n.map(({key:e,title:t,commands:n})=>`
      <div class="sp-menu" id="vd-menu-${e}" data-part="menu-${e}" role="menu" aria-label="${t}" style="transform-origin: top left">
        ${n.map(({key:e,label:t,keys:n})=>`
          <button class="sp-menu-item" type="button" role="menuitem" data-part="item-${e}" data-key="${e}">
            <span class="sp-grow">${t}</span>
            ${n?`<span class="sp-kbd">${n}</span>`:``}
          </button>`).join(``)}
      </div>`).join(``)}
      </div>
    </div>
  `;let i=e(r,`bar`),a=e(r,`status`),o=n.map(({key:t})=>({key:t,title:e(r,`title-${t}`),menu:e(r,`menu-${t}`)})),s=i.offsetTop+i.offsetHeight;for(let{title:e,menu:t}of o)t.style.top=`${s}px`,t.style.left=`${e.offsetLeft}px`;let c=e=>{for(let{key:n,title:r,menu:i}of o){let a=n===e;t(i,`data-open`,a),t(r,`data-open`,a),r.setAttribute(`aria-expanded`,String(a))}},l=()=>o.some(({menu:e})=>e.hasAttribute(`data-open`));for(let{key:e,title:t}of o)t.addEventListener(`click`,()=>c(e)),t.addEventListener(`pointerenter`,()=>{l()&&c(e)});for(let e of r.querySelectorAll(`.sp-menu-item`))e.addEventListener(`click`,()=>{a.dataset.action=e.dataset.key??`none`,a.textContent=(e.querySelector(`.sp-grow`)?.textContent??``).trim(),c(void 0)});r.addEventListener(`keydown`,e=>{e.key===`Escape`&&c(void 0)}),r.addEventListener(`pointerdown`,e=>{let t=e.target;o.some(({title:e,menu:n})=>e.contains(t)||n.contains(t))||c(void 0)})}export{r as mount};