import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`note`,label:`New note`,glyph:`pencil`,row:`Tide times, Saturday`},{key:`list`,label:`New checklist`,glyph:`check`,row:`Packing checklist`}],i=[`position: absolute`,`right: 14px`,`bottom: 14px`,`display: inline-flex`,`align-items: center`,`justify-content: center`,`width: 46px`,`height: 46px`,`padding: 0`,`border-radius: 50%`,`box-shadow: var(--sp-shadow)`].join(`; `);function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 214px; height: 300px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Notes</span></div>
        <div class="sp-body sp-context">
          <ul class="sp-list" data-part="notes">
            <li class="sp-list-item">Gull counts, week 12</li>
            <li class="sp-list-item">Shipping forecast</li>
          </ul>
        </div>
        <div
          class="sp-menu sp-context"
          data-part="menu"
          role="menu"
          aria-label="Create"
          style="right: 14px; bottom: 68px; transform-origin: bottom right"
        >${r.map(e=>`
      <button class="sp-menu-item" type="button" data-part="make-${e.key}">${n(e.glyph)}${e.label}</button>`).join(``)}</div>
        <button class="sp-button" type="button" data-part="fab" data-subject aria-label="Create" aria-haspopup="menu" style="${i}">
          ${n(`plus`)}
        </button>
      </div>
    </div>
  `;let o=e(a,`fab`),s=e(a,`menu`),c=e(a,`notes`),l=e=>{t(s,`data-open`,e),o.setAttribute(`aria-expanded`,String(e))},u=e=>{let t=a.ownerDocument.createElement(`li`);t.className=`sp-list-item`,t.dataset.part=`made-${e.key}`,t.textContent=e.row,c.append(t),l(!1)};e(a,`fab`).addEventListener(`click`,()=>l(!0));for(let t of r)e(a,`make-${t.key}`).addEventListener(`click`,()=>u(t));a.addEventListener(`pointerdown`,e=>{let t=e.target;t&&(s.contains(t)||o.contains(t))||l(!1)}),a.addEventListener(`keydown`,e=>{e.key===`Escape`&&l(!1)})}export{a as mount};