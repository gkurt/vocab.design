import { part } from '#src/kit/parts.ts';
import { pressureHold } from '#src/kit/touch.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const PAPER = { w: 300, h: 132 };
/** The stroke's own box: the ink is drawn to fill it, so the box is a tight claim. */
const INK = { w: 268, h: 52 };
const SAMPLES = 40;

/** The reading the paper mounts with, which is the stroke the last press left behind. */
const MOUNT_FORCE = 0.55;

/** Names for stretches of the one continuous axis, so a claim has something to hold onto. */
const BANDS = [
  { key: 'light', name: 'Light', below: 0.4 },
  { key: 'medium', name: 'Medium', below: 0.8 },
  { key: 'firm', name: 'Firm', below: Number.POSITIVE_INFINITY },
];

const bandFor = (force: number) => BANDS.find((band) => force < band.below) ?? BANDS[BANDS.length - 1];

/** The pen the force drives: a wider, more opaque nib the harder the contact presses. */
const nibFor = (force: number) => ({ half: 2 + force * 10, alpha: 0.4 + force * 0.6 });

/**
 * One stroke, drawn as a filled ribbon whose half-width follows the pressure profile along the
 * arc: thin where the pen lands, swollen through the middle of the gesture, tapered as it
 * lifts. Sampled from a fixed table of steps, so the same reading always draws the same shape.
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
 * The press is performed, never picked. The paper is a touch surface (`data-touch`), so the
 * script presses it with a fingertip and the length of the press chooses the depth: a brief hold
 * reads light, a long one bottoms the axis out. A real reader makes the same gesture through
 * `pressureHold` (SPEC §7), which is one force signal for force hardware, a plain mouse buying
 * depth with time on the demo's own clock, and the script alike. The ink keeps whatever the press
 * reached, because that is what a drawn stroke is: a record of the force that drew it.
 *
 * The subject is the stroke. The term names the ink whose shape carries the reading, not the
 * paper it is drawn on, so the ink gets its own box and the pin goes there. Every reading is the
 * term (a light stroke is as pressure-driven as a firm one), so there is no dishonest state to
 * declare in `data-pose`. The paper, the readout and the meter are the scene around it in the
 * context register.
 *
 * A caption under the paper once told the reader to press and hold and explained how force
 * hardware and a plain pointer each arrive at a depth, and a line in the readout panel read
 * "A continuous axis, read on every move." Both were the site talking, so both are gone; the
 * article carries them. The topbar readout keeps the band name a sketch app would really
 * print ("Medium press") and drops the description of the stroke's shape that followed it.
 *
 * The ink box, the paper and the readouts all hold fixed sizes, and only the path data changes,
 * so a new reading moves nothing (SPEC §5). Nothing animates in script: the stroke is redrawn,
 * not tweened, and the meter's slide is the kit's own transition.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const opening = bandFor(MOUNT_FORCE);

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 264px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Sketch</span>
          <span class="sp-text" data-part="readout" style="width: 168px; text-align: right; white-space: nowrap">${opening?.name} press</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px">
          <div class="sp-row" style="gap: 10px; align-items: flex-start">
            <div
              class="sp-surface"
              data-part="paper"
              data-touch
              style="position: relative; flex: 0 0 auto; width: ${PAPER.w + 2}px; height: ${PAPER.h + 2}px; overflow: hidden; touch-action: none"
            >
              <span
                class="sp-context"
                style="position: absolute; inset: 0; background-image: radial-gradient(var(--sp-line) 1px, transparent 1px); background-size: 20px 20px; opacity: 0.7"
              ></span>
              <div
                data-part="stroke"
                data-subject
                data-level="${opening?.key}"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const stroke = part(root, 'stroke');
  const ink = stroke.querySelector('path') as SVGPathElement;
  const readout = part(root, 'readout');
  const value = part(root, 'value');
  const meter = part(root, 'meter');

  /** The one renderer. The script's fingertip, a stylus, and a held mouse all arrive here. */
  const draw = (force: number, live: boolean) => {
    const band = bandFor(force);
    const { half, alpha } = nibFor(force);
    stroke.dataset.level = band?.key ?? 'medium';
    ink.setAttribute('d', ribbon(half));
    ink.setAttribute('fill-opacity', alpha.toFixed(2));
    value.textContent = force.toFixed(2);
    meter.style.setProperty('--sp-value', `${Math.round(force * 100)}%`);
    readout.textContent = live ? `Reading the press: ${force.toFixed(2)}` : `${band?.name} press`;
  };

  // The gesture is the input (SPEC §7): the script's hold, a real finger, a pen with a force
  // sensor, and a reader's held mouse button all arrive as one rising force signal, and the
  // stroke is redrawn on every step of it. The ink stays at whatever the press reached.
  pressureHold(part(root, 'paper'), clock, {
    onForce: (force) => draw(force, true),
    onEnd: (force) => draw(force, false),
  });

  draw(MOUNT_FORCE, false);
}
