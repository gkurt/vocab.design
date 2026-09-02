var e=`#4f6b46`,t=`#7a5c44`,n=`#9fbecd`,r=`#c58a63`,i=[`radial-gradient(150px 120px at 86% 4%, rgb(255 240 199 / 0.9), rgb(255 240 199 / 0) 72%)`,`linear-gradient(166deg, #e7f0f1 0%, #f6f1e6 52%, #ede2ce 100%)`].join(`, `),a=274,o=180,s=150;function c(e,t,n){let r=t/2,i=r-1.5,a=(e/2).toFixed(1),o=(e-1.5).toFixed(1),s=`M1.5 ${r} Q ${a} ${r-i*2} ${o} ${r} Q ${a} ${r+i*2} 1.5 ${r} Z`,c=[.2,.36,.52,.68,.84].map(t=>{let n=(e*t).toFixed(1),a=4*i*t*(1-t)*.66,o=a.toFixed(1),s=(a*.82).toFixed(1);return`<path d="M${n} ${r} l${o} -${s}"/><path d="M${n} ${r} l${o} ${s}"/>`}).join(``);return`
    <svg viewBox="0 0 ${e} ${t}" width="${e}" height="${t}" role="presentation" style="display: block">
      <g fill="none" stroke="${n}" stroke-width="2" stroke-linecap="round">
        <path d="${s}"/><path d="M4 ${r}h${e-8}"/>${c}
      </g>
    </svg>`}function l(e,t,n){return`
    <div class="sp-row" data-part="${e}" style="gap: 9px; align-items: center">
      <span aria-hidden="true" style="flex: 0 0 46px; display: block">${n}</span>
      <span class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.3">${t}</span>
    </div>`}function u(u){let d=[e,`#93a882`,t,r,n].map(e=>`<span aria-hidden="true" style="flex: 1 1 0; height: 16px; border-radius: 5px 2px 5px 2px; background: ${e}"></span>`).join(``),f=`
    <div class="sp-stack sp-context" data-part="reference" style="flex: 0 0 ${s}px; gap: 9px">
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">This week</span>
      ${l(`ref-blob`,`Water the ferns on Thursday.`,`<span style="display: block; width: 46px; height: 34px; background: ${e};
                      border-radius: 58% 42% 46% 54% / 62% 38% 62% 38%"></span>`)}
      ${l(`ref-corner`,`Move the seedlings to the sill.`,`<span style="display: block; width: 46px; height: 34px; background: ${r};
                      border-radius: 20px 5px 22px 7px"></span>`)}
      ${l(`ref-vein`,`First frost expected around the 12th.`,c(46,30,t))}
      <div class="sp-row" data-part="ref-palette" style="gap: 4px; margin-top: 2px">${d}</div>
    </div>`;u.innerHTML=`
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <span class="sp-heading" data-part="heading" style="display: block; margin-bottom: 9px">Glasshouse</span>

        <div class="sp-row" data-part="tour" style="gap: 14px; align-items: flex-start; justify-content: center">
          ${`
    <div data-part="panel" data-subject
         style="position: relative; display: flex; flex-direction: column; gap: 9px; width: ${a}px; height: ${o}px;
                padding: 13px 14px; color: #2f3529; background-image: ${i}; border-radius: 30px 12px 32px 14px;
                box-shadow: 0 5px 16px rgb(58 62 44 / 0.16)">
      <div class="sp-row sp-row--between" data-part="panel-head">
        <span style="font-size: 14px; font-weight: 600; letter-spacing: 0.01em">Tuesday, early</span>
        <span data-part="panel-seed" aria-hidden="true"
              style="width: 26px; height: 22px; background: ${n}; border-radius: 64% 36% 52% 48% / 58% 42% 62% 38%"></span>
      </div>

      <div data-part="panel-hero"
           style="position: relative; display: flex; flex-direction: column; justify-content: center; gap: 3px; height: 62px;
                  padding: 0 26px; background: linear-gradient(122deg, ${e}, #63805a); color: #f6f1e6;
                  border-radius: 44px 18px 48px 22px">
        <span style="font-size: 11px; letter-spacing: 0.05em; opacity: 0.86">DAYLIGHT LEFT</span>
        <span style="font-size: 19px; font-weight: 600; line-height: 1.1">4 h 20 m</span>
        <span aria-hidden="true"
              style="position: absolute; right: 16px; top: 12px; width: 38px; height: 38px; background: rgb(246 241 230 / 0.26);
                     border-radius: 58% 42% 46% 54% / 62% 38% 62% 38%"></span>
      </div>

      <span data-part="vein" aria-hidden="true" style="display: block; height: 20px; opacity: 0.55">
        ${c(246,20,t)}
      </span>

      <div class="sp-row" data-part="panel-tiles" style="gap: 9px; margin-top: auto">
        <span data-part="tile-water"
              style="flex: 1 1 0; padding: 7px 11px 8px; background: rgb(159 190 205 / 0.55); border-radius: 6px 20px 6px 20px">
          <span style="display: block; font-size: 11px; opacity: 0.78">Rain</span>
          <span style="display: block; font-size: 14px; font-weight: 600">6 mm</span>
        </span>
        <span data-part="tile-soil"
              style="flex: 1 1 0; padding: 7px 11px 8px; background: rgb(197 138 99 / 0.42); border-radius: 20px 6px 20px 6px">
          <span style="display: block; font-size: 11px; opacity: 0.78">Soil</span>
          <span style="display: block; font-size: 14px; font-weight: 600">Damp</span>
        </span>
      </div>
    </div>`}
          ${f}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        Earth colour, uneven edges, and light that falls off across the surface.
      </p>
    </div>
  `}export{u as mount};