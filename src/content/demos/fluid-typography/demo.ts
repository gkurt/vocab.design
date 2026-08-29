import { flag, part } from '#src/kit/parts.ts';

/* The clamp this specimen is: a floor, a preferred expression with a fixed term
   and a viewport term, and a ceiling. Stated as numbers so the demo can do the
   arithmetic a real viewport would do for it. */
const FLOOR = 20;
const CEIL = 44;
const FIXED = 6;
const PER_VW = 3.2;

const VW_MIN = 320;
const VW_MAX = 1280;
/** Coarse enough that a drag lands on the width it aimed at, twice running. */
const STEP = 20;
const STOPS = [320, 800, 1280];
const HEADING = 'Made to measure';
/** The room the ceiling case takes, held whatever the current size is. */
const BOX = 54;

const preferredAt = (vw: number) => FIXED + (PER_VW * vw) / 100;

const clamp = (value: number) => Math.min(CEIL, Math.max(FLOOR, value));

const boundAt = (preferred: number) => (preferred <= FLOOR ? 'min' : preferred >= CEIL ? 'max' : 'preferred');

const percent = (vw: number) => ((vw - VW_MIN) / (VW_MAX - VW_MIN)) * 100;

const snap = (vw: number) => Math.min(VW_MAX, Math.max(VW_MIN, Math.round(vw / STEP) * STEP));

/**
 * Fluid typography specimen: one heading sized by a clamp, with a simulated
 * viewport width under it. The demo does the arithmetic the browser would do,
 * because a specimen 460 pixels wide cannot be a 1280 pixel viewport, and applies
 * the result in px. Dragging the width across the range shows the three regimes
 * the function has: the floor holds, then the size tracks the width as a straight
 * line, then the ceiling holds. Nothing jumps anywhere, which is the whole point
 * against a breakpoint.
 *
 * The heading changes size, which is the term, so it is contained: it sits in a
 * box holding the room the ceiling case needs and is kept on one line, so the
 * readouts below it never move (SPEC §5).
 *
 * The subject is the heading. The slider is the demo's own instrumentation and
 * the bound readouts report on it, so both are scenery.
 */
export function mount(root: HTMLElement): void {
  const stops = STOPS.map(
    (vw) =>
      `<span class="sp-text" data-part="stop-${vw}" style="position: absolute; left: ${percent(vw)}%; translate: -50% 0; font-size: 11px">${vw}</span>`,
  ).join('');

  const bounds = ['min', 'preferred', 'max']
    .map((name) => `<span class="sp-chip" data-part="bound-${name}" style="cursor: default"></span>`)
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 462px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label" id="vd-fluid-label">Simulated viewport width</span>
          <span class="sp-text sp-text--ink" data-part="width"
                style="width: 74px; text-align: right; font-variant-numeric: tabular-nums"></span>
        </div>
        <div class="sp-field sp-context" style="margin-top: 8px; gap: 2px">
          <div class="sp-slider" data-part="slider" style="touch-action: none">
            <div class="sp-slider-track" data-part="track">
              <div class="sp-slider-fill"></div>
              <div class="sp-slider-thumb" data-part="thumb" role="slider" tabindex="0"
                   aria-labelledby="vd-fluid-label" aria-valuemin="${VW_MIN}" aria-valuemax="${VW_MAX}"></div>
            </div>
          </div>
          <div data-part="scale" aria-hidden="true" style="position: relative; height: 15px">${stops}</div>
        </div>
        <div class="sp-divider sp-context" style="margin: 10px 0 12px"></div>
        <div class="sp-row" data-part="heading-box" style="height: ${BOX}px">
          <span data-part="heading" data-subject
                style="font-weight: 600; line-height: 1.15; white-space: nowrap">${HEADING}</span>
        </div>
        <div class="sp-row sp-row--wrap sp-context" data-part="bounds" style="gap: 6px; margin-top: 4px">${bounds}</div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">
          font-size: clamp(${FLOOR}px, ${FIXED}px + ${PER_VW}vw, ${CEIL}px). The lit term is the one in force:
          the floor and the ceiling hold flat, and between them the size is a straight line.
        </p>
      </div>
    </div>
  `;

  const slider = part(root, 'slider');
  const track = part(root, 'track');
  const thumb = part(root, 'thumb');
  const heading = part(root, 'heading');
  const width = part(root, 'width');
  const chips = { min: part(root, 'bound-min'), preferred: part(root, 'bound-preferred'), max: part(root, 'bound-max') };

  let vw = 760;
  /** Distance between the pointer and the width it grabbed, so a drag never jumps on press. */
  let grabbed: number | undefined;

  const render = () => {
    const preferred = preferredAt(vw);
    const size = clamp(preferred);
    const bound = boundAt(preferred);
    const at = `${percent(vw)}%`;
    slider.style.setProperty('--sp-to', at);
    slider.style.setProperty('--sp-at', at);
    thumb.setAttribute('aria-valuenow', String(vw));
    thumb.setAttribute('aria-valuetext', `${vw}px viewport`);
    width.textContent = `${vw}px`;
    heading.style.fontSize = `${size.toFixed(2)}px`;
    heading.dataset.bound = bound;
    heading.dataset.size = size.toFixed(1);
    chips.min.textContent = `min ${FLOOR}px`;
    chips.preferred.textContent = `${FIXED}px + ${PER_VW}vw = ${preferred.toFixed(1)}px`;
    chips.max.textContent = `max ${CEIL}px`;
    for (const [name, chip] of Object.entries(chips)) flag(chip, 'data-selected', name === bound);
  };

  const widthAt = (clientX: number) => {
    const rect = track.getBoundingClientRect();
    if (rect.width === 0) return vw;
    return snap(VW_MIN + ((clientX - rect.left) / rect.width) * (VW_MAX - VW_MIN));
  };

  const positionOf = (at: number) => {
    const rect = track.getBoundingClientRect();
    return rect.left + (percent(at) / 100) * rect.width;
  };

  render();

  slider.addEventListener('pointerdown', (event) => {
    // Capture keeps the drag alive past the slider's edge. A synthetic pointer has none to
    // capture and the call would throw, so only a real one asks.
    if (event.isTrusted) slider.setPointerCapture(event.pointerId);
    if (event.target === thumb) {
      grabbed = event.clientX - positionOf(vw);
      return;
    }
    grabbed = 0;
    vw = widthAt(event.clientX);
    render();
  });

  root.addEventListener('pointermove', (event) => {
    if (grabbed === undefined) return;
    const next = widthAt(event.clientX - grabbed);
    if (next === vw) return;
    vw = next;
    render();
  });

  root.addEventListener('pointerup', () => {
    grabbed = undefined;
  });
  root.addEventListener('pointercancel', () => {
    grabbed = undefined;
  });

  thumb.addEventListener('keydown', (event) => {
    const deltas: Record<string, number> = { ArrowRight: STEP, ArrowUp: STEP, ArrowLeft: -STEP, ArrowDown: -STEP };
    const delta = deltas[event.key];
    let next = vw;
    if (delta !== undefined) next = snap(vw + delta);
    else if (event.key === 'Home') next = VW_MIN;
    else if (event.key === 'End') next = VW_MAX;
    else return;
    event.preventDefault();
    if (next === vw) return;
    vw = next;
    render();
  });
}
