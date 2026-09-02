import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={css:`font-size: 0.68em; line-height: 0; position: relative; top: -0.46em; vertical-align: baseline`,variant:`font-variant-position: super`},n={css:`font-size 0.68em, a baseline shift, and line-height 0 so the line box does not grow.`,variant:`font-variant-position: super, which does nothing here: neither face this page loads ships sups glyphs.`},r=1.3,i=`Sales rose 3%<sup style="STYLE">1</sup> again in the second half, the fourth such rise<sup style="STYLE">2</sup> in a row of five.`;function a(a){let o=e=>i.replaceAll(`STYLE`,e),s=(e,t,n)=>`
    <div class="sp-stack" style="gap: 4px; width: 196px">
      <span class="sp-label">${e}</span>
      <p class="sp-prose sp-prose--ruled sp-text--ink" data-part="${n}"
         style="--sp-leading: ${r}; margin: 0; font-size: 12px; max-width: none">${o(t)}</p>
    </div>`;a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Raised characters</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="css" data-axis="Method" data-term="css">
            <button class="sp-segment" data-part="seg-variant" value="variant">sups</button>
            <button class="sp-segment" data-part="seg-css" value="css">CSS</button>
          </sp-segmented>
        </div>
        <p data-part="line" data-subject data-raised="css" data-pose="[data-raised=css]"
           style="margin: 12px 0 0; font-size: 19px; line-height: 1.5; height: 30px; white-space: nowrap">Up 3%<sup
             data-part="marker" style="${t.css}">1</sup> in the 1<span data-part="ordinal"
             style="${t.css}">st</span> quarter, on 240 m<span data-part="exponent"
             style="${t.css}">2</span>.</p>
        <p class="sp-text sp-context" data-stage-verdict data-part="readout" style="margin: 6px 0 0; height: 38px"></p>
        <div class="sp-divider sp-context" style="margin: 4px 0 8px"></div>
        <div class="sp-row sp-context" data-part="compare" style="gap: 14px; align-items: flex-start">
          ${s(`vertical-align: super`,`font-size: 0.68em; vertical-align: super`,`grown`)}
          ${s(`line-height: 0`,t.css,`held`)}
        </div>
      </div>
    </div>
  `;let c=e(a,`line`),l=e(a,`readout`),u=[`marker`,`ordinal`,`exponent`].map(t=>e(a,t)),d=e=>{let r=n[e],i=t[e];if(!(!r||!i)){c.dataset.raised=e;for(let e of u)e.style.cssText=i;l.textContent=r}};d(`css`),e(a,`segmented`).addEventListener(`change`,e=>d(e.detail))}export{a as mount};