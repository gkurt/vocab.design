import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The region is held at one box at every level, so only the drawing inside it changes. */
const REGION_W = 440;
const REGION_H = 176;

interface Level {
  key: string;
  label: string;
  heading: string;
  note: string;
}

const LEVELS: Level[] = [
  {
    key: 'years',
    label: 'years',
    heading: '2020 to 2025',
    note: 'Zoomed out: one bar per year. Not the same chart shrunk, a different drawing whose unit is a year.',
  },
  {
    key: 'months',
    label: 'months',
    heading: '2024, by month',
    note: 'One step in and the unit becomes a month. The same record, redrawn, with no pixel scaled to get here.',
  },
  {
    key: 'events',
    label: 'events',
    heading: 'March 2024',
    note: 'Zoomed in: individual entries, each with its own label. Nothing was revealed, the representation was swapped.',
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

const segment = (level: Level) => `
  <button class="sp-segment" type="button" data-part="seg-${level.key}" value="${level.key}" style="padding: 4px 11px; font-size: 11px">
    ${level.label}
  </button>`;

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
 * and individual labelled entries, with a picker standing in for the pinch the player cannot make.
 *
 * The subject is the zooming region, the place whose drawing changes, rather than any one view
 * inside it or the whole scene (SPEC §5). Every level is honestly the term, so no `data-pose`
 * condition is needed. The window chrome, the level picker and the caption are scenery in the
 * context register.
 *
 * The three views are stacked in one box of a fixed size and only one is on stage at a time, so
 * changing level redraws the region and moves nothing around it (SPEC §5). That stacking is also
 * the claim: no view is a scaled copy of another, each is drawn from the same record at its own
 * unit. Each segment names the level it produces rather than stepping from the one it found
 * (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const first = LEVELS[0] as Level;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Harbour project, history</span>
          <sp-segmented class="sp-segmented" data-part="levels" data-value="${first.key}">
            ${LEVELS.map(segment).join('')}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div
            data-part="zoom"
            data-subject
            data-level="${first.key}"
            style="position: relative; flex: 0 0 auto; width: ${REGION_W}px; height: ${REGION_H}px; overflow: hidden;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
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
          <span class="sp-text sp-context" data-part="readout" style="flex: 0 0 auto; height: 40px; width: 442px"></span>
        </div>
      </div>
    </div>
  `;

  const zoom = part(root, 'zoom');
  const readout = part(root, 'readout');
  const views = LEVELS.map((level) => ({ key: level.key, element: part(root, `view-${level.key}`) }));

  const show = (key: string) => {
    const level = LEVELS.find((entry) => entry.key === key);
    if (!level) return;
    zoom.dataset.level = level.key;
    for (const { key: viewKey, element } of views) element.hidden = viewKey !== level.key;
    readout.textContent = level.note;
  };

  part(root, 'levels').addEventListener('change', (event) => show((event as CustomEvent<string>).detail));

  show(first.key);
}
