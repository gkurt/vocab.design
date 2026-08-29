import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * A serif for the column, as a local stack: a specimen about ranks of text
 * cannot state them in the kit's single sans at one weight (SPEC §5). The paint
 * below is each rank's own claim, which is why it is inline rather than a class.
 */
const FACE = "Georgia, 'Liberation Serif', 'Nimbus Roman', serif";

type Level = { part: string; chip: string; height: number; html: string; leveled: string };

const LEVELS: Level[] = [
  {
    part: 'eyebrow',
    chip: 'label',
    height: 24,
    html: 'FIELD NOTES',
    leveled: 'font-size: 11px; font-weight: 600; letter-spacing: 0.14em; color: var(--sp-muted)',
  },
  {
    part: 'title',
    chip: 'headline',
    height: 32,
    html: 'Rank before reading',
    leveled: 'font-size: 25px; font-weight: 600; line-height: 1.15; white-space: nowrap',
  },
  {
    part: 'body',
    chip: 'body',
    height: 66,
    html: 'Rank is read before the words are. A reader who has not started yet already knows which line is the way in.',
    leveled: 'font-size: 13px; font-weight: 400; line-height: 1.5',
  },
  {
    part: 'caption',
    chip: 'caption',
    height: 24,
    html: 'Photograph: house archive, 1974',
    leveled: 'font-size: 11px; font-weight: 400; color: var(--sp-muted)',
  },
];

/** Every rank set the same: the failure the flattened state is there to show. */
const FLAT = 'font-size: 14px; font-weight: 400; line-height: 1.45; letter-spacing: normal; color: var(--sp-ink)';

/**
 * Typographic hierarchy specimen: one article fragment whose four ranks are
 * labelled down the left, and a control in the scenery that sets every rank the
 * same so the ranks can be seen by their absence.
 *
 * The subject is the column of text. Hierarchy is a property of a run of ranks
 * rather than of any one of them, so no single line is the term and the
 * narrowest honest answer is the column (SPEC §5); the chips beside it, the
 * control, and the caption are scenery.
 *
 * The flattened state is a counter-example the subject itself passes through, so
 * the honest condition is declared in `data-pose` (SPEC §6): identify refuses to
 * ring a column that currently has no hierarchy in it, and the mount state is
 * the levelled one.
 *
 * Every rank sits in a row of its own fixed height, sized for whichever of the two
 * settings is taller, so flattening changes the type inside the rows and moves
 * nothing at all (SPEC §5). The rows, the gaps and the window's padding together
 * keep the whole specimen inside the stage rather than running past its floor.
 */
export function mount(root: HTMLElement): void {
  const chips = LEVELS.map(
    (level) => `
      <div style="height: ${level.height}px; display: flex; align-items: center">
        <span class="sp-chip" data-part="chip-${level.part}" style="cursor: default">${level.chip}</span>
      </div>`,
  ).join('');

  const rows = LEVELS.map(
    (level) => `
      <div style="height: ${level.height}px; display: flex; align-items: center; overflow: hidden">
        <span data-part="text-${level.part}" style="margin: 0; ${level.leveled}">${level.html}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="on" data-axis="Rank" data-term="on">
            <button class="sp-segment" data-part="seg-levels" value="on">levelled</button>
            <button class="sp-segment" data-part="seg-flat" value="off">flattened</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 16px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack sp-context" data-part="chips" style="gap: 6px; width: 84px">${chips}</div>
          <div class="sp-stack" data-part="column" data-subject data-levels="on" data-pose="[data-levels=on]"
               style="gap: 6px; width: 296px; font-family: ${FACE}">${rows}</div>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 10px">
          Flattened, every line is still legible and the page is still correct. What is gone is the
          answer to what is this, which a reader was getting for free before they read anything.
        </p>
      </div>
    </div>
  `;

  const column = part(root, 'column');

  const apply = (value: string) => {
    const on = value === 'on';
    column.dataset.levels = on ? 'on' : 'off';
    for (const level of LEVELS) {
      part(root, `text-${level.part}`).setAttribute('style', `margin: 0; ${on ? level.leveled : FLAT}`);
    }
  };

  apply('on');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
