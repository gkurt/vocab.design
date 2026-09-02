import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field library</span>
          <span class="sp-text">24 items</span>
        </div>
        <div class="sp-body">
          <div class="sp-grid" data-part="shelf" style="grid-template-columns: repeat(2, 1fr); gap: 12px">
            <div
              class="sp-surface"
              data-part="card"
              data-subject
              role="link"
              tabindex="0"
              aria-label="Open Coastal shelf survey"
              style="padding: 10px; cursor: pointer"
            >
              <div class="sp-swatch" data-part="card-media" aria-hidden="true" style="height: 56px"></div>
              <div class="sp-stack" style="gap: 2px; margin-top: 8px">
                <span class="sp-heading" data-part="card-title">Coastal shelf survey</span>
                <span class="sp-text">Field guide · 12 pages</span>
              </div>
              <div class="sp-row" style="margin-top: 10px">
                <button
                  class="sp-button sp-button--ghost sp-button--sm sp-row"
                  type="button"
                  data-part="save"
                  aria-pressed="false"
                  style="min-width: 92px"
                >
                  ${n(`heart`)}<span data-part="save-label">Save</span>
                </button>
              </div>
            </div>
            <div class="sp-surface sp-context" style="padding: 10px">
              <div class="sp-swatch" aria-hidden="true" style="height: 56px"></div>
              <div class="sp-stack" style="gap: 2px; margin-top: 8px">
                <span class="sp-heading">Estuary sediment log</span>
                <span class="sp-text">Field guide · 8 pages</span>
              </div>
              <div class="sp-row" style="margin-top: 10px">
                <button class="sp-button sp-button--ghost sp-button--sm sp-row" type="button" aria-pressed="false" style="min-width: 92px">
                  ${n(`heart`)}<span>Save</span>
                </button>
              </div>
            </div>
          </div>
          <div class="sp-stack sp-context" data-part="detail" hidden style="gap: 10px">
            <div class="sp-row">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="back">Back</button>
              <span class="sp-text">Field library / Coastal shelf survey</span>
            </div>
            <div class="sp-swatch" aria-hidden="true" style="height: 62px"></div>
            <div class="sp-stack" style="gap: 8px">
              <span class="sp-heading">Coastal shelf survey</span>
              <div class="sp-line" style="width: 94%"></div>
              <div class="sp-line" style="width: 86%"></div>
              <div class="sp-line" style="width: 58%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`shelf`),a=e(r,`detail`),o=e(r,`card`),s=e(r,`save`),c=e(r,`save-label`),l=e=>{i.hidden=e,a.hidden=!e};o.addEventListener(`click`,()=>l(!0)),o.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),l(!0))}),s.addEventListener(`click`,e=>{e.stopPropagation(),t(s,`data-selected`,!0),s.setAttribute(`aria-pressed`,`true`),c.textContent=`Saved`}),e(r,`back`).addEventListener(`click`,()=>l(!1))}export{r as mount};