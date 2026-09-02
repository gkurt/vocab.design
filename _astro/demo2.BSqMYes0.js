import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{name:`notes.md`,size:`12 KB`,picked:!1},{name:`sketch.png`,size:`640 KB`,picked:!1},{name:`Q3 report.pdf`,size:`1.4 MB`,picked:!0},{name:`logo-final.svg`,size:`82 KB`,picked:!0},{name:`invoice-118.pdf`,size:`2.7 MB`,picked:!0}],i=r.map((e,t)=>e.picked?t:-1).filter(e=>e>=0),a=`4.2 MB`,o=r.map((e,t)=>`
    <li
      class="sp-list-item"
      data-part="row-${t}"
      style="padding: 7px 9px; font-size: 12px; border-radius: 0"
    >
      <span class="sp-checkbox" role="checkbox" aria-checked="${e.picked}" style="width: 14px; height: 14px"></span>
      <span class="sp-grow" data-part="name-${t}" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${e.name}</span>
      <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">${e.size}</span>
    </li>`).join(``);function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Archive</span>
          <span class="sp-text" data-part="readout" data-state="rest" style="flex: 0 0 auto; width: 268px; text-align: right; white-space: nowrap">3 of 5 files selected</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px; align-items: flex-start">
          <div class="sp-surface sp-context" style="flex: 0 0 auto; width: 226px; height: 168px; overflow: hidden">
            <ul class="sp-list" data-part="list" style="height: 100%">${o}</ul>
          </div>
          <div class="sp-stack" style="flex: 1 1 auto; gap: 10px">
            <button
              class="sp-button"
              type="button"
              data-part="delete"
              style="width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 6px; white-space: nowrap; flex: 0 0 auto"
            >
              ${n(`trash`)}<span data-part="delete-label">Delete 3 files</span>
            </button>
            <div style="position: relative; height: 116px">
              <div
                class="sp-surface"
                data-part="preview"
                data-subject
                style="position: absolute; inset: 0; padding: 9px 10px; opacity: 0; visibility: hidden;
                       transition: opacity 160ms var(--sp-ease), visibility 160ms"
              >
                <div class="sp-row" style="gap: 6px; align-items: center">
                  ${n(`alert`)}<span class="sp-heading" style="font-size: 12px">If you press this</span>
                </div>
                <div class="sp-stack" style="gap: 3px; margin-top: 7px; font-size: 11px; line-height: 1.35">
                  <span>3 files are deleted</span>
                  <span>${a} is freed</span>
                  <span data-part="no-undo" style="font-weight: 600">There is no undo</span>
                </div>
              </div>
              <div
                class="sp-surface sp-context"
                data-part="result"
                hidden
                style="position: absolute; inset: 0; padding: 9px 10px; font-size: 11px; line-height: 1.35"
              >
                <div class="sp-heading" style="font-size: 12px">Done</div>
                <div style="margin-top: 7px">3 files deleted, ${a} freed. Exactly what the panel said.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="caption" style="width: 452px; font-size: 11px; line-height: 1.35; text-align: center">
        The panel is not a warning about the button, it is a statement about the result: what will happen, to how many things, and whether it can be taken back.
      </span>
    </div>
  `;let c=e(s,`delete`),l=e(s,`preview`),u=e(s,`readout`),d=r.map((t,n)=>e(s,`row-${n}`)),f=r.map((t,n)=>e(s,`name-${n}`)),p=!1,m=e=>{for(let n of i){let r=d[n],i=f[n];!r||!i||(t(r,`data-doomed`,e),r.style.background=e?`var(--sp-accent-soft)`:``,i.style.textDecoration=e?`line-through`:``)}},h=e=>{p||(l.style.opacity=e?`1`:`0`,l.style.visibility=e?`visible`:`hidden`,m(e),u.dataset.state=e?`warned`:`rest`,u.textContent=e?`3 of 5 files selected, ${a}`:`3 of 5 files selected`)};c.addEventListener(`pointerenter`,()=>h(!0)),c.addEventListener(`pointerleave`,()=>h(!1)),c.addEventListener(`focus`,()=>h(!0)),c.addEventListener(`blur`,()=>h(!1)),c.addEventListener(`click`,()=>{if(!p){h(!1),p=!0;for(let e of i){let t=d[e];t&&(t.hidden=!0)}e(s,`result`).hidden=!1,e(s,`delete-label`).textContent=`Deleted`,c.setAttribute(`aria-disabled`,`true`),t(c,`data-done`,!0),u.dataset.state=`done`,u.textContent=`3 files deleted, ${a} freed`}})}export{s as mount};