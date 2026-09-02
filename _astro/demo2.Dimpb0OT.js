var e=`#f2f1ec`,t=`#141414`,n=`#ff3b1f`,r=[14,62,110,158],i=[{top:16,left:14,width:132,height:2},{top:24,left:24,width:122,height:4},{top:36,left:34,width:112,height:7},{top:52,left:44,width:102,height:11}],a=[{char:`T`,dy:0,weight:800,hot:!1},{char:`Y`,dy:-9,weight:300,hot:!1},{char:`P`,dy:5,weight:800,hot:!1},{char:`O`,dy:-4,weight:500,hot:!0}];function o(e,t,n){return`
    <span data-part="${e}" aria-hidden="true"
          style="position: absolute; ${t}; ${n}; background-color: #cbc7bd;
                 background-image: radial-gradient(circle at 50% 50%, rgb(20 20 20 / 0.66) 0 1.2px, transparent 1.5px); background-size: 4px 4px"></span>`}function s(n,r,i=``){return`
    <span data-part="${n}"${i}
          style="position: relative; display: block; width: 212px; height: 168px; overflow: hidden; background: ${e};
                 color: ${t}">
      ${r}
    </span>`}function c(e,t,n){return`
    <div class="sp-stack${n?` sp-context`:``}" style="flex: 0 0 212px; gap: 5px; align-items: stretch">
      ${t}
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${e}</span>
    </div>`}function l(l){let u=r.map(e=>`<span aria-hidden="true" style="position: absolute; left: ${e}px; top: 0; width: 2px; height: 100%; background: #d5d2c9"></span>`).join(``),d=i.map(e=>`<span aria-hidden="true" style="position: absolute; left: ${e.left}px; top: ${e.top}px; width: ${e.width}px; height: ${e.height}px; background: ${t}"></span>`).join(``),f=a.map(e=>`<span style="display: inline-block; translate: 0 ${e.dy}px; font-weight: ${e.weight}; color: ${e.hot?n:t}">${e.char}</span>`).join(``),p=`
    <span data-part="guides" aria-hidden="true" style="position: absolute; inset: 0">${u}</span>
    <span data-part="stair" aria-hidden="true" style="position: absolute; inset: 0">${d}</span>
    ${o(`halftone`,`right: 8px; top: 10px`,`width: 56px; height: 52px; rotate: 6deg`)}

    <span data-part="display"
          style="position: absolute; left: 10px; top: 74px; font-size: 42px; line-height: 1; letter-spacing: 0.2em">
      ${f}
    </span>

    <span aria-hidden="true" style="position: absolute; left: 14px; top: 118px; width: 118px; height: 5px; background: ${n}"></span>

    <span data-part="angled"
          style="position: absolute; left: 16px; top: 142px; font-size: 10px; font-weight: 500; letter-spacing: 0.34em;
                 line-height: 1.2; rotate: -13deg; transform-origin: left center">
      BASEL 72
    </span>

    <span data-part="reversed"
          style="position: absolute; right: 10px; bottom: 12px; display: block; padding: 4px 9px 5px; background: ${t};
                 color: ${e}; font-size: 10px; font-weight: 600; letter-spacing: 0.22em; line-height: 1.2">
      NEW WAVE
    </span>`;l.innerHTML=`
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <div class="sp-row" data-part="tour" style="gap: 12px; align-items: flex-start; justify-content: center">
          ${c(`Swiss`,s(`poster-swiss`,`
    <span data-part="swiss-head"
          style="position: absolute; left: 14px; top: 18px; font-size: 42px; font-weight: 600; letter-spacing: 0;
                 line-height: 1">
      TYPO
    </span>
    <span aria-hidden="true" style="position: absolute; left: 14px; top: 74px; width: 184px; height: 2px; background: ${t}"></span>
    ${o(`swiss-halftone`,`left: 14px; top: 86px`,`width: 84px; height: 62px`)}
    <span data-part="swiss-caption"
          style="position: absolute; left: 110px; top: 86px; width: 88px; font-size: 10px; line-height: 1.5">
      Lectures and workshop, 14 to 28 June.
    </span>
    <span aria-hidden="true" style="position: absolute; left: 14px; top: 156px; width: 184px; height: 2px; background: ${t}"></span>`),!0)}
          ${c(`New Wave`,s(`poster`,p,` data-subject`),!1)}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        A violation needs something to violate.
      </p>
    </div>
  `}export{l as mount};