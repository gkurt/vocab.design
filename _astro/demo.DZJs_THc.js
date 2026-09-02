import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`­`,n=`The light${t}house keep${t}ers were with${t}drawn in nine${t}teen eighty-eight, and the tower has run un${t}at${t}tend${t}ed ever since. Sup${t}plies arrive by heli${t}cop${t}ter twice a year, weather per${t}mit${t}ting, and the auto${t}mat${t}ic lamp is checked from the main${t}land every quar${t}ter.`,r=175,i=18,a={none:`The word spaces carry all of the stretch, and the gaps line up.`,auto:`More places to break, so the spacing evens out.`};function o(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="hyphens" data-part="segmented" data-value="none">
            <button class="sp-segment" data-part="seg-none" value="none">none</button>
            <button class="sp-segment" data-part="seg-auto" value="auto">auto</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 14px; margin-top: 14px; align-items: flex-start">
          <div class="sp-stack sp-context" style="gap: 4px">
            <span class="sp-label">text-align: left</span>
            <div style="width: ${r}px; height: 162px">
              <p class="sp-text" data-part="ragged" lang="en"
                 style="margin: 0; font-size: 12px; line-height: ${i}px; text-align: left; -webkit-hyphens: none; hyphens: none">${n}</p>
            </div>
          </div>
          <div class="sp-stack" style="gap: 4px">
            <span class="sp-label sp-context">text-align: justify</span>
            <div style="width: ${r}px; height: 162px">
              <p class="sp-text" data-part="justified" data-subject data-hyphens="none" lang="en"
                 style="margin: 0; font-size: 12px; line-height: ${i}px; text-align: justify; -webkit-hyphens: none; hyphens: none">${n}</p>
            </div>
          </div>
        </div>
      </div>
      <p data-stage-verdict data-part="readout"></p>
    </div>
  `;let o=e(t,`justified`),s=e(t,`readout`),c=e=>{let t=a[e];t&&(o.dataset.hyphens=e,o.style.setProperty(`-webkit-hyphens`,e),o.style.setProperty(`hyphens`,e),s.textContent=t)};c(`none`),e(t,`segmented`).addEventListener(`change`,e=>c(e.detail))}export{o as mount};