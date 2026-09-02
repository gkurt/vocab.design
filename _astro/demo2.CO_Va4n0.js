import{n as e,r as t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=`The harbour road runs north past the boatyard, then turns inland where the marsh begins. In summer the ferry crosses twice an hour, and in winter it waits for the tide to come back.`,r=1.7,i=128,a=124,o=[{part:`col-light`,label:`300 · 1.9 · +0.06em`,css:`font-weight: 300; line-height: 1.9; letter-spacing: 0.06em`},{part:`col-even`,label:`400 · 1.55 · 0`,css:`font-weight: 400; line-height: 1.55; letter-spacing: 0`},{part:`col-dark`,label:`600 · 1.25 · -0.015em`,css:`font-weight: 600; line-height: 1.25; letter-spacing: -0.015em`}];function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Viewing" data-part="segmented" data-value="read">
            <button class="sp-segment" data-part="seg-read" value="read">read</button>
            <button class="sp-segment" data-part="seg-squint" value="squint">squint</button>
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="view" data-mode="read"
             style="gap: 14px; align-items: flex-start; height: ${i}px; margin-top: 12px; overflow: hidden">
          ${o.map(({part:e,label:t,css:r})=>{let i=e!==`col-even`;return`
      <div class="sp-stack${i?` sp-context`:``}" style="gap: 4px; width: ${a}px">
        <span style="font-size: 10px; color: var(--sp-muted); white-space: nowrap">${t}</span>
        <p data-part="${e}"${i?``:` data-subject`}
           style="margin: 0; font-size: 8px; ${r}; transition: filter 0.3s ease">${n}</p>
      </div>`}).join(``)}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 6px">
          Same words, same size, three settings. Squinting is how the property is judged, because the grey
          value is not visible while you are still reading.
        </p>
      </div>
    </div>
  `;let c=e(s,`view`),l=o.flatMap(({part:e})=>t(s,e));e(s,`segmented`).addEventListener(`change`,e=>{let t=e.detail;if(t===`read`||t===`squint`){c.dataset.mode=t;for(let e of l)e.style.filter=t===`squint`?`blur(${r}px)`:`none`}})}export{s as mount};