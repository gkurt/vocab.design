var e=`'Courier New', ui-monospace, monospace`,t=`#08090a`,n=`#c8ff00`,r=`#ff2bd6`,i=`#31e8ff`,a=`repeating-conic-gradient(${n} 0% 25%, ${t} 0% 50%)`;function o(o){o.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="poster" data-subject
           style="position: relative; width: 256px; height: 244px; background: ${t}; font-family: 'Arial Black', 'Helvetica Neue', Impact, var(--sp-font); overflow: hidden">

        <span aria-hidden="true"
              style="position: absolute; top: -40px; right: -30px; width: 180px; height: 150px;
                     background: radial-gradient(circle at 60% 40%, rgb(255 43 214 / 0.55), transparent 68%)"></span>

        <span data-part="checker" aria-hidden="true"
              style="position: absolute; left: -70px; right: -70px; bottom: 0; height: 250px;
                     background-image: ${a}; background-size: 34px 34px; opacity: 0.5;
                     transform: perspective(420px) rotateX(60deg); transform-origin: 50% 100%"></span>

        <span aria-hidden="true"
              style="position: absolute; left: 0; right: 0; bottom: 0; height: 42px;
                     background-image: linear-gradient(to top, ${t} 12%, transparent)"></span>

        <span data-part="eyebrow"
              style="position: absolute; top: 13px; left: 15px; font-family: ${e}; font-size: 10px; font-weight: 700;
                     letter-spacing: 0.22em; color: ${n}">RAVE//04</span>

        <span data-part="smiley" aria-hidden="true"
              style="position: absolute; top: 12px; right: 14px; line-height: 0; transform: rotate(-12deg)">${`
    <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      <circle cx="24" cy="24" r="23" fill="${n}"/>
      <ellipse cx="16" cy="19" rx="2.6" ry="4.4" fill="${t}"/>
      <ellipse cx="32" cy="19" rx="2.6" ry="4.4" fill="${t}"/>
      <path d="M12 28c3.6 7.4 20.4 7.4 24 0" fill="none" stroke="${t}" stroke-width="3.4" stroke-linecap="round"/>
    </svg>`}</span>

        <span data-part="title"
              style="position: absolute; top: 52px; left: 13px; font-size: 54px; line-height: 0.9; letter-spacing: -0.03em;
                     background-image: linear-gradient(178deg, #ffffff 2%, #b9c6d8 20%, #66768f 38%, #ffffff 52%, #8b9ab2 68%, #dbe6f5 84%, #5d6b82 100%); -webkit-background-clip: text; background-clip: text; color: transparent;
                     -webkit-text-stroke: 1.4px ${n}; transform: skewX(-7deg) scaleY(1.16); transform-origin: 0 50%">ACID</span>

        <span data-part="globe" aria-hidden="true"
              style="position: absolute; top: 64px; right: 18px; line-height: 0">${`
    <svg viewBox="0 0 44 44" width="44" height="44" aria-hidden="true" style="stroke: ${i}; fill: none; stroke-width: 1.1">
      <circle cx="22" cy="22" r="20"/>
      <ellipse cx="22" cy="22" rx="8" ry="20"/>
      <ellipse cx="22" cy="22" rx="15" ry="20"/>
      <path d="M2.6 15h38.8M2.6 29h38.8M2 22h40"/>
    </svg>`}</span>

        <span data-part="subtitle"
              style="position: absolute; top: 122px; left: 15px; font-family: ${e}; font-size: 10px; font-weight: 700;
                     letter-spacing: 0.34em; color: ${i}">LIQUID METAL</span>

        <span data-part="sticker"
              style="position: absolute; top: 150px; left: 16px; padding: 4px 11px; background: ${r}; color: ${t};
                     font-size: 12px; letter-spacing: 0.05em; border-radius: 999px; transform: rotate(-7deg)">24 HRS</span>

        <span data-part="rings" aria-hidden="true"
              style="position: absolute; bottom: 46px; right: 20px; width: 58px; height: 58px; border-radius: 50%;
                     background-image: repeating-radial-gradient(circle, ${r} 0 2px, transparent 2px 7px)"></span>

        <span data-part="foot"
              style="position: absolute; bottom: 12px; left: 15px; font-family: ${e}; font-size: 9px; font-weight: 700;
                     letter-spacing: 0.16em; color: ${n}">SAT 04 // WAREHOUSE 12</span>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 256px; margin: 0; text-align: center">
        Chrome type, clashing hues on black, a smiley and a wireframe globe.
      </p>
    </div>
  `}export{o as mount};