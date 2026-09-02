import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n={plain:`
    <span class="sp-text" style="font-size: 11px">You get this because you asked for it.</span>
    <span class="sp-text sp-text--ink" data-part="footer-link" style="font-size: 11px; text-decoration: underline">Unsubscribe from Harbour Weekly</span>`,buried:`
    <span class="sp-text" style="font-size: 8px; line-height: 1.5">
      Harbour Weekly is a trading name of Harbour Media Group. This message and any files transmitted with it are
      confidential. You are receiving it because you or someone at your organisation once expressed an interest. To <span data-part="footer-link" style="text-decoration: none">update your communication preferences</span>
      visit your account area and sign in. Registered office 20 Harbour Row.
    </span>`};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          ${t(`inbox`)}<span class="sp-heading sp-grow">Harbour Weekly</span><span class="sp-label">Mailing list</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">

          <div class="sp-surface sp-row" data-part="client-bar" style="flex: 0 0 auto; gap: 10px; padding: 8px 10px">
            <span class="sp-grow sp-context" style="min-width: 0">
              <span class="sp-text sp-text--ink" data-part="bar-line" style="display: block; font-size: 11px">This message is from a mailing list.</span>
            </span>
            <button class="sp-button sp-button--sm" data-part="header-unsub" data-subject type="button" style="flex: 0 0 auto">Unsubscribe</button>
          </div>

          <div class="sp-row sp-context" data-part="receipt-slot" style="flex: 0 0 auto; gap: 6px; height: 16px">
            <span
              class="sp-row"
              data-part="receipt"
              style="gap: 6px; visibility: hidden; opacity: 0; transition: opacity 0.22s"
            >
              ${t(`check`)}<span class="sp-text" style="font-size: 11px">Out of the list. No sign-in, no survey, one request.</span>
            </span>
          </div>

          <div class="sp-stack sp-context" data-part="message" style="flex: 0 0 auto; gap: 7px; padding: 0 2px">
            <div class="sp-line" style="width: 62%"></div>
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 74%"></div>
          </div>

          <div
            class="sp-surface sp-context sp-stack"
            data-part="footer"
            data-form="plain"
            style="flex: 0 0 auto; gap: 3px; height: 66px; margin-top: auto; padding: 7px 9px; overflow: hidden"
          >${n.plain}</div>

        </div>
      </div>
      <sp-segmented data-stage-mode class="sp-segmented" data-axis="Footer" data-part="form" data-value="plain">
        <button class="sp-segment" data-part="form-plain" value="plain">Sender wrote it plainly</button>
        <button class="sp-segment" data-part="form-buried" value="buried">Sender buried it</button>
      </sp-segmented>
    </div>
  `;let i=e(r,`footer`),a=e(r,`header-unsub`),o=e(r,`receipt`),s=e(r,`bar-line`);e(r,`form`).addEventListener(`change`,e=>{let t=e.detail===`buried`?`buried`:`plain`;i.dataset.form=t,i.innerHTML=n[t]}),a.addEventListener(`click`,()=>{a.getAttribute(`aria-disabled`)!==`true`&&(a.setAttribute(`aria-disabled`,`true`),a.textContent=`Unsubscribed`,s.textContent=`You will not get this list again.`,o.style.visibility=`visible`,o.style.opacity=`1`)})}export{r as mount};