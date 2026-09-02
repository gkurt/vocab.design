import{n as e,t}from"./parts.C-YLuC7Q.js";var n=(e,t)=>`<span style="color: var(--sp-accent)">${e}="${t}"</span>`,r=[`&lt;button ${n(`command`,`show-modal`)} ${n(`commandfor`,`confirm`)}&gt;Delete&lt;/button&gt;`,`&lt;dialog id="confirm"<span data-part="open-attr" hidden style="color: var(--sp-accent)"> open</span>&gt;`,`  &lt;button ${n(`command`,`close`)} ${n(`commandfor`,`confirm`)}&gt;Keep&lt;/button&gt;`,`  &lt;button ${n(`command`,`close`)} ${n(`commandfor`,`confirm`)}&gt;Delete&lt;/button&gt;`,`&lt;/dialog&gt;`].join(`
`);function i(n){n.innerHTML=`
    <div class="sp-app">
      <div style="display: flex; flex-direction: column; gap: 8px">
        <div class="sp-frame sp-frame--wide" style="height: 172px">
          <div class="sp-topbar sp-context">
            <span class="sp-heading" style="font-size: 13px">Billing</span>
          </div>
          <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
            <div class="sp-surface sp-context" style="padding: 10px 12px">
              <div class="sp-heading" style="font-size: 13px">Invoice 4127</div>
              <div class="sp-text" style="font-size: 12px">Draft, never sent</div>
            </div>
            <div class="sp-row" style="justify-content: flex-end">
              <button
                class="sp-button sp-button--sm"
                type="button"
                data-part="invoke"
                data-subject
                command="show-modal"
                commandfor="confirm"
              >
                Delete
              </button>
            </div>
          </div>

          <div class="sp-scrim" data-part="scrim"></div>
          <div
            class="sp-dialog sp-context"
            data-part="dialog"
            id="confirm"
            role="dialog"
            aria-label="Delete invoice 4127"
            style="width: 246px; padding: 14px 16px"
          >
            <div class="sp-heading" style="font-size: 14px">Delete invoice 4127?</div>
            <p class="sp-text" style="margin: 6px 0 12px">The draft goes for good.</p>
            <div class="sp-row" style="justify-content: flex-end">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="keep" command="close" commandfor="confirm">
                Keep
              </button>
              <button class="sp-button sp-button--sm" type="button" data-part="confirm" command="close" commandfor="confirm">Delete</button>
            </div>
          </div>
        </div>

        <pre
          data-part="code"
          class="sp-surface"
          style="margin: 0; padding: 9px 12px; font-family: ui-monospace, monospace; font-size: 10px; line-height: 1.6;
                 color: var(--sp-ink); white-space: pre"
        >${r}</pre>
      </div>
    </div>
  `;let i=e(n,`dialog`),a=e(n,`scrim`),o=e(n,`open-attr`),s=e=>{t(i,`data-open`,e),t(a,`data-open`,e),o.hidden=!e};e(n,`invoke`).addEventListener(`click`,()=>s(!0));for(let t of[`keep`,`confirm`])e(n,t).addEventListener(`click`,()=>s(!1));s(!1)}export{i as mount};