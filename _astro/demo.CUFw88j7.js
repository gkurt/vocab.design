import{n as e}from"./parts.C-YLuC7Q.js";var t=Math.PI/180,n=e=>e*e*e,r=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055,i=e=>Math.min(1,Math.max(0,e));function a(e,r,i){let a=r*Math.cos(i*t),o=r*Math.sin(i*t),s=n(e+.3963377774*a+.2158037573*o),c=n(e-.1055613458*a-.0638541728*o),l=n(e-.0894841775*a-1.291485548*o);return[4.0767416621*s-3.3077115913*c+.2309699292*l,-1.2684380046*s+2.6097574011*c-.3413193965*l,-.0041960863*s-.7034186147*c+1.707614701*l]}var o=([e,t,n])=>[e,t,n].every(e=>e>=0&&e<=1),s=([e,t,n])=>.2126*e+.7152*t+.0722*n,c=e=>e>.008856?116*Math.cbrt(Math.max(e,0))-16:903.3*Math.max(e,0);function l(e,t,n){let r=0,i=1;for(let o=0;o<40;o++){let o=(r+i)/2;c(s(a(o,e,t)))<n?r=o:i=o}return(r+i)/2}function u(e,t,n){if(o(a(l(n,e,t),n,e)))return n;let r=0,i=n;for(let n=0;n<22;n++){let n=(r+i)/2;o(a(l(n,e,t),n,e))?r=n:i=n}return r}function d(e,t,n){let o=u(e,n,t),d=a(l(o,e,n),o,e).map(i),f=s(d);return{css:`color(srgb ${d.map(e=>r(e).toFixed(6)).join(` `)})`,chroma:o,tone:c(f),contrast:1.05/(f+.05)}}var f=[{key:`hue`,label:`Hue`,min:0,max:360,step:10,start:300,stops:[30,150,300],format:e=>`${e}°`},{key:`chroma`,label:`Chroma`,min:0,max:.22,step:.01,start:.12,stops:[.04,.12,.2],format:e=>e.toFixed(2)},{key:`tone`,label:`Tone`,min:0,max:100,step:5,start:40,stops:[20,40,60,90],format:e=>String(e)}],p=(e,t)=>`${e.key}-${Math.round(e.key===`chroma`?t*100:t)}`;function m(t){let n=(e,t)=>(t-e.min)/(e.max-e.min)*100;t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context">
          <div class="sp-row" style="gap: 7px">
            <span class="sp-label">Against</span>
            <span class="sp-swatch" style="width: 20px; height: 15px; --sp-swatch: #FFFFFF;
                  box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.45)"></span>
            <span class="sp-text" style="font-size: 10px">white</span>
          </div>
          <div class="sp-row" style="gap: 7px">
            <span class="sp-label">Contrast</span>
            <span data-part="contrast"
                  style="font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -0.01em"></span>
          </div>
        </div>

        <div class="sp-swatch" data-part="swatch" data-subject
             style="height: 58px; margin-top: 11px; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)"></div>

        <p class="sp-text sp-context" data-part="read"
           style="margin: 4px 0 0; height: 26px; font-size: 9.5px; line-height: 1.35; font-variant-numeric: tabular-nums"></p>

        <div class="sp-stack" style="gap: 8px; margin-top: 10px">
          ${f.map(e=>`
    <div class="sp-row sp-context" style="gap: 8px; height: 22px">
      <span class="sp-label" style="flex: 0 0 52px">${e.label}</span>
      <div class="sp-slider" data-part="${e.key}-slider"
           style="flex: 1 1 auto; min-width: 0; --sp-to: ${n(e,e.start)}%; --sp-at: ${n(e,e.start)}%; touch-action: none">
        <div class="sp-slider-track" data-part="${e.key}-track">
          <div class="sp-slider-fill"></div>
          ${e.stops.map(t=>`<span data-part="${p(e,t)}" aria-hidden="true"
                               style="position: absolute; left: ${n(e,t)}%; top: -5px; width: 3px; height: 14px;
                                      border-radius: 2px; background: rgb(127 137 156 / 0.5); translate: -50% 0;
                                      pointer-events: none"></span>`).join(``)}
          <div class="sp-slider-thumb" data-part="${e.key}-thumb" role="slider" tabindex="0" aria-label="${e.label}"
               aria-valuemin="${e.min}" aria-valuemax="${e.max}" aria-valuenow="${e.start}"></div>
        </div>
      </div>
      <span class="sp-text sp-text--ink" data-part="${e.key}-value"
            style="flex: 0 0 54px; text-align: right; font-size: 11px; font-variant-numeric: tabular-nums">${e.format(e.start)}</span>
    </div>`).join(``)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 9px 0 0; height: 28px; font-size: 10px; line-height: 1.4">
          Hue and chroma move the colour without moving the number. Tone is CIE lightness, so it fixes the luminance and the
          contrast follows from tone alone.
        </p>
      </div>
    </div>
  `;let r=e(t,`swatch`),i={hue:300,chroma:.12,tone:40},a=()=>{let a=d(i.hue,i.chroma,i.tone);r.style.setProperty(`--sp-swatch`,a.css),r.dataset.hue=String(i.hue),r.dataset.tone=String(i.tone),r.dataset.contrast=a.contrast.toFixed(2),e(t,`contrast`).textContent=`${a.contrast.toFixed(2)}:1`;let o=a.chroma<i.chroma-5e-4;e(t,`read`).textContent=`hct(${i.hue} ${a.chroma.toFixed(3)} ${i.tone}) · measured L* ${a.tone.toFixed(1)}`+(o?` · chroma held at ${a.chroma.toFixed(3)} by sRGB`:``);for(let r of f){let a=`${n(r,i[r.key])}%`,o=e(t,`${r.key}-slider`);o.style.setProperty(`--sp-to`,a),o.style.setProperty(`--sp-at`,a),e(t,`${r.key}-value`).textContent=r.format(i[r.key]),e(t,`${r.key}-thumb`).setAttribute(`aria-valuenow`,String(i[r.key]))}};a();for(let r of f){let o=e(t,`${r.key}-slider`),s=e(t,`${r.key}-track`),c=e(t,`${r.key}-thumb`),l,u=e=>{let t=Math.round(e/r.step)*r.step;return Math.min(r.max,Math.max(r.min,Math.round(t*1e3)/1e3))},d=e=>{let t=s.getBoundingClientRect();return t.width===0?i[r.key]:u(r.min+(e-t.left)/t.width*(r.max-r.min))},f=e=>{let t=s.getBoundingClientRect();return t.left+n(r,e)/100*t.width};o.addEventListener(`pointerdown`,e=>{if(e.isTrusted&&o.setPointerCapture(e.pointerId),e.target===c){l=e.clientX-f(i[r.key]);return}l=0,i[r.key]=d(e.clientX),a()}),t.addEventListener(`pointermove`,e=>{if(l===void 0)return;let t=d(e.clientX-l);t!==i[r.key]&&(i[r.key]=t,a())});let p=()=>{l=void 0};t.addEventListener(`pointerup`,p),t.addEventListener(`pointercancel`,p),c.addEventListener(`keydown`,e=>{let t={ArrowRight:r.step,ArrowUp:r.step,ArrowLeft:-r.step,ArrowDown:-r.step}[e.key];if(t===void 0)return;e.preventDefault();let n=u(i[r.key]+t);n!==i[r.key]&&(i[r.key]=n,a())})}}export{m as mount};