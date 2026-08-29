import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The two Material 1 keylines, scaled to this frame: content edge, and where row text starts. */
const EDGE = 16;
const KEYLINE = 60;
const LEAD_GAP = 12;
const ROW_H = 44;
const PANEL_W = 380;

const MODES = [
  { key: 'on', label: 'on the keyline' },
  { key: 'off', label: 'ragged' },
];

const NOTES: Record<string, string> = {
  on: 'Four leading elements of different widths, and one line the text starts on.',
  off: 'Text following each element instead: three rows now miss the line.',
};

interface Row {
  key: string;
  /** Width of whatever leads the row, which is what makes the ragged case ragged. */
  lead: number;
  markup: string;
  lines: [number, number];
}

const ROWS: Row[] = [
  { key: '1', lead: 32, markup: '<span class="sp-avatar" style="width: 32px; height: 32px">AL</span>', lines: [64, 40] },
  {
    key: '2',
    lead: 24,
    markup: `<span class="sp-icon-button" style="width: 24px; height: 24px; border: 1px solid var(--sp-line)">${icon('bell')}</span>`,
    lines: [56, 44],
  },
  {
    key: '3',
    lead: 20,
    markup: '<span style="width: 20px; height: 20px; border-radius: 5px; background: var(--sp-line)"></span>',
    lines: [68, 36],
  },
  { key: '4', lead: 28, markup: '<span class="sp-avatar">RM</span>', lines: [52, 46] },
];

/**
 * Keyline specimen: a list whose four rows are led by elements of four different widths, and a
 * pick between starting every row's text on one line and letting each text follow its own
 * leading element. The keyline is invisible in real work, so the demo draws it: a 3px rule at
 * the text line, wide enough to be a real box rather than a hairline (SPEC §5), plus the
 * content-edge keyline drawn quietly behind the avatars.
 *
 * The subject is the drawn keyline, `data-part="keyline"`. The line is the term, and it is a
 * feature with no element of its own, so it is given one sized to its extent (SPEC §5). It is
 * the term in both states, since a keyline that rows miss is still the line they missed, so no
 * pose is needed.
 *
 * The rows, their leading elements and the edge keyline are scenery in the context register. The
 * two states differ only in the space after the leading element, so every row box, the panel and
 * the two drawn lines stay exactly where they were (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const rows = ROWS.map(
    (row) => `
      <div class="sp-context" data-part="row-${row.key}" style="display: flex; align-items: center; gap: ${KEYLINE - EDGE - row.lead}px; height: ${ROW_H}px; padding-left: ${EDGE}px; transition: gap 320ms var(--sp-ease)">
        ${row.markup}
        <span
          data-part="text-${row.key}"
          data-fit="on"
          style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 auto; min-width: 0; padding-right: ${EDGE}px"
        >
          <span class="sp-line" style="width: ${row.lines[0]}%; height: 7px"></span>
          <span class="sp-line" style="width: ${row.lines[1]}%; height: 6px"></span>
        </span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Row text</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-axis="Rows" data-value="on">
            ${MODES.map(
              (mode) => `
              <button class="sp-segment" type="button" data-part="seg-${mode.key}" value="${mode.key}" style="padding: 4px 9px; font-size: 11px; white-space: nowrap">${mode.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div class="sp-surface" data-part="list" data-align="on" style="position: relative; width: ${PANEL_W}px; padding: 6px 0; overflow: hidden">
            ${rows}
            <div class="sp-context" data-part="edge" style="position: absolute; top: 6px; bottom: 6px; left: ${EDGE - 2}px; width: 2px; background: var(--sp-accent); opacity: 0.5"></div>
            <div
              data-part="keyline"
              data-subject
              style="position: absolute; top: 4px; bottom: 4px; left: ${KEYLINE - 1}px; width: 3px; z-index: 2;
                     background: var(--sp-accent); border-radius: 2px"
            ></div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center">${NOTES.on}</span>
    </div>
  `;

  const list = part(root, 'list');
  const note = part(root, 'note');

  const apply = (key: string) => {
    list.dataset.align = key;
    for (const row of ROWS) {
      // Aligned, the space after the leading element is sized to reach the keyline; ragged, every
      // row gets the same small gap and the text starts wherever its own element ended.
      const natural = EDGE + row.lead + LEAD_GAP;
      part(root, `row-${row.key}`).style.gap = `${key === 'on' ? KEYLINE - EDGE - row.lead : LEAD_GAP}px`;
      part(root, `text-${row.key}`).dataset.fit = key === 'on' || natural === KEYLINE ? 'on' : 'off';
    }
    note.textContent = NOTES[key] ?? '';
  };

  part(root, 'modes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  // Mount aligned, which is the decision the term names.
  apply('on');
}
