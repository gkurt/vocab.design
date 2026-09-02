import{t as e}from"./icons.CLHbLdSV.js";function t(t){t.innerHTML=`
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame" style="height: 272px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Rotating an API key</span></div>
        <div class="sp-body">
          <p class="sp-prose sp-context" data-part="prose-before" style="margin: 0">
            Create the replacement key first, then update every service that signs requests with the old one.
          </p>
          <div
            class="sp-surface sp-row"
            data-part="callout"
            data-subject
            role="note"
            style="align-items: flex-start; gap: 10px; margin: 12px 0; padding: 10px 12px; background: var(--sp-accent-soft); border-color: var(--sp-accent)"
          >
            <span style="display: flex; color: var(--sp-accent)">${e(`bell`)}</span>
            <span class="sp-grow">
              <span class="sp-heading" style="font-size: 13px">Revocation is immediate</span>
              <span class="sp-text" style="display: block">The old key stops working the moment you rotate. There is no grace period.</span>
            </span>
          </div>
          <p class="sp-prose sp-context" data-part="prose-after" style="margin: 0">
            Once traffic is signing cleanly, revoke the previous key from the same screen.
          </p>
        </div>
      </div>
    </div>
  `}export{t as mount};