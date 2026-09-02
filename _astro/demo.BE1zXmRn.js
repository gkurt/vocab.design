import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`#6472d4`,n=`#1b2049`,r=9,i=e=>`color-mix(in srgb, ${t} ${Math.round((1-e)*100)}%, ${n})`,a=()=>{let e=[];for(let t=0;t<r;t++){let n=(t/r*100).toFixed(3),a=((t+1)/r*100).toFixed(3);e.push(`${i(t/8)} ${n}% ${a}%`)}return`linear-gradient(to bottom, ${e.join(`, `)})`};function o(e){let t=`<svg xmlns="http://www.w3.org/2000/svg" width="110" height="110"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="${e}" numOctaves="1" stitchTiles="stitch"/></filter><rect width="110" height="110" filter="url(#n)"/></svg>`;return`url('data:image/svg+xml,${encodeURIComponent(t)}')`}var s=o(.92),c={light:{opacity:`0.32`,label:`Light`},medium:{opacity:`0.6`,label:`Medium`},heavy:{opacity:`0.92`,label:`Heavy`}},l=`medium`;function u(t){let n=c[l];if(!n)return;t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 438px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Dither" data-value="${l}">
            ${Object.entries(c).map(([e,t])=>`<button class="sp-segment" data-part="seg-${e}" value="${e}">${t.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 5px">
            <div data-part="dithered" data-subject data-strength="${l}"
                 style="position: relative; height: 136px; border-radius: 8px; overflow: hidden; background-image: ${a()}">
              <span data-part="grain" aria-hidden="true"
                    style="position: absolute; inset: 0; pointer-events: none; background-image: ${s};
                           opacity: ${n.opacity}; mix-blend-mode: overlay"></span>
            </div>
            <span class="sp-label" style="text-align: center">Dithered</span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 0; min-width: 0; gap: 5px">
            <div data-part="raw" style="height: 136px; border-radius: 8px; background-image: ${a()}"></div>
            <span class="sp-label" style="text-align: center">Raw</span>
          </div>

          <div class="sp-stack sp-context" style="flex: 0 0 74px; gap: 5px">
            <div data-part="zoom"
                 style="position: relative; height: 136px; border-radius: 8px; overflow: hidden; background-color: #414ca3">
              <span aria-hidden="true"
                    style="position: absolute; inset: 0; background-image: ${s}; background-size: 760px 760px;
                           opacity: 0.8; mix-blend-mode: overlay"></span>
            </div>
            <span class="sp-label" style="text-align: center; font-size: 10px">Noise, 7x</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 9px 0 0; height: 28px; font-size: 10.5px; line-height: 1.35">
          The noise is not hiding the steps, it is straddling them: pixels either side of a boundary average back to the missing colour.
        </p>
      </div>
    </div>
  `;let r=e(t,`dithered`),i=e(t,`grain`),o=e=>{let t=c[e];t&&(r.dataset.strength=e,i.style.opacity=t.opacity)};o(l),e(t,`segmented`).addEventListener(`change`,e=>o(e.detail))}export{u as mount};