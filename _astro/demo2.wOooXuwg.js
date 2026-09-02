import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`color: var(--sp-accent); font-weight: 600`,n=e=>e===`hidden`||e===`shown`,r={hidden:`Marks off: nothing on screen says where one paragraph ends and the next begins.`,shown:`Marks on: ¶ ends a paragraph, ↵ only ends a line.`},i=()=>`<span data-mark style="display: inline-block; width: 0.3em; text-align: center; ${t}">·</span>`,a=e=>e.split(` `).join(i());function o(e,n){return`<span data-mark ${n?`data-part="pilcrow" data-subject`:``} style="display: inline-block; min-width: 0.7em; ${t}">${e}</span>`}function s(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-grow"></span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Formatting marks" data-value="shown">
            <button class="sp-segment" data-part="seg-hidden" value="hidden">hidden</button>
            <button class="sp-segment" data-part="seg-shown" value="shown">shown</button>
          </sp-segmented>
        </div>
        <div class="sp-surface" data-part="body" data-marks="shown"
             style="margin-top: 10px; padding: 14px 16px; height: 112px; font-size: 15px; line-height: 1.7">
          <p style="margin: 0">
            ${a(`Notes for the Thursday review,`)}${o(`↵`,!1)}<br>
            ${a(`in the order we will take them.`)}${o(`¶`,!0)}
          </p>
          <p style="margin: 0">
            <span data-mark style="display: inline-block; width: 2em; ${t}">→</span>${a(`Budget first, then the schedule.`)}${o(`¶`,!1)}
          </p>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="readout" style="margin: 0">${r.shown}</p>
      </div>
    </div>
  `;let s=e(i,`body`),c=e(i,`readout`),l=[...i.querySelectorAll(`[data-mark]`)];e(i,`segmented`).addEventListener(`change`,e=>{let t=e.detail;if(n(t)){s.dataset.marks=t;for(let e of l)e.style.visibility=t===`shown`?`visible`:`hidden`;c.textContent=r[t]}})}export{s as mount};