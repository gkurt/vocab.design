import{n as e}from"./parts.C-YLuC7Q.js";var t=Math.PI/180,n=e=>e*e*e,r=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055,i=e=>Math.min(1,Math.max(0,e));function a(e,r,i){let a=r*Math.cos(i*t),o=r*Math.sin(i*t),s=n(e+.3963377774*a+.2158037573*o),c=n(e-.1055613458*a-.0638541728*o),l=n(e-.0894841775*a-1.291485548*o);return[4.0767416621*s-3.3077115913*c+.2309699292*l,-1.2684380046*s+2.6097574011*c-.3413193965*l,-.0041960863*s-.7034186147*c+1.707614701*l]}function o(e,n,r){let i=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*r),a=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*r),o=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*r),s=1.9779984951*i-2.428592205*a+.4505937099*o,c=.0259040371*i+.7827717662*a-.808675766*o;return(Math.atan2(c,s)/t+360)%360}var s=([e,t,n])=>[e,t,n].every(e=>e>=-5e-4&&e<=1.0005);function c(e,t){let n=0,r=d;if(s(a(e,r,t)))return r;for(let i=0;i<24;i++){let i=(n+r)/2;s(a(e,i,t))?n=i:r=i}return Math.round(n*1e3)/1e3}var l=.65,u=80,d=.34,f=.005,p=.3,m=c(l,u),h=[0,.085,.17,.255,.34],g=e=>e/d*100,_=e=>Math.min(d,Math.max(0,Math.round(e/f)*f)),v=e=>e.toFixed(3),y=e=>{let[t,n,r]=a(l,e,u);return[i(t),i(n),i(r)]},b=e=>`color(srgb ${y(e).map(r).map(e=>e.toFixed(4)).join(` `)})`,x=e=>Math.round(o(...y(e))),S=e=>Math.min(e,m),C=e=>`oklch(${l} ${v(S(e))} ${u})`;function w(t){let n=h.map(e=>`<span class="sp-text" data-part="stop-${Math.round(e*1e3)}" style="position: absolute; left: ${g(e)}%;
             translate: -50% 0; font-size: 10px">${e===0?`0`:e.toFixed(3).replace(/0$/,``)}</span>`).join(``);t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 444px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Requested</span>
          <span class="sp-text sp-text--ink" data-part="request"
                style="font-size: 11.5px; font-variant-numeric: tabular-nums">oklch(${l} ${v(p)} ${u})</span>
        </div>

        <div class="sp-field sp-context" style="margin-top: 11px; gap: 6px">
          <div class="sp-row sp-row--between">
            <span class="sp-label">Chroma</span>
            <span class="sp-text sp-text--ink" data-part="chroma"
                  style="width: 60px; text-align: right; font-size: 11.5px; font-variant-numeric: tabular-nums">${v(p)}</span>
          </div>
          <div class="sp-slider" data-part="slider" style="--sp-to: ${g(p)}%; --sp-at: ${g(p)}%; touch-action: none">
            <div class="sp-slider-track" data-part="track">
              <div class="sp-slider-fill"></div>
              <span data-part="boundary" style="position: absolute; left: ${g(m)}%; top: -8px; width: 3px; height: 20px;
                    border-radius: 2px; background: var(--sp-ink); translate: -50% 0"></span>
              <div class="sp-slider-thumb" data-part="thumb" role="slider" tabindex="0" aria-label="Chroma"
                   aria-valuemin="0" aria-valuemax="${d}" aria-valuenow="${p}" aria-valuetext="${v(p)}"></div>
            </div>
          </div>
          <div data-part="scale" aria-hidden="true" style="position: relative; height: 14px">${n}</div>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 11px; align-items: flex-start">
          <div class="sp-stack sp-context" style="flex: 1 1 0; min-width: 0; gap: 5px">
            <div class="sp-swatch" data-part="clipped" style="height: 58px;
                 box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35); --sp-swatch: ${b(p)}"></div>
            <span class="sp-label">Channels clamped</span>
            <span class="sp-text" data-part="clip-read" style="font-size: 10.5px">hue ${u} lands at ${x(p)}</span>
          </div>

          <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 5px">
            <div class="sp-swatch" data-part="mapped" data-subject data-pose="[data-fit=outside]" data-fit="outside"
                 style="height: 58px; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35); --sp-swatch: ${C(p)}"></div>
            <span class="sp-label sp-context">Chroma reduced</span>
            <span class="sp-text sp-context" data-part="map-read"
                  style="font-size: 10.5px">hue ${u} held at chroma ${v(S(p))}</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 9px 0 0; height: 28px; font-size: 10.5px; line-height: 1.35">
          The mark on the track is where sRGB runs out. Past it, clamping keeps the chroma and loses the hue; mapping keeps
          the hue and gives up chroma.
        </p>
      </div>
    </div>
  `;let r=e(t,`slider`),i=e(t,`track`),a=e(t,`thumb`),o=e(t,`clipped`),s=e(t,`mapped`),c=p,y,w=()=>{let n=`${g(c)}%`;r.style.setProperty(`--sp-to`,n),r.style.setProperty(`--sp-at`,n),a.setAttribute(`aria-valuenow`,v(c)),a.setAttribute(`aria-valuetext`,v(c)),e(t,`request`).textContent=`oklch(${l} ${v(c)} ${u})`,e(t,`chroma`).textContent=v(c),o.style.setProperty(`--sp-swatch`,b(c)),s.style.setProperty(`--sp-swatch`,C(c)),s.dataset.fit=c>m?`outside`:`inside`,e(t,`clip-read`).textContent=`hue ${u} lands at ${x(c)}`,e(t,`map-read`).textContent=c>m?`hue ${u} held at chroma ${v(m)}`:`inside sRGB already, nothing to map`},T=e=>{let t=i.getBoundingClientRect();return t.width===0?c:_((e-t.left)/t.width*d)},E=e=>{let t=i.getBoundingClientRect();return t.left+g(e)/100*t.width};w(),r.addEventListener(`pointerdown`,e=>{if(e.isTrusted&&r.setPointerCapture(e.pointerId),e.target===a){y=e.clientX-E(c);return}y=0,c=T(e.clientX),w()}),t.addEventListener(`pointermove`,e=>{if(y===void 0)return;let t=T(e.clientX-y);t!==c&&(c=t,w())}),t.addEventListener(`pointerup`,()=>{y=void 0}),t.addEventListener(`pointercancel`,()=>{y=void 0}),a.addEventListener(`keydown`,e=>{let t={ArrowRight:f,ArrowUp:f,ArrowLeft:-.005,ArrowDown:-.005}[e.key];if(t===void 0)return;e.preventDefault();let n=_(c+t);n!==c&&(c=n,w())})}export{w as mount};