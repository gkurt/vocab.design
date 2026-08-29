import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

/** One authored signature, so the same mark is drawn on every run (SPEC §8). Coordinates are
    in the sheet's own 450 by 118 space, with the printed baseline at y 82. */
const SIGNATURE =
  'M 66 88 C 84 44, 100 40, 110 62 C 120 84, 108 96, 98 88 C 88 80, 108 56, 134 56 ' +
  'C 158 56, 146 90, 166 90 C 184 90, 184 60, 202 60 C 218 60, 208 92, 228 90 ' +
  'C 250 88, 246 52, 266 54 C 284 56, 276 92, 296 90 C 320 88, 316 48, 340 54 ' +
  'C 356 58, 348 90, 368 84 C 384 79, 392 68, 404 62';

/** Where the mark starts and ends across the pad: the fraction of the stroke revealed is the
    pointer's own progress between them, so the ink never runs ahead of the hand. */
const FROM = 64;
const TO = 404;

const FULL_VIEW = '0 0 450 118';
/** The ink's own bounds, which is what a capture is trimmed to. */
const TRIM_VIEW = '56 34 358 70';

const clamp = (n: number, low: number, high: number) => Math.max(low, Math.min(high, n));

/**
 * Signature pad specimen: the signing step of a delivery receipt. Dragging across the pad lays
 * down the stroke, Done commits it and trims the capture to the ink's own bounds, and Clear
 * takes the pad back to an empty baseline.
 *
 * The subject is the signing surface, `data-part="pad"`: the baseline, the cross and the hint
 * are printed on it and belong to it, while the receipt around it and the two controls under it
 * are scenery. It is honestly a signing surface empty, signed and captured, so no `data-pose`
 * condition is needed.
 *
 * The stroke follows the pointer rather than playing back on a timer: the revealed length of the
 * path is the pointer's own horizontal progress across the pad, so there is no scripted animation
 * here to gate on `prefersReducedMotion`, and no timer at all. The scripted hand signs rather
 * than swipes: the drag runs through the pad-mid via waypoints (invisible aim anchors, SPEC §5),
 * rising and falling like a signature while the ink's leading edge tracks it horizontally.
 * Every state is reached absolutely (sign, Done, Clear) rather than by
 * flipping whatever was found (SPEC §8), and both controls keep their box in every state, so
 * nothing moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 250px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Delivery receipt</span>
          <span class="sp-label" style="font-size: 12px">Step 3 of 3</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <span class="sp-label sp-context">Sign to confirm you received two parcels</span>

          <div
            class="sp-surface"
            data-part="pad"
            data-subject
            data-state="empty"
            style="position: relative; width: 450px; height: 118px; background: var(--sp-surface); overflow: hidden;
                   touch-action: none; cursor: crosshair"
          >
            <span data-part="baseline" style="position: absolute; left: 30px; right: 30px; top: 82px; height: 2px; background: var(--sp-line)"></span>
            <span
              data-part="cross"
              aria-hidden="true"
              style="position: absolute; left: 32px; top: 66px; font-size: 13px; line-height: 1; color: var(--sp-muted)"
            >&#10005;</span>
            <span
              data-stage-verdict data-part="hint"
              style="position: absolute; left: 0; right: 0; top: 44px; text-align: center; font-size: 11px; color: var(--sp-muted)"
            >Draw your signature above the line</span>

            <svg data-part="sheet" viewBox="${FULL_VIEW}" width="450" height="118" aria-hidden="true" style="position: absolute; inset: 0">
              <path
                data-part="ink"
                d="${SIGNATURE}"
                fill="none"
                stroke="var(--sp-ink)"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span data-part="pad-start" style="position: absolute; left: ${FROM - 8}px; top: 74px; width: 16px; height: 16px"></span>
            <span data-part="pad-mid-a" style="position: absolute; left: 142px; top: 46px; width: 16px; height: 16px"></span>
            <span data-part="pad-mid-b" style="position: absolute; left: 222px; top: 90px; width: 16px; height: 16px"></span>
            <span data-part="pad-mid-c" style="position: absolute; left: 312px; top: 50px; width: 16px; height: 16px"></span>
            <span data-part="pad-end" style="position: absolute; left: ${TO - 8}px; top: 74px; width: 16px; height: 16px"></span>

            <span class="sp-chip" data-part="stamp" hidden style="position: absolute; right: 8px; top: 8px; font-size: 11px; cursor: default">Captured</span>
          </div>

          <div class="sp-row sp-row--between sp-context" style="margin-top: 2px">
            <span class="sp-label" data-part="status" role="status" style="font-size: 11px">Nothing captured yet</span>
            <div class="sp-row" style="gap: 8px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="btn-clear" aria-disabled="true">Clear</button>
              <button class="sp-button sp-button--sm" type="button" data-part="btn-done" aria-disabled="true">Done</button>
            </div>
          </div>
        </div>
      </div>

      <span class="sp-label sp-context" style="height: 15px; font-size: 11px; line-height: 15px">
        The pad keeps the stroke, not a picture of it, and Done trims the capture to the ink.
      </span>
    </div>
  `;

  const pad = part(root, 'pad');
  const sheet = part(root, 'sheet');
  const baseline = part(root, 'baseline');
  const cross = part(root, 'cross');
  const hint = part(root, 'hint');
  const stamp = part(root, 'stamp');
  const status = part(root, 'status');
  const clearButton = part(root, 'btn-clear');
  const doneButton = part(root, 'btn-done');

  const ink = root.querySelector('[data-part=ink]');
  if (!(ink instanceof SVGPathElement)) return;

  // Read once, at mount, in the state it is measured in: the path's geometry never changes,
  // and a length read after a style write would be a length read mid-transition (SPEC §5).
  const length = ink.getTotalLength();
  ink.style.strokeDasharray = String(length);

  let progress = 0;
  let drawing = false;

  const STATUS: Record<string, string> = {
    empty: 'Nothing captured yet',
    signed: 'Stroke captured, 1 path',
    captured: 'Signed by A. Mensah, 12 August',
  };

  const setState = (state: string) => {
    pad.dataset.state = state;
    const captured = state === 'captured';
    const empty = state === 'empty';
    sheet.setAttribute('viewBox', captured ? TRIM_VIEW : FULL_VIEW);
    baseline.hidden = captured;
    cross.hidden = captured;
    hint.hidden = !empty;
    stamp.hidden = !captured;
    pad.style.cursor = captured ? 'default' : 'crosshair';
    clearButton.setAttribute('aria-disabled', String(empty));
    doneButton.setAttribute('aria-disabled', String(state !== 'signed'));
    status.textContent = STATUS[state] ?? '';
  };

  const reveal = (next: number) => {
    progress = clamp(next, 0, 1);
    ink.style.strokeDashoffset = String(length * (1 - progress));
  };

  const progressAt = (event: PointerEvent) => (localPoint(event, pad).x - FROM) / (TO - FROM);

  pad.addEventListener('pointerdown', (event) => {
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) pad.setPointerCapture((event as PointerEvent).pointerId);
    // Starting a stroke always starts a fresh one, whatever state the pad was found in.
    reveal(0);
    setState('empty');
    drawing = true;
    reveal(progressAt(event as PointerEvent));
  });

  root.addEventListener('pointermove', (event) => {
    if (!drawing) return;
    reveal(progressAt(event as PointerEvent));
    if (progress > 0.02 && pad.dataset.state === 'empty') setState('signed');
  });

  const release = () => {
    if (!drawing) return;
    drawing = false;
    setState(progress > 0.02 ? 'signed' : 'empty');
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  doneButton.addEventListener('click', () => {
    if (pad.dataset.state !== 'signed') return;
    reveal(1);
    setState('captured');
  });

  clearButton.addEventListener('click', () => {
    reveal(0);
    setState('empty');
  });

  reveal(0);
  setState('empty');
}
