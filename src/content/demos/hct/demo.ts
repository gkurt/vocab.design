import { part } from '#src/kit/parts.ts';

/*
 * The measurement this specimen rests on, written out rather than quoted.
 *
 * HCT's third axis is CIE L*, and L* is a fixed function of relative luminance, so a colour
 * built to an exact tone has an exact contrast ratio no matter what its hue and chroma are.
 * That is the claim on screen, and it is computed here: the hue and chroma axes are OKLCH's
 * (CAM16 needs a viewing-conditions model that a specimen has no honest way to state), while
 * tone is solved for exactly, by bisection, against the CIE formula. Chroma is then reduced
 * until the colour fits sRGB, holding hue and tone, which is what HCT itself does.
 */
const DEG = Math.PI / 180;
const cube = (x: number) => x * x * x;
const encode = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const clamp01 = (c: number) => Math.min(1, Math.max(0, c));

type Linear = [number, number, number];

function linearFrom(L: number, C: number, hue: number): Linear {
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

/* Strictly inside, with no slack: a channel allowed past the edge would be clipped on the way
   to paint, and the clip moves the luminance, which is the one number this specimen promises
   depends on tone alone. */
const inGamut = ([r, g, b]: Linear) => [r, g, b].every((c) => c >= 0 && c <= 1);
const luminance = ([r, g, b]: Linear) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const lstar = (y: number) => (y > 0.008856 ? 116 * Math.cbrt(Math.max(y, 0)) - 16 : 903.3 * Math.max(y, 0));

/** The OKLCH lightness that lands on exactly this tone, for this hue and chroma. */
function solveL(C: number, hue: number, tone: number): number {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (lstar(luminance(linearFrom(mid, C, hue))) < tone) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** The most chroma sRGB will hold at this hue and tone, which is all HCT ever promises. */
function limitChroma(hue: number, tone: number, want: number): number {
  if (inGamut(linearFrom(solveL(want, hue, tone), want, hue))) return want;
  let lo = 0;
  let hi = want;
  for (let i = 0; i < 22; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut(linearFrom(solveL(mid, hue, tone), mid, hue))) lo = mid;
    else hi = mid;
  }
  return lo;
}

type Built = { css: string; chroma: number; tone: number; contrast: number };

/** One HCT request, resolved into a paintable colour and the numbers measured back off it. */
function build(hue: number, chroma: number, tone: number): Built {
  const held = limitChroma(hue, tone, chroma);
  const linear = linearFrom(solveL(held, hue, tone), held, hue).map(clamp01) as Linear;
  const y = luminance(linear);
  return {
    css: `color(srgb ${linear.map((c) => encode(c).toFixed(6)).join(' ')})`,
    chroma: held,
    tone: lstar(y),
    // Against white, which is the fixed background printed in the header.
    contrast: 1.05 / (y + 0.05),
  };
}

type Axis = {
  key: 'hue' | 'chroma' | 'tone';
  label: string;
  min: number;
  max: number;
  step: number;
  start: number;
  /** Drag targets, placed on step boundaries so a scripted drag lands on the value it aims at. */
  stops: number[];
  format: (v: number) => string;
};

const AXES: Axis[] = [
  { key: 'hue', label: 'Hue', min: 0, max: 360, step: 10, start: 300, stops: [30, 150, 300], format: (v) => `${v}°` },
  { key: 'chroma', label: 'Chroma', min: 0, max: 0.22, step: 0.01, start: 0.12, stops: [0.04, 0.12, 0.2], format: (v) => v.toFixed(2) },
  { key: 'tone', label: 'Tone', min: 0, max: 100, step: 5, start: 40, stops: [20, 40, 60, 90], format: (v) => String(v) },
];

/** Stop parts are named in whole units, so `chroma-20` is chroma 0.20 and stays a valid selector. */
const stopId = (axis: Axis, stop: number) => `${axis.key}-${Math.round(axis.key === 'chroma' ? stop * 100 : stop)}`;

/**
 * HCT specimen: the space's three axes as three tracks, one large swatch built to whatever they
 * ask for, and the contrast ratio against a fixed white background read out beside it.
 *
 * The demonstration is which of the three tracks moves that number. Hue can be walked all the
 * way round and chroma pushed to the edge of sRGB without the ratio changing a hundredth,
 * because tone is CIE lightness and lightness fixes the luminance. Move tone and the number
 * moves with it, predictably, which is the reason Material states its colour roles as tone
 * numbers instead of as colours.
 *
 * The subject is the swatch: the colour HCT describes, and the narrowest element the term
 * names. The three tracks, the background chip, the read-out and the caption are the
 * instrument around it, so they sit in the context register (SPEC §5). Every position of every
 * track produces an HCT colour, so the subject is the term in every resting state and identify
 * has nothing to refuse.
 *
 * All three tracks are fixed size and the swatch and read-out lines have reserved heights, so
 * nothing moves as the values change (SPEC §5). Every number is computed from the formulas
 * above, so the specimen renders identically on every run.
 */
export function mount(root: HTMLElement): void {
  const pct = (axis: Axis, v: number) => ((v - axis.min) / (axis.max - axis.min)) * 100;

  const axisRow = (axis: Axis) => `
    <div class="sp-row sp-context" style="gap: 8px; height: 22px">
      <span class="sp-label" style="flex: 0 0 52px">${axis.label}</span>
      <div class="sp-slider" data-part="${axis.key}-slider"
           style="flex: 1 1 auto; min-width: 0; --sp-to: ${pct(axis, axis.start)}%; --sp-at: ${pct(axis, axis.start)}%; touch-action: none">
        <div class="sp-slider-track" data-part="${axis.key}-track">
          <div class="sp-slider-fill"></div>
          ${axis.stops
            .map(
              (stop) => `<span data-part="${stopId(axis, stop)}" aria-hidden="true"
                               style="position: absolute; left: ${pct(axis, stop)}%; top: -5px; width: 3px; height: 14px;
                                      border-radius: 2px; background: rgb(127 137 156 / 0.5); translate: -50% 0;
                                      pointer-events: none"></span>`,
            )
            .join('')}
          <div class="sp-slider-thumb" data-part="${axis.key}-thumb" role="slider" tabindex="0" aria-label="${axis.label}"
               aria-valuemin="${axis.min}" aria-valuemax="${axis.max}" aria-valuenow="${axis.start}"></div>
        </div>
      </div>
      <span class="sp-text sp-text--ink" data-part="${axis.key}-value"
            style="flex: 0 0 54px; text-align: right; font-size: 11px; font-variant-numeric: tabular-nums">${axis.format(axis.start)}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context">
          <div class="sp-row" style="gap: 7px">
            <span class="sp-label">Against</span>
            <span class="sp-swatch" style="width: 20px; height: 15px; --sp-swatch: #FFFFFF;
                  box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.45)"></span>
            <span class="sp-text" style="font-size: 10px">white</span>
          </div>
          <div class="sp-row" style="gap: 7px">
            <span class="sp-label">Contrast</span>
            <span data-part="contrast"
                  style="font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -0.01em"></span>
          </div>
        </div>

        <div class="sp-swatch" data-part="swatch" data-subject
             style="height: 58px; margin-top: 11px; box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.35)"></div>

        <p class="sp-text sp-context" data-part="read"
           style="margin: 4px 0 0; height: 26px; font-size: 9.5px; line-height: 1.35; font-variant-numeric: tabular-nums"></p>

        <div class="sp-stack" style="gap: 8px; margin-top: 10px">
          ${AXES.map(axisRow).join('')}
        </div>

        <p class="sp-text sp-context" data-part="caption" style="margin: 9px 0 0; height: 28px; font-size: 10px; line-height: 1.4">
          Hue and chroma move the colour without moving the number. Tone is CIE lightness, so it fixes the luminance and the
          contrast follows from tone alone.
        </p>
      </div>
    </div>
  `;

  const swatch = part(root, 'swatch');
  const value: Record<Axis['key'], number> = { hue: 300, chroma: 0.12, tone: 40 };

  const render = () => {
    const built = build(value.hue, value.chroma, value.tone);
    swatch.style.setProperty('--sp-swatch', built.css);
    swatch.dataset.hue = String(value.hue);
    swatch.dataset.tone = String(value.tone);
    swatch.dataset.contrast = built.contrast.toFixed(2);
    part(root, 'contrast').textContent = `${built.contrast.toFixed(2)}:1`;

    const limited = built.chroma < value.chroma - 0.0005;
    part(root, 'read').textContent =
      `hct(${value.hue} ${built.chroma.toFixed(3)} ${value.tone}) · measured L* ${built.tone.toFixed(1)}` +
      (limited ? ` · chroma held at ${built.chroma.toFixed(3)} by sRGB` : '');

    for (const axis of AXES) {
      const at = `${pct(axis, value[axis.key])}%`;
      const slider = part(root, `${axis.key}-slider`);
      slider.style.setProperty('--sp-to', at);
      slider.style.setProperty('--sp-at', at);
      part(root, `${axis.key}-value`).textContent = axis.format(value[axis.key]);
      part(root, `${axis.key}-thumb`).setAttribute('aria-valuenow', String(value[axis.key]));
    }
  };
  render();

  for (const axis of AXES) {
    const slider = part(root, `${axis.key}-slider`);
    const track = part(root, `${axis.key}-track`);
    const thumb = part(root, `${axis.key}-thumb`);
    /** Distance between the pointer and the value it grabbed, so a drag never jumps on press. */
    let grabbed: number | undefined;

    const snap = (v: number) => {
      const stepped = Math.round(v / axis.step) * axis.step;
      return Math.min(axis.max, Math.max(axis.min, Math.round(stepped * 1000) / 1000));
    };

    const valueAt = (clientX: number) => {
      const rect = track.getBoundingClientRect();
      if (rect.width === 0) return value[axis.key];
      return snap(axis.min + ((clientX - rect.left) / rect.width) * (axis.max - axis.min));
    };

    const positionOf = (at: number) => {
      const rect = track.getBoundingClientRect();
      return rect.left + (pct(axis, at) / 100) * rect.width;
    };

    slider.addEventListener('pointerdown', (event) => {
      // Captured, or a reader dragging past the edge loses the stroke; a synthetic pointer has none to capture.
      if (event.isTrusted) slider.setPointerCapture(event.pointerId);
      if (event.target === thumb) {
        grabbed = event.clientX - positionOf(value[axis.key]);
        return;
      }
      grabbed = 0;
      value[axis.key] = valueAt(event.clientX);
      render();
    });

    root.addEventListener('pointermove', (event) => {
      if (grabbed === undefined) return;
      const next = valueAt(event.clientX - grabbed);
      if (next === value[axis.key]) return;
      value[axis.key] = next;
      render();
    });

    const release = () => {
      grabbed = undefined;
    };
    root.addEventListener('pointerup', release);
    root.addEventListener('pointercancel', release);

    thumb.addEventListener('keydown', (event) => {
      const nudge: Record<string, number> = {
        ArrowRight: axis.step,
        ArrowUp: axis.step,
        ArrowLeft: -axis.step,
        ArrowDown: -axis.step,
      };
      const delta = nudge[event.key];
      if (delta === undefined) return;
      event.preventDefault();
      const next = snap(value[axis.key] + delta);
      if (next === value[axis.key]) return;
      value[axis.key] = next;
      render();
    });
  }
}
