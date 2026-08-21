import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The point of no return, and the height the row gives back once the card has gone. */
const THRESHOLD_PX = 100;
const ROW_HEIGHT = 52;
const FLY_PX = 460;
/** Held in a constant because the drag switches it off and the release puts it back. */
const CARD_EASE = 'transform 0.22s var(--sp-ease), opacity 0.22s';

const QUIET = [
  { mark: 'CA', text: 'Calendar: standup at 9:30' },
  { mark: 'PH', text: 'Photos: 12 new memories' },
];

function mark(at: string, label: string, name: string): string {
  return `
    <span data-part="${name}" style="position: absolute; left: ${at}; bottom: 0; display: flex; flex-direction: column;
                                     align-items: center; gap: 3px; transform: translateX(-50%)">
      <span style="width: 2px; height: 9px; background: var(--sp-muted)"></span>
      <span class="sp-label" style="font-size: 10px; white-space: nowrap">${label}</span>
    </span>`;
}

/**
 * Swipe to dismiss specimen: a notification thrown sideways. A short throw comes
 * back, a throw past the threshold keeps going and the row closes the space behind
 * it, and an undo is offered where the card used to be.
 *
 * The subject is the swipeable card, not the row that holds it and not the list: the
 * term names the thing that leaves. The ruler under the list is instrumentation and
 * so is the undo strip, both scenery (SPEC §5). The undo strip keeps its slot whether
 * it is showing or not, so nothing outside the list moves; inside the list, the space
 * closing is the term doing its work rather than incidental shift.
 *
 * The card also carries a dismiss button, because a gesture cannot be made with a
 * keyboard, a switch, or a voice command, and the pattern is only honest with a
 * visible equivalent beside it.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const quiet = QUIET.map(
    (item) => `
      <li class="sp-list-item sp-context" style="height: ${ROW_HEIGHT}px">
        <span class="sp-avatar">${item.mark}</span>
        <span class="sp-grow sp-text sp-text--ink">${item.text}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 270px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Notifications</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 8px">
          <div class="sp-surface" style="overflow: hidden">
            <ul class="sp-list">
              <li class="sp-list-item" data-part="row" style="position: relative; height: ${ROW_HEIGHT}px; padding: 0; overflow: hidden; transition: height 0.22s var(--sp-ease)">
                <div
                  class="sp-row"
                  data-part="card"
                  data-state="resting"
                  data-subject
                  style="height: ${ROW_HEIGHT}px; width: 100%; gap: 10px; padding: 0 8px 0 12px; background: var(--sp-surface);
                         cursor: grab; touch-action: none; transition: ${CARD_EASE}"
                >
                  <span class="sp-avatar">MW</span>
                  <span class="sp-grow sp-text sp-text--ink">Ferry timetable changed for Thursday</span>
                  <button class="sp-icon-button" data-part="dismiss" type="button" aria-label="Dismiss notification">${icon('close')}</button>
                </div>
              </li>
              ${quiet}
            </ul>
          </div>
          <div class="sp-context" data-part="ruler" style="position: relative; height: 26px">
            <span style="position: absolute; left: 27%; top: 0; height: 12px; border-left: 1px dashed var(--sp-muted)"></span>
            <span class="sp-label" style="position: absolute; left: 27%; bottom: 0; transform: translateX(-50%); font-size: 10px">threshold</span>
            ${mark('38%', 'short', 'mark-short')}
            ${mark('8%', 'past it', 'mark-far')}
          </div>
          <div
            class="sp-row sp-row--between sp-context"
            data-part="undo-row"
            style="flex: 0 0 auto; height: 30px; visibility: hidden; opacity: 0; transition: opacity 0.18s, visibility 0.18s"
          >
            <span class="sp-text">Notification dismissed</span>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="undo" type="button">Undo</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const row = part(root, 'row');
  const card = part(root, 'card');
  const undoRow = part(root, 'undo-row');
  const dismissButton = part(root, 'dismiss');

  let start: number | undefined;
  let offset = 0;

  const setOffset = (px: number) => {
    offset = px;
    card.style.transform = `translateX(${px}px)`;
    // Fading with the distance is what makes a throw read as a removal rather than
    // as a row that has come loose.
    card.style.opacity = String(Math.max(0.35, 1 - Math.abs(px) / (THRESHOLD_PX * 3)));
  };

  const showUndo = (shown: boolean) => {
    undoRow.style.visibility = shown ? 'visible' : 'hidden';
    undoRow.style.opacity = shown ? '1' : '0';
  };

  const dismiss = (direction: number) => {
    if (card.dataset.state === 'gone') return;
    card.dataset.state = 'gone';
    card.style.transition = CARD_EASE;
    setOffset(direction * FLY_PX);
    card.style.opacity = '0';
    // The card leaves first and the row closes behind it, so the list settles as one
    // movement instead of jumping under a finger that is still travelling.
    clock.setTimeout(() => {
      row.style.height = '0px';
    }, 160);
    showUndo(true);
  };

  card.addEventListener('pointerdown', (event) => {
    if (card.dataset.state === 'gone' || dismissButton.contains(event.target as Node)) return;
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) card.setPointerCapture(event.pointerId);
    start = event.clientX;
    // Following the finger is the whole gesture, and an eased offset would lag it.
    card.style.transition = 'none';
    card.dataset.state = 'dragging';
  });

  card.addEventListener('pointermove', (event) => {
    if (start === undefined) return;
    setOffset(event.clientX - start);
  });

  const release = () => {
    if (start === undefined) return;
    start = undefined;
    card.style.transition = CARD_EASE;
    if (Math.abs(offset) >= THRESHOLD_PX) {
      dismiss(Math.sign(offset));
      return;
    }
    // Short of the threshold the item comes back, which is what makes an accidental
    // brush cost nothing.
    setOffset(0);
    card.dataset.state = 'resting';
  };

  card.addEventListener('pointerup', release);
  card.addEventListener('pointercancel', release);
  dismissButton.addEventListener('click', () => dismiss(-1));

  part(root, 'undo').addEventListener('click', () => {
    row.style.height = `${ROW_HEIGHT}px`;
    card.style.transition = CARD_EASE;
    setOffset(0);
    card.dataset.state = 'resting';
    showUndo(false);
  });
}
