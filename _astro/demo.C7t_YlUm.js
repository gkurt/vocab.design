import{n as e}from"./parts.C-YLuC7Q.js";var t={r:226,g:74,b:46,hex:`E24A2E`},n=`#1F3AA8`,r=[12,32,64,100],i=64,a=e=>Math.round(e/100*255),o=e=>`#${t.hex}${a(e).toString(16).toUpperCase().padStart(2,`0`)}`,s=e=>`rgb(${t.r} ${t.g} ${t.b} / ${(e/100).toFixed(2)})`,c=e=>Math.min(100,Math.max(0,Math.round(e/4)*4));function l(t){let a=r.map(e=>`
      <span class="sp-label" data-part="tick-${e}" style="position: absolute; left: ${e}%; translate: -50% 0; font-size: 11px">${e}%</span>`).join(``);t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Fill</span>
          <span class="sp-text sp-text--ink" data-part="rgba" style="font-size: 12px">${s(i)}</span>
        </div>

        <div style="position: relative; height: 124px; margin-top: 12px; border-radius: var(--sp-radius); overflow: hidden;
                    background-color: #FFFFFF;
                    background-image: conic-gradient(#D9DEE7 0deg 90deg, transparent 90deg 180deg, #D9DEE7 180deg 270deg, transparent 270deg 360deg);
                    background-size: 18px 18px">
          <span style="position: absolute; left: 22px; top: 26px; width: 124px; height: 68px; border-radius: 8px; background: ${n}"></span>
          <span data-part="chip" data-subject data-alpha="${i}"
                style="position: absolute; left: 104px; top: 40px; width: 138px; height: 68px; border-radius: 8px;
                       background: ${s(i)}"></span>
        </div>

        <div class="sp-context" style="margin-top: 14px">
          <div class="sp-slider" data-part="slider" style="touch-action: none">
            <span class="sp-slider-track" data-part="track" style="--sp-from: 0%; --sp-to: ${i}%">
              <span class="sp-slider-fill"></span>
              <button class="sp-slider-thumb" data-part="thumb" type="button" aria-label="Alpha"
                      style="--sp-at: ${i}%; touch-action: none"></button>
            </span>
          </div>
          <div style="position: relative; height: 16px; margin-top: 2px">${a}</div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px">
          <span class="sp-label">Hex</span>
          <span class="sp-text sp-text--ink" data-part="hex" style="font-size: 12px">${o(i)}</span>
        </div>
      </div>
    </div>
  `;let l=e(t,`chip`),u=e(t,`track`),d=e(t,`thumb`),f=e(t,`rgba`),p=e(t,`hex`),m=e=>{l.dataset.alpha=String(e),l.style.background=s(e),u.style.setProperty(`--sp-to`,`${e}%`),d.style.setProperty(`--sp-at`,`${e}%`),f.textContent=s(e),p.textContent=o(e)};m(i);let h=!1,g=e=>{let t=u.getBoundingClientRect();t.width!==0&&m(c((e.clientX-t.left)/t.width*100))},_=e=>{h=!0,e.isTrusted&&u.setPointerCapture(e.pointerId),g(e)};d.addEventListener(`pointerdown`,_),u.addEventListener(`pointerdown`,_),t.addEventListener(`pointermove`,e=>{h&&g(e)});let v=()=>{h=!1};t.addEventListener(`pointerup`,v),t.addEventListener(`pointercancel`,v)}export{l as mount};