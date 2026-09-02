function e(e){let t=(e,t)=>`<span style="position: absolute; left: 0; bottom: ${e}; width: 176px; height: 0; border-top: ${t}"></span>`,n=(e,n,r)=>`
    <span data-part="${e}" style="display: inline-block; vertical-align: baseline; width: 176px;
          margin-left: ${r}px; font-family: ${n}; font-size: 62px; line-height: 1.3">
      <span style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">
        ${t(`0`,`1px solid var(--sp-line)`)}
        ${t(`1ex`,`1px dashed var(--sp-accent)`)}
      </span>xhp
    </span>`;e.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 430px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Same size, two faces</span>
          <span class="sp-label" style="font-variant-numeric: tabular-nums">62px</span>
        </div>
        <div class="sp-row sp-context" style="gap: 0; margin-top: 10px">
          <span class="sp-label" style="width: 176px">large x-height</span>
          <span class="sp-label" style="width: 176px; margin-left: 18px">small x-height</span>
        </div>
        <div data-part="ruled" data-subject style="margin-top: 2px; font-size: 0; white-space: nowrap">
          ${n(`sample-large`,`Verdana, 'DejaVu Sans', 'Liberation Sans', sans-serif`,0)}${n(`sample-small`,`'Times New Roman', 'Liberation Serif', 'Nimbus Roman', serif`,18)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">
          Solid line: the baseline, shared. Dashed line: the top of the lowercase x. Both columns
          are set at 62px; the face on the left spends more of that size on its lowercase.
        </p>
      </div>
    </div>
  `}export{e as mount};