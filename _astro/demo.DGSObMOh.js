import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={ink:{shadow:`#2A1E7C`,highlight:`#F5D06B`,label:`shadows to indigo, highlights to amber`},tide:{shadow:`#0B3B45`,highlight:`#8FE6CB`,label:`shadows to deep teal, highlights to mint`},flare:{shadow:`#571043`,highlight:`#FFB6C9`,label:`shadows to plum, highlights to rose`}},n=`ink`,r=[`radial-gradient(circle at 50% 30%, #f4f4f4 0 11%, #d2d2d2 11% 15%, transparent 15%)`,`radial-gradient(ellipse 40% 30% at 50% 96%, #ededed 0 62%, #b9b9b9 62% 78%, transparent 80%)`,`radial-gradient(circle at 78% 20%, #fbfbfb 0 6%, transparent 26%)`,`linear-gradient(158deg, #3a3a3a 0%, #8f8f8f 54%, #1e1e1e 100%)`].join(`, `);function i(i){let a=t[n];i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Ramp" data-value="${n}">
            <button class="sp-segment" data-part="seg-ink" value="ink">Ink</button>
            <button class="sp-segment" data-part="seg-tide" value="tide">Tide</button>
            <button class="sp-segment" data-part="seg-flare" value="flare">Flare</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 14px; align-items: flex-start">
          <div class="sp-context sp-stack" style="flex: 1 1 0; min-width: 0; gap: 6px">
            <div data-part="original" style="height: 128px; border-radius: var(--sp-radius); background: ${r}"></div>
            <span class="sp-label">Original</span>
          </div>

          <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 6px">
            <div data-part="duotone" data-subject data-ramp="${n}"
                 style="position: relative; height: 128px; border-radius: var(--sp-radius); overflow: hidden;
                        isolation: isolate; background: ${r}">
              <span data-part="shadow-layer"
                    style="position: absolute; inset: 0; background: ${a?.shadow}; mix-blend-mode: lighten"></span>
              <span data-part="highlight-layer"
                    style="position: absolute; inset: 0; background: ${a?.highlight}; mix-blend-mode: darken"></span>
            </div>
            <div class="sp-row" style="gap: 6px">
              <span class="sp-label">Duotone</span>
              <span class="sp-swatch" data-part="chip-shadow" style="width: 14px; height: 14px; --sp-swatch: ${a?.shadow}"></span>
              <span class="sp-swatch" data-part="chip-highlight" style="width: 14px; height: 14px; --sp-swatch: ${a?.highlight}"></span>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 10px 0 0; min-height: 20px">
          Luminance decides the position, the ramp decides the colour: ${a?.label}.
        </p>
      </div>
    </div>
  `;let o=e(i,`duotone`),s=e(i,`shadow-layer`),c=e(i,`highlight-layer`),l=e(i,`chip-shadow`),u=e(i,`chip-highlight`),d=e(i,`note`);e(i,`segmented`).addEventListener(`change`,e=>{let n=e.detail,r=t[n];r&&(o.dataset.ramp=n,s.style.background=r.shadow,c.style.background=r.highlight,l.style.setProperty(`--sp-swatch`,r.shadow),u.style.setProperty(`--sp-swatch`,r.highlight),d.textContent=`Luminance decides the position, the ramp decides the colour: ${r.label}.`)})}export{i as mount};