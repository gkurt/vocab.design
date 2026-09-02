import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{index:1,text:`התמיכה ב-`,dir:`rtl`},{index:2,text:`CSS Grid`,dir:`ltr`},{index:3,text:` נוספה ב-`,dir:`rtl`},{index:4,text:`2017`,dir:`ltr`}],n={rtl:{dir:`rtl`,read:`direction: rtl`},ltr:{dir:`ltr`,read:`direction: ltr`}},r=e=>e in n,i=40;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 460px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Base direction" data-term="rtl" data-part="segmented" data-value="rtl">
            <button class="sp-segment" data-part="seg-rtl" value="rtl">dir="rtl"</button>
            <button class="sp-segment" data-part="seg-ltr" value="ltr">not declared</button>
          </sp-segmented>
        </div>
        <span class="sp-label sp-context" style="display: block; margin-top: 10px">Logical order</span>
        <div class="sp-row sp-row--wrap sp-context" data-part="memory" style="gap: 6px; margin-top: 4px">
          ${t.map(({index:e,text:t,dir:n})=>`
    <span class="sp-chip" data-part="chip-${e}" style="cursor: default; gap: 5px">
      <span style="color: var(--sp-muted); font-variant-numeric: tabular-nums">${e}</span>
      <span dir="${n}">${t}</span>
    </span>`).join(``)}
        </div>
        <div style="height: ${i}px; margin-top: 12px">
          <p data-part="sentence" dir="rtl" data-base="rtl"
             style="margin: 0; font-size: 21px; line-height: 1.4">${t.map(({index:e,text:t})=>`<span data-part="run-${e}"${e===2?` data-subject data-base="rtl" data-pose="[data-base=rtl]"`:``}>${t}</span>`).join(``)}</p>
        </div>
        <div class="sp-row sp-context" style="height: 30px">
          <span class="sp-chip" data-part="order" style="cursor: default; font-variant-numeric: tabular-nums"></span>
          <span class="sp-chip" data-part="readout" style="cursor: default">${n.rtl.read}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 6px">
          Four runs: two Hebrew, one Latin, one numeric. The characters never move, only the sequence they
          are drawn in, and the hyphen at each boundary has no direction of its own to argue with.
        </p>
      </div>
    </div>
  `;let o=e(a,`sentence`),s=e(a,`run-2`),c=e(a,`order`),l=e(a,`readout`),u=t.map(({index:t})=>[t,e(a,`run-${t}`)]),d=e=>{if(!r(e))return;o.dir=n[e].dir,o.dataset.base=e,s.dataset.base=e,l.textContent=n[e].read;let t=u.map(([e,t])=>[e,t.getBoundingClientRect().left]).sort((e,t)=>e[1]-t[1]).map(([e])=>e);c.dataset.seq=t.join(`-`),c.textContent=`left to right: ${t.join(` · `)}`};d(`rtl`),e(a,`segmented`).addEventListener(`change`,e=>d(e.detail))}export{a as mount};