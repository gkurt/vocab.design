import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n={w:400,h:198},r={x:200,y:98},i=52,a=44,o=192,s=260,c=12,l=[{key:`delete`,label:`Delete`,dir:`north`,dx:0,dy:-1},{key:`duplicate`,label:`Duplicate`,dir:`east`,dx:1,dy:0},{key:`group`,label:`Group`,dir:`south`,dx:0,dy:1},{key:`rename`,label:`Rename`,dir:`west`,dx:-1,dy:0}],u=l.map(({key:e,label:t,dx:n,dy:r})=>`
    <button
      class="sp-chip"
      type="button"
      data-part="sector-${e}"
      style="position: absolute; left: ${o/2+n*i}px; top: ${o/2+r*i}px; transform: translate(-50%, -50%)"
    >${t}</button>`).join(``),d=(e,t,n)=>`
  <span
    data-part="${e}"
    style="position: absolute; left: ${t-7}px; top: ${n-7}px; width: 14px; height: 14px; pointer-events: none"
  ></span>`;function f(f,p){f.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 296px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Canvas</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div
            class="sp-surface"
            data-part="canvas"
            data-chose="none"
            data-path="none"
            style="position: relative; width: ${n.w}px; height: ${n.h}px; overflow: hidden; touch-action: none; user-select: none; cursor: crosshair"
          >
            <span class="sp-context" style="position: absolute; inset: 0">
              <span style="position: absolute; left: 26px; top: 26px; width: 88px; height: 54px; border-radius: 6px; background: var(--sp-sunken)"></span>
              <span style="position: absolute; left: 40px; top: 110px; width: 62px; height: 48px; border-radius: 50%; background: var(--sp-sunken)"></span>
              <span style="position: absolute; left: 300px; top: 40px; width: 72px; height: 102px; border-radius: 6px; background: var(--sp-sunken)"></span>
            </span>

            <span style="position: absolute; inset: 0; pointer-events: none; z-index: 2">
              ${d(`press-point`,r.x,r.y)}
              ${d(`mark-north`,r.x,r.y-i-6)}
            </span>

            <span
              data-part="ring"
              data-subject
              style="position: absolute; left: ${r.x-o/2}px; top: ${r.y-o/2}px; width: ${o}px; height: ${o}px; opacity: 0; visibility: hidden; transition: opacity 0.14s, visibility 0.14s; z-index: 3"
            >
              <span style="position: absolute; inset: ${a}px; border-radius: 50%; border: 2px dashed var(--sp-accent); background: var(--sp-surface)"></span>
              ${u}
            </span>
          </div>

          <span
            class="sp-label sp-context"
            data-part="echo"
            style="width: ${n.w}px; text-align: center; white-space: nowrap"
          >Nothing run yet</span>
        </div>
      </div>
    </div>
  `;let m=e(f,`canvas`),h=e(f,`ring`),g=e(f,`echo`),_,v,y=!1,b=t=>{for(let n of l){let r=e(f,`sector-${n.key}`);n.key===t?r.setAttribute(`data-selected`,``):r.removeAttribute(`data-selected`)}},x=e=>{y=e,h.style.opacity=e?`1`:`0`,h.style.visibility=e?`visible`:`hidden`,e||b(void 0)},S=(e,t)=>{if(!(Math.hypot(e,t)<c))return l.reduce((n,r)=>r.dx*e+r.dy*t>n.dx*e+n.dy*t?r:n)},C=(e,t)=>{if(p.clearTimeout(_),_=void 0,x(!1),m.dataset.chose=e.key,m.dataset.path=t,t===`mark`){g.textContent=`${e.label} ran from a mark to the ${e.dir}`;return}g.textContent=`${e.label} ran from the drawn menu`};m.addEventListener(`pointerdown`,e=>{h.contains(e.target)||(e.isTrusted&&m.setPointerCapture(e.pointerId),p.clearTimeout(_),x(!1),m.dataset.path=`none`,v=t(e,f),_=p.setTimeout(()=>{_=void 0,x(!0),m.dataset.path=`ring`},s))}),f.addEventListener(`pointermove`,e=>{if(!v)return;let n=t(e,f),r=n.x-v.x,i=n.y-v.y;Math.hypot(r,i)>=c&&_!==void 0&&(p.clearTimeout(_),_=void 0,m.dataset.path=`mark`),y&&b(S(r,i)?.key)});let w=e=>{if(!v)return;let n=v;v=void 0;let r=t(e,f),i=S(r.x-n.x,r.y-n.y);if(i)return C(i,y?`ring`:`mark`);p.clearTimeout(_),_=void 0,x(!0),m.dataset.path=`ring`};f.addEventListener(`pointerup`,w),f.addEventListener(`pointercancel`,w);for(let t of l)e(f,`sector-${t.key}`).addEventListener(`click`,()=>C(t,`ring`))}export{f as mount};