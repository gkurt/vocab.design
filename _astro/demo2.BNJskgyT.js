import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{heading:`Platform`,links:[{key:`analytics`,label:`Analytics`},{key:`automations`,label:`Automations`},{key:`warehouse`,label:`Data warehouse`}]},{heading:`By industry`,links:[{key:`retail`,label:`Retail`},{key:`fintech`,label:`Fintech`},{key:`logistics`,label:`Logistics`}]},{heading:`Resources`,links:[{key:`docs`,label:`Documentation`},{key:`changelog`,label:`Changelog`},{key:`community`,label:`Community`}]}],i=[{key:`pricing`,label:`Pricing`},{key:`company`,label:`Company`}];function a(a){let o=r.map(({heading:e,links:t})=>`
      <div>
        <span class="sp-label" style="display: block; padding: 0 10px 2px">${e}</span>
        <ul class="sp-nav" style="margin-top: 4px">
          ${t.map(({key:e,label:t})=>`<li><a class="sp-nav-item" href="#" data-part="link-${e}" data-key="${e}">${t}</a></li>`).join(``)}
        </ul>
      </div>`).join(``),s=i.map(({key:e,label:t})=>`<button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="nav-${e}">${t}</button>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading">Northwind</span>
          <div class="sp-row sp-grow" style="gap: 2px; justify-content: flex-end">
            <button
              class="sp-button sp-button--quiet sp-button--sm sp-row"
              type="button"
              data-part="nav-products"
              aria-expanded="false"
              aria-controls="vd-mega-panel"
              style="gap: 4px"
            >
              Products
              ${n(`chevronDown`)}
            </button>
            ${s}
          </div>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack" style="gap: 10px">
            <div class="sp-line" style="width: 58%; height: 12px"></div>
            <div class="sp-line" style="width: 86%"></div>
            <div class="sp-line" style="width: 74%"></div>
            <div class="sp-line" style="width: 80%"></div>
          </div>
          <div class="sp-divider" style="margin: 14px 0"></div>
          <div class="sp-row sp-row--between">
            <span class="sp-label">Went to</span>
            <span class="sp-text" data-part="status" data-page="none">Home</span>
          </div>
        </div>
        <div
          class="sp-menu"
          id="vd-mega-panel"
          data-part="panel"
          data-subject
          aria-label="Products"
          style="left: 10px; right: 10px; padding: 14px; transform-origin: top center"
        >
          <div class="sp-grid" style="grid-template-columns: repeat(3, 1fr); gap: 12px">${o}</div>
        </div>
      </div>
    </div>
  `;let c=e(a,`nav-products`),l=e(a,`panel`),u=e(a,`status`),d=a.querySelector(`.sp-topbar`);l.style.top=`${d.offsetHeight+6}px`;let f=e=>{t(l,`data-open`,e),t(c,`data-open`,e),c.setAttribute(`aria-expanded`,String(e))};c.addEventListener(`click`,()=>f(!0));for(let e of l.querySelectorAll(`.sp-nav-item`))e.addEventListener(`click`,t=>{t.preventDefault(),u.dataset.page=e.dataset.key??`none`,u.textContent=(e.textContent??``).trim(),f(!1)});a.addEventListener(`keydown`,e=>{e.key===`Escape`&&f(!1)}),a.addEventListener(`pointerdown`,e=>{let t=e.target;!l.contains(t)&&!c.contains(t)&&f(!1)})}export{a as mount};