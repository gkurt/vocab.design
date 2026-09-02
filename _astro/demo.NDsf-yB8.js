import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[`#2f6df0`,`#b154c8`,`#f2913d`],n={linear:`linear-gradient(100deg, ${t[0]}, ${t[1]} 52%, ${t[2]})`,radial:`radial-gradient(circle at 32% 30%, ${t[0]}, ${t[1]} 46%, ${t[2]})`,conic:`conic-gradient(from 200deg at 50% 50%, ${t[0]}, ${t[1]}, ${t[2]}, ${t[0]})`};function r(r){let i=t.map((e,t)=>`
      <span class="sp-chip">
        <span class="sp-swatch" style="width: 12px; height: 12px; --sp-swatch: ${e}"></span>${t===1?`52%`:`${t*50}%`} ${e}
      </span>`).join(``);r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 340px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Fill</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Type" data-part="segmented" data-value="linear">
            <button class="sp-segment" data-part="seg-linear" value="linear">Linear</button>
            <button class="sp-segment" data-part="seg-radial" value="radial">Radial</button>
            <button class="sp-segment" data-part="seg-conic" value="conic">Conic</button>
          </sp-segmented>
        </div>
        <div data-part="canvas" data-subject data-type="linear"
             style="height: 132px; margin-top: 14px; border-radius: var(--sp-radius); background: ${n.linear}"></div>
        <div class="sp-row sp-row--wrap sp-context" data-part="stops" style="margin-top: 12px">${i}</div>
      </div>
    </div>
  `;let a=e(r,`canvas`);e(r,`segmented`).addEventListener(`change`,e=>{let t=e.detail,r=n[t];r&&(a.dataset.type=t,a.style.background=r)})}export{r as mount};