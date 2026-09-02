var e=`Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif`,t={desc:.22,x:.48};function n(t,n){let r=document.createElement(`canvas`).getContext(`2d`);if(!r)return{above:0,below:0};r.font=`${n}px ${e}`;let i=r.measureText(t);return{above:i.actualBoundingBoxAscent||0,below:i.actualBoundingBoxDescent||0}}function r(r){let i=n(`ypg`,64).below||t.desc*64,a=n(`x`,64).above||t.x*64,o=(e,t)=>`<span style="position: absolute; left: 0; bottom: ${e}px; width: 410px; height: 0; border-top: ${t}"></span>`,s=`<span style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">`+[`<span data-part="band" style="position: absolute; left: 0; bottom: ${-i}px; width: 410px;
             height: ${Math.max(i,3)}px;
             background: color-mix(in oklab, var(--sp-accent) 22%, transparent)"></span>`,o(a,`1px dotted var(--sp-muted)`),o(0,`1px solid var(--sp-line)`),o(-i,`1px solid var(--sp-accent)`)].join(``)+`</span>`,c=(e,t)=>`
    <span class="sp-row" style="gap: 6px">
      <span style="width: 20px; height: 0; border-top: ${e}"></span>
      <span class="sp-label">${t}</span>
    </span>`,l=(t,n,r)=>`
    <div class="sp-stack" style="gap: 4px">
      <div data-part="${t}" style="width: 150px; height: ${n}px; overflow: hidden; padding: 0 8px;
           border: 1px solid var(--sp-line); border-radius: 6px; background: var(--sp-surface)">
        <span style="font-family: ${e}; font-size: 26px; line-height: ${n}px">Signage</span>
      </div>
      <span class="sp-label">${r}</span>
    </div>`;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Vertical metrics</span>
          <span class="sp-label" style="font-variant-numeric: tabular-nums">64px</span>
        </div>
        <div data-part="ruled" data-subject style="margin-top: 2px; font-size: 0; white-space: nowrap">
          <span data-part="specimen" style="display: inline-block; vertical-align: baseline; width: 410px;
                font-family: ${e}; font-size: 64px; line-height: 1.3">${s}<span style="position: relative">Typography</span></span>
        </div>
        <div class="sp-row sp-row--wrap sp-context" data-stage-verdict data-part="legend" style="gap: 6px 14px">
          ${c(`1px dotted var(--sp-muted)`,`x-height`)}
          ${c(`1px solid var(--sp-line)`,`baseline`)}
          ${c(`1px solid var(--sp-accent)`,`descender, ${(i/64).toFixed(2)}em below it`)}
        </div>
        <div class="sp-divider sp-context" style="margin: 10px 0"></div>
        <div class="sp-row sp-context" data-part="clipping" style="gap: 16px; align-items: flex-end">
          ${l(`trimmed`,22,`height 22px`)}
          ${l(`roomy`,32,`height 32px`)}
        </div>
      </div>
    </div>
  `}export{r as mount};