import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=214,i=132,a=89,o={search:{title:`Search`,body:`
      <input class="sp-input" data-part="search-input" style="width: 100%" value="" placeholder="Berth, dock, or rate" aria-label="Search" />
      <span class="sp-text" style="font-size: 12px">Searches the site, not orders.</span>`},help:{title:`Help`,body:`
      <span class="sp-text sp-text--ink" style="font-size: 13px">Mooring guide</span>
      <span class="sp-text sp-text--ink" style="font-size: 13px">Contact the office</span>
      <span class="sp-text" style="font-size: 12px">Open 07:00 to 19:00.</span>`},basket:{title:`Basket`,body:`
      <span class="sp-text sp-text--ink" style="font-size: 13px">Berth 2, two nights</span>
      <span class="sp-text sp-text--ink" style="font-size: 13px">Shore power, two nights</span>
      <span class="sp-text" style="font-size: 12px">Subtotal 180.00</span>`},account:{title:`Account`,body:`
      <span class="sp-text sp-text--ink" style="font-size: 13px">Signed in as R. Okonjo</span>
      <span class="sp-text" style="font-size: 12px">Bookings and receipts.</span>
      <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="sign-out" style="align-self: flex-start">Sign out</button>`}},s=[[`Berth 1`,62],[`Berth 2`,74],[`Berth 3`,58],[`Berth 4`,69]],c=([e,t])=>`
  <span class="sp-surface" style="display: flex; flex-direction: column; justify-content: space-between; height: 62px; padding: 8px 9px">
    <span style="font-size: 12px; font-weight: 500">${e}</span>
    <span class="sp-line" style="width: ${t}%; height: 6px"></span>
  </span>`;function l(l){let u=(e,t,n=!1)=>`<span class="sp-nav-item" data-part="nav-${e}"${n?` data-current`:``}>${t}</span>`;l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div
          style="display: flex; justify-content: flex-end; flex: 0 0 auto; padding: 4px 12px;
                 background: var(--sp-sunken); border-bottom: 1px solid var(--sp-line)"
        >
          <div data-part="cluster" data-subject data-panel="none" style="display: flex; align-items: center; gap: 4px">
            <button class="sp-icon-button" type="button" data-part="util-search" aria-label="Search">${n(`search`)}</button>
            <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="util-help" style="width: 46px; padding: 5px 0; font-size: 12px">Help</button>
            <button
              class="sp-button sp-button--quiet sp-button--sm"
              type="button"
              data-part="util-basket"
              style="display: inline-flex; align-items: center; justify-content: center; gap: 5px; width: 68px; padding: 5px 0; font-size: 12px"
            >
              Basket
              <span style="display: inline-flex; align-items: center; justify-content: center; min-width: 16px; height: 16px; padding: 0 4px;
                           border-radius: 999px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 10px; font-weight: 600">2</span>
            </button>
            <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="util-account" style="width: 62px; padding: 5px 0; font-size: 12px">Account</button>
          </div>
        </div>

        <div class="sp-topbar sp-context" style="gap: 12px">
          <span class="sp-heading" style="flex: 0 0 auto; font-size: 14px">Harbour</span>
          <div class="sp-grow" style="display: flex; gap: 2px">
            ${u(`berths`,`Berths`,!0)}${u(`rates`,`Rates`)}${u(`guide`,`Guide`)}
          </div>
        </div>

        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px; padding: 14px 12px">
          <span class="sp-label">Berths in Marina Bay</span>
          <div class="sp-grid" style="grid-template-columns: 1fr 1fr">${s.map(c).join(``)}</div>
        </div>

        <div
          class="sp-popover"
          data-part="panel"
          data-panel="none"
          style="top: 41px; right: 12px; width: ${r}px; height: ${i}px; padding: 10px; --sp-arrow-x: ${a}px"
        >
          <div style="display: flex; align-items: center; gap: 8px; height: 22px">
            <span class="sp-label sp-grow" data-part="panel-title">Search</span>
            <button class="sp-icon-button" type="button" data-part="panel-close" aria-label="Close" style="width: 22px; height: 22px">${n(`close`)}</button>
          </div>
          <div data-part="panel-body" style="display: flex; flex-direction: column; gap: 6px; height: 84px; margin-top: 6px"></div>
        </div>
      </div>
    </div>
  `;let d=e(l,`cluster`),f=e(l,`panel`),p=e(l,`panel-title`),m=e(l,`panel-body`),h=Object.keys(o).map(t=>[t,e(l,`util-${t}`)]),g=()=>{d.dataset.panel=`none`,f.dataset.panel=`none`,t(f,`data-open`,!1);for(let[,e]of h)t(e,`data-open`,!1)},_=e=>{let n=o[e];if(n){p.textContent=n.title,m.innerHTML=n.body,d.dataset.panel=e,f.dataset.panel=e,t(f,`data-open`,!0);for(let[n,r]of h)t(r,`data-open`,n===e)}};for(let[e,t]of h)t.addEventListener(`click`,()=>_(e));e(l,`panel-close`).addEventListener(`click`,g),g()}export{l as mount};