import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`Take the harbour survey with you today`,n=256,r=25,i={wrap:`Greedy: each line fills before the next starts.`,balance:`Even: the breaker equalises the line lengths.`};function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">text-wrap</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="balance" data-axis="Wrapping" data-term="balance">
            <button class="sp-segment" data-part="seg-wrap" value="wrap">wrap</button>
            <button class="sp-segment" data-part="seg-balance" value="balance">balance</button>
          </sp-segmented>
        </div>
        <div data-part="measure" style="width: ${n}px; height: 75px; margin-top: 12px;
             border-right: 1px dashed var(--sp-line)">
          <h3 data-part="headline" data-subject data-wrap="balance" data-pose="[data-wrap=balance]"
              style="margin: 0; padding-right: 8px; font-size: 19px; font-weight: 600; line-height: ${r}px;
                     text-wrap: balance">${t}</h3>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="readout" style="margin: 6px 0 0; height: 34px; font-size: 12px; line-height: 17px"></p>
        <div class="sp-divider sp-context" style="margin: 8px 0"></div>
        <div class="sp-stack sp-context" data-part="body" style="gap: 3px">
          <p class="sp-text" style="margin: 0; font-size: 12px; line-height: 17px">
            Moorings, tides and the state of the slipway: five minutes of questions, and the
            answers go to the harbour board before the winter dredging is planned.
          </p>
        </div>
      </div>
    </div>
  `;let o=e(a,`headline`),s=e(a,`readout`),c=e=>{let t=i[e];t&&(o.dataset.wrap=e,o.style.setProperty(`text-wrap`,e),s.textContent=t)};c(`balance`),e(a,`segmented`).addEventListener(`change`,e=>c(e.detail))}export{a as mount};