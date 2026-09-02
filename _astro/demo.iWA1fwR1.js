import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`ada`,client:`Ada Lovelace`,status:`Paid`,amount:1240},{key:`ivy`,client:`Ivy Chen`,status:`Overdue`,amount:4015},{key:`nils`,client:`Nils Berg`,status:`Pending`,amount:320},{key:`ravi`,client:`Ravi Patel`,status:`Paid`,amount:860}],r=e=>`$${e.toLocaleString(`en-US`)}.00`;function i(i){let a=n.map(e=>`
      <tr data-part="row-${e.key}">
        <td style="width: 36px">
          <button
            class="sp-checkbox"
            type="button"
            role="checkbox"
            aria-checked="false"
            data-part="check-${e.key}"
            aria-label="Select ${e.client}"
          ></button>
        </td>
        <td>${e.client}</td>
        <td class="sp-text">${e.status}</td>
        <td style="text-align: right">${r(e.amount)}</td>
      </tr>`).join(``),o=(e,t,n,r)=>`
    <th data-part="col-${e}" aria-sort="none" style="width: ${n}px; padding: 2px 4px; text-align: ${r}">
      <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="sort-${e}">
        ${t}<span data-part="arrow-${e}" style="display: inline-block; width: 10px; text-align: left"></span>
      </button>
    </th>`;i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Invoices</span></div>
        <div class="sp-body">
          <div class="sp-surface" style="overflow: hidden">
            <table class="sp-table" data-part="table" data-subject aria-label="Invoices">
              <thead>
                <tr>
                  <th style="width: 36px">
                    <button
                      class="sp-checkbox"
                      type="button"
                      role="checkbox"
                      aria-checked="false"
                      data-part="check-all"
                      aria-label="Select every row"
                    ></button>
                  </th>
                  ${o(`client`,`Client`,168,`left`)}
                  <th style="width: 92px">Status</th>
                  ${o(`amount`,`Amount`,118,`right`)}
                </tr>
              </thead>
              <tbody data-part="rows">${a}</tbody>
            </table>
          </div>
          <div class="sp-row sp-context" style="height: 32px; margin-top: 8px">
            <span class="sp-text sp-grow" data-part="summary"></span>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="clear" hidden>Clear</button>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(i,`rows`),c=e(i,`summary`),l=e(i,`clear`),u=e(i,`check-all`),d=new Set,f=`client`,p=`ascending`,m=()=>{let r=[...n].sort((e,t)=>{let n=f===`client`?e.client.localeCompare(t.client):e.amount-t.amount;return p===`ascending`?n:-n});for(let[n,a]of r.entries()){let r=e(i,`row-${a.key}`);r.dataset.rank=String(n+1),s.append(r),t(r,`data-selected`,d.has(a.key)),e(i,`check-${a.key}`).setAttribute(`aria-checked`,String(d.has(a.key)))}for(let t of[`client`,`amount`]){let n=t===f;e(i,`col-${t}`).setAttribute(`aria-sort`,n?p:`none`),e(i,`arrow-${t}`).textContent=n?p===`ascending`?`↑`:`↓`:``}u.setAttribute(`aria-checked`,d.size===0?`false`:d.size===n.length?`true`:`mixed`),c.textContent=d.size===0?`${n.length} invoices`:`${d.size} selected`,l.hidden=d.size===0},h=e=>{p=e===f&&p===`ascending`?`descending`:`ascending`,f=e,m()};for(let t of[`client`,`amount`])e(i,`sort-${t}`).addEventListener(`click`,()=>h(t));for(let t of n)e(i,`check-${t.key}`).addEventListener(`click`,()=>{d.has(t.key)?d.delete(t.key):d.add(t.key),m()});u.addEventListener(`click`,()=>{if(d.size===n.length)d.clear();else for(let e of n)d.add(e.key);m()}),l.addEventListener(`click`,()=>{d.clear(),m()}),m()}export{i as mount};