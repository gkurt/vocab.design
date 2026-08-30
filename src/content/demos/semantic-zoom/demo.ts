import { part } from '#src/kit/parts.ts';
import { pinchSpread } from '#src/kit/touch.ts';

/** The region is held at one box at every level, so only the drawing inside it changes. */
const REGION_W = 440;
const REGION_H = 176;

/** The zoom factor the region mounts at, and the range a gesture may take it through. */
const MIN_Z = 1;
const MAX_Z = 8;

interface Level {
  key: string;
  unit: string;
  /** The factor at which this drawing takes over. The steps are a ladder, not a slope. */
  from: number;
  heading: string;
}

const LEVELS: Level[] = [
  {
    key: 'years',
    unit: 'year',
    from: MIN_Z,
    heading: '2020 to 2025',
  },
  {
    key: 'months',
    unit: 'month',
    from: 2.2,
    heading: '2024, by month',
  },
  {
    key: 'events',
    unit: 'entry',
    from: 4.4,
    heading: 'March 2024',
  },
];

const YEARS: { label: string; value: number }[] = [
  { label: '2020', value: 34 },
  { label: '2021', value: 52 },
  { label: '2022', value: 46 },
  { label: '2023', value: 71 },
  { label: '2024', value: 88 },
  { label: '2025', value: 63 },
];

const MONTHS: { label: string; value: number }[] = [
  { label: 'J', value: 42 },
  { label: 'F', value: 55 },
  { label: 'M', value: 78 },
  { label: 'A', value: 61 },
  { label: 'M', value: 70 },
  { label: 'J', value: 88 },
  { label: 'J', value: 74 },
  { label: 'A', value: 39 },
  { label: 'S', value: 66 },
  { label: 'O', value: 81 },
  { label: 'N', value: 58 },
  { label: 'D', value: 47 },
];

const EVENTS: { date: string; title: string }[] = [
  { date: '4 Mar', title: 'Kickoff workshop' },
  { date: '11 Mar', title: 'First survey returned' },
  { date: '19 Mar', title: 'Harbour permit granted' },
  { date: '27 Mar', title: 'Draft plan circulated' },
];

const bars = (rows: { label: string; value: number }[], gap: number) => `
  <div style="display: flex; align-items: flex-end; gap: ${gap}px; flex: 1 1 auto; min-height: 0">
    ${rows
      .map(
        (row) => `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1 1 0; min-width: 0; height: 100%">
        <div style="flex: 1 1 auto; display: flex; align-items: flex-end; width: 100%">
          <div style="width: 100%; height: ${row.value}%; background: var(--sp-accent); border-radius: 4px 4px 0 0"></div>
        </div>
        <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">${row.label}</span>
      </div>`,
      )
      .join('')}
  </div>`;

const view = (key: string, heading: string, body: string) => `
  <div
    data-part="view-${key}"
    style="position: absolute; inset: 10px 12px; display: flex; flex-direction: column; gap: 8px"
  >
    <span class="sp-label" style="flex: 0 0 auto; font-size: 11px; color: var(--sp-ink)">${heading}</span>
    ${body}
  </div>`;

/**
 * Semantic zoom specimen: one project's record drawn three ways, a bar per year, a bar per month,
 * and individual labelled entries, with the pinch that moves between them performed rather than
 * picked.
 *
 * The region is a touch surface (`data-touch`), so the script pinches it with two contacts and
 * the gesture arrives through `pinchSpread` (SPEC §7): one scale signal for the script, for a
 * real two-finger pinch, for a reader's modifier and drag, and beside it the trackpad's own
 * pinch, which browsers deliver as a ctrl+wheel. The factor is continuous and the drawing is
 * not: each level takes over at its own threshold, so opening the pinch far enough steps the
 * unit from a year to a month to a single entry, and nothing in between is a scaled copy of
 * anything. The factor is printed as it moves, since a gesture that changes no pixel until it
 * crosses a line owes the reader that much.
 *
 * The subject is the zooming region, the place whose drawing changes, rather than any one view
 * inside it or the whole scene (SPEC §5). Every level is honestly the term, so no `data-pose`
 * condition is needed. The window chrome and the factor readout are scenery in the context
 * register.
 *
 * Two lines of the site's own voice used to sit under the region: a note per level ("Zoomed
 * out: one bar per year. Not the same chart shrunk, a different drawing whose unit is a
 * year.") and a line telling the reader how to pinch. Neither belongs to a project history,
 * the levels say what they are in their own headings, and the frame lost the height both
 * took.
 *
 * The three views are stacked in one box of a fixed size and only one is on stage at a time, so
 * changing level redraws the region and moves nothing around it (SPEC §5). That stacking is also
 * the claim: no view is a scaled copy of another, each is drawn from the same record at its own
 * unit.
 */
export function mount(root: HTMLElement): void {
  const first = LEVELS[0] as Level;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 242px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour project, history</span>
          <span class="sp-text" data-part="factor" style="width: 168px; text-align: right; white-space: nowrap"></span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div
            data-part="zoom"
            data-subject
            data-touch
            data-level="${first.key}"
            style="position: relative; flex: 0 0 auto; width: ${REGION_W}px; height: ${REGION_H}px; overflow: hidden; touch-action: none;
                   user-select: none; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            ${view('years', LEVELS[0]?.heading ?? '', bars(YEARS, 10))}
            ${view('months', LEVELS[1]?.heading ?? '', bars(MONTHS, 5))}
            ${view(
              'events',
              LEVELS[2]?.heading ?? '',
              `<ul class="sp-list" style="flex: 1 1 auto; min-height: 0">
                ${EVENTS.map(
                  (entry) => `
                  <li class="sp-list-item" style="padding: 6px 8px">
                    <span class="sp-label" style="flex: 0 0 58px; font-size: 11px; font-variant-numeric: tabular-nums">${entry.date}</span>
                    <span class="sp-grow" style="font-size: 12px">${entry.title}</span>
                  </li>`,
                ).join('')}
              </ul>`,
            )}
          </div>
        </div>
      </div>
    </div>
  `;

  const zoom = part(root, 'zoom');
  const factor = part(root, 'factor');
  const views = LEVELS.map((level) => ({ key: level.key, element: part(root, `view-${level.key}`) }));

  const clamp = (value: number) => Math.min(MAX_Z, Math.max(MIN_Z, value));

  /** The ladder read from the top down, so the deepest threshold the factor has passed wins. */
  const levelFor = (z: number) => [...LEVELS].reverse().find((level) => z >= level.from) ?? first;

  const show = (z: number) => {
    const level = levelFor(z);
    zoom.dataset.level = level.key;
    for (const { key, element } of views) element.hidden = key !== level.key;
    factor.textContent = `Zoom ${z.toFixed(1)}x, unit: ${level.unit}`;
  };

  /** What a gesture measures from, and what it leaves behind: the committed factor. */
  let held = MIN_Z;
  /** The factor the live gesture engaged at, so its whole run is read from one place. */
  let base = MIN_Z;

  pinchSpread(zoom, {
    onStart: () => {
      base = held;
    },
    onPinch: (scale) => show(clamp(base * scale)),
    onEnd: (scale) => {
      held = clamp(base * scale);
      show(held);
    },
  });

  // The trackpad pinch, for real: browsers deliver it as a wheel event with ctrlKey set.
  zoom.addEventListener(
    'wheel',
    (event) => {
      if (!event.ctrlKey) return;
      event.preventDefault();
      held = clamp(held * Math.exp(-event.deltaY * 0.0035));
      show(held);
    },
    { passive: false },
  );

  show(held);
}
