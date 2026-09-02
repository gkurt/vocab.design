import{n as e}from"./parts.C-YLuC7Q.js";var t=200,n=120,r=[0,120,240,360],i=`linear-gradient(to right, #ff0000, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000)`,a=(e,t=0,n=100)=>Math.min(n,Math.max(t,e));function o(e,t,n){let r=n/100*(t/100),i=r*(1-Math.abs(e/60%2-1)),a=n/100-r,o=Math.floor(e%360/60);return`#${[[r,i,0],[i,r,0],[0,r,i],[0,i,r],[i,0,r],[r,0,i]][o].map(e=>Math.round((e+a)*255).toString(16).padStart(2,`0`)).join(``)}`}function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame" style="width: 268px; height: 320px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Theme</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <div
            class="sp-surface sp-stack"
            data-part="picker"
            data-subject
            role="group"
            aria-label="Accent colour"
            style="gap: 10px; padding: 12px; width: 224px; align-self: center"
          >
            <div
              data-part="field"
              style="position: relative; width: ${t}px; height: ${n}px; border-radius: 6px; touch-action: none; cursor: crosshair; background-image: linear-gradient(to top, #000000, rgb(0 0 0 / 0)), linear-gradient(to right, #ffffff, var(--sp-field-hue, #ff0000))"
            >
              <button
                class="sp-slider-thumb"
                type="button"
                data-part="field-thumb"
                aria-label="Saturation and brightness"
                style="border: 2px solid #ffffff; box-shadow: 0 0 0 1px rgb(16 24 40 / 0.4); cursor: grab"
              ></button>
            </div>
            <div class="sp-slider" data-part="hue" style="touch-action: none">
              <div class="sp-slider-track" data-part="hue-track" style="height: 10px; border-radius: 999px; background: ${i}">
                <button
                  class="sp-slider-thumb"
                  type="button"
                  data-part="hue-thumb"
                  role="slider"
                  aria-label="Hue"
                  aria-valuemin="0"
                  aria-valuemax="360"
                  aria-valuenow="0"
                  style="width: 16px; height: 16px; border: 2px solid #ffffff; box-shadow: 0 0 0 1px rgb(16 24 40 / 0.4)"
                ></button>
              </div>
            </div>
            <div aria-hidden="true" style="position: relative; height: 14px">${r.map(e=>`<span class="sp-text" data-part="stop-hue-${e}" style="position: absolute; left: ${e/360*100}%; translate: -50% 0; font-size: 11px">${e}</span>`).join(``)}</div>
            <div class="sp-row">
              <span class="sp-swatch" data-part="swatch" style="width: 28px; height: 28px; border: 1px solid var(--sp-line)"></span>
              <span
                class="sp-text sp-text--ink sp-grow"
                data-part="hex"
                style="text-align: right; font-variant-numeric: tabular-nums; letter-spacing: 0.02em"
              ></span>
            </div>
          </div>
          <div class="sp-row sp-row--between">
            <span class="sp-label">Applied to</span>
            <span class="sp-row" style="gap: 6px">
              <span class="sp-text">Links and charts</span>
              <span class="sp-swatch" data-part="applied" style="width: 18px; height: 18px; border: 1px solid var(--sp-line)"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;let c=e(s,`picker`),l=e(s,`field`),u=e(s,`field-thumb`),d=e(s,`hue-track`),f=e(s,`hue-thumb`),p=e(s,`swatch`),m=e(s,`hex`),h=e(s,`applied`),g=210,_=78,v=90,y,b=()=>{let e=o(g,_,v);l.style.setProperty(`--sp-field-hue`,o(g,100,100)),u.style.setProperty(`--sp-at`,`${_}%`),u.style.top=`${100-v}%`,u.style.background=e,f.style.setProperty(`--sp-at`,`${g/360*100}%`),f.style.background=o(g,100,100),f.setAttribute(`aria-valuenow`,String(g)),f.setAttribute(`aria-valuetext`,`${g} degrees`),p.style.setProperty(`--sp-swatch`,e),h.style.setProperty(`--sp-swatch`,e),m.textContent=e.toUpperCase(),c.dataset.value=e,c.dataset.hue=String(g),c.dataset.sat=String(_),c.dataset.val=String(v)},x=(e,t)=>{let n=l.getBoundingClientRect();n.width!==0&&n.height!==0&&(_=Math.round(a((e-n.left)/n.width*100)),v=Math.round(a(100-(t-n.top)/n.height*100)),b())},S=e=>{let t=d.getBoundingClientRect();t.width!==0&&(g=Math.round(a((e-t.left)/t.width*360,0,360)),b())},C=e(s,`hue`);l.addEventListener(`pointerdown`,e=>{y=`field`,e.isTrusted&&l.setPointerCapture(e.pointerId),e.target!==u&&x(e.clientX,e.clientY)}),C.addEventListener(`pointerdown`,e=>{y=`hue`,e.isTrusted&&C.setPointerCapture(e.pointerId),e.target!==f&&S(e.clientX)}),s.addEventListener(`pointermove`,e=>{y===`field`?x(e.clientX,e.clientY):y===`hue`&&S(e.clientX)});let w=()=>{y=void 0};s.addEventListener(`pointerup`,w),s.addEventListener(`pointercancel`,w),u.addEventListener(`keydown`,e=>{let t={ArrowRight:[4,0],ArrowLeft:[-4,0],ArrowUp:[0,4],ArrowDown:[0,-4]}[e.key];t&&(e.preventDefault(),_=a(_+t[0]),v=a(v+t[1]),b())}),f.addEventListener(`keydown`,e=>{let t=e.key===`ArrowRight`||e.key===`ArrowUp`?6:e.key===`ArrowLeft`||e.key===`ArrowDown`?-6:0;t!==0&&(e.preventDefault(),g=Math.round(a(g+t,0,360)),b())}),b()}export{s as mount};