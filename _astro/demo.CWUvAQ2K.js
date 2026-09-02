var e=[{part:`caption-cut`,name:`Caption`,wght:500,track:.028,size:9},{part:`display-cut`,name:`Display`,wght:320,track:-.014,size:40}];function t(t){let n=(e,t,n,r)=>`<span data-part="${e}" style="font-family: 'Source Serif 4 Variable', Georgia, 'Liberation Serif', serif; font-size: ${r}px; line-height: 1.15;
           font-variation-settings: 'wght' ${t}; letter-spacing: ${n}em">Handgloves</span>`,r=e.map(({name:e})=>`<span class="sp-row sp-label" style="height: 48px; width: 136px">${e}</span>`),i=e.map(e=>`<span class="sp-row" style="height: 48px">${n(e.part,e.wght,e.track,40)}</span>`),a=e.map(e=>`<span class="sp-row" style="gap: 8px; align-items: baseline">${n(`${e.part}-native`,e.wght,e.track,e.size)}<span
            class="sp-label" style="font-variant-numeric: tabular-nums">${e.size} px</span></span>`);t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <span class="sp-label" style="font-variant-numeric: tabular-nums">40 px</span>
        </div>
        <div class="sp-row" style="gap: 12px; margin-top: 8px; align-items: stretch">
          <div class="sp-stack sp-context" style="gap: 0; flex: 0 0 auto">
            ${r.join(``)}
          </div>
          <div class="sp-stack" data-part="pair" data-subject style="gap: 0">
            ${i.join(``)}
          </div>
        </div>
        <div class="sp-divider sp-context" style="margin: 6px 0"></div>
        <div class="sp-row sp-context" data-part="intended" style="height: 48px; gap: 28px; padding-left: 148px; align-items: baseline">
          ${a.join(``)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 2px">
          Sturdier stems and looser spacing for the small cut, finer stems and a tighter fit for the
          large one. Simulated with the weight axis: the serif this page loads carries wght alone.
        </p>
      </div>
    </div>
  `}export{t as mount};