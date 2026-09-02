var e=`width: 12px; height: 12px; flex: 0 0 auto; border-radius: 50%; --sp-swatch: var(--sp-accent)`,t=[{row:`row-camera`,dot:`dot-camera`,name:`Room camera`,state:`Idle`},{row:`row-screen`,dot:`dot-screen`,name:`Screen share`,state:`Muted`}];function n(n){n.innerHTML=`
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame" style="width: 340px; height: 226px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Capture</span>
          <span class="sp-label" data-part="elapsed">00:42</span>
        </div>
        <div class="sp-body">
          <ul class="sp-list" data-part="sources">
            <li class="sp-list-item" data-part="row-mic">
              <span class="sp-swatch sp-pulse" data-part="dot-mic" data-subject style="${e}"></span>
              <span class="sp-grow sp-text sp-text--ink sp-context">Studio mic</span>
              <span class="sp-label sp-context">Recording</span>
            </li>
            ${t.map(t=>`
      <li class="sp-list-item sp-context" data-part="${t.row}">
        <span class="sp-swatch" data-part="${t.dot}" style="${e}"></span>
        <span class="sp-grow sp-text sp-text--ink">${t.name}</span>
        <span class="sp-label">${t.state}</span>
      </li>`).join(``)}
          </ul>
          <p class="sp-text sp-context" data-stage-verdict data-part="legend" style="margin: 10px 4px 0">
            Only the live source breathes. It changes size, never position.
          </p>
        </div>
      </div>
    </div>
  `}export{n as mount};