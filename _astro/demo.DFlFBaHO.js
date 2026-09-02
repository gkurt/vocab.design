import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`Handgloves`,n=100,r=900,i=[`300`,`500`,`800`];function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Weight" data-value="300">
            ${i.map(e=>`<button class="sp-segment" data-part="seg-${e}" value="${e}">${e}</button>`).join(``)}
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="sample-box" style="height: 50px; margin-top: 10px">
          <span data-part="sample" data-subject data-wght="300"
                style="font-size: 34px; line-height: 1.2; font-variation-settings: 'wght' 300">${t}</span>
        </div>
        <div class="sp-stack sp-context" data-part="axis" style="gap: 5px">
          <div style="position: relative; height: 8px; border-radius: 999px; background: var(--sp-sunken)">
            <span data-part="marker" style="position: absolute; top: 50%; left: 25%; width: 14px; height: 14px;
                  border-radius: 50%; background: var(--sp-accent); translate: -50% -50%; transition: left 0.28s var(--sp-ease)"></span>
          </div>
          <div class="sp-row sp-row--between">
            <span class="sp-label">${n} thin</span>
            <span class="sp-label" data-part="readout">wght 300</span>
            <span class="sp-label">${r} black</span>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 12px">
          One file answers every value on that line, not just the three picked here. This face ships the
          weight axis alone; width and optical size are registered axes it does not carry.
        </p>
      </div>
    </div>
  `;let o=e(a,`sample`),s=e(a,`marker`),c=e(a,`readout`),l=e=>{if(!i.includes(e))return;let t=Number(e);o.dataset.wght=e,o.style.fontVariationSettings=`'wght' ${t}`,s.style.left=`${(t-n)/800*100}%`,c.textContent=`wght ${t}`};l(`300`),e(a,`segmented`).addEventListener(`change`,e=>l(e.detail))}export{a as mount};