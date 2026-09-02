import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={with:`Category, then claim, then detail. The shelf label is read before the headline and costs one line.`,without:`The headline has to carry the category as well, and a reader scanning a column of cards has nothing to sort them by.`};function n(n){let r=e=>`<span class="sp-label sp-context" style="flex: 0 0 14px; text-align: right">${e}</span>`;n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">The line above the headline</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Eyebrow" data-part="segmented" data-value="with">
            <button class="sp-segment" data-part="seg-with" value="with">with</button>
            <button class="sp-segment" data-part="seg-without" value="without">without</button>
          </sp-segmented>
        </div>
        <div class="sp-surface" data-part="card" style="margin-top: 12px; padding: 14px 16px">
          <div class="sp-row" style="gap: 10px; height: 18px">
            ${r(1)}
            <span data-part="eyebrow" data-subject
                  style="font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
                         color: var(--sp-accent)">Field notes</span>
          </div>
          <div class="sp-row" style="gap: 10px; margin-top: 6px">
            ${r(2)}
            <span class="sp-context" data-part="headline" style="font-size: 19px; font-weight: 600; line-height: 1.25">The measure that fits the eye</span>
          </div>
          <div class="sp-row" style="gap: 10px; margin-top: 6px; align-items: flex-start">
            ${r(3)}
            <p class="sp-text sp-context" data-part="deck" style="margin: 0">Why a column of 66 characters is easier to read than a
              wider one, and what to do when the layout will not give you the room.</p>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="readout" style="margin-top: 10px; height: 39px"></p>
      </div>
    </div>
  `;let i=e(n,`eyebrow`),a=e(n,`card`),o=e(n,`readout`),s=e=>{let n=t[e];n&&(a.dataset.eyebrow=e,i.style.opacity=e===`with`?`1`:`0`,o.textContent=n)};s(`with`),e(n,`segmented`).addEventListener(`change`,e=>s(e.detail))}export{n as mount};