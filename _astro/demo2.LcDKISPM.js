import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=[{id:`kettle`,name:`Enamel kettle`,price:`$48`,note:`Two sizes, ships in 2 days.`,swatch:`#8fb6c9`},{id:`crate`,name:`Ash crate`,price:`$120`,note:`Stacks three high, oiled finish.`,swatch:`#c7a878`},{id:`throw`,name:`Wool throw`,price:`$85`,note:`Undyed lambswool, 130 by 180cm.`,swatch:`#b3838f`}],i=r[0];function a(a){let o=r.map(e=>`
      <li class="sp-row sp-surface" data-part="row-${e.id}" style="gap: 10px; padding: 8px 10px">
        <span class="sp-swatch" style="width: 38px; height: 38px; --sp-swatch: ${e.swatch}"></span>
        <span class="sp-stack sp-grow" style="gap: 2px">
          <span class="sp-text sp-text--ink">${e.name}</span>
          <span class="sp-text" style="font-size: 12px">${e.price}</span>
        </span>
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="open-${e.id}" data-open-id="${e.id}" type="button">
          Quick view
        </button>
      </li>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 272px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Kitchen</span>
          <span class="sp-chip" data-part="filter" data-selected>In stock</span>
          <span class="sp-row sp-text" data-part="bag" data-count="0" style="gap: 6px; font-variant-numeric: tabular-nums">${n(`inbox`)}<span data-part="bag-text">Bag 0</span></span>
        </div>
        <div class="sp-body sp-context">
          <ul class="sp-list" data-part="list" style="gap: 8px">${o}</ul>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div
          class="sp-surface"
          data-part="quickview"
          data-subject
          role="dialog"
          aria-label="Quick view"
          hidden
          style="position: absolute; left: 40px; right: 40px; top: 52px; padding: 14px; box-shadow: var(--sp-shadow)"
        >
          <div class="sp-row" style="gap: 12px; align-items: flex-start">
            <span class="sp-swatch" data-part="qv-thumb" style="width: 64px; height: 64px; --sp-swatch: ${i?.swatch}"></span>
            <span class="sp-stack sp-grow" style="gap: 3px">
              <span class="sp-heading" data-part="qv-name">${i?.name}</span>
              <span class="sp-text sp-text--ink" data-part="qv-price">${i?.price}</span>
              <span class="sp-text" data-part="qv-note" style="font-size: 12px">${i?.note}</span>
              <button class="sp-button sp-button--sm" data-part="qv-add" type="button" style="margin-top: 5px; align-self: flex-start">Add to bag</button>
            </span>
            <button class="sp-icon-button" data-part="qv-close" type="button" aria-label="Close quick view">${n(`close`)}</button>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(a,`quickview`),c=e(a,`scrim`),l=e(a,`qv-thumb`),u=e(a,`qv-name`),d=e(a,`qv-price`),f=e(a,`qv-note`),p=e(a,`bag`),m=e(a,`bag-text`),h=0,g=()=>{s.hidden=!0,t(c,`data-open`,!1)};e(a,`list`).addEventListener(`click`,e=>{let n=e.target.closest(`[data-open-id]`)?.dataset.openId,i=r.find(e=>e.id===n);i&&(l.style.setProperty(`--sp-swatch`,i.swatch),u.textContent=i.name,d.textContent=i.price,f.textContent=i.note,s.hidden=!1,t(c,`data-open`,!0))}),e(a,`qv-close`).addEventListener(`click`,g),e(a,`qv-add`).addEventListener(`click`,()=>{h+=1,p.dataset.count=String(h),m.textContent=`Bag ${h}`,g()}),c.addEventListener(`click`,g),a.addEventListener(`keydown`,e=>{e.key===`Escape`&&g()})}export{a as mount};