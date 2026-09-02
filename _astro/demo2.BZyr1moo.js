var e=[{part:`row-digest`,label:`Email digest`,on:!0},{part:`row-mentions`,label:`Mentions in Harbour`,on:!0},{part:`row-sound`,label:`Sound and vibration`,on:!1}];function t(t){t.innerHTML=`
    <div class="sp-app">
      <div class="sp-window" style="width: 444px; padding: 14px 18px">
        <div class="sp-row sp-context">
          <span class="sp-label">settings screen</span>
        </div>
        <div class="sp-surface" data-part="labels" data-subject data-case="sentence"
             style="margin-top: 8px; padding: 10px 12px">
          <span class="sp-heading" data-part="screen-title" style="display: block">Notification preferences</span>
          <div class="sp-stack" style="gap: 0; margin-top: 4px">
            ${e.map(({part:e,label:t,on:n})=>`
    <div class="sp-row sp-row--between" data-part="${e}" style="height: 26px">
      <span style="font-size: 13px">${t}</span>
      <button class="sp-switch" role="switch" aria-checked="${n}" tabindex="-1"></button>
    </div>`).join(``)}
          </div>
          <div class="sp-row" data-part="actions" style="gap: 8px; margin-top: 8px">
            <button class="sp-button sp-button--sm" data-part="save">Save changes</button>
            <button class="sp-button sp-button--sm sp-button--ghost" data-part="later">Ask me later</button>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 8px 0 0; font-size: 12px">
          Only "Harbour" keeps a capital, because it is a name and not a word.
        </p>
      </div>
    </div>
  `}export{t as mount};