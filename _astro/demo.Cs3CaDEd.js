import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[24,51,73,92,100],r=260,i=e=>`
  <span
    aria-hidden="true"
    style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto;
           width: 32px; height: 32px; border-radius: 6px; background: var(--sp-sunken);
           color: var(--sp-muted); font-size: 10px; font-weight: 600"
  >${e}</span>`;function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 282px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">New message</span>
          <span class="sp-label">To: Priya</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-stack sp-context" style="gap: 7px">
            <div class="sp-line" style="width: 84%"></div>
            <div class="sp-line" style="width: 92%"></div>
          </div>

          <div style="position: relative; height: 54px">
            <div
              class="sp-surface sp-row"
              data-part="attachment"
              data-subject
              style="position: absolute; inset: 0; gap: 10px; padding: 8px 10px"
            >
              ${i(`PDF`)}
              <span class="sp-stack sp-grow" style="gap: 2px; min-width: 0">
                <span class="sp-text sp-text--ink" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">Trail map.pdf</span>
                <span class="sp-label">PDF, 1.2 MB</span>
              </span>
              <button class="sp-icon-button" type="button" data-part="remove" aria-label="Remove Trail map.pdf">${t(`close`)}</button>
            </div>
            <div
              class="sp-row sp-context"
              data-part="undo-row"
              role="status"
              hidden
              style="position: absolute; inset: 0; padding: 8px 10px; border: 1px dashed var(--sp-line); border-radius: var(--sp-radius)"
            >
              <span class="sp-text sp-grow">Trail map.pdf removed</span>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="undo">Undo</button>
            </div>
          </div>

          <div style="position: relative; height: 68px">
            <div
              class="sp-surface"
              data-part="pending"
              data-state="idle"
              hidden
              style="position: absolute; inset: 0; padding: 8px 10px"
            >
              <div class="sp-row" style="gap: 10px">
                ${i(`ZIP`)}
                <span class="sp-stack sp-grow" style="gap: 2px; min-width: 0">
                  <span class="sp-text sp-text--ink" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">Site survey.zip</span>
                  <span class="sp-label" data-part="pending-status">Uploading 0%</span>
                </span>
                <button class="sp-icon-button" type="button" data-part="pending-remove" aria-label="Cancel Site survey.zip">${t(`close`)}</button>
              </div>
              <div
                class="sp-progress"
                data-part="pending-progress"
                role="progressbar"
                aria-label="Site survey.zip"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="0"
                style="--sp-value: 0%; margin-top: 6px"
              >
                <div class="sp-progress-fill"></div>
              </div>
            </div>
          </div>

          <div class="sp-row sp-context" style="margin-top: auto">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="attach">Attach</button>
            <span class="sp-grow"></span>
            <button class="sp-button sp-button--sm" type="button">Send</button>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(a,`attachment`),c=e(a,`undo-row`),l=e(a,`pending`),u=e(a,`pending-status`),d=e(a,`pending-progress`),f=e(a,`pending-remove`),p,m=e=>{let t=e>=100;d.style.setProperty(`--sp-value`,`${e}%`),d.setAttribute(`aria-valuenow`,String(e)),d.style.visibility=t?`hidden`:`visible`,l.dataset.state=t?`done`:`uploading`,u.textContent=t?`ZIP, 3.4 MB`:`Uploading ${e}%`,f.setAttribute(`aria-label`,t?`Remove Site survey.zip`:`Cancel Site survey.zip`)};e(a,`attach`).addEventListener(`click`,()=>{o.clearTimeout(p),l.hidden=!1,m(0);let e=-1,t=()=>{e+=1;let i=n[e];i!==void 0&&(m(i),e<n.length-1&&(p=o.setTimeout(t,r)))};p=o.setTimeout(t,r)}),f.addEventListener(`click`,()=>{o.clearTimeout(p),l.hidden=!0,l.dataset.state=`idle`}),e(a,`remove`).addEventListener(`click`,()=>{s.hidden=!0,c.hidden=!1}),e(a,`undo`).addEventListener(`click`,()=>{s.hidden=!1,c.hidden=!0})}export{a as mount};