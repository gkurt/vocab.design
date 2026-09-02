var e=[{value:300,name:`Light`},{value:400,name:`Regular`},{value:600,name:`Semi Bold`},{value:700,name:`Bold`}];function t(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 430px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Weight ramp</span>
        </div>
        <div class="sp-stack" data-part="ramp" data-subject style="gap: 4px; margin-top: 12px">
          ${e.map(({value:e,name:t})=>`
      <div class="sp-row" data-part="step-${e}" style="gap: 12px">
        <span data-part="sample-${e}" class="sp-grow"
              style="font-weight: ${e}; font-size: 18px; line-height: 1.35">Hamburgefons</span>
        <span class="sp-label" style="width: 30px; text-align: right; font-variant-numeric: tabular-nums">${e}</span>
        <span class="sp-label" style="width: 66px">${t}</span>
      </div>`).join(``)}
        </div>
        <div class="sp-divider sp-context" style="margin: 12px 0"></div>
        <div class="sp-stack sp-context" data-part="applied" style="gap: 2px">
          <span style="font-weight: 600; font-size: 13px">Invoice 0042</span>
          <span class="sp-text" style="font-size: 13px">Paid on 4 March, Northwind Trading</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 8px">
          Both lines are 13px. Weight alone says which one is the title.
        </p>
      </div>
    </div>
  `}export{t as mount};