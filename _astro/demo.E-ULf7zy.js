import{a as e}from"./touch.Bg97t8LB.js";import{n as t}from"./parts.C-YLuC7Q.js";var n={w:300,h:150},r=25,i=5;function a(a){a.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Photos</span>
          <span class="sp-text" data-part="readout" style="width: 228px; text-align: right; white-space: nowrap">Level</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px">
          <div
            class="sp-surface"
            data-part="canvas"
            data-subject
            data-touch
            data-contacts="0"
            data-gesture="rest"
            data-angle="0"
            style="position: relative; width: ${n.w}px; height: ${n.h}px; overflow: hidden; touch-action: none; user-select: none"
          >
            <span
              data-part="photo"
              style="position: absolute; inset: -70px; transform: rotate(0deg); transform-origin: 50% 50%; background: linear-gradient(#5c7fb0, #a8c2dc 46%, #d9c9a6 46%, #b79a68)"
            >
              <span style="position: absolute; left: 108px; top: 92px; width: 44px; height: 44px; border-radius: 50%; background: #f6dda0"></span>
              <span style="position: absolute; left: 0; right: 0; top: 50%; height: 3px; margin-top: -1.5px; background: rgb(16 24 40 / 0.42)"></span>
              <span style="position: absolute; left: 232px; top: 96px; width: 54px; height: 46px; background: rgb(16 24 40 / 0.38)"></span>
              <span style="position: absolute; left: 300px; top: 112px; width: 38px; height: 30px; background: rgb(16 24 40 / 0.28)"></span>
              <span style="position: absolute; left: 96px; top: 168px; width: 250px; height: 4px; background: rgb(255 255 255 / 0.35)"></span>
            </span>
          </div>
          <span
            class="sp-label sp-context"
            data-part="angle"
            style="width: ${n.w}px; text-align: center; font-variant-numeric: tabular-nums"
          >fingers level, photo turned 0&deg;</span>
        </div>
      </div>
    </div>
  `;let o=t(a,`canvas`),s=t(a,`photo`),c=t(a,`readout`),l=t(a,`angle`),u=0,d=0,f=0,p=e=>{c.textContent=e},m=e=>Math.abs(e)<=i?0:e,h=e=>{d=m(Math.max(-25,Math.min(r,e))),s.style.transform=`rotate(${d.toFixed(2)}deg)`;let t=Math.round(d);o.dataset.angle=String(t),l.textContent=t===0?`fingers level, photo turned 0°`:`fingers at ${t}°, photo turned ${t}°`};e(o,{onStart:()=>{f=u,o.dataset.gesture=`turning`,p(`Two contacts: turning`)},onPinch:(e,t)=>{h(f+t),p(d===0?`Snapped level`:`Turning: ${Math.round(d)}° off level`)},onEnd:()=>{u=d,o.dataset.gesture=Math.round(d)===0?`rest`:`turned`,p(`Turned to ${Math.round(d)}°`)}});let g=new Set;o.addEventListener(`pointerdown`,e=>{e.pointerType===`touch`?(g.add(e.pointerId),o.dataset.contacts=String(g.size),g.size===1&&p(`One contact: a turn needs two`)):e.ctrlKey||p(`A mouse turn holds Ctrl and drags`)});let _=e=>{g.delete(e.pointerId)&&(o.dataset.contacts=String(g.size))};o.addEventListener(`pointerup`,_),o.addEventListener(`pointercancel`,_),h(0)}export{a as mount};