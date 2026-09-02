import{n as e}from"./parts.C-YLuC7Q.js";var t=[{title:`Product designer`,meta:`Design, Remote`,tags:[`remote`,`design`,`full-time`]},{title:`Design engineer`,meta:`Design, Remote`,tags:[`remote`,`design`,`contract`]},{title:`Staff designer`,meta:`Design, Berlin`,tags:[`berlin`,`design`,`full-time`]},{title:`Backend engineer`,meta:`Platform, Remote`,tags:[`remote`,`platform`,`full-time`]},{title:`Platform lead`,meta:`Platform, Berlin`,tags:[`berlin`,`platform`,`full-time`]},{title:`Design researcher`,meta:`Design, Berlin`,tags:[`berlin`,`design`,`contract`]}],n=[{id:`place`,label:`Location`,values:[{id:`remote`,label:`Remote`},{id:`berlin`,label:`Berlin`}]},{id:`team`,label:`Team`,values:[{id:`design`,label:`Design`},{id:`platform`,label:`Platform`}]},{id:`type`,label:`Contract`,values:[{id:`full-time`,label:`Full time`},{id:`contract`,label:`Contract`}]}],r=n.flatMap(e=>e.values);function i(e){return`
    <div class="sp-row" data-part="facet-${e.id}" data-value="${e.id}" style="cursor: pointer">
      <button class="sp-checkbox" type="button" role="checkbox" aria-checked="false" aria-labelledby="af-${e.id}" data-part="box-${e.id}"></button>
      <span class="sp-text sp-text--ink sp-grow" id="af-${e.id}">${e.label}</span>
    </div>`}function a(e){return`
    <div>
      <div class="sp-label">${e.label}</div>
      <div class="sp-stack" style="gap: 6px; margin-top: 4px">${e.values.map(i).join(``)}</div>
    </div>`}function o(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Open roles</span>
          <span class="sp-text" data-part="total" role="status">6 of ${t.length}</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px">
          <div class="sp-surface sp-context" style="flex: 0 0 auto; width: 134px; padding: 8px 11px; display: flex; flex-direction: column; gap: 9px">
            ${n.map(a).join(``)}
          </div>
          <div class="sp-grow" style="display: flex; flex-direction: column; gap: 8px; min-width: 0">
            <div class="sp-row sp-row--wrap" data-part="applied" data-subject
                 style="flex: 0 0 auto; height: 64px; gap: 6px; align-items: flex-start; align-content: flex-start; overflow: hidden"></div>
            <ul class="sp-list sp-scroll sp-surface sp-context sp-grow" data-part="results" data-shown="${t.length}" style="padding: 0 4px"></ul>
          </div>
        </div>
      </div>
    </div>
  `;let o=e(i,`applied`),s=e(i,`results`),c=e(i,`total`),l=new Set([`remote`,`design`,`full-time`]),u=e=>n.every(t=>{let n=t.values.filter(e=>l.has(e.id));return n.length===0||n.some(t=>e.tags.includes(t.id))}),d=()=>{let n=t.filter(u);s.dataset.shown=String(n.length),s.innerHTML=n.map(e=>`
          <li class="sp-list-item">
            <span class="sp-grow">${e.title}</span>
            <span class="sp-text">${e.meta}</span>
          </li>`).join(``),c.textContent=`${n.length} of ${t.length}`;for(let t of r)e(i,`box-${t.id}`).setAttribute(`aria-checked`,String(l.has(t.id)));let a=r.filter(e=>l.has(e.id));o.innerHTML=a.length?`${a.map(e=>`
              <button class="sp-chip" type="button" data-part="chip-${e.id}" data-value="${e.id}" data-selected
                      aria-label="Remove filter: ${e.label}">
                ${e.label}<span class="sp-chip-remove" aria-hidden="true">✕</span>
              </button>`).join(``)}
         <button class="sp-button sp-button--quiet sp-button--sm" data-part="clear" type="button">Clear all</button>`:`<span class="sp-text" data-part="applied-empty">No filters applied</span>`};for(let t of r)e(i,`facet-${t.id}`).addEventListener(`click`,()=>{l.has(t.id)||(l.add(t.id),d())});o.addEventListener(`click`,e=>{let t=e.target;if(t.closest(`[data-part=clear]`)){l.clear(),d();return}let n=t.closest(`[data-value]`);n?.dataset.value&&(l.delete(n.dataset.value),d())}),d()}export{o as mount};