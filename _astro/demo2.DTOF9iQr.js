import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={sensory:{instruction:`To submit, press the round button on the right.`,verdict:`Without the arrangement there is nothing to resolve: no shape, no side, and no name to match against.`},named:{instruction:`To submit, press Continue, the round button on the right.`,verdict:`The name is in the sentence and on the control, so the instruction resolves in any arrangement.`}},r=[`Save draft`,`Continue`,`Cancel`];function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 11px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="sensory" data-axis="Refers by" data-term="sensory" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-sensory" value="sensory"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Shape and side</button>
            <button class="sp-segment" type="button" data-part="seg-named" value="named"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Named</button>
          </sp-segmented>
        </div>

        <p class="sp-text sp-text--ink" data-part="instruction" data-mode="sensory" data-subject
           data-pose="[data-mode=sensory]"
           style="margin: 9px 0 0; height: 32px; padding: 6px 10px; border-radius: 6px;
                  background: var(--sp-accent-soft); font-size: 12px; line-height: 1.4;
                  white-space: nowrap; overflow: hidden">${n.sensory.instruction}</p>

        <div class="sp-row" style="align-items: stretch; gap: 12px; margin-top: 9px">
          <div class="sp-surface sp-context" style="flex: 0 0 auto; width: 238px; height: 114px; padding: 9px 10px">
            <span class="sp-label" style="font-size: 10px">As drawn</span>
            <div class="sp-row" style="gap: 8px; margin-top: 9px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button"
                      style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">Save draft</button>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button"
                      style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">Cancel</button>
              <button class="sp-button sp-button--sm" type="button" data-part="drawn"
                      style="flex: 0 0 auto; border-radius: 999px; font-size: 11px; white-space: nowrap;
                             outline: 2px solid var(--sp-accent); outline-offset: 3px">Continue</button>
            </div>
          </div>

          <div class="sp-surface sp-context" style="flex: 1 1 auto; min-width: 0; height: 114px; padding: 9px 10px">
            <span class="sp-label" style="font-size: 10px">Reading order</span>
            <div class="sp-stack" style="gap: 4px; margin-top: 7px">
              ${r.map((e,t)=>`
    <div class="sp-row" data-part="name-${t+1}"
         style="gap: 6px; height: 22px; padding: 0 7px; border-radius: 5px; background: var(--sp-sunken);
                outline-offset: 2px">
      <span class="sp-label" style="flex: 0 0 auto; font-size: 9.5px">${t+1}</span>
      <span class="sp-text sp-text--ink" style="flex: 1 1 auto; min-width: 0; font-size: 11px">${e}</span>
    </div>`).join(``)}
            </div>
          </div>
        </div>

                  <p class="sp-text" data-stage-verdict data-part="verdict" data-mode="sensory"
             style="flex: 1 1 auto; min-width: 0; margin: 0; font-size: 11px; line-height: 1.35">${n.sensory.verdict}</p>
        
      </div>
    </div>
  `;let a=e(i,`instruction`),o=e(i,`verdict`),s=e(i,`name-2`);e(i,`mode`).addEventListener(`change`,e=>{let r=e.detail;a.dataset.mode=r,a.textContent=n[r].instruction,o.dataset.mode=r,o.textContent=n[r].verdict,t(s,`data-matched`,r===`named`),s.style.outline=r===`named`?`2px solid var(--sp-accent)`:`none`})}export{i as mount};