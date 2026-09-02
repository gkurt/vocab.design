import{n as e}from"./parts.C-YLuC7Q.js";var t=88,n=8,r=56,i=[{key:`a`,title:`Continue watching`,count:12},{key:`b`,title:`Documentaries`,count:12},{key:`c`,title:`Because you watched Kirkwall`,count:12}],a=`b`,o=(e,n)=>`
  <div data-part="card-${e.key}-${n}" style="flex: 0 0 auto; width: ${t}px">
    <div
      class="sp-swatch"
      style="display: flex; align-items: flex-end; justify-content: flex-end; height: 34px; padding: 2px 5px;
             font-size: 10px; line-height: 1; color: var(--sp-muted); --sp-swatch: var(--sp-accent-soft)"
    >${n}</div>
    <div class="sp-line" style="width: ${58+n*13%34}%; height: 6px; margin-top: 5px"></div>
  </div>`,s=e=>{let t=e.key===a,i=Array.from({length:e.count},(t,n)=>o(e,n+1)).join(``);return`
    <div class="sp-stack${t?``:` sp-context`}" style="flex: 0 0 auto; gap: 3px">
      <span class="sp-label" data-part="title-${e.key}" style="font-size: 11px; line-height: 14px; height: 14px">${e.title}</span>
      <div
        class="sp-scroll"
        data-part="shelf-${e.key}"
        data-at="start"
        ${t?`data-subject`:``}
        role="list"
        aria-label="${e.title}"
        style="display: flex; align-items: flex-start; gap: ${n}px; height: ${r}px;
               overflow-x: auto; overflow-y: hidden; scrollbar-width: none"
      >${i}</div>
    </div>`};function c(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 296px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Catalogue</span>
          <span
            class="sp-label"
            data-part="readout"
            data-at="start"
            role="status"
            style="flex: 0 0 auto; width: 216px; font-size: 11px; text-align: right; white-space: nowrap"
          ></span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 9px; padding: 10px 12px">
          ${i.map(s).join(``)}
        </div>
      </div>
    </div>
  `;let r=e(t,`readout`),o=e(t,`shelf-${a}`),c=i.find(e=>e.key===a)?.title??``,l=i.find(e=>e.key===a)?.count??0,u=e=>{let t=e.scrollWidth-e.clientWidth;return e.scrollLeft<=4?`start`:e.scrollLeft>=t-4?`end`:`mid`},d=()=>{let e=Math.round(o.scrollLeft/96)+1,t=Math.max(1,Math.floor((o.clientWidth+n)/96)),i=Math.min(l,e+t-1),a=l-(i-e+1);r.dataset.at=u(o),r.textContent=`${c}: ${e} to ${i} of ${l}, ${a} off the row`};for(let n of i.map(n=>e(t,`shelf-${n.key}`)))n.addEventListener(`scroll`,()=>{n.dataset.at=u(n),n===o&&d()});d()}export{c as mount};