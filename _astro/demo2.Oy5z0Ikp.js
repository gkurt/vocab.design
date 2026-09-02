var e=`The findings were filed with `,t=`NASA`,n=` at 9 AM and the archive went public the same week.`;function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-stack sp-context" style="gap: 4px">
          <span class="sp-label">full capitals</span>
          <p class="sp-prose sp-text--ink" data-part="line-caps" style="margin: 0; max-width: none">
            ${e}<span data-part="run-caps">${t}</span>${n}
          </p>
        </div>
        <div class="sp-divider sp-context" style="margin: 14px 0"></div>
        <div class="sp-stack" style="gap: 4px">
          <span class="sp-label sp-context">font-variant-caps: all-small-caps</span>
          <p class="sp-prose sp-text--ink" data-part="line-small" style="margin: 0; max-width: none">
            ${e}<span data-part="run-small" data-subject style="font-variant-caps: all-small-caps">${t}</span>${n}
          </p>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 14px">
          This face carries no small-cap glyphs, so the browser is scaling its capitals. A face
          with true small caps would also thicken the strokes to match the lowercase.
        </p>
      </div>
    </div>
  `}export{r as mount};