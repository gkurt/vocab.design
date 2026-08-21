import { part } from '#src/kit/parts.ts';

const MIN = 0;
const MAX = 1000;
const STEP = 50;
const STOPS = [0, 200, 400, 600, 800, 1000];

type Handle = 'min' | 'max';

const money = (value: number) => `$${value}`;

const percent = (value: number) => ((value - MIN) / (MAX - MIN)) * 100;

const snap = (value: number) => Math.min(MAX, Math.max(MIN, Math.round(value / STEP) * STEP));

/**
 * Range slider specimen: one track carrying a lower and an upper handle, so the
 * selection is the filled interval between them. The subject is the track with
 * both handles, since neither handle is the term and the readout beside it is the
 * field the control sits in.
 *
 * Both handles resolve to absolute values through one `set()` (SPEC §8), and each
 * is walled off by the other: the lower can rise no further than the upper, which
 * is stated in `aria-valuemax` as well as enforced. The readout is fixed width in
 * tabular figures, so a bound going from three digits to four widens nothing
 * (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const stops = STOPS.map(
    (stop) =>
      `<span class="sp-text" data-part="stop-${stop}" style="position: absolute; left: ${percent(stop)}%; translate: -50% 0; font-size: 11px">${money(stop)}</span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 340px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Stays in Lisbon</span>
          <span class="sp-text" data-part="results" style="width: 84px; text-align: right">51 places</span>
        </div>
        <div class="sp-field" style="margin-top: 18px; gap: 8px">
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-label">Price per night</span>
            <span
              class="sp-text sp-text--ink"
              data-part="readout"
              style="width: 116px; text-align: right; font-variant-numeric: tabular-nums"
            >$200 to $800</span>
          </div>
          <div class="sp-slider" data-part="range" data-subject data-lower="200" data-upper="800" style="--sp-from: 20%; --sp-to: 80%; touch-action: none">
            <div class="sp-slider-track" data-part="track">
              <div class="sp-slider-fill"></div>
              <button
                class="sp-slider-thumb"
                type="button"
                data-part="thumb-min"
                role="slider"
                aria-label="Minimum price"
                aria-valuemin="${MIN}"
                aria-valuemax="800"
                aria-valuenow="200"
                aria-valuetext="$200"
                style="--sp-at: 20%"
              ></button>
              <button
                class="sp-slider-thumb"
                type="button"
                data-part="thumb-max"
                role="slider"
                aria-label="Maximum price"
                aria-valuemin="200"
                aria-valuemax="${MAX}"
                aria-valuenow="800"
                aria-valuetext="$800"
                style="--sp-at: 80%"
              ></button>
            </div>
          </div>
          <div class="sp-context" data-part="scale" aria-hidden="true" style="position: relative; height: 15px">${stops}</div>
        </div>
        <div class="sp-row sp-context" style="margin-top: 16px">
          <button class="sp-chip" type="button" data-selected>Free cancellation</button>
          <button class="sp-chip" type="button">Kitchen</button>
        </div>
      </div>
    </div>
  `;

  const slider = part(root, 'range');
  const track = part(root, 'track');
  const thumbs: Record<Handle, HTMLElement> = { min: part(root, 'thumb-min'), max: part(root, 'thumb-max') };
  const readout = part(root, 'readout');
  const results = part(root, 'results');

  let lower = 200;
  let upper = 800;
  let active: Handle | undefined;
  /** Distance between the pointer and the value it grabbed, so a drag never jumps on press. */
  let grabbed = 0;

  const render = () => {
    slider.style.setProperty('--sp-from', `${percent(lower)}%`);
    slider.style.setProperty('--sp-to', `${percent(upper)}%`);
    slider.dataset.lower = String(lower);
    slider.dataset.upper = String(upper);
    thumbs.min.style.setProperty('--sp-at', `${percent(lower)}%`);
    thumbs.max.style.setProperty('--sp-at', `${percent(upper)}%`);
    thumbs.min.setAttribute('aria-valuenow', String(lower));
    thumbs.min.setAttribute('aria-valuetext', money(lower));
    // The wall between the handles is announced, not merely enforced.
    thumbs.min.setAttribute('aria-valuemax', String(upper));
    thumbs.max.setAttribute('aria-valuenow', String(upper));
    thumbs.max.setAttribute('aria-valuetext', money(upper));
    thumbs.max.setAttribute('aria-valuemin', String(lower));
    readout.textContent = `${money(lower)} to ${money(upper)}`;
    // Scenery that reacts, so the interval reads as doing something to the world.
    results.textContent = `${8 + Math.round((upper - lower) / 14)} places`;
  };

  const set = (handle: Handle, value: number) => {
    if (handle === 'min') lower = Math.min(Math.max(value, MIN), upper);
    else upper = Math.max(Math.min(value, MAX), lower);
    render();
  };

  const valueAt = (clientX: number) => {
    const rect = track.getBoundingClientRect();
    if (rect.width === 0) return lower;
    return snap(MIN + ((clientX - rect.left) / rect.width) * (MAX - MIN));
  };

  const positionOf = (value: number) => {
    const rect = track.getBoundingClientRect();
    return rect.left + (percent(value) / 100) * rect.width;
  };

  render();

  slider.addEventListener('pointerdown', (event) => {
    // Captured, or a reader dragging past the edge loses the stroke; a synthetic pointer has none to capture.
    if (event.isTrusted) slider.setPointerCapture(event.pointerId);
    const target = event.target;
    if (target === thumbs.min || target === thumbs.max) {
      active = target === thumbs.min ? 'min' : 'max';
      grabbed = event.clientX - positionOf(active === 'min' ? lower : upper);
      return;
    }
    // A press on the bare track moves the nearer handle to the value pressed:
    // with two handles, "whichever was touched last" would be a coin toss.
    const value = valueAt(event.clientX);
    active = Math.abs(value - lower) <= Math.abs(value - upper) ? 'min' : 'max';
    grabbed = 0;
    set(active, value);
  });

  root.addEventListener('pointermove', (event) => {
    if (!active) return;
    set(active, valueAt(event.clientX - grabbed));
  });

  const drop = () => {
    active = undefined;
  };
  root.addEventListener('pointerup', drop);
  root.addEventListener('pointercancel', drop);

  // Stacked handles have to be separable, and a track this coarse cannot be hit
  // exactly by hand: each handle takes the keyboard on its own.
  for (const handle of ['min', 'max'] as const) {
    thumbs[handle].addEventListener('keydown', (event) => {
      const deltas: Record<string, number> = {
        ArrowRight: STEP,
        ArrowUp: STEP,
        ArrowLeft: -STEP,
        ArrowDown: -STEP,
        PageUp: STEP * 4,
        PageDown: -STEP * 4,
      };
      const current = handle === 'min' ? lower : upper;
      const delta = deltas[event.key];
      let next = current;
      if (delta !== undefined) next = snap(current + delta);
      else if (event.key === 'Home') next = MIN;
      else if (event.key === 'End') next = MAX;
      else return;
      event.preventDefault();
      set(handle, next);
    });
  }
}
