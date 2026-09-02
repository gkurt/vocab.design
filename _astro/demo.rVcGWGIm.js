import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=[{id:`delivery`,label:`Delivery and returns`,body:`Free over £40, returned within 30 days.`},{id:`sizing`,label:`Sizing`,body:`Runs one size small. Half sizes are rounded up.`},{id:`care`,label:`Care`,body:`Cold wash, dry flat, no tumble drying at all.`}];function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 290px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Product help</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column">
          <div class="sp-surface" data-part="stack" data-subject style="overflow: hidden">
            ${n.map((e,n)=>`
    <div style="${n===0?``:`border-top: 1px solid var(--sp-line)`}">
      <button
        class="sp-button sp-button--quiet sp-row"
        type="button"
        id="acc-header-${e.id}"
        data-part="header-${e.id}"
        aria-expanded="false"
        aria-controls="acc-region-${e.id}"
        style="width: 100%; gap: 8px; padding: 8px 12px; border-radius: 0; font-size: 13px; text-align: left"
      >
        ${t(`chevronRight`,`sp-icon--chevron`)}
        <span class="sp-grow" style="white-space: nowrap">${e.label}</span>
      </button>
      <div
        class="sp-text"
        role="region"
        id="acc-region-${e.id}"
        data-part="region-${e.id}"
        aria-labelledby="acc-header-${e.id}"
        hidden
        style="padding: 0 12px 10px 34px"
      >${e.body}</div>
    </div>`).join(``)}
          </div>
          <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: auto 0 0 2px; font-size: 12px">
            One header over one region is a disclosure. A stack of them is this.
          </p>
        </div>
      </div>
    </div>
  `;for(let t of n){let n=e(r,`header-${t.id}`),i=e(r,`region-${t.id}`);n.addEventListener(`click`,()=>{let e=i.hidden;i.hidden=!e,n.setAttribute(`aria-expanded`,String(e))})}}export{r as mount};