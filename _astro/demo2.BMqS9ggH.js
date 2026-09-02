import{n as e,t}from"./parts.C-YLuC7Q.js";import{r as n}from"./measure.DK7AY2_i.js";var r=[{label:`Off`,value:`0%`},{label:`Low`,value:`25%`},{label:`Medium`,value:`50%`},{label:`High`,value:`75%`},{label:`Max`,value:`100%`}],i=380,a={w:32,h:24},o={from:a.w/2+4,to:i-a.w/2-4},s=14,c=200,l=e=>o.from+e*(o.to-o.from)/(r.length-1),u=r.map((e,t)=>`
    <span
      data-part="well-${t}"
      ${t===2?`data-subject`:``}
      style="position: absolute; left: ${l(t)-11}px; top: 27px; width: 22px; height: 16px; border-radius: 5px;
             box-shadow: inset 0 0 0 2px var(--sp-line)"
    ></span>`).join(``),d=r.map(({label:e},t)=>`
    <span class="sp-label" style="position: absolute; left: ${l(t)}px; top: 50px; transform: translateX(-50%); font-size: 10px; white-space: nowrap">${e}</span>`).join(``);function f(f,p){f.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Fan speed</span>
          <span class="sp-text" data-part="readout" style="flex: 0 0 auto; width: 232px; text-align: right; white-space: nowrap">Off (0%)</span>
        </div>
        <div
          class="sp-body"
          data-part="scene"
          data-detent="0"
          data-caught="none"
          data-settle="landed"
          style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px"
        >
          <div class="sp-surface" style="padding: 16px 20px 12px">
            <div data-part="rail" style="position: relative; width: ${i}px; height: 66px">
              <span
                style="position: absolute; left: 0; top: 20px; width: ${i}px; height: 30px; border-radius: 9px;
                       background: var(--sp-sunken); box-shadow: inset 0 0 0 1px var(--sp-line)"
              ></span>
              ${u}
              ${d}
              <span data-part="between" style="position: absolute; left: ${l(2)+24}px; top: 30px; width: 8px; height: 8px; pointer-events: none"></span>
              <span
                data-part="thumb"
                style="position: absolute; left: 0; top: 0; width: ${a.w}px; height: ${a.h}px; border-radius: 7px;
                       background: var(--sp-accent); transform: translateX(${o.from-a.w/2}px);
                       cursor: grab; touch-action: none; user-select: none"
              >
                <span
                  aria-hidden="true"
                  style="position: absolute; left: 50%; top: ${a.h}px; width: 4px; height: 11px; margin-left: -2px;
                         border-radius: 0 0 2px 2px; background: var(--sp-accent)"
                ></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let m=e(f,`scene`),h=e(f,`rail`),g=e(f,`thumb`),_=e(f,`readout`),v=r.map((t,n)=>e(f,`well-${n}`)),y=l(0),b=0,x,S=0,C=new Map,w=e=>{y=Math.max(o.from,Math.min(o.to,e)),g.style.transform=`translateX(${y-a.w/2}px)`},T=()=>{let e=0;for(let t=1;t<r.length;t++)Math.abs(l(t)-y)<Math.abs(l(e)-y)&&(e=t);return e},E=e=>{let n=v[e];n&&(t(n,`data-hit`,!0),n.style.boxShadow=`inset 0 0 0 2px var(--sp-accent)`,p.clearTimeout(C.get(e)),C.set(e,p.setTimeout(()=>{t(n,`data-hit`,!1),n.style.boxShadow=`inset 0 0 0 2px var(--sp-line)`},c)))},D=()=>{let e=b===void 0?void 0:r[b];if(m.dataset.detent=b===void 0?`free`:String(b),e)return void(_.textContent=`${e.label} (${e.value})`);let t=r[T()];_.textContent=`Between wells${t?` (nearest ${t.label})`:``}`},O=e=>{e!==b&&(e!==void 0&&(S+=1,m.dataset.caught=S>1?`many`:`one`,E(e)),b=e,D())};g.addEventListener(`pointerdown`,e=>{e.isTrusted&&g.setPointerCapture(e.pointerId),x={x:n(e,h).x,centre:y},S=0,m.dataset.caught=`none`,m.dataset.settle=`holding`,g.style.transition=`none`,g.style.cursor=`grabbing`}),g.addEventListener(`pointermove`,e=>{if(!x)return;let t=x.centre+(n(e,h).x-x.x),i;for(let e=0;e<r.length;e++)Math.abs(t-l(e))<=s&&(i=e);w(i===void 0?t:l(i)),O(i)});let k=()=>{if(!x)return;x=void 0,g.style.cursor=`grab`,g.style.transition=`transform 130ms var(--sp-ease)`;let e=b!==void 0;m.dataset.settle=e?`landed`:`pulled`;let t=e?b:T();w(l(t)),e||E(t),b=t,D()};g.addEventListener(`pointerup`,k),g.addEventListener(`pointercancel`,k)}export{f as mount};