var e=`#ff4fa3`,t=`#12b5b0`,n=[`repeating-radial-gradient(circle at 0 0, rgb(40 36 30 / 0.2) 0 0.6px, transparent 0.6px 2.6px)`,`repeating-radial-gradient(circle at 1.4px 2.2px, rgb(40 36 30 / 0.13) 0 0.5px, transparent 0.5px 3.3px)`].join(`, `);function r(e,t,n){return`<span${n?` data-part="${n}"`:``} aria-hidden="true" style="position: absolute; ${e}; width: 13px; height: 13px;
    background-image: linear-gradient(${t}, ${t}), linear-gradient(${t}, ${t});
    background-size: 13px 1px, 1px 13px; background-position: center, center; background-repeat: no-repeat"></span>`}function i(i){i.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="card" data-subject
           style="position: relative; width: 268px; height: 218px; overflow: hidden; isolation: isolate;
                  background: #f4f0e6; color: #2b2926">

        <span data-part="ink-teal" aria-hidden="true"
              style="position: absolute; left: 20px; top: 24px; width: 96px; height: 96px; border-radius: 50%;
                     background: ${t}; mix-blend-mode: multiply"></span>

        <span data-part="ink-pink" aria-hidden="true"
              style="position: absolute; left: 66px; top: 46px; width: 92px; height: 92px; background: ${e};
                     mix-blend-mode: multiply"></span>

        <span data-part="bars" aria-hidden="true"
              style="position: absolute; right: 18px; top: 26px; width: 74px; height: 92px; mix-blend-mode: multiply;
                     background-image: repeating-linear-gradient(180deg, ${t} 0 9px, transparent 9px 18px)"></span>

        <span data-part="bars-offset" aria-hidden="true"
              style="position: absolute; right: 15px; top: 30px; width: 74px; height: 92px; mix-blend-mode: multiply;
                     background-image: repeating-linear-gradient(180deg, ${e} 0 9px, transparent 9px 18px)"></span>

        <div data-part="headline"
             style="position: absolute; left: 18px; bottom: 44px; font-size: 38px; font-weight: 800;
                    letter-spacing: -0.03em; line-height: 1; mix-blend-mode: multiply">
          <span data-part="headline-teal" style="position: absolute; left: -5px; top: -4px; color: ${t}">TWO DRUMS</span>
          <span data-part="headline-pink" style="position: relative; color: ${e}">TWO DRUMS</span>
        </div>

        <p data-part="strap" style="position: absolute; left: 19px; right: 19px; bottom: 16px; margin: 0;
                  font-size: 11px; letter-spacing: 0.04em; line-height: 1.4">
          PRINT CLUB · AUTUMN SESSIONS · STUDIO FOUR
        </p>

        ${r(`left: 6px; top: 6px`,t,`regmark`)}
        ${r(`right: 6px; bottom: 6px`,t)}
        ${r(`left: 8px; top: 8px`,e)}
        ${r(`right: 4px; bottom: 8px`,e)}

        <span data-part="grain" aria-hidden="true"
              style="position: absolute; inset: 0; pointer-events: none; mix-blend-mode: multiply; opacity: 0.55;
                     background-image: ${n}; background-size: 3.1px 2.7px, 4.3px 3.7px"></span>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 300px; margin: 0; text-align: center">
        Two flat inks, a pass each, and the slip between them left in.
      </p>
    </div>
  `}export{i as mount};