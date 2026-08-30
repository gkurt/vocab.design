import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Checked in the browser first, by pixel: `calt` on and off render identically in
 * every face this page can reach (Geist, Geist Mono, Source Serif 4, Georgia,
 * Hoefler Text, Palatino, Baskerville, Optima, Helvetica, and the script faces
 * Zapfino, Apple Chancery and Snell Roundhand, which are the ones most likely to
 * carry the rules). Not one substitutes anything. So the alternates here are
 * SWAPPED IN BY HAND: the contextual form of each pair is a real character in the
 * same face, laid over the literal characters, and the switch stands for the
 * substitution the shaping engine would have made.
 */
const MONO = "'Geist Mono Variable', ui-monospace, monospace";
const SIZE = 40;

type Cell = {
  /** The characters as typed, always occupying the run's space. */
  literal: string;
  /** The contextual form, or null where no neighbour asks for one. */
  alternate: string | null;
  part: string;
  label: string;
};

const CELLS: Cell[] = [
  { literal: '-&gt;', alternate: '→', part: 'arrow', label: 'arrow' },
  { literal: '!=', alternate: '≠', part: 'noteq', label: 'not equal' },
  { literal: 'n-1', alternate: null, part: 'plain', label: 'hyphen' },
];

const READ = {
  on: 'calt on',
  off: 'calt off',
} as const;

type Mode = keyof typeof READ;
const IS_MODE = (value: string): value is Mode => value in READ;

/**
 * Contextual alternates specimen: three runs in one mono face under one switch.
 * Two of them are pairs a code face has a rule for, and they change together;
 * the third is a hyphen with a digit on either side, which no rule mentions, and
 * it is identical in both states. That asymmetry is the term: the substitution is
 * not asked for glyph by glyph, it fires where the neighbour calls for it.
 *
 * The subject is the run whose glyphs the rule replaces (SPEC §5): the two
 * characters of the pair, not the row of samples and not the cell's label. The
 * off state is the counter-example that run itself passes through, so the honest
 * condition is declared in `data-pose` and the specimen mounts with the feature
 * on (SPEC §6). The picker, the labels, the readout and the caption are the
 * demo's own instrumentation and stay in the context register.
 *
 * Three strings were the site talking over its own specimen. A line above the samples read
 * "the neighbour decides which drawing is used", which is the definition, and went. The third
 * cell was labelled "no rule for this one" where its neighbours were labelled by glyph name,
 * so it is labelled "hyphen" now. The readout chip spelled out what to look at ("calt on: the
 * pair is redrawn, the lone hyphen is not") and now prints the feature state alone, the way a
 * type tester would; the strip's caption already carries the reading.
 *
 * Nothing is measured and nothing moves: each alternate is absolutely positioned
 * over its own run, and the literal characters keep their space by going
 * invisible rather than absent, so a pick cannot shift a neighbour (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const cell = ({ literal, alternate, part: name, label }: Cell) => `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; width: 130px">
      <span data-part="run-${name}"${name === 'arrow' ? ' data-subject data-pose="[data-calt=on]"' : ''} data-calt="on"
            style="position: relative; display: inline-block; font-family: ${MONO}; font-size: ${SIZE}px; line-height: 1.15">
        <span data-part="lit-${name}">${literal}</span>
        ${
          alternate
            ? `<span data-part="alt-${name}" style="position: absolute; inset: 0; display: flex; align-items: center;
                     justify-content: center; font-size: 1.15em">${alternate}</span>`
            : ''
        }
      </span>
      <span class="sp-label" style="text-align: center; line-height: 1.3">${label}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
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
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 4px">
          No face this page can reach substitutes anything for calt, so each contextual form is laid over the
          characters it stands for. What is real is that the pairs change together and the lone hyphen is left
          alone.
        </p>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');
  const pairs = ['arrow', 'noteq'] as const;

  const apply = (value: string) => {
    if (!IS_MODE(value)) return;
    for (const name of pairs) {
      const run = part(root, `run-${name}`);
      run.dataset.calt = value;
      part(root, `lit-${name}`).style.visibility = value === 'on' ? 'hidden' : 'visible';
      part(root, `alt-${name}`).style.visibility = value === 'on' ? 'visible' : 'hidden';
    }
    part(root, 'run-plain').dataset.calt = value;
    readout.textContent = READ[value];
  };

  apply('on');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
