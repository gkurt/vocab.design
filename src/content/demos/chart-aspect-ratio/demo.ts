import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The slot the plot is reshaped inside: held at the largest shape, so nothing around it moves. */
const SLOT_W = 322;
const SLOT_H = 190;
/** Axes are drawn as 2px borders on the plot itself: the stage reads anything thinner as absent. */
const AXIS = 2;
/** The plot's own coordinate space. Points are inset so the line never sits on an axis. */
const VIEW = 100;
const INSET = 2;
/** The marker's ray, drawn from the corner of a little protractor. */
const RAY = 54;
const RAY_X = 6;
const RAY_Y = 62;

/** Utilisation, percent, twelve weeks. The domain is the full 0 to 100, so no axis is cut. */
const VALUES = [42, 58, 47, 63, 51, 68, 55, 72, 60, 78, 64, 82];

interface Shape {
  key: string;
  label: string;
  w: number;
  h: number;
  note: string;
}

const SHAPES: Shape[] = [
  {
    key: 'banked',
    label: 'banked',
    w: 222,
    h: 131,
    note: 'Banked: the average segment sits at 45 degrees, where a difference in slope is easiest to judge.',
  },
  {
    key: 'wide',
    label: 'wide',
    w: SLOT_W,
    h: 86,
    note: 'Wide and short: the slopes flatten, and a series that swings 15 points a week reads as a drift.',
  },
  {
    key: 'tall',
    label: 'tall',
    w: 134,
    h: SLOT_H,
    note: 'Tall and narrow: the same twelve numbers, and every week reads as a spike.',
  },
];

/** The mean absolute step, in value units: the data's own contribution to the slope. */
const MEAN_STEP = VALUES.slice(1).reduce((sum, value, i) => sum + Math.abs(value - (VALUES[i] ?? 0)), 0) / (VALUES.length - 1);
/** One step's horizontal share of the plot, in the same 0 to 100 space. */
const STEP_X = (VIEW - INSET * 2) / (VALUES.length - 1);

/** The average segment angle the drawn geometry actually produces, in degrees. */
function angleFor(shape: Shape): number {
  const plotW = shape.w - AXIS;
  const plotH = shape.h - AXIS;
  const rise = (MEAN_STEP / VIEW) * plotH;
  const run = (STEP_X / VIEW) * plotW;
  return (Math.atan(rise / run) * 180) / Math.PI;
}

const POINTS = VALUES.map((value, i) => `${(INSET + i * STEP_X).toFixed(2)},${(VIEW - value).toFixed(2)}`).join(' ');

const segment = (shape: Shape) => `
  <button class="sp-segment" type="button" data-part="seg-${shape.key}" value="${shape.key}" style="padding: 4px 10px; font-size: 11px">
    ${shape.label}
  </button>`;

/**
 * Chart aspect ratio specimen: one twelve week series, drawn in three frames of different width
 * to height, with the average segment angle it produces read out beside a 45 degree marker.
 *
 * The subject is the plot frame, the box whose shape sets the slopes, rather than the line inside
 * it or the card around it (SPEC §5). Every shape is honestly the term (a badly chosen ratio is
 * still a chart aspect ratio), so no `data-pose` condition is needed. The picker and the marker
 * are scenery in the context register.
 *
 * The frame is reshaped inside a slot held at the largest shape and anchored to its bottom left
 * corner, so the value axis and everything around it stay exactly where they were (SPEC §5). The
 * line is drawn in a stretched view box with a non-scaling stroke, so reshaping the frame is one
 * transition on the frame itself rather than a redraw. Angles are computed from the shape's own
 * numbers, never measured back off the element after a style write (SPEC §5).
 *
 * The reading of each shape used to sit under the chart, inside the card, where no dashboard
 * would print it. It changes with the shape, so it is that switch's verdict: it carries
 * `data-stage-verdict` and the stage draws it in the strip. It keeps the room it reserved,
 * because a listing card draws no strip and still shows the line.
 */
