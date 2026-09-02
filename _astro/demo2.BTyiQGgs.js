var e=`Georgia, 'Times New Roman', 'Liberation Serif', 'DejaVu Serif', serif`,t=`Helvetica, 'Helvetica Neue', Arial, 'Liberation Sans', sans-serif`,n=`Handgloves`;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row" style="gap: 18px; align-items: stretch">
          <div class="sp-stack" style="flex: 1 1 0; gap: 4px; align-items: center">
            <span class="sp-label sp-context">serif</span>
            <span data-part="glyph-serif" data-subject
                  style="font-family: ${e}; font-size: 104px; line-height: 1.1">R</span>
            <span data-part="word-serif" style="font-family: ${e}; font-size: 21px">${n}</span>
          </div>
          <div class="sp-divider sp-context" style="width: 1px; height: auto"></div>
          <div class="sp-stack sp-context" style="flex: 1 1 0; gap: 4px; align-items: center">
            <span class="sp-label">sans-serif</span>
            <span data-part="glyph-sans" style="font-family: ${t}; font-size: 104px; line-height: 1.1">R</span>
            <span data-part="word-sans" style="font-family: ${t}; font-size: 21px">${n}</span>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 12px">
          The short strokes closing the top of the stem, the foot, and the end of the leg are the
          serifs. On the face beside it the strokes simply stop.
        </p>
      </div>
    </div>
  `}export{r as mount};