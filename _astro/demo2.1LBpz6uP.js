import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{r as t}from"./measure.DK7AY2_i.js";var n=88,r=96,i=76,a=186,o=76,s=130,c=[84,172],l=[{order:`4821`,customer:`Marguerite Okonkwo`,status:`Packing`,total:`248.00`},{order:`4822`,customer:`Dale Freeman`,status:`Shipped`,total:`96.50`},{order:`4823`,customer:`Aoife Ni Bhraonain`,status:`Shipped`,total:`412.00`},{order:`4824`,customer:`Sam Petit`,status:`Delivered`,total:`58.20`}],u=`Marguerite Okonkwo`,d=22,f={fixed:`Fixed: the width someone chose is the width the column keeps, ellipsis and all.`,fit:`Fit to content: the column asks its widest cell how much room it actually needs.`,fill:`Fill: the column takes whatever room the other three columns left over.`},p=(e,t,n)=>Math.max(t,Math.min(n,e)),m=e=>e<118?`narrow`:e>158?`wide`:`medium`,h=`overflow: hidden; text-overflow: ellipsis`;function g(g){let _=`
    <tr>
      <th style="width: ${n}px">Order</th>
      <th data-part="th-customer" style="position: relative">Customer</th>
      <th data-part="th-status" style="width: ${r}px">Status</th>
      <th data-part="th-total" style="width: ${i}px; text-align: right">Total</th>
      <th data-part="th-filler" aria-hidden="true"></th>
    </tr>`,v=l.map(e=>`
      <tr>
        <td style="font-variant-numeric: tabular-nums">${e.order}</td>
        <td data-part="cell-${e.order}" style="${h}">${e.customer}</td>
        <td>${e.status}</td>
        <td style="text-align: right; font-variant-numeric: tabular-nums">${e.total}</td>
        <td></td>
      </tr>`).join(``),y=c.map(e=>`
      <span
        data-part="stop-${e}"
        aria-hidden="true"
        style="position: absolute; top: 4px; left: ${n+e}px; width: 6px; height: 6px; translate: -50% 0;
               pointer-events: none"
      ></span>`).join(``);g.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 229px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Orders</span>
          <span
            class="sp-label"
            data-part="readout"
            data-width="${s}"
            data-band="${m(s)}"
            role="status"
            style="width: 148px; text-align: right; font-size: 12px; font-variant-numeric: tabular-nums"
          >Customer ${s}px</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div class="sp-surface" style="width: 448px; overflow: hidden">
            <div data-part="boundary" style="position: relative">
              <table class="sp-table" data-part="table" data-mode="fixed" data-others="" style="table-layout: fixed">
                <colgroup>
                  <col style="width: ${n}px" />
                  <col data-part="col-customer" style="width: ${s}px" />
                  <col style="width: ${r}px" />
                  <col style="width: ${i}px" />
                  <col />
                </colgroup>
                <thead>${_}</thead>
                <tbody>${v}</tbody>
              </table>

              <span
                data-part="grip"
                data-subject
                role="separator"
                aria-label="Resize the Customer column"
                aria-orientation="vertical"
                style="position: absolute; top: 0; bottom: 0; left: 218px; width: 8px; translate: -50% 0;
                       display: flex; justify-content: center; cursor: col-resize; touch-action: none"
              ><span data-part="grip-bar" aria-hidden="true" style="width: 2px; height: 100%; background: var(--sp-line)"></span></span>

              ${y}

              <span
                data-part="probe"
                aria-hidden="true"
                style="position: absolute; top: 0; left: 0; visibility: hidden; white-space: nowrap; font-size: 13px"
              >${u}</span>
            </div>
          </div>
        </div>
      </div>

              <sp-segmented data-stage-mode class="sp-segmented" data-axis="Sizing" data-part="picker" data-value="fixed">
          <button class="sp-segment" type="button" data-part="seg-fixed" value="fixed" style="padding: 4px 10px; font-size: 12px">Fixed</button>
          <button class="sp-segment" type="button" data-part="seg-fit" value="fit" style="padding: 4px 10px; font-size: 12px">Fit content</button>
          <button class="sp-segment" type="button" data-part="seg-fill" value="fill" style="padding: 4px 10px; font-size: 12px">Fill</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-stage-verdict data-part="note"
          data-mode="fixed"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        >${f.fixed}</span>
      
    </div>
  `;let b=e(g,`boundary`),x=e(g,`table`),S=e(g,`col-customer`),C=e(g,`grip`),w=e(g,`grip-bar`),T=e(g,`readout`),E=e(g,`note`),D=e(g,`picker`),O=p(Math.round(e(g,`probe`).offsetWidth)+d,o,a),k=s,A=`fixed`,j=!1,M=t=>{k=Math.round(p(t,o,a)),S.style.width=`${k}px`,C.style.left=`${n+k}px`,T.dataset.width=String(k),T.dataset.band=m(k),T.textContent=`Customer ${k}px`;let r=[e(g,`th-status`),e(g,`th-total`)].map(e=>Math.round(e.offsetWidth)).join(`-`);x.dataset.others=r},N=e=>{A=e,x.dataset.mode=e,E.dataset.mode=e,E.textContent=f[e]??``,M(e===`fit`?O:e===`fill`?a:k)},P=()=>{A!==`fixed`&&(D.value=`fixed`)};C.addEventListener(`pointerdown`,e=>{j=!0,e.isTrusted&&C.setPointerCapture(e.pointerId),w.style.background=`var(--sp-accent)`,w.style.width=`3px`,P()}),C.addEventListener(`dblclick`,()=>{D.value=`fit`}),g.addEventListener(`pointermove`,e=>{j&&M(t(e,b).x-n)});let F=e=>{j&&(j=!1,w.style.background=`var(--sp-line)`,w.style.width=`2px`,M(t(e,b).x-n))};g.addEventListener(`pointerup`,F),g.addEventListener(`pointercancel`,F),D.addEventListener(`change`,e=>N(e.detail)),N(`fixed`)}export{g as mount};