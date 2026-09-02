import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n={first:{label:`Publish draft`,note:`First encounter: the glyph and the words together, because neither has been learned yet.`},familiar:{label:`Publish`,note:`Twelve successful uses in, the label is shortened rather than dropped. The glyph is carrying more of it.`},expert:{label:`Publish draft`,note:`The label is gone and the shape is the word. The target did not shrink with it, and the row has not moved.`},return:{label:`Publish draft`,note:`The part everyone forgets: proficiency decays, so an absence gives the label back rather than assuming it is still known.`}};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: auto">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Studio</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="stage" data-axis="Familiarity" data-value="first" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="stage-first" type="button" value="first" style="padding: 4px 8px; font-size: 11px">Use 1</button>
            <button class="sp-segment" data-part="stage-familiar" type="button" value="familiar" style="padding: 4px 8px; font-size: 11px">Use 12</button>
            <button class="sp-segment" data-part="stage-expert" type="button" value="expert" style="padding: 4px 8px; font-size: 11px">Use 41</button>
            <button class="sp-segment" data-part="stage-return" type="button" value="return" style="padding: 4px 8px; font-size: 11px">Back after 7 weeks</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" style="flex: 0 0 auto; padding: 9px 10px; background: var(--sp-surface)">
            <div class="sp-row" style="gap: 10px">
              <span data-part="slot" style="display: flex; flex: 0 0 auto; width: 150px">
                <button
                  class="sp-button sp-button--sm"
                  data-part="control"
                  data-subject
                  data-stage="first"
                  type="button"
                  style="display: inline-flex; align-items: center; flex: 0 0 auto; gap: 0; height: 28px; padding: 0 10px; transition: padding 0.24s var(--sp-ease)"
                >
                  ${t(`share`)}
                  <span
                    data-part="label"
                    style="display: inline-block; max-width: 120px; margin-left: 7px; overflow: hidden; white-space: nowrap; transition: max-width 0.24s var(--sp-ease), margin-left 0.24s var(--sp-ease), opacity 0.18s"
                  >${n.first.label}</span>
                </button>
              </span>
              <span class="sp-divider sp-context" style="flex: 0 0 auto; width: 1px; height: 22px"></span>
              <span class="sp-row sp-context" style="flex: 0 0 auto; gap: 4px">
                <button class="sp-icon-button" type="button" aria-label="Add to favourites" style="width: 26px; height: 26px">${t(`star`)}</button>
                <button class="sp-icon-button" type="button" aria-label="Duplicate" style="width: 26px; height: 26px">${t(`copy`)}</button>
                <button class="sp-icon-button" type="button" aria-label="More" style="width: 26px; height: 26px">${t(`meatball`,`sp-icon--dots`)}</button>
              </span>
            </div>
          </div>

          <span class="sp-text" data-stage-verdict data-part="note" style="display: none">${n.first.note}</span>
        </div>
      </div>
    </div>
  `;let i=e(r,`control`),a=e(r,`label`),o=e(r,`note`),s=e=>{let t=n[e];i.dataset.stage=e,a.textContent=t.label;let r=e===`expert`;a.style.maxWidth=r?`0px`:`120px`,a.style.marginLeft=r?`0px`:`7px`,a.style.opacity=r?`0`:`1`,i.style.padding=r?`0 6px`:`0 10px`,o.textContent=t.note};e(r,`stage`).addEventListener(`change`,e=>{s(e.detail)})}export{r as mount};