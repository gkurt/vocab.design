import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`­`,n=`The com${t}mit${t}tee pub${t}lished its rec${t}om${t}men${t}da${t}tions on in${t}com${t}pre${t}hen${t}si${t}ble ad${t}min${t}is${t}tra${t}tive lan${t}guage last week.`,r=150,i=17,a={none:`Long words drop whole and the rag gapes.`,auto:`Breaks inside the words, so the lines even out.`};function o(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">hyphens</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="auto" data-axis="Breaks" data-term="auto">
            <button class="sp-segment" data-part="seg-none" value="none">none</button>
            <button class="sp-segment" data-part="seg-auto" value="auto">auto</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 10px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack" style="gap: 4px">
            <span class="sp-label sp-context">measure: ${r}px</span>
            <div data-part="measure" style="width: ${r}px; height: 119px; border-right: 1px dashed var(--sp-line)">
              <p class="sp-text sp-text--ink" data-part="column" data-subject data-hyphens="auto"
                 data-pose="[data-hyphens=auto]" lang="en"
                 style="margin: 0; padding-right: 6px; font-size: 12px; line-height: ${i}px;
                        -webkit-hyphens: auto; hyphens: auto">${n}</p>
            </div>
          </div>
        </div>
        <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="display: block; margin-top: 8px"></span>
      </div>
    </div>
  `;let o=e(t,`column`),s=e(t,`readout`),c=e=>{let t=a[e];t&&(o.dataset.hyphens=e,o.style.setProperty(`-webkit-hyphens`,e),o.style.setProperty(`hyphens`,e),s.textContent=t)};c(`auto`),e(t,`segmented`).addEventListener(`change`,e=>c(e.detail))}export{o as mount};