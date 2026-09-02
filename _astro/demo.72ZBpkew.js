import{n as e,t}from"./parts.C-YLuC7Q.js";function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Settings</span>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-surface" style="padding: 14px">
            <div class="sp-heading">Delete this project</div>
            <p class="sp-text" style="margin-top: 4px">Boards, files, and history go with it.</p>
            <button class="sp-button sp-button--sm" data-part="open" style="margin-top: 12px">Delete project</button>
          </div>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div class="sp-dialog" data-part="dialog" data-subject role="dialog" aria-modal="true" aria-labelledby="dialog-title">
          <div class="sp-heading" id="dialog-title">Delete “Northwind”?</div>
          <p class="sp-text" style="margin-top: 6px">This removes 14 boards and cannot be undone.</p>
          <div class="sp-row" style="justify-content: flex-end; margin-top: 16px">
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="cancel">Cancel</button>
            <button class="sp-button sp-button--sm" data-part="confirm">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `;let r=e(n,`dialog`),i=e(n,`scrim`),a=e=>{t(r,`data-open`,e),t(i,`data-open`,e)};e(n,`open`).addEventListener(`click`,()=>a(!0)),e(n,`cancel`).addEventListener(`click`,()=>a(!1)),e(n,`confirm`).addEventListener(`click`,()=>a(!1)),i.addEventListener(`click`,()=>a(!1)),n.addEventListener(`keydown`,e=>{e.key===`Escape`&&a(!1)})}export{n as mount};