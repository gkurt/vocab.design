import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{id:`overview`,label:`Overview`,body:`Two berths and a tender`},{id:`details`,label:`Details`,body:`Draft 1.4 m, beam 3.2 m`},{id:`history`,label:`History`,body:`Refitted in the spring`}],r=e=>n.map((t,n)=>`<button
         class="sp-segment"
         type="button"
         role="tab"
         tabindex="-1"
         data-part="${e}-tab-${t.id}"
         aria-selected="${n===0}"
         style="padding: 5px 12px"
       >${t.label}</button>`).join(``),i=(e,t,i)=>`
  <div class="sp-stack${i?` sp-context`:``}" style="gap: 6px">
    <div class="sp-row${i?``:` sp-context`}">
      <span class="sp-label">${t}</span>
    </div>
    <div
      class="sp-row"
      role="tablist"
      aria-label="${t}"
      data-part="${e}-tabs"
      ${i?``:`data-subject`}
      tabindex="0"
      style="gap: 2px"
    >${r(e)}</div>
    <div class="sp-surface${i?``:` sp-context`}" data-part="${e}-panel" style="height: 32px; padding: 6px 10px; font-size: 12px">${n[0]?.body??``}</div>
  </div>`;function a(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 284px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Boat</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          ${i(`auto`,`Selection follows focus`,!1)}
          <div class="sp-divider sp-context"></div>
          ${i(`manual`,`Manual activation`,!0)}
        </div>
      </div>
    </div>
  `;let a=(i,a)=>{let o=e(r,`${i}-tabs`),s=e(r,`${i}-panel`),c=n.map(t=>e(r,`${i}-tab-${t.id}`)),l=0,u=0,d=()=>{for(let[e,n]of c.entries())t(n,`data-sim-focus`,e===l),n.setAttribute(`aria-selected`,String(e===u)),n.style.background=e===u?`var(--sp-accent-soft)`:``,n.style.boxShadow=e===u?`inset 0 -2px 0 var(--sp-accent)`:``;s.textContent=n[u]?.body??``,t(o,`data-split`,l!==u)},f=e=>{l=(l+e+c.length)%c.length,a&&(u=l),d()};o.addEventListener(`keydown`,e=>{if(e.key===`ArrowRight`||e.key===`ArrowLeft`){e.preventDefault(),f(e.key===`ArrowRight`?1:-1);return}(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),u=l,d())});for(let[e,t]of c.entries())t.addEventListener(`click`,()=>{l=e,u=e,d()});d()};a(`auto`,!0),a(`manual`,!1)}export{a as mount};