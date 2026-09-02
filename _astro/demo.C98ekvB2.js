import{n as e}from"./parts.C-YLuC7Q.js";import"./segmented.DtyfKPDf.js";var t=424,n=152,r=34,i=14,a=378,o=112,s=126,c=2,l=50,u=[{key:`mar`,label:`Mar`,value:28},{key:`apr`,label:`Apr`,value:34},{key:`may`,label:`May`,value:31},{key:`jun`,label:`Jun`,value:42},{key:`jul`,label:`Jul`,value:47}],d=a/u.length,f=34,p=8,m=[0,.25,.5,.75,1],h=e=>r+e*d+(d-f)/2,g=e=>e/l*o,_=e=>s-g(e),v=2+m.length+u.length*3+2+1,y={laden:`Non-data ink: ${v} marks wrapped around 5 numbers.`,stripped:`All ${v} erased. Every one of the 5 numbers survived it.`};function b(e,t,n,r){let i=[];for(let a=0;a<24;a++){let o=a%2==0?n:r,s=a*Math.PI/12-Math.PI/2;i.push(`${(e+Math.cos(s)*o).toFixed(1)},${(t+Math.sin(s)*o).toFixed(1)}`)}return i.join(` `)}function x(d){let v=m.map(e=>{let t=(s-e*o).toFixed(1);return`<line x1="${r}" y1="${t}" x2="412" y2="${t}"
      stroke="#7a5ad6" stroke-width="3" stroke-dasharray="7 4" opacity="0.6" />`}).join(``),x=u.map((e,t)=>{let n=h(t),r=_(e.value),i=`${n},${r} ${n+p},${r-p} ${n+f+p},${r-p} ${n+f},${r}`,a=`${n+f},${r} ${n+f+p},${r-p} ${n+f+p},118 ${n+f},${s}`;return`
      <ellipse cx="${(n+f/2+5).toFixed(1)}" cy="130" rx="22" ry="3.5" fill="rgb(16 24 40 / 0.26)" />
      <polygon points="${i}" fill="url(#cj-top)" />
      <polygon points="${a}" fill="url(#cj-side)" />`}).join(``),S=u.map((e,t)=>{let n=g(e.value);return`<rect
        data-part="bar-${e.key}"
        x="${h(t).toFixed(1)}" y="${_(e.value).toFixed(1)}" width="${f}" height="${n.toFixed(1)}"
        fill="var(--sp-accent)"
      />`}).join(``),C=u.map((e,t)=>`<text x="${(h(t)+f/2).toFixed(1)}" y="141" text-anchor="middle" fill="var(--sp-muted)" font-size="10">${e.label}</text>`).join(``),w=[0,.5,1].map(e=>{let t=s-e*o;return`
        <line x1="29" y1="${t.toFixed(1)}" x2="${r}" y2="${t.toFixed(1)}" stroke="var(--sp-ink)" stroke-width="${c}" />
        <text x="25" y="${(t+3.5).toFixed(1)}" text-anchor="end" fill="var(--sp-ink)" font-size="9"
          style="font-variant-numeric: tabular-nums">${Math.round(e*l)}</text>`}).join(``);d.innerHTML=`
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 262px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Units shipped, thousands</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Version" data-term="laden" data-part="picker" data-value="laden">
            <button class="sp-segment" type="button" data-part="seg-laden" value="laden" style="padding: 4px 10px; font-size: 12px">
              as delivered
            </button>
            <button class="sp-segment" type="button" data-part="seg-stripped" value="stripped" style="padding: 4px 10px; font-size: 12px">
              ink erased
            </button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div class="sp-surface" style="flex: 0 0 auto; width: 444px; padding: 8px 9px">
            <svg
              data-part="plot"
              role="img"
              aria-label="Units shipped over five months, rising from twenty eight to forty seven thousand"
              viewBox="0 0 ${t} ${n}"
              width="${t}"
              height="${n}"
              style="display: block"
            >
              <defs>
                <linearGradient id="cj-sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stop-color="#b9d6ff" />
                  <stop offset="1" stop-color="#ffd2e8" />
                </linearGradient>
                <linearGradient id="cj-top" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stop-color="#a4bbff" />
                  <stop offset="1" stop-color="#5d7ced" />
                </linearGradient>
                <linearGradient id="cj-side" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stop-color="#3f56c4" />
                  <stop offset="1" stop-color="#232f78" />
                </linearGradient>
                <pattern id="cj-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="9" stroke="#ffffff" stroke-width="3.4" opacity="0.55" />
                </pattern>
              </defs>

              <g data-part="junk" data-subject data-pose="[data-mode=laden]" data-mode="laden" style="transition: opacity 0.4s var(--sp-ease)">
                <rect x="${r}" y="${i}" width="${a}" height="${o}" fill="url(#cj-sky)" />
                <rect x="${r}" y="${i}" width="${a}" height="${o}" fill="url(#cj-hatch)" />
                ${v}
                ${x}
                <polygon points="${b(80,40,24,12)}" fill="#ffb020" stroke="#d1720f" stroke-width="2" stroke-linejoin="round" />
                <text x="80" y="44" text-anchor="middle" fill="#6d2f00" font-size="11" font-weight="700"
                  transform="rotate(-11 80 40)">RECORD!</text>
                <rect x="3" y="3" width="418" height="146" rx="4" fill="none" stroke="#1e3a8f" stroke-width="6" />
              </g>

              <g class="sp-context">
                ${S}
                <line x1="${r}" y1="${s}" x2="412" y2="${s}" stroke="var(--sp-muted)" stroke-width="${c}" />
                ${C}
              </g>

              <g data-part="axis">
                <line x1="${r}" y1="${i}" x2="${r}" y2="${s}" stroke="var(--sp-ink)" stroke-width="${c}" />
                ${w}
              </g>
            </svg>
          </div>

          <span
            class="sp-label sp-context"
            data-stage-verdict
            data-part="tally"
            data-mode="laden"
            style="flex: 0 0 auto; height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap"
          >${y.laden}</span>
        </div>
      </div>
    </div>
  `;let T=e(d,`junk`),E=e(d,`tally`),D=e=>{let t=y[e];t&&(T.dataset.mode=e,T.style.opacity=e===`laden`?`1`:`0`,E.dataset.mode=e,E.textContent=t)};e(d,`picker`).addEventListener(`change`,e=>D(e.detail)),D(`laden`)}export{x as mount};