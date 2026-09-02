var e=`display: flex; align-items: flex-start; gap: 12px`;function t(t){t.innerHTML=`
    <div class="sp-app" data-loop="keep">
      <div class="sp-window" style="width: 420px">
        <span class="sp-label sp-context">Comments</span>
        <div data-part="media" data-subject style="${e}; margin-top: 10px">
          <span class="sp-avatar" data-part="figure" style="width: 40px; height: 40px; font-size: 13px">RS</span>
          <div class="sp-grow" data-part="body">
            <span class="sp-heading">Rosa Silva</span>
            <div class="sp-text" style="margin-top: 4px">
              Took the coast road on Saturday and the new bridge is finally open, so the drive
              down to the harbour runs about twenty minutes shorter than the map still thinks.
            </div>
          </div>
        </div>
        <div class="sp-divider" style="margin: 14px 0"></div>
        <div class="sp-context" data-part="outer" style="${e}">
          <span class="sp-avatar" style="width: 40px; height: 40px; font-size: 13px">TK</span>
          <div class="sp-grow">
            <span class="sp-heading">Tomas Krall</span>
            <div class="sp-text" style="margin-top: 4px">Good to know. Is the parking by the pier still free at weekends?</div>
            <div data-part="nested" style="${e}; margin-top: 10px; gap: 8px">
              <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">RS</span>
              <div class="sp-grow">
                <span class="sp-text sp-text--ink" style="font-weight: 500">Rosa Silva</span>
                <div class="sp-text">Free until six, then it is two pounds an hour.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}export{t as mount};