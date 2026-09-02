var e=`'Arial Black', 'Helvetica Neue', 'Impact', var(--sp-font)`,t=[[22,18,2],[58,34,1],[96,14,1],[148,26,2],[196,12,1],[232,30,2],[40,52,1],[214,54,1]];function n(n){let r=[56,66,76,84,92].map((e,t)=>`<span style="position: absolute; left: -2px; right: -2px; top: ${e}px; height: ${3+t}px; background: rgb(28 6 52 / 0.9)"></span>`).join(``);n.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="poster" data-subject
           style="position: relative; width: 268px; height: 228px; overflow: hidden; border-radius: 4px; background-image: linear-gradient(180deg, #08021c 0%, #2b0a55 42%, #6b1470 62%, #b62a7c 74%); box-shadow: 0 10px 24px rgb(10 2 30 / 0.5)">

        <span data-part="stars" aria-hidden="true" style="position: absolute; inset: 0">${t.map(([e,t,n])=>`<span style="position: absolute; left: ${e}px; top: ${t}px; width: ${n}px; height: ${n}px; border-radius: 50%; background: rgb(255 255 255 / 0.9)"></span>`).join(``)}</span>

        <span data-part="sun" aria-hidden="true"
              style="position: absolute; left: 50%; top: 34px; width: 118px; height: 118px; margin-left: -59px; border-radius: 50%; background-image: linear-gradient(180deg, #fff4a8 4%, #ffb04d 42%, #ff3d84 96%); overflow: hidden">${r}</span>

        <span data-part="mountains" aria-hidden="true"
              style="position: absolute; left: 0; right: 0; bottom: 92px; height: 46px; background: #24063f; clip-path: polygon(0 100%, 0 62%, 16% 22%, 30% 58%, 44% 30%, 58% 66%, 74% 18%, 88% 54%, 100% 34%, 100% 100%)"></span>

        <span aria-hidden="true"
              style="position: absolute; left: 0; right: 0; bottom: 90px; height: 2px; background: rgb(255 214 255 / 0.9); box-shadow: 0 0 12px rgb(255 120 220 / 0.85)"></span>

        <span data-part="grid" aria-hidden="true"
              style="position: absolute; left: -70%; right: -70%; bottom: -14px; height: 118px; background-image: repeating-linear-gradient(90deg, rgb(120 240 255 / 0.85) 0 1px, transparent 1px 26px), repeating-linear-gradient(0deg, rgb(255 92 196 / 0.8) 0 1px, transparent 1px 18px); transform: perspective(120px) rotateX(68deg); transform-origin: bottom center"></span>

        <div data-part="title"
             style="position: absolute; left: 0; right: 0; top: 96px; text-align: center; font-family: ${e}; font-style: italic; font-size: 33px; font-weight: 900; letter-spacing: 0.06em; line-height: 1; text-transform: uppercase; background-image: linear-gradient(180deg, #ffffff 4%, #d7f4ff 34%, #8ad4ff 48%, #ff62c4 62%, #7b2bd1 96%); -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-stroke: 0.8px rgb(12 4 34 / 0.9)">
          Night Drive
        </div>

        <div data-part="strip"
             style="position: absolute; left: 0; right: 0; top: 136px; text-align: center; font-family: ${e}; font-size: 9px; letter-spacing: 0.42em; text-indent: 0.42em; color: #9ff3ff; text-shadow: 0 0 10px rgb(80 230 255 / 0.9)">
          OUTRUN 1984
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 268px; margin: 0; text-align: center">
        Slatted sun, one vanishing point, chrome capitals, meant sincerely.
      </p>
    </div>
  `}export{n as mount};