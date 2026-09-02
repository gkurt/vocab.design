import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=`481207`,i=6,a=1100;function o(o,s){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 320px; height: 294px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Studio</span><span class="sp-label">Sign in</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">

          <div data-part="stage" style="flex: 0 0 auto; height: 176px">
            <section class="sp-surface sp-context" data-part="address-step"
                     style="display: flex; flex-direction: column; gap: 8px; height: 100%; padding: 14px">
              <span class="sp-heading" style="font-size: 14px">Sign in</span>
              <span class="sp-text">No password. We send a ${i} digit code to your inbox and you type it back here.</span>
              <input class="sp-input" data-part="email" type="email" value="ada@studio.example" readonly aria-label="Email address" />
              <button class="sp-button" data-part="send" type="button" style="margin-top: auto">Send code</button>
            </section>

            <section class="sp-surface" data-part="code-step" data-state="waiting" data-subject hidden
                     style="display: flex; flex-direction: column; gap: 8px; height: 100%; padding: 14px">
              <span class="sp-heading" style="font-size: 14px">Enter the code</span>
              <span class="sp-text">Sent to ada@studio.example. It lasts 10 minutes.</span>
              <div class="sp-row" style="gap: 8px">
                <input
                  class="sp-input"
                  data-part="code"
                  type="text"
                  inputmode="numeric"
                  autocomplete="one-time-code"
                  spellcheck="false"
                  aria-label="${i} digit code"
                  placeholder="000000"
                  style="flex: 1 1 auto; height: 38px; text-align: center; font-size: 17px; letter-spacing: 5px; font-variant-numeric: tabular-nums"
                />
                <button class="sp-button" data-part="verify" type="button" aria-disabled="true">Verify</button>
              </div>
              <div class="sp-row sp-row--between" style="margin-top: auto">
                <span class="sp-label" data-part="code-status" role="status" style="min-width: 0; overflow: hidden; white-space: nowrap">Waiting for the code</span>
                <button class="sp-button sp-button--quiet sp-button--sm" data-part="resend" type="button" style="font-size: 12px">Resend</button>
              </div>
            </section>
          </div>

          <div class="sp-context" data-part="inbox-slot" style="flex: 0 0 auto; height: 44px">
            <div class="sp-surface sp-row" data-part="inbox"
                 style="gap: 8px; height: 100%; padding: 0 10px; opacity: 0; visibility: hidden; translate: 0 6px; transition: opacity 0.24s, visibility 0.24s, translate 0.24s var(--sp-ease)">
              ${n(`inbox`)}
              <span class="sp-grow" style="min-width: 0">
                <span class="sp-text sp-text--ink" style="font-size: 12px">Studio</span><br />
                <span class="sp-text" style="font-size: 12px">Your code is ${r}</span>
              </span>
              <span class="sp-label">now</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;let c=e(o,`address-step`),l=e(o,`code-step`),u=e(o,`code`),d=e(o,`verify`),f=e(o,`code-status`),p=e(o,`inbox`),m,h=()=>{s.clearTimeout(m),p.style.opacity=`0`,p.style.visibility=`hidden`,p.style.translate=`0 6px`,m=s.setTimeout(()=>{p.style.opacity=`1`,p.style.visibility=`visible`,p.style.translate=`0 0`,l.dataset.state===`waiting`&&(f.textContent=`Code sent, check below`)},a)};e(o,`send`).addEventListener(`click`,()=>{c.hidden=!0,l.hidden=!1,h()}),e(o,`resend`).addEventListener(`click`,()=>{l.dataset.state!==`verified`&&(f.textContent=`Sending another code`,h())}),u.addEventListener(`input`,()=>{if(l.dataset.state===`verified`)return;let e=u.value.replace(/\D/g,``).slice(0,i);u.value=e;let n=e.length===i;t(l,`data-filled`,n),d.setAttribute(`aria-disabled`,String(!n)),n&&(f.textContent=`Ready to check`)}),d.addEventListener(`click`,()=>{if(d.getAttribute(`aria-disabled`)!==`true`){if(u.value!==r){f.textContent=`That code did not match`;return}l.dataset.state=`verified`,u.readOnly=!0,d.setAttribute(`aria-disabled`,`true`),f.textContent=`Signed in as Ada Mbeki`}})}export{o as mount};