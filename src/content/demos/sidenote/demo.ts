import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The article is reshaped inside a slot held at the widest layout, so nothing around it moves. */
const SLOT_W = 440;
const SLOT_H = 176;
const TEXT_W = 280;
const MARGIN_W = 130;
const GAP = 14;
/** The note's own line height, so a note can be dropped to the line it annotates. */
const LINE = 20;

interface Layout {
  key: string;
  label: string;
  width: number;
  columns: string;
  /** Whether there is an outer margin for a note to live in at all. */
  margin: boolean;
  note: string;
}

const LAYOUTS: Layout[] = [
  {
    key: 'wide',
    label: 'wide',
    width: TEXT_W + GAP + MARGIN_W,
    columns: `${TEXT_W}px ${MARGIN_W}px`,
    margin: true,
    note: 'The margin is a permanent band beside the text, and each note is dropped to the line it annotates. No jump, no return.',
  },
  {
    key: 'narrow',
    label: 'narrow',
    width: 258,
    columns: '258px',
    margin: false,
    note: 'No margin left to sit in. The notes fall back into the flow behind their numeral, which keeps them near the sentence at least.',
  },
];

const NOTES: Record<string, { top: number; text: string }> = {
  '1': { top: LINE, text: 'Level with its own sentence, not at the foot of the page.' },
  '2': { top: 0, text: 'And no numbered list at the end to visit and come back from.' },
};

const segment = (layout: Layout) => `
  <button class="sp-segment" type="button" data-part="seg-${layout.key}" value="${layout.key}" style="padding: 4px 12px; font-size: 11px">
    ${layout.label}
  </button>`;

/** The reference marker in the text: a numeral in wide, the note's own control in narrow. */
const ref = (id: string) =>
  `<button type="button" data-part="ref-${id}" style="appearance: none; border: 0; padding: 0 2px; background: transparent; color: var(--sp-accent); font: inherit; font-size: 10px; font-weight: 600; vertical-align: super; line-height: 1; cursor: pointer">${id}</button>`;

const note = (id: string) => `
  <div data-part="cell-${id}" style="min-width: 0">
    <aside
      data-part="note-${id}"
      ${id === '1' ? 'data-subject data-pose="[data-place=margin]"' : ''}
      data-place="margin"
      style="margin-top: ${NOTES[id]?.top ?? 0}px; padding-left: 8px; border-left: 2px solid var(--sp-accent);
             color: var(--sp-muted); font-size: 11px; line-height: 1.5"
    ><span style="color: var(--sp-accent); font-weight: 600">${id}. </span>${NOTES[id]?.text ?? ''}</aside>
  </div>`;

/**
 * Sidenote specimen: an article whose annotations live in the outer margin, level with the lines
 * they belong to, and the narrow fallback where the same notes collapse into the flow behind their
 * numeral.
 *
 * The subject is one sidenote, the narrowest element the term names, rather than the article or
 * the margin band around it (SPEC §5). The narrow layout is a counter-example the subject itself
 * passes through: a note that has fallen into the flow is no longer in a margin, so the honest
 * condition is declared as `data-pose="[data-place=margin]"` and identify plays on rather than
 * ringing an inline note (SPEC §6). The mount state satisfies it. The article text, the layout
 * picker and the caption are scenery in the context register.
 *
 * The article is reshaped inside a slot held at the wide layout and anchored to its top left, so
 * the page narrows and nothing around it moves (SPEC §5). Inside the narrow layout the expanding
 * note does push the following paragraph down, which is the fallback's own behaviour rather than
 * incidental shift: that displacement is what a reader trades the margin for. Each segment names
 * the layout it produces, and each numeral reveals its note rather than toggling it (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const first = LAYOUTS[0] as Layout;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Notes in the margin</span>
          <sp-segmented class="sp-segmented" data-part="layouts" data-value="${first.key}">
            ${LAYOUTS.map(segment).join('')}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div style="display: flex; align-items: flex-start; justify-content: flex-start; flex: 0 0 auto; width: ${SLOT_W}px; height: ${SLOT_H}px">
            <div
              class="sp-grid"
              data-part="article"
              data-layout="${first.key}"
              style="flex: 0 0 auto; width: ${first.width}px; height: 100%; align-content: start; gap: 8px ${GAP}px;
                     grid-template-columns: ${first.columns}; overflow: hidden;
                     transition: width 0.4s var(--sp-ease)"
            >
              <p class="sp-text sp-text--ink sp-context" data-part="para-1" style="margin: 0; font-size: 13px; line-height: ${LINE}px">
                A note that comments on one sentence belongs beside that sentence.${ref('1')}
              </p>
              ${note('1')}
              <p class="sp-text sp-text--ink sp-context" data-part="para-2" style="margin: 0; font-size: 13px; line-height: ${LINE}px">
                Tufte set his notes in the margin for exactly this reason.${ref('2')}
              </p>
              ${note('2')}
              <p class="sp-text sp-context" data-part="para-3" style="margin: 0; font-size: 13px; line-height: ${LINE}px">
                Everything else on the page holds still.
              </p>
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="flex: 0 0 auto; height: 40px; width: 442px"></span>
        </div>
      </div>
    </div>
  `;

  const article = part(root, 'article');
  const readout = part(root, 'readout');
  const cells = ['1', '2'].map((id) => ({ id, cell: part(root, `cell-${id}`), note: part(root, `note-${id}`) }));

  const set = (key: string) => {
    const layout = LAYOUTS.find((entry) => entry.key === key);
    if (!layout) return;
    article.dataset.layout = layout.key;
    article.style.width = `${layout.width}px`;
    article.style.gridTemplateColumns = layout.columns;
    for (const { id, cell, note: aside } of cells) {
      cell.hidden = !layout.margin;
      aside.dataset.place = layout.margin ? 'margin' : 'inline';
      aside.style.marginTop = layout.margin ? `${NOTES[id]?.top ?? 0}px` : '0';
    }
    readout.textContent = layout.note;
  };

  part(root, 'layouts').addEventListener('change', (event) => set((event as CustomEvent<string>).detail));

  // A numeral reveals its own note rather than flipping whatever it found, so a resumed pass
  // lands on the note being readable either way (SPEC §8).
  for (const { id, cell } of cells) {
    part(root, `ref-${id}`).addEventListener('click', () => {
      if (article.dataset.layout === 'narrow') cell.hidden = false;
    });
  }

  set(first.key);
}
