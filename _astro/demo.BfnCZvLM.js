import{n as e}from"./parts.C-YLuC7Q.js";var t=320,n=`Needs an @, like ada@example.com`,r=`Finish the domain, like example.com`,i=`We can reach you here`;function a(e){let[t,a,...o]=e.split(`@`);return!t||!a||o.length>0?{state:`invalid`,text:n}:/^[^\s@]+\.[a-z]{2,}$/i.test(a)?{state:`valid`,text:i}:{state:`invalid`,text:r}}function o(o,s){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-heading sp-context">Create your account</div>
        <div class="sp-field" data-part="field" data-subject data-state="untouched" style="margin-top: 14px">
          <label class="sp-label" for="vd-email">Email</label>
          <input
            class="sp-input"
            id="vd-email"
            data-part="input"
            type="text"
            inputmode="email"
            autocomplete="off"
            spellcheck="false"
            placeholder="you@example.com"
            aria-describedby="vd-email-verdict"
          />
          <div data-part="slot" style="flex: 0 0 auto">
            <span class="sp-text" id="vd-email-verdict" data-part="verdict" role="status"></span>
          </div>
        </div>
        <div class="sp-row sp-context" style="margin-top: 14px">
          <button class="sp-button" data-part="submit" type="button">Create account</button>
          <span class="sp-text">Step 1 of 3</span>
        </div>
      </div>
    </div>
  `;let c=e(o,`field`),l=e(o,`input`),u=e(o,`slot`),d=e(o,`verdict`),f=0;for(let e of[n,r,i])d.textContent=e,f=Math.max(f,u.offsetHeight);d.textContent=``,u.style.height=`${f}px`;let p=(e,t)=>{c.dataset.state=e,d.textContent=t,d.className=e===`invalid`?`sp-text sp-text--ink`:`sp-text`,e===`invalid`?l.setAttribute(`aria-invalid`,`true`):l.removeAttribute(`aria-invalid`)},m,h=()=>{s.clearTimeout(m);let e=l.value.trim();if(e===``){p(`untouched`,``);return}let t=a(e);p(t.state,t.text)};l.addEventListener(`input`,()=>{if(s.clearTimeout(m),l.value.trim()===``){p(`untouched`,``);return}m=s.setTimeout(h,t)}),l.addEventListener(`blur`,h)}export{o as mount};