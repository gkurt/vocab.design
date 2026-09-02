import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-heading sp-context">Sign in</div>
        <div class="sp-field" style="margin-top: 14px">
          <label class="sp-label sp-context" for="vd-password">Password</label>
          <div style="position: relative">
            <input
              class="sp-input sp-context"
              id="vd-password"
              data-part="input"
              type="password"
              value="hunter2-rides-again"
              autocomplete="off"
              spellcheck="false"
              style="padding-right: 36px"
            />
            <button
              class="sp-icon-button"
              data-part="toggle"
              data-subject
              type="button"
              aria-pressed="false"
              aria-controls="vd-password"
              aria-label="Show password"
              style="position: absolute; right: 3px; top: 50%; transform: translateY(-50%); width: 26px; height: 26px"
            >${t(`eye`)}</button>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 14px">
          <button class="sp-button" data-part="signin" type="button">Sign in</button>
          <span class="sp-text">Forgot password?</span>
        </div>
      </div>
    </div>
  `;let r=e(n,`input`),i=e(n,`toggle`),a=e=>{r.type=e?`text`:`password`,i.setAttribute(`aria-pressed`,String(e)),i.innerHTML=t(e?`eyeOff`:`eye`)};i.addEventListener(`click`,()=>a(i.getAttribute(`aria-pressed`)!==`true`))}export{n as mount};