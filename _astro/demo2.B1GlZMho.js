import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=Math.PI/180,n=e=>e*e*e,r=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055,i=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,a=e=>Math.min(1,Math.max(0,e));function o(e,t,n){let r=t=>(t+e/30)%12,i=t*Math.min(n,1-n),a=e=>n-i*Math.max(-1,Math.min(r(e)-3,Math.min(9-r(e),1)));return[a(0),a(8),a(4)]}function s([e,n,r]){let a=i(e),o=i(n),s=i(r),c=Math.cbrt(.4122214708*a+.5363325363*o+.0514459929*s),l=Math.cbrt(.2119034982*a+.6806995451*o+.1073969566*s),u=Math.cbrt(.0883024619*a+.2817188376*o+.6299787005*s),d=.2104542553*c+.793617785*l-.0040720468*u,f=1.9779984951*c-2.428592205*l+.4505937099*u,p=.0259040371*c+.7827717662*l-.808675766*u;return[d,Math.hypot(f,p),(Math.atan2(p,f)/t+360)%360]}function c([e,i,o]){let s=i*Math.cos(o*t),c=i*Math.sin(o*t),l=n(e+.3963377774*s+.2158037573*c),u=n(e-.1055613458*s-.0638541728*c),d=n(e-.0894841775*s-1.291485548*c);return[a(r(4.0767416621*l-3.3077115913*u+.2309699292*d)),a(r(-1.2684380046*l+2.6097574011*u-.3413193965*d)),a(r(-.0041960863*l-.7034186147*u+1.707614701*d))]}var l=([e,t,n])=>{let r=.2126*i(e)+.7152*i(t)+.0722*i(n);return r>.008856?116*Math.cbrt(r)-16:903.3*r},u=([e,t,n])=>`rgb(${[e,t,n].map(e=>Math.round(e*255)).join(` `)})`,d={blue:{name:`Blue`,h:250,s:.85},red:{name:`Red`,h:12,s:.8},yellow:{name:`Yellow`,h:62,s:.9}},f=`blue`,p=6,m=.86,h=.26,g=e=>{let t=d[e]??d.blue;if(!t)throw Error(`unknown hue`);let n=[o(t.h,t.s,m),o(t.h,t.s,h)].map(s),r=e=>{let t=Array.from({length:p},(t,n)=>e(n/5)),n=t.map(l);return{colors:t,light:n,gaps:n.slice(1).map((e,t)=>(n[t]??0)-e)}},i=(e,t)=>(n[0][t]??0)+((n[1][t]??0)-(n[0][t]??0))*e;return{hsl:r(e=>o(t.h,t.s,m+-.6*e)),ok:r(e=>c([i(e,0),i(e,1),i(e,2)]))}},_=e=>`steps ${Math.min(...e.gaps).toFixed(1)} to ${Math.max(...e.gaps).toFixed(1)} L*`;function v(t){let n=e=>Array.from({length:p},(t,n)=>`<span class="sp-swatch" data-part="${e}-swatch-${n}" style="flex: 1 1 0; height: 38px; border-radius: 0"></span>`).join(``),r=e=>Array.from({length:p},(t,n)=>`<span class="sp-text" data-part="${e}-l-${n}" style="flex: 1 1 0; text-align: center; font-size: 10px;
               font-variant-numeric: tabular-nums"></span>`).join(``),i=(e,t,i)=>`
    <div class="sp-stack${i?``:` sp-context`}" style="gap: 4px">
      <div class="sp-row sp-row--between${i?` sp-context`:``}">
        <span class="sp-label">${t}</span>
        <span class="sp-text" data-part="${e}-spread" style="font-size: 10.5px; font-variant-numeric: tabular-nums"></span>
      </div>
      <div class="sp-row" data-part="${e}-ramp" ${i?`data-subject`:``} data-hue="${f}"
           style="gap: 0; overflow: hidden; border-radius: 5px; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)">
        ${n(e)}
      </div>
      <div class="sp-row" style="gap: 0">${r(e)}</div>
    </div>`;t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 448px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${f}" data-axis="Hue">
            ${Object.entries(d).map(([e,t])=>`<button class="sp-segment" data-part="seg-${e}" value="${e}">${t.name}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-stack" style="gap: 11px; margin-top: 12px">
          ${i(`hsl`,`Even steps of HSL lightness`,!1)}
          ${i(`ok`,`Even steps of OKLCH lightness`,!0)}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 10px 0 0; height: 28px; font-size: 10.5px; line-height: 1.35">
          Both ramps run between the same two colours. The numbers are the measured CIE lightness of each rung, so the
          gap between them is the claim.
        </p>
      </div>
    </div>
  `;let a=n=>{let r=g(n);for(let[i,a]of[[`hsl`,r.hsl],[`ok`,r.ok]])e(t,`${i}-ramp`).dataset.hue=n,e(t,`${i}-spread`).textContent=_(a),a.colors.forEach((n,r)=>{e(t,`${i}-swatch-${r}`).style.setProperty(`--sp-swatch`,u(n)),e(t,`${i}-l-${r}`).textContent=String(Math.round(a.light[r]??0))})};a(f),e(t,`segmented`).addEventListener(`change`,e=>a(e.detail))}export{v as mount};