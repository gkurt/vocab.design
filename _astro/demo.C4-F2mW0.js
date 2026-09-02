import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{i as t}from"./measure.DK7AY2_i.js";var n=`'Source Serif 4 Variable', Georgia, serif`,r=10,i=[30,45,60],a=Math.max(...i),o=e=>i.some(t=>String(t)===e),s=`The harbour office opens at seven, and the first ferry leaves twenty minutes later. Tickets are sold on the quay, in cash, by a woman who has done the job for thirty years and knows every regular by name.`,c=92;function l(l){let u=e=>Array.from({length:a},(t,n)=>`<span ${e&&n===0?`data-part="unit" data-subject `:``}style="display: inline-block; width: 1ch; text-align: center">0</span>`).join(``),d=(e,t,n)=>`
    <div data-part="${e}" style="width: 45ch; overflow: hidden; white-space: nowrap; font-size: ${r}px;
         line-height: 1.6; ${t}; transition: width 0.28s var(--sp-ease)">${u(n)}</div>`;l.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 460px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="max-width" data-value="45">
            ${i.map(e=>`<button class="sp-segment" data-part="seg-${e}" value="${e}">${e}ch</button>`).join(``)}
          </sp-segmented>
        </div>
        <div style="height: ${c}px; margin-top: 10px">
          <p class="sp-prose sp-context" data-part="column" data-ch="45"
             style="margin: 0; font-size: ${r}px; --sp-measure: 45ch; transition: max-width 0.28s var(--sp-ease)">${s}</p>
        </div>
        ${d(`ruler-sans`,``,!0)}
        <div class="sp-context" style="margin-top: 6px">${d(`ruler-serif`,`font-family: ${n}`,!1)}</div>
        <div class="sp-row sp-context" style="height: 30px; margin-top: 6px">
          <span class="sp-chip" data-part="readout" style="cursor: default; font-variant-numeric: tabular-nums"></span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 2px">
          One zero, one ch. The upper ruler is the column's own face and ends where the column does; the lower
          one is the same count in a serif.
        </p>
      </div>
    </div>
  `;let f=e(l,`column`),p=e(l,`ruler-sans`),m=e(l,`ruler-serif`),h=e(l,`readout`),g=t(e(l,`unit`)).width,_=(()=>{let e=m.firstElementChild;return e?t(e).width:g})(),v=e=>{if(!o(e))return;let t=Number(e);f.dataset.ch=e,f.style.setProperty(`--sp-measure`,`${t}ch`),p.style.width=`${t}ch`,m.style.width=`${t}ch`,h.textContent=`${t}ch is ${Math.round(t*g)}px here, ${Math.round(t*_)}px in the serif`};v(`45`),e(l,`segmented`).addEventListener(`change`,e=>v(e.detail))}export{l as mount};