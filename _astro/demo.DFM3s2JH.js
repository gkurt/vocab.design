import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=`Harbour`,r=196,i=30,a=(e,t)=>`
  <div class="sp-row sp-context" style="height: ${i}px; gap: 10px">
    <span class="sp-label" style="width: 92px; flex: 0 0 auto">${e}</span>
    <span class="sp-text sp-text--ink sp-grow">${t}</span>
  </div>`;function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Project settings</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center">
          <div class="sp-surface sp-grow" style="padding: 8px 12px">
            ${a(`Owner`,`Rosa Marin`)}
            <div class="sp-divider"></div>
            <div class="sp-row" style="height: ${i}px; gap: 10px">
              <span class="sp-label sp-context" id="vd-ie-label" style="width: 92px; flex: 0 0 auto">Project name</span>
              <div
                data-part="field"
                data-subject
                data-mode="view"
                style="position: relative; width: ${r}px; height: ${i}px"
              >
                <div class="sp-row" data-part="view" style="height: 100%; gap: 6px">
                  <span class="sp-text sp-text--ink sp-grow" data-part="value" data-value="${n}">${n}</span>
                  <button
                    class="sp-icon-button"
                    type="button"
                    data-part="edit"
                    data-aim
                    aria-label="Edit project name"
                  >${t(`pencil`)}</button>
                </div>
                <div class="sp-row" data-part="edit-mode" hidden style="height: 100%; gap: 4px">
                  <input
                    class="sp-input sp-grow"
                    type="text"
                    data-part="input"
                    aria-labelledby="vd-ie-label"
                    style="height: 28px; padding: 4px 8px"
                  />
                  <button class="sp-icon-button" type="button" data-part="save" aria-label="Save">${t(`check`)}</button>
                  <button class="sp-icon-button" type="button" data-part="cancel" aria-label="Cancel">${t(`close`)}</button>
                </div>
              </div>
            </div>
            <div class="sp-divider"></div>
            ${a(`Time zone`,`Europe/Lisbon`)}
          </div>
        </div>
      </div>
    </div>
  `;let s=e(o,`field`),c=e(o,`view`),l=e(o,`edit-mode`),u=e(o,`value`),d=e(o,`input`),f=()=>{d.value=u.dataset.value??``,c.hidden=!0,l.hidden=!1,s.dataset.mode=`edit`},p=e=>{if(e){let e=d.value.trim()||(u.dataset.value??``);u.textContent=e,u.dataset.value=e}l.hidden=!0,c.hidden=!1,s.dataset.mode=`view`};e(o,`edit`).addEventListener(`click`,()=>f()),e(o,`save`).addEventListener(`click`,()=>p(!0)),e(o,`cancel`).addEventListener(`click`,()=>p(!1)),s.addEventListener(`keydown`,e=>{let t=e.key;s.dataset.mode===`edit`&&(t===`Escape`&&p(!1),t===`Enter`&&p(!0))})}export{o as mount};