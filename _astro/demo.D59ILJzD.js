import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=178,i={1:{label:`Step 1 of 2 · Identity`,first:{label:`Registered name`,placeholder:`Marlow Mills Ltd`},second:{label:`Tax ID`,placeholder:`GB 000 0000 00`}},2:{label:`Step 2 of 2 · Terms`,first:{label:`Payment terms`,placeholder:`30 days from invoice`},second:{label:`Settlement currency`,placeholder:`GBP`}}};function a(a){let o=(e,t)=>`
    <div class="sp-field" data-part="field-${e}" style="gap: 3px">
      <span class="sp-label" data-part="label-${e}" style="font-size: 10.5px">${t.label}</span>
      <input
        class="sp-input"
        data-part="input-${e}"
        type="text"
        autocomplete="off"
        placeholder="${t.placeholder}"
        aria-label="${t.label}"
        style="height: 28px; padding: 0 9px; font-size: 12px"
      />
    </div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 254px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Add a supplier</span>
          <button
            class="sp-button sp-button--quiet sp-button--sm"
            data-part="open"
            type="button"
            style="flex: 0 0 auto; font-size: 12px; white-space: nowrap"
          >Help</button>
        </div>

        <div style="display: flex; flex: 1 1 auto; min-height: 0">
          <div
            class="sp-body sp-context"
            data-part="form"
            data-step="1"
            data-typed="no"
            style="display: flex; flex-direction: column; gap: 9px; flex: 1 1 auto; min-width: 0"
          >
            <span class="sp-label" data-part="step-label" style="height: 16px; line-height: 16px; font-size: 10.5px">${i[1].label}</span>
            ${o(`first`,i[1].first)}
            ${o(`second`,i[1].second)}
            <span class="sp-text" data-part="echo" style="flex: 1 1 auto; font-size: 11px; line-height: 1.35">Both numbers are on the supplier's invoice header.</span>
            <div class="sp-row sp-row--between" style="flex: 0 0 auto; gap: 8px">
              <button
                class="sp-button sp-button--ghost sp-button--sm"
                data-part="back"
                type="button"
                aria-disabled="true"
                style="flex: 0 0 auto; white-space: nowrap"
              >Back</button>
              <button class="sp-button sp-button--sm" data-part="next" type="button" style="flex: 0 0 auto; white-space: nowrap">Next</button>
            </div>
          </div>

          <div
            data-part="help"
            data-subject
            style="flex: 0 0 auto; width: 0; overflow: hidden; background: var(--sp-surface); transition: width 0.26s var(--sp-ease)"
          >
            <div style="display: flex; flex-direction: column; gap: 6px; width: ${r}px; height: 100%; padding: 11px 12px; border-left: 1px solid var(--sp-line)">
              <div class="sp-row sp-row--between" style="flex: 0 0 auto; gap: 6px">
                <span class="sp-heading" style="font-size: 12px; white-space: nowrap">Tax ID</span>
                <button
                  class="sp-icon-button"
                  data-part="close"
                  type="button"
                  aria-label="Close help"
                  style="flex: 0 0 auto; width: 22px; height: 22px"
                >${n(`close`)}</button>
              </div>
              <span class="sp-text" style="font-size: 11px; line-height: 1.4">
                Two letters for the country, then nine digits. Group them however the invoice does; we strip the spaces.
              </span>
              <span class="sp-text" style="font-size: 11px; line-height: 1.4">
                Sole traders outside the scheme leave it blank and we bill without it.
              </span>
            </div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="caption" style="width: 452px; height: 30px; font-size: 11px; line-height: 1.35">
        The panel takes width from the form instead of covering it, so the field stays typeable while the answer is read, and the step change leaves it open.
      </span>
    </div>
  `;let s=e(a,`form`),c=e(a,`help`),l=e(a,`step-label`),u=e(a,`back`),d=e(a,`echo`),f={first:e(a,`input-first`),second:e(a,`input-second`)},p={first:e(a,`label-first`),second:e(a,`label-second`)},m=e=>{t(c,`data-open`,e),c.style.width=e?`${r}px`:`0px`};e(a,`open`).addEventListener(`click`,()=>m(!0)),e(a,`close`).addEventListener(`click`,()=>m(!1)),e(a,`next`).addEventListener(`click`,()=>{if(s.dataset.step===`2`)return;let e=i[2];s.dataset.step=`2`,l.textContent=e.label;for(let t of[`first`,`second`])p[t].textContent=e[t].label,f[t].placeholder=e[t].placeholder,f[t].value=``;d.textContent=`Terms apply from the first invoice we receive.`,u.removeAttribute(`aria-disabled`)});for(let e of Object.values(f))e.addEventListener(`input`,()=>{s.dataset.typed=e.value.trim()===``?`no`:`yes`})}export{a as mount};