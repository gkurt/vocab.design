var e=`Georgia, 'Liberation Serif', 'Nimbus Roman', serif`,t=[{part:`job-range`,label:`range`,line:`2019–2024, pages 44–51`},{part:`job-score`,label:`score`,line:`the vote came in 51–49`},{part:`job-link`,label:`connection`,line:`the London–Paris route`}],n=[{part:`mark-hyphen`,name:`hyphen`,glyph:`-`,code:`U+002D`},{part:`mark-en`,name:`en dash`,glyph:`–`,code:`U+2013`},{part:`mark-em`,name:`em dash`,glyph:`&mdash;`,code:`U+2014`}];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">U+2013</span>
        </div>
        <div class="sp-row" style="gap: 16px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack sp-context" data-part="jobs-labels" style="gap: 6px; width: 96px">${t.map(e=>`<span class="sp-label" style="height: 28px; line-height: 28px">${e.label}</span>`).join(``)}</div>
          <div class="sp-stack" data-part="jobs" data-subject style="gap: 6px">${t.map(t=>`
      <span data-part="${t.part}"
            style="height: 28px; line-height: 28px; white-space: nowrap;
                   font-family: ${e}; font-size: 19px">${t.line}</span>`).join(``)}</div>
        </div>
        <div class="sp-divider sp-context" style="margin: 14px 0"></div>
        <div class="sp-row sp-context" data-part="widths" style="gap: 4px; justify-content: center">${n.map(t=>`
      <div class="sp-stack" data-part="${t.part}" style="gap: 2px; align-items: center; width: 108px">
        <span style="background: var(--sp-accent-soft); font-family: ${e}; font-size: 28px; line-height: 1.1">${t.glyph}</span>
        <span class="sp-label">${t.name}</span>
        <span class="sp-label" style="font-size: 11px">${t.code}</span>
      </div>`).join(``)}</div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 12px">
          A hyphen joins, an en dash spans, and the longest mark breaks a sentence open. Reaching for the
          hyphen in a range is the common slip, and it reads as one compound word rather than as two ends.
        </p>
      </div>
    </div>
  `}export{r as mount};