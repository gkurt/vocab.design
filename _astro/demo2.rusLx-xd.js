import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={balanced:`Two paths in one row, the same size and the same weight, and neither one pre-selected.`,account:`The counter-example: the account form is the step, and the guest path has shrunk to small print under it.`},n={balanced:`Continue as guest`,account:`continue without an account`},r={balanced:`sp-button sp-button--sm`,account:``},i={balanced:`padding: 7px 12px`,account:[`border: 0`,`background: transparent`,`font: inherit`,`font-size: 10px`,`color: var(--sp-muted)`,`text-decoration: underline`,`padding: 0`,`cursor: pointer`].join(`; `)},a={balanced:`
    <div class="sp-row" style="height: 100%; gap: 10px; align-items: stretch">
      <div class="sp-surface" style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 6px; padding: 10px 12px">
        <span class="sp-heading" style="font-size: 13px">Check out as a guest</span>
        <span class="sp-text sp-grow" style="font-size: 11px">Pay now. We offer to save your details afterwards.</span>
        <span data-part="guest-slot" style="display: flex"></span>
      </div>
      <div class="sp-surface sp-context" style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 6px; padding: 10px 12px">
        <span class="sp-heading" style="font-size: 13px">Sign in</span>
        <span class="sp-text sp-grow" style="font-size: 11px">Your saved address and cards are already here.</span>
        <span style="display: flex">
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="signin" type="button" style="padding: 7px 12px">Sign in</button>
        </span>
      </div>
    </div>`,account:`
    <div class="sp-surface sp-context" style="height: 100%; display: flex; flex-direction: column; gap: 8px; padding: 12px">
      <span class="sp-heading" style="font-size: 13px">Create an account to continue</span>
      <div class="sp-row" style="gap: 8px">
        <input class="sp-input" data-part="email" type="text" aria-label="Email address" placeholder="Email address" style="flex: 1 1 0; min-width: 0; padding: 5px 9px; font-size: 12px" />
        <input class="sp-input" data-part="password" type="password" aria-label="Choose a password" placeholder="Choose a password" style="flex: 1 1 0; min-width: 0; padding: 5px 9px; font-size: 12px" />
      </div>
      <div class="sp-row" style="gap: 14px; margin-top: 2px">
        <button class="sp-button sp-button--sm" data-part="create" type="button">Create account and continue</button>
        <span data-part="guest-slot" style="display: flex"></span>
      </div>
    </div>`};function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Wren &amp; Halliday</span>
          <span class="sp-label" style="font-size: 11px">Step 1 of 3</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">

          <div class="sp-surface sp-context sp-row sp-row--between" style="flex: 0 0 auto; height: 32px; padding: 0 10px">
            <span class="sp-text sp-text--ink" style="font-size: 12px">Reading lamp, brass</span>
            <span class="sp-text" style="font-size: 12px">52.50</span>
          </div>

          <span class="sp-label sp-context" data-stage-verdict data-part="caption" style="flex: 0 0 auto; height: 14px; font-size: 11px">${t.balanced}</span>

          <div data-part="area" style="flex: 0 0 auto; height: 124px">${a.balanced}</div>

        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Version" data-term="balanced" data-part="mode" data-value="balanced">
          <button class="sp-segment" data-part="mode-balanced" value="balanced" style="padding: 5px 10px">Balanced</button>
          <button class="sp-segment" data-part="mode-account" value="account" style="padding: 5px 10px">Account first</button>
        </sp-segmented>
      </div>
    </div>
  `;let s=e(o,`area`),c=e(o,`caption`),l=document.createElement(`button`);l.type=`button`,l.dataset.part=`guest`,l.setAttribute(`data-subject`,``),l.setAttribute(`data-pose`,`[data-mode=balanced]`);let u=o=>{s.innerHTML=a[o],l.dataset.mode=o,l.className=r[o],l.setAttribute(`style`,i[o]),l.textContent=n[o],e(s,`guest-slot`).append(l),c.textContent=t[o]};e(o,`mode`).addEventListener(`change`,e=>{u(e.detail===`account`?`account`:`balanced`)}),u(`balanced`)}export{o as mount};