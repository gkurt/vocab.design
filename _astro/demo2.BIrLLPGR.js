import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n={google:`<path d="M12.2 10.6h8.4a8.6 8.6 0 1 1-2.5-5.9" fill="none" stroke="currentcolor" stroke-width="1.8" stroke-linejoin="round" />`,apple:`
    <path d="M16.3 12.7c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8s-1.8-.8-2.9-.8c-1.5 0-2.9.9-3.6 2.2-1.6 2.7-.4 6.8 1.1 9 .7 1.1 1.6 2.3 2.8 2.3 1.1 0 1.5-.7 2.9-.7s1.7.7 2.9.7 2-1.1 2.7-2.2c.9-1.3 1.2-2.5 1.2-2.6-.1 0-2.4-.9-2.4-3.7z" />
    <path d="M14.4 6.1c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.7-.9 2.8 1 .1 2-.5 2.6-1.3z" />`,microsoft:`
    <rect x="3.6" y="3.6" width="7.6" height="7.6" /><rect x="12.8" y="3.6" width="7.6" height="7.6" />
    <rect x="3.6" y="12.8" width="7.6" height="7.6" /><rect x="12.8" y="12.8" width="7.6" height="7.6" />`},r={google:`Google`,apple:`Apple`,microsoft:`Microsoft`};function i(e){return`<svg viewBox="0 0 24 24" width="17" height="17" fill="currentcolor" aria-hidden="true" style="flex: 0 0 auto">${n[e]}</svg>`}function a(e){return`
    <button class="sp-button sp-button--ghost" data-part="provider-${e}" type="button"
            style="display: flex; align-items: center; justify-content: flex-start; gap: 10px; width: 100%; padding: 6px 12px; font-size: 13px">
      ${i(e)}Continue with ${r[e]}
    </button>`}function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 306px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Studio</span><span class="sp-label">Sign in</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column">

          <section data-part="choose-step" style="display: flex; flex-direction: column; gap: 7px; flex: 1 1 auto">
            <span class="sp-heading sp-context" style="font-size: 14px">Sign in to Studio</span>
            <div class="sp-stack" data-part="providers" data-subject style="gap: 6px">
              ${a(`google`)}${a(`apple`)}${a(`microsoft`)}
            </div>
            <div class="sp-row sp-context" style="gap: 8px">
              <span class="sp-divider sp-grow"></span><span class="sp-label">or</span><span class="sp-divider sp-grow"></span>
            </div>
            <div class="sp-row sp-context" style="gap: 8px">
              <input class="sp-input sp-grow" data-part="email" type="email" placeholder="you@example.com" aria-label="Email address" />
              <button class="sp-button sp-button--sm" data-part="email-continue" type="button">Continue</button>
            </div>
            <span class="sp-label sp-context" data-part="email-note" role="status" style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap"></span>
          </section>

          <section data-part="consent-step" data-provider="" class="sp-context" hidden style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto">
            <span class="sp-row" style="gap: 8px">
              <span data-part="consent-mark" style="display: flex"></span>
              <span class="sp-heading" data-part="consent-title" style="font-size: 14px">Google</span>
            </span>
            <span class="sp-text">Studio wants to sign you in. It will receive:</span>
            <span class="sp-row" style="gap: 8px">${t(`check`)}<span class="sp-text sp-text--ink">Your name, Ada Mbeki</span></span>
            <span class="sp-row" style="gap: 8px">${t(`check`)}<span class="sp-text sp-text--ink">Your email, ada@studio.example</span></span>
            <div class="sp-row" style="gap: 8px; margin-top: auto">
              <button class="sp-button sp-button--sm" data-part="allow" type="button">Continue</button>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="deny" type="button">Cancel</button>
            </div>
          </section>

          <section data-part="done-step" class="sp-context" hidden style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto">
            <span class="sp-row" style="gap: 8px">${t(`check`)}<span class="sp-heading" style="font-size: 14px">Signed in as Ada Mbeki</span></span>
            <span class="sp-text" data-part="done-note">Studio never held a password for this account. Coming back by email would need the same account linked.</span>
          </section>

        </div>
      </div>
    </div>
  `;let s=e(o,`choose-step`),c=e(o,`consent-step`),l=e(o,`done-step`),u=e(o,`consent-mark`),d=e(o,`consent-title`),f=e=>{s.hidden=e!==`choose`,c.hidden=e!==`consent`,l.hidden=e!==`done`};for(let t of Object.keys(n))e(o,`provider-${t}`).addEventListener(`click`,()=>{c.dataset.provider=t,u.innerHTML=i(t),d.textContent=r[t],f(`consent`)});e(o,`allow`).addEventListener(`click`,()=>f(`done`)),e(o,`deny`).addEventListener(`click`,()=>f(`choose`)),e(o,`email-continue`).addEventListener(`click`,()=>{e(o,`email-note`).textContent=`That route sends a code instead, and it is where linking has to happen.`})}export{o as mount};