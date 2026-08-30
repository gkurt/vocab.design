import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

const TRACK = { w: 388, h: 44 };
/** The track plus the strip of unpainted anchors under it, which is the box a press lands in. */
const AXIS_H = 60;
const HALF = TRACK.w / 2;
/** How much of each side of the axis is thrown away, as a fraction of full deflection. */
const BAND = 0.18;
const BAND_PX = Math.round(BAND * HALF);

/**
 * A fixed anchor the script grabs, parked under the track so the thumb never covers it. It carries
 * no paint at all: a drawn stop point would annotate the choreography rather than the term, and the
 * ghost cursor is the only pointer artifact the stage draws (SPEC §5).
 */
const dot = (name: string, x: number) => `
  <span
    data-part="${name}"
    style="position: absolute; left: ${x - 7}px; top: ${TRACK.h + 1}px; width: 14px; height: 14px; pointer-events: none"
  ></span>`;

/**
 * Dead zone specimen: one stick axis with its neutral band drawn across the middle of the
 * track, the raw reading on one side and the value the axis actually emits on the other.
 * Inside the band the emitted value is zero however far the thumb moves; past its edge the
 * remaining travel is rescaled onto the whole output, which is what stops the axis lurching.
 *
 * The subject is the band. The term names the region that is ignored, not the track it is cut
 * out of and not the thumb that crosses it, and the band is a real 72 by 44 box that can carry
 * the ring honestly. The track, the thumb, the readouts and the output meter are the scene around
 * it and carry the context register.
 *
 * The wiring is a plain track drag: a press anywhere on the axis takes the value under the
 * pointer and a move updates it, so the same code answers the script and a reader who drags
 * the thumb themselves. Every state is reached by a drag, since a dead zone is a fact about
 * where the input is and about nothing else.
 *
 * The thumb moves by `left` inside a fixed track and the readouts hold their widths, so
 * crossing the band moves nothing but the thumb and the meter (SPEC §5).
 *
 * A status line in the title bar used to narrate the drag ("Stick centred, nothing emitted",
 * then "Stick at +12%, inside the band: nothing emitted"), which is the article's sentence
 * standing over an instrument that already prints both numbers, so it is gone. The label
 * under the track measured the band in page pixels ("70 px ignored: 18% either side of
 * centre") and now reads what a controller's own settings would say: "dead zone 18%".
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Controller</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="display: flex; flex-direction: column; gap: 8px; padding: 12px 16px">
            <span class="sp-label sp-context">Left stick, horizontal axis</span>

            <div
              data-part="axis"
              data-out="ignored"
              style="position: relative; width: ${TRACK.w}px; height: ${AXIS_H}px; touch-action: none; user-select: none; cursor: ew-resize"
            >
              <span class="sp-context" style="position: absolute; left: 0; right: 0; top: 0; height: ${TRACK.h}px; border-radius: 6px; background: var(--sp-sunken)"></span>

              <span
                data-part="band"
                data-subject
                style="position: absolute; left: ${HALF - BAND_PX}px; top: 0; width: ${BAND_PX * 2}px; height: ${TRACK.h}px; border-left: 2px dashed var(--sp-accent); border-right: 2px dashed var(--sp-accent); border-radius: 3px; background: var(--sp-accent-soft)"
              ></span>

              <span
                class="sp-context"
                data-part="thumb"
                style="position: absolute; left: ${HALF}px; top: 6px; width: 14px; height: ${TRACK.h - 12}px; margin-left: -7px; border-radius: 4px; background: var(--sp-ink)"
              ></span>

              <span style="position: absolute; inset: 0; pointer-events: none">
                ${dot('mark-centre', HALF)}
                ${dot('mark-inside', HALF + Math.round(0.12 * HALF))}
                ${dot('mark-outside', HALF + Math.round(0.62 * HALF))}
              </span>
            </div>

            <div class="sp-row sp-context" style="justify-content: space-between">
              <span class="sp-label">full left</span>
              <span class="sp-label">dead zone ${Math.round(BAND * 100)}%</span>
              <span class="sp-label">full right</span>
            </div>

            <div class="sp-divider sp-context"></div>

            <div class="sp-row sp-context" style="gap: 16px; align-items: flex-end">
              <div class="sp-stack" style="gap: 2px; width: 104px">
                <span class="sp-label">Stick reads</span>
                <span class="sp-heading" data-part="raw" style="font-variant-numeric: tabular-nums">0%</span>
              </div>
              <div class="sp-stack" style="gap: 2px; width: 104px">
                <span class="sp-label">Axis emits</span>
                <span class="sp-heading" data-part="emitted" style="font-variant-numeric: tabular-nums">0%</span>
              </div>
              <div class="sp-stack sp-grow" style="gap: 4px">
                <span class="sp-label">Output</span>
                <span style="position: relative; display: block; height: 8px; border-radius: 999px; background: var(--sp-sunken)">
                  <span data-part="out-fill" style="position: absolute; top: 0; bottom: 0; left: 50%; width: 0; border-radius: 999px; background: var(--sp-accent)"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const axis = part(root, 'axis');
  const thumb = part(root, 'thumb');
  const rawOut = part(root, 'raw');
  const emittedOut = part(root, 'emitted');
  const fill = part(root, 'out-fill');

  let holding = false;

  const pct = (value: number) => `${value > 0 ? '+' : ''}${Math.round(value * 100)}%`;

  const set = (clientX: number) => {
    const x = Math.max(0, Math.min(TRACK.w, localPoint({ clientX, clientY: 0 }, axis).x));
    const raw = (x - HALF) / HALF;
    // Rescaled, not clipped: the first sample past the band emits nearly nothing, and full
    // deflection still emits everything. Clipping would make the axis lurch at the edge.
    const size = Math.abs(raw) <= BAND ? 0 : (Math.abs(raw) - BAND) / (1 - BAND);
    const emitted = size * Math.sign(raw);

    thumb.style.left = `${x}px`;
    rawOut.textContent = pct(raw);
    emittedOut.textContent = pct(emitted);
    fill.style.left = emitted >= 0 ? '50%' : `${50 - size * 50}%`;
    fill.style.width = `${size * 50}%`;

    axis.dataset.out = emitted === 0 ? 'ignored' : 'live';
  };

  axis.addEventListener('pointerdown', (event) => {
    // A real drag has to survive leaving the axis; a synthetic pointer cannot be captured.
    if (event.isTrusted) axis.setPointerCapture(event.pointerId);
    holding = true;
    set(event.clientX);
  });

  root.addEventListener('pointermove', (event) => {
    if (holding) set(event.clientX);
  });

  const release = () => {
    holding = false;
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);
}
