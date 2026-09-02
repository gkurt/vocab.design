import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=3e3,r=[{id:`ferry`,name:`Ferry timetable`,when:`Monday`},{id:`tide`,name:`Tide tables`,when:`Yesterday`},{id:`quay`,name:`Quay works log`,when:`9:04`}];function i(i,a){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Notes</span>
          <span class="sp-row sp-text" data-part="trash" data-count="0" style="gap: 6px">${t(`trash`)}<span data-part="trash-text">Trash 0</span></span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <ul class="sp-list sp-surface sp-grow sp-context" data-part="list"></ul>
          <div data-part="slot" style="flex: 0 0 auto">
            <div class="sp-row sp-surface" data-part="undo-row" data-subject role="status" style="padding: 8px 10px; box-shadow: var(--sp-shadow)">
              <span class="sp-text sp-text--ink sp-grow" data-part="undo-text">Deleted</span>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="undo" type="button">Undo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(i,`list`),s=e(i,`slot`),c=e(i,`undo-row`),l=e(i,`undo-text`),u=e(i,`trash`),d=e(i,`trash-text`);s.style.height=`${s.offsetHeight}px`,c.hidden=!0;let f=new Set,p,m=()=>{o.innerHTML=r.filter(e=>!f.has(e.id)).map(e=>`
          <li class="sp-list-item" data-part="row-${e.id}">
            <span class="sp-grow">${e.name}</span>
            <span class="sp-text">${e.when}</span>
            <button class="sp-icon-button" data-part="del-${e.id}" data-note="${e.id}" type="button" aria-label="Delete ${e.name}">
              ${t(`trash`)}
            </button>
          </li>`).join(``),u.dataset.count=String(f.size),d.textContent=`Trash ${f.size}`};o.addEventListener(`click`,e=>{let t=e.target.closest(`[data-note]`)?.dataset.note,i=r.find(e=>e.id===t);!i||f.has(i.id)||(f.add(i.id),m(),l.textContent=`${i.name} moved to Trash`,c.dataset.note=i.id,c.hidden=!1,a.clearTimeout(p),p=a.setTimeout(()=>{c.hidden=!0},n))}),e(i,`undo`).addEventListener(`click`,()=>{let e=c.dataset.note;e&&(a.clearTimeout(p),f.delete(e),c.hidden=!0,m())}),m()}export{i as mount};