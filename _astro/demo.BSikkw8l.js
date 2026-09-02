var e=`Georgia, 'Times New Roman', 'Liberation Serif', 'DejaVu Serif', serif`;function t(t){let n=(t,n,r=``)=>`
    <div class="sp-stack" data-part="${t}" ${r} style="gap: 2px; align-items: center">
      <span style="font-family: ${e}; font-size: 52px; line-height: 1.15; ${n}">aef</span>
      <span style="font-family: ${e}; font-size: 17px; ${n}">afterglow</span>
    </div>`;t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 450px">
        <div class="sp-row" style="gap: 14px; align-items: stretch">
          <div class="sp-stack sp-context" style="flex: 1 1 0; gap: 4px; align-items: center">
            <span class="sp-label">roman</span>
            ${n(`sample-roman`,``)}
          </div>
          <div class="sp-divider sp-context" style="width: 1px; height: auto"></div>
          <div class="sp-stack" style="flex: 1 1 0; gap: 4px; align-items: center">
            <span class="sp-label sp-context">true italic</span>
            ${n(`sample-italic`,`font-style: italic`,`data-subject`)}
          </div>
          <div class="sp-divider sp-context" style="width: 1px; height: auto"></div>
          <div class="sp-stack sp-context" style="flex: 1 1 0; gap: 4px; align-items: center">
            <span class="sp-label">oblique (skewed)</span>
            ${n(`sample-oblique`,`transform: skewX(-12deg)`)}
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 12px">
          In the drawn italic the a drops to a single storey, the e tips its bowl, and the f gains a
          descender. The skewed column leans at the same angle with the roman letters untouched.
        </p>
      </div>
    </div>
  `}export{t as mount};