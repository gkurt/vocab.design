import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r={clean:`All changes saved`,dirty:`Unsaved changes`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 272px">
        <div class="sp-topbar sp-context">
          <button class="sp-icon-button" data-part="back" type="button" aria-label="Back to notes">${n(`chevronLeft`)}</button>
          <span class="sp-heading sp-grow">Harbour notes</span>
          <span class="sp-text" data-part="state" data-state="clean" role="status">${r.clean}</span>
        </div>

        <div class="sp-body sp-context" data-part="edit-view" style="display: flex; flex-direction: column; gap: 10px">
          <textarea class="sp-input" data-part="editor" rows="4" spellcheck="false" aria-label="Harbour notes"
                    style="height: 116px; resize: none; line-height: 1.5">The east quay reopens in spring.</textarea>
          <div class="sp-row" style="justify-content: flex-end">
            <button class="sp-button sp-button--sm" data-part="save" type="button">Save</button>
          </div>
        </div>

        <div class="sp-body sp-context" data-part="left-view" hidden>
          <ul class="sp-list sp-surface">
            <li class="sp-list-item"><span class="sp-grow">Harbour notes</span><span class="sp-text" data-part="left-note">Edited 9:04</span></li>
            <li class="sp-list-item"><span class="sp-grow">Ferry timetable</span><span class="sp-text">Monday</span></li>
          </ul>
        </div>

        <div class="sp-scrim" data-part="scrim"></div>
        <div class="sp-dialog" data-part="guard" data-subject role="alertdialog" aria-modal="true" aria-labelledby="ucg-title" style="width: 330px">
          <div class="sp-heading" id="ucg-title">Leave without saving?</div>
          <p class="sp-text" style="margin: 6px 0 16px">Your edits to Harbour notes have not been saved. Going back now loses them.</p>
          <div class="sp-row sp-row--between">
            <button class="sp-button sp-button--quiet sp-button--sm" data-part="save-leave" type="button">Save and leave</button>
            <div class="sp-row">
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="keep" type="button">Keep editing</button>
              <button class="sp-button sp-button--sm" data-part="discard" type="button">Discard</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(i,`state`),o=e(i,`editor`),s=e(i,`guard`),c=e(i,`scrim`),l=o.value,u=0;for(let e of Object.values(r))a.textContent=e,u=Math.max(u,a.offsetWidth);a.style.minWidth=`${u}px`,a.style.textAlign=`right`,a.textContent=r.clean;let d=e=>{t(s,`data-open`,e),t(c,`data-open`,e)},f=()=>{a.dataset.state=`clean`,a.textContent=r.clean},p=t=>{d(!1),f(),e(i,`left-note`).textContent=t,e(i,`edit-view`).hidden=!0,e(i,`left-view`).hidden=!1};o.addEventListener(`input`,()=>{let e=o.value!==l;a.dataset.state=e?`dirty`:`clean`,a.textContent=e?r.dirty:r.clean}),e(i,`save`).addEventListener(`click`,f),e(i,`back`).addEventListener(`click`,()=>{if(a.dataset.state!==`dirty`)return p(`Edited 9:04`);d(!0)}),e(i,`keep`).addEventListener(`click`,()=>d(!1)),e(i,`discard`).addEventListener(`click`,()=>p(`Edited 9:04`)),e(i,`save-leave`).addEventListener(`click`,()=>p(`Edited just now`)),i.addEventListener(`keydown`,e=>{e.key===`Escape`&&d(!1)})}export{i as mount};