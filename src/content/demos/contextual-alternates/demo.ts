import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Real substitution, in a face this site loads for exactly this reason. Fira
 * Code's own release carries the `calt` table (Google's web subset of it does
 * too, which is the one feature their subsetter keeps), so the switch below asks
 * the shaping engine the actual question and the glyphs answer. Nothing is drawn
 * on top of anything.
 *
 * The pairs keep their advances through the substitution, measured before this
 * was authored: `->` off and `->` on are the same width, because a two-character
 * ligature in a monospaced face is drawn across two cells. So the row cannot
 * move when the feature changes.
 */
const MONO = "'Fira Code', ui-monospace, monospace";
const SIZE = 40;

type Cell = {
  /** The characters as typed. What the face does with them is the demonstration. */
  text: string;
  part: string;
  label: string;
};

const CELLS: Cell[] = [
  { text: '-&gt;', part: 'arrow', label: 'arrow' },
  { text: '!=', part: 'noteq', label: 'not equal' },
  { text: 'n-1', part: 'plain', label: 'hyphen' },
];

const READ = {
  on: 'calt 1',
  off: 'calt 0',
} as const;

const VERDICT = {
  on: 'Each pair is drawn as one glyph. The hyphen between two digits is left as typed.',
  off: 'Every character is drawn as typed, including the two the face has a rule for.',
} as const;

type Mode = keyof typeof READ;
const IS_MODE = (value: string): value is Mode => value in READ;

/**
 * Contextual alternates specimen: three runs in one code face under one switch.
 * Two of them are pairs Fira Code has a rule for, and they change together; the
 * third is a hyphen with a digit on either side, which no rule mentions, and it
 * is identical in both states. That asymmetry is the term: the substitution is
 * not asked for glyph by glyph, it fires where the neighbour calls for it.
 *
 * The subject is the run whose glyphs the rule replaces (SPEC §5): the two
 * characters of the pair, not the row of samples and not the cell's label. The
 * off state is the counter-example that run itself passes through, so the honest
 * condition is declared in `data-pose` and the specimen mounts with the feature
 * on (SPEC §6). The picker, the labels and the readout are the demo's own
 * instrumentation and stay in the context register.
 *
 * Nothing is measured and nothing moves: a ligature in a monospaced face keeps
 * the advances of the characters it replaces (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const cell = ({ text, part: name, label }: Cell) => `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; width: 130px">
      <span data-part="run-${name}"${name === 'arrow' ? ' data-subject data-pose="[data-calt=on]"' : ''} data-calt="on"
            style="display: inline-block; font-family: ${MONO}; font-size: ${SIZE}px; line-height: 1.15">${text}</span>
      <span class="sp-label" style="text-align: center; line-height: 1.3">${label}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-variant-ligatures</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="font-variant-ligatures" data-term="on" data-part="segmented" data-value="on">
            <button class="sp-segment" data-part="seg-off" value="off">no-contextual</button>
            <button class="sp-segment" data-part="seg-on" value="on">contextual</button>
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="samples" style="justify-content: center; gap: 12px; height: 84px; margin-top: 14px">
          ${CELLS.map(cell).join('')}
        </div>
        <div class="sp-row sp-context" style="height: 30px">
          <span class="sp-chip" data-part="readout" style="cursor: default">${READ.on}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 4px">${VERDICT.on}</p>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');
  const caption = part(root, 'caption');

  const apply = (value: string) => {
    if (!IS_MODE(value)) return;
    for (const { part: name } of CELLS) {
      const run = part(root, `run-${name}`);
      run.dataset.calt = value;
      run.style.fontVariantLigatures = value === 'on' ? 'contextual' : 'no-contextual';
      run.style.fontFeatureSettings = value === 'on' ? "'calt' 1" : "'calt' 0";
    }
    readout.textContent = READ[value];
    caption.textContent = VERDICT[value];
  };

  apply('on');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
