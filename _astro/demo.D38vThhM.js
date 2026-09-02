import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=Math.PI/180,n=e=>e*e*e,r=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055,i=e=>Math.min(1,Math.max(0,e));function a(e,r,i){let a=r*Math.cos(i*t),o=r*Math.sin(i*t),s=n(e+.3963377774*a+.2158037573*o),c=n(e-.1055613458*a-.0638541728*o),l=n(e-.0894841775*a-1.291485548*o);return[4.0767416621*s-3.3077115913*c+.2309699292*l,-1.2684380046*s+2.6097574011*c-.3413193965*l,-.0041960863*s-.7034186147*c+1.707614701*l]}var o=([e,t,n])=>.2126*e+.7152*t+.0722*n,s=e=>e>.008856?116*Math.cbrt(Math.max(e,0))-16:903.3*Math.max(e,0);function c(e,t,n){let r=0,i=1;for(let c=0;c<34;c++){let c=(r+i)/2;s(o(a(c,e,t)))<n?r=c:i=c}return(r+i)/2}function l(e,t,n){let l=a(c(t,n,e),t,n).map(i);return{css:`color(srgb ${l.map(e=>r(e).toFixed(5)).join(` `)})`,measured:s(o(l)),ink:e>58?`#1A1D24`:`#F4F6FA`}}var u=[96,92,84,66,46,26],d=.018,f=[{key:`indigo`,name:`Indigo`,deg:264},{key:`teal`,name:`Teal`,deg:185},{key:`amber`,name:`Amber`,deg:70}],p=`indigo`,m=e=>f.find(t=>t.key===e)??f[0];function h(t){let n=e=>u.map((t,n)=>`<span class="sp-swatch" data-part="${e}-${n}"
                       style="flex: 1 1 0; min-width: 0; height: 34px; border-radius: 0; display: flex;
                              align-items: center; justify-content: center; font-size: 9px; font-weight: 600"></span>`).join(``),r=(e,t)=>`
    <div class="sp-row" data-part="ramp-${e}" ${t}
         style="gap: 0; overflow: hidden; border-radius: 5px; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)">
      ${n(e)}
    </div>`,i=(e,t)=>`
    <div class="sp-row sp-row--between sp-context" style="height: 13px">
      <span class="sp-label">${e}</span>
      <span class="sp-text" data-part="chroma-${t}" style="font-size: 9px; font-variant-numeric: tabular-nums"></span>
    </div>`,a=e=>`
    <div data-part="card-${e}" data-hue="${p}"
         style="height: 62px; padding: 9px 10px; border-radius: 6px; border: 1px solid transparent">
      <div data-part="card-title-${e}" style="font-size: 9.5px; font-weight: 600">Notifications</div>
      <div class="sp-stack" style="gap: 5px; margin-top: 7px">
        <span data-part="card-line-a-${e}" style="display: block; height: 6px; width: 100%; border-radius: 3px"></span>
        <span data-part="card-line-b-${e}" style="display: block; height: 6px; width: 64%; border-radius: 3px"></span>
      </div>
    </div>`;t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Brand hue" data-value="${p}">
            ${f.map(e=>`<button class="sp-segment" data-part="seg-${e.key}" value="${e.key}">${e.name}</button>`).join(``)}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 14px; margin-top: 11px; align-items: flex-start">
          <div class="sp-stack" style="flex: 0 0 250px; gap: 3px">
            ${i(`Pure neutral`,`neutral`)}
            ${r(`neutral`,`data-chroma="0.000"`)}
            <div style="height: 5px"></div>
            ${i(`Tinted neutral`,`tinted`)}
            ${r(`tinted`,`data-subject data-hue="${p}" data-chroma="${d.toFixed(3)}"`)}
            <div class="sp-row sp-context" style="gap: 0">
              ${u.map((e,t)=>`<span class="sp-text" data-part="lstar-${t}" style="flex: 1 1 0; min-width: 0; text-align: center;
                                 height: 12px; font-size: 8.5px; font-variant-numeric: tabular-nums"></span>`).join(``)}
            </div>
            <span class="sp-label sp-context" style="height: 13px; font-size: 9px; line-height: 1.35">Measured CIE lightness</span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 0; min-width: 0; gap: 3px">
            <span class="sp-label">Built from the pure ramp</span>
            ${a(`neutral`)}
            <span class="sp-label" style="margin-top: 5px">Built from the tinted ramp</span>
            ${a(`tinted`)}
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 8px 0 0; height: 28px; font-size: 10px; line-height: 1.4"></p>
      </div>
    </div>
  `;let o=n=>{let r=m(n);if(!r)return;let i=u.map(e=>l(e,0,0)),a=u.map(e=>l(e,d,r.deg));e(t,`ramp-tinted`).dataset.hue=r.key,e(t,`chroma-neutral`).textContent=`OKLCH chroma 0.000`,e(t,`chroma-tinted`).textContent=`OKLCH chroma ${d.toFixed(3)} · hue ${r.deg}`;for(let[n,o]of[[`neutral`,i],[`tinted`,a]]){o.forEach((r,i)=>{let a=e(t,`${n}-${i}`);a.style.setProperty(`--sp-swatch`,r.css),a.style.color=r.ink,a.textContent=String(i+1)});let i=o[0],a=o[2],s=o[3],c=o[5];if(!(i&&a&&s&&c))continue;let l=e(t,`card-${n}`);l.dataset.hue=n===`tinted`?r.key:`none`,l.style.background=i.css,l.style.borderColor=a.css,e(t,`card-title-${n}`).style.color=c.css,e(t,`card-line-a-${n}`).style.background=s.css,e(t,`card-line-b-${n}`).style.background=a.css}i.forEach((n,r)=>{e(t,`lstar-${r}`).textContent=n.measured.toFixed(1)}),e(t,`caption`).textContent=`Both ramps land on the same six tones, so swapping one for the other changes no contrast ratio. Only the ${r.name.toLowerCase()} ramp moved.`};o(p),e(t,`segmented`).addEventListener(`change`,e=>o(e.detail))}export{h as mount};