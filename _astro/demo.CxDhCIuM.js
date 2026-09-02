import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`#1D63D2`,n=`#F2B23A`,r=[10,20,30,40,50,60,70,80,90],i={srgb:`In srgb the raw channel numbers are interpolated, so a blue and an amber meet in the middle as mud.`,oklab:`In oklab the walk is a straight line through a perceptual space, so the midpoints hold an even lightness.`,oklch:`In oklch the walk goes around the hue circle rather than across it, so the middle stays saturated.`},a=`srgb`,o=(e,r)=>`color-mix(in ${e}, ${t} ${r}%, ${n})`;function s(s){s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Space" data-part="segmented" data-value="${a}">
            <button class="sp-segment" data-part="seg-srgb" value="srgb">srgb</button>
            <button class="sp-segment" data-part="seg-oklab" value="oklab">oklab</button>
            <button class="sp-segment" data-part="seg-oklch" value="oklch">oklch</button>
          </sp-segmented>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px">
          <span class="sp-row" style="gap: 6px">
            <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: ${t}"></span>
            <span class="sp-text" style="font-size: 12px">${t}</span>
          </span>
          <span class="sp-row" style="gap: 6px">
            <span class="sp-text" style="font-size: 12px">${n}</span>
            <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: ${n}"></span>
          </span>
        </div>

        <div data-part="strip" data-subject data-space="${a}"
             style="display: flex; margin-top: 8px; border-radius: var(--sp-radius); overflow: hidden">${r.map(e=>`
      <span class="sp-swatch" data-part="cell-${e}" style="flex: 1 1 0; height: 72px; border-radius: 0; --sp-swatch: ${o(a,e)}"></span>`).join(``)}</div>
        <div class="sp-row sp-context" style="gap: 0; margin-top: 4px">${r.map(e=>`<span class="sp-label" style="flex: 1 1 0; text-align: center; font-size: 10px">${e}</span>`).join(``)}</div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 10px 0 0; min-height: 40px">${i[a]}</p>
      </div>
    </div>
  `;let c=e(s,`strip`),l=e(s,`note`);e(s,`segmented`).addEventListener(`change`,t=>{let n=t.detail;c.dataset.space=n;for(let t of r)e(s,`cell-${t}`).style.setProperty(`--sp-swatch`,o(n,t));l.textContent=i[n]??``})}export{s as mount};