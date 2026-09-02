import{n as e}from"./parts.C-YLuC7Q.js";var t={w:424,h:184},n={x:92,w:240},r=26,i=75,a=50,o=30,s=e=>Math.min(100,Math.max(0,e)),c=(e,t,n=``)=>`
  <div class="sp-slider" data-part="${e}" ${n} style="width: 100%; touch-action: none">
    <div class="sp-slider-track" data-part="${e}-track" style="--sp-from: 0%; --sp-to: ${o}%">
      <div class="sp-slider-fill"></div>
      <button
        class="sp-slider-thumb"
        data-part="${e}-thumb"
        type="button"
        role="slider"
        aria-label="${t}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${o}"
        style="--sp-at: ${o}%; touch-action: none; cursor: grab"
      ></button>
    </div>
  </div>
`;function l(l){l.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 282px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Monitor mix</span>
          <span class="sp-text" data-part="readout" style="width: 224px; text-align: right; white-space: nowrap">2 channels, live</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div style="position: relative; width: ${t.w}px; height: ${t.h}px">
            <span class="sp-label" style="position: absolute; left: 0; top: 18px; width: 84px">With capture</span>
            <span
              class="sp-label"
              data-part="capture-value"
              style="position: absolute; left: 0; top: 36px; width: 84px; color: var(--sp-ink); font-variant-numeric: tabular-nums"
            >${o}%</span>
            <div style="position: absolute; left: ${n.x}px; top: ${r}px; width: ${n.w}px">
              ${c(`capture`,`Monitor level`,`data-subject data-level="mid" data-state="idle"`)}
            </div>

            <div class="sp-context">
              <div class="sp-stack" style="position: absolute; left: 0; top: ${i}px; width: 84px; gap: 2px">
                <span class="sp-label">Without capture</span>
                <span
                  class="sp-label"
                  data-part="loose-value"
                  style="color: var(--sp-ink); font-variant-numeric: tabular-nums"
                >${o}%</span>
              </div>
              <div
                data-part="loose"
                data-state="idle"
                style="position: absolute; left: ${n.x}px; top: ${i}px; width: ${n.w}px; height: ${a}px; display: flex; align-items: center"
              >
                ${c(`loose`,`Cue level`)}
              </div>
              <span
                data-part="away"
                style="position: absolute; left: ${t.w-32}px; top: ${t.h-24}px; width: 10px; height: 10px; border-radius: 50%; background: var(--sp-ink)"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;let u=e(l,`capture`),d=e(l,`capture-track`),f=e(l,`capture-thumb`),p=e(l,`capture-value`),m=e(l,`loose`),h=e(l,`loose-track`),g=e(l,`loose-thumb`),_=e(l,`loose-value`),v=e(l,`readout`),y=(e,t,n,r)=>{let i=Math.round(r);return e.style.setProperty(`--sp-to`,`${r}%`),t.style.setProperty(`--sp-at`,`${r}%`),t.setAttribute(`aria-valuenow`,String(i)),n.textContent=`${i}%`,i},b=(e,t)=>{let n=e.getBoundingClientRect();return n.width===0?o:s((t-n.left)/n.width*100)},x;f.addEventListener(`pointerdown`,e=>{x=`capture`,u.dataset.state=`dragging`;try{f.setPointerCapture(e.pointerId)}catch{}v.textContent=`The thumb has the pointer`}),f.addEventListener(`pointermove`,e=>{if(x!==`capture`)return;let t=y(d,f,p,b(d,e.clientX));u.dataset.level=t>=99?`full`:t<=1?`none`:`mid`,v.textContent=`Off the track, still setting ${t}%`}),g.addEventListener(`pointerdown`,()=>{x=`loose`,m.dataset.state=`tracking`,v.textContent=`The twin has claimed nothing`}),g.addEventListener(`pointermove`,e=>{if(x!==`loose`)return;let t=m.getBoundingClientRect();if(!(e.clientX>=t.left&&e.clientX<=t.right&&e.clientY>=t.top&&e.clientY<=t.bottom)){x=void 0,m.dataset.state=`lost`,v.textContent=`Lost the pointer at ${_.textContent}`;return}y(h,g,_,b(h,e.clientX))});let S=()=>{x===`capture`&&(u.dataset.state=`idle`),x===`loose`&&(m.dataset.state=`idle`),x=void 0};f.addEventListener(`pointerup`,S),f.addEventListener(`pointercancel`,S),g.addEventListener(`pointerup`,S),g.addEventListener(`pointercancel`,S)}export{l as mount};