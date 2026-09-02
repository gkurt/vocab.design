import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[18,39,58,74,88,100],i=260;function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Expense report</span>
          <span class="sp-text">Attachments</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px">
          <section class="sp-context" data-part="elsewhere" style="width: 118px">
            <span class="sp-label">On your device</span>
            <div class="sp-stack" style="margin-top: 8px">
              <span class="sp-chip" data-part="file" style="cursor: grab; touch-action: none">${n(`share`)} budget.xlsx</span>
              <div class="sp-line" style="width: 78%"></div>
              <div class="sp-line" style="width: 60%"></div>
            </div>
          </section>
          <section
            class="sp-stack sp-grow"
            data-part="uploader"
            data-subject
            aria-label="Add a receipt"
            style="gap: 8px; padding: 12px; border: 1px dashed var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div class="sp-row">
              <span class="sp-text sp-text--ink sp-grow" data-part="prompt">Drop a file here</span>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="browse">Browse</button>
            </div>
            <span class="sp-label">XLSX or PDF, up to 10 MB</span>
            <div style="position: relative; height: 54px">
              <div class="sp-row sp-context" data-part="uploads-empty" style="position: absolute; inset: 0; align-items: center">
                <span class="sp-label">No file chosen</span>
              </div>
              <div
                class="sp-surface"
                data-part="file-row"
                data-state="idle"
                hidden
                style="position: absolute; inset: 0; padding: 7px 10px"
              >
                <div class="sp-row">
                  <span class="sp-text sp-text--ink sp-grow" style="min-width: 0">budget.xlsx</span>
                  <span class="sp-text" data-part="file-status" style="flex: 0 0 auto; width: 108px; text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums">Uploading 0%</span>
                  <button class="sp-icon-button" type="button" data-part="remove" aria-label="Remove budget.xlsx">${n(`close`)}</button>
                </div>
                <div
                  class="sp-progress"
                  data-part="progress"
                  role="progressbar"
                  aria-label="Upload"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow="0"
                  style="--sp-value: 0%; margin-top: 8px"
                >
                  <div class="sp-progress-fill"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `;let s=e(a,`uploader`),c=e(a,`prompt`),l=e(a,`file-row`),u=e(a,`uploads-empty`),d=e(a,`file-status`),f=e(a,`progress`),p,m=!1,h=e=>{t(s,`data-active`,e),s.style.borderColor=e?`var(--sp-accent)`:``,s.style.background=e?`var(--sp-accent-soft)`:``,c.textContent=e?`Release to add`:`Drop a file here`},g=e=>{f.style.setProperty(`--sp-value`,`${e}%`),f.setAttribute(`aria-valuenow`,String(e));let t=e>=100;l.dataset.state=t?`done`:`uploading`,d.textContent=t?`248 KB`:`Uploading ${e}%`},_=()=>{o.clearTimeout(p),l.hidden=!1,u.hidden=!0,g(0);let e=-1,t=()=>{e+=1;let n=r[e];n!==void 0&&(g(n),e<r.length-1&&(p=o.setTimeout(t,i)))};p=o.setTimeout(t,i)};e(a,`browse`).addEventListener(`click`,_),e(a,`remove`).addEventListener(`click`,()=>{o.clearTimeout(p),l.hidden=!0,u.hidden=!1,l.dataset.state=`idle`});let v=(e,t)=>{let n=s.getBoundingClientRect();return e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom},y=e(a,`file`);y.addEventListener(`pointerdown`,e=>{e.isTrusted&&y.setPointerCapture(e.pointerId),m=!0}),a.addEventListener(`pointermove`,e=>{m&&h(v(e.clientX,e.clientY))});let b=e=>{if(!m)return;m=!1;let t=v(e.clientX,e.clientY);h(!1),t&&_()};a.addEventListener(`pointerup`,b),a.addEventListener(`pointercancel`,b)}export{a as mount};