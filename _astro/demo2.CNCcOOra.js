var e=`#d8392b`,t=`#191919`;function n(n){n.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="poster" data-subject
           style="position: relative; width: 232px; height: 246px; padding: 16px; overflow: hidden; background: #f2ece0; font-family: 'Futura', 'Century Gothic', 'Avenir Next', var(--sp-font); color: ${t}">

        <span data-part="composition" aria-hidden="true"
              style="position: absolute; left: 16px; top: 16px; width: 200px; height: 128px; isolation: isolate">
          <span data-part="square" style="position: absolute; left: 0; top: 22px; width: 96px; height: 96px; background: #1b4fa8"></span>
          <span data-part="circle" style="position: absolute; left: 60px; top: 0; width: 104px; height: 104px; border-radius: 50%; background: ${e}; mix-blend-mode: multiply"></span>
          <span data-part="triangle" style="position: absolute; left: 108px; top: 34px; width: 92px; height: 92px; background: #f2b90c; clip-path: polygon(50% 0, 100% 100%, 0 100%); mix-blend-mode: multiply"></span>
          <span data-part="diagonal" style="position: absolute; left: -14px; top: 96px; width: 232px; height: 7px; background: ${t}; transform: rotate(-27deg); transform-origin: left center"></span>
        </span>

        <span data-part="rule" aria-hidden="true" style="position: absolute; left: 16px; right: 16px; top: 152px; height: 3px; background: ${t}"></span>

        <div data-part="title"
             style="position: absolute; left: 16px; right: 40px; top: 162px; font-size: 22px; font-weight: 700; line-height: 1.04; letter-spacing: -0.01em; text-transform: lowercase">
          form<br>follows<br>function
        </div>

        <div data-part="foot"
             style="position: absolute; right: 16px; bottom: 16px; font-size: 8px; letter-spacing: 0.3em; text-indent: 0.3em; writing-mode: vertical-rl; color: ${e}">
          weimar 1923
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 232px; margin: 0; text-align: center">
        Three primaries, three elementary shapes, one diagonal, lowercase sans.
      </p>
    </div>
  `}export{n as mount};