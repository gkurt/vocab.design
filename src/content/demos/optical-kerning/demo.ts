import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * The letters are real text in the face this site loads, because the browser's own
 * two states are half the term: `font-kerning: none` is genuinely unkerned and
 * `font-kerning: normal` genuinely applies Geist's kern table. The third state is
 * the one no browser offers, so its values were computed ahead of time against the
 * same file: each pair was rasterized at 200 px, the white between the two outlines
 * measured as a mean gap over the band from cap height to baseline (capped at
 * 0.34 em, past which more space stops reading as more), and the offset solved for
 * until that mean matched the white in "no" at the font's own spacing, 0.217 em.
 *
 * The areas below are that measurement, in ems, not an illustration of it.
 */
const FACE = "'Geist Variable', ui-sans-serif, system-ui, sans-serif";

/** The measured white in "no" with the font's own values: what optical spacing aims at. */
const TARGET = 0.217;
/** Past this much white a gap stops reading as a gap, so the bars are scaled to it. */
const CAP = 0.34;

type Mode = 'none' | 'metric' | 'optical';

interface Pair {
  slug: string;
  left: string;
  right: string;
  /** Mean white between the outlines, in ems, under each setting. */
  white: Record<Mode, number>;
  /** The offset the optical solve landed on, in ems, applied on top of no kerning. */
  optical: number;
}

const PAIRS: Pair[] = [
  { slug: 'av', left: 'A', right: 'V', white: { none: 0.301, metric: 0.204, optical: TARGET }, optical: -0.091 },
  { slug: 'to', left: 'T', right: 'o', white: { none: 0.318, metric: 0.271, optical: TARGET }, optical: -0.157 },
  { slug: 'ye', left: 'Y', right: 'e', white: { none: 0.305, metric: 0.26, optical: TARGET }, optical: -0.131 },
];

const READS: Record<Mode, string> = {
  none: 'no kerning: three different gaps',
  metric: "the font's own pairs: closer, still uneven",
  optical: 'measured from the shapes: one gap, three times',
};

const IS_MODE = (value: string): value is Mode => value === 'none' || value === 'metric' || value === 'optical';

/** Bar track width, so a measurement can be read off against a fixed scale. */
const TRACK = 118;
const SIZE = 44;

function setting(pair: Pair, mode: Mode): string {
  if (mode === 'optical')
    return `<span style="font-kerning: none">${pair.left}<span style="margin-left: ${pair.optical}em">${pair.right}</span></span>`;
  return `<span style="font-kerning: ${mode === 'metric' ? 'normal' : 'none'}">${pair.left}${pair.right}</span>`;
}

function panel(pair: Pair, subject: boolean): string {
  const mode: Mode = 'optical';
  const width = Math.round((pair.white[mode] / CAP) * TRACK);
  return `
    <div class="sp-stack${subject ? '' : ' sp-context'}" style="gap: 7px; align-items: center; width: ${TRACK + 12}px">
      <div style="height: 58px; display: flex; align-items: center; justify-content: center">
        <span data-part="pair-${pair.slug}" ${subject ? 'data-subject data-pose="[data-mode=optical]"' : ''} data-mode="${mode}"
              style="font-family: ${FACE}; font-size: ${SIZE}px; line-height: 1.1; white-space: nowrap">${setting(pair, mode)}</span>
      </div>
      <div data-part="gauge-${pair.slug}" style="width: ${TRACK}px; height: 8px; border-radius: 999px; background: var(--sp-sunken)">
        <div data-part="bar-${pair.slug}" style="width: ${width}px; height: 100%; border-radius: 999px; background: var(--sp-accent);
             transition: width 0.28s var(--sp-ease)"></div>
      </div>
      <span class="sp-label" data-part="value-${pair.slug}" style="font-variant-numeric: tabular-nums">${pair.white[mode].toFixed(3)} em of white</span>
    </div>`;
}

/**
 * Optical kerning specimen: three awkward pairs set unkerned, kerned from the font's
 * own table, and kerned from the shapes, with the white each setting leaves drawn as a
 * bar under the pair. The bars are the argument: the font's values bring the three
 * pairs closer but leave them uneven, and only the optical setting lands them level,
 * which is what "space by looking at the shapes" means when it is measured.
 *
 * The subject is the AV pair, the narrowest thing the term names: a kerned pair. The
 * other two pairs are the comparison that makes one bar readable, so they sit in the
 * context register (SPEC §5). Two of the three settings are the counter-example the
 * subject itself passes through, so the honest condition is declared in `data-pose`
 * and the specimen mounts optical (SPEC §6).
 *
 * Every pair sits in a fixed box over a fixed track, so a setting that pulls the
 * letters together moves nothing else (SPEC §5).
 *
 * The chip naming the setting changes with the pick, so it is the stage's verdict and is
 * drawn in the strip rather than sitting under the pairs. The key beside it ("bars: white
 * per pair") went altogether: every bar already prints its own measurement in ems.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="optical" data-axis="Kerning" data-term="optical">
            <button class="sp-segment" data-part="seg-none" value="none">none</button>
            <button class="sp-segment" data-part="seg-metric" value="metric">metric</button>
            <button class="sp-segment" data-part="seg-optical" value="optical">optical</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 10px; justify-content: center; margin-top: 10px">
          ${PAIRS.map((pair) => panel(pair, pair.slug === 'av')).join('')}
        </div>
        <span class="sp-chip sp-context" data-stage-verdict data-part="readout" style="cursor: default">${READS.optical}</span>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (!IS_MODE(value)) return;
    for (const pair of PAIRS) {
      const glyphs = part(root, `pair-${pair.slug}`);
      glyphs.dataset.mode = value;
      glyphs.innerHTML = setting(pair, value);
      part(root, `bar-${pair.slug}`).style.width = `${Math.round((pair.white[value] / CAP) * TRACK)}px`;
      part(root, `value-${pair.slug}`).textContent = `${pair.white[value].toFixed(3)} em of white`;
    }
    readout.textContent = READS[value];
  });
}
