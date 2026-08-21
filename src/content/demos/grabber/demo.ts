import { part } from '#src/kit/parts.ts';

/** Detents as fractions of the frame: the two heights the sheet is allowed to rest at. */
const DETENTS = { half: 0.46, full: 0.88 } as const;

type Detent = keyof typeof DETENTS;

/** How the sheet settles once it is let go, and the only motion it is allowed. */
const SETTLE_EASE = 'height 0.26s var(--sp-ease)';

/**
 * Grabber specimen: a bottom sheet with two detents, and the bar that says so.
 * The subject is the bar itself, since the term names the mark rather than the
 * sheet it sits on or the gesture it advertises.
 *
 * The drag reaches a detent rather than flipping between them (SPEC §8): the
 * sheet follows the pointer and then settles on whichever height it ended up
 * nearest, so a pass that starts over lands in the same place. Only the sheet
 * moves; the map, the header, and the list behind it hold still (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" data-part="screen" style="width: 260px; height: 300px">
        <div class="sp-topbar sp-context" data-part="screen-top"><span class="sp-heading sp-grow">Nearby</span></div>
        <div class="sp-body sp-context" style="padding: 12px 12px 0">
          <ul class="sp-list">
            <li class="sp-list-item"><span class="sp-avatar">BB</span><span class="sp-grow">Blue Bottle</span><span class="sp-text">0.2 mi</span></li>
            <li class="sp-list-item"><span class="sp-avatar">KA</span><span class="sp-grow">Kaffa Roast</span><span class="sp-text">0.4 mi</span></li>
            <li class="sp-list-item" data-part="screen-mid"><span class="sp-avatar">TC</span><span class="sp-grow">The Cabin</span><span class="sp-text">0.6 mi</span></li>
          </ul>
        </div>
        <div
          class="sp-surface"
          data-part="sheet"
          data-state="half"
          role="dialog"
          aria-label="Blue Bottle"
          style="position: absolute; left: 0; right: 0; bottom: 0; height: 46%; border-radius: 14px 14px 0 0; border-bottom: 0; transition: ${SETTLE_EASE}"
        >
          <div
            data-part="handle-area"
            style="display: flex; align-items: center; justify-content: center; height: 22px; touch-action: none; cursor: grab"
          >
            <button
              type="button"
              data-part="grabber"
              data-subject
              aria-label="Resize sheet"
              style="width: 36px; height: 5px; padding: 0; border: 0; border-radius: 999px; background: var(--sp-line); cursor: grab"
            ></button>
          </div>
          <div class="sp-stack sp-context" style="gap: 8px; padding: 4px 14px 14px">
            <div class="sp-row sp-row--between">
              <span class="sp-heading">Blue Bottle</span>
              <span class="sp-text">Open till 6</span>
            </div>
            <span class="sp-text">Coffee bar, 24 Wharf Road. Seats twelve, takes cards only.</span>
            <div class="sp-divider"></div>
            <div class="sp-row sp-row--between"><span class="sp-label">Walk</span><span class="sp-text">4 min</span></div>
            <div class="sp-row sp-row--between"><span class="sp-label">Busy</span><span class="sp-text">Quiet right now</span></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const screen = part(root, 'screen');
  const sheet = part(root, 'sheet');
  const handle = part(root, 'handle-area');

  /** Pointer-to-sheet-top distance, so a drag never snaps the sheet up to the finger. */
  let grabbed: number | undefined;

  const settle = (detent: Detent) => {
    sheet.style.height = `${DETENTS[detent] * 100}%`;
    sheet.dataset.state = detent;
  };

  const nearest = (height: number): Detent => {
    const frame = screen.getBoundingClientRect().height;
    return Math.abs(height - DETENTS.half * frame) <= Math.abs(height - DETENTS.full * frame) ? 'half' : 'full';
  };

  handle.addEventListener('pointerdown', (event) => {
    // Captured, or a reader dragging past the edge loses the stroke; a synthetic pointer has none to capture.
    if (event.isTrusted) handle.setPointerCapture(event.pointerId);
    const rect = sheet.getBoundingClientRect();
    grabbed = event.clientY - rect.top;
    // Following a finger is not an animation: the eased height would lag the drag.
    sheet.style.transition = 'none';
  });

  root.addEventListener('pointermove', (event) => {
    if (grabbed === undefined) return;
    const frame = screen.getBoundingClientRect();
    const height = Math.min(Math.max(frame.bottom - (event.clientY - grabbed), 40), DETENTS.full * frame.height);
    sheet.style.height = `${height}px`;
  });

  const release = () => {
    if (grabbed === undefined) return;
    grabbed = undefined;
    sheet.style.transition = SETTLE_EASE;
    settle(nearest(sheet.getBoundingClientRect().height));
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  // A gesture-only affordance is a gesture-only feature: the same detents by keyboard.
  part(root, 'grabber').addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') settle('full');
    else if (event.key === 'ArrowDown') settle('half');
    else return;
    event.preventDefault();
  });
}
