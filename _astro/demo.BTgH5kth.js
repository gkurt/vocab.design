import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{id:1,name:`Ferry hire, March`,amount:`£240.00`},{id:2,name:`Quay resurfacing`,amount:`£1,180.00`},{id:3,name:`Mooring renewal`,amount:`£96.00`},{id:4,name:`Chandlery order`,amount:`£312.50`}],i=`opacity 0.16s, visibility 0.16s`;function a(a){let o=r.map(({id:e,name:t,amount:n})=>`
      <tr data-part="row-${e}">
        <td><button class="sp-checkbox" data-part="cb-${e}" data-row="${e}" type="button" role="checkbox" aria-checked="false" aria-label="Select ${t}"></button></td>
        <td class="sp-text--ink">${t}</td>
        <td class="sp-text--ink">${n}</td>
        <td style="text-align: right"><span class="sp-chip" data-part="tag-${e}" style="visibility: hidden">Archived</span></td>
      </tr>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 282px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Invoices</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 0; padding: 0">
          <div style="position: relative; flex: 0 0 auto; height: 44px">
            <div class="sp-row sp-row--between sp-context" style="position: absolute; inset: 0; padding: 0 12px">
              <span class="sp-label">4 invoices</span>
              <span class="sp-row sp-label" style="gap: 6px">${n(`filter`)}March</span>
            </div>
            <div
              class="sp-row"
              data-part="bar"
              data-subject
              data-count="0"
              role="status"
              style="position: absolute; inset: 0; gap: 8px; padding: 0 10px; background: var(--sp-accent-soft); visibility: hidden; opacity: 0; transition: ${i}"
            >
              <span class="sp-text sp-text--ink sp-grow" data-part="bar-count">0 selected</span>
              <button class="sp-button sp-button--sm" data-part="archive" type="button">Archive</button>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="cancel" type="button">Cancel</button>
            </div>
          </div>
          <div class="sp-scroll sp-context" style="flex: 1 1 auto; min-height: 0; background: var(--sp-surface)">
            <table class="sp-table">
              <thead>
                <tr>
                  <th style="width: 38px"><button class="sp-checkbox" data-part="cb-all" type="button" role="checkbox" aria-checked="false" aria-label="Select all"></button></th>
                  <th>Invoice</th>
                  <th>Amount</th>
                  <th style="width: 92px"></th>
                </tr>
              </thead>
              <tbody data-part="rows">${o}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(a,`bar`),c=e(a,`bar-count`),l=e(a,`cb-all`),u=new Set,d=()=>{for(let{id:n}of r){let r=u.has(n);e(a,`cb-${n}`).setAttribute(`aria-checked`,String(r)),t(e(a,`row-${n}`),`data-selected`,r)}l.setAttribute(`aria-checked`,u.size===0?`false`:u.size===r.length?`true`:`mixed`),s.dataset.count=String(u.size),c.textContent=`${u.size} selected`;let n=u.size>0;s.style.visibility=n?`visible`:`hidden`,s.style.opacity=n?`1`:`0`};e(a,`rows`).addEventListener(`click`,e=>{let t=Number(e.target.closest(`[data-row]`)?.dataset.row);t&&(u.has(t)?u.delete(t):u.add(t),d())}),l.addEventListener(`click`,()=>{if(u.size===r.length)u.clear();else for(let{id:e}of r)u.add(e);d()}),e(a,`archive`).addEventListener(`click`,()=>{for(let t of u)e(a,`tag-${t}`).style.visibility=`visible`;u.clear(),d()}),e(a,`cancel`).addEventListener(`click`,()=>{u.clear(),d()})}export{a as mount};