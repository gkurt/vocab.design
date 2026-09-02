import{n as e}from"./parts.C-YLuC7Q.js";var t=[`Revenue`,`Refunds`,`Fees`,`Net`],n={a:[`8,412.05`,`1,970.36`,`6,033.18`,`9,258.47`],b:[`3,187.90`,`4,506.11`,`2,749.63`,`8,011.24`],c:[`5,620.38`,`7,193.05`,`1,408.77`,`3,865.92`]},r=[`a`,`b`,`c`],i=1400,a=e=>t.map((t,r)=>`<span data-part="${e}-${r}" style="text-align: right; font-size: 13px">${n.a?.[r]??``}</span>`).join(``);function o(o,s){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 360px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Ledger</span>
          <span class="sp-label">live</span>
        </div>
        <div class="sp-row" style="align-items: flex-start; gap: 16px; margin-top: 14px">
          <div class="sp-stack sp-context" style="gap: 6px; width: 74px">
            <span class="sp-label">&nbsp;</span>
            ${t.map(e=>`<span class="sp-text sp-text--ink">${e}</span>`).join(``)}
          </div>
          <div class="sp-stack sp-context" style="gap: 6px; width: 90px">
            <span class="sp-label" style="text-align: right">proportional</span>
            <div class="sp-stack" data-part="col-prop" data-frame="a"
                 style="gap: 6px; font-variant-numeric: proportional-nums">
              ${a(`prop`)}
            </div>
          </div>
          <div class="sp-stack" style="gap: 6px; width: 90px">
            <span class="sp-label sp-context" style="text-align: right">tabular</span>
            <div class="sp-stack" data-part="col-tab" data-subject data-frame="a"
                 style="gap: 6px; font-variant-numeric: tabular-nums">
              ${a(`tab`)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(o,`col-prop`),l=e(o,`col-tab`),u=t.map((t,n)=>[e(o,`prop-${n}`),e(o,`tab-${n}`)]),d=0,f=()=>{d=(d+1)%r.length;let e=r[d]??`a`,t=n[e]??n.a;u.forEach(([e,n],r)=>{let i=t?.[r]??``;e.textContent=i,n.textContent=i}),c.dataset.frame=e,l.dataset.frame=e,s.setTimeout(f,i)};s.setTimeout(f,i)}export{o as mount};