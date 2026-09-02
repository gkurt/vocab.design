var e=`Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif`,t={asc:.75,cap:.69,x:.48};function n(t,n){let r=document.createElement(`canvas`).getContext(`2d`);return r?(r.font=`${n}px ${e}`,r.measureText(t).actualBoundingBoxAscent||0):0}function r(r){let i=n(`bhkl`,74)||t.asc*74,a=n(`H`,74)||t.cap*74,o=n(`x`,74)||t.x*74,s=e=>(e/74).toFixed(2),c=(e,t)=>`<span style="position: absolute; left: 0; bottom: ${e}px; width: 410px; height: 0; border-top: ${t}"></span>`,l=`<span style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">`+[`<span data-part="band" style="position: absolute; left: 0; bottom: ${a}px; width: 410px;
             height: ${Math.max(i-a,3)}px;
             background: color-mix(in oklab, var(--sp-accent) 22%, transparent)"></span>`,c(0,`1px solid var(--sp-line)`),c(o,`1px dotted var(--sp-muted)`),c(a,`1px dashed var(--sp-muted)`),c(i,`1px solid var(--sp-accent)`)].join(``)+`</span>`,u=(e,t)=>`
    <span class="sp-row" style="gap: 6px">
      <span style="width: 20px; height: 0; border-top: ${e}"></span>
      <span class="sp-label">${t}</span>
    </span>`;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <span class="sp-label" style="font-variant-numeric: tabular-nums">74px</span>
        </div>
        <div data-part="ruled" data-subject style="margin-top: 2px; font-size: 0; white-space: nowrap">
          <span data-part="specimen" style="display: inline-block; vertical-align: baseline; width: 410px;
                font-family: ${e}; font-size: 74px; line-height: 1.3">${l}<span style="position: relative">Bookshelf</span></span>
        </div>
        <div class="sp-row sp-row--wrap sp-context" data-part="legend" style="gap: 6px 14px; margin-top: 6px">
          ${u(`1px solid var(--sp-line)`,`baseline`)}
          ${u(`1px dotted var(--sp-muted)`,`x-height`)}
          ${u(`1px dashed var(--sp-muted)`,`cap height`)}
          ${u(`1px solid var(--sp-accent)`,`ascender`)}
        </div>
        <div class="sp-row sp-row--between sp-context" data-part="metrics"
             style="margin-top: 8px; font-variant-numeric: tabular-nums">
          <span class="sp-label">ascender ${s(i)}em</span>
          <span class="sp-label">cap height ${s(a)}em</span>
          <span class="sp-label">x-height ${s(o)}em</span>
        </div>
      </div>
    </div>
  `}export{r as mount};