import{n as e,t}from"./parts.C-YLuC7Q.js";var n={"bar-top":{transform:`translateY(5px) rotate(45deg)`,opacity:`1`},"bar-mid":{transform:`scaleX(0.1)`,opacity:`0`},"bar-bot":{transform:`translateY(-5px) rotate(-45deg)`,opacity:`1`}},r=Object.keys(n),i=`transform-box: fill-box; transform-origin: center; transition: transform 0.26s var(--sp-ease), opacity 0.18s linear`,a=[`Rent`,`Utilities`,`Groceries`,`Transit`];function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 224px">
        <div class="sp-topbar">
          <button class="sp-icon-button" type="button" data-part="trigger" data-aim aria-expanded="false" aria-label="Open menu">
            <svg class="sp-icon" data-part="glyph" data-subject viewBox="0 0 24 24" aria-hidden="true" style="width: 20px; height: 20px">
              ${r.map((e,t)=>`<line data-part="${e}" x1="4" y1="${7+t*5}" x2="20" y2="${7+t*5}" style="${i}" />`).join(``)}
            </svg>
          </button>
          <span class="sp-heading sp-grow sp-context">Ledger</span>
        </div>
        <div class="sp-body sp-context" style="position: relative; padding: 0">
          <ul class="sp-list">${a.map(e=>`
      <li class="sp-list-item">
        <span class="sp-grow sp-text sp-text--ink">${e}</span>
        <span class="sp-text">paid</span>
      </li>`).join(``)}</ul>
          <div class="sp-drawer sp-context" data-part="panel" aria-label="Sections">
            <span class="sp-label">Sections</span>
            <ul class="sp-nav">
              <li><span class="sp-nav-item" data-current>This month</span></li>
              <li><span class="sp-nav-item">Last month</span></li>
              <li><span class="sp-nav-item">Categories</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(o,`trigger`),c=e(o,`glyph`),l=e(o,`panel`),u=r=>{s.setAttribute(`aria-expanded`,String(r)),s.setAttribute(`aria-label`,r?`Close menu`:`Open menu`),t(c,`data-open`,r),t(l,`data-open`,r);for(let[t,i]of Object.entries(n)){let n=e(o,t);n.style.transform=r?i.transform:`none`,n.style.opacity=r?i.opacity:`1`}};s.addEventListener(`click`,()=>u(s.getAttribute(`aria-expanded`)!==`true`))}export{o as mount};