import{n as e,r as t}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var n={blue:`#3557E8`,green:`#2E9E5B`,amber:`#D8A21A`},r=`blue`,i=7,a=e=>[Number.parseInt(e.slice(1,3),16)/255,Number.parseInt(e.slice(3,5),16)/255,Number.parseInt(e.slice(5,7),16)/255],o=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,s=e=>e<=.0031308?e*12.92:1.055*e**(1/2.4)-.055;function c(e){let[t,n,r]=e.map(o),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*r),a=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*r),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*r),c=.2104542553*i+.793617785*a-.0040720468*s,l=1.9779984951*i-2.428592205*a+.4505937099*s,u=.0259040371*i+.7827717662*a-.808675766*s,d=Math.atan2(u,l)*180/Math.PI;return{l:c,c:Math.hypot(l,u),h:d<0?d+360:d}}function l(e){let[t,n,r]=e,i=Math.max(t,n,r),a=Math.min(t,n,r),o=(i+a)/2,s=i-a,c=0;return s!==0&&(c=i===t?(n-r)/s%6:i===n?(r-t)/s+2:(t-n)/s+4,c=(c*60+360)%360),{h:c,s:s===0?0:s/(1-Math.abs(2*o-1)),l:o}}function u(e,t,n){let r=(1-Math.abs(2*n-1))*t,i=r*(1-Math.abs(e/60%2-1)),a=n-r/2,o=e<60?[r,i,0]:e<120?[i,r,0]:e<180?[0,r,i]:e<240?[0,i,r]:e<300?[i,0,r]:[r,0,i];return[o[0]+a,o[1]+a,o[2]+a]}var d=e=>`oklch(${e.toFixed(3)} 0 0)`;function f(e){let t=a(e),n=c(t),r=l(t).h,o=s(n.l**3),f={fill:[],grey:[],ticks:[]},p={fill:[],grey:[],ticks:[]};for(let e=0;e<i;e++){let t=e/6,i=n.c*t;f.fill.push(`oklch(${n.l.toFixed(3)} ${i.toFixed(3)} ${n.h.toFixed(1)})`),f.grey.push(d(n.l)),f.ticks.push(i.toFixed(2));let a=u(r,t,o);p.fill.push(`hsl(${r.toFixed(0)} ${Math.round(t*100)}% ${Math.round(o*100)}%)`),p.grey.push(d(c(a).l)),p.ticks.push(`${Math.round(t*100)}%`)}return{base:n,hslHue:r,hslL:o,chroma:f,saturation:p}}var p=(e,t,n)=>t.map(t=>`<span class="sp-swatch" data-part="${e}" style="flex: 1 1 0; height: ${n}px; border-radius: 0; --sp-swatch: ${t}"></span>`).join(``),m=(e,t)=>t.map(t=>`<span class="sp-label" data-part="${e}" style="flex: 1 1 0; text-align: center; font-size: 9px">${t}</span>`).join(``);function h(i){let a=f(n[r]??`#3557E8`);i.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Base" data-part="segmented" data-value="${r}">
            <button class="sp-segment" data-part="seg-blue" value="blue">Blue</button>
            <button class="sp-segment" data-part="seg-green" value="green">Green</button>
            <button class="sp-segment" data-part="seg-amber" value="amber">Amber</button>
          </sp-segmented>
        </div>

        <div class="sp-stack" style="gap: 3px; margin-top: 10px">
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-label" data-part="chroma-formula">oklch(L C H)</span>
            <span class="sp-text" style="font-size: 11px">chroma, absolute</span>
          </div>
          <div data-part="ramp" data-subject data-hue="${r}"
               style="display: flex; border-radius: 5px; overflow: hidden">${p(`chroma-cell`,a.chroma.fill,34)}</div>
          <div class="sp-row sp-context" style="gap: 0">${p(`chroma-grey`,a.chroma.grey,6)}</div>
          <div class="sp-row sp-context" style="gap: 0">${m(`chroma-tick`,a.chroma.ticks)}</div>
        </div>

        <div class="sp-stack sp-context" style="gap: 3px; margin-top: 10px">
          <div class="sp-row sp-row--between">
            <span class="sp-label" data-part="hsl-formula">hsl(H S L)</span>
            <span class="sp-text" style="font-size: 11px">saturation, relative</span>
          </div>
          <div data-part="sat-ramp" style="display: flex; border-radius: 5px; overflow: hidden">${p(`sat-cell`,a.saturation.fill,34)}</div>
          <div class="sp-row" style="gap: 0">${p(`sat-grey`,a.saturation.grey,6)}</div>
          <div class="sp-row" style="gap: 0">${m(`sat-tick`,a.saturation.ticks)}</div>
        </div>
      </div>
    </div>
  `;let o=e(i,`ramp`),s=e(i,`chroma-formula`),c=e(i,`hsl-formula`),l=(e,n)=>{t(i,e).forEach((e,t)=>{e.style.setProperty(`--sp-swatch`,n[t]??``)})},u=(e,n)=>{t(i,e).forEach((e,t)=>{e.textContent=n[t]??``})},d=e=>{let t=n[e];if(!t)return;let r=f(t);o.dataset.hue=e,l(`chroma-cell`,r.chroma.fill),l(`chroma-grey`,r.chroma.grey),l(`sat-cell`,r.saturation.fill),l(`sat-grey`,r.saturation.grey),s.textContent=`oklch(${r.base.l.toFixed(2)} C ${r.base.h.toFixed(0)})`,c.textContent=`hsl(${r.hslHue.toFixed(0)} S ${Math.round(r.hslL*100)}%)`,u(`chroma-tick`,r.chroma.ticks),u(`sat-tick`,r.saturation.ticks)};d(r),e(i,`segmented`).addEventListener(`change`,e=>d(e.detail))}export{h as mount};