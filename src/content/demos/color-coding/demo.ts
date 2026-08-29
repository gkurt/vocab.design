import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * The finest set of categories the week is actually made of: twelve, one per entry.
 * Coarser schemes are merges of these, which is how a team really decides how many
 * codes to keep.
 */
const FINE = ['Standup', 'Design', 'Admin', 'Focus', '1:1', 'Review', 'Interview', 'Retro', 'Planning', 'Support', 'Demo', 'Travel'];
const EIGHT = ['Standup', 'Design', 'Focus', 'Review', '1:1', 'Hiring', 'Planning', 'Admin'];
const FOUR = ['Meeting', 'Focus', 'Review', 'Admin'];

/** Which coarse code each of the twelve fine categories folds into. */
const TO_EIGHT = [0, 1, 7, 2, 4, 3, 5, 3, 6, 7, 3, 7];
const TO_FOUR = [0, 0, 3, 1, 0, 2, 0, 2, 0, 3, 2, 3];

type Scheme = { codes: string[]; of: (fine: number) => number };

const SCHEMES: Record<string, Scheme> = {
  '4': { codes: FOUR, of: (fine) => TO_FOUR[fine] ?? 0 },
  '8': { codes: EIGHT, of: (fine) => TO_EIGHT[fine] ?? 0 },
  '12': { codes: FINE, of: (fine) => fine },
};

const START = '4';

/** The week itself: five columns, twelve entries, each entry one of the fine categories. */
const DAYS = [
  { name: 'Mon', events: [0, 1, 2] },
  { name: 'Tue', events: [3, 4] },
  { name: 'Wed', events: [5, 6, 7] },
  { name: 'Thu', events: [8, 9] },
  { name: 'Fri', events: [10, 11] },
];

const TITLES = [
  'Standup',
  'Design sync',
  'Inbox',
  'Deep work',
  '1:1 Ana',
  'Design review',
  'Interview',
  'Retro',
  'Roadmap',
  'Support',
  'Demo',
  'Offsite',
];

/** The entry the pin points at: one coded mark, coded in every scheme the picker offers. */
const SUBJECT = 5;

/**
 * The palette is the term's own claim, so it is stated here rather than taken from the kit
 * (SPEC §5). Hues are walked evenly around the whole circle at one lightness and one chroma,
 * so nothing but hue separates one code from another, and the crowding at twelve is the real
 * spacing rather than a rigged one. The ink on a mark is fixed dark: a chip is its colour in
 * both themes, exactly as a calendar entry is.
 */
const hueOf = (index: number, count: number) => `oklch(0.74 0.14 ${Math.round((index * 360) / count) + 22})`;
const CHIP_INK = '#15181e';

const ROW_H = 26;

/**
 * Colour coding specimen: a working week whose entries are coloured by category, with the
 * key beside them and a picker choosing how many codes the scheme keeps. At four the hues
 * are a quarter of the circle apart and several entries share one, which is what a merge
 * looks like. At twelve every entry is its own code and no two hues are far enough apart to
 * be matched back to the key, which is the capacity limit doing its work.
 *
 * The subject is ONE coded mark, the Wednesday design review, rather than the week, the key,
 * or the picker: the term is the encoding a mark carries, and the mark is the element that
 * carries it (SPEC §5). Its eleven peers stay in full colour because they are the comparison,
 * not scenery; the heading, the picker, the key and the readout are the scenery around it and
 * wear the context register.
 *
 * Every mark keeps its box and its position in every scheme, and the key is given the room
 * its longest state needs, so changing the count repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const columns = DAYS.map(
    (day) => `
      <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 5px">
        <span class="sp-label" style="font-size: 10px">${day.name}</span>
        <div class="sp-stack" style="gap: 5px; height: ${ROW_H * 3 + 10}px">
          ${day.events
            .map(
              (fine) => `
                <span data-part="mark-${fine}" data-fine="${fine}"
                      ${fine === SUBJECT ? 'data-subject' : ''}
                      style="display: flex; align-items: center; flex: 0 0 auto; height: ${ROW_H}px; padding: 0 7px;
                             border-radius: 5px; background: ${hueOf(0, 4)}; color: ${CHIP_INK}; font-size: 10px;
                             font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${TITLES[fine]}</span>`,
            )
            .join('')}
        </div>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 448px; padding: 12px 12px 11px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label" style="color: var(--sp-ink)">Team week</span>
          <sp-segmented class="sp-segmented" data-axis="Palette size" data-part="codes" data-value="${START}">
            <button class="sp-segment" type="button" data-part="seg-4" value="4" style="font-size: 11px; padding: 4px 10px">4 codes</button>
            <button class="sp-segment" type="button" data-part="seg-8" value="8" style="font-size: 11px; padding: 4px 10px">8 codes</button>
            <button class="sp-segment" type="button" data-part="seg-12" value="12" style="font-size: 11px; padding: 4px 10px">12 codes</button>
          </sp-segmented>
        </div>

        <div class="sp-row" data-part="week" style="align-items: flex-start; gap: 6px; margin-top: 10px">${columns}</div>

        <div class="sp-divider" style="margin-top: 10px"></div>

        <div class="sp-row sp-row--wrap sp-context" data-part="key"
             style="align-content: flex-start; gap: 4px 10px; height: 36px; margin-top: 8px"></div>

        <div class="sp-row sp-row--between sp-context" style="height: 15px; margin-top: 6px">
          <span class="sp-label" style="font-size: 10px">Hue is the only thing separating one code from the next</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-codes="${START}" style="font-size: 11px"></span>
        </div>
      </div>
    </div>
  `;

  const board = part(root, 'week');
  const key = part(root, 'key');
  const readout = part(root, 'readout');
  const show = (count: string) => {
    const scheme = SCHEMES[count];
    if (!scheme) return;
    const n = scheme.codes.length;

    for (const mark of root.querySelectorAll<HTMLElement>('[data-fine]')) {
      const fine = Number(mark.dataset.fine);
      const code = scheme.of(fine);
      mark.dataset.code = String(code);
      mark.style.background = hueOf(code, n);
    }

    key.innerHTML = scheme.codes
      .map(
        (name, i) => `
          <span class="sp-row" style="gap: 4px; flex: 0 0 auto">
            <span class="sp-swatch" style="width: 9px; height: 9px; border-radius: 3px; --sp-swatch: ${hueOf(i, n)}"></span>
            <span class="sp-label" style="font-size: 10px">${name}</span>
          </span>`,
      )
      .join('');

    board.dataset.codes = count;
    readout.dataset.codes = count;
    readout.textContent = `${n} codes · hues ${Math.round(360 / n)}° apart`;
  };

  show(START);

  const picker = part(root, 'codes');
  picker.addEventListener('change', (event) => {
    show((event as CustomEvent<string>).detail);
  });
}
