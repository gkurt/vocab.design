import{n as e,t}from"./parts.C-YLuC7Q.js";var n={idle:{at:`Rename (the trigger)`,why:`Resting where the reader left it.`},opened:{at:`Project name, in the dialog`,why:`The dialog opened, so focus moved in.`},closed:{at:`Rename (the trigger)`,why:`The dialog closed, so focus went back.`}};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 214px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading" style="font-size: 14px">Harbour</span>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 12px">
          <div class="sp-field">
            <span class="sp-label">Project</span>
            <span class="sp-text sp-text--ink">Harbour, created 4 March</span>
          </div>
          <div class="sp-row" style="gap: 8px">
            <button class="sp-button sp-button--sm" type="button" data-part="trigger" data-sim-focus>Rename</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="archive">Archive</button>
          </div>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div class="sp-dialog" role="dialog" aria-modal="true" aria-label="Rename project" data-part="dialog" data-subject
             style="width: 244px">
          <span class="sp-heading" style="font-size: 14px">Rename project</span>
          <div class="sp-field" style="margin-top: 10px">
            <label class="sp-label" for="vd-fm-name">Project name</label>
            <input class="sp-input" id="vd-fm-name" data-part="field" value="Harbour" readonly />
          </div>
          <div class="sp-row" style="justify-content: flex-end; gap: 8px; margin-top: 14px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="cancel">Cancel</button>
            <button class="sp-button sp-button--sm" type="button" data-part="save">Rename</button>
          </div>
        </div>
      </div>
      <div class="sp-surface sp-context" style="width: 380px; padding: 8px 10px">
        <div class="sp-row sp-row--between" style="height: 18px">
          <span class="sp-label">Keyboard focus</span>
          <span class="sp-text sp-text--ink" data-part="at" data-moment="idle"
                style="font-size: 12px; white-space: nowrap">${n.idle.at}</span>
        </div>
        <span class="sp-text" data-stage-verdict data-part="why" style="font-size: 12px; white-space: nowrap">${n.idle.why}</span>
      </div>
    </div>
  `;let i=e(r,`dialog`),a=e(r,`scrim`),o=e(r,`trigger`),s=e(r,`field`),c=e(r,`at`),l=e(r,`why`),u=e=>{c.dataset.moment=e,c.textContent=n[e].at,l.textContent=n[e].why},d=e=>{t(i,`data-open`,e),t(a,`data-open`,e),t(s,`data-sim-focus`,e),t(o,`data-sim-focus`,!e),u(e?`opened`:`closed`)};o.addEventListener(`click`,()=>d(!0));for(let t of[`cancel`,`save`])e(r,t).addEventListener(`click`,()=>d(!1))}export{r as mount};