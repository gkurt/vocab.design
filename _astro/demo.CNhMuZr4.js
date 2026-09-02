var e=`The tide comes in`;function t(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 18px 14px">
        <div class="sp-context">
          <span class="sp-label" data-part="label-small">Reading size, 15 px</span>
          <div class="sp-row" style="gap: 12px; margin-top: 7px; align-items: flex-start">
            <div data-part="art"
                 style="flex: 0 0 auto; width: 96px; height: 54px; border-radius: 5px;
                        background: linear-gradient(150deg, #B9C0CC, #8A93A3 62%, #6F7889 100%)"></div>
            <div class="sp-grow">
              <p data-part="headline-small"
                 style="margin: 0; font-size: 15px; font-weight: 600; line-height: 1.24">${e}</p>
              <div class="sp-stack" style="gap: 5px; margin-top: 8px">
                <div class="sp-line" style="height: 6px"></div>
                <div class="sp-line" style="height: 6px"></div>
                <div class="sp-line" style="height: 6px; width: 62%"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="sp-divider sp-context" style="margin: 12px 0 11px"></div>

        <span class="sp-label sp-context" data-part="label-large">Display size, 52 px</span>
        <p data-part="headline-large" data-subject
           style="margin: 5px 0 0; font-size: 52px; font-weight: 700; line-height: 0.9;
                  letter-spacing: -0.03em; text-wrap: balance">${e}</p>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption"
           style="margin: 9px 0 0; font-size: 10px; line-height: 1.45">
          Same words, same face. At this size the tracking is pulled in and the leading set under one line,
          because a text face's own spacing reads loose up here.
        </p>
      </div>
    </div>
  `}export{t as mount};