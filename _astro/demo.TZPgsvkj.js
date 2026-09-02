import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Orders</span>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack">
            <div class="sp-surface sp-row" style="padding: 10px">
              <span class="sp-grow sp-text sp-text--ink">#4417 · Ravensbourne</span>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="open">Details</button>
            </div>
            <div class="sp-surface sp-row" style="padding: 10px">
              <span class="sp-grow sp-text sp-text--ink">#4416 · Northwind</span>
              <span class="sp-text">Shipped</span>
            </div>
          </div>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <aside class="sp-drawer sp-drawer--right" data-part="drawer" data-subject aria-label="Order details">
          <div class="sp-row">
            <span class="sp-heading sp-grow">Order #4417</span>
            <button class="sp-icon-button" data-part="close" aria-label="Close">${n(`close`)}</button>
          </div>
          <div class="sp-stack">
            <span class="sp-label">Customer</span>
            <span class="sp-text sp-text--ink">Ravensbourne Ltd</span>
            <span class="sp-label">Status</span>
            <span class="sp-text sp-text--ink">Packing</span>
          </div>
          <button class="sp-button sp-button--sm" style="margin-top: auto">Print label</button>
        </aside>
      </div>
    </div>
  `;let i=e(r,`drawer`),a=e(r,`scrim`),o=e=>{t(i,`data-open`,e),t(a,`data-open`,e)};e(r,`open`).addEventListener(`click`,()=>o(!0)),e(r,`close`).addEventListener(`click`,()=>o(!1)),a.addEventListener(`click`,()=>o(!1)),r.addEventListener(`keydown`,e=>{e.key===`Escape`&&o(!1)})}export{r as mount};