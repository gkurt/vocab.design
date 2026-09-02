import{n as e}from"./parts.C-YLuC7Q.js";var t=400,n=230,r=10,i=62;function a(e){return e<35?`low`:e>75?`high`:`mid`}function o(o){o.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 276px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Controls</span>
          <span class="sp-label" data-part="readout" style="font-size: 11px; white-space: nowrap">${i} filled, 38 empty</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: ${t}px; padding: 14px; display: grid; grid-template-columns: 80px ${n}px 42px; align-items: center; gap: 16px 10px">
            <span class="sp-label" style="white-space: nowrap">Slider</span>
            <div data-part="lane" style="position: relative; display: flex; align-items: center; height: 20px">
              <div
                class="sp-slider-track"
                data-part="track"
                data-subject
                data-band="${a(i)}"
                style="height: ${r}px; --sp-from: 0%; --sp-to: ${i}%"
              >
                <div class="sp-slider-fill"></div>
              </div>
              <button
                class="sp-slider-thumb"
                type="button"
                data-part="thumb"
                aria-label="Value"
                style="width: 18px; height: 18px; touch-action: none; --sp-at: ${i}%"
              ></button>
              <span data-part="aim-high" aria-hidden="true" style="position: absolute; top: 0; left: calc(88% - 2px); width: 4px; height: 20px"></span>
              <span data-part="aim-low" aria-hidden="true" style="position: absolute; top: 0; left: calc(16% - 2px); width: 4px; height: 20px"></span>
            </div>
            <span class="sp-label" data-part="value" style="font-size: 11px; text-align: right; font-variant-numeric: tabular-nums">${i}%</span>

            <span class="sp-label sp-context" style="white-space: nowrap">Scrollbar</span>
            <div class="sp-context">
              <div
                class="sp-scroll"
                data-part="pane"
                style="width: ${n}px; height: 38px; overflow-x: auto; overflow-y: hidden; scrollbar-width: none; padding: 6px;
                       border-radius: 6px; background: var(--sp-sunken)"
              >
                <div style="display: flex; gap: 8px; width: max-content">${Array.from({length:6},()=>`<span style="flex: 0 0 68px; height: 26px; border-radius: 6px; background: var(--sp-line)"></span>`).join(``)}</div>
              </div>
              <div
                data-part="bar"
                data-at="start"
                style="position: relative; height: ${r}px; margin-top: 6px; border-radius: 999px; background: var(--sp-sunken)"
              >
                <span
                  data-part="bar-thumb"
                  style="position: absolute; top: 0; bottom: 0; left: 0; width: 60px; border-radius: 999px; background: var(--sp-accent)"
                ></span>
              </div>
            </div>
            <span class="sp-label sp-context" data-part="bar-value" style="font-size: 11px; text-align: right; font-variant-numeric: tabular-nums">0%</span>

            <span class="sp-label sp-context" style="white-space: nowrap">Progress bar</span>
            <div class="sp-progress sp-context" data-part="prog" style="width: ${n}px; height: ${r}px; --sp-value: 40%">
              <div class="sp-progress-fill" style="transition: none"></div>
            </div>
            <span class="sp-label sp-context" style="font-size: 11px; text-align: right; font-variant-numeric: tabular-nums">40%</span>
          </div>
        </div>

      </div>
    </div>
  `;let s=e(o,`track`),c=e(o,`thumb`),l=e(o,`value`),u=e(o,`readout`),d=e(o,`pane`),f=e(o,`bar`),p=e(o,`bar-thumb`),m=e(o,`bar-value`),h=e=>{let t=Math.round(Math.min(100,Math.max(0,e)));s.style.setProperty(`--sp-to`,`${t}%`),s.dataset.band=a(t),c.style.setProperty(`--sp-at`,`${t}%`),l.textContent=`${t}%`,u.textContent=`${t} filled, ${100-t} empty`},g;c.addEventListener(`pointerdown`,e=>{e.isTrusted&&c.setPointerCapture(e.pointerId),g=s.getBoundingClientRect()}),c.addEventListener(`pointermove`,e=>{g&&h((e.clientX-g.left)/g.width*100)});let _=()=>{g=void 0};c.addEventListener(`pointerup`,_),c.addEventListener(`pointercancel`,_);let v=f.clientWidth,y=d.clientWidth,b=d.scrollWidth,x=Math.max(1,b-y),S=Math.round(y/b*v);p.style.width=`${S}px`,d.addEventListener(`scroll`,()=>{let e=Math.min(1,Math.max(0,d.scrollLeft/x));p.style.left=`${((v-S)*e).toFixed(1)}px`,f.dataset.at=e<.02?`start`:e>.96?`end`:`mid`,m.textContent=`${Math.round(e*100)}%`})}export{o as mount};