import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={complete:{role:`switch`,named:!0,exposesValue:!0,verdict:`All three exposed. This one passes.`},unnamed:{role:`switch`,named:!1,exposesValue:!0,verdict:`No name: announced as “switch”. WCAG 4.1.2.`},roleless:{role:``,named:!0,exposesValue:!1,verdict:`No role, no state: announced as a plain button.`}},r=`(none)`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 424px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="complete" data-axis="Build">
            <button class="sp-segment" data-part="seg-complete" value="complete">Switch</button>
            <button class="sp-segment" data-part="seg-unnamed" value="unnamed">No label</button>
            <button class="sp-segment" data-part="seg-roleless" value="roleless">No role</button>
          </sp-segmented>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 12px; padding: 10px 12px">
          <div class="sp-row sp-row--between">
            <span class="sp-text sp-text--ink" id="vd-nrv-label">Auto-save</span>
            <button class="sp-switch" type="button" data-part="control" role="switch" aria-checked="false"
                    aria-labelledby="vd-nrv-label"></button>
          </div>
        </div>

        <div class="sp-surface" data-part="panel" data-subject style="margin-top: 12px; padding: 10px 12px">
          <span class="sp-label">Accessibility tree</span>
          <div class="sp-row sp-row--between" style="height: 20px; margin-top: 6px">
            <span class="sp-label">Name</span>
            <span class="sp-text sp-text--ink" data-part="name" data-state="named"
                  style="font-size: 12px; white-space: nowrap">“Auto-save”</span>
          </div>
          <div class="sp-row sp-row--between" style="height: 20px">
            <span class="sp-label">Role</span>
            <span class="sp-text sp-text--ink" data-part="role" data-state="switch"
                  style="font-size: 12px; white-space: nowrap">switch</span>
          </div>
          <div class="sp-row sp-row--between" style="height: 20px">
            <span class="sp-label">Value</span>
            <span class="sp-text sp-text--ink" data-part="value" data-state="off"
                  style="font-size: 12px; white-space: nowrap">off</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="verdict" data-case="complete"
           style="margin: 10px 0 0; height: 18px; font-size: 12px; white-space: nowrap">${n.complete.verdict}</p>
      </div>
    </div>
  `;let a=e(i,`control`),o=e(i,`name`),s=e(i,`role`),c=e(i,`value`),l=e(i,`verdict`),u=`complete`,d=!1,f=()=>{let e=a.getAttribute(`aria-labelledby`),t=e?i.querySelector(`#${e}`)?.textContent??``:a.textContent?.trim();o.dataset.state=t?`named`:`missing`,o.textContent=t?`“${t}”`:r;let n=a.getAttribute(`role`)??`button`;s.dataset.state=n,s.textContent=n;let l=a.getAttribute(`aria-checked`);c.dataset.state=l===null?`missing`:l===`true`?`on`:`off`,c.textContent=l===null?r:l===`true`?`on`:`off`},p=e=>{u=e;let t=n[e];t.role?a.setAttribute(`role`,t.role):a.removeAttribute(`role`),t.named?a.setAttribute(`aria-labelledby`,`vd-nrv-label`):a.removeAttribute(`aria-labelledby`),t.exposesValue?a.setAttribute(`aria-checked`,String(d)):a.removeAttribute(`aria-checked`),l.dataset.case=e,l.textContent=t.verdict,f()};a.addEventListener(`click`,()=>{d=!0,t(a,`data-checked`,!0),n[u].exposesValue&&a.setAttribute(`aria-checked`,`true`),f()}),e(i,`segmented`).addEventListener(`change`,e=>{p(e.detail)})}export{i as mount};