import{n as e}from"./parts.C-YLuC7Q.js";var t={w:406,h:172},n={w:148,h:84},r={x:34,y:30},i={x:224,y:30},a=8,o=3,s=5,c=34,l=e=>({x:e.x-a,y:e.y-a,w:n.w+16,h:n.h+16});function u(e,t){let n=Math.ceil(e/10)+1,r=`<span style="flex: 0 0 ${s}px; height: 100%; background: var(--sp-accent)"></span><span style="flex: 0 0 ${s}px; height: 100%"></span>`.repeat(n);return`
    <span class="sp-marquee" style="${t}">
      <span class="sp-marquee-track" style="--sp-marquee-time: ${(n*s*2/c).toFixed(2)}s">
        <span class="sp-marquee-group" style="--sp-marquee-gap: 0px">${r}</span>
        <span class="sp-marquee-group" style="--sp-marquee-gap: 0px" aria-hidden="true">${r}</span>
      </span>
    </span>`}function d(e){let t=(e,t)=>`position: absolute; left: 0; top: 0; width: ${e}px; height: ${o}px; ${t}`;return[u(e.w,t(e.w,``)),u(e.w,t(e.w,`top: ${e.h-o}px; transform: rotate(180deg)`)),u(e.h,t(e.h,`transform-origin: 0 0; transform: translateY(${e.h}px) rotate(-90deg)`)),u(e.h,t(e.h,`transform-origin: 0 0; transform: translateX(${e.w}px) rotate(90deg)`))].join(``)}var f=(e,t,r,i)=>`
  <div
    ${i}
    style="position: absolute; left: ${t.x}px; top: ${t.y}px; width: ${n.w}px; height: ${n.h}px; border-radius: 6px;
           border: 1px solid var(--sp-line); background: ${r}; display: flex; align-items: flex-end; padding: 8px; user-select: none"
  >
    <span class="sp-label" style="font-size: 11px">${e}</span>
  </div>`;function p(n){let a=l(r),o=l(i);n.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Site plan</span>
          <span class="sp-text" data-part="readout" data-selected="0" style="width: 200px; text-align: right; white-space: nowrap">Nothing selected</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            data-part="canvas"
            style="position: relative; width: ${t.w}px; height: ${t.h}px; background: var(--sp-surface);
                   border: 1px solid var(--sp-line); border-radius: 6px; overflow: hidden; touch-action: none"
          >
            ${f(`Terrace`,r,`var(--sp-accent-soft)`,`data-part="shape"`)}
            ${f(`Courtyard`,i,`var(--sp-sunken)`,`data-part="other" class="sp-context"`)}
            <span
              class="sp-context"
              data-part="still"
              style="position: absolute; left: ${o.x}px; top: ${o.y}px; width: ${o.w}px; height: ${o.h}px;
                     border: 2px dashed var(--sp-muted); border-radius: 4px; pointer-events: none"
            ></span>
            <span
              data-part="ants"
              data-subject
              style="position: absolute; left: ${a.x}px; top: ${a.y}px; width: ${a.w}px; height: ${a.h}px;
                     opacity: 0; transition: opacity 0.16s linear; pointer-events: none"
            >${d(a)}</span>
            <span
              data-part="empty"
              aria-hidden="true"
              style="position: absolute; left: ${t.w/2}px; top: ${t.h-16}px; width: 1px; height: 1px; pointer-events: none"
            ></span>
          </div>
        </div>
      </div>
    </div>
  `;let s=e(n,`canvas`),c=e(n,`shape`),u=e(n,`ants`),p=e(n,`readout`),m=e=>{u.style.opacity=e?`1`:`0`,p.dataset.selected=e?`1`:`0`,p.textContent=e?`Terrace selected`:`Nothing selected`};s.addEventListener(`pointerdown`,e=>{let t=e.target;m(t instanceof Node&&c.contains(t))})}export{p as mount};