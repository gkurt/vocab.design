import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=1400,r={idle:`Not copied yet`,copied:`Link copied`,shared:`Shared with the team`};function i(i,a){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Sprint 24 retro</span>
          <button class="sp-icon-button sp-context" data-part="rename" aria-label="Rename note">${t(`pencil`)}</button>
          <button class="sp-icon-button" data-part="copy" data-subject aria-label="Copy link">
            <span data-part="copy-mark">${t(`copy`)}</span>
            <span data-part="copy-done" hidden>${t(`check`)}</span>
          </button>
          <button class="sp-icon-button sp-context" data-part="trash" aria-label="Move to trash">${t(`trash`)}</button>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-surface" style="padding: 12px">
            <div class="sp-stack">
              <div class="sp-line" style="width: 88%"></div>
              <div class="sp-line" style="width: 72%"></div>
              <div class="sp-line" style="width: 80%"></div>
            </div>
          </div>
          <div class="sp-row" style="margin-top: 14px">
            <button class="sp-button sp-button--sm sp-row" data-part="share">${t(`share`)}Share note</button>
            <span class="sp-text sp-grow" data-part="status" data-state="idle" role="status">${r.idle}</span>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(i,`copy`),s=e(i,`copy-mark`),c=e(i,`copy-done`),l=e(i,`status`),u=e=>{l.dataset.state=e,l.textContent=r[e]},d;o.addEventListener(`click`,()=>{u(`copied`),s.hidden=!0,c.hidden=!1,a.clearTimeout(d),d=a.setTimeout(()=>{c.hidden=!0,s.hidden=!1},n)}),e(i,`share`).addEventListener(`click`,()=>u(`shared`))}export{i as mount};