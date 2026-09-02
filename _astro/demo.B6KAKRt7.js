var e=`Georgia, 'Liberation Serif', 'Nimbus Roman', serif`,t=`The tide gauge had been drifting for months.`;function n(n){n.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-context">
          <span class="sp-label" data-part="kicker">Harbour Review, page 14</span>
          <p class="sp-text sp-text--ink" data-part="before" style="margin: 6px 0 0; font-size: 12px; line-height: 17px">
            The survey team spent three weeks on the pontoon.
            <span data-part="running" style="background: var(--sp-accent-soft)">${t}</span>
          </p>
        </div>
        <figure data-part="pull" data-subject aria-hidden="true"
                style="position: relative; margin: 12px 0; padding: 9px 0 10px 30px;
                       border-top: 2px solid var(--sp-accent); border-bottom: 1px solid var(--sp-line)">
          <span data-part="mark" style="position: absolute; left: 0; top: 5px; font-family: ${e}; font-size: 40px;
                line-height: 1; color: var(--sp-accent)">&#8220;</span>
          <span style="display: block; font-family: ${e}; font-size: 17px; line-height: 23px">${t}</span>
        </figure>
        <p class="sp-text sp-text--ink sp-context" data-part="after" style="margin: 0; font-size: 12px; line-height: 17px">
          Nobody had checked it against the staff gauge since spring, and the record went out weekly.
        </p>
      </div>
    </div>
  `}export{n as mount};