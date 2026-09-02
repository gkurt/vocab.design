import{n as e}from"./parts.C-YLuC7Q.js";import{n as t}from"./measure.DK7AY2_i.js";var n=178,r=330,i=268,a=[`Harbour notice`,`Pilot rotation`,`Dredging window`,`Berth allocations`,`Fuel bunkering`,`Winter closures`];function o(o){o.innerHTML=`
    <div class="sp-app">
      <div style="position: relative; width: ${r}px; height: ${i}px; border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden">
        <div
          class="sp-scroll sp-context"
          data-part="page"
          style="width: 100%; height: 100%; padding: 12px; background: linear-gradient(to bottom, var(--sp-surface) 0 ${n}px, var(--sp-bg) ${n}px 100%)"
        >
          ${a.map((e,t)=>`
      <div class="sp-stack" data-part="block-${t}" style="width: 200px; margin-bottom: 14px">
        <span class="sp-heading">${e}</span>
        <div class="sp-line" style="width: 92%"></div>
        <div class="sp-line" style="width: 76%"></div>
      </div>`).join(``)}
        </div>
        <span class="sp-label sp-context" style="position: absolute; top: 156px; right: 10px; pointer-events: none">above the fold</span>
        <span class="sp-label sp-context" style="position: absolute; top: 188px; right: 10px; pointer-events: none">below the fold</span>
        <div
          data-part="fold"
          data-subject
          style="position: absolute; top: ${n}px; left: 0; right: 0; height: 3px; pointer-events: none; background: repeating-linear-gradient(to right, var(--sp-accent) 0 7px, transparent 7px 14px)"
        ></div>
      </div>
      <div class="sp-row sp-context" style="height: 18px">
        <span class="sp-text" data-part="readout" style="font-variant-numeric: tabular-nums"></span>
      </div>
    </div>
  `;let s=e(o,`page`),c=e(o,`readout`),l=a.map((t,n)=>e(o,`block-${n}`)),u=()=>{let e=0,r=0;for(let i of l){let a=t(i,s),o=a.top+a.height<=n?`above`:a.top>=n?`below`:`cut`;i.dataset.side=o,o===`above`&&e++,o===`cut`&&r++}c.textContent=`${e} above the fold · ${r} cut by it · ${l.length-e-r} below`};s.addEventListener(`scroll`,u),u()}export{o as mount};