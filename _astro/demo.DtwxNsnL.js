import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=148;function i(i){i.innerHTML=`
    <div class="sp-app" style="gap: 6px">
      <div class="sp-row" style="align-items: stretch; gap: 0">
        <div
          class="sp-context"
          data-part="strip"
          style="flex: 0 0 ${r}px; border: 1px dashed var(--sp-line); border-right: 0; border-radius: var(--sp-radius) 0 0 var(--sp-radius)"
        ></div>
        <div class="sp-frame" style="width: 320px; height: 236px; overflow: visible">
          <div class="sp-topbar sp-context">
            <button class="sp-icon-button" data-part="trigger" aria-label="Open sections">${n(`menu`)}</button>
            <span class="sp-heading sp-grow">Almanac</span>
          </div>
          <div class="sp-body sp-context">
            <div class="sp-stack">
              <span class="sp-heading">Spring tides</span>
              <div class="sp-line" style="width: 94%"></div>
              <div class="sp-line" style="width: 86%"></div>
              <div class="sp-line" style="width: 90%"></div>
              <div class="sp-line" style="width: 62%"></div>
            </div>
          </div>
          <div class="sp-scrim sp-context" data-part="scrim"></div>
          <nav
            data-part="panel"
            data-subject
            aria-label="Sections"
            style="position: absolute; top: 0; bottom: 0; left: -${r}px; width: ${r}px; display: flex; flex-direction: column; gap: 10px; padding: 12px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius) 0 0 var(--sp-radius); transform: translateX(0); transition: transform 0.26s var(--sp-ease)"
          >
            <div class="sp-row">
              <span class="sp-heading sp-grow">Sections</span>
              <button class="sp-icon-button" data-part="close" aria-label="Close">${n(`close`)}</button>
            </div>
            <ul class="sp-nav">
              <li><span class="sp-nav-item" data-current>Tides</span></li>
              <li><span class="sp-nav-item">Moon</span></li>
              <li><span class="sp-nav-item">Sunrise</span></li>
              <li><span class="sp-nav-item">Weather</span></li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 0; width: 468px">
        <span class="sp-label" style="flex: 0 0 ${r}px; text-align: center">off canvas</span>
        <span class="sp-label" style="flex: 1 1 auto; text-align: center">viewport</span>
      </div>
    </div>
  `;let a=e(i,`panel`),o=e(i,`scrim`),s=e=>{t(a,`data-open`,e),t(o,`data-open`,e),a.style.transform=`translateX(${e?r:0}px)`};e(i,`trigger`).addEventListener(`click`,()=>s(!0)),e(i,`close`).addEventListener(`click`,()=>s(!1)),o.addEventListener(`click`,()=>s(!1)),i.addEventListener(`keydown`,e=>{e.key===`Escape`&&s(!1)}),s(!1)}export{i as mount};