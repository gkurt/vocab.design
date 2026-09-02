import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[14,27,6,19],n=12,r=`display: inline-flex; align-items: center; gap: 6px; cursor: default`,i=e=>`<span style="width: 6px; height: 6px; border-radius: 50%; background: ${e}"></span>`,a={fake:`Refresh the page and the crowd changes size. Nothing was counted, so nothing can run out.`,fair:`A count read from inventory holds still, names its unit, and can reach zero.`};function o(e,t){return e===`fair`?`
      <span class="sp-chip" data-part="stock" style="${r}">${i(`var(--sp-accent)`)}${n} rooms left for these dates</span>
      <span class="sp-chip" style="${r}">Free cancellation until 28 May</span>`:`
    <span class="sp-chip" data-part="only-two" style="${r}; border-color: var(--sp-warn); color: var(--sp-warn)">
      ${i(`var(--sp-warn)`)}Only 2 left at this price
    </span>
    <span class="sp-chip" data-part="viewers" style="${r}">${i(`var(--sp-warn)`)}${t} people are viewing this now</span>
    <span class="sp-chip" style="${r}">Booked 6 times in the last hour</span>`}function s(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Stays in Lisbon</span>
          <span class="sp-label" data-part="refresh-count" style="font-size: 11px">Refreshes: 0</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="refresh" type="button">Refresh</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-context" style="padding: 8px 10px">
            <div class="sp-row sp-row--between">
              <span class="sp-text sp-text--ink">Casa Amarela, Alfama</span><span class="sp-text">128.00 a night</span>
            </div>
            <div class="sp-text" style="margin-top: 2px; font-size: 12px">Double room, 2 nights, breakfast included</div>
          </div>
          <div
            class="sp-row sp-row--wrap"
            data-part="chips"
            data-subject
            data-pose="[data-mode=fake]"
            data-mode="fake"
            data-count="${t[0]}"
            data-refreshes="0"
            style="align-content: flex-start; gap: 6px; height: 66px; padding: 8px 10px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >${o(`fake`,t[0])}</div>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="width: 292px; font-size: 11px">${a.fake}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="fake" data-axis="Fake scarcity" data-term="fake">
          <button class="sp-segment" data-part="mode-fake" value="fake">With</button>
          <button class="sp-segment" data-part="mode-fair" value="fair">Without</button>
        </sp-segmented>
      
    </div>
  `;let i=e(r,`chips`),s=e(r,`verdict`),c=e(r,`refresh-count`),l=0,u=e=>{let r=t[l%t.length];i.dataset.mode=e,i.innerHTML=o(e,r),i.dataset.count=String(e===`fake`?r:n),s.textContent=a[e]};e(r,`refresh`).addEventListener(`click`,()=>{let e=Number(i.dataset.refreshes??0)+1;i.dataset.refreshes=String(e),c.textContent=`Refreshes: ${e}`,l+=1,u(i.dataset.mode===`fair`?`fair`:`fake`)}),e(r,`mode`).addEventListener(`change`,e=>{u(e.detail===`fair`?`fair`:`fake`)})}export{s as mount};