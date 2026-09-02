import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=`#2b3566`,n=`#0d1024`,r=[6,12,24],i=6,a=e=>`color-mix(in srgb, ${t} ${Math.round((1-e)*100)}%, ${n})`,o=e=>{let t=[];for(let n=0;n<e;n++){let r=(n/e*100).toFixed(3),i=((n+1)/e*100).toFixed(3);t.push(`${a(n/(e-1))} ${r}% ${i}%`)}return`linear-gradient(to bottom, ${t.join(`, `)})`},s=`linear-gradient(to bottom, ${t}, ${n})`;function c(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 438px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Levels" data-value="${i}">
            ${r.map(e=>`<button class="sp-segment" data-part="seg-${e}" value="${e}">${e}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 14px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 5px">
            <div data-part="ramp" data-subject data-levels="${i}"
                 style="height: 142px; border-radius: 8px; background-image: ${o(i)}"></div>
            <span class="sp-label" data-part="ramp-label" style="text-align: center">Quantised</span>
          </div>
          <div class="sp-stack sp-context" style="flex: 1 1 0; min-width: 0; gap: 5px">
            <div data-part="smooth" style="height: 142px; border-radius: 8px; background-image: ${s}"></div>
            <span class="sp-label" style="text-align: center">As authored</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 9px 0 0; height: 28px; font-size: 10.5px; line-height: 1.35">
          The stripes on the left are hard stops, drawn on purpose. The panel on the right may band too, and that one is your display.
        </p>
      </div>
    </div>
  `;let n=e(t,`ramp`),a=e=>{let t=Number(e);r.includes(t)&&(n.dataset.levels=String(t),n.style.backgroundImage=o(t))};a(String(i)),e(t,`segmented`).addEventListener(`change`,e=>a(e.detail))}export{c as mount};