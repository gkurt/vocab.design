import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const MONO = 'font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px';
const ROW_H = 20;
const GUT = 18;

/**
 * Added and removed are the term's own encoding, so the two tints are painted here
 * rather than borrowed from the kit, which has one accent on purpose. Both are stated
 * as low-alpha washes so they read over the light and the dark surface alike, and the
 * gutter sign carries the same distinction without colour.
 */
const ADD_ROW = 'rgb(45 160 90 / 0.16)';
const DEL_ROW = 'rgb(207 91 82 / 0.14)';
const ADD_WORD = 'rgb(45 160 90 / 0.42)';
const DEL_WORD = 'rgb(207 91 82 / 0.36)';
const ADD_INK = '#2f8f5b';
const DEL_INK = '#c25a52';

/** Alignment padding: hatched on purpose, because a plain blank row reads as deleted text. */
const STRIPES = 'repeating-linear-gradient(135deg, var(--sp-line) 0 1px, transparent 1px 6px)';

const A = 'function total(rows) {';
const B = '  let sum = 0';
const C = '  log(rows)';
const F = '  return sum';
const G = '}';
const E = '  if (!rows.length) return 0';

/** The one changed line, marked down to the run that actually differs. */
const OLD_CHANGED = `  for (r of rows) sum += ${word('r.n', DEL_WORD, 'word-old')}`;
const NEW_CHANGED = `  for (r of rows) sum += ${word('r.qty', ADD_WORD, 'word', true)}`;

function word(text: string, tint: string, name: string, subject = false): string {
  return `<span
    data-part="${name}"${subject ? ' data-subject' : ''}
    style="display: inline-block; padding: 0 1px; margin: 0 -1px; border-radius: 2px; background: ${tint}"
  >${text}</span>`;
}

type Cell = { n?: number; sign?: '+' | '-'; text?: string; part?: string; gap?: boolean };

function gutter(n?: number): string {
  return `<span style="flex: 0 0 auto; width: ${GUT}px; text-align: right; ${MONO}; font-size: 9px; color: var(--sp-muted)">${n ?? ''}</span>`;
}

function code(cell: Cell): string {
  const ink = cell.sign === '+' ? ADD_INK : cell.sign === '-' ? DEL_INK : 'var(--sp-muted)';
  return `
    <span style="flex: 0 0 auto; width: 9px; text-align: center; ${MONO}; color: ${ink}">${cell.sign ?? ''}</span>
    <span style="flex: 1 1 auto; min-width: 0; padding-right: 4px; ${MONO}; line-height: ${ROW_H}px; white-space: pre; overflow: hidden">${cell.text ?? ''}</span>
  `;
}

function cellBox(cell: Cell, gutters: (number | undefined)[]): string {
  if (cell.gap) {
    return `<span data-part="${cell.part}" style="display: block; flex: 1 1 0; min-width: 0; height: ${ROW_H}px; background: ${STRIPES}; opacity: 0.7"></span>`;
  }
  const tint = cell.sign === '+' ? ADD_ROW : cell.sign === '-' ? DEL_ROW : 'transparent';
  const partAttr = cell.part ? ` data-part="${cell.part}"` : '';
  return `<span${partAttr} style="display: flex; flex: 1 1 0; min-width: 0; align-items: center; height: ${ROW_H}px; padding-left: 3px; background: ${tint}">
    ${gutters.map(gutter).join('')}${code(cell)}
  </span>`;
}

