import { part } from '#src/kit/parts.ts';

/*
 * OKLab <-> linear sRGB, written out rather than approximated, because the whole
 * demonstration is the difference between two real answers. The matrices are the ones in
 * CSS Color 4; nothing here is fitted to make the specimen look better.
 */
const DEG = Math.PI / 180;
const cube = (x: number) => x * x * x;
const encode = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const clamp01 = (c: number) => Math.min(1, Math.max(0, c));

function linearFrom(L: number, C: number, hue: number): [number, number, number] {
  const a = C * Math.cos(hue * DEG);
  const b = C * Math.sin(hue * DEG);
  const l = cube(L + 0.3963377774 * a + 0.2158037573 * b);
  const m = cube(L - 0.1055613458 * a - 0.0638541728 * b);
  const s = cube(L - 0.0894841775 * a - 1.291485548 * b);
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

function hueOf(r: number, g: number, b: number): number {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return (Math.atan2(bb, a) / DEG + 360) % 360;
}

const inGamut = ([r, g, b]: [number, number, number]) => [r, g, b].every((c) => c >= -0.0005 && c <= 1.0005);

/** The binary search CSS Color 4 describes: walk chroma down until the colour fits. */
function limitChroma(L: number, hue: number): number {
  let lo = 0;
  let hi = MAX;
  if (inGamut(linearFrom(L, hi, hue))) return hi;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut(linearFrom(L, mid, hue))) lo = mid;
    else hi = mid;
  }
  return Math.round(lo * 1000) / 1000;
}

/** One amber, chosen because clipping it swings the hue far enough to read at a glance. */
const L = 0.65;
const HUE = 80;
const MAX = 0.34;
const STEP = 0.005;
const START = 0.3;
const LIMIT = limitChroma(L, HUE);
const STOPS = [0, 0.085, 0.17, 0.255, 0.34];

const pct = (c: number) => (c / MAX) * 100;
const snap = (c: number) => Math.min(MAX, Math.max(0, Math.round(c / STEP) * STEP));
const num = (c: number) => c.toFixed(3);

/** Each channel pinned into range on its own: the hue rides along with whichever one moved. */
const clipped = (C: number) => {
  const [r, g, b] = linearFrom(L, C, HUE);
  return [clamp01(r), clamp01(g), clamp01(b)] as [number, number, number];
};
const clippedCss = (C: number) =>
  `color(srgb ${clipped(C)
    .map(encode)
    .map((c) => c.toFixed(4))
    .join(' ')})`;
const clippedHue = (C: number) => Math.round(hueOf(...clipped(C)));
const mappedChroma = (C: number) => Math.min(C, LIMIT);
const mappedCss = (C: number) => `oklch(${L} ${num(mappedChroma(C))} ${HUE})`;

