import{n as e}from"./parts.C-YLuC7Q.js";var t=`Enter a postcode, like SW1A 1AA`,n=`Postcodes have a space, like SW1A 1AA`;function r(e){if(e===``)return t;if(!/^[a-z]{1,2}\d[a-z\d]?\s\d[a-z]{2}$/i.test(e))return n}function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-heading sp-context">Delivery address</div>
        <div class="sp-field" style="margin-top: 14px">
          <div class="sp-stack sp-context" style="gap: 4px">
            <label class="sp-label" for="vd-postcode">Postcode</label>
            <input
              class="sp-input"
              id="vd-postcode"
              data-part="input"
              type="text"
              autocomplete="off"
              spellcheck="false"
              aria-describedby="vd-postcode-error"
            />
          </div>
          <div data-part="slot" style="flex: 0 0 auto">
            <p
              class="sp-text sp-text--ink"
              id="vd-postcode-error"
              data-part="error"
              data-subject
              role="alert"
              style="margin: 0"
              hidden
            ></p>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 14px">
          <button class="sp-button" data-part="submit" type="button">Continue</button>
          <span class="sp-text" data-part="status">Step 2 of 4</span>
        </div>
      </div>
    </div>
  `;let a=e(i,`input`),o=e(i,`slot`),s=e(i,`error`),c=0;s.hidden=!1;for(let e of[t,n])s.textContent=e,c=Math.max(c,o.offsetHeight);s.textContent=``,s.hidden=!0,o.style.height=`${c}px`,e(i,`submit`).addEventListener(`click`,()=>{let e=r(a.value.trim());s.hidden=e===void 0,s.textContent=e??``,e?a.setAttribute(`aria-invalid`,`true`):a.removeAttribute(`aria-invalid`)})}export{i as mount};