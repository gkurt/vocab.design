import{n as e}from"./parts.C-YLuC7Q.js";var t=0,n=1e3,r=50,i=[0,200,400,600,800,1e3],a=e=>`$${e}`,o=e=>(e-t)/1e3*100,s=e=>Math.min(n,Math.max(t,Math.round(e/r)*r));function c(c){c.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 340px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Stays in Lisbon</span>
          <span class="sp-text" data-part="results" style="width: 84px; text-align: right">51 places</span>
        </div>
        <div class="sp-field" style="margin-top: 18px; gap: 8px">
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-label">Price per night</span>
            <span
              class="sp-text sp-text--ink"
              data-part="readout"
              style="width: 116px; text-align: right; font-variant-numeric: tabular-nums"
            >$200 to $800</span>
          </div>
          <div class="sp-slider" data-part="range" data-subject data-lower="200" data-upper="800" style="--sp-from: 20%; --sp-to: 80%; touch-action: none">
            <div class="sp-slider-track" data-part="track">
              <div class="sp-slider-fill"></div>
              <button
                class="sp-slider-thumb"
                type="button"
                data-part="thumb-min"
                role="slider"
                aria-label="Minimum price"
                aria-valuemin="${t}"
                aria-valuemax="800"
                aria-valuenow="200"
                aria-valuetext="$200"
                style="--sp-at: 20%"
              ></button>
              <button
                class="sp-slider-thumb"
                type="button"
                data-part="thumb-max"
                role="slider"
                aria-label="Maximum price"
                aria-valuemin="200"
                aria-valuemax="${n}"
                aria-valuenow="800"
                aria-valuetext="$800"
                style="--sp-at: 80%"
              ></button>
            </div>
          </div>
          <div class="sp-context" data-part="scale" aria-hidden="true" style="position: relative; height: 15px">${i.map(e=>`<span class="sp-text" data-part="stop-${e}" style="position: absolute; left: ${o(e)}%; translate: -50% 0; font-size: 11px">${a(e)}</span>`).join(``)}</div>
        </div>
        <div class="sp-row sp-context" style="margin-top: 16px">
          <button class="sp-chip" type="button" data-selected>Free cancellation</button>
          <button class="sp-chip" type="button">Kitchen</button>
        </div>
      </div>
    </div>
  `;let l=e(c,`range`),u=e(c,`track`),d={min:e(c,`thumb-min`),max:e(c,`thumb-max`)},f=e(c,`readout`),p=e(c,`results`),m=200,h=800,g,_=0,v=()=>{l.style.setProperty(`--sp-from`,`${o(m)}%`),l.style.setProperty(`--sp-to`,`${o(h)}%`),l.dataset.lower=String(m),l.dataset.upper=String(h),d.min.style.setProperty(`--sp-at`,`${o(m)}%`),d.max.style.setProperty(`--sp-at`,`${o(h)}%`),d.min.setAttribute(`aria-valuenow`,String(m)),d.min.setAttribute(`aria-valuetext`,a(m)),d.min.setAttribute(`aria-valuemax`,String(h)),d.max.setAttribute(`aria-valuenow`,String(h)),d.max.setAttribute(`aria-valuetext`,a(h)),d.max.setAttribute(`aria-valuemin`,String(m)),f.textContent=`${a(m)} to ${a(h)}`,p.textContent=`${8+Math.round((h-m)/14)} places`},y=(e,r)=>{e===`min`?m=Math.min(Math.max(r,t),h):h=Math.max(Math.min(r,n),m),v()},b=e=>{let n=u.getBoundingClientRect();return n.width===0?m:s(t+(e-n.left)/n.width*1e3)},x=e=>{let t=u.getBoundingClientRect();return t.left+o(e)/100*t.width};v(),l.addEventListener(`pointerdown`,e=>{e.isTrusted&&l.setPointerCapture(e.pointerId);let t=e.target;if(t===d.min||t===d.max){g=t===d.min?`min`:`max`,_=e.clientX-x(g===`min`?m:h);return}let n=b(e.clientX);g=Math.abs(n-m)<=Math.abs(n-h)?`min`:`max`,_=0,y(g,n)}),c.addEventListener(`pointermove`,e=>{g&&y(g,b(e.clientX-_))});let S=()=>{g=void 0};c.addEventListener(`pointerup`,S),c.addEventListener(`pointercancel`,S);for(let e of[`min`,`max`])d[e].addEventListener(`keydown`,i=>{let a={ArrowRight:r,ArrowUp:r,ArrowLeft:-50,ArrowDown:-50,PageUp:200,PageDown:-200},o=e===`min`?m:h,c=a[i.key],l=o;if(c!==void 0)l=s(o+c);else if(i.key===`Home`)l=t;else if(i.key===`End`)l=n;else return;i.preventDefault(),y(e,l)})}export{c as mount};