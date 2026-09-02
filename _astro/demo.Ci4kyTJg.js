var e=`padding: 10px 12px; min-width: 0`;function t(t){t.innerHTML=`
    <div class="sp-app" data-subject>
      <div
        class="sp-frame"
        data-part="page"
        style="width: 470px; height: 268px; display: grid; grid-template-areas: 'head head head' 'nav main aside' 'foot foot foot'; grid-template-columns: 132px 1fr 116px; grid-template-rows: auto 1fr auto"
      >
        <div class="sp-topbar" data-part="header" style="grid-area: head">
          <span class="sp-heading sp-grow">Archive</span>
          <span class="sp-label">header</span>
        </div>
        <main data-part="main" style="grid-area: main; ${e}; background: var(--sp-surface); border-inline: 1px solid var(--sp-line)">
          <div class="sp-row sp-row--between">
            <span class="sp-heading">Field notes</span>
            <span class="sp-label">1fr</span>
          </div>
          <div class="sp-stack" style="margin-top: 10px">
            <div class="sp-line" style="width: 96%"></div>
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 92%"></div>
            <div class="sp-line" style="width: 64%"></div>
          </div>
        </main>
        <nav data-part="nav" aria-label="Sections" style="grid-area: nav; ${e}; background: var(--sp-sunken)">
          <span class="sp-label">132px</span>
          <ul class="sp-nav" style="margin-top: 8px">
            <li><span class="sp-nav-item" data-current>Notes</span></li>
            <li><span class="sp-nav-item">Sources</span></li>
            <li><span class="sp-nav-item">People</span></li>
          </ul>
        </nav>
        <aside data-part="aside" style="grid-area: aside; ${e}; background: var(--sp-sunken)">
          <span class="sp-label">116px</span>
          <div class="sp-stack" style="margin-top: 10px">
            <div class="sp-line" style="width: 80%"></div>
            <div class="sp-line" style="width: 60%"></div>
          </div>
        </aside>
        <div data-part="footer" style="grid-area: foot; ${e}; border-top: 1px solid var(--sp-line); background: var(--sp-surface)">
          <span class="sp-label">footer</span>
        </div>
      </div>
    </div>
  `}export{t as mount};