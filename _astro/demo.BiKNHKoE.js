import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={tricked:`Untick this box to not stop receiving partner emails.`,plain:`Send me partner emails.`},n={on:`Partner emails: on`,off:`Partner emails: off`},r={tricked:`Two negatives in one line, and its plain reading is the opposite of what the box does. The checkbox is ordinary; the sentence is the trick.`,plain:`The same box, the same starting state, the same click. Only the sentence changed, and now it describes what happens.`};function i(i){let a=(e,t)=>`
    <div class="sp-row sp-context" style="gap: 10px; height: 30px">
      <span class="sp-checkbox" role="img" aria-label="${t?`ticked`:`unticked`}" ${t?`data-checked`:``}></span>
      <span style="font-size: 12px">${e}</span>
    </div>`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 256px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Membership, step 3 of 3</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="tricked" data-axis="Trick wording" data-term="tricked" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="mode-tricked" type="button" value="tricked" style="padding: 4px 9px; font-size: 12px">With</button>
            <button class="sp-segment" data-part="mode-plain" type="button" value="plain" style="padding: 4px 9px; font-size: 12px">Without</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" style="padding: 8px 12px; background: var(--sp-surface)">
            ${a(`Email me my order receipts.`,!0)}
            <div class="sp-row" data-part="row" style="gap: 10px; height: 34px; cursor: pointer">
              <button
                class="sp-checkbox"
                data-part="box"
                type="button"
                role="checkbox"
                aria-checked="true"
                aria-label="Partner emails"
                style="flex: 0 0 auto"
              ></button>
              <span
                data-part="label"
                data-subject
                data-pose="[data-mode=tricked]"
                data-mode="tricked"
                style="width: 372px; font-size: 12px; white-space: nowrap"
              >${t.tricked}</span>
            </div>
            ${a(`Show my name on reviews I write.`,!1)}
          </div>

          <div class="sp-surface sp-context" data-part="effect" data-emails="on" style="height: 48px; padding: 9px 11px">
            <span class="sp-label" style="font-size: 10px">Your email preferences</span>
            <span class="sp-text sp-text--ink" data-part="effect-text" style="display: block; margin-top: 2px; font-size: 11px">${n.on}</span>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px; line-height: 1.35">${r.tricked}</span>
    </div>
  `;let o=e(i,`box`),s=e(i,`label`),c=e(i,`effect`),l=e(i,`effect-text`),u=e(i,`note`),d=e=>{o.setAttribute(`aria-checked`,String(e));let t=e?`on`:`off`;c.dataset.emails=t,l.textContent=n[t]};e(i,`row`).addEventListener(`click`,()=>{d(o.getAttribute(`aria-checked`)!==`true`)}),e(i,`mode`).addEventListener(`change`,e=>{let n=e.detail===`plain`?`plain`:`tricked`;s.dataset.mode=n,s.textContent=t[n],u.textContent=r[n],d(!0)})}export{i as mount};