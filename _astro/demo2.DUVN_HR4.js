import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Projects</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="new">New</button>
        </div>
        <div class="sp-body" style="padding: 0">
          <div class="sp-empty" data-part="empty" data-subject>
            <span class="sp-empty-mark">${t(`inbox`)}</span>
            <span class="sp-heading">No projects yet</span>
            <p class="sp-text" style="max-width: 30ch">A project holds your boards, files, and everyone working on them.</p>
            <button class="sp-button sp-button--sm" data-part="cta">Create your first project</button>
          </div>
          <ul class="sp-list sp-context" data-part="list" hidden>
            <li class="sp-list-item"><span class="sp-avatar">N</span><span class="sp-grow">Northwind</span><span class="sp-text">just now</span></li>
          </ul>
        </div>
      </div>
    </div>
  `;let r=e(n,`empty`),i=e(n,`list`),a=()=>{r.hidden=!0,i.hidden=!1};e(n,`cta`).addEventListener(`click`,a),e(n,`new`).addEventListener(`click`,a)}export{n as mount};