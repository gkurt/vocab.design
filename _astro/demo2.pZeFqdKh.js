import{n as e}from"./parts.C-YLuC7Q.js";var t=0,n=1e3,r=50,i=[0,250,500,750,1e3],a=e=>`$${e}`,o=e=>(e-t)/1e3*100,s=e=>Math.min(n,Math.max(t,Math.round(e/r)*r));function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Filters</span>
          <span class="sp-text" data-part="results" style="width: 92px; text-align: right">58 results</span>
        </div>
        <div class="sp-field" style="margin-top: 18px; gap: 8px">
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-label" id="vd-price-label">Max price</span>
            <span class="sp-text sp-text--ink" data-part="readout" style="width: 60px; text-align: right; font-variant-numeric: tabular-nums">$400</span>
          </div>
          <div class="sp-slider" data-part="slider" data-subject style="--sp-to: 40%; --sp-at: 40%; touch-action: none">
            <div class="sp-slider-track" data-part="track">
              <div class="sp-slider-fill"></div>
              <div
                class="sp-slider-thumb"
                data-part="thumb"
                role="slider"
                tabindex="0"
                aria-labelledby="vd-price-label"
                aria-valuemin="${t}"
                aria-valuemax="${n}"
                aria-valuenow="400"
                aria-valuetext="$400"
              ></div>
            </div>
          </div>
          <div class="sp-context" data-part="scale" aria-hidden="true" style="position: relative; height: 15px">${i.map(e=>`<span class="sp-text" data-part="stop-${e}" style="position: absolute; left: ${o(e)}%; translate: -50% 0; font-size: 11px">${a(e)}</span>`).join(``)}</div>
        </div>
        <div class="sp-row sp-context" style="margin-top: 16px">
          <button class="sp-chip" type="button" data-selected>In stock</button>
          <button class="sp-chip" type="button">Free shipping</button>
        </div>
      </div>
    </div>
  `;let l=e(c,`slider`),u=e(c,`track`),d=e(c,`thumb`),f=e(c,`readout`),p=e(c,`results`),m=400,h,g=()=>{let e=`${o(m)}%`;l.style.setProperty(`--sp-to`,e),l.style.setProperty(`--sp-at`,e),d.setAttribute(`aria-valuenow`,String(m)),d.setAttribute(`aria-valuetext`,a(m)),f.textContent=a(m),p.textContent=`${8+Math.round(m/8)} results`},_=e=>{let n=u.getBoundingClientRect();return n.width===0?m:s(t+(e-n.left)/n.width*1e3)},v=e=>{let t=u.getBoundingClientRect();return t.left+o(e)/100*t.width};g(),l.addEventListener(`pointerdown`,e=>{if(e.isTrusted&&l.setPointerCapture(e.pointerId),e.target===d){h=e.clientX-v(m);return}h=0,m=_(e.clientX),g()}),c.addEventListener(`pointermove`,e=>{if(h===void 0)return;let t=_(e.clientX-h);t!==m&&(m=t,g())}),c.addEventListener(`pointerup`,()=>{h=void 0}),c.addEventListener(`pointercancel`,()=>{h=void 0}),d.addEventListener(`keydown`,e=>{let i={ArrowRight:r,ArrowUp:r,ArrowLeft:-50,ArrowDown:-50,PageUp:200,PageDown:-200}[e.key],a=m;if(i!==void 0)a=s(m+i);else if(e.key===`Home`)a=t;else if(e.key===`End`)a=n;else return;e.preventDefault(),a!==m&&(m=a,g())})}export{c as mount};