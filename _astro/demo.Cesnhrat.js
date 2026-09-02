import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={tight:1.15,normal:1.5,loose:1.95};function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Leading</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Line height" data-part="segmented" data-value="normal">
            <button class="sp-segment" data-part="seg-tight" value="tight">1.15</button>
            <button class="sp-segment" data-part="seg-normal" value="normal">1.5</button>
            <button class="sp-segment" data-part="seg-loose" value="loose">1.95</button>
          </sp-segmented>
        </div>
        <p class="sp-prose sp-prose--ruled" data-part="prose" data-subject data-leading="normal"
           style="--sp-leading: 1.5; max-width: none; margin-top: 14px">
          The harbour master keeps the tide tables in a ledger by the window, and the
          ferry crews copy each morning's figures onto the board at the top of the
          slipway, where anyone arriving late can still read them from the quay.
        </p>
        <p class="sp-text sp-context" data-part="readout" style="margin-top: 10px">line-height: 1.5 · 13px type on 19.5px lines</p>
      </div>
    </div>
  `;let r=e(n,`prose`),i=e(n,`readout`);e(n,`segmented`).addEventListener(`change`,e=>{let n=e.detail,a=t[n];a&&(r.style.setProperty(`--sp-leading`,String(a)),r.dataset.leading=n,i.textContent=`line-height: ${a} · 13px type on ${(13*a).toFixed(1)}px lines`)})}export{n as mount};