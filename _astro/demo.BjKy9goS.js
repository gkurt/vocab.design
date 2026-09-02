var e=`linear-gradient(155deg, #e3c684 0%, #b08a45 34%, #8a6a2e 62%, #6a5023 100%)`,t=`#2c2114`;function n(n){let r=[`left: 8px; top: 8px`,`right: 8px; top: 8px`,`left: 8px; bottom: 8px`,`right: 8px; bottom: 8px`,`left: 50%; top: 8px; margin-left: -4.5px`,`left: 50%; bottom: 8px; margin-left: -4.5px`,`left: 8px; top: 50%; margin-top: -4.5px`,`right: 8px; top: 50%; margin-top: -4.5px`].map(e=>`<span aria-hidden="true" style="position: absolute; ${e}; width: 9px; height: 9px; border-radius: 50%;
            background: radial-gradient(circle at 34% 32%, #f2dea8, #7a5c26 72%); box-shadow: 0 1px 1px rgb(0 0 0 / 0.5)"></span>`).join(``),i=(e,t,n)=>`
    <span aria-hidden="true" style="position: absolute; left: ${e}px; top: 56px; width: 16px; height: 92px; border-radius: 9px;
          background: #241a0f; box-shadow: inset 0 2px 4px rgb(0 0 0 / 0.7), 0 1px 0 rgb(240 220 160 / 0.35)"></span>
    <span aria-hidden="true" style="position: absolute; left: ${e+3}px; top: ${n}px; width: 10px; height: 44px;
          border-radius: 5px; background-image: linear-gradient(90deg, #f2dea8, #b08a45 52%, #6a5023);
          transform: rotate(${t}deg); transform-origin: 50% 100%">
      <span style="position: absolute; left: -5px; top: -11px; width: 20px; height: 20px; border-radius: 50%;
            background: radial-gradient(circle at 34% 30%, #f2dea8, #8a6a2e 62%, #5d461e); box-shadow: 0 2px 3px rgb(0 0 0 / 0.55)"></span>
    </span>`,a=t=>`<span style="position: absolute; left: 50%; top: 50%; width: 46px; height: 5px; margin: -2.5px 0 0 -23px;
            background-image: ${e}; transform: rotate(${t}deg)"></span>`;n.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="panel" data-subject class="sp-texture"
           style="position: relative; width: 258px; height: 244px; --sp-texture-base: #8a6c35; --sp-texture-angle: 90deg;
                  border: 3px solid #5d461e; border-radius: 6px; font-family: 'Baskerville', 'Times New Roman', Georgia, serif; overflow: hidden;
                  box-shadow: inset 0 0 26px rgb(44 33 20 / 0.65)">

        ${r}

        <span data-part="plate"
              style="position: absolute; top: 13px; left: 50%; translate: -50% 0; padding: 3px 14px; background: #efe4c8;
                     border: 1px solid #5d461e; border-radius: 2px; color: ${t}; font-size: 11px; font-weight: 700;
                     letter-spacing: 0.2em; text-indent: 0.2em; white-space: nowrap">AETHER No. 4</span>

        <span data-part="gauge" aria-hidden="true"
              style="position: absolute; left: 20px; top: 50px; width: 104px; height: 104px; padding: 7px; border-radius: 50%;
                     background-image: ${e}; box-shadow: 0 3px 6px rgb(0 0 0 / 0.5), inset 0 1px 0 rgb(255 245 210 / 0.5)">
          <span style="position: relative; display: block; width: 100%; height: 100%; border-radius: 50%;
                       background: radial-gradient(circle at 38% 32%, #f8f1da, #d9cba6); border: 1px solid #6a5023;
                       box-shadow: inset 0 3px 7px rgb(44 33 20 / 0.45)">
            <span style="position: absolute; inset: 4px; border-radius: 50%;
                         background-image: repeating-conic-gradient(from 212deg, ${t} 0 1.2deg, transparent 1.2deg 17deg)"></span>
            <span style="position: absolute; inset: 13px; border-radius: 50%;
                         background: radial-gradient(circle at 38% 32%, #f8f1da, #ddcfab)"></span>
            <span style="position: absolute; left: 50%; top: 62%; translate: -50% 0; font-size: 8px; letter-spacing: 0.2em;
                         color: ${t}">PSI</span>
            <span data-part="needle"
                  style="position: absolute; left: 50%; top: 50%; width: 3px; height: 33px; background: #8f2318;
                         border-radius: 2px 2px 0 0; transform-origin: 50% 100%; translate: -50% -100%; rotate: 46deg"></span>
            <span style="position: absolute; left: 50%; top: 50%; width: 12px; height: 12px; translate: -50% -50%;
                         border-radius: 50%; background-image: ${e}; box-shadow: 0 1px 2px rgb(0 0 0 / 0.5)"></span>
          </span>
        </span>

        <div data-part="levers" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none">
          ${i(132,-13,62)}
          ${i(158,14,100)}
        </div>

        <span data-part="wheel" aria-hidden="true"
              style="position: absolute; right: 18px; top: 62px; width: 62px; height: 62px; border-radius: 50%;
                     border: 6px solid transparent; background-image: ${e}; background-clip: border-box;
                     box-shadow: inset 0 0 0 6px #6a5023, 0 2px 5px rgb(0 0 0 / 0.5)">
          ${a(0)}${a(60)}${a(120)}
          <span style="position: absolute; left: 50%; top: 50%; width: 16px; height: 16px; translate: -50% -50%;
                       border-radius: 50%; background-image: ${e}; box-shadow: 0 1px 2px rgb(0 0 0 / 0.5)"></span>
        </span>

        <span data-part="foot"
              style="position: absolute; left: 20px; bottom: 20px; padding: 2px 9px; background: rgb(239 228 200 / 0.9);
                     border: 1px solid #5d461e; color: ${t}; font-size: 9px; letter-spacing: 0.18em;
                     text-indent: 0.18em">BOILER ROOM</span>

        <span data-part="valve" aria-hidden="true"
              style="position: absolute; right: 24px; bottom: 20px; display: flex; gap: 7px">
          <span style="width: 11px; height: 11px; border-radius: 50%; background: #6f9b6a; box-shadow: 0 0 5px rgb(111 155 106 / 0.8), inset 0 1px 2px rgb(0 0 0 / 0.4)"></span>
          <span style="width: 11px; height: 11px; border-radius: 50%; background: #8f2318; box-shadow: inset 0 1px 2px rgb(0 0 0 / 0.5)"></span>
          <span style="width: 11px; height: 11px; border-radius: 50%; background: #4a3a1c; box-shadow: inset 0 1px 2px rgb(0 0 0 / 0.5)"></span>
        </span>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 258px; margin: 0; text-align: center">
        Riveted brass, a painted gauge, levers in their tracks, engraved cream.
      </p>
    </div>
  `}export{n as mount};