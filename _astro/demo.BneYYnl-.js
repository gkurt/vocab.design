import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="overflow: visible">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Invoices</span>
          <button class="sp-button sp-button--ghost sp-button--sm sp-row" data-part="trigger" aria-expanded="false" aria-haspopup="dialog">
            ${n(`filter`)} Filter
          </button>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack">
            <div class="sp-surface sp-row" style="padding: 10px"><span class="sp-grow sp-text sp-text--ink">Northwind Ltd</span><span class="sp-text">£1,240</span></div>
            <div class="sp-surface sp-row" style="padding: 10px"><span class="sp-grow sp-text sp-text--ink">Ravensbourne</span><span class="sp-text">£880</span></div>
          </div>
        </div>
        <div class="sp-popover" data-part="popover" data-subject role="dialog" aria-label="Filter invoices"
             style="top: 46px; right: 10px; --sp-arrow-x: 148px">
          <span class="sp-label">Status</span>
          <div class="sp-row sp-row--wrap" style="gap: 6px; margin-top: 8px">
            <button class="sp-chip" data-part="chip-paid" data-selected>Paid</button>
            <button class="sp-chip" data-part="chip-due">Due</button>
            <button class="sp-chip" data-part="chip-draft">Draft</button>
          </div>
          <div class="sp-row" style="justify-content: flex-end; margin-top: 12px">
            <button class="sp-button sp-button--sm" data-part="apply">Apply</button>
          </div>
        </div>
      </div>
    </div>
  `;let i=e(r,`popover`),a=e(r,`trigger`),o=e=>{t(i,`data-open`,e),a.setAttribute(`aria-expanded`,String(e))};a.addEventListener(`click`,()=>o(!0)),e(r,`apply`).addEventListener(`click`,()=>o(!1));for(let n of[`chip-paid`,`chip-due`,`chip-draft`]){let i=e(r,n);i.addEventListener(`click`,()=>t(i,`data-selected`,!i.hasAttribute(`data-selected`)))}r.addEventListener(`pointerdown`,e=>{let t=e.target;!i.contains(t)&&!a.contains(t)&&o(!1)}),r.addEventListener(`keydown`,e=>{e.key===`Escape`&&o(!1)})}export{r as mount};