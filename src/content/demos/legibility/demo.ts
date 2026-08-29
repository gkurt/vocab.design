import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Two real font stacks rather than a simulation. The upper row asks for Arial
 * and its clones, where capital I and lowercase l are the same vertical stroke
 * and the zero is the capital O slightly narrowed; the lower row asks for a face
 * drawn for code, where the I is serifed, the l carries a tail, the one has a
 * foot and the zero is cut through. Named families first, generic last, so a
 * machine without either still falls back on a face with the same habit.
 */
const GROTESQUE = "Arial, Helvetica, 'Liberation Sans', 'DejaVu Sans', sans-serif";
const CODE = "Consolas, 'DejaVu Sans Mono', 'Liberation Mono', ui-monospace, monospace";

/** The confusable clusters, each shown isolated and then inside something a reader would meet. */
const SETS: Record<string, { glyphs: string; word: string; names: string }> = {
  il1: { glyphs: 'Il1', word: 'Illinois 1041', names: 'capital I, lowercase l, digit one' },
  o0: { glyphs: 'O0', word: 'code O0O0', names: 'capital O, digit zero' },
  rnm: { glyphs: 'rn m', word: 'modern, warm', names: 'the r and n pair against a single m' },
};

/** Room for the tallest cluster, so changing the set moves nothing (SPEC §5). */
const ROW = 52;

/**
 * Legibility specimen: one cluster of confusable characters, set twice at the
 * same size in two faces, with nothing else different between the rows. The
 * segmented control picks which cluster is on show, an absolute pick rather than
 * a flip, and both rows always carry it, because the comparison is the term.
 *
 * The subject is the run set in the face drawn to separate them. Legibility is a
 * property of a drawing, so the narrowest honest ring is one run of characters,
 * not the panel around it; the grotesque row above is the counter-example and
 * stays in the context register with the labels and the caption. The subject
 * never changes face, so it is the term at every resting state and needs no
 * `data-pose`.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Told apart, or not</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Glyphs" data-part="segmented" data-value="il1">
            <button class="sp-segment" data-part="seg-il1" value="il1">I l 1</button>
            <button class="sp-segment" data-part="seg-o0" value="o0">O 0</button>
            <button class="sp-segment" data-part="seg-rnm" value="rnm">rn m</button>
          </sp-segmented>
        </div>
        <div class="sp-row sp-context" data-part="row-grotesque" style="gap: 14px; height: ${ROW}px; margin-top: 4px">
          <span class="sp-label" style="width: 128px">a grotesque sans</span>
          <span data-part="glyphs-grotesque" style="font-family: ${GROTESQUE}; font-size: 34px; line-height: 1.1"></span>
          <span class="sp-grow" data-part="word-grotesque"
                style="font-family: ${GROTESQUE}; font-size: 13px; color: var(--sp-muted); text-align: right"></span>
        </div>
        <div class="sp-divider sp-context"></div>
        <div class="sp-row" data-part="row-code" style="gap: 14px; height: ${ROW}px">
          <span class="sp-label sp-context" style="width: 128px">a face drawn for code</span>
          <span data-part="glyphs-code" data-subject data-set="il1"
                style="font-family: ${CODE}; font-size: 34px; line-height: 1.1"></span>
          <span class="sp-grow sp-context" data-part="word-code"
                style="font-family: ${CODE}; font-size: 13px; color: var(--sp-muted); text-align: right"></span>
        </div>
        <div class="sp-row sp-context" style="gap: 6px; height: 18px; margin-top: 6px">
          <span class="sp-label">showing</span>
          <span class="sp-label" data-part="names" style="color: var(--sp-ink)"></span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 4px">
          Same characters, same size, same colour. Only the drawing changed: a tail on the l, serifs on
          the I, a cut through the zero.
        </p>
      </div>
    </div>
  `;

  const apply = (value: string) => {
    const set = SETS[value];
    if (!set) return;
    for (const name of ['grotesque', 'code']) {
      part(root, `glyphs-${name}`).textContent = set.glyphs;
      part(root, `word-${name}`).textContent = set.word;
    }
    part(root, 'glyphs-code').dataset.set = value;
    part(root, 'names').textContent = set.names;
  };

  apply('il1');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
