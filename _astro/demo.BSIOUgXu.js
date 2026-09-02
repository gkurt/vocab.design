import{n as e}from"./parts.C-YLuC7Q.js";var t=[{name:`Cane chair`,type:`chairs`,stock:!0},{name:`Bar stool`,type:`chairs`,stock:!1},{name:`Oak side table`,type:`tables`,stock:!0},{name:`Walnut desk`,type:`tables`,stock:!0},{name:`Arc floor lamp`,type:`lamps`,stock:!0},{name:`Reading lamp`,type:`lamps`,stock:!1}],n=[{id:`type`,label:`Type`,values:[{id:`chairs`,label:`Chairs`,test:e=>e.type===`chairs`},{id:`tables`,label:`Tables`,test:e=>e.type===`tables`},{id:`lamps`,label:`Lamps`,test:e=>e.type===`lamps`}]},{id:`stock`,label:`Availability`,values:[{id:`in-stock`,label:`In stock`,test:e=>e.stock}]}],r=n.flatMap(e=>e.values);function i(e){return`
    <div class="sp-row" data-part="facet-${e.id}" data-value="${e.id}" style="cursor: pointer">
      <button class="sp-checkbox" type="button" role="checkbox" aria-checked="false" aria-labelledby="fs-${e.id}" data-part="box-${e.id}"></button>
      <span class="sp-text sp-text--ink sp-grow" id="fs-${e.id}">${e.label}</span>
      <span class="sp-text" data-part="count-${e.id}">0</span>
    </div>`}function a(e,t){return`
    ${t>0?`<div class="sp-divider" style="margin: 10px 0"></div>`:``}
    <div class="sp-label">${e.label}</div>
    <div class="sp-stack" style="gap: 7px; margin-top: 6px">${e.values.map(i).join(``)}</div>`}function o(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 290px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Furniture</span>
          <span class="sp-text" data-part="total" role="status">6 shown</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px">
          <div class="sp-surface" data-part="facets" data-subject style="flex: 0 0 auto; width: 152px; padding: 10px 12px">
            ${n.map(a).join(``)}
          </div>
          <div class="sp-context sp-grow" style="display: flex; flex-direction: column; gap: 8px; min-width: 0">
            <div class="sp-row" data-part="chips" style="flex: 0 0 auto; height: 24px; overflow: hidden"></div>
            <ul class="sp-list sp-scroll sp-surface sp-grow" data-part="results" data-shown="6" style="padding: 0 4px"></ul>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(i,`chips`),s=e(i,`results`),c=e(i,`total`),l=new Set,u=(e,t)=>n.every(n=>{if(n.id===t)return!0;let r=n.values.filter(e=>l.has(e.id));return r.length===0||r.some(t=>t.test(e))}),d=()=>{let a=t.filter(e=>u(e));s.dataset.shown=String(a.length),s.innerHTML=a.map(e=>`
          <li class="sp-list-item">
            <span class="sp-grow">${e.name}</span>
            <span class="sp-text">${e.stock?`In stock`:`Backordered`}</span>
          </li>`).join(``),c.textContent=`${a.length} shown`;for(let r of n)for(let n of r.values){let a=t.filter(e=>u(e,r.id)&&n.test(e)).length;e(i,`count-${n.id}`).textContent=String(a),e(i,`box-${n.id}`).setAttribute(`aria-checked`,String(l.has(n.id)))}let d=r.filter(e=>l.has(e.id));o.innerHTML=d.length?d.map(e=>`
              <button class="sp-chip" type="button" data-part="chip-${e.id}" data-value="${e.id}" data-selected>
                ${e.label}<span class="sp-chip-remove" aria-hidden="true">✕</span>
              </button>`).join(``):`<span class="sp-text" data-part="chips-empty">No filters applied</span>`};for(let t of r)e(i,`facet-${t.id}`).addEventListener(`click`,()=>{l.has(t.id)||(l.add(t.id),d())});o.addEventListener(`click`,e=>{let t=e.target.closest(`[data-value]`);t?.dataset.value&&(l.delete(t.dataset.value),d())}),d()}export{o as mount};