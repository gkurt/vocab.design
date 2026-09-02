import{n as e,t}from"./parts.C-YLuC7Q.js";import{t as n}from"./icons.CLHbLdSV.js";var r=32,i=`display: flex; align-items: center; gap: 6px; padding: 0 8px; font-size: 12px`,a=[{key:`todo`,name:`Todo`,cards:[`Rewrite intro`,`Audit links`]},{key:`doing`,name:`Doing`,cards:[`Plate scans`]},{key:`done`,name:`Done`,cards:[`Set colophon`,`Proof index`]}];function o(o){let s=e=>`<div class="sp-surface" data-card style="${i}; height: ${r}px">${n(`menu`)}<span class="sp-grow">${e}</span></div>`;o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 256px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Reprint</span>
          <span class="sp-text">3 stages</span>
        </div>
        <div class="sp-body">
          <div class="sp-row" data-part="board" data-subject style="gap: 10px; align-items: flex-start">${a.map(({key:e,name:t,cards:a})=>`
      <section class="sp-surface" data-part="col-${e}" data-count="${a.length}" style="flex: 1 1 0; min-width: 0; padding: 8px">
        <div class="sp-row sp-row--between">
          <span class="sp-label">${t}</span>
          <span class="sp-label" data-part="tally-${e}">${a.length}</span>
        </div>
        <div class="sp-stack" data-part="list-${e}" style="margin-top: 8px; height: 112px">
          ${a.map(e=>s(e)).join(``)}
          ${e===`todo`?`<div class="sp-surface" data-card data-part="card" data-in="todo" style="${i}; height: ${r}px; cursor: grab; touch-action: none">${n(`menu`)}<span class="sp-grow">Index cards</span></div>`:``}
          ${e===`doing`?`<div data-part="slot-doing" style="display: flex; align-items: center; justify-content: center; height: ${r}px; border: 1px dashed var(--sp-line); border-radius: var(--sp-radius); font-size: 11px; color: var(--sp-muted)">Next</div>`:``}
        </div>
      </section>`).join(``)}</div>
        </div>
      </div>
    </div>
  `;let c=a.map(({key:t})=>({key:t,col:e(o,`col-${t}`),list:e(o,`list-${t}`),tally:e(o,`tally-${t}`)})),l=e(o,`card`),u=e(o,`slot-doing`),d=!1,f=()=>{for(let{col:e,list:t,tally:n}of c){let r=t.querySelectorAll(`[data-card]`).length;e.dataset.count=String(r),n.textContent=String(r)}u.hidden=l.dataset.in===`doing`},p=e=>{for(let{col:n}of c){let r=n===e;t(n,`data-active`,r),n.style.background=r?`var(--sp-accent-soft)`:``,n.style.borderColor=r?`var(--sp-accent)`:``}},m=(e,t)=>c.find(({col:n})=>{let r=n.getBoundingClientRect();return e>=r.left&&e<=r.right&&t>=r.top&&t<=r.bottom});l.addEventListener(`pointerdown`,e=>{e.isTrusted&&l.setPointerCapture(e.pointerId),d=!0,l.style.boxShadow=`var(--sp-shadow)`,l.style.opacity=`0.86`}),o.addEventListener(`pointermove`,e=>{d&&p(m(e.clientX,e.clientY)?.col)});let h=e=>{if(!d)return;d=!1,l.style.boxShadow=``,l.style.opacity=``,p(void 0);let t=m(e.clientX,e.clientY);!t||t.list===l.parentElement||(t.list.append(l),l.dataset.in=t.key,f())};o.addEventListener(`pointerup`,h),o.addEventListener(`pointercancel`,h),f()}export{o as mount};