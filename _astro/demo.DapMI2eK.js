import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=12,r=8,i=4,a=`display: grid; grid-template-columns: repeat(${n}, 1fr); gap: ${r}px`,o={halves:{spans:[6,6],names:[`one half`,`one half`]},thirds:{spans:[4,4,4],names:[`one third`,`one third`,`one third`]},quarters:{spans:[3,3,3,3],names:[`one quarter`,`one quarter`,`one quarter`,`one quarter`]},split:{spans:[8,4],names:[`two thirds`,`one third`]}};function s(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Split</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Spans" data-part="switcher" data-value="halves">
            <button class="sp-segment" type="button" data-part="seg-halves" value="halves">6+6</button>
            <button class="sp-segment" type="button" data-part="seg-thirds" value="thirds">4+4+4</button>
            <button class="sp-segment" type="button" data-part="seg-quarters" value="quarters">3+3+3+3</button>
            <button class="sp-segment" type="button" data-part="seg-split" value="split">8+4</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 12px 16px">
          <div
            data-part="region"
            data-subject
            data-division="halves"
            style="width: 424px; padding: 12px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div data-part="ruler" style="${a}">${Array.from({length:n},(e,t)=>`
      <div style="display: flex; align-items: center; justify-content: center; height: 20px; border-radius: 3px; background: var(--sp-accent-soft)">
        <span class="sp-label" style="font-size: 10px; color: var(--sp-accent)">${t+1}</span>
      </div>`).join(``)}</div>
            <div data-part="blocks" style="${a}; grid-auto-rows: 106px; margin-top: 10px">${Array.from({length:i},(e,t)=>`
      <div
        class="sp-surface"
        data-part="block-${t}"
        data-span="0"
        hidden
        style="display: flex; flex-direction: column; justify-content: center; gap: 6px; min-width: 0; padding: 10px; background: var(--sp-sunken)"
      >
        <span class="sp-heading" data-part="span-${t}" style="font-size: 15px"></span>
        <span class="sp-label" data-part="name-${t}" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"></span>
      </div>`).join(``)}</div>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(r,`region`),c=Array.from({length:i},(t,n)=>({box:e(r,`block-${n}`),span:e(r,`span-${n}`),name:e(r,`name-${n}`)})),l=e=>{let n=o[e];n&&(s.dataset.division=e,c.forEach((e,r)=>{let i=n.spans[r]??0,a=n.names[r]??``;e.box.dataset.span=String(i),t(e.box,`hidden`,i===0),i>0&&(e.box.style.gridColumn=`span ${i}`),e.span.textContent=`span ${i}`,e.name.textContent=a}))};e(r,`switcher`).addEventListener(`change`,e=>l(e.detail)),l(`halves`)}export{s as mount};