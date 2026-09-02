var e=[`position: relative`,`display: block`,`width: 96px`,`height: 96px`,`border-radius: 24px`,`overflow: hidden`,`background-image: radial-gradient(128% 118% at 50% 116%, #5b8bf0 0%, #2a49a8 58%, #16307d 100%)`,`box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.22), 0 4px 10px rgb(16 24 40 / 0.28)`].join(`; `);function t(t,n,r){return`
    <div class="sp-stack" style="flex: 0 0 auto; width: 130px; gap: 7px; align-items: center">
      <span data-part="${t}" aria-hidden="true" style="${e}">${r}</span>
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${n}</span>
    </div>`}function n(e){e.innerHTML=`
    <div class="sp-app" style="gap: 10px">
      <div class="sp-window" style="width: 452px; padding: 13px 16px 15px">
        <div class="sp-row" data-part="tour" style="gap: 12px; align-items: flex-start; justify-content: center">
          ${t(`tile-tight`,`Tight`,`
    <span data-part="hl-tight" data-subject
          style="position: absolute; left: 15px; top: 12px; width: 50px; height: 33px; border-radius: 50%;
                 background: radial-gradient(closest-side, rgb(255 255 255 / 0.98) 0%,
                             rgb(255 255 255 / 0.62) 46%, rgb(255 255 255 / 0) 76%)"></span>`)}
          ${t(`tile-broad`,`Broad`,`
    <span data-part="hl-broad"
          style="position: absolute; left: -6px; top: -10px; width: 104px; height: 82px; border-radius: 50%;
                 background: radial-gradient(closest-side, rgb(255 255 255 / 0.4) 0%,
                             rgb(255 255 255 / 0.19) 52%, rgb(255 255 255 / 0) 88%)"></span>`)}
          ${t(`tile-rim`,`Rim`,`
    <span data-part="hl-rim"
          style="position: absolute; inset: 0; border-radius: 24px;
                 box-shadow: inset 0 2px 0 rgb(255 255 255 / 0.92), inset 0 9px 14px -9px rgb(255 255 255 / 0.55),
                             inset 0 -2px 0 rgb(255 255 255 / 0.28)"></span>`)}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 452px; margin: 0; text-align: center">
        Size reports the roughness, position reports where the light is.
      </p>
    </div>
  `}export{n as mount};