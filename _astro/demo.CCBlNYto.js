import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t={blue:{from:`#1D63D2`,to:`#F2B23A`},rose:{from:`#D23A6B`,to:`#3AC4B0`},green:{from:`#2E8B45`,to:`#8C4FD8`}},n=`blue`,r=e=>[Number.parseInt(e.slice(1,3),16),Number.parseInt(e.slice(3,5),16),Number.parseInt(e.slice(5,7),16)],i=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,a=[{key:`srgb`,axes:`red green blue`,text:e=>{let[t,n,i]=r(e);return`rgb(${t} ${n} ${i})`}},{key:`hsl`,axes:`hue saturation lightness`,text:e=>{let[t,n,i]=r(e).map(e=>e/255),a=Math.max(t,n,i),o=Math.min(t,n,i),s=(a+o)/2,c=a-o,l=c===0?0:c/(1-Math.abs(2*s-1)),u=0;return c!==0&&(u=a===t?(n-i)/c%6:a===n?(i-t)/c+2:(t-n)/c+4,u*=60,u<0&&(u+=360)),`hsl(${Math.round(u)} ${Math.round(l*100)}% ${Math.round(s*100)}%)`}},{key:`oklch`,axes:`lightness chroma hue`,text:e=>{let[t,n,a]=r(e).map(e=>i(e/255)),o=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),s=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),c=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a),l=.2104542553*o+.793617785*s-.0040720468*c,u=1.9779984951*o-2.428592205*s+.4505937099*c,d=.0259040371*o+.7827717662*s-.808675766*c,f=Math.atan2(d,u)*180/Math.PI;return`oklch(${l.toFixed(2)} ${Math.hypot(u,d).toFixed(2)} ${Math.round(f<0?f+360:f)})`}}],o=(e,t,n)=>`linear-gradient(to right in ${e}, ${t}, ${n})`;function s(r){let i=t[n]??t.blue;if(!i)return;let s=a.map(e=>`
      <div class="sp-row" style="gap: 8px; height: 17px">
        <span class="sp-label" style="flex: 0 0 46px; font-size: 10px">${e.key}</span>
        <span class="sp-text" data-part="value-${e.key}"
              style="flex: 0 0 138px; font-size: 11px; color: var(--sp-ink); font-variant-numeric: tabular-nums">${e.text(i.from)}</span>
        <span class="sp-text" style="font-size: 10px; white-space: nowrap">${e.axes}</span>
      </div>`).join(``),c=e=>`
    <div class="sp-stack" style="gap: 4px">
      <div class="sp-row">
        <span class="sp-label" style="color: var(--sp-ink)">in ${e}</span>
      </div>
      <span data-part="strip-${e}" style="display: block; height: 34px; border-radius: 5px;
            background: ${o(e,i.from,i.to)}"></span>
    </div>`;r.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Endpoints" data-part="segmented" data-value="${n}">
            <button class="sp-segment" data-part="seg-blue" value="blue">Blue</button>
            <button class="sp-segment" data-part="seg-rose" value="rose">Rose</button>
            <button class="sp-segment" data-part="seg-green" value="green">Green</button>
          </sp-segmented>
        </div>

        <div class="sp-row sp-context" data-part="readouts" style="gap: 10px; margin-top: 12px; align-items: flex-start">
          <span class="sp-swatch" data-part="sample" style="flex: 0 0 auto; width: 34px; height: 51px;
                --sp-swatch: ${i.from}"></span>
          <div class="sp-stack" style="gap: 0">${s}</div>
        </div>

        <div class="sp-stack" data-part="panel" data-subject data-pair="${n}"
             style="gap: 10px; margin-top: 12px; padding: 10px; border-radius: var(--sp-radius); background: var(--sp-sunken)">
          ${c(`srgb`)}
          ${c(`oklch`)}
        </div>
      </div>
    </div>
  `;let l=e(r,`panel`),u=e(r,`sample`),d=n=>{let i=t[n];if(i){l.dataset.pair=n,u.style.setProperty(`--sp-swatch`,i.from);for(let t of a)e(r,`value-${t.key}`).textContent=t.text(i.from);for(let t of[`srgb`,`oklch`])e(r,`strip-${t}`).style.background=o(t,i.from,i.to)}};e(r,`segmented`).addEventListener(`change`,e=>d(e.detail))}export{s as mount};