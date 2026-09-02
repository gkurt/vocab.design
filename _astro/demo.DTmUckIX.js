import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{step:`50`,l:.97,c:.015},{step:`100`,l:.94,c:.03},{step:`200`,l:.88,c:.055},{step:`300`,l:.8,c:.085},{step:`400`,l:.71,c:.115},{step:`500`,l:.62,c:.14},{step:`600`,l:.54,c:.145},{step:`700`,l:.45,c:.13},{step:`800`,l:.36,c:.1},{step:`900`,l:.27,c:.07}],n={slate:255,indigo:275,amber:75};function r(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Palette</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Hue" data-part="segmented" data-value="slate">
            <button class="sp-segment" data-part="seg-slate" value="slate">Slate</button>
            <button class="sp-segment" data-part="seg-indigo" value="indigo">Indigo</button>
            <button class="sp-segment" data-part="seg-amber" value="amber">Amber</button>
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="ramp" data-subject data-hue="slate" style="gap: 6px; margin-top: 14px; align-items: flex-start">
          ${t.map(({step:e})=>`
      <div class="sp-stack" style="gap: 5px; flex: 1 1 0; min-width: 0">
        <div class="sp-swatch" data-part="tone-${e}" style="height: 46px"></div>
        <span class="sp-label" style="text-align: center; font-size: 10px">${e}</span>
      </div>`).join(``)}
        </div>
        <p class="sp-text sp-context" data-part="roles" style="margin-top: 12px">
          100 Surface · 300 Border · 600 Accent · 900 Text
        </p>
      </div>
    </div>
  `;let i=e(r,`ramp`),a=t.map(t=>e(r,`tone-${t.step}`)),o=e=>{let r=n[e];r!==void 0&&(i.dataset.hue=e,a.forEach((e,n)=>{let i=t[n];i&&e.style.setProperty(`--sp-swatch`,`oklch(${i.l} ${i.c} ${r})`)}))};o(`slate`),e(r,`segmented`).addEventListener(`change`,e=>o(e.detail))}export{r as mount};