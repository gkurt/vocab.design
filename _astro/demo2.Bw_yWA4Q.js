import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[`display`,`heading`,`body`,`caption`],n=e=>e===`compact`||e==="default"||e===`large`,r={compact:{display:{size:18,line:24,weight:600,track:`-0.01em`},heading:{size:14,line:19,weight:600,track:`0`},body:{size:12,line:17,weight:400,track:`0`},caption:{size:10,line:14,weight:500,track:`0.02em`}},default:{display:{size:22,line:28,weight:600,track:`-0.01em`},heading:{size:17,line:23,weight:600,track:`0`},body:{size:13,line:19,weight:400,track:`0`},caption:{size:11,line:15,weight:500,track:`0.02em`}},large:{display:{size:27,line:34,weight:600,track:`-0.01em`},heading:{size:21,line:28,weight:600,track:`0`},body:{size:16,line:23,weight:400,track:`0`},caption:{size:13,line:18,weight:500,track:`0.02em`}}},i={w:190,h:152},a=204;function o(o){let s=t.map((e,n)=>`
        <tr data-part="row-${e}"${e===`heading`?` data-subject data-density="default"`:` class="sp-context"`}>
          <th scope="row" style="font-weight: 500${n===t.length-1?`; border-bottom: 0`:``}">type.${e}</th>
          <td data-part="size-${e}" style="font-variant-numeric: tabular-nums"></td>
          <td data-part="weight-${e}" style="font-variant-numeric: tabular-nums"></td>
        </tr>`).join(``);o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Density" data-part="segmented" data-value="default">
            <button class="sp-segment" data-part="seg-compact" value="compact">compact</button>
            <button class="sp-segment" data-part="seg-default" value="default">default</button>
            <button class="sp-segment" data-part="seg-large" value="large">large</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 14px; align-items: flex-start; margin-top: 10px; height: ${i.h}px">
          <table class="sp-table" data-part="table" style="width: ${a}px; --sp-cell-pad: 5px 8px">
            <thead class="sp-context">
              <tr>
                <th>token</th>
                <th>size / line</th>
                <th>wt</th>
              </tr>
            </thead>
            <tbody>${s}</tbody>
          </table>
          <div class="sp-surface sp-context" data-part="card"
               style="width: ${i.w}px; height: ${i.h}px; padding: 12px; display: flex; flex-direction: column; gap: 6px">
            <span data-part="card-display">1,284</span>
            <span data-part="card-heading">Weekly digest</span>
            <p data-part="card-body" style="margin: 0; color: var(--sp-muted)">Named, not typed.</p>
            <span data-part="card-caption" style="color: var(--sp-muted)">Updated 4 min ago</span>
          </div>
        </div>
        <div class="sp-row sp-context" style="margin-top: 10px; height: 26px">
          <span class="sp-chip" data-part="readout" style="cursor: default; font-variant-numeric: tabular-nums"></span>
        </div>
      </div>
    </div>
  `;let c=e(o,`row-heading`),l=e(o,`readout`),u={display:e(o,`card-display`),heading:e(o,`card-heading`),body:e(o,`card-body`),caption:e(o,`card-caption`)},d=i=>{if(!n(i))return;let a=r[i];c.dataset.density=i;for(let n of t){let t=a[n];e(o,`size-${n}`).textContent=`${t.size} / ${t.line}`,e(o,`weight-${n}`).textContent=String(t.weight);let r=u[n];r.style.fontSize=`${t.size}px`,r.style.lineHeight=`${t.line}px`,r.style.fontWeight=String(t.weight),r.style.letterSpacing=t.track}let s=a.heading;l.textContent=`type.heading resolves to ${s.size}px / ${s.line}px / ${s.weight}`};d(`default`),e(o,`segmented`).addEventListener(`change`,e=>d(e.detail))}export{o as mount};