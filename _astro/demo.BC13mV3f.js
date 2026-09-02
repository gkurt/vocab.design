import{n as e,t}from"./parts.C-YLuC7Q.js";var n=`cheap-watches-online`,r={idle:{text:`No submissions yet.`,badge:`Waiting`},accepted:{text:`Accepted, and nobody was asked to prove anything.`,badge:`Accepted`},rejected:{text:`Discarded on the server; the sender still sees the thank-you page.`,badge:`Discarded`}};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 278px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Newsletter signup</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column">
          <div class="sp-surface" style="display: flex; flex-direction: column; gap: 8px; padding: 10px 12px">
            <div class="sp-field sp-context">
              <span class="sp-label">Email</span>
              <input class="sp-input" data-part="email" value="ana.ferreira@mailbox.test" readonly aria-label="Email" />
            </div>
            <div
              class="sp-row"
              data-part="honeypot"
              data-subject
              style="gap: 8px; padding: 7px 9px; border: 1px dashed var(--sp-accent); border-radius: 6px; background: var(--sp-accent-soft)"
            >
              <span class="sp-label" style="width: 58px">website</span>
              <input
                class="sp-input sp-grow"
                data-part="bait"
                value=""
                placeholder="leave this field empty"
                readonly
                aria-label="Website, leave this field empty"
              />
            </div>
            <div class="sp-row sp-context" style="gap: 8px; margin-top: 2px">
              <button class="sp-button sp-button--sm" data-part="as-person" type="button">Submit</button>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="as-bot" type="button">Fill the hidden field and submit</button>
            </div>
          </div>
        </div>
        <div
          class="sp-row sp-row--between sp-context"
          data-part="result"
          data-state="idle"
          style="flex: 0 0 auto; gap: 10px; height: 36px; padding: 0 12px; border-top: 1px solid var(--sp-line); background: var(--sp-surface)"
        >
          <span class="sp-text" data-part="result-text" style="font-size: 11px">${r.idle.text}</span>
          <span class="sp-chip" data-part="result-badge" style="cursor: default">${r.idle.badge}</span>
        </div>
      </div>
    </div>
  `;let a=e(i,`honeypot`),o=e(i,`bait`),s=e(i,`result`),c=e(i,`result-text`),l=e(i,`result-badge`),u=e=>{s.dataset.state=e,c.textContent=r[e].text,l.textContent=r[e].badge,t(a,`data-filled`,e===`rejected`)};e(i,`as-person`).addEventListener(`click`,()=>{o.value=``,u(`accepted`)}),e(i,`as-bot`).addEventListener(`click`,()=>{o.value=n,u(`rejected`)})}export{i as mount};