var e=`border-radius: 999px; padding: 8px 16px; font-size: 12px; background: rgb(255 255 255 / 0.26); color: #ffffff`;function t(t){t.innerHTML=`
    <div class="sp-app" data-loop="keep" style="gap: 10px">
      <span class="sp-context" aria-hidden="true" style="position: absolute; inset: 0; background-image: radial-gradient(60% 50% at 22% 18%, rgb(255 236 198 / 0.85), transparent 70%), radial-gradient(50% 45% at 84% 78%, rgb(126 170 214 / 0.7), transparent 72%), linear-gradient(158deg, #6d7f9b 0%, #8f7f74 46%, #3f4654 100%)"></span>

      <div data-part="stack" data-subject
           style="position: relative; width: 272px; height: 208px">

        <div class="sp-glass" data-part="panel-far"
             style="position: absolute; left: 4px; top: 0; width: 148px; height: 86px; padding: 10px;
                    transform: scale(0.94); box-shadow: 0 6px 18px rgb(16 24 40 / 0.22)">
          <div style="font-size: 12px; font-weight: 600">Library</div>
          <div style="margin-top: 8px; height: 6px; border-radius: 999px; background: rgb(255 255 255 / 0.5)"></div>
          <div style="margin-top: 6px; width: 70%; height: 6px; border-radius: 999px; background: rgb(255 255 255 / 0.34)"></div>
          <div style="margin-top: 6px; width: 84%; height: 6px; border-radius: 999px; background: rgb(255 255 255 / 0.34)"></div>
        </div>

        <div class="sp-glass" data-part="panel-mid"
             style="position: absolute; left: 34px; top: 48px; width: 168px; height: 92px; padding: 10px;
                    transform: scale(0.97); box-shadow: 0 12px 26px rgb(16 24 40 / 0.3)">
          <div style="font-size: 12px; font-weight: 600">Coast Recordings</div>
          <div style="margin-top: 8px; height: 6px; border-radius: 999px; background: rgb(255 255 255 / 0.5)"></div>
          <div style="margin-top: 6px; width: 62%; height: 6px; border-radius: 999px; background: rgb(255 255 255 / 0.34)"></div>
          <div style="margin-top: 6px; width: 88%; height: 6px; border-radius: 999px; background: rgb(255 255 255 / 0.34)"></div>
        </div>

        <div class="sp-glass" data-part="panel-near"
             style="position: absolute; left: 72px; top: 100px; width: 196px; height: 104px; padding: 12px;
                    box-shadow: 0 22px 44px rgb(16 24 40 / 0.42)">
          <div style="font-size: 13px; font-weight: 600">Twelve Miles of Weather</div>
          <div style="margin-top: 4px; font-size: 11px; opacity: 0.82">Episode 4, 38 min</div>
          <div class="sp-row" style="gap: 8px; margin-top: 12px">
            <button class="sp-button" data-part="play" type="button" style="${e}">Play</button>
            <button class="sp-button" data-part="later" type="button" style="${e}">Later</button>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption"
         style="position: relative; max-width: 272px; margin: 0; text-align: center; font-size: 11px; color: #f3f5fa">
        One glass material, three distances, controls sized for a gaze.
      </p>
    </div>
  `}export{t as mount};