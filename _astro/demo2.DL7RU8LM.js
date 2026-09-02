var e=`#fdf8ef`,t=`#14161a`,n=`#ffe66d`,r=`#b8a1ea`,i=`#ff5a5f`,a=`#2f5de0`,o=`repeating-linear-gradient(45deg, ${t} 0 4px, ${e} 4px 8px)`,s=[[22,18,t,3],[68,12,a,2.5],[40,40,i,2],[80,46,t,2.5],[18,62,r,3],[60,74,t,2],[30,88,a,2.5]];function c(c){c.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="card" data-subject
           style="position: relative; width: 296px; height: 212px; background: ${e}; border: 3px solid ${t}; color: ${t}; overflow: hidden">

        <svg data-part="zigzag" aria-hidden="true" viewBox="0 0 296 16" preserveAspectRatio="none"
             style="position: absolute; left: 0; top: 12px; width: 100%; height: 16px">
          <polyline points="0,13 16,3 32,13 48,3 64,13 80,3 96,13 112,3 128,13 144,3 160,13 176,3 192,13 208,3 224,13 240,3 256,13 272,3 288,13"
                    fill="none" stroke="${a}" stroke-width="3.5" />
        </svg>

        <div data-part="title" style="position: absolute; left: 18px; top: 42px">
          <span style="display: inline-block; padding: 1px 7px; background: #7fe0cf; font-size: 10px; font-weight: 700; letter-spacing: 0.22em">MILANO 1981</span>
          <div style="margin-top: 6px; font-size: 31px; font-weight: 800; letter-spacing: -0.03em; line-height: 1">MEMPHIS</div>
          <div style="margin-top: 2px; font-size: 11px; font-weight: 600; color: #5c574f">Mobili e oggetti · Corso Europa 22</div>
        </div>

        <svg data-part="squiggle" aria-hidden="true" viewBox="0 0 140 34"
             style="position: absolute; left: 16px; bottom: 20px; width: 140px; height: 34px">
          <path d="M4 22 C 16 2, 30 2, 42 22 S 68 42, 80 22 S 106 2, 118 22 S 134 34, 136 26"
                fill="none" stroke="${i}" stroke-width="5" stroke-linecap="round" />
        </svg>

        <span data-part="terrazzo" aria-hidden="true"
              style="position: absolute; right: 18px; top: 40px; width: 76px; height: 104px; border: 3px solid ${t}; border-radius: 38px 38px 6px 6px; background-color: ${n}; background-image: ${s.map(([e,t,n,r])=>`radial-gradient(circle at ${e}% ${t}%, ${n} ${r}px, transparent ${r+.6}px)`).join(`, `)}"></span>

        <span aria-hidden="true">
          <span data-part="stripes" style="position: absolute; right: 30px; bottom: 26px; width: 50px; height: 24px; border: 3px solid ${t}; border-radius: 999px; background-image: ${o}"></span>
          <span style="position: absolute; left: 168px; bottom: 66px; width: 0; height: 0; border-left: 13px solid transparent; border-right: 13px solid transparent; border-bottom: 22px solid #f7a6c4"></span>
          <span style="position: absolute; left: 150px; top: 44px; width: 14px; height: 14px; border-radius: 50%; background: ${i}"></span>
          <span style="position: absolute; left: 172px; bottom: 34px; width: 10px; height: 10px; border-radius: 50%; background: ${a}"></span>
          <span style="position: absolute; left: 186px; bottom: 12px; width: 11px; height: 11px; background: ${r}; transform: rotate(45deg)"></span>
          <span style="position: absolute; left: 246px; top: 30px; width: 9px; height: 9px; border-radius: 50%; background: ${n}; box-shadow: 0 0 0 2px ${t}"></span>
        </span>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 296px; margin: 0; text-align: center">
        Squiggle, zigzag, terrazzo, stripes, confetti. Pastels and primaries chosen to fight, and nobody drawn.
      </p>
    </div>
  `}export{c as mount};