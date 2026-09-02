import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=12,n=[`Display`,`Title`,`Body`,`Caption`],r={"1.2":1.2,"1.333":1.333,"1.5":1.5},i=(e,r)=>t*e**(n.length-1-r);function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Type scale</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Ratio" data-part="segmented" data-value="1.2">
            <button class="sp-segment" data-part="seg-120" value="1.2">1.2</button>
            <button class="sp-segment" data-part="seg-133" value="1.333">1.333</button>
            <button class="sp-segment" data-part="seg-150" value="1.5">1.5</button>
          </sp-segmented>
        </div>
        <div class="sp-stack" data-part="scale" data-subject data-ratio="1.2"
             style="gap: 10px; height: 150px; margin-top: 14px; overflow: hidden">
          ${n.map((e,t)=>`
      <div data-part="step-${t}" style="display: grid; grid-template-columns: 1fr 58px; align-items: baseline; column-gap: 10px">
        <span data-part="sample-${t}" style="font-weight: 600; line-height: 1.12">${e}</span>
        <span class="sp-label" data-part="readout-${t}" style="text-align: right">0px</span>
      </div>`).join(``)}
        </div>
        <p class="sp-text sp-context" data-part="formula" style="margin-top: 10px">12px base</p>
      </div>
    </div>
  `;let o=e(a,`scale`),s=e(a,`formula`),c=n.map((t,n)=>e(a,`sample-${n}`)),l=n.map((t,n)=>e(a,`readout-${n}`)),u=e=>{let a=r[e];a&&(o.dataset.ratio=e,n.forEach((e,t)=>{let n=i(a,t).toFixed(1);c[t]?.style.setProperty(`font-size`,`${n}px`);let r=l[t];r&&(r.textContent=`${n}px`)}),s.textContent=`${t}px base, ratio ${e}, four steps`)};u(`1.2`),e(a,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{a as mount};