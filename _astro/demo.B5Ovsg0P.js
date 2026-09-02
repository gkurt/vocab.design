import{n as e}from"./parts.C-YLuC7Q.js";import{t}from"./icons.CLHbLdSV.js";var n=16,r=84,i=50,a=4,o={sky:`linear-gradient(180deg, #ffdca8 0%, #ffab6b 46%, #ef7360 68%)`,sun:`#fff6d5`,glow:`rgb(255 208 106 / 0.55)`,hill:`#7b3f52`,ridge:`#54304a`,sea:`linear-gradient(180deg, #2d7290 0%, #123c58 100%)`},s={sky:`linear-gradient(180deg, #cdd0d6 0%, #adb1b8 46%, #90949c 68%)`,sun:`#e6e8ec`,glow:`rgb(220 222 226 / 0.5)`,hill:`#5f636b`,ridge:`#4b4f57`,sea:`linear-gradient(180deg, #787d86 0%, #555a63 100%)`},c=(e,t,n)=>`
  <div data-part="scene-${e}" style="position: absolute; inset: 0; background: ${t.sky}; ${n}">
    <div style="position: absolute; left: 62%; top: 14%; width: 46px; height: 46px; border-radius: 50%; background: ${t.sun}; box-shadow: 0 0 24px 9px ${t.glow}"></div>
    <div style="position: absolute; left: -8%; bottom: 34%; width: 58%; height: 32%; border-radius: 50% 50% 0 0; background: ${t.hill}"></div>
    <div style="position: absolute; left: 36%; bottom: 34%; width: 50%; height: 24%; border-radius: 50% 50% 0 0; background: ${t.ridge}"></div>
    <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 34%; background: ${t.sea}"></div>
  </div>`,l=(e,t,n)=>`
  <span
    data-part="chip-${e}"
    style="position: absolute; ${n}; bottom: 10px; padding: 3px 9px; border-radius: 999px;
           background: rgb(16 24 40 / 0.55); color: #ffffff; font-size: 11px; font-weight: 500; letter-spacing: 0.02em"
  >${t}</span>`;function u(u){u.innerHTML=`
    <div class="sp-app">
      <div class="sp-stack" style="gap: 10px">
        <div
          data-part="frame"
          data-subject
          style="position: relative; width: 430px; height: 186px; border: 1px solid var(--sp-line);
                 border-radius: var(--sp-radius); overflow: hidden; touch-action: none"
        >
          ${c(`after`,o,``)}
          ${c(`before`,s,`clip-path: inset(0 50% 0 0)`)}
          ${l(`before`,`Before`,`left: 10px`)}
          ${l(`after`,`After`,`right: 10px`)}
          <div
            data-part="divider"
            role="slider"
            tabindex="0"
            aria-label="Reveal the original"
            aria-valuemin="${n}"
            aria-valuemax="${r}"
            aria-valuenow="${i}"
            data-at="${i}"
            style="position: absolute; top: 0; bottom: 0; left: ${i}%; width: 2px; margin-left: -1px;
                   background: #ffffff; box-shadow: 0 0 0 1px rgb(16 24 40 / 0.28); cursor: col-resize"
          >
            <span
              data-part="handle"
              style="position: absolute; top: 50%; left: 50%; translate: -50% -50%; display: flex; align-items: center;
                     justify-content: center; width: 34px; height: 34px; border-radius: 50%; background: #ffffff;
                     color: #23262b; box-shadow: 0 1px 5px rgb(16 24 40 / 0.4); cursor: col-resize"
            ><span style="display: flex; margin: 0 -4px">${t(`chevronLeft`)}</span><span style="display: flex; margin: 0 -4px">${t(`chevronRight`)}</span></span>
          </div>
        </div>
        <div class="sp-row sp-context" style="width: 430px; justify-content: flex-end">
          <span class="sp-label" data-part="readout" style="width: 80px; text-align: right; font-variant-numeric: tabular-nums">Original ${i}%</span>
        </div>
      </div>
    </div>
  `;let d=e(u,`frame`),f=e(u,`divider`),p=e(u,`scene-before`),m=e(u,`readout`),h=i,g,_=e=>{h=Math.round(Math.min(r,Math.max(n,e))),f.style.left=`${h}%`,f.dataset.at=String(h),f.setAttribute(`aria-valuenow`,String(h)),f.setAttribute(`aria-valuetext`,`Original ${h} percent`),p.style.clipPath=`inset(0 ${100-h}% 0 0)`,m.textContent=`Original ${h}%`};f.addEventListener(`pointerdown`,e=>{e.isTrusted&&f.setPointerCapture(e.pointerId);let t=f.getBoundingClientRect();g=e.clientX-(t.left+t.width/2)}),u.addEventListener(`pointermove`,e=>{if(g===void 0)return;let t=d.getBoundingClientRect();t.width!==0&&_((e.clientX-g-t.left)/t.width*100)});let v=()=>{g=void 0};u.addEventListener(`pointerup`,v),u.addEventListener(`pointercancel`,v),f.addEventListener(`keydown`,e=>{if(e.key===`ArrowRight`||e.key===`ArrowUp`)_(h+a);else if(e.key===`ArrowLeft`||e.key===`ArrowDown`)_(h-a);else if(e.key===`Home`)_(n);else if(e.key===`End`)_(r);else return;e.preventDefault()}),_(i)}export{u as mount};