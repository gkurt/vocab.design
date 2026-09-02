import{n as e,t}from"./parts.C-YLuC7Q.js";var n=`#d2453b`,r=[{key:`good`,heard:`“Work email, edit, invalid entry. Enter a full email address.”`,state:`flagged`},{key:`twin`,heard:`“Postcode, edit.” Nothing says it was rejected.`,state:`unflagged`}],i=`Nothing read yet`;function a(a){let o=(e,t,r,i,a,o)=>`
    <div class="sp-field${e===`twin`?` sp-context`:``}" data-part="field-${e}" style="flex: 1 1 0; min-width: 0; gap: 4px">
      <span class="sp-label" style="color: var(--sp-ink)">${t}</span>
      <div class="sp-input" data-part="input-${e}" ${o?`data-subject`:``}
           style="border-color: ${n}; color: var(--sp-muted)">${r}</div>
      <span class="sp-text" data-part="err-${e}" style="height: 32px; font-size: 11px; color: ${n}">${a}</span>
      <span class="sp-label" data-part="chip-${e}"
            style="align-self: flex-start; font-size: 10px; white-space: nowrap; padding: 1px 5px; border: 1px solid var(--sp-line); border-radius: 5px">${i}</span>
    </div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Checkout details, submitted</span>
          <span class="sp-text" style="font-size: 11px">2 fields rejected</span>
        </div>

        <div class="sp-surface sp-row" style="margin-top: 10px; padding: 10px 12px 12px; gap: 14px; align-items: stretch">
          ${o(`good`,`Work email`,`ada@`,`aria-invalid="true"`,`Enter a full email address.`,!0)}
          ${o(`twin`,`Postcode`,`9`,`no aria-invalid`,`Enter a valid postcode.`,!1)}
        </div>

        <div class="sp-surface sp-context" style="margin-top: 10px; padding: 7px 10px">
          <div class="sp-row sp-row--between" style="gap: 10px; height: 34px">
            <span class="sp-label" style="flex: 0 0 auto">Screen reader</span>
            <span class="sp-text sp-text--ink" data-part="heard" data-state="idle"
                  style="flex: 1 1 auto; min-width: 0; font-size: 11.5px; line-height: 1.4; text-align: right">${i}</span>
          </div>
        </div>

        <div class="sp-row sp-context" style="margin-top: 9px; justify-content: flex-end">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="read"
                  style="flex: 0 0 auto">Read next field</button>
        </div>
      </div>
    </div>
  `;let s=e(a,`heard`),c={good:e(a,`input-good`),twin:e(a,`input-twin`)},l=-1,u=()=>{let e=r[l];for(let n of[`good`,`twin`])t(c[n],`data-sim-focus`,e?.key===n);s.dataset.state=e?.state??`idle`,s.textContent=e?e.heard:i};u(),e(a,`read`).addEventListener(`click`,()=>{l=Math.min(l+1,r.length-1),u()})}export{a as mount};