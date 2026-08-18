import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** One panel, held at one size in both states, so only the marks inside it move. */
const PANEL_W = 142;
const PANEL_H = 88;
const PLOT_W = 130;
const PLOT_H = 58;
const BASE = 54;
const TOP = 4;
/** Marks are drawn at 2px: the stage reads anything thinner as absent. */
const RULE = 2;
/** The one domain every panel shares, in millimetres of rainfall. */
const SHARED_TOP = 100;

interface Panel {
  key: string;
  label: string;
  values: number[];
}

const PANELS: Panel[] = [
  { key: 'north', label: 'North', values: [58, 62, 70, 66, 78, 84, 88, 92] },
  { key: 'west', label: 'West', values: [22, 26, 31, 38, 44, 51, 58, 64] },
  { key: 'south', label: 'South', values: [40, 44, 41, 48, 52, 49, 55, 58] },
  { key: 'coast', label: 'Coast', values: [30, 33, 29, 34, 31, 36, 33, 38] },
  { key: 'east', label: 'East', values: [12, 14, 11, 16, 15, 18, 17, 20] },
  { key: 'central', label: 'Central', values: [8, 7, 9, 8, 10, 9, 11, 12] },
];

const NOTES: Record<string, string> = {
  shared: 'One domain, 0 to 100 mm, in all six panels. Central really is a tenth of North, and the eye can see it.',
  own: 'Each panel scaled to its own maximum. Every trend now fills its box, so Central reads like North: the comparison is gone.',
};

/** The nice round top a panel would pick if it scaled to itself alone. */
const ownTop = (values: number[]) => Math.ceil(Math.max(...values) / 10) * 10;

const x = (index: number) => TOP + (index * (PLOT_W - TOP * 2)) / 7;
const y = (value: number) => BASE - (value / SHARED_TOP) * (BASE - TOP);

const segment = (key: string, label: string) => `
  <button class="sp-segment" type="button" data-part="seg-${key}" value="${key}" style="padding: 4px 9px; font-size: 11px">
    ${label}
  </button>`;

/**
 * One panel: a title, the top of its scale, and one series drawn against the shared domain.
 * Switching to per-panel scales is exactly a vertical stretch about the baseline, so the marks
 * ride a `scaleY` rather than being redrawn, and the stroke is held at its own width.
 */
function panel({ key, label, values }: Panel): string {
  const points = values.map((value, index) => `${x(index).toFixed(1)},${y(value).toFixed(1)}`).join(' ');
  const area = `M ${x(0).toFixed(1)},${BASE} L ${points.split(' ').join(' L ')} L ${x(values.length - 1).toFixed(1)},${BASE} Z`;
  return `
    <div
      class="sp-surface"
      data-part="panel-${key}"
      style="display: flex; flex-direction: column; width: ${PANEL_W}px; height: ${PANEL_H}px; padding: 5px; overflow: hidden"
    >
      <span style="display: flex; align-items: baseline; gap: 6px; flex: 0 0 auto; height: 17px">
        <span class="sp-heading" style="flex: 1 1 auto; min-width: 0; font-size: 11px">${label}</span>
        <span class="sp-label" data-part="top-${key}" style="flex: 0 0 auto; font-size: 10px">${SHARED_TOP}</span>
      </span>
      <svg viewBox="0 0 ${PLOT_W} ${PLOT_H}" width="${PLOT_W}" height="${PLOT_H}" aria-hidden="true" style="display: block; flex: 0 0 auto">
        <line x1="0" y1="${BASE}" x2="${PLOT_W}" y2="${BASE}" stroke="var(--sp-line)" stroke-width="${RULE}" />
        <g
          data-part="marks-${key}"
          style="transform-box: view-box; transform-origin: 0px ${BASE}px; transform: scaleY(1);
                 transition: transform 0.42s var(--sp-ease)"
        >
          <path d="${area}" fill="var(--sp-accent-soft)" />
          <polyline
            points="${points}"
            fill="none"
            stroke="var(--sp-accent)"
            stroke-width="${RULE}"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
          />
        </g>
      </svg>
    </div>`;
}

/**
 * Small multiples specimen: one chart design repeated six times, once per region, drawn against
 * one shared domain and then against six domains of its own.
 *
 * The subject is the grid of panels, not any single panel and not the whole scene: a lone panel
 * is a chart, and the repetition plus the shared scale is what the term names (SPEC §5). The
 * window chrome, the scale picker and the caption are scenery in the context register.
 *
 * Both states are honestly the term (per-panel scales are badly scaled small multiples, not
 * something else), so the subject never stops being what it claims and no `data-pose` is needed.
 * The panels and the grid hold their boxes across the switch, so only the marks inside each
 * panel move (SPEC §5). Each segment names the scaling it produces rather than flipping the one
 * it found (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Rainfall by region, mm</span>
          <sp-segmented class="sp-segmented" data-part="scales" data-value="shared">
            ${segment('shared', 'one shared scale')}${segment('own', 'per panel')}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div
            class="sp-grid"
            data-part="grid"
            data-subject
            data-scale="shared"
            style="flex: 0 0 auto; grid-template-columns: repeat(3, ${PANEL_W}px); grid-template-rows: repeat(2, ${PANEL_H}px)"
          >
            ${PANELS.map(panel).join('')}
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 40px; width: 442px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const grid = part(root, 'grid');
  const readout = part(root, 'readout');
  const rows = PANELS.map((entry) => ({
    entry,
    marks: part(root, `marks-${entry.key}`),
    top: part(root, `top-${entry.key}`),
  }));

  const scale = (mode: string) => {
    const note = NOTES[mode];
    if (!note) return;
    grid.dataset.scale = mode;
    for (const { entry, marks, top } of rows) {
      const panelTop = mode === 'own' ? ownTop(entry.values) : SHARED_TOP;
      marks.style.transform = `scaleY(${(SHARED_TOP / panelTop).toFixed(3)})`;
      top.textContent = String(panelTop);
    }
    readout.textContent = note;
  };

  part(root, 'scales').addEventListener('change', (event) => scale((event as CustomEvent<string>).detail));

  scale('shared');
}
