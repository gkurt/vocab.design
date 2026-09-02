import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={"card-revenue":[3,1],"card-orders":[3,1],"card-refunds":[3,1],"card-uptime":[3,1],"card-chart":[8,2],"card-list":[4,2]},n=[6,1],r={sized:`Area is the ranking: eight columns for the chart, three for a number.`,uniform:`Every tile one size. Nothing outranks anything, so nothing leads.`},i=[46,62,38,74,58,88,70,96],a=`display: flex; flex-direction: column; gap: 4px; padding: 6px 10px; min-width: 0; overflow: hidden`,o=(e,t,n)=>`
  <div class="sp-surface" data-part="${e}" style="${a}">
    <span class="sp-label">${t}</span>
    <span style="font-size: 16px; font-weight: 600; line-height: 1.1">${n}</span>
  </div>`,s=(e,t,n)=>`
  <div data-part="order-${e}" style="display: flex; flex: 0 0 auto; height: 16px; align-items: center; gap: 8px">
    <span class="sp-line" style="flex: 0 0 auto; width: ${t}px; height: 6px"></span>
    <span class="sp-label" style="margin-left: auto; font-size: 11px">${n}</span>
  </div>`;function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Store overview</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Tile size" data-value="sized">
            <button class="sp-segment" type="button" data-part="seg-sized" value="sized">by importance</button>
            <button class="sp-segment" type="button" data-part="seg-uniform" value="uniform">uniform</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px">
          <div
            class="sp-grid"
            data-part="grid"
            data-subject
            data-mode="sized"
            style="flex: 0 0 auto; width: 448px; grid-template-columns: repeat(12, 1fr); grid-template-rows: repeat(3, 56px)"
          >
            ${o(`card-revenue`,`Revenue`,`£84.2k`)}
            ${o(`card-orders`,`Orders`,`1,204`)}
            ${o(`card-refunds`,`Refunds`,`18`)}
            ${o(`card-uptime`,`Uptime`,`99.9%`)}
            <div class="sp-surface" data-part="card-chart" style="${a}">
              <span class="sp-label">Revenue by week</span>
              <div style="display: flex; flex: 1 1 auto; min-height: 0; align-items: flex-end; gap: 6px">
                ${i.map((e,t)=>`<span class="sp-swatch" style="flex: 1 1 0; height: ${e}%; border-radius: 3px; --sp-swatch: var(--sp-${t===i.length-1?`accent`:`accent-soft`})"></span>`).join(``)}
              </div>
            </div>
            <div class="sp-surface" data-part="card-list" style="${a}">
              <span class="sp-label">Recent orders</span>
              <div style="display: flex; flex: 1 1 auto; flex-direction: column; justify-content: space-between; gap: 10px; min-height: 0; overflow: hidden">
                ${s(1,52,`£62`)}
                ${s(2,40,`£18`)}
                ${s(3,60,`£145`)}
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 22px; max-width: 448px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let l=e(c,`grid`),u=e(c,`readout`),d=Object.keys(t).map(t=>[t,e(c,t)]),f=i=>{let a=r[i];if(a){l.dataset.mode=i;for(let[e,r]of d){let[a,o]=i===`sized`?t[e]??n:n;r.style.gridColumn=`span ${a}`,r.style.gridRow=`span ${o}`}for(let t of[2,3])e(c,`order-${t}`).style.display=i===`sized`?`flex`:`none`;u.textContent=a}};e(c,`switcher`).addEventListener(`change`,e=>f(e.detail)),f(`sized`)}export{c as mount};