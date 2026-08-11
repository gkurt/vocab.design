/*
 * Two faces chosen for the widest x-height difference among fonts a machine is
 * likely to have, since a specimen about a typeface's proportions cannot be set
 * in the kit's single sans (SPEC §5). Named families first, generic last.
 */
const LARGE = "Verdana, 'DejaVu Sans', 'Liberation Sans', sans-serif";
const SMALL = "'Times New Roman', 'Liberation Serif', 'Nimbus Roman', serif";
const SAMPLE = 'xhp';
const SIZE = 62;
const COLUMN = 176;

/**
 * X-height specimen: one size, two faces, ruled. The solid line is the baseline
 * both samples sit on, the dashed line is the top of each face's own lowercase,
 * and the gap between the two dashed lines is the whole term: identical declared
 * size, visibly different letters.
 *
 * The rules are drawn without measuring anything. Each sample carries a
 * zero-height inline-block whose bottom edge lands on the baseline by inline
 * layout, and `1ex` inside it resolves to that face's own x-height, so the
 * ruling is the font's metric rather than the demo's guess (and no read follows
 * a style write, per SPEC §5).
 *
 * The subject is the ruled pair. An x-height is a distance from a baseline to a
 * mean line, so the narrowest thing that shows one is a sample with its two
 * rules on it; ringing a single column would claim the term names that face
 * rather than the measurement both of them have.
 */
export function mount(root: HTMLElement): void {
  const rule = (offset: string, style: string) =>
    `<span style="position: absolute; left: 0; bottom: ${offset}; width: ${COLUMN}px; height: 0; border-top: ${style}"></span>`;

  const sample = (name: string, family: string, gap: number) => `
    <span data-part="${name}" style="display: inline-block; vertical-align: baseline; width: ${COLUMN}px;
          margin-left: ${gap}px; font-family: ${family}; font-size: ${SIZE}px; line-height: 1.3">
      <span style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">
        ${rule('0', '1px solid var(--sp-line)')}
        ${rule('1ex', '1px dashed var(--sp-accent)')}
      </span>${SAMPLE}
    </span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 430px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Same size, two faces</span>
          <span class="sp-label" style="font-variant-numeric: tabular-nums">${SIZE}px</span>
        </div>
        <div class="sp-row sp-context" style="gap: 0; margin-top: 10px">
          <span class="sp-label" style="width: ${COLUMN}px">large x-height</span>
          <span class="sp-label" style="width: ${COLUMN}px; margin-left: 18px">small x-height</span>
        </div>
        <div data-part="ruled" data-subject style="margin-top: 2px; font-size: 0; white-space: nowrap">
          ${sample('sample-large', LARGE, 0)}${sample('sample-small', SMALL, 18)}
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 10px">
          Solid line: the baseline, shared. Dashed line: the top of the lowercase x. Both columns
          are set at ${SIZE}px; the face on the left spends more of that size on its lowercase.
        </p>
      </div>
    </div>
  `;
}
