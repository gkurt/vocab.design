import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={day:{label:`Today, hour by hour`,bars:[30,46,38,62,54,70,44,58]},week:{label:`This week, by day`,bars:[52,38,64,48,72,34,58,66]},month:{label:`This month, by week`,bars:[40,68,50,74,36,60,46,56]}};function n(n){let r=e=>e.map(e=>`<span style="flex: 1; height: ${e}px; border-radius: 3px 3px 0 0; background: var(--sp-line)"></span>`).join(``);n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 340px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Revenue</span>
          <span class="sp-text" data-part="readout">${t.week?.label}</span>
        </div>
        <sp-segmented class="sp-segmented" data-part="segmented" data-subject data-axis="Range" data-value="week" style="margin-top: 12px; width: 100%">
          <button class="sp-segment sp-grow" data-part="seg-day" value="day">Day</button>
          <button class="sp-segment sp-grow" data-part="seg-week" value="week">Week</button>
          <button class="sp-segment sp-grow" data-part="seg-month" value="month">Month</button>
        </sp-segmented>
        <div class="sp-row sp-context" data-part="chart" style="align-items: flex-end; gap: 6px; height: 76px; margin-top: 14px">
          ${r(t.week?.bars??[])}
        </div>
      </div>
    </div>
  `;let i=e(n,`chart`),a=e(n,`readout`);e(n,`segmented`).addEventListener(`change`,e=>{let n=t[e.detail];n&&(i.innerHTML=r(n.bars),a.textContent=n.label)})}export{n as mount};