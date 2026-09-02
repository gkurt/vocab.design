import{n as e}from"./parts.C-YLuC7Q.js";var t=[{name:`Fell boot`,cat:`boots`,band:`over100`,brand:`fjord`,price:`£145`},{name:`Scree boot`,cat:`boots`,band:`mid`,brand:`tarn`,price:`£88`},{name:`Tor boot`,cat:`boots`,band:`under50`,brand:`fjord`,price:`£42`},{name:`Bog boot`,cat:`boots`,band:`under50`,brand:`fjord`,price:`£38`},{name:`Ridge jacket`,cat:`jackets`,band:`over100`,brand:`fjord`,price:`£210`},{name:`Gale jacket`,cat:`jackets`,band:`mid`,brand:`tarn`,price:`£74`},{name:`Mist jacket`,cat:`jackets`,band:`mid`,brand:`fjord`,price:`£96`},{name:`Squall jacket`,cat:`jackets`,band:`under50`,brand:`tarn`,price:`£45`},{name:`Crag pack`,cat:`packs`,band:`mid`,brand:`tarn`,price:`£65`},{name:`Cairn pack`,cat:`packs`,band:`under50`,brand:`tarn`,price:`£29`},{name:`Beck pack`,cat:`packs`,band:`over100`,brand:`fjord`,price:`£118`},{name:`Slate pack`,cat:`packs`,band:`over100`,brand:`tarn`,price:`£132`}],n=[{id:`cat`,label:`Category`,kind:`checkbox`,options:[{id:`boots`,label:`Boots`,short:`Boots`,test:e=>e.cat===`boots`},{id:`jackets`,label:`Jackets`,short:`Jackets`,test:e=>e.cat===`jackets`},{id:`packs`,label:`Packs`,short:`Packs`,test:e=>e.cat===`packs`}]},{id:`price`,label:`Price`,kind:`radio`,options:[{id:`under50`,label:`Under £50`,short:`Under £50`,test:e=>e.band===`under50`},{id:`mid`,label:`£50 to £100`,short:`£50 to £100`,test:e=>e.band===`mid`},{id:`over100`,label:`Over £100`,short:`Over £100`,test:e=>e.band===`over100`}]},{id:`brand`,label:`Brand`,kind:`checkbox`,options:[{id:`fjord`,label:`Fjordline`,short:`Fjordline`,test:e=>e.brand===`fjord`},{id:`tarn`,label:`Tarn`,short:`Tarn`,test:e=>e.brand===`tarn`}]}],r=n.flatMap(e=>e.options.map(t=>[e,t])),i=(e,t)=>e.kind===`checkbox`?`<button class="sp-checkbox" type="button" role="checkbox" aria-checked="false" aria-label="${t.label}" data-part="box-${t.id}"></button>`:`<span
         data-part="box-${t.id}"
         role="radio"
         aria-checked="false"
         aria-label="${t.label}"
         style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 16px; height: 16px;
                border: 1px solid var(--sp-line); border-radius: 50%; background: var(--sp-surface)"
       ><span data-part="dot-${t.id}" style="width: 8px; height: 8px; border-radius: 50%; background: var(--sp-accent); opacity: 0"></span></span>`,a=(e,t)=>`
  <div class="sp-row" data-part="facet-${t.id}" data-value="${t.id}" style="gap: 7px; height: 16px; cursor: pointer">
    ${i(e,t)}
    <span class="sp-grow" style="font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${t.label}</span>
    <span class="sp-text" data-part="count-${t.id}" style="flex: 0 0 auto; font-size: 11px; font-variant-numeric: tabular-nums">0</span>
  </div>`,o=(e,t)=>`
  <div class="sp-stack" style="gap: 4px; ${t>0?`margin-top: 9px`:``}">
    <span class="sp-label" style="font-size: 11px; line-height: 13px">${e.label}</span>
    <div class="sp-stack" style="gap: 4px">${e.options.map(t=>a(e,t)).join(``)}</div>
  </div>`;function s(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 306px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Outdoor gear</span>
          <span class="sp-text" data-part="total" role="status" style="font-size: 12px">12 results</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px">
          <div
            class="sp-surface"
            data-part="facets"
            data-subject
            role="group"
            aria-label="Filters"
            style="flex: 0 0 auto; width: 200px; padding: 10px 11px; overflow: hidden"
          >
            ${n.map(o).join(``)}
          </div>
          <div class="sp-context sp-grow" style="display: flex; flex-direction: column; gap: 8px; min-width: 0">
            <div class="sp-row" style="flex: 0 0 auto; height: 24px; gap: 6px">
              <div class="sp-row" data-part="chips" style="flex: 1 1 auto; min-width: 0; gap: 5px; overflow: hidden"></div>
              <button
                class="sp-button sp-button--ghost sp-button--sm"
                type="button"
                data-part="clear"
                style="flex: 0 0 auto; padding: 3px 8px; font-size: 11px"
              >Clear all</button>
            </div>
            <ul class="sp-list sp-scroll sp-surface sp-grow" data-part="results" data-shown="12" style="min-height: 0; padding: 0 4px"></ul>
          </div>
        </div>
      </div>
    </div>
  `;let a=e(i,`chips`),s=e(i,`results`),c=e(i,`total`),l=new Map(n.map(e=>[e.id,new Set])),u=e=>l.get(e.id)??new Set,d=(e,t)=>n.every(n=>{if(n.id===t)return!0;let r=n.options.filter(e=>u(n).has(e.id));return r.length===0||r.some(t=>t.test(e))}),f=()=>{let n=t.filter(e=>d(e));s.dataset.shown=String(n.length),s.innerHTML=n.map(e=>`
          <li class="sp-list-item" style="padding: 6px 8px; gap: 6px; font-size: 12px">
            <span class="sp-grow" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${e.name}</span>
            <span class="sp-text" style="flex: 0 0 auto; font-size: 11px">${e.price}</span>
          </li>`).join(``),c.textContent=`${n.length} result${n.length===1?``:`s`}`;for(let[n,a]of r){let r=t.filter(e=>d(e,n.id)&&a.test(e)).length,o=u(n).has(a.id),s=e(i,`facet-${a.id}`),c=e(i,`box-${a.id}`);e(i,`count-${a.id}`).textContent=String(r),c.setAttribute(`aria-checked`,String(o)),s.setAttribute(`aria-disabled`,String(r===0&&!o)),s.style.opacity=r===0&&!o?`0.45`:`1`,s.style.cursor=r===0&&!o?`not-allowed`:`pointer`,n.kind===`radio`&&(e(i,`dot-${a.id}`).style.opacity=o?`1`:`0`,c.style.borderColor=o?`var(--sp-accent)`:`var(--sp-line)`)}let o=r.filter(([e,t])=>u(e).has(t.id));a.innerHTML=o.length?o.map(([,e])=>`
              <button class="sp-chip" type="button" data-part="chip-${e.id}" data-value="${e.id}" data-selected style="padding: 2px 7px; font-size: 11px">
                ${e.short}<span class="sp-chip-remove" aria-hidden="true">✕</span>
              </button>`).join(``):`<span class="sp-text" data-part="chips-empty" style="font-size: 11px">No filters applied</span>`};for(let[n,a]of r)e(i,`facet-${a.id}`).addEventListener(`click`,()=>{let e=u(n);e.has(a.id)||t.filter(e=>d(e,n.id)&&a.test(e)).length!==0&&(n.kind===`radio`&&e.clear(),e.add(a.id),f())});a.addEventListener(`click`,e=>{let t=e.target.closest(`[data-value]`)?.dataset.value;if(t){for(let e of l.values())e.delete(t);f()}}),e(i,`clear`).addEventListener(`click`,()=>{for(let e of l.values())e.clear();f()}),f()}export{s as mount};