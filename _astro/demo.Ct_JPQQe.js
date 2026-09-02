import{n as e}from"./parts.C-YLuC7Q.js";var t=`We only use this to work out delivery.`,n=`Enter a full postcode, like SW1A 2AA.`,r=/^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-heading sp-context">Where should it go?</div>
        <div class="sp-field" data-part="field" data-subject data-state="empty" style="margin-top: 14px">
          <label class="sp-label" for="vd-postcode">Postcode</label>
          <input
            class="sp-input"
            id="vd-postcode"
            data-part="input"
            type="text"
            autocomplete="off"
            spellcheck="false"
            placeholder="SW1A 2AA"
            aria-describedby="vd-postcode-help"
          />
          <div data-part="help-slot" style="flex: 0 0 auto">
            <span class="sp-text" id="vd-postcode-help" data-part="help" data-kind="hint" role="status">${t}</span>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 16px">
          <span class="sp-text" data-part="committed" data-state="idle">No address yet</span>
          <button class="sp-button" data-part="continue" type="button">Continue</button>
        </div>
      </div>
    </div>
  `;let a=e(i,`field`),o=e(i,`input`),s=e(i,`help-slot`),c=e(i,`help`),l=e(i,`committed`),u=0;for(let e of[t,n])c.textContent=e,u=Math.max(u,s.offsetHeight);c.textContent=t,s.style.height=`${u}px`;let d=()=>{c.dataset.kind=`hint`,c.textContent=t,c.className=`sp-text`,o.removeAttribute(`aria-invalid`)};o.addEventListener(`input`,()=>{a.dataset.state===`invalid`&&d(),a.dataset.state=o.value.trim()===``?`empty`:`editing`}),e(i,`continue`).addEventListener(`click`,()=>{let e=o.value.trim();if(!r.test(e)){a.dataset.state=`invalid`,c.dataset.kind=`error`,c.textContent=n,c.className=`sp-text sp-text--ink`,o.setAttribute(`aria-invalid`,`true`);return}a.dataset.state=`accepted`,d(),l.dataset.state=`sent`,l.textContent=`Delivering to ${e.toUpperCase()}`})}export{i as mount};