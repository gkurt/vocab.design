import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n={w:450,h:196},r=78,i=26,a=52,o=380,s=[{key:`crop`,label:`Crop`,deg:-90},{key:`rotate`,label:`Rotate`,deg:-30},{key:`filter`,label:`Filter`,deg:30},{key:`delete`,label:`Delete`,deg:90},{key:`share`,label:`Share`,deg:150},{key:`copy`,label:`Copy`,deg:-150}],c=(e,t)=>{let n=e*Math.PI/180;return{x:r+Math.cos(n)*t,y:r+Math.sin(n)*t}},l=(e,t)=>{let n=c(e,t);return`${n.x.toFixed(2)} ${n.y.toFixed(2)}`},u=e=>{let t=e-29,n=e+29;return`M ${l(t,i)} A ${i} ${i} 0 0 1 ${l(n,i)} L ${l(n,r)} A ${r} ${r} 0 0 0 ${l(t,r)} Z`},d=s.map(e=>`
    <path
      data-part="wedge-${e.key}"
      d="${u(e.deg)}"
      style="fill: var(--sp-surface); stroke: var(--sp-line); stroke-width: 1"
    ></path>`).join(``),f=s.map(e=>{let t=c(e.deg,a);return`
    <text
      x="${t.x.toFixed(2)}"
      y="${t.y.toFixed(2)}"
      text-anchor="middle"
      dominant-baseline="middle"
      style="font-size: 10.5px; font-weight: 500; fill: var(--sp-ink); pointer-events: none"
    >${e.label}</text>`}).join(``),p=(e,t,n)=>`
  <span
    data-part="${e}"
    style="position: absolute; left: ${t-6}px; top: ${n-6}px; width: 12px; height: 12px; pointer-events: none"
  ></span>`,m=[{name:`spot-left`,x:132,y:98},{name:`spot-right`,x:322,y:98}];function h(a,c){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: auto">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Library</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px">
          <div
            class="sp-surface"
            data-part="canvas"
            data-menu="closed"
            data-chose="none"
            data-last="none"
            style="position: relative; width: ${n.w}px; height: ${n.h}px; overflow: hidden; touch-action: none; user-select: none; cursor: crosshair"
          >
            <span class="sp-context" style="position: absolute; inset: 0">
              <span style="position: absolute; left: 18px; top: 20px; width: 96px; height: 68px; border-radius: 6px; background: var(--sp-sunken)"></span>
              <span style="position: absolute; left: 18px; top: 104px; width: 96px; height: 68px; border-radius: 6px; background: var(--sp-sunken)"></span>
              <span style="position: absolute; left: 130px; top: 20px; width: 140px; height: 152px; border-radius: 6px; background: var(--sp-sunken)"></span>
              <span style="position: absolute; left: 286px; top: 20px; width: 146px; height: 152px; border-radius: 6px; background: var(--sp-sunken)"></span>
            </span>

            ${m.map(e=>p(e.name,e.x,e.y)).join(``)}

            <svg
              data-part="ring"
              data-subject
              viewBox="0 0 156 156"
              width="156"
              height="156"
              role="img"
              aria-label="Radial menu of six commands"
              style="position: absolute; left: ${(m[0]?.x??0)-r}px; top: ${(m[0]?.y??0)-r}px; opacity: 0; visibility: hidden;
                     transition: opacity 0.14s, visibility 0.14s; filter: drop-shadow(0 4px 10px rgb(16 24 40 / 0.22))"
            >
              ${d}
              ${f}
              <circle data-part="hub" cx="${r}" cy="${r}" r="${i}" style="fill: var(--sp-surface); stroke: var(--sp-line); stroke-width: 1"></circle>
              <text
                data-part="hub-label"
                x="${r}"
                y="${r}"
                text-anchor="middle"
                dominant-baseline="middle"
                style="font-size: 10px; fill: var(--sp-muted); pointer-events: none"
              >None</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `;let l=e(a,`canvas`),u=e(a,`ring`),h=e(a,`hub-label`),g,_,v,y,b,x=!1,S=t=>{y=t;for(let n of s){let r=e(a,`wedge-${n.key}`),i=n.key===t?.key;r.style.fill=i?`var(--sp-accent-soft)`:`var(--sp-surface)`,r.style.stroke=i?`var(--sp-accent)`:`var(--sp-line)`}h.textContent=t?.label??`None`},C=e=>{x=e,l.dataset.menu=e?`open`:`closed`,u.style.opacity=e?`1`:`0`,u.style.visibility=e?`visible`:`hidden`,e||S(void 0)},w=e=>{c.clearTimeout(b),b=void 0,_=void 0,g=e.client,u.style.left=`${e.local.x-r}px`,u.style.top=`${e.local.y-r}px`,S(void 0),C(!0)},T=(e,t)=>{let n=Math.atan2(t,e)*180/Math.PI;return s.reduce((e,t)=>{let r=e=>Math.abs((n-e+540)%360-180);return r(t.deg)<r(e.deg)?t:e})},E=e=>{l.dataset.chose=e.key,l.dataset.last=e.key,C(!1)},D=()=>{l.dataset.last=`cancelled`,C(!1)};l.addEventListener(`pointerdown`,e=>{if(e.isTrusted&&l.setPointerCapture(e.pointerId),x){v=`pick`,S(void 0);return}v=`reveal`,c.clearTimeout(b);let n={client:{x:e.clientX,y:e.clientY},local:t(e,l)};_=n,b=c.setTimeout(()=>w(n),o)}),l.addEventListener(`pointermove`,e=>{if(!x||!g)return;let t=e.clientX-g.x,n=e.clientY-g.y;if(Math.hypot(t,n)<i){S(void 0);return}S(T(t,n))});let O=()=>{if(v===`reveal`){_&&w(_),v=void 0;return}v===`pick`&&(v=void 0,y?E(y):D())};l.addEventListener(`pointerup`,O),l.addEventListener(`pointercancel`,O)}export{h as mount};