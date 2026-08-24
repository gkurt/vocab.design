import { localPoint, localSize } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

/** The two heights the sheet is allowed to rest at, as fractions of the screen. */
const DETENTS = { half: 0.46, full: 0.9 } as const;

type Detent = keyof typeof DETENTS;

/** How the sheet settles once it is let go, and the only motion it is allowed. */
const SETTLE = 'height 0.26s var(--sp-ease), transform 0.3s var(--sp-ease), visibility 0.3s';

/**
 * Bottom sheet specimen: a surface that rises from the bottom edge of a phone
 * screen, rests at a detent, and is dragged to the next one by its grabber. The
 * subject is the sheet, since the term names the surface rather than the bar on
 * top of it (that one has its own word) or the screen it covers.
 *
 * The trigger only ever opens, and always to the same detent, so a pass picked up
 * anywhere lands in the same place; dismissal is explicit, by Escape or by the
 * scrim (SPEC §8). The sheet is out of flow, so nothing behind it moves as it
 * rises or changes height (SPEC §5), and its content scrolls inside it rather
 * than spilling past the bottom edge: at the half detent there is more written
 * than there is sheet to hold it, which is what the taller detent is for.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" data-part="screen" style="width: 264px; height: 300px">
        <div class="sp-topbar sp-context" data-part="screen-top">
          <span class="sp-heading sp-grow">Nearby</span>
          <span class="sp-text">Open now</span>
        </div>
        <div class="sp-body sp-context" style="padding: 12px">
          <ul class="sp-list">
            <li class="sp-list-item"><span class="sp-avatar">BB</span><span class="sp-grow">Blue Bottle</span><span class="sp-text">0.2 mi</span></li>
            <li class="sp-list-item"><span class="sp-avatar">KA</span><span class="sp-grow">Kaffa Roast</span><span class="sp-text">0.4 mi</span></li>
          </ul>
          <button class="sp-button sp-button--sm" type="button" data-part="open" style="margin-top: 12px">Show details</button>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div
          class="sp-surface"
          data-part="sheet"
          data-subject
          data-state="closed"
          role="dialog"
          aria-label="Blue Bottle"
          style="position: absolute; left: 0; right: 0; bottom: 0; height: ${DETENTS.half * 100}%; display: flex; flex-direction: column; overflow: hidden; border-radius: 16px 16px 0 0; border-bottom: 0; box-shadow: var(--sp-shadow); transform: translateY(100%); visibility: hidden; transition: ${SETTLE}"
        >
          <div
            data-part="handle-area"
            style="display: flex; flex: 0 0 auto; align-items: center; justify-content: center; height: 22px; touch-action: none; cursor: grab"
          >
            <span data-part="grabber" style="width: 36px; height: 5px; border-radius: 999px; background: var(--sp-line)"></span>
          </div>
          <div
            class="sp-stack"
            style="flex: 1 1 auto; min-height: 0; overflow-y: auto; scrollbar-width: thin; scrollbar-gutter: stable; gap: 8px; padding: 4px 10px 14px 14px"
          >
            <div class="sp-row sp-row--between">
              <span class="sp-heading">Blue Bottle</span>
              <span class="sp-text">Open till 6</span>
            </div>
            <span class="sp-text">Coffee bar, 24 Wharf Road. Seats twelve, takes cards only.</span>
            <div class="sp-divider"></div>
            <div class="sp-row sp-row--between"><span class="sp-label">Walk</span><span class="sp-text">4 min</span></div>
            <div class="sp-row sp-row--between"><span class="sp-label">Busy</span><span class="sp-text">Quiet right now</span></div>
            <div class="sp-row sp-row--between"><span class="sp-label">Rating</span><span class="sp-text">4.6 from 212</span></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const screen = part(root, 'screen');
  const sheet = part(root, 'sheet');
  const scrim = part(root, 'scrim');
  const handle = part(root, 'handle-area');

  /** Pointer-to-sheet-top distance, so a drag never snaps the sheet up to the finger. */
  let grabbed: number | undefined;

  const settle = (detent: Detent) => {
    sheet.style.height = `${DETENTS[detent] * 100}%`;
    sheet.dataset.state = detent;
  };

  const open = () => {
    scrim.setAttribute('data-open', '');
    sheet.style.visibility = 'visible';
    sheet.style.transform = 'translateY(0)';
    // Always the same detent: opening reaches a state rather than continuing one.
    settle('half');
  };

  const close = () => {
    grabbed = undefined;
    scrim.removeAttribute('data-open');
    sheet.style.transition = SETTLE;
    sheet.style.transform = 'translateY(100%)';
    sheet.style.visibility = 'hidden';
    sheet.dataset.state = 'closed';
  };

  const nearest = (height: number): Detent => {
    const frame = localSize(screen).height;
    return Math.abs(height - DETENTS.half * frame) <= Math.abs(height - DETENTS.full * frame) ? 'half' : 'full';
  };

  part(root, 'open').addEventListener('click', open);
  scrim.addEventListener('click', close);

  handle.addEventListener('pointerdown', (event) => {
    if (sheet.dataset.state === 'closed') return;
    // Capture keeps the drag alive past the handle's edge. A synthetic pointer has none to
    // capture and the call would throw, so only a real one asks.
    if (event.isTrusted) handle.setPointerCapture(event.pointerId);
    grabbed = localPoint(event, sheet).y;
    // Following a finger is not an animation: an eased height would lag the drag.
    sheet.style.transition = 'none';
  });

  root.addEventListener('pointermove', (event) => {
    if (grabbed === undefined) return;
    // The sheet's height is a length it writes, so the drag is measured in the pixels the
    // specimen is laid out in rather than the ones a listing card draws it at.
    const frame = localSize(screen).height;
    const point = localPoint(event, screen);
    const height = Math.min(Math.max(frame - (point.y - grabbed), 40), DETENTS.full * frame);
    sheet.style.height = `${height}px`;
  });

  const release = () => {
    if (grabbed === undefined) return;
    grabbed = undefined;
    sheet.style.transition = SETTLE;
    settle(nearest(localSize(sheet).height));
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
}
