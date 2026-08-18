import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const PAPER = { w: 300, h: 132 };
/** The stroke's own box: the ink is drawn to fill it, so the box is a tight claim. */
const INK = { w: 268, h: 52 };
const SAMPLES = 40;

/** Half-widths and opacities the three settings hand the same renderer a pen would drive. */
const LEVELS = [
  { key: 'light', name: 'Light', pressure: 0.21, half: 3.2, alpha: 0.5, note: 'a thin line the whole way across' },
  { key: 'medium', name: 'Medium', pressure: 0.55, half: 7.4, alpha: 0.76, note: 'the stroke swells and tapers' },
  { key: 'firm', name: 'Firm', pressure: 0.93, half: 12, alpha: 1, note: 'wide and opaque through the middle' },
];

/**
 * One stroke, drawn as a filled ribbon whose half-width follows the pressure profile along the
 * arc: thin where the pen lands, swollen through the middle of the gesture, tapered as it
 * lifts. Sampled from a fixed table of steps, so the same setting always draws the same shape.
 */
const ribbon = (half: number) => {
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES;
    const x = 10 + 248 * t;
    const y = 38 - 22 * Math.sin(Math.PI * t);
    const w = half * (0.14 + 0.86 * Math.sin(Math.PI * t) ** 0.9);
    top.push(`${x.toFixed(1)},${(y - w).toFixed(1)}`);
    bottom.push(`${x.toFixed(1)},${(y + w).toFixed(1)}`);
  }
  return `M ${top.join(' L ')} L ${bottom.reverse().join(' L ')} Z`;
};

/**
 * Pressure sensitivity specimen: one stroke whose weight and opacity are a reading of how hard
 * the contact is pressing, with the reported value printed beside it on its own axis.
 *
 * **This is a labelled simulation, and it says so on its face.** Attract mode drives a mouse
 * pointer, and a mouse has no pressure axis at all: it reports a constant while it is down and
 * nothing while it is up. The three settings therefore hand the renderer the value a pen would
 * have reported, through the same function a real `pointermove` calls. The pen wiring below is
 * live, so a stylus drawing on the paper drives the stroke directly and the settings step aside.
 *
 * The subject is the stroke. The term names the ink whose shape carries the reading, not the
 * paper it sits on and not the control that stands in for the pen, so the ink gets its own box
 * and the pin goes there. Every setting is the term (a light stroke is as pressure-driven as a
 * firm one), so there is no dishonest state to declare in `data-pose`. The paper, the setting,
 * the readout and the meter are the scene around it in the context register.
 *
 * The ink box, the paper and the readouts all hold fixed sizes, and only the path data changes,
 * so moving between settings moves nothing (SPEC §5). Nothing animates in script: the stroke is
 * redrawn, not tweened, and the meter's slide is the kit's own transition.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 292px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Sketch</span>
          <span class="sp-text" data-part="readout" style="width: 336px; text-align: right; white-space: nowrap">Medium pressure: the stroke swells and tapers</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div class="sp-row sp-context" style="gap: 10px">
            <span class="sp-label" style="white-space: nowrap">Pen pressure</span>
            <sp-segmented class="sp-segmented" data-part="level" data-value="medium">
              <button class="sp-segment" type="button" data-part="level-light" value="light">Light</button>
              <button class="sp-segment" type="button" data-part="level-medium" value="medium">Medium</button>
              <button class="sp-segment" type="button" data-part="level-firm" value="firm">Firm</button>
            </sp-segmented>
          </div>

          <div class="sp-row" style="gap: 10px; align-items: flex-start">
            <div
              class="sp-surface"
              data-part="paper"
              style="position: relative; flex: 0 0 auto; width: ${PAPER.w + 2}px; height: ${PAPER.h + 2}px; overflow: hidden; touch-action: none; cursor: crosshair"
            >
              <span
                class="sp-context"
                style="position: absolute; inset: 0; background-image: radial-gradient(var(--sp-line) 1px, transparent 1px); background-size: 20px 20px; opacity: 0.7"
              ></span>
              <div
                data-part="stroke"
                data-subject
                data-level="medium"
                style="position: absolute; left: ${(PAPER.w - INK.w) / 2}px; top: ${(PAPER.h - INK.h) / 2}px; width: ${INK.w}px; height: ${INK.h}px"
              >
                <svg viewBox="0 0 ${INK.w} ${INK.h}" width="${INK.w}" height="${INK.h}" style="display: block" aria-hidden="true">
                  <path data-part="ink" d="" fill="var(--sp-accent)" fill-opacity="0.76"></path>
                </svg>
              </div>
            </div>

            <div class="sp-stack sp-context" style="width: 118px; gap: 6px">
              <span class="sp-label">Reported</span>
              <span class="sp-heading" data-part="value" style="font-size: 17px; font-variant-numeric: tabular-nums">0.55</span>
              <div class="sp-progress"><div class="sp-progress-fill" data-part="meter" style="--sp-value: 55%"></div></div>
              <div class="sp-divider"></div>
              <span class="sp-text" style="font-size: 11px; line-height: 1.35">A continuous axis, read on every move.</span>
            </div>
          </div>
        </div>

        <span class="sp-label sp-context" style="padding: 0 14px 9px; text-align: center; line-height: 1.4">
          No pointer on this page can press harder, so the three settings hand the stroke the value a stylus would report.
        </span>
      </div>
    </div>
  `;

  const stroke = part(root, 'stroke');
  const ink = stroke.querySelector('path') as SVGPathElement;
  const readout = part(root, 'readout');
  const value = part(root, 'value');
  const meter = part(root, 'meter');
  const level = part(root, 'level') as HTMLElement & { value: string };

  /** The one renderer. A setting and a stylus both arrive here with a number from 0 to 1. */
  const render = (pressure: number, half: number, alpha: number) => {
    ink.setAttribute('d', ribbon(half));
    ink.setAttribute('fill-opacity', alpha.toFixed(2));
    value.textContent = pressure.toFixed(2);
    meter.style.setProperty('--sp-value', `${Math.round(pressure * 100)}%`);
  };

  const apply = (key: string) => {
    const chosen = LEVELS.find((candidate) => candidate.key === key) ?? LEVELS[1];
    if (!chosen) return;
    stroke.dataset.level = chosen.key;
    render(chosen.pressure, chosen.half, chosen.alpha);
    readout.textContent = `${chosen.name} pressure: ${chosen.note}`;
  };

  level.addEventListener('change', () => apply(level.value));
  apply('medium');

  // The real wiring, live for anyone holding a pen. Synthesized events carry no pressure and no
  // pointer type, and a mouse reports a constant, so both are turned away here rather than
  // allowed to overwrite the setting with a number that means nothing.
  const fromPen = (event: PointerEvent) => {
    if (event.pointerType === 'mouse' || !(event.pressure > 0)) return;
    stroke.dataset.level = 'pen';
    render(event.pressure, 2 + event.pressure * 10, 0.35 + event.pressure * 0.65);
    readout.textContent = `Reading the pen directly: ${event.pressure.toFixed(2)}`;
  };

  const paper = part(root, 'paper');
  paper.addEventListener('pointerdown', fromPen);
  paper.addEventListener('pointermove', fromPen);
}
