import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`The harbour master keeps the ledger in a cupboard behind the counter, and every crossing since 1908 is written in it by hand, one line to a boat, in ink gone brown at the edges.`,n=`answer is always the same: the cupboard is locked, and the key is out on the water with the pilot until four.`,r=`The ledger was last opened in April, when a diver from Plymouth wanted the date of a wreck nobody could name.`,i=`One line of the paragraph is left at the foot of column one.`,a=`The paragraph is whole in column two, and column one ends a line early.`;function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 500px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Page 12</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="set" data-axis="Break rule">
            <button class="sp-segment" data-part="seg-set" value="set">As set</button>
            <button class="sp-segment" data-part="seg-keep" value="keep">Keep together</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 24px; align-items: flex-start; margin-top: 14px">
          <div data-part="col-1" style="flex: 1 1 0; height: 150px">
            <p class="sp-prose sp-context" data-part="lead" style="font-size: 12px; max-width: none; margin: 0">${t}</p>
            <p class="sp-prose" data-part="head" style="font-size: 12px; max-width: none; margin: 10px 0 0"><span
              data-part="orphan" data-subject>Visitors ask to see it, and the </span></p>
          </div>
          <div class="sp-context" data-part="col-2" style="flex: 1 1 0; height: 150px">
            <p class="sp-prose" data-part="carried" style="font-size: 12px; max-width: none; margin: 0">${n}</p>
            <p class="sp-prose" data-part="follow" style="font-size: 12px; max-width: none; margin: 10px 0 0">${r}</p>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="readout" style="margin-top: 12px; font-size: 12px"></p>
      </div>
    </div>
  `;let s=e(o,`head`),c=e(o,`carried`),l=e(o,`orphan`),u=e(o,`col-2`),d=e(o,`readout`),f=()=>{let e=l.getBoundingClientRect().left>=u.getBoundingClientRect().left-1;l.dataset.column=e?`2`:`1`,d.textContent=e?a:i};f(),e(o,`segmented`).addEventListener(`change`,e=>{let t=e.detail===`keep`;t?c.prepend(l):s.prepend(l),s.hidden=t,f()})}export{o as mount};