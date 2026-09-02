var e=`#e2231a`;function t(t){t.innerHTML=`
    <div class="sp-app">
      <div data-part="poster" data-subject
           style="position: relative; width: 252px; height: 250px; padding: 16px; background: #f4f4f1; color: #16181c; font-family: 'Helvetica Neue', Helvetica, Arial, 'Inter', var(--sp-font); overflow: hidden">
        <span data-part="guides" aria-hidden="true"
              style="position: absolute; inset: 16px; display: grid; grid-template-columns: repeat(4, 1fr); column-gap: 8px">${`<span style="border-left: 1px solid rgb(22 24 28 / 0.13); border-right: 1px solid rgb(22 24 28 / 0.06)"></span>`.repeat(4)}</span>

        <div style="position: relative; display: grid; grid-template-columns: repeat(4, 1fr); column-gap: 8px; height: 100%; align-content: start">
          <span data-part="eyebrow"
                style="grid-column: 1 / span 2; font-size: 9px; font-weight: 700; letter-spacing: 0.08em; line-height: 1">NEUE GRAFIK</span>
          <span style="grid-column: 4; font-size: 9px; font-weight: 400; letter-spacing: 0.08em; line-height: 1; text-align: left">Nr. 12</span>

          <span data-part="headline"
                style="grid-column: 1 / span 3; margin-top: 14px; font-size: 23px; font-weight: 700; letter-spacing: -0.025em; line-height: 1.04">
            Der Film<br>und die Form
          </span>

          <span data-part="numeral" aria-hidden="true"
                style="grid-column: 1 / span 2; margin-top: 6px; font-size: 88px; font-weight: 700; letter-spacing: -0.06em; line-height: 0.82">12</span>
          <p data-part="copy"
             style="grid-column: 3 / span 2; margin: 12px 0 0; font-size: 9.5px; font-weight: 400; line-height: 1.55; text-align: left">
            Sechs Abende, sechs Filme. Beginn zwanzig Uhr, Eintritt frei.
          </p>

          <span data-part="rule" style="grid-column: 1 / span 3; height: 7px; margin-top: 14px; background: ${e}"></span>

          <span data-part="meta" style="grid-column: 1 / span 2; margin-top: 8px; font-size: 9px; font-weight: 400; line-height: 1.5">
            Kunstgewerbemuseum<br>Zürich
          </span>
          <span style="grid-column: 4; margin-top: 8px; font-size: 9px; font-weight: 700; color: ${e}; line-height: 1.5">frei</span>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 252px; margin: 0; text-align: center">
        Four columns, flush left, one red.
      </p>
    </div>
  `}export{t as mount};