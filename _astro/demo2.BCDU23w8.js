import{n as e}from"./parts.C-YLuC7Q.js";import{r as t}from"./measure.DK7AY2_i.js";var n=8,r={w:412,h:168},i={x:40,y:40,w:160,h:88},a={x:i.x+i.w/2,y:i.y+i.h/2},o={x:a.x+6,y:a.y+4},s={x:a.x+96,y:a.y},c=8,l=(e,t)=>`<span
     data-part="${e}"
     style="position: absolute; left: ${t.x-c/2}px; top: ${t.y-c/2}px; width: ${c}px; height: ${c}px"
   ></span>`,u=(e,t)=>Math.round(Math.hypot(e,t));function d(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 280px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Sprint board</span>
          <span class="sp-text" data-part="readout" style="width: 216px; text-align: right; white-space: nowrap">No stroke yet</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div data-part="stage" style="position: relative; width: ${r.w}px; height: ${r.h}px">
            <div
              class="sp-surface"
              data-part="card"
              data-verdict="none"
              data-state="idle"
              data-subject
              style="position: absolute; left: ${i.x}px; top: ${i.y}px; width: ${i.w}px; height: ${i.h}px; padding: 10px 12px; transform: translate(0px, 0px); transition: none; cursor: grab; touch-action: none; user-select: none"
            >
              <span class="sp-heading" style="font-size: 13px">Ferry timetable</span>
              <span class="sp-text" style="display: block; margin-top: 4px; font-size: 12px">Due Thursday</span>
            </div>
            <div class="sp-context" style="position: absolute; inset: 0; pointer-events: none">
              <span
                data-part="ring"
                data-state="idle"
                style="position: absolute; left: ${a.x-n}px; top: ${a.y-n}px; width: 16px; height: 16px; border: 1px dashed var(--sp-muted); border-radius: 50%"
              ></span>
              ${l(`twitch`,o)}
              ${l(`shove`,s)}
            </div>
          </div>
        </div>
        <div class="sp-topbar sp-context" style="border-bottom: 0; border-top: 1px solid var(--sp-line)">
          <span class="sp-label sp-grow" data-part="travel" style="font-variant-numeric: tabular-nums">0 px travelled, ${n} px needed</span>
        </div>
      </div>
    </div>
  `;let d=e(c,`stage`),f=e(c,`card`),p=e(c,`ring`),m=e(c,`readout`),h=e(c,`travel`),g,_={x:0,y:0},v,y=(e,t)=>{f.dataset.verdict=e,m.textContent=t};f.addEventListener(`pointerdown`,e=>{e.isTrusted&&f.setPointerCapture(e.pointerId);let r=t(e,d);g={x:e.clientX,y:e.clientY},v=void 0,p.style.left=`${r.x-n}px`,p.style.top=`${r.y-n}px`,p.dataset.state=`live`,f.dataset.state=`pressed`,h.textContent=`0 px travelled, ${n} px needed`,y(`none`,`Pressed: nothing has moved yet`)}),c.addEventListener(`pointermove`,e=>{if(!g)return;let t=e.clientX-g.x,r=e.clientY-g.y,i=Math.hypot(t,r);if(h.textContent=`${Math.round(i)} px travelled, ${n} px needed`,!v){if(i<n)return y(`none`,`Inside the ring: ${Math.round(i)} px`);v={x:t,y:r},f.dataset.state=`dragging`}f.style.transform=`translate(${_.x+t-v.x}px, ${_.y+r-v.y}px)`,y(`none`,`Dragging: ${Math.round(i)} px from the press`)});let b=e=>{if(!g)return;let t=e.clientX-g.x,n=e.clientY-g.y,r=u(t,n);if(g=void 0,p.dataset.state=`idle`,f.dataset.state=`idle`,!v)return y(`click`,`Released at ${r} px: a click`);_={x:_.x+t-v.x,y:_.y+n-v.y},v=void 0,y(`drag`,`Dragged ${r} px: the card moved`)};c.addEventListener(`pointerup`,b),c.addEventListener(`pointercancel`,b)}export{d as mount};