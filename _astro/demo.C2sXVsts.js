import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={aurora:{primitive:`var(--tk-blue-600)`,ref:`blue-600`,label:`blue.600`},ember:{primitive:`var(--tk-orange-500)`,ref:`orange-500`,label:`orange.500`}};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="scene"
           style="width: 356px; --tk-blue-600: #2f5cf0; --tk-orange-500: #e2622b; --tk-accent: var(--tk-blue-600); --tk-button-bg: var(--tk-accent)">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Theme</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Palette" data-part="segmented" data-value="aurora">
            <button class="sp-segment" data-part="seg-aurora" value="aurora">Aurora</button>
            <button class="sp-segment" data-part="seg-ember" value="ember">Ember</button>
          </sp-segmented>
        </div>

        <div class="sp-stack" data-part="chain" data-subject data-theme="aurora" style="gap: 10px; margin-top: 14px">
          <div class="sp-row" data-part="primitive">
            <span class="sp-label" style="width: 78px">primitive</span>
            <span class="sp-chip" data-part="prim-blue" data-selected>
              <span class="sp-swatch" style="width: 12px; height: 12px; --sp-swatch: var(--tk-blue-600)"></span>blue.600
            </span>
            <span class="sp-chip" data-part="prim-orange">
              <span class="sp-swatch" style="width: 12px; height: 12px; --sp-swatch: var(--tk-orange-500)"></span>orange.500
            </span>
          </div>
          <div class="sp-row" data-part="semantic" data-ref="blue-600">
            <span class="sp-label" style="width: 78px">semantic</span>
            <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: var(--tk-accent)"></span>
            <span class="sp-text sp-text--ink">color.accent</span>
            <span class="sp-text" data-part="semantic-ref">= blue.600</span>
          </div>
          <div class="sp-row" data-part="component">
            <span class="sp-label" style="width: 78px">component</span>
            <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: var(--tk-button-bg)"></span>
            <span class="sp-text sp-text--ink">button.bg</span>
            <span class="sp-text">= color.accent</span>
          </div>
        </div>

        <div class="sp-row sp-context" style="margin-top: 14px">
          <button class="sp-button" data-part="preview" style="background: var(--tk-button-bg); color: #ffffff">Publish</button>
          <span class="sp-text">reads button.bg</span>
        </div>
      </div>
    </div>
  `;let i=e(r,`scene`),a=e(r,`chain`),o=e(r,`semantic`),s=e(r,`semantic-ref`),c=e(r,`prim-blue`),l=e(r,`prim-orange`),u=e=>{let r=n[e];r&&(a.dataset.theme=e,i.style.setProperty(`--tk-accent`,r.primitive),o.dataset.ref=r.ref,s.textContent=`= ${r.label}`,t(c,`data-selected`,e===`aurora`),t(l,`data-selected`,e===`ember`))};u(`aurora`),e(r,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{r as mount};