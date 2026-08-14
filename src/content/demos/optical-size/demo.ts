/*
 * The site's own serif, checked against the file that actually loads: Source
 * Serif 4 ships an `opsz` axis in the wild, but the weight-axis subset this page
 * imports does not carry it, so `font-variation-settings: 'opsz'` renders
 * identically at 8 and at 60 here. Rather than screenshot a declaration doing
 * nothing, the two cuts are simulated with the axis this file does carry
 * (`wght`) plus tracking, and the caption says so out loud. The differences
 * chosen are the ones an optical size axis really makes: sturdier stems and
 * looser fit for the small cut, finer stems and tighter fit for the large one.
 */
const FAMILY = "'Source Serif 4 Variable', Georgia, 'Liberation Serif', serif";
const SAMPLE = 'Handgloves';
/** One rendered size for both cuts, so the drawing is the only thing that differs. */
const SHOWN = 40;
const ROW = 48;

const CUTS = [
  { part: 'caption-cut', note: 'drawn for small sizes', wght: 500, track: 0.028, size: 9 },
  { part: 'display-cut', note: 'drawn for large sizes', wght: 320, track: -0.014, size: 40 },
];

/**
 * Optical size specimen: one design, two cuts, both set at the same rendered
 * size so the drawing is the only variable. The small cut is heavier in the stem
 * and looser in the fit; the large cut is finer and tighter. Below, in the
 * scenery, the sizes each cut is actually for, which is where the compensation
 * stops looking like a style choice and starts looking obvious.
 *
 * The subject is the pair. Optical size is a relationship between two drawings
 * of one design, so a single line cannot be it: ringing one cut would claim the
 * term names a weight. The labels beside the pair and the row underneath are the
 * demo's own instrumentation (SPEC §5) and stay in the context register.
 */
export function mount(root: HTMLElement): void {
  const cut = (part: string, wght: number, track: number, size: number) =>
    `<span data-part="${part}" style="font-family: ${FAMILY}; font-size: ${size}px; line-height: 1.15;
           font-variation-settings: 'wght' ${wght}; letter-spacing: ${track}em">${SAMPLE}</span>`;

  const notes = CUTS.map(({ note }) => `<span class="sp-row sp-label" style="height: ${ROW}px; width: 136px">${note}</span>`);
  const samples = CUTS.map((c) => `<span class="sp-row" style="height: ${ROW}px">${cut(c.part, c.wght, c.track, SHOWN)}</span>`);
  const natives = CUTS.map((c) => cut(`${c.part}-native`, c.wght, c.track, c.size));

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">One design, two cuts</span>
          <span class="sp-label" style="font-variant-numeric: tabular-nums">both shown at ${SHOWN}px</span>
        </div>
        <div class="sp-row" style="gap: 12px; margin-top: 8px; align-items: stretch">
          <div class="sp-stack sp-context" style="gap: 0; flex: 0 0 auto">
            ${notes.join('')}
          </div>
          <div class="sp-stack" data-part="pair" data-subject style="gap: 0">
            ${samples.join('')}
          </div>
        </div>
        <div class="sp-divider sp-context" style="margin: 6px 0"></div>
        <div class="sp-row sp-row--between sp-context" data-part="intended" style="height: 48px">
          <span class="sp-label" style="width: 136px">at the sizes they are for</span>
          <span class="sp-row" style="gap: 20px; align-items: baseline">
            ${natives.join('')}
          </span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 2px">
          Sturdier stems and looser spacing for the small cut, finer stems and a tighter fit for the
          large one. Simulated with the weight axis: the serif this page loads carries wght alone.
        </p>
      </div>
    </div>
  `;
}
