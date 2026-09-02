import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`⚠`,n=`︎`,r=`️`,i={auto:`font-variant-emoji: auto`,text:`font-variant-emoji: text`,emoji:`font-variant-emoji: emoji`},a=e=>e in i,o=46;function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="font-variant-emoji" data-value="text">
            <button class="sp-segment" data-part="seg-auto" value="auto">auto</button>
            <button class="sp-segment" data-part="seg-text" value="text">text</button>
            <button class="sp-segment" data-part="seg-emoji" value="emoji">emoji</button>
          </sp-segmented>
        </div>
        <div class="sp-surface" data-part="line" style="margin-top: 8px; padding: 10px 14px; font-size: 18px; white-space: nowrap">
          <span data-part="mark" data-subject data-mode="text" style="${`display: inline-block; width: ${o}px; text-align: center; vertical-align: -0.15em`}">${t}</span>Three routes delayed
        </div>
        <div class="sp-row sp-context" data-part="spellings" style="gap: 10px; margin-top: 10px">
          <div class="sp-surface sp-stack" style="flex: 1 1 0; padding: 8px; gap: 4px; align-items: center">
            <span data-part="cell-bare" style="font-size: 24px; line-height: 1.2">${t}</span>
            <span class="sp-label">U+26A0</span>
          </div>
          <div class="sp-surface sp-stack" style="flex: 1 1 0; padding: 8px; gap: 4px; align-items: center">
            <span data-part="cell-text" style="font-size: 24px; line-height: 1.2">${t}${n}</span>
            <span class="sp-label">plus U+FE0E</span>
          </div>
          <div class="sp-surface sp-stack" style="flex: 1 1 0; padding: 8px; gap: 4px; align-items: center">
            <span data-part="cell-emoji" style="font-size: 24px; line-height: 1.2">${t}${r}</span>
            <span class="sp-label">plus U+FE0F</span>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 26px">
          <span class="sp-chip" data-part="readout" style="cursor: default">${i.text}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 4px">
          The colour form is a wider glyph, so the character sits in a fixed slot to keep the line from reflowing.
        </p>
      </div>
    </div>
  `;let c=e(s,`mark`),l=e(s,`readout`),u=[e(s,`cell-bare`),e(s,`cell-text`),e(s,`cell-emoji`)];e(s,`segmented`).addEventListener(`change`,e=>{let t=e.detail;if(a(t)){c.dataset.mode=t,c.style.setProperty(`font-variant-emoji`,t);for(let e of u)e.style.setProperty(`font-variant-emoji`,t);l.textContent=i[t]}}),c.style.setProperty(`font-variant-emoji`,`text`);for(let e of u)e.style.setProperty(`font-variant-emoji`,`text`)}export{s as mount};