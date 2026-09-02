import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=5,n=20,r=Array.from({length:21},(e,n)=>n*t),i={none:`No marks: nothing says which values exist, or that any of them are special.`,scale:`Marks as a printed scale. The handle still rests anywhere, so marking is not snapping.`,detents:`The same coarse marks as stops: the handle lands on one, and the ones behind it light up.`},a=(e,t,n)=>Math.max(t,Math.min(n,e)),o=e=>`
  <span
    data-part="stop-${e}"
    data-value="${e}"
    ${e%n===0?`data-major`:``}
    style="position: absolute; left: ${e}%; top: 0; width: 3px; border-radius: 2px; translate: -50% 0"
  ></span>`;function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 210px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Output</span>
          <span class="sp-label" style="font-size: 12px">Studio monitors</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 380px; padding: 16px 16px 14px">
            <div class="sp-row sp-row--between sp-context" style="margin-bottom: 10px">
              <span class="sp-label">Volume</span>
              <span
                data-part="readout"
                role="status"
                style="font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums"
              >60</span>
            </div>

            <div data-part="slider" data-mode="scale" data-value="60" style="position: relative; height: 34px">
              <div class="sp-slider sp-context" style="height: 20px">
                <div class="sp-slider-track" data-part="track" style="--sp-from: 0%; --sp-to: 60%">
                  <div class="sp-slider-fill"></div>
                  <button
                    class="sp-slider-thumb"
                    type="button"
                    data-part="thumb"
                    role="slider"
                    aria-label="Volume"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="60"
                    style="--sp-at: 60%; cursor: grab"
                  ></button>
                </div>
              </div>

              <span
                data-part="ticks"
                data-subject
                data-marked
                data-pose="[data-marked]"
                aria-hidden="true"
                style="position: absolute; left: 0; right: 0; top: 20px; height: 12px; pointer-events: none"
              >${r.map(o).join(``)}</span>
            </div>

            <div class="sp-row sp-row--between sp-context" style="margin-top: 4px">
              <span class="sp-label" style="font-size: 11px">0</span>
              <span class="sp-label" style="font-size: 11px">100</span>
            </div>
          </div>
        </div>
      </div>

              <sp-segmented data-stage-mode class="sp-segmented" data-axis="Ticks" data-part="picker" data-value="scale">
          <button class="sp-segment" type="button" data-part="seg-none" value="none" style="padding: 4px 10px; font-size: 12px">Unmarked</button>
          <button class="sp-segment" type="button" data-part="seg-scale" value="scale" style="padding: 4px 10px; font-size: 12px">Scale</button>
          <button class="sp-segment" type="button" data-part="seg-detents" value="detents" style="padding: 4px 10px; font-size: 12px">Detents</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-stage-verdict data-part="note"
          data-mode="scale"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        >${i.scale}</span>
      
    </div>
  `;let c=e(s,`slider`),l=e(s,`track`),u=e(s,`thumb`),d=e(s,`ticks`),f=e(s,`readout`),p=e(s,`note`),m=r.map(t=>e(s,`stop-${t}`)),h=`scale`,g=60,_=()=>{let e=h===`detents`;for(let[t,i]of m.entries()){let a=r[t]??0,o=a%n===0,s=h===`scale`||e&&o;i.style.height=o?`12px`:`7px`,i.style.background=e&&a<=g?`var(--sp-accent)`:`var(--sp-muted)`,i.style.opacity=s?o?`1`:`0.65`:`0`}e?d.dataset.reached=String(g):delete d.dataset.reached},v=(e,t)=>{let r=a(e,0,100);g=t?Math.round(r/n)*n:Math.round(r),l.style.setProperty(`--sp-to`,`${g}%`),u.style.setProperty(`--sp-at`,`${g}%`),u.setAttribute(`aria-valuenow`,String(g)),c.dataset.value=String(g),f.textContent=String(g),_()},y=e=>{h=e,c.dataset.mode=e,e===`none`?d.removeAttribute(`data-marked`):d.setAttribute(`data-marked`,``),p.dataset.mode=e,p.textContent=i[e]??``,v(g,e===`detents`)},b=e=>{let t=l.getBoundingClientRect();return(e-t.left)/t.width*100},x=!1;u.addEventListener(`pointerdown`,()=>{x=!0}),l.addEventListener(`pointerdown`,e=>{e.isTrusted&&l.setPointerCapture(e.pointerId),x=!0,v(b(e.clientX),h===`detents`)}),s.addEventListener(`pointermove`,e=>{x&&v(b(e.clientX),h===`detents`)});let S=e=>{x&&(x=!1,v(b(e.clientX),h===`detents`))};s.addEventListener(`pointerup`,S),s.addEventListener(`pointercancel`,S),u.addEventListener(`keydown`,e=>{let r=e.key;if(r!==`ArrowLeft`&&r!==`ArrowRight`)return;e.preventDefault();let i=h===`detents`?n:t;v(g+(r===`ArrowRight`?i:-i),!1)}),e(s,`picker`).addEventListener(`change`,e=>y(e.detail)),y(`scale`)}export{s as mount};