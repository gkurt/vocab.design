var e=`#f4efe2`,t=`#191714`;function n(e,n=t){let r=`${n} ${e}px, transparent ${e+.6}px`,i=9/2;return[`background-image: radial-gradient(circle at 50% 50%, ${r}), radial-gradient(circle at 50% 50%, ${r})`,`background-size: 9px 9px`,`background-position: 0 0, ${i}px ${i}px`].join(`; `)}var r=[.8,1.5,2.2,2.9,3.5];function i(i){let a=[1.1,2.1,3.2].map(e=>`<span style="flex: 1 1 0; ${n(e)}"></span>`).join(``),o=r.map(t=>`<span style="flex: 1 1 0; height: 34px; background-color: ${e}; ${n(t)}"></span>`).join(``),s=[`10%`,`30%`,`50%`,`70%`,`90%`].map(e=>`<span style="flex: 1 1 0; text-align: center; font-size: 9px; letter-spacing: 0.06em; color: #6d675c">${e}</span>`).join(``);i.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="panel" data-subject
           style="width: 292px; padding: 16px; background: ${e}; color: ${t}; border: 1px solid #d8d1bf; overflow: hidden">
        <div style="display: flex; gap: 14px; align-items: flex-start">
          <span data-part="picture" aria-hidden="true"
                style="display: flex; flex-direction: column; flex: 0 0 auto; width: 96px; height: 96px; border: 1px solid #cfc7b3">${a}</span>

          <div style="flex: 1 1 auto; min-width: 0">
            <div data-part="headline" style="position: relative; height: 44px; font-size: 33px; font-weight: 800; letter-spacing: -0.02em; line-height: 1">
              <span aria-hidden="true"
                    style="position: absolute; left: 4px; top: 4px; ${n(2.6,`#d1382f`)}; -webkit-background-clip: text; background-clip: text; color: transparent">PRINT</span>
              <span style="position: relative">PRINT</span>
            </div>
            <p style="margin: 6px 0 0; font-size: 11px; line-height: 1.45; color: #4a453d">
              The morning edition ran to twelve pages. Circulation held steady through the winter.
            </p>
          </div>
        </div>

        <div data-part="ramp" style="display: flex; gap: 0; margin-top: 14px; border: 1px solid #cfc7b3">${o}</div>
        <div data-part="ticks" aria-hidden="true" style="display: flex; margin-top: 4px">${s}</div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 292px; margin: 0; text-align: center">
        Tone is dot size, not ink colour: at reading distance the eye averages the lattice back into grey.
      </p>
    </div>
  `}export{i as mount};