var e=`Georgia, 'Liberation Serif', 'Nimbus Roman', serif`;function t(t){let n=(e,t)=>`<span style="position: absolute; left: 0; ${e}; width: 258px; height: 0; border-top: ${t}"></span>`,r=`<span style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">`+[n(`bottom: 0`,`1px solid var(--sp-line)`),n(`bottom: 1ex`,`1px dotted var(--sp-muted)`),n(`bottom: 0.7em; bottom: 1cap`,`1px dashed var(--sp-accent)`)].join(``)+`</span>`,i=(t,n,r)=>`
    <div class="sp-row sp-row--between" data-part="${t}" style="height: 32px">
      <span style="font-family: ${e}; font-size: 22px; line-height: 1.2; white-space: nowrap">
        <span class="sp-swatch" style="display: inline-block; vertical-align: baseline; border-radius: 2px;
              ${n}; --sp-swatch: var(--sp-accent)"></span>&#8202;Filters
      </span>
      <span class="sp-label">${r}</span>
    </div>`;t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Georgia</span>
          <span class="sp-label" style="font-variant-numeric: tabular-nums">46px</span>
        </div>
        <div data-part="ruled" data-subject style="margin-top: 4px; font-size: 0; white-space: nowrap">
          <span data-part="specimen" style="display: inline-block; vertical-align: baseline; width: 258px;
                font-family: ${e}; font-size: 46px; line-height: 1.25">${r}Hamburg</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 2px">
          Solid: the baseline. Dotted: the lowercase. Dashed: where the capital stops.
        </p>
        <div class="sp-divider sp-context" style="margin: 10px 0"></div>
        <div class="sp-stack sp-context" data-part="alignment" style="gap: 4px">
          ${i(`cap-aligned`,`width: 0.7em; height: 0.7em; width: 1cap; height: 1cap`,`1cap`)}
          ${i(`em-aligned`,`width: 1em; height: 1em`,`1em`)}
        </div>
      </div>
    </div>
  `}export{t as mount};