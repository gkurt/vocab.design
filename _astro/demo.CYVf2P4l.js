var e=`#1b0140`,t=`'Times New Roman', Times, serif`;function n(e,t,n){return`
    <div class="sp-stack${n?` sp-context`:``}" style="flex: 0 0 206px; gap: 5px; align-items: stretch">
      ${t}
      <span class="sp-label" style="color: var(--sp-ink); font-size: 12px">${e}</span>
    </div>`}function r(r){let i=`
    <div data-part="card-anti" data-subject
         style="position: relative; width: 206px; height: 164px; overflow: hidden; background: #00e0c8;
                border: 3px solid ${e}">
      <span data-part="anti-photo" aria-hidden="true"
            style="position: absolute; left: 8px; top: 8px; width: 112px; height: 56px; overflow: hidden;
                   background: #ffd400; border: 2px solid ${e}; rotate: -4deg">
        <span style="position: absolute; left: 50%; top: 50%; width: 46px; height: 46px; border-radius: 50%;
                     background: ${e}; translate: -50% -50%; scale: 2.1 0.6"></span>
      </span>

      <span data-part="anti-price"
            style="position: absolute; left: 100px; top: 44px; padding: 3px 7px 4px; background: #ff1f8f; color: #ffffff;
                   font-family: 'Courier New', Courier, monospace; font-size: 15px; font-weight: 700; line-height: 1.1; rotate: 4deg">
        140.00
      </span>

      <span data-part="anti-heading"
            style="position: absolute; left: -3px; top: 72px; font-family: ${t}; font-size: 31px; font-weight: 700;
                   letter-spacing: -0.015em; line-height: 1; color: ${e}; rotate: -3deg">
        Bell stool
      </span>

      <span data-part="anti-sub"
            style="position: absolute; left: 15px; top: 108px; font-family: 'Comic Sans MS', 'Chalkboard SE', cursive; font-size: 13px;
                   line-height: 1.2; color: #a3004f">
        steel!!! 3 heights
      </span>

      <span data-part="anti-link"
            style="position: absolute; left: 15px; top: 130px; font-family: ${t}; font-size: 13px;
                   line-height: 1.2; color: #0000ee; text-decoration: underline">
        more info
      </span>

      <button type="button" data-part="anti-button"
              style="position: absolute; right: 8px; bottom: 10px; padding: 5px 12px 6px; border: 3px outset #e8e6e0;
                     background: #c8c4bc; color: #000000; font-family: ${t}; font-size: 15px; line-height: 1.1;
                     cursor: pointer; rotate: 2deg">
        BUY
      </button>
    </div>`;r.innerHTML=`
    <div class="sp-app" data-loop="keep" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <div class="sp-row" data-part="tour" style="gap: 14px; align-items: flex-start; justify-content: center">
          ${n(`House style`,`
    <div data-part="card-house"
         style="display: flex; flex-direction: column; gap: 7px; width: 206px; height: 164px; padding: 12px;
                background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
      <span data-part="house-photo" aria-hidden="true"
            style="position: relative; display: block; height: 54px; border-radius: 6px; overflow: hidden;
                   background: var(--sp-sunken)">
        <span style="position: absolute; left: 50%; top: 50%; width: 44px; height: 44px; border-radius: 50%;
                     background: var(--sp-line); translate: -50% -50%"></span>
      </span>
      <span class="sp-heading" data-part="house-heading" style="font-size: 15px">Bell stool</span>
      <span class="sp-text" style="font-size: 11px; line-height: 1.3">Powder-coated steel, three heights.</span>
      <div class="sp-row sp-row--between" style="margin-top: auto">
        <span style="font-size: 13px; font-weight: 600">£140</span>
        <button type="button" class="sp-button sp-button--sm" data-part="house-button">Add to bag</button>
      </div>
    </div>`,!0)}
          ${n(`Anti-design`,i,!1)}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        A break reads as a decision only if something nearby is still under control.
      </p>
    </div>
  `}export{r as mount};