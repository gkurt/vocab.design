var e=`#ece3d2`,t=`#f7f1e4`,n=`#241f1b`,r=[1.9,-2.6,3.2,-1.1,2.4,-3.1,1.3,-2.2,2.8,-1.7,2.1,-2.9,1.6,-1.4],i=[2.4,-1.3,1.7,-2.9,3,-1.8,2.2,-2.5,1.4,-3.2,2.7,-1.1],a=[1.4,-2.1,2.8,-1.5,2,-2.7,3.1,-1.2,1.8,-2.4],o=[3.4,-1.1,4.6,-2.6,1.5,-3.9,2.9,-1.3,3.7,-2.2,1.1,-4.3,2.4];function s(e,t,n,r=5){let i=[],a=0,o=()=>n[a++%n.length]??0;for(let t=0;t<=r;t++)i.push(`${(t/r*e).toFixed(1)},${(-o()).toFixed(1)}`);for(let n=1;n<=r;n++)i.push(`${(e+o()).toFixed(1)},${(n/r*t).toFixed(1)}`);for(let n=r-1;n>=0;n--)i.push(`${(n/r*e).toFixed(1)},${(t+o()).toFixed(1)}`);for(let e=r-1;e>=1;e--)i.push(`${(-o()).toFixed(1)},${(e/r*t).toFixed(1)}`);return`M${i.join(`L`)}Z`}function c(e,n,r,i,a,o,c=``){let l=s(r,i,a);return`
    <g data-part="${e}" transform="${n}" style="filter: drop-shadow(2px 3px 2px rgb(45 33 20 / 0.32))">
      <path d="${l}" fill="${o}"/>
      ${c}
      <path d="${l}" fill="none" stroke="${t}" stroke-width="5" stroke-linejoin="round"/>
    </g>`}function l(e){return`
    <defs>
      <filter id="${e}-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch" seed="7"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <pattern id="${e}-dots" width="5" height="5" patternUnits="userSpaceOnUse">
        <rect width="5" height="5" fill="#ded5c3"/>
        <circle cx="2.5" cy="2.5" r="1.6" fill="${n}"/>
      </pattern>
      <linearGradient id="${e}-photo" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#5a7c95"/>
        <stop offset="1" stop-color="#1e2c39"/>
      </linearGradient>
      <linearGradient id="${e}-warm" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#dd9147"/>
        <stop offset="1" stop-color="#a8382a"/>
      </linearGradient>
    </defs>`}function u(e,t,n){return`
    <div class="sp-stack" style="gap: 3px; align-items: stretch">
      <svg data-part="${e}" viewBox="0 0 150 34" width="150" height="34" role="presentation" style="display: block; border-radius: 2px">
        ${n}
      </svg>
      <span class="sp-label" style="font-size: 11px; line-height: 1.2">${t}</span>
    </div>`}function d(d){d.innerHTML=`
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">Collage no. 14</span>

        <div class="sp-row" data-part="tour" style="gap: 14px; align-items: flex-start; justify-content: center">
          <div class="sp-stack" style="flex: 0 0 272px; gap: 5px; align-items: stretch">
            <div data-part="composition" data-subject style="width: 272px; height: 162px; overflow: hidden; border-radius: 2px">
              ${`
    <svg viewBox="0 0 272 162" width="272" height="162" role="presentation" style="display: block">
      ${l(`dc`)}
      <rect width="272" height="162" fill="${e}"/>
      <rect data-part="grain" width="272" height="162" filter="url(#dc-grain)" opacity="0.26"/>

      ${c(`frag-photo`,`translate(10 22) rotate(-5)`,116,96,r,`url(#dc-photo)`,`<circle cx="40" cy="34" r="17" fill="#e8dcc4" opacity="0.85"/>
         <path d="M8 96 46 52l26 26 20-16 24 34Z" fill="#0f1a24" opacity="0.6"/>`)}

      ${c(`frag-dots`,`translate(152 10) rotate(6)`,92,66,i,`url(#dc-dots)`,`<circle cx="46" cy="33" r="20" fill="${t}" opacity="0.55"/>`)}

      ${c(`frag-strip`,`translate(156 90) rotate(-9)`,92,50,a,`url(#dc-warm)`,`<rect x="10" y="14" width="34" height="22" fill="${n}" opacity="0.55"/>
         <rect x="52" y="8" width="30" height="34" fill="${t}" opacity="0.6"/>`)}

      <g data-part="tab" transform="translate(104 84) rotate(8)">
        <rect width="58" height="19" fill="#c04630"/>
        <text x="7" y="14" font-size="11" font-weight="700" letter-spacing="1.4" fill="${t}">MIXED</text>
      </g>

      <text data-part="headline" x="12" y="152" transform="rotate(-4 12 152)"
            font-family="Georgia, 'Times New Roman', serif" font-size="32" font-weight="700" letter-spacing="-1" fill="${n}">PASTE</text>

      <text data-part="hand" x="150" y="150" transform="rotate(3 150 150)"
            font-size="9.5" letter-spacing="0.6" fill="#5c5147">no. 14, cut &amp; laid down</text>
    </svg>`}
            </div>
            <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">The composition</span>
          </div>
          ${`
    <div class="sp-stack sp-context" data-part="strip" style="flex: 0 0 150px; gap: 6px; align-items: stretch">
        ${u(`ing-torn`,`Torn edge`,`<rect width="150" height="34" fill="#cdbfa4" opacity="0.5"/>
           <g transform="translate(10 4)" style="filter: drop-shadow(1px 2px 1px rgb(45 33 20 / 0.3))">
             <path d="${s(130,26,o,8)}" fill="#3b556b"/>
             <path d="${s(130,26,o,8)}" fill="none" stroke="${t}" stroke-width="4" stroke-linejoin="round"/>
           </g>`)}
        ${u(`ing-grain`,`Paper grain`,`${l(`dg`)}
           <rect width="150" height="34" fill="${e}"/>
           <rect width="150" height="34" filter="url(#dg-grain)" opacity="0.62"/>`)}
        ${u(`ing-dots`,`Halftone`,`${l(`dh`)}
           <rect width="150" height="34" fill="url(#dh-dots)"/>
           <circle cx="42" cy="17" r="13" fill="${t}" opacity="0.6"/>`)}
    </div>`}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Assembled from found material, which is why the seams are left showing.
      </p>
    </div>
  `}export{d as mount};