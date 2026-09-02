import{n as e,t}from"./parts.C-YLuC7Q.js";var n=`northwind-web`,r={waiting:`Type ${n} exactly, including the hyphen.`,mismatch:`That is not the project name yet.`,ready:`Names match. The delete button is live.`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 270px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Project settings</span></div>
        <div class="sp-body sp-context">
          <div class="sp-surface" data-part="danger" style="padding: 12px">
            <div class="sp-heading">${n}</div>
            <p class="sp-text" style="margin: 6px 0 12px">Deleting removes the repository, its issues, and its history. This cannot be undone.</p>
            <button class="sp-button" data-part="open" type="button">Delete project</button>
          </div>
          <div class="sp-surface" data-part="gone" hidden style="padding: 12px">
            <div class="sp-heading">Project deleted</div>
            <p class="sp-text" style="margin: 6px 0 0">${n} and everything in it is gone.</p>
          </div>
        </div>

        <div class="sp-scrim" data-part="scrim"></div>
        <div class="sp-dialog" data-part="dialog" role="alertdialog" aria-modal="true" aria-labelledby="ttc-title">
          <div class="sp-heading sp-context" id="ttc-title">Delete this project?</div>
          <div class="sp-field" data-part="guard" data-subject data-state="waiting" style="margin-top: 12px">
            <label class="sp-label" for="ttc-input">Type <b>${n}</b> to confirm</label>
            <input class="sp-input" id="ttc-input" data-part="guard-input" type="text" autocomplete="off" spellcheck="false" aria-describedby="ttc-hint" />
            <div data-part="slot">
              <span class="sp-text" id="ttc-hint" data-part="hint" role="status">${r.waiting}</span>
            </div>
          </div>
          <div class="sp-row sp-context" style="justify-content: flex-end; margin-top: 14px">
            <button class="sp-button sp-button--ghost" data-part="cancel" type="button">Cancel</button>
            <button class="sp-button" data-part="confirm" type="button" aria-disabled="true">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(i,`dialog`),o=e(i,`scrim`),s=e(i,`guard`),c=e(i,`guard-input`),l=e(i,`slot`),u=e(i,`hint`),d=e(i,`confirm`),f=0;for(let e of Object.values(r))u.textContent=e,f=Math.max(f,l.offsetHeight);l.style.height=`${f}px`,u.textContent=r.waiting;let p=()=>{let e=c.value.trim(),i=e===n?`ready`:e===``?`waiting`:`mismatch`;s.dataset.state=i,u.textContent=r[i],t(d,`data-ready`,i===`ready`),d.setAttribute(`aria-disabled`,String(i!==`ready`))},m=e=>{t(a,`data-open`,e),t(o,`data-open`,e)};e(i,`open`).addEventListener(`click`,()=>{c.value=``,p(),m(!0)}),c.addEventListener(`input`,p),e(i,`cancel`).addEventListener(`click`,()=>m(!1)),o.addEventListener(`click`,()=>m(!1)),i.addEventListener(`keydown`,e=>{e.key===`Escape`&&m(!1)}),d.addEventListener(`click`,()=>{d.dataset.ready!==void 0&&(m(!1),e(i,`danger`).hidden=!0,e(i,`gone`).hidden=!1)})}export{i as mount};