import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./motion.B5_YXmsy.js";var n={w:320,h:156},r=n.w/2,i=14,a=900,o=n.w,s=r,c=e=>`inset(0 ${n.w-e}px 0 0)`,l=e=>`inset(0 ${e-r}px 0 0)`,u=e=>`translateX(${2*e-n.w}px)`,d=e=>`translateX(${e-i/2}px)`,f=(e,t)=>`
  <span class="sp-label" style="font-size: 11px">${e}</span>
  ${t.map(e=>`<span class="sp-line" style="display: block; width: ${e}%; margin-top: 9px"></span>`).join(``)}`,p=`position: absolute; top: 0; width: ${r}px; height: ${n.h}px; padding: 12px 14px;
                    background: var(--sp-surface)`;function m(m,h){m.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-page="1" data-state="rested" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Reader</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="back">Back</button>
          <button class="sp-button sp-button--sm" type="button" data-part="turn">Turn</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px">
          <div
            data-part="book"
            style="position: relative; width: ${n.w}px; height: ${n.h}px; border: 1px solid var(--sp-line);
                   border-radius: 6px; background: var(--sp-surface); overflow: hidden; box-shadow: var(--sp-shadow)"
          >
            <div class="sp-context">
              <div data-part="under-left" style="${p}; left: 0">${f(`1`,[100,100,84,100,62])}</div>
              <div data-part="under-right" style="${p}; left: ${r}px">${f(`4`,[100,92,100,76])}</div>
              <span style="position: absolute; left: ${r-1}px; top: 0; width: 2px; height: ${n.h}px; background: var(--sp-line)"></span>
            </div>

            <div data-part="page" data-subject style="position: absolute; inset: 0; pointer-events: none">
              <div
                data-part="leaf"
                style="${p}; left: ${r}px; clip-path: ${c(o)}"
              >${f(`2`,[100,88,100,100,70])}</div>
              <div
                data-part="flap"
                style="${p}; left: 0; background: var(--sp-sunken); clip-path: ${l(o)};
                       transform: ${u(o)}"
              >${f(`3`,[100,100,74,100])}</div>
              <span
                data-part="fold" aria-hidden="true"
                style="position: absolute; left: 0; top: 0; width: ${i}px; height: ${n.h}px; opacity: 0;
                       transform: ${d(o)};
                       background: linear-gradient(to right, rgb(0 0 0 / 0.18), rgb(255 255 255 / 0.5) 45%, rgb(0 0 0 / 0.1))"
              ></span>
            </div>
          </div>
          <span class="sp-label sp-context" data-part="readout" style="font-size: 11px">Spread 1: pages 1 and 2</span>
        </div>
      </div>
    </div>
  `;let g=e(m,`scene`),_=e(m,`leaf`),v=e(m,`flap`),y=e(m,`fold`),b=e(m,`readout`),x=t(m),S=[],C,w=e=>{for(let e of S)e.cancel();S=[],_.style.clipPath=c(e),v.style.clipPath=l(e),v.style.transform=u(e),y.style.transform=d(e),y.style.opacity=`0`,g.dataset.page=e===s?`2`:`1`,g.dataset.state=`rested`,b.textContent=e===s?`Spread 2: pages 3 and 4`:`Spread 1: pages 1 and 2`},T=(e,t)=>{h.clearTimeout(C);for(let e of S)e.cancel();if(x)return w(t);let n={duration:a,easing:`cubic-bezier(0.4, 0.05, 0.25, 1)`,fill:`forwards`};g.dataset.state=`turning`,S=[_.animate([{clipPath:c(e)},{clipPath:c(t)}],n),v.animate([{clipPath:l(e),transform:u(e)},{clipPath:l(t),transform:u(t)}],n),y.animate([{transform:d(e),opacity:0},{opacity:1,offset:.14},{opacity:1,offset:.86},{transform:d(t),opacity:0}],n)],C=h.setTimeout(()=>w(t),970)};e(m,`turn`).addEventListener(`click`,()=>T(o,s)),e(m,`back`).addEventListener(`click`,()=>T(s,o)),w(o)}export{m as mount};