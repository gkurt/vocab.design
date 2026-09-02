import{n as e,r as t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=[`Dr. Chen`,`10 km`,`section 4.2`,`Figure 3`],r=`\xA0`,i=150,a=17,o={space:`Ordinary spaces: a pair is free to fall across two lines.`,nbsp:`No-break spaces: each pair stays whole wherever the line ends.`};function s(s){let c=e=>`<span data-part="pair" style="background: var(--sp-accent-soft)">${n[e]}</span>`;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="nbsp" data-axis="Character" data-term="nbsp">
          <button class="sp-segment" data-part="seg-space" value="space">space</button>
          <button class="sp-segment" data-part="seg-nbsp" value="nbsp">nbsp</button>
        </sp-segmented>
        <div class="sp-row" style="gap: 10px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack" style="gap: 4px">
            <span class="sp-label sp-context">measure: ${i}px</span>
            <div data-part="measure" style="width: ${i}px; height: 102px; border-right: 1px dashed var(--sp-line)">
              <p class="sp-text sp-text--ink" data-part="column" data-subject data-glue="nbsp" data-pose="[data-glue=nbsp]"
                 style="margin: 0; padding-right: 6px; font-size: 12px; line-height: ${a}px">
                Meet ${c(0)} on the pontoon, bring the ${c(1)} chart, and read ${c(2)} before ${c(3)}.
              </p>
            </div>
          </div>
          <p class="sp-text sp-context" data-stage-verdict data-part="readout" style="margin: 0; width: 96px; font-size: 12px; line-height: 16px"></p>
        </div>
      </div>
    </div>
  `;let l=e(s,`column`),u=e(s,`readout`),d=t(s,`pair`),f=e=>{let t=o[e];if(t){l.dataset.glue=e;for(let[t,i]of d.entries()){let a=n[t];a&&(i.textContent=e===`nbsp`?a.replaceAll(` `,r):a)}u.textContent=t}};f(`nbsp`),e(s,`segmented`).addEventListener(`change`,e=>f(e.detail))}export{s as mount};