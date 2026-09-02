import{n as e,t}from"./parts.C-YLuC7Q.js";var n=20,r=44,i=6,a=3.2,o=320,s=1280,c=20,l=[320,800,1280],u=`Made to measure`,d=54,f=e=>i+a*e/100,p=e=>Math.min(r,Math.max(n,e)),m=e=>e<=n?`min`:e>=r?`max`:`preferred`,h=e=>(e-o)/960*100,g=e=>Math.min(s,Math.max(o,Math.round(e/c)*c));function _(_){_.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 462px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label" id="vd-fluid-label">Simulated viewport width</span>
          <span class="sp-text sp-text--ink" data-part="width"
                style="width: 74px; text-align: right; font-variant-numeric: tabular-nums"></span>
        </div>
        <div class="sp-field sp-context" style="margin-top: 8px; gap: 2px">
          <div class="sp-slider" data-part="slider" style="touch-action: none">
            <div class="sp-slider-track" data-part="track">
              <div class="sp-slider-fill"></div>
              <div class="sp-slider-thumb" data-part="thumb" role="slider" tabindex="0"
                   aria-labelledby="vd-fluid-label" aria-valuemin="${o}" aria-valuemax="${s}"></div>
            </div>
          </div>
          <div data-part="scale" aria-hidden="true" style="position: relative; height: 15px">${l.map(e=>`<span class="sp-text" data-part="stop-${e}" style="position: absolute; left: ${h(e)}%; translate: -50% 0; font-size: 11px">${e}</span>`).join(``)}</div>
        </div>
        <div class="sp-divider sp-context" style="margin: 10px 0 12px"></div>
        <div class="sp-row" data-part="heading-box" style="height: ${d}px">
          <span data-part="heading" data-subject
                style="font-weight: 600; line-height: 1.15; white-space: nowrap">${u}</span>
        </div>
        <div class="sp-row sp-row--wrap sp-context" data-part="bounds" style="gap: 6px; margin-top: 4px">${[`min`,`preferred`,`max`].map(e=>`<span class="sp-chip" data-part="bound-${e}" style="cursor: default"></span>`).join(``)}</div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">
          font-size: clamp(${n}px, ${i}px + ${a}vw, ${r}px). The lit term is the one in force:
          the floor and the ceiling hold flat, and between them the size is a straight line.
        </p>
      </div>
    </div>
  `;let v=e(_,`slider`),y=e(_,`track`),b=e(_,`thumb`),x=e(_,`heading`),S=e(_,`width`),C={min:e(_,`bound-min`),preferred:e(_,`bound-preferred`),max:e(_,`bound-max`)},w=760,T,E=()=>{let e=f(w),o=p(e),s=m(e),c=`${h(w)}%`;v.style.setProperty(`--sp-to`,c),v.style.setProperty(`--sp-at`,c),b.setAttribute(`aria-valuenow`,String(w)),b.setAttribute(`aria-valuetext`,`${w}px viewport`),S.textContent=`${w}px`,x.style.fontSize=`${o.toFixed(2)}px`,x.dataset.bound=s,x.dataset.size=o.toFixed(1),C.min.textContent=`min ${n}px`,C.preferred.textContent=`${i}px + ${a}vw = ${e.toFixed(1)}px`,C.max.textContent=`max ${r}px`;for(let[e,n]of Object.entries(C))t(n,`data-selected`,e===s)},D=e=>{let t=y.getBoundingClientRect();return t.width===0?w:g(o+(e-t.left)/t.width*960)},O=e=>{let t=y.getBoundingClientRect();return t.left+h(e)/100*t.width};E(),v.addEventListener(`pointerdown`,e=>{if(e.isTrusted&&v.setPointerCapture(e.pointerId),e.target===b){T=e.clientX-O(w);return}T=0,w=D(e.clientX),E()}),_.addEventListener(`pointermove`,e=>{if(T===void 0)return;let t=D(e.clientX-T);t!==w&&(w=t,E())}),_.addEventListener(`pointerup`,()=>{T=void 0}),_.addEventListener(`pointercancel`,()=>{T=void 0}),b.addEventListener(`keydown`,e=>{let t={ArrowRight:c,ArrowUp:c,ArrowLeft:-20,ArrowDown:-20}[e.key],n=w;if(t!==void 0)n=g(w+t);else if(e.key===`Home`)n=o;else if(e.key===`End`)n=s;else return;e.preventDefault(),n!==w&&(w=n,E())})}export{_ as mount};