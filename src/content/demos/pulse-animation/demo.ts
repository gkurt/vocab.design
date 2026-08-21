const DOT = 'width: 12px; height: 12px; flex: 0 0 auto; border-radius: 50%; --sp-swatch: var(--sp-accent)';

const QUIET = [
  { row: 'row-camera', dot: 'dot-camera', name: 'Room camera', state: 'Idle' },
  { row: 'row-screen', dot: 'dot-screen', name: 'Screen share', state: 'Muted' },
];

/**
 * Pulse specimen: three status dots cut from the same markup, and only the live
 * one breathes. The comparison is the whole demonstration, so there is nothing to
 * operate and no timer to keep: the loop is CSS, and it holds the dot's place
 * while it runs. The quiet rows carry the accent into the context register, which
 * is how one line of markup yields both a live dot and a scenery dot.
 *
 * Nothing is operated, so the pass ends at its mount state: the tree persists across attract
 * iterations (`data-loop="keep"`) and the dot's own loop breathes unbroken.
 */
export function mount(root: HTMLElement): void {
  const quiet = QUIET.map(
    (row) => `
      <li class="sp-list-item sp-context" data-part="${row.row}">
        <span class="sp-swatch" data-part="${row.dot}" style="${DOT}"></span>
        <span class="sp-grow sp-text sp-text--ink">${row.name}</span>
        <span class="sp-label">${row.state}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame" style="width: 340px; height: 226px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Capture</span>
          <span class="sp-label" data-part="elapsed">00:42</span>
        </div>
        <div class="sp-body">
          <ul class="sp-list" data-part="sources">
            <li class="sp-list-item" data-part="row-mic">
              <span class="sp-swatch sp-pulse" data-part="dot-mic" data-subject style="${DOT}"></span>
              <span class="sp-grow sp-text sp-text--ink sp-context">Studio mic</span>
              <span class="sp-label sp-context">Recording</span>
            </li>
            ${quiet}
          </ul>
          <p class="sp-text sp-context" data-part="legend" style="margin: 10px 4px 0">
            Only the live source breathes. It changes size, never position.
          </p>
        </div>
      </div>
    </div>
  `;
}
