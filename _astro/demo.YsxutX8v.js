import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{key:`name`,label:`Full name`,value:`Rowan Ellis`},{key:`email`,label:`Email`,value:`rowan.ellis@fernway.co.uk`},{key:`postcode`,label:`Postcode`,value:`YO21 3PU`}],r={empty:`Add a postcode for delivery dates.`,filled:`Delivering to YO21 3PU, 2 to 3 working days.`};function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 254px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Fernway Books</span>
          <span class="sp-label" style="font-size: 11px">Delivery details</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          ${n.map(({key:e,label:t})=>{let n=e===`name`;return`
      <div class="sp-field" style="flex: 0 0 auto; gap: 3px${n?`; position: relative; z-index: 2`:``}">
        <span class="sp-label sp-context" style="font-size: 11px">${t}</span>
        <input
          class="sp-input"
          data-part="in-${e}"
          data-state="empty"
          type="text"
          aria-label="${t}"
          autocomplete="off"
          style="height: 28px; font-size: 12px"${e===`email`?` data-subject data-pose="[data-state=filled]"`:``}
        />
        ${n?`<div class="sp-menu sp-context" data-part="ua-menu" role="listbox" aria-label="Saved profile"
                 style="top: calc(100% + 4px); left: 0; right: 0; min-width: 0">
                 <span class="sp-label" style="display: block; padding: 3px 8px 5px; font-size: 10px">Saved profile</span>
                 <button class="sp-menu-item" data-part="profile" type="button"
                   style="flex-direction: column; align-items: flex-start; gap: 1px">
                   <span class="sp-text sp-text--ink" style="font-size: 12px">Rowan Ellis</span>
                   <span class="sp-text" style="font-size: 11px">rowan.ellis@fernway.co.uk, YO21 3PU</span>
                 </button>
               </div>`:``}
      </div>`}).join(``)}
          <span class="sp-label sp-context" data-part="status" data-count="0" role="status" style="flex: 0 0 auto; height: 17px; font-size: 11px">
            ${r.empty}
          </span>
        </div>
      </div>
    </div>
  `;let a=e(i,`ua-menu`),o=e(i,`status`),s=n.map(t=>({field:t,input:e(i,`in-${t.key}`)}));e(i,`in-name`).addEventListener(`click`,()=>t(a,`data-open`,!0)),e(i,`profile`).addEventListener(`click`,()=>{t(a,`data-open`,!1),s.forEach(({field:e,input:t})=>{t.value=e.value,t.dataset.state=`filled`,t.style.background=`var(--sp-accent-soft)`,t.style.borderColor=`var(--sp-accent)`}),o.textContent=r.filled,o.dataset.count=String(n.length)})}export{i as mount};