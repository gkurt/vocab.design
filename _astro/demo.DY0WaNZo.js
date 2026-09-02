var e=`#151a4a`,t=`#e0a83c`,n=`#f0cf8f`,r=`#c2542f`,i=`#f2e6d0`,a=[[46,18,1.4,.9],[72,40,1,.6],[96,14,1.7,.85],[124,34,1.1,.55],[150,20,1.3,.75],[178,12,1,.5],[206,30,1.5,.8],[238,16,1.1,.6],[258,44,1.3,.7],[58,62,1.2,.5],[86,84,1,.45],[112,60,1.5,.7],[140,92,1.1,.5],[166,106,1.3,.6],[222,84,1,.45],[250,104,1.4,.65],[64,122,1.1,.5],[92,140,1.3,.6],[200,128,1,.45],[232,138,1.2,.55]],o=[t,r,i,t,r,i,t,r],s=[t,i,r,t,i,r,t,i,r,t,i];function c(){return o.map((e,t)=>{let n=t*22;return`<polygon points="14,${n} 25,${n+11} 14,${n+22} 3,${n+11}" fill="${e}" opacity="0.92"/>`}).join(``)}function l(){return s.map((e,t)=>{let n=36+t*21;return`<polygon points="${n},170 ${n+10.5},150 ${n+21},170" fill="${e}" opacity="0.9"/>`}).join(``)}var u=`
  <g stroke="${t}" stroke-width="2" fill="none" stroke-linejoin="round">
    <path d="M62 148h48l-7-22H69Z"/>
    <path d="M70 126h32l-6-20H76Z"/>
    <path d="M77 106h18l-4-18h-10Z"/>
    <path d="M86 88V72"/>
  </g>
  <circle cx="86" cy="68" r="5" fill="${n}"/>`,d=`linear-gradient(45deg, ${t} 25%, transparent 25%) 0 0 / 9px 9px,
  linear-gradient(-45deg, ${r} 25%, transparent 25%) 0 0 / 9px 9px, ${e}`;function f(n){let o=`
    <svg data-part="panel" viewBox="0 0 270 172" width="270" height="172" role="presentation" style="display: block">
      <defs>
        <linearGradient id="af-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#101438"/>
          <stop offset="0.55" stop-color="#1d2464"/>
          <stop offset="1" stop-color="#2b1d4e"/>
        </linearGradient>
        <radialGradient id="af-glow" cx="0.72" cy="0.26" r="0.52">
          <stop offset="0" stop-color="${t}" stop-opacity="0.46"/>
          <stop offset="1" stop-color="${t}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="270" height="172" fill="url(#af-sky)"/>
      <rect width="270" height="172" fill="url(#af-glow)"/>
      <g fill="${i}">${a.map(([e,t,n,r])=>`<circle cx="${e}" cy="${t}" r="${n}" opacity="${r}"/>`).join(``)}</g>
      <g data-part="orbit">
        <ellipse cx="192" cy="66" rx="64" ry="25" fill="none" stroke="${t}" stroke-width="2" transform="rotate(-19 192 66)"/>
        <circle cx="192" cy="66" r="27" fill="${r}"/>
        <path d="M192 39a27 27 0 0 1 0 54Z" fill="${t}" opacity="0.85"/>
      </g>
      ${u}
      <g data-part="pattern">${c()}${l()}</g>
      <rect x="28" y="0" width="3" height="172" fill="${t}" opacity="0.85"/>
    </svg>`,s=`
    <div data-part="fragment" data-subject
         style="display: flex; flex-direction: column; width: 154px; height: 172px; overflow: hidden; background: ${e};
                color: ${i}; box-shadow: 0 6px 16px rgb(12 10 30 / 0.4)">
      <span aria-hidden="true" style="flex: 0 0 auto; height: 7px; background: ${d}"></span>
      <div style="display: flex; flex-direction: column; flex: 1 1 auto; padding: 11px 12px 12px">
        <span data-part="fragment-eyebrow"
              style="font-size: 9px; font-weight: 700; letter-spacing: 0.2em; line-height: 1.2; color: ${t}">ORBITAL LINE</span>
        <span data-part="fragment-heading"
              style="margin-top: 4px; font-size: 17px; font-weight: 800; letter-spacing: 0.02em; line-height: 1.15">
          DEPARTURES
        </span>
        <span data-part="fragment-rule" aria-hidden="true"
              style="height: 10px; margin: 9px 0 10px; background: ${d}"></span>
        <span style="font-size: 11px; line-height: 1.45">22:40 &middot; Ring station</span>
        <span style="font-size: 11px; line-height: 1.45; opacity: 0.7">Gate 4, boarding</span>
        <button type="button" data-part="fragment-button"
                style="align-self: flex-start; margin-top: auto; padding: 6px 16px 7px; border: 0; border-radius: 2px;
                       background: ${t}; color: #241804; font: inherit; font-size: 11px; font-weight: 700;
                       letter-spacing: 0.12em; line-height: 1.1; cursor: pointer">
          BOARD
        </button>
      </div>
    </div>`,f=(e,t,n)=>`
    <div class="sp-stack${t?` sp-context`:``}" style="flex: 0 0 ${n}px; gap: 5px; align-items: stretch">
      ${e}
    </div>`;n.innerHTML=`
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 10px 14px 11px">
        <div class="sp-row" data-part="tour" style="gap: 12px; align-items: flex-start; justify-content: center">
          ${f(o,!0,270)}
          ${f(s,!1,154)}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Sixty years of music and writing behind it, not a colour scheme.
      </p>
    </div>
  `}export{f as mount};