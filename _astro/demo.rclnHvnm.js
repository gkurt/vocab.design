import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";import{n as t}from"./measure.DK7AY2_i.js";var n=[{key:`1`,order:`4821`,customer:`M. Okonkwo`,region:`North`,status:`Packing`,ship:`12 Mar`,items:`3`,total:`248.00`},{key:`2`,order:`4822`,customer:`D. Freeman`,region:`South`,status:`Shipped`,ship:`11 Mar`,items:`1`,total:`96.50`},{key:`3`,order:`4823`,customer:`A. Ni Bhraonain`,region:`West`,status:`Shipped`,ship:`11 Mar`,items:`6`,total:`412.00`},{key:`4`,order:`4824`,customer:`S. Petit`,region:`North`,status:`Delivered`,ship:`09 Mar`,items:`2`,total:`58.20`},{key:`5`,order:`4825`,customer:`R. Halvorsen`,region:`East`,status:`Packing`,ship:`13 Mar`,items:`4`,total:`187.75`},{key:`6`,order:`4826`,customer:`T. Abaza`,region:`South`,status:`Delivered`,ship:`08 Mar`,items:`2`,total:`64.00`}],r=[`none`,`zebra`,`hover`],i=`zebra`,a={none:`No row cue`,zebra:`Alternating fill`,hover:`Follows the pointer`},o={none:`Seven columns and nothing between the rows: the eye drifts a line somewhere in the middle.`,zebra:`Alternating fills give the eye a rail to follow from the first column to the last.`,hover:`A band that follows the pointer is stronger, but it only helps the row being asked about.`};function s(s){let c=(e,t=``)=>`<td style="border-bottom: 0; ${t}">${e}</td>`,l=`font-variant-numeric: tabular-nums`,u=n.map(e=>`
      <tr data-part="row-${e.key}">
        ${c(e.order,l)}
        ${c(e.customer)}
        ${c(e.region)}
        ${c(e.status)}
        ${c(e.ship,l)}
        ${c(e.items,`text-align: right; ${l}`)}
        ${c(e.total,`text-align: right; ${l}`)}
      </tr>`).join(``);s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 250px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Orders, seven columns</span>
          <span
            class="sp-label"
            data-part="cue"
            data-mode="${i}"
            role="status"
            style="width: 140px; text-align: right; font-size: 12px; white-space: nowrap"
          >${a[i]}</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 452px; overflow: hidden">
            <div data-part="rail" style="position: relative">
              <div
                data-part="stripes"
                data-subject
                data-mode="${i}"
                data-pose="[data-mode=zebra]"
                aria-hidden="true"
                style="position: absolute; left: 0; right: 0; top: 0; height: 0; pointer-events: none"
              >
                <div data-part="bands" style="position: absolute; inset: 0"></div>
              </div>

              <table
                class="sp-table sp-context"
                data-part="table"
                data-mode="${i}"
                style="position: relative; --sp-cell-pad: 4px 8px; font-size: 12px"
              >
                <thead>
    <tr>
      <th>Order</th><th>Customer</th><th>Region</th><th>Status</th>
      <th>Ship date</th><th style="text-align: right">Items</th><th style="text-align: right">Total</th>
    </tr></thead>
                <tbody>${u}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

              <sp-segmented data-stage-mode class="sp-segmented" data-part="picker" data-value="${i}" data-axis="Row shading" data-term="zebra">
          <button class="sp-segment" type="button" data-part="seg-none" value="none" style="padding: 4px 10px; font-size: 12px">Plain</button>
          <button class="sp-segment" type="button" data-part="seg-zebra" value="zebra" style="padding: 4px 10px; font-size: 12px">Zebra</button>
          <button class="sp-segment" type="button" data-part="seg-hover" value="hover" style="padding: 4px 10px; font-size: 12px">Hover band</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-stage-verdict data-part="note"
          data-mode="${i}"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        >${o[i]}</span>
      
    </div>
  `;let d=e(s,`rail`),f=e(s,`stripes`),p=e(s,`bands`),m=e(s,`table`),h=e(s,`cue`),g=e(s,`note`),_=n.map(n=>t(e(s,`row-${n.key}`),d)),v=_[0],y=_[_.length-1];v&&y&&(f.style.top=`${v.top.toFixed(1)}px`,f.style.height=`${(y.top+y.height-v.top).toFixed(1)}px`,p.innerHTML=_.map((e,t)=>t%2==1?`<div style="position: absolute; left: 0; right: 0; top: ${(e.top-v.top).toFixed(1)}px;
                        height: ${e.height.toFixed(1)}px; background: var(--sp-sunken)"></div>`:``).join(``));let b=e=>{r.includes(e)&&(f.dataset.mode=e,m.dataset.mode=e,e===`zebra`?p.removeAttribute(`hidden`):p.setAttribute(`hidden`,``),h.dataset.mode=e,h.textContent=a[e]??``,g.dataset.mode=e,g.textContent=o[e]??``)};e(s,`picker`).addEventListener(`change`,e=>b(e.detail)),b(i)}export{s as mount};