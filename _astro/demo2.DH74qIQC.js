import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=900;function r(r,i){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 274px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Harbour Weekly</span><span class="sp-label">Subscribe</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 9px">
          <div class="sp-row" style="align-items: stretch; gap: 10px; flex: 1 1 auto; min-height: 0">

            <section class="sp-context" style="display: flex; flex-direction: column; gap: 6px; flex: 0 0 auto; width: 184px">
              <span class="sp-label" style="font-size: 10px">Sign up</span>
              <input class="sp-input" data-part="email" type="email" value="ada@studio.example" readonly aria-label="Email address" style="font-size: 12px" />
              <button class="sp-button sp-button--sm" data-part="subscribe" type="button">Subscribe</button>
              <span class="sp-text" data-part="pending-note" style="height: 46px; font-size: 11px; line-height: 1.35; visibility: hidden">
                Confirmation sent to ada@studio.example.
              </span>
            </section>

            <section style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 auto; min-width: 0">
              <span class="sp-label sp-context" style="font-size: 10px">Inbox</span>
              <div data-part="mail-slot" style="position: relative; flex: 1 1 auto; min-height: 0">
                <div class="sp-surface sp-context sp-row" data-part="mail-empty" style="position: absolute; inset: 0; gap: 8px; padding: 0 10px">
                  ${t(`inbox`)}<span class="sp-text" style="font-size: 11px">Nothing sent yet.</span>
                </div>
                <div
                  class="sp-surface"
                  data-part="mail"
                  style="position: absolute; inset: 0; display: flex; flex-direction: column; gap: 5px; padding: 8px 10px; opacity: 0; visibility: hidden; transition: opacity 0.22s, visibility 0.22s"
                >
                  <span class="sp-text sp-text--ink sp-context" style="font-size: 11px; font-weight: 500">Harbour Weekly</span>
                  <span class="sp-text sp-context" style="font-size: 11px; line-height: 1.3">Did you ask for this? Confirm and we start sending.</span>
                  <button class="sp-button sp-button--sm" data-part="confirm" data-subject type="button" style="margin-top: auto">Confirm subscription</button>
                </div>
              </div>
            </section>

          </div>

          <div
            class="sp-row sp-row--between sp-context"
            data-part="ledger"
            data-confirmed="412"
            data-awaiting="0"
            style="flex: 0 0 auto; gap: 8px; height: 20px"
          >
            <span class="sp-label" style="font-size: 10px">The list</span>
            <span class="sp-text" data-part="ledger-text" style="font-size: 11px">412 confirmed &middot; 0 awaiting confirmation</span>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(r,`subscribe`),o=e(r,`pending-note`),s=e(r,`mail`),c=e(r,`mail-empty`),l=e(r,`confirm`),u=e(r,`ledger`),d=e(r,`ledger-text`),f=(e,t)=>{u.dataset.confirmed=String(e),u.dataset.awaiting=String(t),d.textContent=`${e} confirmed · ${t} awaiting confirmation`};a.addEventListener(`click`,()=>{a.getAttribute(`aria-disabled`)!==`true`&&(a.setAttribute(`aria-disabled`,`true`),a.textContent=`Signed up, not subscribed`,o.style.visibility=`visible`,f(412,1),i.setTimeout(()=>{c.hidden=!0,s.style.opacity=`1`,s.style.visibility=`visible`},n))}),l.addEventListener(`click`,()=>{l.getAttribute(`aria-disabled`)!==`true`&&(l.setAttribute(`aria-disabled`,`true`),l.textContent=`Confirmed`,f(413,0))})}export{r as mount};