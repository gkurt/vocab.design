import{n as e,t}from"./parts.C-YLuC7Q.js";function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context">
          <span class="sp-heading" style="font-size: 14px">Project settings</span>
        </div>
        <div class="sp-body" data-part="page" data-subject style="display: flex; flex-direction: column; gap: 12px">
          <div class="sp-field">
            <label class="sp-label" for="vd-inert-name">Project name</label>
            <input class="sp-input" id="vd-inert-name" value="Harbour" readonly />
          </div>
          <div class="sp-row" style="gap: 8px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="save">Save draft</button>
            <button class="sp-button sp-button--sm" type="button" data-part="open">Rename</button>
          </div>
          <div style="height: 24px">
            <span class="sp-chip" data-part="receipt" hidden>Draft saved</span>
          </div>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div class="sp-dialog" role="dialog" aria-modal="true" aria-label="Rename project" data-part="dialog" style="width: 250px">
          <span class="sp-heading" style="font-size: 14px">Rename project</span>
          <input class="sp-input" value="Harbour" readonly style="margin-top: 10px" />
          <div class="sp-row" style="justify-content: flex-end; gap: 8px; margin-top: 14px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="close">Cancel</button>
            <button class="sp-button sp-button--sm" type="button" data-part="rename">Rename</button>
          </div>
        </div>
      </div>
    </div>
  `;let r=e(n,`page`),i=e(n,`scrim`),a=e(n,`dialog`),o=e(n,`receipt`),s=e=>{t(a,`data-open`,e),t(i,`data-open`,e),t(r,`inert`,e)};e(n,`open`).addEventListener(`click`,()=>s(!0));for(let t of[`close`,`rename`])e(n,t).addEventListener(`click`,()=>s(!1));e(n,`save`).addEventListener(`click`,e=>{e.currentTarget.closest(`[inert]`)||(o.hidden=!1)})}export{n as mount};