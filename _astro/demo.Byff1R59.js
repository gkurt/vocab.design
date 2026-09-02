import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`'Geist Variable', ui-sans-serif, system-ui, sans-serif`,n=`Reading is not a matter of looking at letters one at a time. The eye moves along a line in short hops, taking three or four words at a stride, and at the end of every line it has to swing back and down to a starting point it has never actually looked at.`,r={dense:{size:12,leading:1.2,measure:404},comfortable:{size:13,leading:1.65,measure:330},airy:{size:13,leading:2.3,measure:404}},i={w:404,h:132};function a(e,r){let i=document.createElement(`canvas`).getContext(`2d`);if(!i)return 0;i.font=`${e}px ${t}`;let a=i.measureText(n).width/254;return a>0?Math.round(r/a):0}function o(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Setting" data-value="comfortable">
            <button class="sp-segment" data-part="seg-dense" value="dense">Dense</button>
            <button class="sp-segment" data-part="seg-comfortable" value="comfortable">Comfortable</button>
            <button class="sp-segment" data-part="seg-airy" value="airy">Airy</button>
          </sp-segmented>
        </div>
        <div data-part="slot" style="width: ${i.w}px; height: ${i.h}px; margin-top: 10px">
          <p class="sp-prose sp-text--ink" data-part="paragraph" data-subject data-setting="comfortable"
             style="margin: 0">${n}</p>
        </div>
        <div class="sp-row sp-context" data-part="readout"
             style="gap: 16px; height: 20px; white-space: nowrap; font-variant-numeric: tabular-nums"></div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 6px">
          Nothing about the typeface changed. Size, measure and leading did, and 45 to 75 characters a
          line is the guidance most typographers converge on rather than a rule.
        </p>
      </div>
    </div>
  `;let o=e(t,`paragraph`),s=e(t,`readout`),c=e=>{let t=r[e];t&&(o.dataset.setting=e,o.style.fontSize=`${t.size}px`,o.style.setProperty(`--sp-leading`,String(t.leading)),o.style.setProperty(`--sp-measure`,`${t.measure}px`),s.innerHTML=[`${a(t.size,t.measure)} characters a line`,`leading ${t.leading}`].map(e=>`<span class="sp-label">${e}</span>`).join(``))};c(`comfortable`),e(t,`segmented`).addEventListener(`change`,e=>c(e.detail))}export{o as mount};