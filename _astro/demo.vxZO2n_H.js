import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";import"./segmented.DtyfKPDf.js";var n=t(`chevronRight`,`sp-icon--chevron`).replace(`<svg `,`<svg data-part="chevron" data-subject data-dir="right" style="width: 16px; height: 16px" `),r=t(`chevronDown`).replace(`<svg `,`<svg style="width: 14px; height: 14px; transform: rotate(180deg)" `),i={right:`Points right: the section is shut.`,down:`Points down: its panel is open below.`};function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 288px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Checkout settings</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="State" data-part="picker" data-value="collapsed">
            <button class="sp-segment" type="button" data-part="seg-collapsed" value="collapsed" style="padding: 4px 10px; font-size: 12px">Collapsed</button>
            <button class="sp-segment" type="button" data-part="seg-expanded" value="expanded" style="padding: 4px 10px; font-size: 12px">Expanded</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <div class="sp-surface" style="padding: 4px 8px">
            <div class="sp-list-item sp-context" data-part="row-payment">
              <span class="sp-grow">Payment methods</span>
              ${t(`chevronRight`)}
            </div>

            <button
              class="sp-list-item"
              type="button"
              data-part="trigger"
              aria-expanded="false"
              aria-controls="vd-chevron-panel"
              style="width: 100%; border: 0; background: transparent; color: inherit; font: inherit; font-size: 13px; text-align: left; cursor: pointer"
            >
              <span class="sp-grow">Delivery options</span>
              <span style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 20px; height: 20px">${n}</span>
            </button>

            <div style="position: relative; height: 50px">
              <div
                class="sp-surface sp-context"
                data-part="panel"
                id="vd-chevron-panel"
                style="position: absolute; inset: 2px 6px 4px; padding: 6px 10px; opacity: 0; visibility: hidden;
                       transition: opacity 0.18s, visibility 0.18s"
              >
                <p class="sp-text" style="margin: 0; font-size: 11px">Standard, 2 to 4 working days.</p>
                <p class="sp-text" style="margin: 3px 0 0; font-size: 11px">Named day, Thursday 21st.</p>
              </div>
            </div>

            <div class="sp-list-item sp-context" data-part="row-country">
              <span class="sp-grow">Country</span>
              <span class="sp-row" data-part="select" style="gap: 6px; padding: 3px 8px; border: 1px solid var(--sp-line); border-radius: 6px; background: var(--sp-surface)">
                <span style="font-size: 12px">United Kingdom</span>
                ${t(`chevronDown`)}
              </span>
            </div>

            <div class="sp-row sp-context" style="gap: 12px; padding: 6px 2px 4px; justify-content: flex-end">
              <span class="sp-label" data-stage-verdict data-part="meaning" data-dir="right"
                    style="flex: 1 1 auto; min-width: 0; height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden">${i.right}</span>
              <button
                class="sp-button sp-button--ghost sp-button--sm"
                type="button"
                data-part="collapse-all"
                style="display: flex; align-items: center; gap: 6px; flex: 0 0 auto; padding: 3px 8px; font-size: 12px"
              >Collapse all ${r}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(a,`picker`),s=e(a,`trigger`),c=e(a,`chevron`),l=e(a,`panel`),u=e(a,`meaning`),d=e=>{s.setAttribute(`aria-expanded`,String(e)),c.dataset.dir=e?`down`:`right`,u.dataset.dir=e?`down`:`right`,l.style.opacity=e?`1`:`0`,l.style.visibility=e?`visible`:`hidden`,u.textContent=i[e?`down`:`right`]??``};o.addEventListener(`change`,e=>d(e.detail===`expanded`)),s.addEventListener(`click`,()=>{o.value=s.getAttribute(`aria-expanded`)===`true`?`collapsed`:`expanded`}),e(a,`collapse-all`).addEventListener(`click`,()=>{o.value=`collapsed`}),d(!1)}export{a as mount};