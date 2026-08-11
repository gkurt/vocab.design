/**
 * Holy grail specimen: header, footer, and three columns where only the middle
 * one is fluid. The arrangement is the whole term, so the scene itself carries
 * `data-subject` (which withdraws identify, SPEC §6) and nothing here is scenery:
 * dimming the aside would be dimming a quarter of the definition.
 *
 * Source order is part of the claim, so the main column is written first and
 * placed into the middle track by `grid-template-areas` rather than by sitting
 * there in the markup.
 */
const AREAS = "'head head head' 'nav main aside' 'foot foot foot'";

const CELL = 'padding: 10px 12px; min-width: 0';

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" data-subject>
      <div
        class="sp-frame"
        data-part="page"
        style="width: 470px; height: 268px; display: grid; grid-template-areas: ${AREAS}; grid-template-columns: 132px 1fr 116px; grid-template-rows: auto 1fr auto"
      >
        <div class="sp-topbar" data-part="header" style="grid-area: head">
          <span class="sp-heading sp-grow">Archive</span>
          <span class="sp-label">header</span>
        </div>
        <main data-part="main" style="grid-area: main; ${CELL}; background: var(--sp-surface); border-inline: 1px solid var(--sp-line)">
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
        <nav data-part="nav" aria-label="Sections" style="grid-area: nav; ${CELL}; background: var(--sp-sunken)">
          <span class="sp-label">132px</span>
          <ul class="sp-nav" style="margin-top: 8px">
            <li><span class="sp-nav-item" data-current>Notes</span></li>
            <li><span class="sp-nav-item">Sources</span></li>
            <li><span class="sp-nav-item">People</span></li>
          </ul>
        </nav>
        <aside data-part="aside" style="grid-area: aside; ${CELL}; background: var(--sp-sunken)">
          <span class="sp-label">116px</span>
          <div class="sp-stack" style="margin-top: 10px">
            <div class="sp-line" style="width: 80%"></div>
            <div class="sp-line" style="width: 60%"></div>
          </div>
        </aside>
        <div data-part="footer" style="grid-area: foot; ${CELL}; border-top: 1px solid var(--sp-line); background: var(--sp-surface)">
          <span class="sp-label">footer</span>
        </div>
      </div>
    </div>
  `;
}
