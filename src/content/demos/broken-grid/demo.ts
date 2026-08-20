import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const COLUMNS = 6;
const GAP = 8;
const CANVAS_H = 176;

const FITS = [
  { key: 'off-grid', label: 'broken' },
  { key: 'on-grid', label: 'on the grid' },
];

const NOTES: Record<string, string> = {
  'off-grid': 'The plate takes a column it does not own and hangs off the track edges.',
  'on-grid': 'Every edge back on a track: the same four blocks, none of the tension.',
};

const TRACKS = `display: grid; grid-template-columns: repeat(${COLUMNS}, 1fr); grid-template-rows: 1fr 1fr; gap: ${GAP}px`;
/** The guide overlay: full-height columns, so the tracks are drawn across both rows. */
const GUIDES = `display: grid; grid-template-columns: repeat(${COLUMNS}, 1fr); gap: ${GAP}px`;
const BLOCK = 'display: flex; flex-direction: column; gap: 6px; padding: 8px 10px; min-width: 0; overflow: hidden';

const lines = (widths: number[]) => widths.map((w) => `<div class="sp-line" style="width: ${w}%; height: 6px"></div>`).join('');

/**
 * Broken grid specimen: six columns drawn as tinted tracks, with an editorial fragment laid on
 * them. The pick sets the plate on its tracks or off them, and off them it does both halves of
 * the move at once: it takes a column the copy already owns, and its edges land mid-track rather
 * than on a line. The grid stays drawn underneath in both states, which is the whole argument of
 * the term: a violation only reads as deliberate while the structure it violates is still legible.
 *
 * The subject is the plate, `data-part="plate"`, the element that breaks the grid. It carries
 * `data-pose="[data-broken]"` because the on-grid state is a counter-example the subject passes
 * through: a ring around a conforming block would identify the opposite of the term. The mount
 * state is the broken one, so the pose holds there (SPEC §6).
 *
 * The track tint and the other three blocks are scenery in the context register. The tracks are
 * real boxes rather than hairlines (SPEC §5), and the break is a transform over a grid area, so
 * no state change moves a block that did not change.
 */
export function mount(root: HTMLElement): void {
  const tracks = Array.from(
    { length: COLUMNS },
    () => '<div style="background: var(--sp-accent); opacity: 0.1; border-radius: 2px"></div>',
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">${COLUMNS} columns, plate</span>
          <sp-segmented class="sp-segmented" data-part="fits" data-value="off-grid">
            ${FITS.map(
              (fit) => `
              <button class="sp-segment" type="button" data-part="seg-${fit.key}" value="${fit.key}" style="padding: 4px 9px; font-size: 11px; white-space: nowrap">${fit.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="padding: 12px 20px">
          <div style="position: relative; height: ${CANVAS_H}px">
            <div data-part="layout" style="position: relative; ${TRACKS}; height: 100%">
              <div class="sp-surface sp-context" data-part="block-headline" style="${BLOCK}; grid-column: 1 / 4; grid-row: 1">
                <span class="sp-label" style="color: var(--sp-ink); font-size: 11px">Headline</span>
                ${lines([92, 64])}
              </div>
              <div class="sp-surface sp-context" data-part="block-copy" style="${BLOCK}; grid-column: 1 / 4; grid-row: 2">
                <span class="sp-label" style="font-size: 11px">Copy</span>
                ${lines([100, 88, 70])}
              </div>
              <div class="sp-surface sp-context" data-part="block-credit" style="${BLOCK}; grid-column: 4 / 7; grid-row: 2; justify-content: flex-end">
                <span class="sp-label" style="font-size: 11px">Credit</span>
              </div>
              <div
                data-part="plate"
                data-subject
                data-fit="off-grid"
                data-broken
                data-pose="[data-broken]"
                style="${BLOCK}; grid-column: 3 / 7; grid-row: 1; z-index: 2; justify-content: flex-end;
                       background: var(--sp-accent-soft); border: 2px solid var(--sp-accent); border-radius: 6px;
                       transform: translate(-16px, 22px); transition: transform 320ms var(--sp-ease)"
              >
                <span class="sp-label" style="color: var(--sp-ink); font-weight: 600; font-size: 11px">Plate</span>
              </div>
            </div>

            <div class="sp-context" data-part="tracks" style="position: absolute; inset: 0; ${GUIDES}; pointer-events: none; z-index: 3">${tracks}</div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center">${NOTES['off-grid']}</span>
    </div>
  `;

  const plate = part(root, 'plate');
  const note = part(root, 'note');

  const apply = (key: string) => {
    const broken = key === 'off-grid';
    plate.dataset.fit = key;
    if (broken) plate.dataset.broken = '';
    else delete plate.dataset.broken;

    plate.style.gridColumn = broken ? '3 / 7' : '4 / 7';
    // The offset stays inside the drawn canvas: the plate breaks the tracks, not the frame.
    plate.style.transform = broken ? 'translate(-16px, 22px)' : 'translate(0, 0)';
    note.textContent = NOTES[key] ?? '';
  };

  part(root, 'fits').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  // Mount broken, which is the state the term names and the state the pose requires.
  apply('off-grid');
}
