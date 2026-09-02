import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=76,i=216,a=[{id:`4192`,place:`Falmouth`,status:`Packing`,total:`£86.00`,carrier:`Depot pickup`,tracking:`not yet issued`,note:`Two of four items picked, waiting on the third pallet.`},{id:`4193`,place:`Kirkwall`,status:`Dispatched`,total:`£240.00`,carrier:`Northwind Freight`,tracking:`NW 88213 QT`,note:`Left the depot at 06:40, two stops remaining before yours.`},{id:`4194`,place:`Whitby`,status:`Delivered`,total:`£54.50`,carrier:`Coastal Courier`,tracking:`CC 40119 BB`,note:`Signed for by A. Marceau at 11:12 on Thursday.`}],o=`border-bottom: 1px solid var(--sp-line)`;function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 460px; height: 284px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Orders, this week</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="collapse" style="padding: 3px 9px; font-size: 12px">Collapse</button>
        </div>

        <div class="sp-body">
          <div class="sp-surface" style="height: ${i}px; overflow: hidden">
            <table class="sp-table" data-part="table" aria-label="Orders">
              <thead class="sp-context">
                <tr>
                  <th style="width: 34px; ${o}"></th>
                  <th style="${o}">Order</th>
                  <th style="width: 120px; ${o}">Destination</th>
                  <th style="width: 110px; ${o}">Status</th>
                  <th style="width: 92px; text-align: right; ${o}">Total</th>
                </tr>
              </thead>
              ${a.map(e=>`
      <tbody data-part="row-${e.id}" ${e.id===`4193`?`data-subject`:``}>
        <tr data-part="summary-${e.id}">
          <td style="width: 34px; padding: 4px 2px 4px 8px; ${o}">
            <button
              class="sp-icon-button"
              type="button"
              data-part="toggle-${e.id}"
              aria-expanded="false"
              aria-controls="vd-row-${e.id}"
              aria-label="Show detail for order ${e.id}"
              style="width: 22px; height: 22px"
            >${n(`chevronRight`,`sp-icon--chevron`)}</button>
          </td>
          <td style="${o}">Order ${e.id}</td>
          <td class="sp-text" style="width: 120px; ${o}">${e.place}</td>
          <td class="sp-text" style="width: 110px; ${o}">${e.status}</td>
          <td style="width: 92px; text-align: right; ${o}">${e.total}</td>
        </tr>
        <tr>
          <td colspan="5" style="padding: 0; border-bottom: 0">
            <div
              data-part="drawer-${e.id}"
              id="vd-row-${e.id}"
              role="region"
              aria-label="Order ${e.id} detail"
              style="height: 0; overflow: hidden; transition: height 0.24s var(--sp-ease)"
            >
              <div
                data-part="detail-${e.id}"
                style="display: flex; flex-direction: column; gap: 7px; height: ${r}px; padding: 10px 12px;
                       background: var(--sp-sunken); border-bottom: 1px solid var(--sp-line)"
              >
                <div class="sp-row" style="gap: 22px">
                  <span class="sp-stack" style="gap: 1px"><span class="sp-label" style="font-size: 10px">Carrier</span><span style="font-size: 12px">${e.carrier}</span></span>
                  <span class="sp-stack" style="gap: 1px"><span class="sp-label" style="font-size: 10px">Tracking</span><span style="font-size: 12px">${e.tracking}</span></span>
                </div>
                <span class="sp-text" style="font-size: 12px">${e.note}</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>`).join(``)}
            </table>
          </div>
        </div>
      </div>
    </div>
  `;let c=n=>{for(let i of a){let a=i.id===n,o=e(s,`row-${i.id}`),c=e(s,`toggle-${i.id}`);t(o,`data-open`,a),c.setAttribute(`aria-expanded`,String(a)),c.setAttribute(`aria-label`,`${a?`Hide`:`Show`} detail for order ${i.id}`),e(s,`drawer-${i.id}`).style.height=a?`${r}px`:`0`,e(s,`summary-${i.id}`).toggleAttribute(`data-selected`,a)}};for(let t of a)e(s,`toggle-${t.id}`).addEventListener(`click`,()=>c(t.id));e(s,`collapse`).addEventListener(`click`,()=>c(void 0)),c(void 0)}export{s as mount};