export function mount(root: HTMLElement): void {
  const first = SHAPES[0] as Shape;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Utilisation, percent, 12 weeks</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="shapes" data-axis="Shape" data-value="${first.key}">
            ${SHAPES.map(segment).join('')}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 8px 12px">
          <div style="display: flex; align-items: flex-end; gap: 12px; flex: 0 0 auto; height: ${SLOT_H}px">
            <div style="position: relative; flex: 0 0 auto; width: ${SLOT_W}px; height: ${SLOT_H}px">
              <svg
                data-part="frame"
                data-subject
                data-shape="${first.key}"
                data-angle="${Math.round(angleFor(first))}"
                viewBox="0 0 ${VIEW} ${VIEW}"
                preserveAspectRatio="none"
                aria-hidden="true"
                style="position: absolute; left: 0; bottom: 0; width: ${first.w}px; height: ${first.h}px; overflow: visible;
                       background: var(--sp-surface); border-left: ${AXIS}px solid var(--sp-muted);
                       border-bottom: ${AXIS}px solid var(--sp-muted);
                       transition: width 0.4s var(--sp-ease), height 0.4s var(--sp-ease)"
              >
                <polyline
                  points="${POINTS}"
                  fill="none"
                  stroke="var(--sp-accent)"
                  stroke-width="${AXIS}"
                  stroke-linejoin="round"
                  vector-effect="non-scaling-stroke"
                />
              </svg>
            </div>

            <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 2px; align-self: stretch">
              <span class="sp-label">Average segment</span>
              <span class="sp-heading" data-part="angle" style="font-size: 20px; line-height: 1.2">0°</span>
              <svg viewBox="0 0 96 72" width="96" height="72" aria-hidden="true" style="display: block; margin-top: 4px">
                <line x1="${RAY_X}" y1="${RAY_Y}" x2="${RAY_X + RAY + 6}" y2="${RAY_Y}" stroke="var(--sp-line)" stroke-width="${AXIS}" />
                <line
                  x1="${RAY_X}" y1="${RAY_Y}" x2="${RAY_X + (RAY + 14) * Math.SQRT1_2}" y2="${RAY_Y - (RAY + 14) * Math.SQRT1_2}"
                  stroke="var(--sp-muted)" stroke-width="${AXIS}" stroke-dasharray="5 4"
                />
                <g
                  data-part="ray"
                  style="transform-box: view-box; transform-origin: ${RAY_X}px ${RAY_Y}px; transform: rotate(0deg);
                         transition: transform 0.4s var(--sp-ease)"
                >
                  <line x1="${RAY_X}" y1="${RAY_Y}" x2="${RAY_X + RAY}" y2="${RAY_Y}" stroke="var(--sp-accent)" stroke-width="${AXIS}" />
                </g>
              </svg>
              <span class="sp-label" style="font-size: 10px">dashed: 45°</span>
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" data-shape="${first.key}" style="flex: 0 0 auto; height: 40px"></span>
        </div>
      </div>
    </div>
  `;

  const frame = part(root, 'frame');
  const angleOut = part(root, 'angle');
  const ray = part(root, 'ray');
  const readout = part(root, 'readout');

  const reshape = (key: string) => {
    const shape = SHAPES.find((entry) => entry.key === key);
    if (!shape) return;
    const degrees = angleFor(shape);
    frame.dataset.shape = shape.key;
    readout.dataset.shape = shape.key;
    frame.dataset.angle = String(Math.round(degrees));
    frame.style.width = `${shape.w}px`;
    frame.style.height = `${shape.h}px`;
    angleOut.textContent = `${Math.round(degrees)}°`;
    ray.style.transform = `rotate(${(-degrees).toFixed(1)}deg)`;
    readout.textContent = shape.note;
  };

  // Each segment names the shape it produces, so a resumed pass lands on that shape rather than
  // cycling from whichever one it found (SPEC §8).
  part(root, 'shapes').addEventListener('change', (event) => reshape((event as CustomEvent<string>).detail));

  reshape(first.key);
}
