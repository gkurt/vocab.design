import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=Math.PI/180,n=e=>e*e*e,r=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055,i=e=>Math.min(1,Math.max(0,e));function a(e,a,o){let s=a*Math.cos(o*t),c=a*Math.sin(o*t),l=n(e+.3963377774*s+.2158037573*c),u=n(e-.1055613458*s-.0638541728*c),d=n(e-.0894841775*s-1.291485548*c);return[i(r(4.0767416621*l-3.3077115913*u+.2309699292*d)),i(r(-1.2684380046*l+2.6097574011*u-.3413193965*d)),i(r(-.0041960863*l-.7034186147*u+1.707614701*d))]}var o=(e,t,n)=>`#${a(e,t,n).map(e=>Math.round(e*255).toString(16).padStart(2,`0`)).join(``).toUpperCase()}`,s=(e,t)=>((t-e)%360+540)%360-180,c=(e,t,n)=>{let r=s(e,t),i=Math.min(Math.abs(r)/2,n);return{hue:(e+Math.sign(r)*i+360)%360,move:i}},l={L:.55,C:.15,h:262},u=[{key:`error`,name:`Error red`,L:.58,C:.17,h:27},{key:`success`,name:`Success green`,L:.62,C:.13,h:145},{key:`brand`,name:`Brand purple`,L:.55,C:.16,h:305}],d=[8,15,30],f=15,p=e=>Math.round(e);function m(t){let n=(e,t)=>`<span class="sp-swatch" data-part="${e}" ${t}
           style="display: block; height: 38px; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)"></span>`,r=e=>`<div style="flex: 1 1 0; min-width: 0">${e}</div>`,i=(e,t,n=`sp-text`)=>`<span class="${n}" data-part="${e}" style="display: block; height: 13px; text-align: center; font-size: ${t}px;
           font-variant-numeric: tabular-nums"></span>`;t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context">
          <div class="sp-row" style="gap: 7px">
            <span class="sp-label">Scheme seed</span>
            <span class="sp-swatch" data-part="seed" style="width: 22px; height: 16px; --sp-swatch: ${o(l.L,l.C,l.h)};
                  box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)"></span>
            <span class="sp-text" style="font-size: 10px; font-variant-numeric: tabular-nums">hue ${l.h}</span>
          </div>
          <div class="sp-row" style="gap: 8px">
            <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Max shift" data-value="${f}">
              ${d.map(e=>`<button class="sp-segment" data-part="seg-${e}" value="${e}">${e}&deg;</button>`).join(``)}
            </sp-segmented>
          </div>
        </div>

        <div class="sp-row sp-context" style="gap: 8px; margin-top: 11px; height: 14px">
          <span style="flex: 0 0 78px"></span>
          ${u.map(e=>r(`<span class="sp-label" style="display: block; text-align: center">${e.name}</span>`)).join(``)}
        </div>

        <div class="sp-row sp-context" style="gap: 8px; margin-top: 4px; align-items: flex-start">
          <span class="sp-label" style="flex: 0 0 78px; padding-top: 12px">Arrived as</span>
          ${u.map(e=>r(n(`src-${e.key}`,``)+i(`src-read-${e.key}`,9))).join(``)}
        </div>

        <div class="sp-row" style="gap: 8px; margin-top: 8px; align-items: flex-start">
          <span class="sp-label sp-context" style="flex: 0 0 78px; padding-top: 12px">Harmonized</span>
          <div class="sp-row" data-part="harmonized" data-subject data-cap="${f}"
               style="flex: 1 1 auto; gap: 8px; min-width: 0; align-items: flex-start">
            ${u.map(e=>r(n(`out-${e.key}`,`data-shift="0"`)+i(`out-read-${e.key}`,9)+i(`shift-${e.key}`,9))).join(``)}
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 9px 0 0; height: 28px; font-size: 10px; line-height: 1.4"></p>
      </div>
    </div>
  `;for(let n of u)e(t,`src-${n.key}`).style.setProperty(`--sp-swatch`,o(n.L,n.C,n.h)),e(t,`src-read-${n.key}`).textContent=`hue ${n.h} · ${o(n.L,n.C,n.h)}`;let a=n=>{let r=Number(n)||f;e(t,`harmonized`).dataset.cap=String(r);let i=0;for(let n of u){let{hue:a,move:s}=c(n.h,l.h,r),u=o(n.L,n.C,a),d=e(t,`out-${n.key}`);d.style.setProperty(`--sp-swatch`,u),d.dataset.shift=String(p(s)),e(t,`out-read-${n.key}`).textContent=`hue ${p(a)} · ${u}`,e(t,`shift-${n.key}`).textContent=`rotated ${p(s)}°`,p(s)>=r&&(i+=1)}e(t,`caption`).textContent=`Hue only: tone and chroma are untouched, so every contrast ratio survives the move. ${i} of ${u.length} hit the ${r}° cap; the rest stopped at half the gap.`};a(String(f)),e(t,`segmented`).addEventListener(`change`,e=>a(e.detail))}export{m as mount};