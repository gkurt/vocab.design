import{n as e}from"./parts.C-YLuC7Q.js";var t=[{id:`contacts`,label:`Contacts`,checked:!0},{id:`invoices`,label:`Invoices`,checked:!1},{id:`messages`,label:`Messages`,checked:!1}],n=`contacts`;function r(e){return`
    <div class="sp-row" data-part="row-${e.id}">
      <button class="sp-checkbox" type="button" role="checkbox" aria-checked="${e.checked}" aria-labelledby="cb-${e.id}-label" data-part="opt-${e.id}"${e.id===n?` data-subject`:``}></button>
      <span class="sp-text sp-text--ink" id="cb-${e.id}-label">${e.label}</span>
    </div>
  `}function i(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="height: 252px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Export data</span></div>
        <div class="sp-body">
          <div class="sp-surface" style="padding: 10px 12px">
            <div class="sp-row" data-part="row-all">
              <button class="sp-checkbox" type="button" role="checkbox" aria-checked="mixed" aria-labelledby="cb-all-label" data-part="select-all"></button>
              <span class="sp-text sp-text--ink" id="cb-all-label">Select all</span>
            </div>
            <div class="sp-divider" style="margin: 9px 0"></div>
            <div class="sp-stack" style="gap: 9px">${t.map(r).join(``)}</div>
          </div>
          <div class="sp-row sp-row--between sp-context" style="margin-top: 10px">
            <span class="sp-text" data-part="count">1 of 3 selected</span>
            <button class="sp-button sp-button--sm" type="button">Export</button>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(n,`select-all`),a=e(n,`count`),o=t.map(t=>({option:t,box:e(n,`opt-${t.id}`)})),s=e=>e.getAttribute(`aria-checked`)===`true`,c=(e,t)=>e.setAttribute(`aria-checked`,String(t)),l=()=>{let e=o.filter(({box:e})=>s(e)).length;i.setAttribute(`aria-checked`,e===0?`false`:e===o.length?`true`:`mixed`),a.textContent=`${e} of ${o.length} selected`};for(let{option:t,box:r}of o)e(n,`row-${t.id}`).addEventListener(`click`,()=>{c(r,!s(r)),l()});e(n,`row-all`).addEventListener(`click`,()=>{let e=i.getAttribute(`aria-checked`)!==`true`;for(let{box:t}of o)c(t,e);l()}),l()}export{i as mount};