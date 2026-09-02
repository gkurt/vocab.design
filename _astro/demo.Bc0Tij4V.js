var e=`'Times New Roman', Georgia, serif`,t=`'Courier New', ui-monospace, monospace`;function n(n){let r=t=>`<span style="color: #6fd0ff; text-decoration: underline; font-family: ${e}; font-size: 11.5px">${t}</span>`;n.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="page" data-subject
           style="position: relative; width: 258px; height: 244px; padding: 12px 10px; text-align: center; overflow: hidden;
                  background-color: #3b0a6b; background-image: radial-gradient(circle at 12px 10px, #ffd94a 0 1.6px, transparent 2px), radial-gradient(circle at 34px 28px, #ffffff 0 1.2px, transparent 1.6px), radial-gradient(circle at 24px 44px, #6ff2ff 0 1.4px, transparent 1.8px); background-size: 52px 56px;
                  border: 2px solid #ffd94a">

        <div data-part="heading"
             style="font-family: 'Comic Sans MS', 'Chalkboard SE', 'Segoe Print', var(--sp-font); font-size: 21px; line-height: 1.15; background-image: linear-gradient(90deg, #ff3b3b, #ff9d1f 22%, #ffe14d 42%, #4dff7a 62%, #4dd2ff 80%, #d86bff);
                    -webkit-background-clip: text; background-clip: text; color: transparent;
                    filter: drop-shadow(1px 1px 0 rgb(0 0 0 / 0.55))">
          Ora's Cat Page
        </div>

        <div data-part="rule" aria-hidden="true"
             style="height: 4px; margin: 8px 6px; border-top: 2px solid #7a6bb0; border-bottom: 2px solid #ffffff"></div>

        <p data-part="blurb" style="margin: 0 4px; font-family: ${e}; font-size: 11.5px; line-height: 1.4; color: #ffe9a8">
          Hi and welcome to my page!! It is about my cats and also
          <span style="font-family: ${t}; font-size: 10.5px">HTML</span> which I am learning.
        </p>

        <div data-part="links" style="margin-top: 9px">
          ${r(`Sign my guestbook`)} <span style="color: #ffffff">|</span> ${r(`E-mail me`)}
          <span style="color: #ffffff">|</span> ${r(`My links`)}
        </div>

        <div data-part="counter"
             style="margin-top: 10px; font-family: ${t}; font-size: 10px; color: #ffffff">
          You are visitor number 000137
        </div>

        <div data-part="midi" style="margin-top: 6px; font-family: ${t}; font-size: 9.5px; color: #b7a9e8">
          &#9834; now playing: theme.mid
        </div>

        <div data-part="badge"
             style="display: inline-block; margin-top: 12px; padding: 2px 7px; background: #c9c9c2; border: 1px solid #6b6b64;
                    color: #14161a; font-family: var(--sp-font); font-size: 8.5px; font-weight: 600">
          Best viewed in Netscape 3.0
        </div>

        <div data-part="sparkles" aria-hidden="true" style="display: flex; justify-content: center; gap: 7px; margin-top: 14px">
          ${[`#ffd94a`,`#6ff2ff`,`#ff8ad8`,`#ffffff`,`#ff8ad8`,`#6ff2ff`,`#ffd94a`].map(e=>`<span style="width: 7px; height: 7px; background: ${e}; transform: rotate(45deg)"></span>`).join(``)}
        </div>

        <span data-part="sign"
              style="position: absolute; left: 6px; bottom: 8px; width: 66px; padding: 3px 0; background: #ffd400;
                     border: 2px solid #14161a; color: #14161a; font-family: var(--sp-font); font-size: 6.5px; font-weight: 700;
                     letter-spacing: 0.06em; line-height: 1.3; transform: rotate(-5deg)">
          UNDER<br>CONSTRUCTION
        </span>

        <span data-part="starburst" aria-hidden="true"
              style="position: absolute; top: 6px; right: 4px; display: flex; align-items: center; justify-content: center;
                     width: 62px; height: 62px; background: #ff2d2d; color: #ffffff; font-family: var(--sp-font);
                     font-size: 9px; font-weight: 700; padding-top: 8px; transform: rotate(-14deg);
                     clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)">
          NEW!
        </span>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 258px; margin: 0; text-align: center">
        Centred, tiled, three type families, a counter, and a midi.
      </p>
    </div>
  `}export{n as mount};