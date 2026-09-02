import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={field:`The first meaningful control: the reader can start typing.`,delete:`The destructive action, one Enter from ruin. The mistake.`,dialog:`The container, so the title is read before the controls.`};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 430px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Landing" data-term="field" data-value="field" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-field" value="field">First field</button>
            <button class="sp-segment" data-part="seg-delete" value="delete">Delete</button>
            <button class="sp-segment" data-part="seg-dialog" value="dialog">The dialog</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" role="dialog" aria-modal="true" aria-labelledby="vd-if-title" tabindex="-1"
             data-part="dialog" style="margin-top: 12px; padding: 14px 16px; box-shadow: var(--sp-shadow)">
          <span class="sp-heading" id="vd-if-title" style="font-size: 14px">Project settings</span>
          <div class="sp-field" style="margin-top: 10px">
            <label class="sp-label" for="vd-if-name">Project name</label>
            <input class="sp-input" id="vd-if-name" data-part="field" data-subject data-pose="[data-sim-focus]" value="Harbour" readonly />
          </div>
          <div class="sp-row sp-row--between" style="margin-top: 14px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="delete">Delete project</button>
            <div class="sp-row" style="gap: 8px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="cancel">Cancel</button>
              <button class="sp-button sp-button--sm" type="button" data-part="save">Save</button>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="verdict" data-case="field"
           style="margin: 10px 0 0; height: 18px; font-size: 12px; white-space: nowrap">${n.field}</p>
      </div>
    </div>
  `;let i={field:e(r,`field`),delete:e(r,`delete`),dialog:e(r,`dialog`)},a=e(r,`verdict`),o=e=>{for(let[n,r]of Object.entries(i))t(r,`data-sim-focus`,n===e);a.dataset.case=e,a.textContent=n[e]};o(`field`),e(r,`segmented`).addEventListener(`change`,e=>{o(e.detail)})}export{r as mount};