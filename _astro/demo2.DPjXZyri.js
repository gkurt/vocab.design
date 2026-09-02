import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 300px; height: 240px">
        <div class="sp-topbar">
          <button class="sp-icon-button" data-part="trigger" data-subject data-aim aria-expanded="false" aria-controls="nav" aria-label="Menu">
            ${n(`menu`)}
          </button>
          <span class="sp-heading sp-grow sp-context">Field guide</span>
          <span class="sp-avatar sp-context">GK</span>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack">
            <div class="sp-line" style="width: 80%"></div>
            <div class="sp-line" style="width: 92%"></div>
            <div class="sp-line" style="width: 64%"></div>
            <div class="sp-line" style="width: 86%"></div>
          </div>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <nav class="sp-drawer" data-part="panel" id="nav" aria-label="Main">
          <span class="sp-label">Menu</span>
          <ul class="sp-nav">
            <li><span class="sp-nav-item" data-current>Species</span></li>
            <li><span class="sp-nav-item">Habitats</span></li>
            <li><span class="sp-nav-item">Tracks</span></li>
            <li><span class="sp-nav-item">Field notes</span></li>
          </ul>
        </nav>
      </div>
    </div>
  `;let i=e(r,`panel`),a=e(r,`scrim`),o=e(r,`trigger`),s=e=>{t(i,`data-open`,e),t(a,`data-open`,e),o.setAttribute(`aria-expanded`,String(e))};o.addEventListener(`click`,()=>s(!0)),a.addEventListener(`click`,()=>s(!1)),r.addEventListener(`keydown`,e=>{e.key===`Escape`&&s(!1)})}export{r as mount};