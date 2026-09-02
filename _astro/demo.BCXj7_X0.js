import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n={w:300,h:160},r={w:480,h:240},i={x:r.w-n.w,y:r.h-n.h},a=40,o=(e,t)=>Math.min(0,Math.max(-t,Math.round(e))),s=(e,t)=>`<span style="position: absolute; ${t}; padding: 1px 5px; border-radius: 4px; background: rgb(255 255 255 / 0.78); color: #33403a; font-size: 11px; white-space: nowrap">${e}</span>`,c=`
  <div style="position: absolute; inset: 0; background: linear-gradient(150deg, #e2e8d2, #c6d6bb 60%, #b3c7ae)"></div>
  <div style="position: absolute; inset: 0; background-image: repeating-linear-gradient(0deg, rgb(90 110 90 / 0.12) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgb(90 110 90 / 0.12) 0 1px, transparent 1px 40px)"></div>
  <div style="position: absolute; left: 268px; top: 128px; width: 156px; height: 88px; border-radius: 48% 52% 40% 60%; background: #7fa8c4"></div>
  <div style="position: absolute; left: -20px; top: 74px; width: 300px; height: 8px; rotate: 9deg; background: #9fb2b8"></div>
  <div style="position: absolute; left: 96px; top: -30px; width: 7px; height: 300px; rotate: -14deg; background: #d8c9a8"></div>
  <div style="position: absolute; left: 40px; top: 22px; width: 62px; height: 34px; border-radius: 3px; background: #a9b79b"></div>
  <div style="position: absolute; left: 150px; top: 40px; width: 30px; height: 26px; border-radius: 3px; background: #b9a98d"></div>
  <div style="position: absolute; left: 356px; top: 44px; width: 44px; height: 30px; border-radius: 3px; background: #a9b79b"></div>
  ${s(`North ridge`,`left: 26px; top: 8px`)}
  ${s(`Mill road`,`left: 132px; top: 96px`)}
  ${s(`Harbour`,`left: 372px; top: 202px`)}
`;function l(s){let l={x:-Math.round(i.x/2),y:-Math.round(i.y/2)};s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Site survey</span>
          <span class="sp-label" data-part="offset" style="width: 92px; text-align: right; font-variant-numeric: tabular-nums">x ${-l.x} y ${-l.y}</span>
          <span class="sp-text" data-part="readout" style="width: 150px; text-align: right; white-space: nowrap">View centred</span>
        </div>
        <div class="sp-body" style="position: relative; display: flex; align-items: center; justify-content: center">
          <span
            data-part="corner-nw"
            aria-hidden="true"
            style="position: absolute; left: 0; top: 0; width: 66px; height: 15px; pointer-events: none"
          ></span>
          <span
            data-part="corner-se"
            aria-hidden="true"
            style="position: absolute; right: 0; bottom: 0; width: 66px; height: 15px; pointer-events: none"
          ></span>
          <div
            data-part="canvas"
            data-subject
            data-view="middle"
            role="application"
            tabindex="0"
            aria-label="Survey, pan with the arrow keys"
            style="position: relative; overflow: hidden; width: ${n.w}px; height: ${n.h}px; border-radius: var(--sp-radius); border: 1px solid var(--sp-line); cursor: grab; touch-action: none"
          >
            <div
              data-part="sheet"
              style="position: absolute; left: 0; top: 0; width: ${r.w}px; height: ${r.h}px; transform: translate(${l.x}px, ${l.y}px)"
            >${c}</div>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(s,`canvas`),d=e(s,`sheet`),f=e(s,`readout`),p=e(s,`offset`),m=l.x,h=l.y,g,_=e=>{d.style.transform=`translate(${m}px, ${h}px)`,p.textContent=`x ${-m} y ${-h}`;let t=m===0&&h===0,n=m===-i.x&&h===-i.y;u.dataset.view=n?`southeast`:t?`northwest`:`middle`,f.textContent=e},v=(e,t,n)=>{m=o(m+e,i.x),h=o(h+t,i.y),_(n)};u.addEventListener(`pointerdown`,e=>{e.isTrusted&&u.setPointerCapture(e.pointerId),g=t(e,s),u.style.cursor=`grabbing`,_(`Holding the survey`)}),s.addEventListener(`pointermove`,e=>{if(!g)return;let n=t(e,s);v(n.x-g.x,n.y-g.y,`Panning`),g=n});let y=()=>{if(!g)return;g=void 0,u.style.cursor=`grab`;let e=m===0||m===-i.x,t=h===0||h===-i.y;_(e&&t?`Clamped at the corner`:e||t?`Clamped at an edge`:`View moved`)};s.addEventListener(`pointerup`,y),s.addEventListener(`pointercancel`,y),u.addEventListener(`keydown`,e=>{let t={ArrowLeft:[a,0],ArrowRight:[-40,0],ArrowUp:[0,a],ArrowDown:[0,-40]}[e.key];if(t){e.preventDefault(),v(t[0],t[1],`Panned by key`);return}e.key===`Home`&&(e.preventDefault(),m=l.x,h=l.y,_(`Back to the middle`))})}export{l as mount};