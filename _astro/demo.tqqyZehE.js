import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=176,n={"16-9":{css:`16 / 9`,label:`16 / 9`,w:16,h:9},"4-3":{css:`4 / 3`,label:`4 / 3`,w:4,h:3},"1-1":{css:`1 / 1`,label:`1 / 1`,w:1,h:1}},r=t;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 290px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Ratio</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="16-9" data-axis="Aspect">
            <button class="sp-segment" type="button" data-part="seg-16-9" value="16-9">16:9</button>
            <button class="sp-segment" type="button" data-part="seg-4-3" value="4-3">4:3</button>
            <button class="sp-segment" type="button" data-part="seg-1-1" value="1-1">1:1</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; gap: 14px; padding: 12px 14px">
          <div style="flex: 0 0 auto; width: ${t}px; height: ${r}px">
            <div
              class="sp-row"
              data-part="box"
              data-subject
              data-ratio="16-9"
              style="justify-content: center; width: ${t}px; aspect-ratio: ${n[`16-9`]?.css}; background: var(--sp-accent-soft); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              <span class="sp-heading" data-part="ratio-label" style="font-variant-numeric: tabular-nums">16 / 9</span>
            </div>
          </div>
          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0">
            <span class="sp-heading">Tidal bore, Qiantang</span>
            <div class="sp-line" style="width: 94%"></div>
            <div class="sp-line" style="width: 86%"></div>
            <div class="sp-line" style="width: 90%"></div>
            <div class="sp-line" style="width: 58%"></div>
            <span class="sp-text" data-part="readout" style="margin-top: 6px; font-variant-numeric: tabular-nums"></span>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(i,`box`),o=e(i,`ratio-label`),s=e(i,`readout`),c=e=>{let r=n[e];r&&(a.dataset.ratio=e,a.style.aspectRatio=r.css,o.textContent=r.label,s.textContent=`width ${t}px · height ${Math.round(t*r.h/r.w)}px, from the ratio`)};e(i,`switcher`).addEventListener(`change`,e=>c(e.detail)),c(`16-9`)}export{i as mount};