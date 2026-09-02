import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[6,7,8,9,10,11,12,13,14,15,16,17],n={kept:{count:`18`,caption:`day streak`,status:`Kept every day since 28 February`,last:`kept`,freezes:`2 freezes left`,note:`Eighteen consecutive days, and the number is the whole reward. It costs nothing to build and everything to lose, which is what makes it work.`},missed:{count:`0`,caption:`day streak`,status:`Missed 17 March, so the count starts again`,last:`missed`,freezes:`2 freezes left`,note:`One missed square and the count is zero. Nothing else changed: the same practice, the same eighteen days behind it, and a counter that now says none of them happened.`},frozen:{count:`18`,caption:`day streak`,status:`A freeze absorbed 17 March`,last:`frozen`,freezes:`1 freeze left`,note:`A freeze absorbs the miss and the count holds. Given away, that is mercy. Sold, it is a fee for relief from a loss the mechanic invented.`}},r=`kept`,i={kept:``,missed:`box-shadow: inset 0 0 0 2px var(--sp-warn); color: var(--sp-warn)`,frozen:`border: 2px dashed var(--sp-accent); color: var(--sp-accent)`};function a(a){let o=n[r],s=t.map((e,n)=>{let r=n===t.length-1,a=r?`day-last`:`day-${e}`,s=r?o.last:`kept`;return`<span
        class="sp-day"
        data-part="${a}"
        data-state="${s}"
        ${s===`kept`?`data-selected`:``}
        style="cursor: default; font-weight: 500; ${r?i[o.last]:``}"
      >${e}</span>`}).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 246px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Daily practice</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="History" data-part="state" data-value="${r}">
            <button class="sp-segment" type="button" data-part="state-kept" value="kept" style="padding: 5px 9px; font-size: 12px">Kept</button>
            <button class="sp-segment" type="button" data-part="state-missed" value="missed" style="padding: 5px 9px; font-size: 12px">Missed a day</button>
            <button class="sp-segment" type="button" data-part="state-frozen" value="frozen" style="padding: 5px 9px; font-size: 12px">Freeze used</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <div class="sp-surface" style="padding: 14px 14px 16px">
            <div class="sp-row sp-row--between" style="align-items: flex-end">
              <span class="sp-row" data-part="count" data-subject data-mode="${r}" style="gap: 8px; align-items: baseline">
                <span
                  data-part="count-value"
                  style="min-width: 52px; font-size: 38px; font-weight: 600; line-height: 1; font-variant-numeric: tabular-nums"
                >${o.count}</span>
                <span class="sp-label" style="font-size: 12px">${o.caption}</span>
              </span>
              <span class="sp-label" data-part="freezes" style="width: 104px; text-align: right; font-size: 11px">${o.freezes}</span>
            </div>
            <div class="sp-row" data-part="strip" style="gap: 6px; margin-top: 14px">${s}</div>
            <div class="sp-row sp-row--between" style="height: 16px; margin-top: 10px">
              <span class="sp-label" style="font-size: 11px">6 to 17 March</span>
              <span class="sp-label" data-part="status" style="font-size: 11px; color: var(--sp-ink)">${o.status}</span>
            </div>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px">${o.note}</span>
    </div>
  `;let c=e(a,`count`),l=e(a,`count-value`),u=e(a,`day-last`),d=e(a,`status`),f=e(a,`freezes`),p=e(a,`note`),m=e=>{let t=n[e];t&&(c.dataset.mode=e,l.textContent=t.count,d.textContent=t.status,f.textContent=t.freezes,p.textContent=t.note,u.dataset.state=t.last,u.toggleAttribute(`data-selected`,t.last===`kept`),u.setAttribute(`style`,`cursor: default; font-weight: 500; ${i[t.last]}`))};e(a,`state`).addEventListener(`change`,e=>m(e.detail))}export{a as mount};