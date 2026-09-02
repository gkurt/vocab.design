import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-stack sp-context">
          <div class="sp-field">
            <span class="sp-label">Project name</span>
            <span class="sp-input">Northwind</span>
          </div>
          <div class="sp-field">
            <span class="sp-label">Visibility</span>
            <span class="sp-input">Everyone at Acme</span>
          </div>
        </div>
        <div data-part="disclosure" data-subject style="margin-top: 14px">
          <button class="sp-button sp-button--quiet sp-button--sm sp-row" data-part="toggle" aria-expanded="false" aria-controls="advanced">
            ${t(`chevronRight`,`sp-icon--chevron`)} Advanced options
          </button>
          <div class="sp-stack" data-part="advanced" id="advanced" hidden style="margin-top: 10px; padding-left: 6px">
            <div class="sp-field">
              <span class="sp-label">Default branch</span>
              <span class="sp-input">main</span>
            </div>
            <div class="sp-field">
              <span class="sp-label">Retention</span>
              <span class="sp-input">90 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let r=e(n,`toggle`),i=e(n,`advanced`);r.addEventListener(`click`,()=>{let e=i.hidden;i.hidden=!e,r.setAttribute(`aria-expanded`,String(e))})}export{n as mount};