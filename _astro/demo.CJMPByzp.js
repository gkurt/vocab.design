import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">New claim</span>
          <span class="sp-text">Step 2 of 3</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px">
          <section class="sp-context" data-part="elsewhere" style="width: 132px">
            <span class="sp-label">On your device</span>
            <div class="sp-stack" style="margin-top: 8px">
              <span class="sp-chip" data-part="file" style="cursor: grab; touch-action: none">${n(`share`)} report.pdf</span>
              <div class="sp-line" style="width: 80%"></div>
              <div class="sp-line" style="width: 64%"></div>
            </div>
          </section>
          <div class="sp-stack sp-grow" style="gap: 10px">
            <div
              data-part="zone"
              data-subject
              role="button"
              aria-label="Drop files to upload"
              style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; height: 94px; border: 2px dashed var(--sp-line); border-radius: var(--sp-radius)"
            >
              <span class="sp-text sp-text--ink" data-part="zone-label">Drop a file here</span>
              <span class="sp-label">PDF or PNG, up to 10 MB</span>
            </div>
            <div style="position: relative; height: 32px">
              <div
                class="sp-row sp-context"
                data-part="uploads-empty"
                style="position: absolute; inset: 0; align-items: center"
              >
                <span class="sp-label">Nothing uploaded yet</span>
              </div>
              <div
                class="sp-row sp-surface"
                data-part="dropped-file"
                hidden
                style="position: absolute; inset: 0; align-items: center; gap: 8px; padding: 0 10px; font-size: 13px"
              >
                ${n(`check`)}
                <span class="sp-grow">report.pdf</span>
                <span class="sp-label">240 KB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`zone`),a=e(r,`zone-label`),o=e(r,`dropped-file`),s=e(r,`uploads-empty`),c=!1,l=(e,t)=>{let n=i.getBoundingClientRect();return e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom},u=e=>{t(i,`data-active`,e),i.style.background=e?`var(--sp-accent-soft)`:``,i.style.borderColor=e?`var(--sp-accent)`:``,a.textContent=e?`Release to upload`:`Drop a file here`},d=e(r,`file`);d.addEventListener(`pointerdown`,e=>{e.isTrusted&&d.setPointerCapture(e.pointerId),c=!0}),r.addEventListener(`pointermove`,e=>{c&&u(l(e.clientX,e.clientY))});let f=e=>{if(!c)return;c=!1;let t=l(e.clientX,e.clientY);u(!1),t&&(o.hidden=!1,s.hidden=!0)};r.addEventListener(`pointerup`,f),r.addEventListener(`pointercancel`,f)}export{r as mount};