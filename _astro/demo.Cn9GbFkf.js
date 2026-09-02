import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=12,i=5,a=7,o={1:`gap-left`,5:`gap-right`},s=[`Quay survey`,`Tide table`,`Berth plan`,`Cargo manifest`,`Crane log`,`Pilot notes`],c=[`2019`,`2021`,`2022`,`2023`,`2024`],l=e=>`${s[(e-1)%s.length]} ${1900+e}`,u=e=>c[(e-1)%c.length]??``;function d(e){return e<=4?[1,2,3,4,5,`gap`,r]:e>=9?[1,`gap`,8,9,10,11,r]:[1,`gap`,e-1,e,e+1,`gap`,r]}function f(s){let c=Array.from({length:i},(e,t)=>`
      <li class="sp-list-item" data-part="row-${t+1}">
        <span class="sp-grow" data-part="row-${t+1}-title"></span>
        <span class="sp-text" data-part="row-${t+1}-stamp"></span>
      </li>`).join(``),f=Array.from({length:a},(e,t)=>`
      <span style="display: inline-flex; width: 30px; justify-content: center">
        <button
          class="sp-button sp-button--ghost sp-button--sm"
          type="button"
          data-slot="${t}"
          style="width: 30px; padding: 0; text-align: center"
        ></button>
        ${o[t]?`<span class="sp-text" data-part="${o[t]}" aria-hidden="true" hidden style="width: 30px; text-align: center">…</span>`:``}
      </span>`).join(``);s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Archive</span>
          <span class="sp-label">60 records</span>
        </div>
        <div class="sp-body sp-context" style="padding: 10px 12px">
          <ul class="sp-list sp-surface" data-part="list" style="padding: 0 4px">${c}</ul>
        </div>
        <div
          class="sp-row sp-row--between"
          style="flex: 0 0 auto; padding: 8px 12px; border-top: 1px solid var(--sp-line)"
        >
          <span class="sp-text sp-context" data-part="range" role="status" style="width: 108px"></span>
          <nav class="sp-row" data-part="pager" data-subject aria-label="Archive pages" style="gap: 3px">
            <button class="sp-icon-button" type="button" data-part="prev" aria-label="Previous page">
              ${n(`chevronLeft`)}
            </button>
            ${f}
            <button class="sp-icon-button" type="button" data-part="next" aria-label="Next page">
              ${n(`chevronRight`)}
            </button>
          </nav>
        </div>
      </div>
    </div>
  `;let p=e(s,`pager`),m=e(s,`range`),h=e(s,`prev`),g=e(s,`next`),_=[...p.querySelectorAll(`button[data-slot]`)],v=Object.values(o).map(t=>e(s,t)),y=Array.from({length:i},(t,n)=>({row:e(s,`row-${n+1}`),title:e(s,`row-${n+1}-title`),stamp:e(s,`row-${n+1}-stamp`)})),b=1,x=()=>{let e=(b-1)*i+1;y.forEach((t,n)=>{let r=e+n;t.row.dataset.item=String(r),t.title.textContent=l(r),t.stamp.textContent=u(r)}),m.textContent=`${e} to ${e+i-1} of 60`;for(let e of v)e.hidden=!0;d(b).forEach((e,n)=>{let r=_[n];if(!r)return;if(e===`gap`){r.hidden=!0,r.removeAttribute(`data-part`),r.removeAttribute(`aria-current`),t(r,`data-selected`,!1);let e=s.querySelector(`[data-part="${o[n]}"]`);e&&(e.hidden=!1);return}r.hidden=!1,r.textContent=String(e),r.dataset.part=`page-${e}`,r.dataset.page=String(e);let i=e===b;i?r.setAttribute(`aria-current`,`page`):r.removeAttribute(`aria-current`),t(r,`data-selected`,i),r.setAttribute(`aria-label`,`Page ${e}`)}),h.disabled=b===1,g.disabled=b===r},S=e=>{let t=Math.min(Math.max(e,1),r);t!==b&&(b=t,x())};for(let e of _)e.addEventListener(`click`,()=>S(Number(e.dataset.page)));h.addEventListener(`click`,()=>{h.disabled||S(b-1)}),g.addEventListener(`click`,()=>{g.disabled||S(b+1)}),x()}export{f as mount};