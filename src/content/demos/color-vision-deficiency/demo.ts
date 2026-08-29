import { icon } from '#src/kit/icons.ts';
import { part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Coding = 'hue' | 'redundant';

type Row = { key: string; name: string; word: string; glyph: 'check' | 'alert' | 'minus'; color: string };

const ROWS: Row[] = [
  { key: 'pass', name: 'api', word: 'Passing', glyph: 'check', color: '#2f7d5b' },
  { key: 'fail', name: 'web', word: 'Failing', glyph: 'alert', color: '#d2453b' },
  { key: 'idle', name: 'docs', word: 'Queued', glyph: 'minus', color: '#8b8f98' },
];

/** Twelve steps around the hue circle at one lightness, so the collapse is the only change. */
const RAMP = Array.from({ length: 12 }, (_, i) => `oklch(0.7 0.16 ${i * 30})`);

/**
 * Viénot/Brettel-style approximation of deuteranopia, the matrix simulators have used for
 * years. It is an approximation, and the specimen says so on the panel it filters.
 */
const DEUTAN = '0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0';

const READOUT = {
  hue: 'Passing and Failing land on one olive',
  redundant: 'Shape and word survive the filter',
} as const;

const CAPTION = {
  hue: 'Hue carries the status alone. The left panel reads fine, and its deuteranopia simulation loses the pass/fail pair.',
  redundant: 'The same statuses said twice, with a shape and a word. Both panels answer, so the hues stop being load-bearing.',
} as const;

/**
 * Color vision deficiency specimen: one build status list drawn twice, on the right through an
 * feColorMatrix approximation of deuteranopia, labelled as the simulation it is. Above each
 * list, the same twelve hues walked around the circle, which collapse to a blue and yellow
 * axis under the filter. The segmented control adds the shape and the word back, and the
 * simulated panel goes from unreadable to readable without a single colour changing.
 *
 * The subject is the simulated panel, the narrowest element that is the term: reduced hue
 * discrimination, made visible. The normal panel is the reference the eye compares against
 * and sits in the context register with the caption and readout (SPEC §5). The subject is the
 * term in both codings (a simulation of the fixed row is still a simulation of the deficiency),
 * so no `data-pose` is needed. Icons and status words are hidden in place rather than removed,
 * so switching codings repaints and moves nothing.
 */
export function mount(root: HTMLElement): void {
  const ramp = (side: string) => `
    <div class="sp-row" data-part="ramp-${side}" style="gap: 2px; height: 14px">
      ${RAMP.map((hue) => `<span class="sp-swatch" style="flex: 1 1 0; height: 14px; border-radius: 2px; --sp-swatch: ${hue}"></span>`).join('')}
    </div>`;

  const list = (side: string) => `
    <div class="sp-stack" style="gap: 4px; margin-top: 8px">
      ${ROWS.map(
        (row) => `
        <div class="sp-row" style="gap: 6px; height: 18px">
          <span class="sp-swatch" style="flex: 0 0 auto; width: 10px; height: 10px; border-radius: 50%; --sp-swatch: ${row.color}"></span>
          <span data-part="${side}-icon-${row.key}" style="flex: 0 0 14px; color: ${row.color}; visibility: hidden">
            ${icon(row.glyph, '')}
          </span>
          <span class="sp-text sp-text--ink" style="flex: 1 1 auto; font-size: 11px">${row.name}</span>
          <span data-part="${side}-word-${row.key}" class="sp-text" style="flex: 0 0 auto; font-size: 11px; visibility: hidden">${row.word}</span>
        </div>`,
      ).join('')}
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <svg width="0" height="0" aria-hidden="true" style="position: absolute">
        <filter id="sp-cvd-deutan" color-interpolation-filters="sRGB">
          <feColorMatrix type="matrix" values="${DEUTAN}"></feColorMatrix>
        </filter>
      </svg>

      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Status coding" data-part="segmented" data-value="hue">
            <button class="sp-segment" data-part="seg-hue" value="hue" style="font-size: 12px">Hue only</button>
            <button class="sp-segment" data-part="seg-redundant" value="redundant" style="font-size: 12px">Hue, shape, word</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 10px; gap: 10px; align-items: stretch">
          <div class="sp-surface sp-context" data-part="panel-normal" style="flex: 1 1 0; min-width: 0; padding: 8px 10px 10px">
            <span class="sp-label" style="display: block; font-size: 10px">As drawn</span>
            <div style="margin-top: 6px">${ramp('normal')}</div>
            ${list('normal')}
          </div>

          <div class="sp-surface" data-part="panel-sim" data-subject data-coding="hue"
               style="flex: 1 1 0; min-width: 0; padding: 8px 10px 10px; filter: url(#sp-cvd-deutan)">
            <span class="sp-label" style="display: block; font-size: 10px">Deuteranopia, simulated</span>
            <div style="margin-top: 6px">${ramp('sim')}</div>
            ${list('sim')}
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px; gap: 10px; height: 18px">
          <span class="sp-label" style="flex: 0 0 auto">Right panel</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-coding="hue"
                style="flex: 1 1 auto; min-width: 0; font-size: 11px; text-align: right; white-space: nowrap">${READOUT.hue}</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-coding="hue"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${CAPTION.hue}</p>
      </div>
    </div>
  `;

  const panel = part(root, 'panel-sim');
  const readout = part(root, 'readout');
  const caption = part(root, 'caption');
  const marks = ROWS.flatMap((row) => [
    ...partsOf(root, `normal-icon-${row.key}`),
    ...partsOf(root, `sim-icon-${row.key}`),
    ...partsOf(root, `normal-word-${row.key}`),
    ...partsOf(root, `sim-word-${row.key}`),
  ]);

  const apply = (coding: Coding) => {
    // Hidden in place, never removed: the second cue gives its room back to nothing (SPEC §5).
    for (const mark of marks) mark.style.visibility = coding === 'redundant' ? 'visible' : 'hidden';
    panel.dataset.coding = coding;
    readout.dataset.coding = coding;
    readout.textContent = READOUT[coding];
    caption.dataset.coding = coding;
    caption.textContent = CAPTION[coding];
  };

  apply('hue');

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail === 'redundant' ? 'redundant' : 'hue');
  });
}
