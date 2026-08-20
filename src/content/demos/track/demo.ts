import { part } from '#src/kit/parts.ts';

/** Every box is stated once: a handle moving never resizes the groove it moves in (SPEC §5). */
const CARD_W = 400;
const LANE_W = 230;
const GROOVE_H = 10;
const START = 62;

/** Which third of the range the handle has reached, so a claim about the split needs no exact pixel. */
function band(value: number): string {
  if (value < 35) return 'low';
  return value > 75 ? 'high' : 'mid';
}

/**
 * Track specimen: the same part doing its job in three controls at once, which is the only honest
 * way to show a term whose whole point is being shared. A slider, a scrollbar and a progress bar
 * are stacked in one card at the same width and the same groove thickness, so what they have in
 * common is the thing the eye lands on: a fixed channel stating the whole range, filled up to the
 * handle and empty past it.
 *
 * The subject is the slider's own track, the narrowest element the term names. The thumb is a
 * separate element sitting over it rather than inside it, so the ring traces the groove and not the
 * handle that travels it; the scrollbar and the progress bar are the same part in the context
 * register, and the pane, labels and readout are scenery. The track is honestly a track at every
 * value the script visits, so no `data-pose` condition is needed.
 *
 * Nothing here transitions, because a groove whose fill eases is a fill lagging the handle, and
 * nothing moves but the handles: the grooves keep their boxes, the readout is a fixed-width slot,
 * and the scroll pane hides its native scrollbar so the drawn one is the only one on screen. The
 * drag captures the pointer on a trusted pointerdown, so a real reader's drag survives leaving the
 * thumb (SPEC §7); the script's synthetic pointers cannot be captured, which is why the guard is
 * mandatory rather than tidy.
 */
export function mount(root: HTMLElement): void {
  const swatch = () => '<span style="flex: 0 0 68px; height: 26px; border-radius: 6px; background: var(--sp-line)"></span>';

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 276px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">One part, three controls</span>
          <span class="sp-label" data-part="readout" style="font-size: 11px; white-space: nowrap">${START} filled, ${100 - START} empty</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: ${CARD_W}px; padding: 14px; display: grid; grid-template-columns: 80px ${LANE_W}px 42px; align-items: center; gap: 16px 10px">
            <span class="sp-label" style="white-space: nowrap">Slider</span>
            <div data-part="lane" style="position: relative; display: flex; align-items: center; height: 20px">
              <div
                class="sp-slider-track"
                data-part="track"
                data-subject
                data-band="${band(START)}"
                style="height: ${GROOVE_H}px; --sp-from: 0%; --sp-to: ${START}%"
              >
                <div class="sp-slider-fill"></div>
              </div>
              <button
                class="sp-slider-thumb"
                type="button"
                data-part="thumb"
                aria-label="Value"
                style="width: 18px; height: 18px; touch-action: none; --sp-at: ${START}%"
              ></button>
              <span data-part="aim-high" aria-hidden="true" style="position: absolute; top: 0; left: calc(88% - 2px); width: 4px; height: 20px"></span>
              <span data-part="aim-low" aria-hidden="true" style="position: absolute; top: 0; left: calc(16% - 2px); width: 4px; height: 20px"></span>
            </div>
            <span class="sp-label" data-part="value" style="font-size: 11px; text-align: right; font-variant-numeric: tabular-nums">${START}%</span>

            <span class="sp-label sp-context" style="white-space: nowrap">Scrollbar</span>
            <div class="sp-context">
              <div
                class="sp-scroll"
                data-part="pane"
                style="width: ${LANE_W}px; height: 38px; overflow-x: auto; overflow-y: hidden; scrollbar-width: none; padding: 6px;
                       border-radius: 6px; background: var(--sp-sunken)"
              >
                <div style="display: flex; gap: 8px; width: max-content">${Array.from({ length: 6 }, swatch).join('')}</div>
              </div>
              <div
                data-part="bar"
                data-at="start"
                style="position: relative; height: ${GROOVE_H}px; margin-top: 6px; border-radius: 999px; background: var(--sp-sunken)"
              >
                <span
                  data-part="bar-thumb"
                  style="position: absolute; top: 0; bottom: 0; left: 0; width: 60px; border-radius: 999px; background: var(--sp-accent)"
                ></span>
              </div>
            </div>
            <span class="sp-label sp-context" data-part="bar-value" style="font-size: 11px; text-align: right; font-variant-numeric: tabular-nums">0%</span>

            <span class="sp-label sp-context" style="white-space: nowrap">Progress bar</span>
            <div class="sp-progress sp-context" data-part="prog" style="width: ${LANE_W}px; height: ${GROOVE_H}px; --sp-value: 40%">
              <div class="sp-progress-fill" style="transition: none"></div>
            </div>
            <span class="sp-label sp-context" style="font-size: 11px; text-align: right; font-variant-numeric: tabular-nums">40%</span>
          </div>
        </div>

        <span class="sp-label sp-context" style="padding: 0 14px 9px; text-align: center; line-height: 1.4; font-size: 11px">
          The handle moves, the groove does not: filled from the start up to the handle, empty from there to the end.
        </span>
      </div>
    </div>
  `;

  const track = part(root, 'track');
  const thumb = part(root, 'thumb');
  const value = part(root, 'value');
  const readout = part(root, 'readout');
  const pane = part(root, 'pane');
  const bar = part(root, 'bar');
  const barThumb = part(root, 'bar-thumb');
  const barValue = part(root, 'bar-value');

  const setValue = (next: number) => {
    const at = Math.round(Math.min(100, Math.max(0, next)));
    track.style.setProperty('--sp-to', `${at}%`);
    track.dataset.band = band(at);
    thumb.style.setProperty('--sp-at', `${at}%`);
    value.textContent = `${at}%`;
    readout.textContent = `${at} filled, ${100 - at} empty`;
  };

  /** The groove's box, taken when the press lands: it is the one thing here that never changes. */
  let lane: DOMRect | undefined;
  thumb.addEventListener('pointerdown', (event) => {
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) thumb.setPointerCapture(event.pointerId);
    lane = track.getBoundingClientRect();
  });
  thumb.addEventListener('pointermove', (event) => {
    if (!lane) return;
    setValue(((event.clientX - lane.left) / lane.width) * 100);
  });
  // Ends on up and cancel, never on leave: boundary events do not fire while capture holds.
  const release = () => {
    lane = undefined;
  };
  thumb.addEventListener('pointerup', release);
  thumb.addEventListener('pointercancel', release);

  /** The scrollbar's thumb is sized by how much of the content fits, measured once on mount. */
  const troughW = bar.clientWidth;
  const visible = pane.clientWidth;
  const total = pane.scrollWidth;
  const span = Math.max(1, total - visible);
  const thumbW = Math.round((visible / total) * troughW);
  barThumb.style.width = `${thumbW}px`;

  pane.addEventListener('scroll', () => {
    const fraction = Math.min(1, Math.max(0, pane.scrollLeft / span));
    barThumb.style.left = `${((troughW - thumbW) * fraction).toFixed(1)}px`;
    bar.dataset.at = fraction < 0.02 ? 'start' : fraction > 0.96 ? 'end' : 'mid';
    barValue.textContent = `${Math.round(fraction * 100)}%`;
  });
}
