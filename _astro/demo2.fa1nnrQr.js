var e=`#24363d`,t=`#2c7f8c`,n=`#e2643c`,r=`#e0a52c`;function i(e,t,n){return`
    <span aria-hidden="true" style="position: absolute; left: ${e}px; top: ${t}px; width: ${n}px; height: ${n}px">
      <span style="position: absolute; left: 50%; top: 0; width: 2px; height: 100%; margin-left: -1px; background: ${r}"></span>
      <span style="position: absolute; top: 50%; left: 0; height: 2px; width: 100%; margin-top: -1px; background: ${r}"></span>
    </span>`}function a(a){a.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="poster" data-subject
           style="position: relative; width: 250px; height: 246px; overflow: hidden; background: radial-gradient(120% 90% at 50% 18%, #f8f0dd 0%, #f2e6cb 70%); border: 2px solid ${e}; color: ${e}; font-family: 'Trade Gothic', 'Oswald', 'Arial Narrow', var(--sp-font)">

        <span data-part="planet" aria-hidden="true"
              style="position: absolute; right: 26px; top: 18px; width: 92px; height: 92px; border-radius: 50%; background: radial-gradient(circle at 34% 30%, #63c0c8 0%, ${t} 58%, #17596a 100%)">
          <span data-part="ring" style="position: absolute; left: -24px; top: 28px; width: 140px; height: 40px; border: 3px solid ${n}; border-radius: 50%; transform: rotate(-19deg)"></span>
        </span>

        <span data-part="rocket" aria-hidden="true" style="position: absolute; left: 28px; top: 22px; width: 40px; height: 112px; transform: rotate(-15deg)">
          <span style="position: absolute; left: 6px; top: 0; width: 28px; height: 96px; border-radius: 50% 50% 26% 26% / 38% 38% 10% 10%; background: linear-gradient(90deg, #fbf5e8 18%, #d9cdb4 68%, #b3a78e)"></span>
          <span style="position: absolute; left: 6px; top: 0; width: 28px; height: 24px; border-radius: 50% 50% 0 0 / 90% 90% 0 0; background: ${n}"></span>
          <span style="position: absolute; left: 14px; top: 34px; width: 12px; height: 12px; border-radius: 50%; border: 2px solid ${e}; background: ${t}"></span>
          <span style="position: absolute; left: -4px; bottom: 8px; width: 18px; height: 30px; background: ${n}; clip-path: polygon(100% 0, 100% 100%, 0 100%)"></span>
          <span style="position: absolute; right: -4px; bottom: 8px; width: 18px; height: 30px; background: ${n}; clip-path: polygon(0 0, 100% 100%, 0 100%)"></span>
          <span style="position: absolute; left: 13px; bottom: -14px; width: 14px; height: 18px; border-radius: 0 0 50% 50%; background: ${r}"></span>
        </span>

        <span data-part="atom" aria-hidden="true" style="position: absolute; left: 88px; top: 92px; width: 48px; height: 48px">
          ${[0,60,120].map(t=>`<span style="position: absolute; left: 0; top: 16px; width: 48px; height: 18px; border: 2px solid ${e}; border-radius: 50%; transform: rotate(${t}deg)"></span>`).join(``)}
          <span style="position: absolute; left: 20px; top: 21px; width: 8px; height: 8px; border-radius: 50%; background: ${n}"></span>
        </span>

        ${i(112,20,16)}
        ${i(206,126,11)}

        <span data-part="rule" aria-hidden="true" style="position: absolute; left: 16px; right: 16px; top: 150px; height: 3px; background: ${e}"></span>

        <div data-part="title"
             style="position: absolute; left: 16px; right: 16px; top: 158px; font-size: 20px; font-weight: 700; line-height: 1.08; letter-spacing: 0.05em; text-transform: uppercase">
          The world of tomorrow
        </div>

        <div data-part="foot"
             style="position: absolute; left: 16px; right: 16px; bottom: 12px; font-size: 8px; line-height: 1.5; letter-spacing: 0.26em; text-transform: uppercase; color: ${n}">
          Atomic express . daily departures
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 250px; margin: 0; text-align: center">
        Atomic motifs, a finned rocket, a fair poster's palette: tomorrow, drawn in 1957.
      </p>
    </div>
  `}export{a as mount};