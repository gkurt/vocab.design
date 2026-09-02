import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=`Screen reader: nothing announced, the page waits to be read.`,i=`Screen reader, at once: "Delete this workspace? 12 projects go with it."`;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 210px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow" style="font-size: 14px">Workspace settings</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-row" style="padding: 10px 12px; gap: 10px">
            <span class="sp-stack sp-grow" style="gap: 2px">
              <span class="sp-text sp-text--ink">Delete this workspace</span>
              <span class="sp-label" data-part="status">12 projects, 4 members</span>
            </span>
            <button class="sp-button sp-button--sm" data-part="danger" style="display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; flex: 0 0 auto">
              ${n(`trash`)}<span>Delete</span>
            </button>
          </div>
          <span class="sp-line" style="width: 66%"></span>
          <span class="sp-line" style="width: 48%"></span>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div
          class="sp-dialog"
          data-part="dialog"
          data-subject
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="ad-title"
          aria-describedby="ad-body"
          style="width: 300px"
        >
          <div class="sp-row" style="gap: 8px; align-items: flex-start">
            ${n(`alert`)}
            <span class="sp-heading" id="ad-title" style="font-size: 14px">Delete this workspace?</span>
          </div>
          <p class="sp-text" id="ad-body" style="margin: 8px 0 0">12 projects go with it, for everyone. This cannot be undone.</p>
          <div class="sp-row" style="justify-content: flex-end; margin-top: 16px">
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="cancel">Keep workspace</button>
            <button class="sp-button sp-button--sm" data-part="confirm">Delete</button>
          </div>
        </div>
      </div>
      <p class="sp-text sp-context" data-stage-announce data-part="announce" data-state="idle" role="status" style="max-width: 460px; text-align: center; margin: 0; min-height: 20px">
        ${r}
      </p>
    </div>
  `;let o=e(a,`dialog`),s=e(a,`scrim`),c=e(a,`cancel`),l=e(a,`announce`),u=e(a,`status`),d=e=>{t(o,`data-open`,e),t(s,`data-open`,e),t(c,`data-sim-focus`,e),l.dataset.state=e?`alert`:`idle`,l.textContent=e?i:r};e(a,`danger`).addEventListener(`click`,()=>d(!0)),c.addEventListener(`click`,()=>d(!1)),e(a,`confirm`).addEventListener(`click`,()=>{u.textContent=`Deleted`,d(!1)}),s.addEventListener(`click`,()=>d(!1)),a.addEventListener(`keydown`,e=>{e.key===`Escape`&&d(!1)})}export{a as mount};