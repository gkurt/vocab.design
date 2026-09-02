import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=[{key:`blue`,label:`Blue`,base:258,high:78,low:306},{key:`green`,label:`Green`,base:148,high:96,low:252},{key:`red`,label:`Red`,base:28,high:84,low:336}],n=`blue`,r=e=>`radial-gradient(circle at 33% 27%, oklch(0.93 0.05 ${e.base}) 0%, oklch(0.63 0.15 ${e.base}) 44%, oklch(0.28 0.07 ${e.base}) 100%)`,i=e=>`radial-gradient(circle at 33% 27%, oklch(0.93 0.13 ${e.high}) 0%, oklch(0.63 0.16 ${e.base}) 44%, oklch(0.31 0.13 ${e.low}) 100%)`,a=`conic-gradient(from 0deg, ${[0,60,120,180,240,300,360].map(e=>`oklch(0.68 0.19 ${e})`).join(`, `)})`,o=(e,t,n)=>`
  <span data-part="${e}" style="position: absolute; left: 50%; top: 50%; width: 0; height: 0; rotate: ${t}deg">
    <span style="position: absolute; left: -5px; top: -30px; width: 10px; height: 10px; border-radius: 50%;
                 background: ${n}; box-shadow: 0 0 0 2px rgb(255 255 255 / 0.95), 0 1px 2px rgb(0 0 0 / 0.45)"></span>
  </span>`;function s(s){let c=t.find(e=>e.key===n)??t[0];if(!c)return;s.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 438px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Object hue" data-value="${n}">
            ${t.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.label}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 16px; margin-top: 12px; align-items: flex-start; justify-content: center">
          <div class="sp-stack" style="flex: 0 0 auto; gap: 6px; align-items: center">
            <div data-part="ball" data-subject data-hue="${n}"
                 style="width: 116px; height: 116px; border-radius: 50%; background-image: ${i(c)}"></div>
            <span class="sp-label">Hue shifted</span>
          </div>

          <div class="sp-stack sp-context" style="flex: 0 0 auto; gap: 6px; align-items: center">
            <div data-part="flat"
                 style="width: 116px; height: 116px; border-radius: 50%; background-image: ${r(c)}"></div>
            <span class="sp-label">One hue</span>
          </div>

          <div class="sp-stack sp-context" style="flex: 0 0 auto; gap: 6px; align-items: center">
            <div data-part="wheel" style="position: relative; width: 76px; height: 76px; border-radius: 50%; background-image: ${a}">
              ${o(`pin-high`,c.high,`#ffffff`)}
              ${o(`pin-base`,c.base,`#23262b`)}
              ${o(`pin-low`,c.low,`#ffffff`)}
            </div>
            <span class="sp-label" style="font-size: 10px">Hues used</span>
          </div>
        </div>

        <div class="sp-row sp-context" style="margin-top: 10px">
          <span class="sp-text" data-part="readout" style="font-size: 10.5px">light ${c.high}, body ${c.base}, shadow ${c.low}</span>
        </div>
      </div>
    </div>
  `;let l=e(s,`ball`),u=e(s,`flat`),d=e(s,`readout`),f=n=>{let a=t.find(e=>e.key===n);a&&(l.dataset.hue=n,l.style.backgroundImage=i(a),u.style.backgroundImage=r(a),e(s,`pin-high`).style.rotate=`${a.high}deg`,e(s,`pin-base`).style.rotate=`${a.base}deg`,e(s,`pin-low`).style.rotate=`${a.low}deg`,d.textContent=`light ${a.high}, body ${a.base}, shadow ${a.low}`)};f(n),e(s,`segmented`).addEventListener(`change`,e=>f(e.detail))}export{s as mount};