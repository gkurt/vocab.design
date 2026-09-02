import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={v1:{ask:`What should we call you?`,why:`So the loaf log has a name on it.`,field:`First name`,pct:20,known:[`Email`],note:`Registration asked for an email and a password. Everything else waits for a visit where there is a reason to ask.`},v4:{ask:`Which postcode do you bake in?`,why:`So flour delivery dates are the real ones.`,field:`Postcode`,pct:55,known:[`Email`,`First name`,`Bakes weekly`],note:`One question, next to the thing it improves. The reason for asking is on screen, and skipping costs nothing.`},v9:{ask:`How hot does your oven really run?`,why:`So the timings stop being ten minutes out.`,field:`Max temperature`,pct:85,known:[`Email`,`First name`,`Postcode`,`Bakes weekly`,`Sourdough only`],note:`Nine visits in, the record is nearly complete and no single visit was ever asked for more than one thing.`}},r=[`Full name`,`Email`,`Password`,`Postcode`,`Date of birth`,`Oven type`],i=`The same record, demanded up front: twelve fields between a person and the thing they came to do. This is the counter-example, not the pattern.`;function a(a){let o=e=>e.map(e=>`<span class="sp-chip" style="flex: 0 0 auto; padding: 2px 8px; font-size: 10px; white-space: nowrap; cursor: default">${e}</span>`).join(``),s=[0,2,4].map(e=>`
      <div class="sp-row" style="gap: 10px; align-items: flex-end">
        ${r.slice(e,e+2).map(e=>`
              <div style="flex: 1 1 0; min-width: 0">
                <span class="sp-label" style="display: block; font-size: 10px">${e}</span>
                <input class="sp-input" type="text" aria-label="${e}" style="width: 100%; height: 24px; margin-top: 2px; padding: 0 8px; font-size: 11px" />
              </div>`).join(``)}
      </div>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 254px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Proof</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="view" data-axis="Timeline" data-value="v1" style="flex: 0 0 auto">
            <button class="sp-segment" data-part="view-v1" type="button" value="v1" style="padding: 4px 8px; font-size: 11px">Visit 1</button>
            <button class="sp-segment" data-part="view-v4" type="button" value="v4" style="padding: 4px 8px; font-size: 11px">Visit 4</button>
            <button class="sp-segment" data-part="view-v9" type="button" value="v9" style="padding: 4px 8px; font-size: 11px">Visit 9</button>
            <button class="sp-segment" data-part="view-form" type="button" value="form" style="padding: 4px 8px; font-size: 11px">All at once</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div data-part="box" style="position: relative; flex: 1 1 auto">

            <div data-part="visit" style="position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px">
              <div class="sp-surface" data-part="ask" data-subject data-visit="1" style="height: 88px; padding: 11px 12px; background: var(--sp-surface)">
                <span class="sp-heading" data-part="ask-question" style="font-size: 13px">${n.v1.ask}</span>
                <span class="sp-text" data-part="ask-why" style="display: block; margin-top: 1px; font-size: 11px">${n.v1.why}</span>
                <div class="sp-row" style="gap: 8px; margin-top: 8px">
                  <input class="sp-input sp-grow" data-part="ask-field" type="text" placeholder="${n.v1.field}" aria-label="Answer" style="height: 26px; padding: 0 9px; font-size: 11px" />
                  <button class="sp-button sp-button--sm" data-part="ask-save" type="button" style="flex: 0 0 auto">Save</button>
                  <button class="sp-button sp-button--quiet sp-button--sm" data-part="ask-skip" type="button" style="flex: 0 0 auto; color: var(--sp-muted); font-size: 12px">Not now</button>
                </div>
              </div>
              <div class="sp-row sp-context" style="gap: 8px; height: 20px">
                <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Profile</span>
                <div class="sp-progress sp-progress--meter sp-grow" style="height: 6px"><div class="sp-progress-fill" data-part="meter-fill" style="--sp-value: ${n.v1.pct}%"></div></div>
                <span class="sp-label" data-part="readout" data-pct="${n.v1.pct}" style="flex: 0 0 auto; width: 30px; text-align: right; font-size: 10px; font-variant-numeric: tabular-nums">${n.v1.pct}%</span>
              </div>
              <div class="sp-row sp-row--wrap sp-context" style="gap: 6px; align-content: flex-start; height: 44px">
                <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Already known</span>
                <div class="sp-row sp-row--wrap" data-part="known" style="gap: 6px">${o(n.v1.known)}</div>
              </div>
            </div>

            <div class="sp-stack sp-context" data-part="form" hidden style="position: absolute; inset: 0; gap: 6px">
              ${s}
              <div class="sp-row" style="gap: 10px; margin-top: 2px">
                <button class="sp-button sp-button--sm" data-part="form-submit" type="button" style="flex: 0 0 auto">Create account</button>
                <span class="sp-label" style="font-size: 10px">and six more on the next screen</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px; line-height: 1.35">${n.v1.note}</span>
    </div>
  `;let c=e(a,`visit`),l=e(a,`form`),u=e(a,`ask`),d=e(a,`ask-question`),f=e(a,`ask-why`),p=e(a,`ask-field`),m=e(a,`meter-fill`),h=e(a,`readout`),g=e(a,`known`),_=e(a,`note`);e(a,`view`).addEventListener(`change`,e=>{let r=e.detail;if(r===`form`){t(c,`hidden`,!0),t(l,`hidden`,!1),_.textContent=i;return}let a=n[r];t(l,`hidden`,!0),t(c,`hidden`,!1),u.dataset.visit=r.slice(1),d.textContent=a.ask,f.textContent=a.why,p.value=``,p.placeholder=a.field,m.style.setProperty(`--sp-value`,`${a.pct}%`),h.dataset.pct=String(a.pct),h.textContent=`${a.pct}%`,g.innerHTML=o(a.known),_.textContent=a.note})}export{a as mount};