function splitBody(): string {
  const rows: [Cell, Cell][] = [
    [
      { n: 1, text: A },
      { n: 1, text: A },
    ],
    [
      { n: 2, text: B },
      { n: 2, text: B },
    ],
    [
      { n: 3, sign: '-', text: C, part: 'row-del' },
      { gap: true, part: 'gap-right' },
    ],
    [
      { n: 4, sign: '-', text: OLD_CHANGED },
      { n: 3, sign: '+', text: NEW_CHANGED, part: 'row-chg' },
    ],
    [
      { gap: true, part: 'gap-left' },
      { n: 4, sign: '+', text: E, part: 'row-add' },
    ],
    [
      { n: 5, text: F },
      { n: 5, text: F },
    ],
    [
      { n: 6, text: G },
      { n: 6, text: G },
    ],
  ];
  return rows
    .map(
      ([left, right]) => `<span style="display: flex; align-items: stretch; height: ${ROW_H}px">
        ${cellBox(left, [left.n])}
        <span style="flex: 0 0 1px; background: var(--sp-line)"></span>
        ${cellBox(right, [right.n])}
      </span>`,
    )
    .join('');
}

function unifiedBody(): string {
  const rows: [number | undefined, number | undefined, Cell][] = [
    [1, 1, { text: A }],
    [2, 2, { text: B }],
    [3, undefined, { sign: '-', text: C, part: 'row-del' }],
    [4, undefined, { sign: '-', text: OLD_CHANGED }],
    [undefined, 3, { sign: '+', text: NEW_CHANGED, part: 'row-chg' }],
    [undefined, 4, { sign: '+', text: E, part: 'row-add' }],
    [5, 5, { text: F }],
    [6, 6, { text: G }],
  ];
  return rows
    .map(
      ([oldN, newN, cell]) => `<span style="display: flex; align-items: stretch; height: ${ROW_H}px">
        ${cellBox(cell, [oldN, newN])}
      </span>`,
    )
    .join('');
}

/**
 * Diff viewer specimen: six lines of one file in two versions, with a line removed, a
 * line added, and a line changed down to a single identifier. The segmented control
 * names the term's own axis, split against unified, in absolute picks rather than as a
 * toggle (SPEC §8), and the two layouts are drawn into a box whose height is reserved
 * for the taller of them, so switching moves nothing (SPEC §5).
 *
 * The subject is the marked run inside the changed line, not the viewer around it: the
 * term is the marking of what differs, and a whole pane would claim the window. That
 * run is marked in both layouts, so no `data-pose` condition is needed. The code itself
 * is left uncoloured on purpose, since a second encoding inside the same box would
 * compete with the one the term is about.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 288px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">total.js</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="picker" data-axis="Layout" data-value="split">
            <button class="sp-segment" type="button" data-part="seg-split" value="split" style="padding: 4px 10px; font-size: 12px">Split</button>
            <button class="sp-segment" type="button" data-part="seg-unified" value="unified" style="padding: 4px 10px; font-size: 12px">Unified</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 12px">
          <div class="sp-surface" data-part="diff" data-mode="split" style="width: 440px; overflow: hidden">
            <div class="sp-row" data-part="rule" style="height: ${ROW_H}px; padding: 0 8px; border-bottom: 1px solid var(--sp-line)">
              <span class="sp-label sp-grow" data-part="rule-left" style="font-size: 10px">1a2f3c &middot; before</span>
              <span class="sp-label" data-part="rule-right" style="font-size: 10px">HEAD &middot; after</span>
            </div>
            <div data-part="body" style="height: ${ROW_H * 8}px"></div>
          </div>

          <p class="sp-label" data-stage-verdict data-part="caption" style="margin: 0; width: 440px; font-size: 11px">
            Striped rows are alignment padding, not missing code.
          </p>
        </div>
      </div>
    </div>
  `;

  const diff = part(root, 'diff');
  const body = part(root, 'body');
  const ruleLeft = part(root, 'rule-left');
  const ruleRight = part(root, 'rule-right');

  const render = (mode: string) => {
    diff.dataset.mode = mode;
    body.innerHTML = mode === 'unified' ? unifiedBody() : splitBody();
    ruleLeft.textContent = mode === 'unified' ? '@@ -1,6 +1,6 @@' : '1a2f3c · before';
    ruleRight.textContent = mode === 'unified' ? 'total.js' : 'HEAD · after';
  };

  part(root, 'picker').addEventListener('change', (event) => render((event as CustomEvent<string>).detail));
  render('split');
}
