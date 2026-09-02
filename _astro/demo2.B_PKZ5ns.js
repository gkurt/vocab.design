import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=142,n=88,r=130,i=58,a=54,o=4,s=2,c=100,l=[{key:`north`,label:`North`,values:[58,62,70,66,78,84,88,92]},{key:`west`,label:`West`,values:[22,26,31,38,44,51,58,64]},{key:`south`,label:`South`,values:[40,44,41,48,52,49,55,58]},{key:`coast`,label:`Coast`,values:[30,33,29,34,31,36,33,38]},{key:`east`,label:`East`,values:[12,14,11,16,15,18,17,20]},{key:`central`,label:`Central`,values:[8,7,9,8,10,9,11,12]}],u={shared:`One domain, 0 to 100 mm, in all six panels. Central really is a tenth of North, and the eye can see it.`,own:`Each panel scaled to its own maximum. Every trend now fills its box, so Central reads like North: the comparison is gone.`},d=e=>Math.ceil(Math.max(...e)/10)*10,f=e=>o+e*122/7,p=e=>a-e/c*50,m=(e,t)=>`
  <button class="sp-segment" type="button" data-part="seg-${e}" value="${e}" style="padding: 4px 9px; font-size: 11px">
    ${t}
  </button>`;function h({key:e,label:o,values:l}){let u=l.map((e,t)=>`${f(t).toFixed(1)},${p(e).toFixed(1)}`).join(` `);return`
    <div
      class="sp-surface"
      data-part="panel-${e}"
      style="display: flex; flex-direction: column; width: ${t}px; height: ${n}px; padding: 5px; overflow: hidden"
    >
      <span style="display: flex; align-items: baseline; gap: 6px; flex: 0 0 auto; height: 17px">
        <span class="sp-heading" style="flex: 1 1 auto; min-width: 0; font-size: 11px">${o}</span>
        <span class="sp-label" data-part="top-${e}" style="flex: 0 0 auto; font-size: 10px">${c}</span>
      </span>
      <svg viewBox="0 0 ${r} ${i}" width="${r}" height="${i}" aria-hidden="true" style="display: block; flex: 0 0 auto">
        <line x1="0" y1="${a}" x2="${r}" y2="${a}" stroke="var(--sp-line)" stroke-width="${s}" />
        <g
          data-part="marks-${e}"
          style="transform-box: view-box; transform-origin: 0px ${a}px; transform: scaleY(1);
                 transition: transform 0.42s var(--sp-ease)"
        >
          <path d="${`M ${f(0).toFixed(1)},${a} L ${u.split(` `).join(` L `)} L ${f(l.length-1).toFixed(1)},${a} Z`}" fill="var(--sp-accent-soft)" />
          <polyline
            points="${u}"
            fill="none"
            stroke="var(--sp-accent)"
            stroke-width="${s}"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
          />
        </g>
      </svg>
    </div>`}function g(r){r.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Rainfall by region, mm</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="scales" data-axis="Scale" data-value="shared">
            ${m(`shared`,`one shared scale`)}${m(`own`,`per panel`)}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div
            class="sp-grid"
            data-part="grid"
            data-subject
            data-scale="shared"
            style="flex: 0 0 auto; grid-template-columns: repeat(3, ${t}px); grid-template-rows: repeat(2, ${n}px)"
          >
            ${l.map(h).join(``)}
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 40px; width: 442px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;let i=e(r,`grid`),a=e(r,`readout`),o=l.map(t=>({entry:t,marks:e(r,`marks-${t.key}`),top:e(r,`top-${t.key}`)})),s=e=>{let t=u[e];if(t){i.dataset.scale=e;for(let{entry:t,marks:n,top:r}of o){let i=e===`own`?d(t.values):c;n.style.transform=`scaleY(${(c/i).toFixed(3)})`,r.textContent=String(i)}a.textContent=t}};e(r,`scales`).addEventListener(`change`,e=>s(e.detail)),s(`shared`)}export{g as mount};