import{n as e}from"./parts.C-YLuC7Q.js";var t={spoken:`“Saved”`,silent:`Silence. Nothing was announced.`},n={idle:`Nowhere yet`,kept:`Still on Save`};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 428px">
        <span class="sp-label sp-context">Account settings</span>

        <div class="sp-row sp-row--between" style="margin-top: 10px; gap: 12px">
          <div class="sp-context">
            <span class="sp-text sp-text--ink">Email notifications</span>
          </div>
          <div class="sp-row" style="gap: 10px">
            <div style="width: 62px; height: 20px; text-align: right">
              <span class="sp-text sp-text--ink" role="status" data-part="status" data-subject
                    style="font-size: 12px; white-space: nowrap"></span>
            </div>
            <button class="sp-button sp-button--sm sp-context" type="button" data-part="save-good">Save</button>
          </div>
        </div>

        <div class="sp-divider sp-context" style="margin: 12px 0"></div>

        <div class="sp-row sp-row--between sp-context" style="gap: 12px">
          <div>
            <span class="sp-text sp-text--ink">Profile photo</span>
          </div>
          <div class="sp-row" style="gap: 10px">
            <div style="width: 62px; height: 20px; text-align: right">
              <span class="sp-text sp-text--ink" data-part="ghost-status" style="font-size: 12px; white-space: nowrap"></span>
            </div>
            <button class="sp-button sp-button--sm" type="button" data-part="save-bad">Save</button>
          </div>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 14px; padding: 8px 10px">
          <div class="sp-row sp-row--between" style="height: 18px">
            <span class="sp-label">Screen reader</span>
            <span class="sp-text sp-text--ink" data-part="heard" data-state="idle" style="font-size: 12px">Nothing announced yet</span>
          </div>
          <div class="sp-row sp-row--between" style="height: 18px; margin-top: 2px">
            <span class="sp-label">Keyboard focus</span>
            <span class="sp-text sp-text--ink" data-part="focus" style="font-size: 12px">${n.idle}</span>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`status`),a=e(r,`ghost-status`),o=e(r,`heard`),s=e(r,`focus`),c=e=>{o.dataset.state=e,o.textContent=t[e],s.textContent=n.kept};e(r,`save-good`).addEventListener(`click`,()=>{i.textContent=`Saved`,c(`spoken`)}),e(r,`save-bad`).addEventListener(`click`,()=>{a.textContent=`Saved`,c(`silent`)})}export{r as mount};