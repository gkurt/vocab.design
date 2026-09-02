import{n as e}from"./parts.C-YLuC7Q.js";var t=450,n=140,r={eager:[`Overview`,`Pricing`,`Changelog`],gated:[`Guides`,`API reference`,`Community`]};function i(i,a){let o=e=>`
    <div class="sp-menu" data-part="menu-${e}" role="menu" aria-label="${e} menu">
      ${r[e]?.map(e=>`<button class="sp-menu-item" role="menuitem" type="button">${e}</button>`).join(``)??``}
    </div>`;i.innerHTML=`
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame sp-frame--wide" style="height: 230px">
        <div class="sp-topbar">
          <span class="sp-heading sp-context">Atlas</span>
          <button class="sp-button sp-button--quiet sp-button--sm sp-context" type="button" data-part="eager" aria-haspopup="menu" aria-expanded="false">
            Products
          </button>
          <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="gated" data-subject aria-haspopup="menu" aria-expanded="false">
            Resources
          </button>
        </div>
        <div class="sp-body sp-context" data-part="page">
          <div class="sp-stack">
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 70%"></div>
            <div class="sp-line" style="width: 79%"></div>
          </div>
        </div>
        ${o(`eager`)}
        ${o(`gated`)}
      </div>
    </div>
  `;let s=new Map,c=new Map,l=(e,t)=>{t.style.left=`${e.offsetLeft}px`,t.style.top=`${e.offsetTop+e.offsetHeight+8}px`},u=(t,n)=>{let r=e(i,t),a=s.get(t);a&&(n&&l(r,a),n?a.setAttribute(`data-open`,``):a.removeAttribute(`data-open`),r.setAttribute(`aria-expanded`,String(n)))},d=e=>{let t=c.get(e)??{};return c.set(e,t),t},f=e=>{let t=d(e);a.clearTimeout(t.open),a.clearTimeout(t.close),t.open=void 0,t.close=void 0},p=e=>{f(e),u(e,!1)},m=()=>{for(let e of Object.keys(r))p(e)};for(let o of Object.keys(r)){let r=e(i,`menu-${o}`);s.set(o,r);let c=e(i,o),l=o===`eager`?`gated`:`eager`;c.addEventListener(`pointerenter`,()=>{if(f(o),p(l),o===`eager`){u(o,!0);return}d(o).open=a.setTimeout(()=>{d(o).open=void 0,u(o,!0)},t)}),c.addEventListener(`pointerleave`,()=>{f(o),d(o).close=a.setTimeout(()=>p(o),n)}),r.addEventListener(`pointerenter`,()=>f(o)),r.addEventListener(`pointerleave`,()=>p(o)),c.addEventListener(`focus`,()=>u(o,!0)),c.addEventListener(`blur`,()=>p(o))}i.addEventListener(`keydown`,e=>{e.key===`Escape`&&m()})}export{i as mount};