import{n as e,t}from"./parts.C-YLuC7Q.js";var n=[{id:`overview`,label:`Overview`,heading:`Loft above the bakery`,lines:[`Sleeps four, one bathroom, second floor.`,`Ten minutes on foot to the harbour.`]},{id:`amenities`,label:`Amenities`,heading:`What is in the flat`,lines:[`Washer, dishwasher, air conditioning.`,`Desk under the window, wired internet.`]},{id:`rules`,label:`House rules`,heading:`Before you book`,lines:[`No smoking, no parties, pets by request.`,`Quiet hours from eleven until seven.`]}];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Listing</span>
          <span class="sp-row" style="gap: 6px">
            <span class="sp-kbd">←</span>
            <span class="sp-kbd">→</span>
            <span class="sp-label">between tabs</span>
          </span>
        </div>
        <div class="sp-body">
          <div class="sp-stack" data-part="widget" data-subject style="gap: 0">
            <div
              class="sp-row"
              role="tablist"
              aria-label="Listing details"
              data-part="tablist"
              style="gap: 4px; padding: 0 2px"
            >${n.map((e,t)=>`
    <button
      class="sp-button sp-button--quiet sp-button--sm"
      type="button"
      role="tab"
      id="tabs-tab-${e.id}"
      data-part="tab-${e.id}"
      aria-selected="${t===0}"
      aria-controls="tabs-panel-${e.id}"
      tabindex="${t===0?0:-1}"
      style="flex: 0 0 auto; white-space: nowrap; padding: 7px 12px; border-radius: 6px 6px 0 0"
    >${e.label}</button>`).join(``)}</div>
            <div
              class="sp-surface"
              data-part="panels"
              style="height: 106px; padding: 12px 14px; border-top-left-radius: 0"
            >${n.map((e,t)=>`
    <div
      class="sp-stack"
      role="tabpanel"
      id="tabs-panel-${e.id}"
      data-part="panel-${e.id}"
      aria-labelledby="tabs-tab-${e.id}"
      ${t===0?``:`hidden`}
      style="gap: 6px"
    >
      <span class="sp-heading" style="font-size: 14px">${e.heading}</span>
      ${e.lines.map(e=>`<span class="sp-text">${e}</span>`).join(``)}
    </div>`).join(``)}</div>
          </div>
          <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 12px 0 0; font-size: 12px">
            One region, three panels. The labels only say which one is on top.
          </p>
        </div>
      </div>
    </div>
  `;let i=n.map(t=>e(r,`tab-${t.id}`)),a=n.map(t=>e(r,`panel-${t.id}`)),o=e(r,`tablist`),s=0,c=()=>{for(let[e,n]of i.entries()){let r=e===s;n.setAttribute(`aria-selected`,String(r)),n.tabIndex=r?0:-1,n.style.color=r?`var(--sp-ink)`:`var(--sp-muted)`,n.style.boxShadow=r?`inset 0 -2px 0 var(--sp-accent)`:``,t(n,`data-selected`,r)}for(let[e,t]of a.entries())t.hidden=e!==s},l=(e,t)=>{s=(s+e+n.length)%n.length,c(),t&&i[s]?.focus({preventScroll:!0})};o.addEventListener(`keydown`,e=>{(e.key===`ArrowRight`||e.key===`ArrowLeft`)&&(e.preventDefault(),l(e.key===`ArrowRight`?1:-1,e.isTrusted))});for(let[e,t]of i.entries())t.addEventListener(`click`,()=>{s=e,c()});c()}export{r as mount};