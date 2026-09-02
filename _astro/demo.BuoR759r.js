import{a as e,t}from"./touch.Bg97t8LB.js";import{n}from"./parts.C-YLuC7Q.js";var r={w:300,h:150},i=2.6,a={0:`No contacts`,1:`One contact: a pan, not a pinch`,2:`Two contacts: pinching`,3:`Three contacts: not a pinch`};function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Photos</span>
          <span class="sp-text" data-part="readout" style="width: 220px; text-align: right; white-space: nowrap">No contacts</span>
        </div>
        <div class="sp-body" data-touch style="display: flex; flex-direction: column; align-items: center; gap: 8px">
          <div
            class="sp-surface"
            data-part="canvas"
            data-subject
            data-contacts="0"
            data-last="0"
            data-gesture="rest"
            data-scale="1.00"
            style="position: relative; width: ${r.w}px; height: ${r.h}px; overflow: hidden; touch-action: none; user-select: none"
          >
            <span
              data-part="photo"
              style="position: absolute; inset: 0; transform: scale(1); transform-origin: 50% 50%; background: linear-gradient(150deg, #24303d, #4a7290 58%, #8fb8c9)"
            >
              <span style="position: absolute; left: 34px; top: 20px; width: 52px; height: 52px; border-radius: 50%; background: #f0c37c"></span>
              <span style="position: absolute; left: 116px; top: 50px; width: 26px; height: 36px; background: rgb(16 24 40 / 0.46)"></span>
              <span style="position: absolute; left: 148px; top: 60px; width: 18px; height: 26px; background: rgb(16 24 40 / 0.34)"></span>
              <span style="position: absolute; left: 172px; top: 42px; width: 14px; height: 44px; background: rgb(16 24 40 / 0.52)"></span>
              <span style="position: absolute; left: 0; right: 0; top: 86px; height: 2px; background: rgb(255 255 255 / 0.4)"></span>
              <span style="position: absolute; left: 0; right: 0; bottom: 0; height: 54px; background: linear-gradient(rgb(16 24 40 / 0), rgb(16 24 40 / 0.55))"></span>
            </span>
          </div>
          <span
            class="sp-label sp-context"
            data-part="resolved"
            style="width: ${r.w}px; text-align: center; font-variant-numeric: tabular-nums"
          >The surface has resolved 0 contacts</span>
        </div>
      </div>
    </div>
  `;let s=n(o,`canvas`),c=n(o,`photo`),l=n(o,`readout`),u=n(o,`resolved`),d=1,f=1,p=0,m=()=>{c.style.transform=`scale(${d.toFixed(3)})`,s.dataset.scale=d.toFixed(2)};t(s,{onChange:e=>{p=e,s.dataset.contacts=String(e),e>Number(s.dataset.last)&&(s.dataset.last=String(e)),s.dataset.gesture=e===0?`rest`:e===2?`pinch`:e===1?`pan`:`three`,l.textContent=a[Math.min(3,e)]??`Contacts down`,u.textContent=`The surface has resolved ${s.dataset.last} contacts`}}),e(s,{onStart:()=>{f=d},onPinch:e=>{p===2&&(d=Math.min(i,Math.max(1,f*e)),m(),l.textContent=`Two contacts: scale ${s.dataset.scale}`)},onEnd:()=>{f=d,p===2&&(l.textContent=`Pinched to scale ${s.dataset.scale}`)}}),m()}export{o as mount};