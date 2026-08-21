import { part } from '#src/kit/parts.ts';

const MIN = 0;
const MAX = 1000;
const STEP = 50;
const STOPS = [0, 250, 500, 750, 1000];

const money = (value: number) => `$${value}`;

const percent = (value: number) => ((value - MIN) / (MAX - MIN)) * 100;

const snap = (value: number) => Math.min(MAX, Math.max(MIN, Math.round(value / STEP) * STEP));

/**
 * Slider specimen: a price ceiling set by dragging a handle along the whole
 * range. The subject is the track and its thumb, since that pair is what the
 * word names: the label, the readout, and the scale beneath are the field the
 * control sits in, not the control.
 *
 * The readout holds a fixed width in tabular figures, so a value going from
 * three digits to four widens nothing (SPEC §5), and the scale is drawn out of
 * flow at fixed percentages, so its stops line up with the track they measure.
 */
export function mount(root: HTMLElement): void {
  const stops = STOPS.map(
    (stop) =>
      `<span class="sp-text" data-part="stop-${stop}" style="position: absolute; left: ${percent(stop)}%; translate: -50% 0; font-size: 11px">${money(stop)}</span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Filters</span>
          <span class="sp-text" data-part="results" style="width: 92px; text-align: right">58 results</span>
        </div>
        <div class="sp-field" style="margin-top: 18px; gap: 8px">
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-label" id="vd-price-label">Max price</span>
            <span class="sp-text sp-text--ink" data-part="readout" style="width: 60px; text-align: right; font-variant-numeric: tabular-nums">$400</span>
          </div>
          <div class="sp-slider" data-part="slider" data-subject style="--sp-to: 40%; --sp-at: 40%; touch-action: none">
            <div class="sp-slider-track" data-part="track">
              <div class="sp-slider-fill"></div>
              <div
                class="sp-slider-thumb"
                data-part="thumb"
                role="slider"
                tabindex="0"
                aria-labelledby="vd-price-label"
                aria-valuemin="${MIN}"
                aria-valuemax="${MAX}"
                aria-valuenow="400"
                aria-valuetext="$400"
              ></div>
            </div>
          </div>
          <div class="sp-context" data-part="scale" aria-hidden="true" style="position: relative; height: 15px">${stops}</div>
        </div>
        <div class="sp-row sp-context" style="margin-top: 16px">
          <button class="sp-chip" type="button" data-selected>In stock</button>
          <button class="sp-chip" type="button">Free shipping</button>
        </div>
      </div>
    </div>
  `;

  const slider = part(root, 'slider');
  const track = part(root, 'track');
  const thumb = part(root, 'thumb');
  const readout = part(root, 'readout');
  const results = part(root, 'results');

  let value = 400;
  /** Distance between the pointer and the value it grabbed, so a drag never jumps on press. */
  let grabbed: number | undefined;

  const render = () => {
    const at = `${percent(value)}%`;
    slider.style.setProperty('--sp-to', at);
    slider.style.setProperty('--sp-at', at);
    thumb.setAttribute('aria-valuenow', String(value));
    thumb.setAttribute('aria-valuetext', money(value));
    readout.textContent = money(value);
    // Scenery that reacts, so the range reads as doing something to the world.
    results.textContent = `${8 + Math.round(value / 8)} results`;
  };

  const valueAt = (clientX: number) => {
    const rect = track.getBoundingClientRect();
    if (rect.width === 0) return value;
    return snap(MIN + ((clientX - rect.left) / rect.width) * (MAX - MIN));
  };

  const positionOf = (at: number) => {
    const rect = track.getBoundingClientRect();
    return rect.left + (percent(at) / 100) * rect.width;
  };

  render();

  slider.addEventListener('pointerdown', (event) => {
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) slider.setPointerCapture(event.pointerId);
    if (event.target === thumb) {
      grabbed = event.clientX - positionOf(value);
      return;
    }
    // A press on the bare track is an absolute move: the range is the control,
    // so the place pressed is the value meant.
    grabbed = 0;
    value = valueAt(event.clientX);
    render();
  });

  root.addEventListener('pointermove', (event) => {
    if (grabbed === undefined) return;
    const next = valueAt(event.clientX - grabbed);
    if (next === value) return;
    value = next;
    render();
  });

  root.addEventListener('pointerup', () => {
    grabbed = undefined;
  });
  root.addEventListener('pointercancel', () => {
    grabbed = undefined;
  });

  // Keyboard is not a courtesy here: one step per arrow is the only way to hit an
  // exact value on a track this coarse.
  thumb.addEventListener('keydown', (event) => {
    const steps: Record<string, number> = {
      ArrowRight: STEP,
      ArrowUp: STEP,
      ArrowLeft: -STEP,
      ArrowDown: -STEP,
      PageUp: STEP * 4,
      PageDown: -STEP * 4,
    };
    const delta = steps[event.key];
    let next = value;
    if (delta !== undefined) next = snap(value + delta);
    else if (event.key === 'Home') next = MIN;
    else if (event.key === 'End') next = MAX;
    else return;
    event.preventDefault();
    if (next === value) return;
    value = next;
    render();
  });
}
