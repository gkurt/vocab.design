import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n=`The harbour master keeps a notebook of arrivals, and every entry is set down in the same unhurried hand, right down to the weather`,r=`outside.`,i=r.slice(0,-1),a=316,o=342,s={runt:{measure:a,note:`one word alone: "${i}", ${i.length} characters`},fixed:{measure:o,note:`a wider measure pulls it back up`}},c=22,l=94;function u(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Last line" data-term="runt" data-part="segmented" data-value="runt">
            <button class="sp-segment" data-part="seg-runt" value="runt">runt</button>
            <button class="sp-segment" data-part="seg-fixed" value="fixed">fixed</button>
          </sp-segmented>
        </div>
        <div style="width: ${o}px; height: ${l}px; margin-top: 10px">
          <p data-part="para" data-mode="runt"
             style="margin: 0; width: ${a}px; font-size: 14px; line-height: ${c}px; text-align: justify">${n}
            <span data-part="last" data-subject data-runt data-pose="[data-runt]">${r}</span></p>
        </div>
        <span class="sp-label" data-stage-verdict data-part="note" style="color: var(--sp-ink)"></span>
      </div>
    </div>
  `;let u=e(i,`para`),d=e(i,`last`),f=e(i,`note`),p=e=>{let n=s[e];n&&(u.dataset.mode=e,u.style.width=`${n.measure}px`,t(d,`data-runt`,e===`runt`),f.textContent=n.note)};p(`runt`),e(i,`segmented`).addEventListener(`change`,e=>p(e.detail))}export{u as mount};