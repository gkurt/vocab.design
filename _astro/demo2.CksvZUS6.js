import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{label:`Revenue`,span:[4,2],lines:2},{label:`Active`,span:[2,2],lines:1},{label:`Churn`,span:[3,1],lines:0},{label:`Signups`,span:[3,1],lines:0},{label:`Regions`,span:[2,1],lines:0},{label:`Latency`,span:[4,1],lines:0}],n=[2,2];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 400px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Overview</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="bento" data-axis="Layout">
            <button class="sp-segment" data-part="seg-bento" value="bento">Bento</button>
            <button class="sp-segment" data-part="seg-uniform" value="uniform">Uniform</button>
          </sp-segmented>
        </div>
        <div class="sp-grid" data-part="grid" data-subject data-mode="bento"
             style="margin-top: 14px; grid-template-columns: repeat(6, 1fr); grid-template-rows: repeat(4, 44px)">
          ${t.map((e,t)=>`
      <div class="sp-surface" data-part="cell-${t+1}" style="padding: 8px 10px; overflow: hidden">
        <span class="sp-label">${e.label}</span>
        ${Array.from({length:e.lines},()=>`<div class="sp-line" style="margin-top: 8px; width: 70%"></div>`).join(``)}
      </div>`).join(``)}
        </div>
      </div>
    </div>
  `;let i=e(r,`grid`),a=t.map((t,n)=>e(r,`cell-${n+1}`)),o=e=>{i.dataset.mode=e,a.forEach((r,i)=>{let[a,o]=e===`bento`?t[i]?.span??n:n;r.style.gridColumn=`span ${a}`,r.style.gridRow=`span ${o}`})};o(`bento`),e(r,`segmented`).addEventListener(`change`,e=>o(e.detail))}export{r as mount};