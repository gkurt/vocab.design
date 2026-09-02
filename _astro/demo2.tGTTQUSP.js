import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n=14,r=24,i=104,a=32,o=16,s=22,c=[{id:`research`,name:`Research`,start:0,length:3},{id:`wireframes`,name:`Wireframes`,start:4,length:3,after:`research`},{id:`visual`,name:`Visual design`,start:8,length:3,after:`wireframes`},{id:`build`,name:`Build`,start:9,length:4},{id:`qa`,name:`QA`,start:12,length:2}],l=e=>c.findIndex(t=>t.id===e),u=e=>l(e)*a+a/2,d=e=>e.start*r+2,f=e=>e.length*r-4,p=Array.from({length:n},(e,t)=>`<span class="sp-label" style="flex: 0 0 auto; width: ${r}px; text-align: center; font-size: 9px; line-height: ${s}px">${t+1}</span>`).join(``),m=c.map(e=>`
    <span
      style="display: flex; align-items: center; height: ${a}px; padding: 0 8px; border-top: 1px solid var(--sp-line);
             font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
    >${e.name}</span>`).join(``),h=c.map(e=>`
    <button
      type="button"
      data-part="bar-${e.id}"
      data-start="${e.start}"
      aria-label="${e.name}"
      style="position: absolute; left: ${d(e)}px; top: ${l(e.id)*a+16/2}px;
             width: ${f(e)}px; height: ${o}px; padding: 0; border: 0; border-radius: 4px;
             background: var(--sp-accent); font: inherit; cursor: grab; touch-action: none; user-select: none"
    ></button>`).join(``);function g(l){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 306px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Launch plan</span>
          <span class="sp-label" style="flex: 0 0 auto; white-space: nowrap">September</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center">
          <div class="sp-surface" data-part="chart" data-subject style="flex: 0 0 auto; width: 442px; overflow: hidden">
            <div style="display: flex; height: ${s}px; border-bottom: 1px solid var(--sp-line)">
              <span class="sp-label" style="flex: 0 0 auto; width: ${i}px; padding: 0 8px; font-size: 10px; line-height: ${s}px">Task</span>
              ${p}
            </div>
            <div style="display: flex">
              <div style="flex: 0 0 auto; display: flex; flex-direction: column; width: ${i}px; border-right: 1px solid var(--sp-line)">${m}</div>
              <div
                data-part="field"
                style="position: relative; flex: 0 0 auto; width: 336px; height: ${c.length*a}px;
                       background-image:
                         repeating-linear-gradient(to bottom, var(--sp-line) 0 1px, transparent 1px ${a}px),
                         repeating-linear-gradient(to right, var(--sp-line) 0 1px, transparent 1px 48px)"
              >
                <svg
                  data-part="deps"
                  aria-hidden="true"
                  width="336"
                  height="${c.length*a}"
                  style="position: absolute; left: 0; top: 0; pointer-events: none; overflow: visible"
                >
                  <path data-part="dep-wireframes" fill="none" stroke="var(--sp-muted)" stroke-width="2" stroke-linecap="round" d=""></path>
                  <path data-part="dep-visual" fill="none" stroke="var(--sp-muted)" stroke-width="2" stroke-linecap="round" d=""></path>
                </svg>
                ${h}
                <span data-part="drop" style="position: absolute; left: 146px; top: 40px; width: 68px; height: ${o}px; pointer-events: none"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let g=e(l,`field`),_=new Map(c.map(t=>[t.id,e(l,`bar-${t.id}`)])),v=()=>{for(let e of c){let t=_.get(e.id);if(t&&(t.style.left=`${d(e)}px`,t.dataset.start=String(e.start)),!e.after)continue;let n=c.find(t=>t.id===e.after),r=l.querySelector(`[data-part="dep-${e.id}"]`);if(!n||!r)continue;let i=d(n)+f(n),a=u(n.id),o=d(e)-2,s=u(e.id);r.setAttribute(`d`,`M ${i} ${a} H ${i+8} V ${s} H ${o} M ${o-5} ${s-4} L ${o} ${s} L ${o-5} ${s+4}`)}},y=e=>{let t=[],n=e=>{for(let r of c)r.after===e&&(t.push(r),n(r.id))};return n(e),t},b;for(let e of c){let n=_.get(e.id);n&&n.addEventListener(`pointerdown`,r=>{r.isTrusted&&n.setPointerCapture(r.pointerId);let i=[e,...y(e.id)];b={task:e,el:n,x:t(r,g).x,starts:new Map(i.map(e=>[e.id,e.start]))},n.style.cursor=`grabbing`,n.style.boxShadow=`var(--sp-shadow)`,g.dataset.moving=e.id})}g.addEventListener(`pointermove`,e=>{if(!b)return;let i=Math.round((t(e,g).x-b.x)/r);for(let[e,t]of b.starts){let r=c.find(t=>t.id===e);r&&(i=Math.max(-t,Math.min(n-t-r.length,i)))}for(let[e,t]of b.starts){let n=c.find(t=>t.id===e);n&&(n.start=t+i)}v()});let x=()=>{b&&=(b.el.style.cursor=`grab`,b.el.style.boxShadow=``,g.dataset.moving=`none`,void 0)};g.addEventListener(`pointerup`,x),g.addEventListener(`pointercancel`,x),g.dataset.moving=`none`,v()}export{g as mount};