/**
 * Gamut mapping specimen: one OKLCH amber with its chroma on a slider, pushed past the
 * sRGB boundary marked on the track, and the two answers a browser could give drawn side
 * by side. The left block clamps each channel; the right walks chroma down until the
 * colour fits and leaves hue and lightness alone.
 *
 * Both blocks are computed here from the CSS Color 4 matrices rather than eyeballed, and
 * the boundary marker sits at the chroma the binary search actually finds, so the specimen
 * is measuring itself rather than illustrating a claim.
 *
 * The subject is the mapped block. Below the boundary there is nothing to map and the two
 * blocks agree, which is a state the subject passes through without being the term, so the
 * honest condition is declared in `data-pose` and the mount state satisfies it (SPEC §6).
 * The clipped block is the counter-example and the slider, readouts and caption are
 * instrumentation, so all of them sit in the context register (SPEC §5).
 *
 * Every box is fixed size and only paint, text and the thumb's position change, so nothing
 * moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const scale = STOPS.map(
    (stop) =>
      `<span class="sp-text" data-part="stop-${Math.round(stop * 1000)}" style="position: absolute; left: ${pct(stop)}%;
             translate: -50% 0; font-size: 10px">${stop === 0 ? '0' : stop.toFixed(3).replace(/0$/, '')}</span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 444px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Requested</span>
          <span class="sp-text sp-text--ink" data-part="request"
                style="font-size: 11.5px; font-variant-numeric: tabular-nums">oklch(${L} ${num(START)} ${HUE})</span>
        </div>

        <div class="sp-field sp-context" style="margin-top: 11px; gap: 6px">
          <div class="sp-row sp-row--between">
            <span class="sp-label">Chroma</span>
            <span class="sp-text sp-text--ink" data-part="chroma"
                  style="width: 60px; text-align: right; font-size: 11.5px; font-variant-numeric: tabular-nums">${num(START)}</span>
          </div>
          <div class="sp-slider" data-part="slider" style="--sp-to: ${pct(START)}%; --sp-at: ${pct(START)}%; touch-action: none">
            <div class="sp-slider-track" data-part="track">
              <div class="sp-slider-fill"></div>
              <span data-part="boundary" style="position: absolute; left: ${pct(LIMIT)}%; top: -8px; width: 3px; height: 20px;
                    border-radius: 2px; background: var(--sp-ink); translate: -50% 0"></span>
              <div class="sp-slider-thumb" data-part="thumb" role="slider" tabindex="0" aria-label="Chroma"
                   aria-valuemin="0" aria-valuemax="${MAX}" aria-valuenow="${START}" aria-valuetext="${num(START)}"></div>
            </div>
          </div>
          <div data-part="scale" aria-hidden="true" style="position: relative; height: 14px">${scale}</div>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 11px; align-items: flex-start">
          <div class="sp-stack sp-context" style="flex: 1 1 0; min-width: 0; gap: 5px">
            <div class="sp-swatch" data-part="clipped" style="height: 58px;
                 box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35); --sp-swatch: ${clippedCss(START)}"></div>
            <span class="sp-label">Channels clamped</span>
            <span class="sp-text" data-part="clip-read" style="font-size: 10.5px">hue ${HUE} lands at ${clippedHue(START)}</span>
          </div>

          <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 5px">
            <div class="sp-swatch" data-part="mapped" data-subject data-pose="[data-fit=outside]" data-fit="outside"
                 style="height: 58px; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35); --sp-swatch: ${mappedCss(START)}"></div>
            <span class="sp-label sp-context">Chroma reduced</span>
            <span class="sp-text sp-context" data-part="map-read"
                  style="font-size: 10.5px">hue ${HUE} held at chroma ${num(mappedChroma(START))}</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" style="margin: 9px 0 0; height: 28px; font-size: 10.5px; line-height: 1.35">
          The mark on the track is where sRGB runs out. Past it, clamping keeps the chroma and loses the hue; mapping keeps
          the hue and gives up chroma.
        </p>
      </div>
    </div>
  `;

  const slider = part(root, 'slider');
  const track = part(root, 'track');
  const thumb = part(root, 'thumb');
  const clip = part(root, 'clipped');
  const mapped = part(root, 'mapped');

  let value = START;
  /** Distance between the pointer and the value it grabbed, so a drag never jumps on press. */
  let grabbed: number | undefined;

  const render = () => {
    const at = `${pct(value)}%`;
    slider.style.setProperty('--sp-to', at);
    slider.style.setProperty('--sp-at', at);
    thumb.setAttribute('aria-valuenow', num(value));
    thumb.setAttribute('aria-valuetext', num(value));
    part(root, 'request').textContent = `oklch(${L} ${num(value)} ${HUE})`;
    part(root, 'chroma').textContent = num(value);
    clip.style.setProperty('--sp-swatch', clippedCss(value));
    mapped.style.setProperty('--sp-swatch', mappedCss(value));
    mapped.dataset.fit = value > LIMIT ? 'outside' : 'inside';
    part(root, 'clip-read').textContent = `hue ${HUE} lands at ${clippedHue(value)}`;
    part(root, 'map-read').textContent = value > LIMIT ? `hue ${HUE} held at chroma ${num(LIMIT)}` : `inside sRGB already, nothing to map`;
  };

  const valueAt = (clientX: number) => {
    const rect = track.getBoundingClientRect();
    if (rect.width === 0) return value;
    return snap(((clientX - rect.left) / rect.width) * MAX);
  };

  const positionOf = (at: number) => {
    const rect = track.getBoundingClientRect();
    return rect.left + (pct(at) / 100) * rect.width;
  };

  render();

  slider.addEventListener('pointerdown', (event) => {
    // Captured, or a reader dragging past the edge loses the stroke; a synthetic pointer has none to capture.
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
    const nudge: Record<string, number> = { ArrowRight: STEP, ArrowUp: STEP, ArrowLeft: -STEP, ArrowDown: -STEP };
    const delta = nudge[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    const next = snap(value + delta);
    if (next === value) return;
    value = next;
    render();
  });
}
