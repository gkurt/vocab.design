import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n=`284015`,r={idle:`Six digits from your authenticator app.`,reject:`That code is not right, try again.`,accept:`Code accepted, signing you in.`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 306px">
        <div class="sp-stack sp-context" style="gap: 3px">
          <span class="sp-heading">Confirm it is you</span>
          <span class="sp-text">Sent to ada@example.com</span>
        </div>
        <div class="sp-field" data-part="field" data-subject style="margin-top: 14px">
          <label class="sp-label" for="sp-shake-code">Verification code</label>
          <input class="sp-input" id="sp-shake-code" data-part="code" placeholder="000000" inputmode="numeric" autocomplete="off" />
        </div>
        <p
          class="sp-text sp-context"
          data-part="message"
          data-tone="idle"
          style="min-height: 20px; margin: 8px 0 0; white-space: nowrap"
        >${r.idle}</p>
        <button class="sp-button sp-context" type="button" data-part="verify" style="width: 100%; margin-top: 12px">Verify</button>
      </div>
    </div>
  `;let a=e(i,`field`),o=e(i,`code`),s=e(i,`message`),c=()=>t(i),l=e=>{s.dataset.tone=e,s.textContent=r[e],s.classList.toggle(`sp-text--ink`,e!==`idle`)},u=()=>{c()||a.animate([{transform:`translateX(0)`},{transform:`translateX(-8px)`},{transform:`translateX(7px)`},{transform:`translateX(-4px)`},{transform:`translateX(3px)`},{transform:`translateX(0)`}],{duration:420,easing:`ease-in-out`})};e(i,`verify`).addEventListener(`click`,()=>{if(o.value===n){l(`accept`);return}l(`reject`),o.value=``,u()})}export{i as mount};