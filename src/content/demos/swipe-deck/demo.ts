import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** Past this much sideways travel the release commits; short of it the card comes home. */
const THRESHOLD_PX = 70;
const CARD = { w: 150, h: 160 };
/** How long the thrown card takes to leave, and how long the promotion under it takes. */
const LEAVE_MS = 340;
const LEAVE_EASE = 'translate 0.3s var(--sp-ease), rotate 0.3s var(--sp-ease), opacity 0.3s';
const HOME_EASE = 'translate 0.22s var(--sp-ease), rotate 0.22s var(--sp-ease), opacity 0.22s';

const DECK = [
  { title: 'Harbour steps', meta: '25 min walk' },
  { title: 'Kiln lane loop', meta: '1 hr 10 min' },
  { title: 'Reservoir path', meta: '40 min walk' },
  { title: 'Old tramway', meta: '2 hr 5 min' },
];

/** The face of one card: a picture block, the name, and how long it takes. */
const face = (index: number) => {
  const item = DECK[index % DECK.length] as (typeof DECK)[number];
  return `
    <div style="height: 74px; border-radius: 6px; background: var(--sp-sunken)"></div>
    <div class="sp-heading" style="margin-top: 9px; font-size: 13px">${item.title}</div>
    <div class="sp-text" style="margin-top: 2px; font-size: 11px">${item.meta}</div>`;
};

/** An aim anchor for the script: a coordinate to throw through, with no paint of its own. */
const anchor = (name: string, x: number, y: number) =>
  `<span data-part="${name}" style="position: absolute; left: ${x - 4}px; top: ${y - 4}px; width: 8px; height: 8px"></span>`;

