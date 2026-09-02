import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=1100;function r(r,i){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 306px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Studio</span><span class="sp-label">Sign in</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">

          <div data-part="stage" class="sp-context" style="flex: 0 0 auto; height: 139px">
            <section data-part="email-step" style="display: flex; flex-direction: column; gap: 8px; height: 100%">
              <span class="sp-heading" style="font-size: 14px">Sign in</span>
              <span class="sp-text">No password. We mail you a link, you click it, you are in.</span>
              <input class="sp-input" data-part="email" type="email" value="ada@studio.example" readonly aria-label="Email address" />
              <button class="sp-button" data-part="send" type="button" style="margin-top: auto">Send sign-in link</button>
            </section>

            <section data-part="wait-step" hidden style="display: flex; flex-direction: column; gap: 8px; height: 100%">
              <span class="sp-heading" style="font-size: 14px">Check your email</span>
              <span class="sp-text">
                We sent a link to ada@studio.example. It works once and expires in 15 minutes.
              </span>
              <div class="sp-row sp-row--between" style="margin-top: auto">
                <span class="sp-label" data-part="wait-status" role="status">Waiting for the message</span>
                <button class="sp-button sp-button--quiet sp-button--sm" data-part="resend" type="button" style="font-size: 12px">Resend</button>
              </div>
            </section>

            <section data-part="done-step" hidden style="display: flex; flex-direction: column; gap: 8px; height: 100%">
              <span class="sp-row" style="gap: 8px">${t(`check`)}<span class="sp-heading" style="font-size: 14px">Signed in as Ada Mbeki</span></span>
              <span class="sp-text">That link is spent. The next sign-in gets a new one.</span>
            </section>
          </div>

          <div class="sp-surface" data-part="inbox" style="flex: 0 0 auto; height: 88px; padding: 10px">
            <div class="sp-row sp-context" style="gap: 6px; height: 16px">
              ${t(`inbox`)}<span class="sp-label sp-grow">Inbox</span><span class="sp-label" data-part="inbox-note">empty</span>
            </div>
            <div
              class="sp-row"
              data-part="message"
              style="gap: 10px; height: 44px; margin-top: 8px; opacity: 0; visibility: hidden; translate: 0 6px; transition: opacity 0.24s, visibility 0.24s, translate 0.24s var(--sp-ease)"
            >
              <span class="sp-grow sp-context" style="min-width: 0">
                <span class="sp-text sp-text--ink" style="font-size: 12px">Studio</span><br />
                <span class="sp-text" style="font-size: 12px">Your sign-in link, good for one use</span>
              </span>
              <button class="sp-button sp-button--sm" data-part="link" data-subject type="button">Sign in to Studio</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;let a=e(r,`email-step`),o=e(r,`wait-step`),s=e(r,`done-step`),c=e(r,`message`),l=e(r,`link`),u=e(r,`inbox-note`),d=e(r,`wait-status`),f,p=()=>{i.clearTimeout(f),c.style.opacity=`0`,c.style.visibility=`hidden`,c.style.translate=`0 6px`,u.textContent=`empty`,f=i.setTimeout(()=>{c.style.opacity=`1`,c.style.visibility=`visible`,c.style.translate=`0 0`,u.textContent=`1 new`,d.textContent=`Link delivered, open it below`},n)};e(r,`send`).addEventListener(`click`,()=>{a.hidden=!0,o.hidden=!1,s.hidden=!0,d.textContent=`Waiting for the message`,p()}),e(r,`resend`).addEventListener(`click`,()=>{s.hidden&&(d.textContent=`Sending another link`,p())}),l.addEventListener(`click`,()=>{l.getAttribute(`aria-disabled`)!==`true`&&(l.setAttribute(`aria-disabled`,`true`),o.hidden=!0,a.hidden=!0,s.hidden=!1)})}export{r as mount};