import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`linear-gradient(168deg, #3a3f8f, #232a63 46%, #10142e)`;function n(e){let t=`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="${e}" numOctaves="4" stitchTiles="stitch"/></filter><rect width="120" height="120" filter="url(#n)"/></svg>`;return`url('data:image/svg+xml,${encodeURIComponent(t)}')`}var r={none:{image:`none`,opacity:`0`},fine:{image:n(.9),opacity:`0.34`},coarse:{image:n(.42),opacity:`0.5`}};function i(n){n.innerHTML=`
    <div class="sp-app" style="gap: 14px">
      <div class="sp-row" style="gap: 14px; align-items: flex-start">
        <div class="sp-stack" style="gap: 6px">
          <div data-part="panel" data-subject data-grain="fine"
               style="position: relative; width: 148px; height: 156px; border-radius: var(--sp-radius); background-image: ${t}; overflow: hidden">
            <span data-part="grain" aria-hidden="true"
                  style="position: absolute; inset: 0; pointer-events: none; background-image: ${r.fine.image}; opacity: ${r.fine.opacity}; mix-blend-mode: overlay"></span>
          </div>
          <span class="sp-label" style="text-align: center">With grain</span>
        </div>

        <div class="sp-stack sp-context" style="gap: 6px">
          <div data-part="clean"
               style="width: 148px; height: 156px; border-radius: var(--sp-radius); background-image: ${t}"></div>
          <span class="sp-label" style="text-align: center">No grain</span>
        </div>
      </div>

      <div class="sp-row sp-context" style="gap: 10px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Grain" data-part="amount" data-value="fine">
          <button class="sp-segment" data-part="grain-none" value="none">None</button>
          <button class="sp-segment" data-part="grain-fine" value="fine">Fine</button>
          <button class="sp-segment" data-part="grain-coarse" value="coarse">Coarse</button>
        </sp-segmented>
      </div>
    </div>
  `;let i=e(n,`panel`),a=e(n,`grain`);e(n,`amount`).addEventListener(`change`,e=>{let t=e.detail,n=t in r?t:`fine`,o=r[n];i.dataset.grain=n,a.style.backgroundImage=o.image,a.style.opacity=o.opacity})}export{i as mount};