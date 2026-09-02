import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n=24,r=120,i=96/2,a=e=>String(e).padStart(2,`0`),o=Array.from({length:12},(e,t)=>t+1),s=Array.from({length:12},(e,t)=>t*5),c=[`AM`,`PM`],l=[1,.66,.4,.22],u=(e,t,r,a,o,s)=>`
  <div
    class="sp-grow${r?``:` sp-context`}"
    data-part="${e}-wheel"
    ${r?`data-subject`:``}
    role="listbox"
    aria-label="${t}"
    tabindex="0"
    style="position: relative; height: 100%; overflow: hidden; touch-action: none; cursor: grab"
  >
    <div data-part="${e}-track" style="position: absolute; left: 0; right: 0; top: 0; padding: ${i}px 0">
      ${a.map((e,t)=>`<div
            class="sp-option"
            data-part="${e}"
            role="option"
            aria-selected="${t===s}"
            style="display: flex; align-items: center; justify-content: center; height: ${n}px; padding: 0; border-radius: 0;
                   background: transparent; font-size: 15px; font-variant-numeric: tabular-nums; cursor: inherit"
          >${o[t]??``}</div>`).join(``)}
    </div>
  </div>`;function d(d){let f=o.map(e=>`hour-${e}`),p=s.map(e=>`min-${a(e)}`),m=c.map(e=>`mer-${e.toLowerCase()}`),h=o.map(a),g=s.map(a);d.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 452px; height: 284px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">New alarm</span>
          <span class="sp-label" style="font-size: 12px">Weekdays</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 312px; padding: 10px 12px 12px">
            <div class="sp-row sp-row--between sp-context" style="margin-bottom: 8px">
              <span class="sp-label">Wake at</span>
              <span
                data-part="readout"
                data-time="09:30 AM"
                role="status"
                style="font-size: 17px; font-weight: 600; font-variant-numeric: tabular-nums"
              >09:30 AM</span>
            </div>

            <div style="position: relative; height: ${r}px">
              <div
                class="sp-context"
                data-part="band"
                aria-hidden="true"
                style="position: absolute; left: 0; right: 0; top: ${i}px; height: ${n}px; border-radius: 6px;
                       background: var(--sp-accent-soft); border-top: 2px solid var(--sp-line); border-bottom: 2px solid var(--sp-line)"
              ></div>
              <div class="sp-row" style="position: relative; align-items: stretch; gap: 4px; height: 100%">
                ${u(`hour`,`Hour`,!0,f,h,8)}
                ${u(`minute`,`Minute`,!1,p,g,6)}
                ${u(`meridiem`,`AM or PM`,!1,m,c,0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let _=(t,n,r,i)=>({view:e(d,`${t}-wheel`),track:e(d,`${t}-track`),rows:n.map(t=>e(d,t)),labels:r,index:i}),v=_(`hour`,f,h,8),y=_(`minute`,p,g,6),b=_(`meridiem`,m,c,0),x=[v,y,b],S=e(d,`readout`),C=e=>e.labels[e.index]??``,w=e=>{e.rows.forEach((t,n)=>{let r=Math.min(Math.abs(n-e.index),3);t.style.opacity=String(l[r]??1),t.style.transform=`scale(${1-r*.06})`,t.style.fontWeight=r===0?`600`:`400`,t.setAttribute(`aria-selected`,String(r===0))}),e.view.dataset.value=C(e)},T=()=>{let e=`${C(v)}:${C(y)} ${C(b)}`;S.textContent=e,S.dataset.time=e},E=(e,t=0)=>{e.track.style.transform=`translateY(${-e.index*n+t}px)`},D=e=>{e.track.style.transition=`transform 0.16s var(--sp-ease)`,E(e)},O=(e,t)=>Math.min(e.rows.length-1,Math.max(0,t)),k;for(let e of x)e.view.addEventListener(`pointerdown`,n=>{e.track.style.transition=`none`,n.isTrusted&&e.view.setPointerCapture(n.pointerId),k={wheel:e,startY:t(n,d).y,startIndex:e.index}}),e.view.addEventListener(`keydown`,t=>{let n=t.key;if(n!==`ArrowDown`&&n!==`ArrowUp`)return;t.preventDefault();let r=O(e,e.index+(n===`ArrowDown`?1:-1));r!==e.index&&(e.index=r,D(e),w(e),T())});d.addEventListener(`pointermove`,e=>{if(!k)return;let r=t(e,d).y-k.startY,i=O(k.wheel,k.startIndex-Math.round(r/n));k.wheel.track.style.transform=`translateY(${-k.startIndex*n+r}px)`,i!==k.wheel.index&&(k.wheel.index=i,w(k.wheel),T())});let A=()=>{k&&=(D(k.wheel),void 0)};d.addEventListener(`pointerup`,A),d.addEventListener(`pointercancel`,A);for(let e of x)e.track.style.transition=`none`,E(e),w(e);T()}export{d as mount};