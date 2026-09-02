import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={plenty:24,low:3,out:0},n={plenty:``,low:`Only 3 left in size M`,out:`Sold out in size M`},r={plenty:`Add to bag`,low:`Add to bag`,out:`Sold out`},i={plenty:`24 in the warehouse, so there is nothing to report and the line stays away.`,low:`The line prints the number inventory holds, scoped to the size being bought.`,out:`At zero it says so. A count that never reaches sold out was never counting.`};function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Kestrel Supply</span>
          <span class="sp-label" style="font-size: 11px">Bag (0)</span>
        </div>
        <div class="sp-body sp-row" style="align-items: stretch; gap: 12px">

          <div class="sp-context" style="display: flex; flex-direction: column; gap: 8px; flex: 0 0 auto; width: 118px">
            <div class="sp-swatch sp-grow" style="--sp-swatch: var(--sp-sunken); border: 1px solid var(--sp-line)"></div>
            <div class="sp-row sp-row--between" style="height: 16px">
              <span class="sp-label" style="font-size: 11px">Warehouse</span>
              <span class="sp-text sp-text--ink" data-part="inventory" data-count="3" style="font-size: 11px; font-variant-numeric: tabular-nums">3</span>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto; min-width: 0">
            <div class="sp-context" style="display: flex; flex-direction: column; gap: 2px">
              <span class="sp-heading" style="font-size: 14px">Cotton overshirt</span>
              <span class="sp-text" style="font-size: 12px">Ecru, size M &middot; 78.00</span>
            </div>
            <span class="sp-divider sp-context"></span>
            <div style="display: flex; flex-direction: column; justify-content: flex-end; gap: 8px; flex: 1 1 auto; min-height: 0">
              <span
                class="sp-row"
                data-part="stock-line"
                data-subject
                data-level="low"
                role="status"
                style="gap: 6px; height: 18px; font-size: 12px; font-weight: 500; color: var(--sp-warn)"
              >
                <span data-part="stock-dot" style="width: 7px; height: 7px; border-radius: 50%; background: currentcolor"></span>
                <span data-part="stock-text">${n.low}</span>
              </span>
              <button class="sp-button sp-context" data-part="buy" type="button" style="width: 100%">${r.low}</button>
            </div>
          </div>

        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="width: 262px; font-size: 11px">${i.low}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Stock" data-part="level" data-value="low">
          <button class="sp-segment" data-part="level-plenty" value="plenty">24 left</button>
          <button class="sp-segment" data-part="level-low" value="low">3 left</button>
          <button class="sp-segment" data-part="level-out" value="out">0 left</button>
        </sp-segmented>
      
    </div>
  `;let o=e(a,`stock-line`),s=e(a,`stock-text`),c=e(a,`stock-dot`),l=e(a,`inventory`),u=e(a,`buy`),d=e(a,`verdict`),f=e=>{o.dataset.level=e,s.textContent=n[e],o.style.visibility=e===`plenty`?`hidden`:`visible`,o.style.color=e===`out`?`var(--sp-muted)`:`var(--sp-warn)`,c.style.visibility=e===`out`?`hidden`:``,l.textContent=String(t[e]),l.dataset.count=String(t[e]),u.textContent=r[e],u.setAttribute(`aria-disabled`,String(e===`out`)),d.textContent=i[e]};e(a,`level`).addEventListener(`change`,e=>{let t=e.detail;f(t===`plenty`?`plenty`:t===`out`?`out`:`low`)}),f(`low`)}export{a as mount};