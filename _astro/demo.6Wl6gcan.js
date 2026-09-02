import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=`Enter an email address, like ada@example.com`,r=`#d92d20`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 360px">
        <div data-part="form" data-mode="colour">
          <span class="sp-heading sp-context" style="font-size: 14px">Contact details</span>
          <div class="sp-field" data-part="field" data-state="ok" data-subject style="margin-top: 14px">
            <label class="sp-label" for="vd-ei-email">Email address</label>
            <input class="sp-input" id="vd-ei-email" data-part="input" value="ada.example.com" aria-describedby="vd-ei-error" readonly />
            <div data-part="slot" style="flex: 0 0 auto">
              <span class="sp-row" id="vd-ei-error" data-part="error" style="gap: 6px; align-items: flex-start" hidden>
                <span data-part="mark" style="color: ${r}; display: flex; padding-top: 1px">${t(`alert`)}</span>
                <span class="sp-text sp-text--ink" style="font-size: 12px">${n}</span>
              </span>
            </div>
          </div>
          <div class="sp-field sp-context" style="margin-top: 12px">
            <label class="sp-label" for="vd-ei-phone">Phone</label>
            <input class="sp-input" id="vd-ei-phone" value="+44 7700 900123" readonly />
          </div>
          <div class="sp-row sp-context" style="margin-top: 14px">
            <button class="sp-button sp-button--sm" type="button" data-part="submit">Continue</button>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 16px; justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Simulated vision" data-part="segmented" data-value="colour">
            <button class="sp-segment" data-part="seg-colour" value="colour">Colour</button>
            <button class="sp-segment" data-part="seg-grey" value="grey">Greyscale</button>
          </sp-segmented>
        </div>
      </div>
    </div>
  `;let a=e(i,`form`),o=e(i,`field`),s=e(i,`input`),c=e(i,`slot`),l=e(i,`error`);l.hidden=!1,c.style.height=`${c.offsetHeight}px`,l.hidden=!0,e(i,`submit`).addEventListener(`click`,()=>{o.dataset.state=`invalid`,l.hidden=!1,s.style.borderColor=r,s.setAttribute(`aria-invalid`,`true`)}),e(i,`segmented`).addEventListener(`change`,e=>{let t=e.detail;a.dataset.mode=t,a.style.filter=t===`grey`?`grayscale(1)`:``})}export{i as mount};