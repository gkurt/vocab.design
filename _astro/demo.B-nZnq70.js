import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=800,i=`
  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentcolor" stroke-width="1.5"
       stroke-linecap="round" aria-hidden="true" style="display: block">
    <path d="M4 9.4A9 9 0 0 1 12 4.6c1.5 0 2.9.35 4.1 1" />
    <path d="M6.2 15.6A13 13 0 0 0 6.6 12a5.4 5.4 0 0 1 8.2-4.6" />
    <path d="M17.4 9.6c.4.75.6 1.6.6 2.4 0 1.9-.2 3.5-.6 4.9" />
    <path d="M8.6 18.5A11 11 0 0 0 10 12a2 2 0 0 1 4 0v1.4" />
    <path d="M12 10.2a2 2 0 0 1 2 2c0 2.4-.3 4.3-1 5.9" />
  </svg>`;function a(a,o){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 288px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Studio</span><span class="sp-label">studio.example</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">

          <section data-part="signin-step" style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto">
            <span class="sp-heading" style="font-size: 14px">Sign in to Studio</span>
            <span class="sp-text">Ada Mbeki has a passkey saved on this device.</span>
            <input class="sp-input" data-part="email" type="email" value="ada@studio.example" readonly aria-label="Email address" />
            <button class="sp-button" data-part="use-passkey" type="button">Sign in with a passkey</button>
            <div class="sp-row" style="gap: 8px">
              <span class="sp-divider sp-grow"></span><span class="sp-label">or</span><span class="sp-divider sp-grow"></span>
            </div>
            <button class="sp-button sp-button--ghost" data-part="use-password" type="button">Use a password instead</button>
          </section>

          <section data-part="done-step" hidden style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto">
            <span class="sp-row" style="gap: 8px">${n(`check`)}<span class="sp-heading" style="font-size: 14px">Signed in as Ada Mbeki</span></span>
            <span class="sp-text">The device signed a challenge for studio.example. No secret was sent, and none was stored.</span>
          </section>

        </div>

        <div class="sp-scrim" data-part="scrim"></div>
        <div
          class="sp-dialog"
          data-part="prompt"
          data-subject
          data-state="asking"
          role="dialog"
          aria-label="Use Touch ID"
          style="display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center"
        >
          <span data-part="prompt-mark" style="color: var(--sp-accent); transition: color 0.2s ease">${i}</span>
          <span class="sp-heading" data-part="prompt-title" style="font-size: 14px">Use Touch ID?</span>
          <span class="sp-text" data-part="prompt-body" style="height: 40px">studio.example wants to verify you with the passkey on this device.</span>
          <div class="sp-row" data-part="prompt-actions" style="gap: 8px; height: 30px; margin-top: 2px">
            <button class="sp-button sp-button--sm" data-part="approve" type="button">Approve</button>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="cancel" type="button">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(a,`scrim`),c=e(a,`prompt`),l=e(a,`prompt-title`),u=e(a,`prompt-body`),d=e(a,`prompt-actions`),f=e(a,`prompt-mark`),p=e(a,`signin-step`),m=e(a,`done-step`),h,g=()=>{o.clearTimeout(h),t(c,`data-open`,!1),t(s,`data-open`,!1),c.dataset.state=`asking`,l.textContent=`Use Touch ID?`,u.textContent=`studio.example wants to verify you with the passkey on this device.`,f.style.color=`var(--sp-accent)`,d.style.visibility=`visible`};e(a,`use-passkey`).addEventListener(`click`,()=>{m.hidden&&(t(c,`data-open`,!0),t(s,`data-open`,!0))}),e(a,`cancel`).addEventListener(`click`,g),e(a,`approve`).addEventListener(`click`,()=>{c.dataset.state===`asking`&&(c.dataset.state=`signing`,l.textContent=`Signing the challenge`,u.textContent=`The private key stays here. Only a signature leaves.`,f.style.color=`var(--sp-muted)`,d.style.visibility=`hidden`,h=o.setTimeout(()=>{g(),p.hidden=!0,m.hidden=!1},r))})}export{a as mount};