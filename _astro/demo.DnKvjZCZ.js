import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`ui-monospace, monospace`,n={two:{columns:`2`,width:`auto`,spelling:`column-count: 2; column-gap: 20px`,note:`Two columns, with the column-rule drawn down the gap.`},three:{columns:`3`,width:`auto`,spelling:`column-count: 3; column-gap: 20px`,note:`Three columns. break-inside keeps the subheading whole.`},fitted:{columns:`auto`,width:`9em`,spelling:`column-width: 9em; column-gap: 20px`,note:`Asked by width instead: the browser fits as many as it can.`}},r=`margin: 0 0 8px`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Page preview</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Property" data-part="switcher" data-value="two">
            <button class="sp-segment" type="button" data-part="seg-two" value="two">count 2</button>
            <button class="sp-segment" type="button" data-part="seg-three" value="three">count 3</button>
            <button class="sp-segment" type="button" data-part="seg-fitted" value="fitted">width</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="page" style="flex: 0 0 auto; width: 446px; height: 164px; padding: 12px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div
              data-part="block"
              data-subject
              style="height: 140px; column-count: 2; column-gap: 20px; column-rule: 1px solid var(--sp-line); font-size: 10px; line-height: 1.5; text-align: left"
            >
              <p style="${r}">
                The presses ran twice a week, and the pages were set by hand until the last of the old
                compositors retired. Brass rules were cut to length and slid into the frame between the
                galleys.
              </p>
              <h3 data-part="subhead" style="${r}; break-inside: avoid; font-size: 11px; font-weight: 600">
                Setting the tide table by hand
              </h3>
              <p style="${r}">
                Widths were chosen so a reader could take in a line without moving their head, the same
                reason a narrow measure still reads faster than a wide one.
              </p>
              <p style="margin: 0">
                Ink was mixed in the yard each morning, and the first sheets off the bed were pulled
                slowly so the register could be checked against the corner marks.
              </p>
            </div>
          </div>
          <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 8px; height: 24px">
            <span
              data-part="chip"
              style="display: inline-flex; align-items: center; justify-content: center; width: 252px; padding: 3px 8px; border: 1px solid var(--sp-line); border-radius: 999px; background: var(--sp-surface); font-family: ${t}; font-size: 11.5px"
            ></span>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 20px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let a=e(i,`block`),o=e(i,`chip`),s=e(i,`readout`),c=e=>{let t=n[e];t&&(a.style.columnCount=t.columns,a.style.columnWidth=t.width,o.textContent=t.spelling,s.textContent=t.note)};e(i,`switcher`).addEventListener(`change`,e=>c(e.detail)),c(`two`)}export{i as mount};