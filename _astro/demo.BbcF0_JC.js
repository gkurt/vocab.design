var e=`Helvetica, 'Helvetica Neue', Arial, 'Liberation Sans', sans-serif`,t=`Georgia, 'Times New Roman', 'Liberation Serif', 'DejaVu Serif', serif`,n=`Handgloves`;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row" style="gap: 18px; align-items: stretch">
          <div class="sp-stack" style="flex: 1 1 0; gap: 4px; align-items: center">
            <span class="sp-label sp-context">sans-serif</span>
            <span data-part="glyph-sans" data-subject
                  style="font-family: ${e}; font-size: 104px; line-height: 1.1">R</span>
            <span data-part="word-sans" style="font-family: ${e}; font-size: 21px">${n}</span>
          </div>
          <div class="sp-divider sp-context" style="width: 1px; height: auto"></div>
          <div class="sp-stack sp-context" style="flex: 1 1 0; gap: 4px; align-items: center">
            <span class="sp-label">serif</span>
            <span data-part="glyph-serif" style="font-family: ${t}; font-size: 104px; line-height: 1.1">R</span>
            <span data-part="word-serif" style="font-family: ${t}; font-size: 21px">${n}</span>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 12px">
          The stems end where they end: no bracket, no flare, no foot. Everything else about the
          two letters, the weight and the width and the skeleton, is a separate decision.
        </p>
      </div>
    </div>
  `}export{r as mount};