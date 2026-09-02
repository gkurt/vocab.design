import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={warm:{hue:62,chroma:1,reading:`hue 62, warm`},neutral:{hue:62,chroma:0,reading:`no hue, inert`},cool:{hue:250,chroma:1,reading:`hue 250, cool`}},n=`warm`,r=[{l:.975,chroma:.014,label:`L .98`},{l:.94,chroma:.02,label:`L .94`},{l:.88,chroma:.024,label:`L .88`}],i=(e,t,n,r)=>`oklch(${e} ${t*r} ${n})`;function a(a){let o=r.map((e,t)=>`
      <div class="sp-stack" style="gap: 4px; flex: 1 1 0">
        <span class="sp-swatch" data-part="tile-${t}" style="height: 34px; border: 1px solid var(--sp-line)"></span>
        <span class="sp-label" style="text-align: center; font-size: 10px">${e.label}</span>
      </div>`).join(``);a.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" data-part="panel" data-subject data-temp="${n}" style="width: 306px">
        <div class="sp-row sp-row--between">
          <span class="sp-heading">Reading list</span>
          <span class="sp-label" data-part="readout" style="width: 92px; text-align: right">${t[n]?.reading}</span>
        </div>

        <div class="sp-row" style="margin-top: 10px; padding: 10px; border: 1px solid var(--sp-line); border-radius: 6px; background: var(--sp-sunken)">
          <span class="sp-grow sp-stack" style="gap: 3px">
            <span class="sp-text sp-text--ink">The Elements of Color</span>
            <span class="sp-text" style="font-size: 12px">Added Tuesday · 96 pages</span>
          </span>
        </div>

        <div class="sp-row" style="margin-top: 12px; gap: 8px; align-items: flex-start">${o}</div>
      </div>

      <sp-segmented data-stage-mode class="sp-segmented sp-context" data-axis="Temperature" data-part="segmented" data-value="${n}">
        <button class="sp-segment" data-part="seg-warm" value="warm">Warm</button>
        <button class="sp-segment" data-part="seg-neutral" value="neutral">Neutral</button>
        <button class="sp-segment" data-part="seg-cool" value="cool">Cool</button>
      </sp-segmented>
    </div>
  `;let s=e(a,`panel`),c=e(a,`readout`),l=r.map((t,n)=>e(a,`tile-${n}`)),u=e=>{let n=t[e];if(!n)return;let{hue:a,chroma:o}=n;s.dataset.temp=e,s.style.setProperty(`--sp-surface`,i(.975,.014,a,o)),s.style.setProperty(`--sp-sunken`,i(.94,.02,a,o)),s.style.setProperty(`--sp-line`,i(.88,.024,a,o)),s.style.setProperty(`--sp-ink`,i(.32,.022,a,o)),s.style.setProperty(`--sp-muted`,i(.56,.022,a,o)),l.forEach((e,t)=>{let n=r[t];n&&e.style.setProperty(`--sp-swatch`,i(n.l,n.chroma,a,o))}),c.textContent=n.reading};u(n),e(a,`segmented`).addEventListener(`change`,e=>u(e.detail))}export{a as mount};