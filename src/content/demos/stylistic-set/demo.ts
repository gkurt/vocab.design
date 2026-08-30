import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * A real set, in a face that carries one. Fira Code ships ten of them, and its
 * ninth redraws the four assignment operators below while leaving the equality
 * pair beside them alone (that pair is `ss08`, a different set, deliberately not
 * the one on the switch). Checked glyph by glyph before this was authored, which
 * is also how the six samples were chosen.
 *
 * The face comes from the type designer's own release rather than from a web
 * subset: Google's subsetter keeps `calt` and drops every `ssXX` table, so the
 * same family served from there would answer this switch with silence. That is
 * the term's own trap, and a specimen is not the place to reproduce it.
 */
const MONO = "'Fira Code', ui-monospace, monospace";
const SIZE = 40;

type Cell = { token: string; part: string };

/** Four the set redraws, then the two it does not, in the order the run reads. */
const CELLS: Cell[] = [
  { token: '&gt;&gt;=', part: 'shr' },
  { token: '&lt;&lt;=', part: 'shl' },
  { token: '||=', part: 'or' },
  { token: '|=', part: 'pipe' },
  { token: '==', part: 'eq' },
  { token: '!=', part: 'noteq' },
];

const READ = {
  on: 'ss09 1',
  off: 'ss09 0',
} as const;

const VERDICT = {
  on: 'Four drawings arrive together under one tag. The equality pair belongs to another set and does not move.',
  off: 'The family’s own drawings, with every set in the file switched off.',
} as const;

type Mode = keyof typeof READ;
const IS_MODE = (value: string): value is Mode => value in READ;

/**
 * Stylistic set specimen: six operators in one code face, one switch, four of
 * them redrawn together. The switch is absolute (0 and 1, the values the feature
 * takes), and what it demonstrates is the grouping: nothing here can be turned on
 * one glyph at a time, which is what makes a set a set rather than four requests.
 * The two that stay put are the proof that a set has an extent, and that the
 * extent is the designer's, not the reader's.
 *
 * The subject is the glyph run the feature is applied to (SPEC §5): a set is
 * asked of a run of text, and the operators it leaves alone are part of that run.
 * The off state is the counter-example the run itself passes through, so the
 * honest condition is declared in `data-pose` and the specimen mounts with the
 * set on (SPEC §6). The tag, the picker and the readout are the demo's own
 * instrumentation and stay in the context register.
 *
 * Nothing is measured and nothing moves: an alternate in a monospaced face keeps
 * the advance of the drawing it replaces, which was checked per token (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const cell = ({ token, part: name }: Cell) => `<span data-part="cell-${name}">${token}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-feature-settings: "ss09"</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="on" data-axis="Value" data-term="on">
            <button class="sp-segment" data-part="seg-off" value="off">0</button>
            <button class="sp-segment" data-part="seg-on" value="on">1</button>
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="run" data-subject data-ss="on" data-pose="[data-ss=on]"
             style="gap: 22px; justify-content: center; align-items: baseline; height: 76px; margin-top: 12px;
                    font-family: ${MONO}; font-size: ${SIZE}px; line-height: 1.15; font-feature-settings: 'ss09' 1">
          ${CELLS.map(cell).join('')}
        </div>
        <div class="sp-row sp-context" style="height: 30px">
          <span class="sp-chip" data-part="readout" style="cursor: default">${READ.on}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 4px">${VERDICT.on}</p>
      </div>
    </div>
  `;

  const run = part(root, 'run');
  const readout = part(root, 'readout');
  const caption = part(root, 'caption');

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (!IS_MODE(value)) return;
    run.dataset.ss = value;
    run.style.fontFeatureSettings = `'ss09' ${value === 'on' ? 1 : 0}`;
    readout.textContent = READ[value];
    caption.textContent = VERDICT[value];
  });
}
