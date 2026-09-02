import{n as e}from"./parts.C-YLuC7Q.js";var t=1500;function n(n,r){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Activity</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="reload">Reload</button>
        </div>
        <div class="sp-body">
          <div class="sp-stack" data-part="skeleton" data-subject aria-hidden="true" style="gap: 14px">${[0,1,2].map(()=>`
      <div class="sp-row" style="gap: 10px">
        <span class="sp-skeleton" style="width: 28px; height: 28px; border-radius: 50%"></span>
        <span class="sp-stack sp-grow" style="gap: 6px">
          <span class="sp-skeleton" style="width: 45%; height: 9px"></span>
          <span class="sp-skeleton" style="width: 78%; height: 9px"></span>
        </span>
      </div>`).join(``)}</div>
          <ul class="sp-list sp-context" data-part="content" hidden>${[{initials:`AM`,name:`Ada M.`,line:`Pushed the new colour ramp`},{initials:`JR`,name:`Jo R.`,line:`Renamed two tokens`},{initials:`PK`,name:`Pia K.`,line:`Closed the spacing issue`}].map(e=>`
      <li class="sp-list-item">
        <span class="sp-avatar">${e.initials}</span>
        <span class="sp-grow"><span class="sp-text sp-text--ink">${e.name}</span><br /><span class="sp-text">${e.line}</span></span>
      </li>`).join(``)}</ul>
        </div>
      </div>
    </div>
  `;let i=e(n,`skeleton`),a=e(n,`content`),o;e(n,`reload`).addEventListener(`click`,()=>{r.clearTimeout(o),i.hidden=!1,a.hidden=!0,o=r.setTimeout(()=>{i.hidden=!0,a.hidden=!1},t)})}export{n as mount};