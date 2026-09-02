import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[[`Owner`,`Rosa Marin`],[`Created`,`4 April 2025`],[`Status`,`In review`],[`Size`,`18.4 MB`]],n=([e,t],n)=>`
  <div
    class="sp-row"
    data-part="pair-${n}"
    style="gap: 10px; padding: 7px 0; ${n===0?``:`border-top: 1px solid var(--sp-line);`}"
  >
    <dt class="sp-label" data-part="term-${n}" style="width: 82px; flex: 0 0 auto">${e}</dt>
    <dd class="sp-text sp-text--ink" style="margin: 0">${t}</dd>
  </div>`,r=([e,t])=>`<tr><td>${e}</td><td>${t}</td></tr>`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Harbour survey.pdf</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="layout" data-axis="Layout" data-value="rows">
            <button class="sp-segment" data-part="seg-rows" value="rows">Rows</button>
            <button class="sp-segment" data-part="seg-stacked" value="stacked">Stacked</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px; padding: 12px">
          <div class="sp-surface" style="flex: 1 1 0; padding: 4px 12px 10px">
            <dl data-part="list" data-subject data-layout="rows" style="margin: 0">
              ${t.map(n).join(``)}
            </dl>
          </div>
          <div class="sp-stack sp-context" style="flex: 1 1 0; gap: 6px; min-width: 0">
            <div class="sp-surface" style="overflow: hidden">
              <table class="sp-table" data-part="table" style="--sp-cell-pad: 5px 10px">
                <thead><tr><th>Field</th><th>Value</th></tr></thead>
                <tbody>${t.map(r).join(``)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(i,`list`),o=t.map((t,n)=>e(i,`pair-${n}`)),s=t.map((t,n)=>e(i,`term-${n}`)),c=e=>{let t=e===`stacked`;a.dataset.layout=t?`stacked`:`rows`;for(let e of o)e.style.flexDirection=t?`column`:`row`,e.style.alignItems=t?`flex-start`:`center`,e.style.gap=t?`2px`:`10px`;for(let e of s)e.style.width=t?`auto`:`82px`};e(i,`layout`).addEventListener(`change`,e=>c(e.detail)),c(`rows`)}export{i as mount};