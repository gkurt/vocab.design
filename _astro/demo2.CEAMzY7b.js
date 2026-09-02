import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={100:{size:`11px`,caption:`The reader’s text size at 100 percent. Both cards hold the same words in the same boxes.`},200:{size:`22px`,caption:`Only the type grew, not the boxes. The tolerant card takes the room it needs; the pixel-locked one cuts its own button off. The mistake.`}},r=`
  <span style="display: block; font-weight: 600; font-size: 1.05em">Ferry times</span>
  <p style="margin: 0.45em 0 0; font-size: 0.92em; line-height: 1.4; color: var(--sp-muted)">Every 40 minutes.</p>`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-row sp-row--between sp-context" style="width: 456px; justify-content: flex-end">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Text size" data-part="segmented" data-value="100">
          <button class="sp-segment" data-part="seg-100" value="100">100%</button>
          <button class="sp-segment" data-part="seg-200" value="200">200%</button>
        </sp-segmented>
      </div>

      <div class="sp-row" style="width: 456px; height: 208px; gap: 16px; align-items: flex-start">
        <div style="width: 220px">
          <div class="sp-surface" data-part="card" data-subject data-scale="100"
               style="padding: 0.75em 0.85em; font-size: 11px">
            ${r}
            <button class="sp-button" type="button" data-part="cta"
                    style="margin-top: 0.7em; padding: 0.45em 0.9em; font-size: 0.92em; white-space: normal">Book a seat</button>
          </div>
        </div>

        <div style="width: 220px">
          <div class="sp-surface sp-context" data-part="twin"
               style="height: 92px; padding: 0.75em 0.85em; font-size: 11px; overflow: hidden">
            ${r}
            <button class="sp-button" type="button" data-part="twin-cta"
                    style="margin-top: 0.7em; padding: 0 14px; height: 26px; line-height: 26px; font-size: 0.92em; white-space: nowrap">Book a seat</button>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="100"
         style="width: 456px; margin: 0; height: 34px; font-size: 11px">${n[100].caption}</p>
    </div>
  `;let a=e(i,`card`),o=e(i,`twin`),s=e(i,`caption`),c=e=>{let r=n[e];a.dataset.scale=e,a.style.fontSize=r.size,o.style.fontSize=r.size,t(o,`data-clipped`,e===`200`),s.dataset.case=e,s.textContent=r.caption};e(i,`segmented`).addEventListener(`change`,e=>{c(e.detail===`200`?`200`:`100`)})}export{i as mount};