var e=`#dda32b`,t=`#2b7d75`,n=`#c1552a`,r=`#332f29`,i=`Futura, 'Century Gothic', 'Avenir Next', var(--sp-font)`,a=[`repeating-radial-gradient(circle at 0 0, rgb(90 74 48 / 0.1) 0 0.6px, transparent 0.6px 3px)`,`repeating-radial-gradient(circle at 1.6px 2.5px, rgb(90 74 48 / 0.07) 0 0.5px, transparent 0.5px 3.6px)`].join(`, `),o=138,s=132,c=[0,30,60,90,120,150,180,210,240,270,300,330];function l(n,i){return`${c.map((e,a)=>{let o=a%2==0,s=o?31:18,c=e*Math.PI/180,l=(n+Math.cos(c)*s).toFixed(1),u=(i+Math.sin(c)*s).toFixed(1),d=o?`<circle cx="${l}" cy="${u}" r="2.6" fill="${r}"/>`:``;return`<line x1="${n}" y1="${i}" x2="${l}" y2="${u}" stroke="${o?r:t}" stroke-width="2" stroke-linecap="round"/>${d}`}).join(``)}<circle cx="${n}" cy="${i}" r="5.5" fill="${e}"/>`}function u(e,t){return`
    <svg data-part="${e}" viewBox="0 0 ${o} ${s}" width="${o}" height="${s}" role="presentation" style="display: block">
      <g transform="translate(0 8)">${t}</g>
    </svg>`}function d(e,t,n,r=``){return`
    <div class="sp-stack" style="flex: 0 0 ${o}px; gap: 5px; align-items: stretch">
      <div data-part="${e}"${r}
           style="position: relative; width: ${o}px; height: ${s}px; overflow: hidden; border-radius: 3px;
                  background-color: #f2e7d3; background-image: ${a}; background-size: 3.3px 3px, 4.4px 3.9px">
        ${n}
      </div>
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${t}</span>
    </div>`}function f(a){let o=u(`motif`,`${l(50,40)}
     <path data-part="boomerang" d="M14 100C28 74 58 62 86 70 62 78 38 90 26 106Z" fill="${n}"/>
     <ellipse cx="106" cy="40" rx="24" ry="10" fill="none" stroke="${t}" stroke-width="2" transform="rotate(-28 106 40)"/>
     <circle cx="106" cy="40" r="4" fill="${t}"/>`),s=u(`shapes`,`<path data-part="kidney" d="M18 34C18 18 42 11 59 19c15 7 27 2 35 10 10 10 2 26-14 26-18 0-26-8-40-6-14 2-22-4-22-15Z" fill="${t}"/>
     <rect x="16" y="72" width="30" height="30" fill="${n}"/>
     <circle cx="76" cy="87" r="15" fill="${e}"/>
     <path d="M106 71h16l-5 32h-6Z" fill="none" stroke="${r}" stroke-width="2" stroke-linejoin="round"/>`),c=`
    <div data-part="fragment" data-subject
         style="position: absolute; inset: 8px; display: flex; flex-direction: column; padding: 9px 10px 10px;
                border-radius: 3px; background: #faf3e6; color: ${r}; box-shadow: 0 4px 10px rgb(80 60 34 / 0.2)">
      <span data-part="fragment-eyebrow"
            style="font-family: ${i}; font-size: 9px; font-weight: 600; letter-spacing: 0.18em; line-height: 1.2; color: ${t}">
        NEW ARRIVALS
      </span>
      <span data-part="fragment-heading"
            style="margin-top: 3px; font-family: ${i}; font-size: 17px; font-weight: 600; letter-spacing: 0.09em; line-height: 1.2">
        SUNBURST
      </span>
      <span aria-hidden="true" style="width: 32px; height: 3px; margin-top: 6px; background: ${n}"></span>
      <span style="margin-top: 6px; font-size: 10px; line-height: 1.35; opacity: 0.82">Walnut and brass.</span>
      <button type="button" data-part="fragment-button"
              style="align-self: flex-start; margin-top: auto; padding: 5px 14px 6px; border: 0; border-radius: 999px;
                     background: ${e}; color: ${r}; font-family: ${i}; font-size: 11px; font-weight: 600;
                     letter-spacing: 0.08em; line-height: 1.1; cursor: pointer">
        RESERVE
      </button>
    </div>`;a.innerHTML=`
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <div class="sp-row" data-part="tour" style="gap: 11px; align-items: flex-start; justify-content: center">
          <div class="sp-context">
            ${d(`tile-motif`,`Motif`,o)}
          </div>
          <div class="sp-context">
            ${d(`tile-shapes`,`Shapes`,s)}
          </div>
          ${d(`tile-applied`,`Applied`,c)}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Muted mustard, teal and orange, on a ground with tooth in it.
      </p>
    </div>
  `}export{f as mount};