/**
 * Swipe deck specimen: four walks judged one at a time. The top card follows the drag,
 * leans with it, and a release past the threshold throws it for good, records which way
 * it went, and leaves the next card standing where it was. A short drag comes home.
 *
 * The subject is the top card, the one being judged: the term names the card under the
 * finger rather than the pile behind it or the counters above it. The deck's two buttons
 * are the term's own accessible equivalent (a drag cannot be made with a keyboard) and
 * the counters and hints are scenery (SPEC §5).
 *
 * The top card is one recycled element, so the subject is always on stage: it flies out,
 * the card beneath it rises into the same place, and the recycled card takes over at
 * centre carrying the next walk. The card box never resizes and both throws end well
 * inside the frame, so nothing is clipped on its way out (SPEC §5).
 *
 * A real reader's drag needs the pointer captured or it dies at the card's edge, and the
 * guard is mandatory: the player's synthetic pointers have no capture to take and the
 * call throws (SPEC §7). The release is answered on pointerup and pointercancel, never on
 * pointerleave, which does not fire while capture holds.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Walks near you</span>
          <span class="sp-chip" data-part="saved-chip" style="flex: 0 0 auto; padding: 2px 8px; font-size: 11px; white-space: nowrap; cursor: default">Saved 0</span>
          <span class="sp-chip" data-part="skipped-chip" style="flex: 0 0 auto; padding: 2px 8px; font-size: 11px; white-space: nowrap; cursor: default">Skipped 0</span>
        </div>
        <div class="sp-body" style="position: relative">
          <span class="sp-label sp-context" style="position: absolute; left: 12px; top: 12px; font-size: 10px">left to skip</span>
          <span class="sp-label sp-context" style="position: absolute; right: 12px; top: 12px; font-size: 10px">right to save</span>

          <div
            data-part="deck"
            data-card="1"
            data-saved="0"
            data-skipped="0"
            data-last="none"
            style="position: absolute; left: 162px; top: 14px; width: ${CARD.w}px; height: ${CARD.h}px"
          >
            <div class="sp-surface sp-context" style="position: absolute; inset: 0; translate: 0 16px; scale: 0.92"></div>
            <div
              class="sp-surface"
              data-part="next"
              style="position: absolute; inset: 0; padding: 10px; background: var(--sp-surface); translate: 0 8px; scale: 0.96"
            >${face(1)}</div>
            <div
              class="sp-surface"
              data-part="card"
              data-subject
              data-state="resting"
              style="position: absolute; inset: 0; padding: 10px; background: var(--sp-surface); box-shadow: var(--sp-shadow);
                     cursor: grab; touch-action: none; transition: ${HOME_EASE}"
            >${face(0)}</div>
          </div>

          ${anchor('throw-left', 95, 94)}
          ${anchor('throw-right', 375, 94)}
          ${anchor('arc-left', 165, 110)}
          ${anchor('arc-right', 310, 110)}

          <div class="sp-row" style="position: absolute; left: 12px; right: 12px; bottom: 12px; justify-content: center; gap: 10px">
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="skip" type="button" style="flex: 0 0 auto">Skip</button>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="save" type="button" style="flex: 0 0 auto">Save</button>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px; line-height: 1.35">Only the top card can be judged, and the throw is the answer. The card that leaves does not come back.</span>
    </div>
  `;

  const deck = part(root, 'deck');
  const card = part(root, 'card');
  const next = part(root, 'next');
  const savedChip = part(root, 'saved-chip');
  const skippedChip = part(root, 'skipped-chip');

  let index = 0;
  let saved = 0;
  let skipped = 0;
  let start: number | undefined;
  let offset = 0;

  const place = (px: number) => {
    offset = px;
    card.style.translate = `${px}px 0`;
    card.style.rotate = `${Math.max(-6, Math.min(6, px * 0.04))}deg`;
    card.style.opacity = String(Math.max(0.4, 1 - Math.abs(px) / 260));
  };

  const settle = () => {
    index += 1;
    card.style.transition = 'none';
    card.innerHTML = face(index);
    card.dataset.state = 'resting';
    place(0);
    card.style.opacity = '1';
    // The riser has been carrying the incoming face, so the handover happens where it
    // already stands: same face, same place, nothing visibly changes hands.
    next.style.transition = 'none';
    next.style.translate = '0 8px';
    next.style.scale = '0.96';
    next.innerHTML = face(index + 1);
    deck.dataset.card = String((index % DECK.length) + 1);
  };

  const commit = (direction: -1 | 1) => {
    if (card.dataset.state === 'leaving') return;
    card.dataset.state = 'leaving';
    if (direction === 1) saved += 1;
    else skipped += 1;
    savedChip.textContent = `Saved ${saved}`;
    skippedChip.textContent = `Skipped ${skipped}`;
    deck.dataset.saved = String(saved);
    deck.dataset.skipped = String(skipped);
    deck.dataset.last = direction === 1 ? 'saved' : 'skipped';
    card.style.transition = LEAVE_EASE;
    place(direction * 138);
    card.style.opacity = '0';
    next.style.transition = 'translate 0.3s var(--sp-ease), scale 0.3s var(--sp-ease)';
    next.style.translate = '0 0';
    next.style.scale = '1';
    clock.setTimeout(settle, LEAVE_MS);
  };

  card.addEventListener('pointerdown', (event) => {
    if (card.dataset.state === 'leaving') return;
    // A real drag has to keep reporting after the pointer leaves the card. Synthetic
    // pointers have no capture to take and the call throws, so the guard is mandatory.
    if (event.isTrusted) card.setPointerCapture(event.pointerId);
    start = localPoint(event, root).x;
    card.style.transition = 'none';
    card.dataset.state = 'dragging';
  });

  card.addEventListener('pointermove', (event) => {
    if (start === undefined) return;
    place(localPoint(event, root).x - start);
  });

  const release = () => {
    if (start === undefined) return;
    start = undefined;
    card.style.transition = HOME_EASE;
    if (Math.abs(offset) >= THRESHOLD_PX) {
      commit(offset > 0 ? 1 : -1);
      return;
    }
    card.dataset.state = 'resting';
    place(0);
    card.style.opacity = '1';
  };

  card.addEventListener('pointerup', release);
  card.addEventListener('pointercancel', release);

  part(root, 'skip').addEventListener('click', () => commit(-1));
  part(root, 'save').addEventListener('click', () => commit(1));
}
