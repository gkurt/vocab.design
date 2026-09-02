var e=`#17181b`,t=`#6f6d67`;function n(n){n.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div data-part="opener" data-subject
           style="width: 452px; padding: 12px 14px; background: #faf8f4; color: ${e}; font-family: Georgia, 'Iowan Old Style', 'Times New Roman', serif; overflow: hidden">

        <span aria-hidden="true" style="display: block; height: 2px; background: ${e}"></span>

        <div data-part="eyebrow" class="sp-row sp-row--between"
             style="margin-top: 6px; font-family: var(--sp-font); font-size: 8.5px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase">
          <span>Sea and land</span>
          <span style="color: ${t}">No. 12</span>
        </div>

        <h2 data-part="headline"
            style="margin: 8px 0 0; font-size: 23px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.06">
          Twelve miles of weather
        </h2>

        <p data-part="deck"
           style="margin: 6px 0 0; font-size: 10.5px; font-style: italic; line-height: 1.35; color: ${t}">
          The last keeper on a coast that stopped needing keepers, and the tide table he still keeps by hand.
        </p>

        <span aria-hidden="true" style="display: block; height: 1px; margin-top: 10px; background: rgb(23 24 27 / 0.35)"></span>
        <div data-part="byline" class="sp-row sp-row--between"
             style="padding: 4px 0; font-family: var(--sp-font); font-size: 8.5px; letter-spacing: 0.1em; text-transform: uppercase; color: ${t}">
          <span>By Ora Vance</span>
          <span>9 min read</span>
        </div>
        <span aria-hidden="true" style="display: block; height: 1px; background: rgb(23 24 27 / 0.35)"></span>

        <div style="display: grid; grid-template-columns: 1.45fr 1fr; gap: 12px; margin-top: 10px">
          <p data-part="body" style="margin: 0; font-size: 8.5px; line-height: 1.52; text-align: justify; hyphens: auto">
            <span data-part="dropcap" aria-hidden="true"
                  style="float: left; margin: 2px 3px 0 0; font-size: 25px; font-weight: 700; line-height: 0.76">T</span>he
            lamp room smells of paraffin and salt, and the logbook on the sill goes back four
            keepers. Nobody here reads the forecast. They read the water, the birds, and the
            colour of the light behind the point.
          </p>

          <div class="sp-stack" style="gap: 8px">
            <div data-part="quote" aria-hidden="true">
              <span style="display: block; height: 2px; margin-bottom: 5px; background: #9b2c1f"></span>
              <span style="font-size: 11px; font-style: italic; line-height: 1.22">Nobody here reads the forecast. They read the water.</span>
            </div>
            <figure data-part="figure" style="margin: 0">
              <div aria-hidden="true"
                   style="height: 30px; background-image: linear-gradient(160deg, #8fa9b8, #43606f 62%, #2b3d47)"></div>
              <figcaption style="margin-top: 3px; font-family: var(--sp-font); font-size: 7.5px; letter-spacing: 0.06em; color: ${t}">
                Fig. 2 Low water, March
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption"
         style="max-width: 452px; margin: 0; text-align: center; font-size: 11px">
        Display type, deck, byline rules, columns, a pull quote.
      </p>
    </div>
  `}export{n as mount};