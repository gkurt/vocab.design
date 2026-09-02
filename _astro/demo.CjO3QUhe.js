import{n as e}from"./parts.C-YLuC7Q.js";var t=[40,60,80,92],n=60,r=e=>`color-mix(in oklab, var(--tn-base) ${100-e}%, #ffffff)`;function i(i){i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 340px; --tn-base: oklch(0.55 0.17 262)">
        <div class="sp-row sp-context">
          <span class="sp-label" style="width: 34px">Base</span>
          <span class="sp-swatch" style="width: 36px; height: 22px; --sp-swatch: var(--tn-base)"></span>
          <span class="sp-text">oklch(0.55 0.17 262), plus white</span>
        </div>

        <div class="sp-row" data-part="tints" data-subject style="gap: 8px; margin-top: 14px; align-items: flex-start">${t.map(e=>`
      <button data-part="tint-${e}" style="display: flex; flex-direction: column; gap: 5px; width: 60px; padding: 0; border: 0; background: transparent; cursor: pointer">
        <span class="sp-swatch" style="height: 40px; --sp-swatch: ${r(e)}"></span>
        <span class="sp-label" style="text-align: center; font-size: 11px">${e}%</span>
      </button>`).join(``)}</div>

        <div class="sp-row sp-context" data-part="sample" data-tint="${n}"
             style="margin-top: 16px; padding: 10px 12px; border-radius: var(--sp-radius); background: ${r(n)}; color: #23262b">
          <span class="sp-swatch" style="width: 14px; height: 14px; border-radius: 50%; --sp-swatch: var(--tn-base)"></span>
          <span class="sp-grow">Draft saved to your library</span>
          <span data-part="sample-label" style="font-size: 12px">${n}% white</span>
        </div>
      </div>
    </div>
  `;let a=e(i,`sample`),o=e(i,`sample-label`);for(let n of t)e(i,`tint-${n}`).addEventListener(`click`,()=>{a.dataset.tint=String(n),a.style.background=r(n),o.textContent=`${n}% white`})}export{i as mount};