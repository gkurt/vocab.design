import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`Arial, Helvetica, 'Liberation Sans', 'DejaVu Sans', sans-serif`,n=`Consolas, 'DejaVu Sans Mono', 'Liberation Mono', ui-monospace, monospace`,r={il1:{glyphs:`Il1`,word:`Illinois 1041`,names:`capital I, lowercase l, digit one`},o0:{glyphs:`O0`,word:`code O0O0`,names:`capital O, digit zero`},rnm:{glyphs:`rn m`,word:`modern, warm`,names:`the r and n pair against a single m`}},i=52;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Confusable characters</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Glyphs" data-part="segmented" data-value="il1">
            <button class="sp-segment" data-part="seg-il1" value="il1">I l 1</button>
            <button class="sp-segment" data-part="seg-o0" value="o0">O 0</button>
            <button class="sp-segment" data-part="seg-rnm" value="rnm">rn m</button>
          </sp-segmented>
        </div>
        <div class="sp-row sp-context" data-part="row-grotesque" style="gap: 14px; height: ${i}px; margin-top: 4px">
          <span class="sp-label" style="width: 128px">Sans-serif</span>
          <span data-part="glyphs-grotesque" style="font-family: ${t}; font-size: 34px; line-height: 1.1"></span>
          <span class="sp-grow" data-part="word-grotesque"
                style="font-family: ${t}; font-size: 13px; color: var(--sp-muted); text-align: right"></span>
        </div>
        <div class="sp-divider sp-context"></div>
        <div class="sp-row" data-part="row-code" style="gap: 14px; height: ${i}px">
          <span class="sp-label sp-context" style="width: 128px">Monospace</span>
          <span data-part="glyphs-code" data-subject data-set="il1"
                style="font-family: ${n}; font-size: 34px; line-height: 1.1"></span>
          <span class="sp-grow sp-context" data-part="word-code"
                style="font-family: ${n}; font-size: 13px; color: var(--sp-muted); text-align: right"></span>
        </div>
        <div class="sp-row sp-context" style="gap: 6px; height: 18px; margin-top: 6px">
          <span class="sp-label">Characters</span>
          <span class="sp-label" data-part="names" style="color: var(--sp-ink)"></span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 4px">
          Same characters, same size, same colour. Only the drawing changed: a tail on the l, serifs on
          the I, a cut through the zero.
        </p>
      </div>
    </div>
  `;let o=t=>{let n=r[t];if(n){for(let t of[`grotesque`,`code`])e(a,`glyphs-${t}`).textContent=n.glyphs,e(a,`word-${t}`).textContent=n.word;e(a,`glyphs-code`).dataset.set=t,e(a,`names`).textContent=n.names}};o(`il1`),e(a,`segmented`).addEventListener(`change`,e=>o(e.detail))}export{a as mount};