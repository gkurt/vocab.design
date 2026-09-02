import{n as e,r as t,t as n}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var r={off:{line:`1.25`,letter:`normal`,word:`normal`,para:`0.4em`,readout:`None`,caption:`Both blocks hold the same words at the spacing the page shipped with.`},applied:{line:`1.5`,letter:`0.12em`,word:`0.16em`,para:`2em`,readout:`line 1.5, letter 0.12, word 0.16, paragraph 2`,caption:`The tolerant block grows to fit. The fixed-height card beside it clips its last line: the mistake.`}},i=[`Tide heights are metres above chart datum.`],a=`Spring tides run through Thursday.`;function o(e){return`
    ${i.map(t=>`<p class="sp-text" data-part="${e}-para" style="margin: 0; font-size: 12px">${t}</p>`).join(``)}
    <p class="sp-text sp-text--ink" data-part="${e===`prose`?`tail`:`twin-tail`}" style="margin: 0; font-size: 12px">${a}</p>`}function s(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 464px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Reader’s spacing" data-part="segmented" data-value="off">
            <button class="sp-segment" data-part="seg-off" value="off">Page default</button>
            <button class="sp-segment" data-part="seg-applied" value="applied">1.4.12 values</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 12px; gap: 12px; height: 132px; align-items: flex-start">
          <div class="sp-surface" data-part="prose" data-subject data-spacing="off"
               style="width: 208px; padding: 10px 12px; line-height: 1.25">${o(`prose`)}</div>
          <div class="sp-surface sp-context" data-part="twin"
               style="width: 208px; height: 100px; padding: 10px 12px; line-height: 1.25; overflow: hidden">${o(`twin`)}</div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px; height: 18px">
          <span class="sp-label">Overrides applied</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-state="off"
                style="font-size: 12px; white-space: nowrap">${r.off.readout}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="off"
           style="margin: 6px 0 0; height: 30px; font-size: 11px">${r.off.caption}</p>
      </div>
    </div>
  `;let a=e(i,`prose`),s=e(i,`twin`),c=e(i,`readout`),l=e(i,`caption`),u=[[...t(i,`prose-para`),e(i,`tail`)],[...t(i,`twin-para`),e(i,`twin-tail`)]],d=e=>{let t=r[e];a.dataset.spacing=e;for(let e of[a,s])e.style.lineHeight=t.line,e.style.letterSpacing=t.letter,e.style.wordSpacing=t.word;for(let e of u)for(let[n,r]of e.entries())r.style.marginTop=n===0?`0`:t.para;n(s,`data-clipped`,e===`applied`),c.dataset.state=e,c.textContent=t.readout,l.dataset.case=e,l.textContent=t.caption};d(`off`),e(i,`segmented`).addEventListener(`change`,e=>{d(e.detail===`applied`?`applied`:`off`)})}export{s as mount};