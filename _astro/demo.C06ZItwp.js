import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{key:`brand`,label:`Brand guide.pdf`},{key:`sitemap`,label:`Site map.png`},{key:`forecast`,label:`Q3 forecast.xlsx`}];function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Project files</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <ul class="sp-list sp-grow" data-part="files">${r.map(e=>`
      <li class="sp-list-item" data-part="row-${e.key}">
        <span class="sp-grow">${e.label}</span>
        <button class="sp-icon-button" data-part="delete-${e.key}" aria-label="Delete ${e.label}">${n(`trash`)}</button>
      </li>`).join(``)}</ul>
          <span class="sp-text" data-part="count" role="status">3 files</span>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div
          class="sp-dialog"
          data-part="dialog"
          data-subject
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="cd-title"
          aria-describedby="cd-body"
        >
          <div class="sp-heading" id="cd-title" data-part="dialog-title">Delete this file?</div>
          <p class="sp-text" id="cd-body" style="margin: 6px 0 0">Deleting removes it for everyone on the project. This cannot be undone.</p>
          <div class="sp-row" style="justify-content: flex-end; margin-top: 16px">
            <button class="sp-button sp-button--ghost" data-part="keep">Keep file</button>
            <button class="sp-button" data-part="confirm">Delete file</button>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(i,`dialog`),o=e(i,`scrim`),s=e(i,`dialog-title`),c=e(i,`count`),l=e(i,`files`),u,d=e=>{t(a,`data-open`,e),t(o,`data-open`,e),e||(u=void 0)},f=e=>{u=e,s.textContent=`Delete "${e.label}"?`,d(!0)},p=()=>{u&&(e(i,`row-${u.key}`).remove(),c.textContent=`${l.children.length} files`,d(!1))};for(let t of r)e(i,`delete-${t.key}`).addEventListener(`click`,()=>f(t));e(i,`confirm`).addEventListener(`click`,p),e(i,`keep`).addEventListener(`click`,()=>d(!1)),o.addEventListener(`click`,()=>d(!1)),i.addEventListener(`keydown`,e=>{e.key===`Escape`&&d(!1)})}export{i as mount};