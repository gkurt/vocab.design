import{n as e,t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={comfortable:`10px 12px`,cozy:`6px 12px`,compact:`3px 10px`},r=[{key:1,symbol:`ARLO`,side:`Buy`,qty:`1,200`,price:`18.40`},{key:2,symbol:`BNTX`,side:`Sell`,qty:`340`,price:`96.15`},{key:3,symbol:`CRWV`,side:`Buy`,qty:`80`,price:`212.00`},{key:4,symbol:`DKNG`,side:`Buy`,qty:`2,500`,price:`41.72`},{key:5,symbol:`EQIX`,side:`Sell`,qty:`15`,price:`804.30`},{key:6,symbol:`FTNT`,side:`Buy`,qty:`640`,price:`73.90`},{key:7,symbol:`GTLB`,side:`Sell`,qty:`910`,price:`52.18`},{key:8,symbol:`HUBS`,side:`Buy`,qty:`120`,price:`588.05`}];function i(i){let a=r.map(e=>`
      <tr data-part="row-${e.key}">
        <td style="width: 92px">${e.symbol}</td>
        <td class="sp-text" style="width: 72px">${e.side}</td>
        <td style="width: 96px; text-align: right">${e.qty}</td>
        <td style="text-align: right">${e.price}</td>
      </tr>`).join(``);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 284px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Fills</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Density" data-value="comfortable">
            <button class="sp-segment" type="button" data-part="seg-comfortable" value="comfortable">Comfortable</button>
            <button class="sp-segment" type="button" data-part="seg-cozy" value="cozy">Cozy</button>
            <button class="sp-segment" type="button" data-part="seg-compact" value="compact">Compact</button>
          </sp-segmented>
        </div>
        <div class="sp-body">
          <div
            class="sp-surface"
            data-part="region"
            data-subject
            data-density="comfortable"
            style="height: 172px; overflow: hidden; --sp-cell-pad: ${n.comfortable}"
          >
            <table class="sp-table" aria-label="Filled orders">
              <thead>
                <tr>
                  <th style="width: 92px">Symbol</th>
                  <th style="width: 72px">Side</th>
                  <th style="width: 96px; text-align: right">Qty</th>
                  <th style="text-align: right">Price</th>
                </tr>
              </thead>
              <tbody>${a}</tbody>
            </table>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="fit" style="width: 140px"></span>
        </div>
      </div>
    </div>
  `;let o=e(i,`region`),s=e(i,`fit`),c=r.map(t=>e(i,`row-${t.key}`)),l=()=>{let e=o.getBoundingClientRect().bottom,n=0;for(let r of c){let i=r.getBoundingClientRect().bottom>e+.5;t(r,`data-clipped`,i),i||n++}s.textContent=`${n} of ${r.length} rows fit`};e(i,`switcher`).addEventListener(`change`,e=>{let t=e.detail,r=n[t];r&&(o.dataset.density=t,o.style.setProperty(`--sp-cell-pad`,r),l())}),l()}export{i as mount};