import{n as e,t}from"./parts.C-YLuC7Q.js";var n={idle:`Nothing read yet`,tied:`“Email address, edit text.”`,loose:`“Edit text.”`};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 360px">
        <span class="sp-heading sp-context" style="font-size: 14px">Newsletter</span>
        <div class="sp-field" data-part="field-tied" data-subject style="margin-top: 14px">
          <label class="sp-label" for="vd-la-email" data-part="label-tied" style="cursor: pointer; width: fit-content">Email address</label>
          <input class="sp-input" id="vd-la-email" data-part="input-tied" value="ada@example.com" readonly />
        </div>
        <span class="sp-label sp-context" style="display: block; margin-top: 4px; font-size: 11px">&lt;label for="vd-la-email"&gt;</span>
        <div class="sp-field sp-context" data-part="field-loose" style="margin-top: 14px">
          <span class="sp-label" data-part="label-loose" style="cursor: pointer; width: fit-content">Postcode</span>
          <input class="sp-input" data-part="input-loose" placeholder="Postcode" readonly />
        </div>
        <span class="sp-label sp-context" style="display: block; margin-top: 4px; font-size: 11px">&lt;span&gt;Postcode&lt;/span&gt;</span>
      </div>
      <p data-stage-announce data-part="readout" data-state="idle">${n.idle}</p>
    </div>
  `;let i=e(r,`readout`),a=e(r,`input-tied`);e(r,`label-tied`).addEventListener(`click`,()=>{t(a,`data-sim-focus`,!0),i.dataset.state=`tied`,i.textContent=n.tied}),e(r,`label-loose`).addEventListener(`click`,()=>{t(a,`data-sim-focus`,!1),i.dataset.state=`loose`,i.textContent=n.loose})}export{r as mount};