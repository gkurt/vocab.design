import { flag, part } from '#src/kit/parts.ts';

/*
 * One axis, checked against the file this page actually loads. Geist Variable
 * declares `font-weight: 100 900`, so `wght` is real here and every value the
 * slider reaches is a drawing in the font. The other four registered tags are
 * named in the record below as absent rather than simulated: a width axis faked
 * with a transform would be a screenshot of a stretch, which is the one thing an
 * axis is not.
 */
const TAG = 'wght';
const MIN = 100;
const DEFAULT = 400;
const MAX = 900;
/** Coarse enough that a drag lands on the value it aimed at, twice running. */
const STEP = 10;
/** How near a landmark counts as being on it, so a pixel of drag error cannot lie. */
const NEAR = 30;

const SAMPLE = 'Continuum';
/** Room for the heaviest setting, held at every lighter one, so nothing below moves (SPEC §5). */
const BOX = 54;

const percent = (value: number) => ((value - MIN) / (MAX - MIN)) * 100;

const snap = (value: number) => Math.min(MAX, Math.max(MIN, Math.round(value / STEP) * STEP));

const landmarkAt = (value: number) => {
  if (value <= MIN + NEAR) return 'min';
  if (value >= MAX - NEAR) return 'max';
  if (Math.abs(value - DEFAULT) <= NEAR) return 'default';
  return 'between';
};

/**
 * Variation axis specimen: one tag, one range, one word moving continuously along
 * it. The record under the sample is the axis as the font file states it, a tag
 * plus a minimum, a default and a maximum, and the tick on the track is where
 * that default sits. Dragging shows the part a list of styles cannot: the values
 * between the named ones are drawings too.
 *
 * The subject is the sample word. An axis is a range rather than an element, so
 * the narrowest honest ring is the one thing the range draws; the track, the
 * record chips and the readout report on it and stay in the context register
 * (SPEC §5). The word is on the axis at every value the slider can reach, so it
 * is never dishonest and needs no `data-pose`.
 */
export function mount(root: HTMLElement): void {
  const stops = [MIN, DEFAULT, MAX]
    .map(
      (value) =>
        `<span class="sp-text" data-part="stop-${value}" style="position: absolute; left: ${percent(value)}%; translate: -50% 0; font-size: 11px">${value}</span>`,
    )
    .join('');

  const chips = ['min', 'default', 'max']
    .map((name) => `<span class="sp-chip" data-part="chip-${name}" style="cursor: default"></span>`)
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">one axis of one file</span>
          <span class="sp-label" data-part="declaration"
                style="color: var(--sp-ink); font-variant-numeric: tabular-nums"></span>
        </div>
        <div class="sp-row" data-part="sample-box" style="height: ${BOX}px">
          <span data-part="sample" data-subject data-at="default"
                style="font-size: 40px; line-height: 1.2; white-space: nowrap; font-variation-settings: '${TAG}' ${DEFAULT}">${SAMPLE}</span>
        </div>
        <div class="sp-field sp-context" style="gap: 2px">
          <div class="sp-slider" data-part="slider" style="touch-action: none">
            <div class="sp-slider-track" data-part="track">
              <div class="sp-slider-fill"></div>
              <span data-part="tick" style="position: absolute; top: -3px; left: ${percent(DEFAULT)}%; width: 2px; height: 10px;
                    background: var(--sp-muted); translate: -50% 0"></span>
              <div class="sp-slider-thumb" data-part="thumb" role="slider" tabindex="0"
                   aria-label="${TAG} axis" aria-valuemin="${MIN}" aria-valuemax="${MAX}"></div>
            </div>
          </div>
          <div data-part="scale" aria-hidden="true" style="position: relative; height: 15px">${stops}</div>
        </div>
        <div class="sp-row sp-row--wrap sp-context" data-part="record" style="gap: 6px; margin-top: 8px">
          <span class="sp-chip" data-part="chip-tag" style="cursor: default">tag ${TAG}</span>
          ${chips}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">
          Registered tags are lowercase and custom ones uppercase. This file carries wght alone: wdth,
          slnt, ital and opsz are registered axes it does not ship.
        </p>
      </div>
    </div>
  `;

  const slider = part(root, 'slider');
  const track = part(root, 'track');
  const thumb = part(root, 'thumb');
  const sample = part(root, 'sample');
  const declaration = part(root, 'declaration');
  const marks = {
    min: part(root, 'chip-min'),
    default: part(root, 'chip-default'),
    max: part(root, 'chip-max'),
  };
  marks.min.textContent = `min ${MIN}`;
  marks.default.textContent = `default ${DEFAULT}`;
  marks.max.textContent = `max ${MAX}`;

  let value = DEFAULT;
  /** Distance between the pointer and the value it grabbed, so a drag never jumps on press. */
  let grabbed: number | undefined;

  const render = () => {
    const at = `${percent(value)}%`;
    slider.style.setProperty('--sp-to', at);
    slider.style.setProperty('--sp-at', at);
    thumb.setAttribute('aria-valuenow', String(value));
    sample.style.fontVariationSettings = `'${TAG}' ${value}`;
    sample.dataset.at = landmarkAt(value);
    declaration.textContent = `font-variation-settings: '${TAG}' ${value}`;
    for (const [name, chip] of Object.entries(marks)) flag(chip, 'data-selected', name === landmarkAt(value));
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

  thumb.addEventListener('keydown', (event) => {
    const deltas: Record<string, number> = { ArrowRight: STEP, ArrowUp: STEP, ArrowLeft: -STEP, ArrowDown: -STEP };
    const delta = deltas[event.key];
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
