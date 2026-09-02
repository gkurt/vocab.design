var e=[{key:`new`,label:`New document`,caps:[`Ctrl`,`N`]},{key:`find`,label:`Find in page`,caps:[`Ctrl`,`F`]},{key:`save`,label:`Save`,caps:[`Ctrl`,`S`]}];function t(t){t.innerHTML=`
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame" style="height: 220px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Atlas</span></div>
        <div class="sp-body">
          <div class="sp-surface sp-context" data-part="menu" style="padding: 4px">${e.map(({key:e,label:t,caps:n})=>`
      <div class="sp-menu-item" data-part="row-${e}">
        <span class="sp-grow">${t}</span>
        <span class="sp-row" style="gap: 3px">${n.map(e=>`<kbd class="sp-kbd">${e}</kbd>`).join(``)}</span>
      </div>`).join(``)}</div>
          <p class="sp-text" style="margin: 14px 0 0">
            Press <kbd class="sp-kbd" data-part="key-esc" data-subject>Esc</kbd> to close the menu.
          </p>
        </div>
      </div>
    </div>
  `}export{t as mount};