import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`#d92d20`,n={required:`* marks a required field.`,optional:`Every field is required unless it is marked optional.`};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 240px">
        <div class="sp-row" style="align-items: flex-start">
          <div data-part="form" data-convention="required" style="width: 200px">
            <p class="sp-text sp-context" data-stage-verdict data-part="legend" style="margin: 0; font-size: 11px; height: 30px">${n.required}</p>
            <div class="sp-field sp-context" style="margin-top: 4px">
              <span><label class="sp-label" for="vd-rfi-name">Full name</label><span class="sp-label" data-part="mark-name"
                    aria-hidden="true" style="color: var(--sp-accent); font-weight: 700"> *</span></span>
              <input class="sp-input" id="vd-rfi-name" value="Ada Lovelace" aria-required="true" readonly />
            </div>
            <div class="sp-field" style="margin-top: 10px">
              <span><label class="sp-label" for="vd-rfi-email">Email</label><span class="sp-label" data-part="mark-email" data-subject
                    aria-hidden="true" style="color: var(--sp-accent); font-weight: 700"> *</span></span>
              <input class="sp-input sp-context" id="vd-rfi-email" data-part="email" value="" aria-required="true"
                     aria-describedby="vd-rfi-error" readonly />
              <div class="sp-context" style="height: 17px">
                <span class="sp-text" id="vd-rfi-error" data-part="error" style="font-size: 11px; color: ${t}" hidden>
                  Enter an email address.
                </span>
              </div>
            </div>
            <div class="sp-field sp-context" style="margin-top: 4px">
              <label class="sp-label" for="vd-rfi-company">Company<span data-part="mark-company"
                     style="color: var(--sp-muted); font-weight: 500"></span></label>
              <input class="sp-input" id="vd-rfi-company" value="" readonly />
            </div>
            <button class="sp-button sp-button--sm sp-context" type="button" data-part="submit"
                    style="margin-top: 12px">Create account</button>
          </div>

          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Mark" data-part="segmented" data-value="required">
            <button class="sp-segment" data-part="seg-required" value="required">Required</button>
            <button class="sp-segment" data-part="seg-optional" value="optional">Optional</button>
          </sp-segmented>
          <span class="sp-text sp-text--ink" data-stage-announce data-part="announced">Email, edit, required</span>
        </div>
      </div>
    </div>
  `;let i=e(r,`form`),a=e(r,`legend`),o={name:e(r,`mark-name`),email:e(r,`mark-email`),company:e(r,`mark-company`)},s=e=>{i.dataset.convention=e,a.textContent=n[e];let t=e===`required`?` *`:``;o.name.textContent=t,o.email.textContent=t,o.company.textContent=e===`optional`?` (optional)`:``};s(`required`),e(r,`segmented`).addEventListener(`change`,e=>{s(e.detail===`optional`?`optional`:`required`)}),e(r,`submit`).addEventListener(`click`,()=>{let n=e(r,`email`);e(r,`error`).hidden=!1,n.setAttribute(`aria-invalid`,`true`),n.style.borderColor=t})}export{r as mount};