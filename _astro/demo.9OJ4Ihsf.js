var e=[{tag:`h1`,text:`Payments`,size:23,gap:0,lines:2},{tag:`h2`,text:`Refunds`,size:16.5,gap:15,lines:2},{tag:`h3`,text:`Partial refunds`,size:13.5,gap:13,lines:2}];function t(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 430px">
        ${e.map(({tag:e,text:t,size:n,gap:r,lines:i})=>{let a=e===`h2`?` data-subject`:``,o=e=>e===i-1?62:100;return`
      <div style="margin-top: ${r}px">
        <div class="sp-row" style="gap: 10px; margin-bottom: 7px">
          <${e} class="sp-grow" data-part="${e}"${a}
                  style="margin: 0; font-size: ${n}px; font-weight: 600; line-height: 1.25">${t}</${e}>
          <span class="sp-label sp-context" style="font-variant-numeric: tabular-nums">${e}</span>
        </div>
        <div class="sp-stack sp-context" data-part="copy-${e}" style="gap: 6px">${Array.from({length:i},(e,t)=>`<div class="sp-line" style="width: ${o(t)}%"></div>`).join(``)}</div>
      </div>`}).join(``)}
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 14px">
          Size and weight say how deep in the outline a section sits.
        </p>
      </div>
    </div>
  `}export{t as mount};