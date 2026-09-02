var e=`#c9a24b`,t=`linear-gradient(180deg, #f5e3ab 4%, #c9a24b 46%, #8a6a24 96%)`,n=`repeating-conic-gradient(from 270deg at 50% 100%, ${e} 0deg 2.4deg, transparent 2.4deg 11deg)`;function r(r){r.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="poster" data-subject
           style="position: relative; display: flex; flex-direction: column; align-items: center; width: 226px; height: 224px; padding: 14px 16px 12px; background: radial-gradient(120% 90% at 50% 8%, #14413a 0%, #0c2b26 62%); color: ${e}; border: 2px solid ${e}; font-family: 'Futura', 'Century Gothic', 'Avenir Next', var(--sp-font); overflow: hidden">

        <span data-part="frame" aria-hidden="true"
              style="position: absolute; inset: 6px; border: 1px solid rgb(201 162 75 / 0.55); clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)"></span>

        <span data-part="fan" aria-hidden="true"
              style="position: relative; width: 124px; height: 54px; border-radius: 124px 124px 0 0; background-image: ${n}"></span>
        <span data-part="sun" aria-hidden="true"
              style="position: relative; width: 40px; height: 20px; margin-top: -20px; border-radius: 40px 40px 0 0; background-image: ${t}"></span>

        <span data-part="rule" aria-hidden="true" style="position: relative; display: flex; align-items: center; gap: 6px; width: 146px; margin-top: 12px">
          <span style="flex: 1 1 0; height: 1px; background: ${e}"></span>
          <span style="width: 7px; height: 7px; background-image: ${t}; transform: rotate(45deg)"></span>
          <span style="flex: 1 1 0; height: 1px; background: ${e}"></span>
        </span>

        <div data-part="title" style="position: relative; margin-top: 10px; font-size: 25px; font-weight: 700; letter-spacing: 0.26em; line-height: 1; text-indent: 0.26em; background-image: ${t}; -webkit-background-clip: text; background-clip: text; color: transparent">
          SAVOY
        </div>
        <div data-part="subtitle" style="position: relative; margin-top: 6px; font-size: 9px; letter-spacing: 0.3em; text-indent: 0.3em; color: rgb(233 213 165 / 0.9)">
          SUPPER CLUB
        </div>

        <span data-part="steps" aria-hidden="true"
              style="position: relative; display: flex; flex-direction: column; align-items: center; gap: 4px; margin-top: auto">${[116,82,48].map(e=>`<span style="width: ${e}px; height: 4px; background-image: ${t}"></span>`).join(``)}</span>
        <div data-part="foot" style="position: relative; margin-top: 8px; font-size: 8px; letter-spacing: 0.32em; text-indent: 0.32em; color: rgb(201 162 75 / 0.8)">
          EST. MCMXXVII
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 226px; margin: 0; text-align: center">
        One vertical axis, everything mirrored across it. Fan above, ziggurat below.
      </p>
    </div>
  `}export{r as mount};