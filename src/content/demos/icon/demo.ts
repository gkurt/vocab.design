import { type IconName, icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The four symbols, each with the word it stands for. The word is the point. */
const SET: { key: string; name: IconName; label: string }[] = [
  { key: 'search', name: 'search', label: 'Search' },
  { key: 'delete', name: 'trash', label: 'Delete' },
  { key: 'alerts', name: 'bell', label: 'Alerts' },
  { key: 'share', name: 'share', label: 'Share' },
];

/** The size steps a set is asked to render at, in CSS pixels. */
const SIZES = ['16', '20', '24'];
const START = '20';
/** The slot is drawn once at the largest step, so changing size never moves the row. */
const SLOT = 26;
/** The design grid the drawings are made on, and how big it is drawn here. */
const GRID = 24;
const BLOWN = 116;

const NOTES: Record<string, string> = {
  '16': 'At 16 the stroke lands near one device pixel, and the detail starts to close up.',
  '20': 'The same 24 unit drawing, scaled. Nothing was redrawn for this step.',
  '24': 'At 24 the drawing is at its intended size and every gap is open.',
};

const cell = (item: (typeof SET)[number]) => `
  <div class="sp-stack" style="flex: 1 1 0; align-items: center; gap: 5px">
    <span style="display: flex; align-items: center; justify-content: center; width: ${SLOT}px; height: ${SLOT}px; color: var(--sp-ink)">
      ${icon(item.name).replace('<svg ', `<svg data-part="glyph-${item.key}"${item.key === 'delete' ? ' data-subject' : ''} style="width: ${START}px; height: ${START}px" `)}
    </span>
    <span class="sp-label" style="font-size: 11px; line-height: 14px; height: 14px">${item.label}</span>
  </div>`;

/**
 * Icon specimen: four symbols from the kit's own set, each under the word it stands for,
 * rendered at three size steps beside one of them blown up on the grid it was drawn on.
 *
 * The subject is a single icon, the delete glyph in the row, because that is the narrowest
 * thing the word names: the row is a set, the cell is a labelled control, and the panel to
 * its right is a drawing of the same symbol rather than a second one. Everything else,
 * including the size picker and the blow-up, is scenery in the context register.
 *
 * The glyphs are the kit's (SPEC §5): a specimen never invents an icon set, and the point
 * being made here is about size and labelling rather than about any particular drawing.
 * The icon slot is fixed at the largest step from mount, so stepping through 16, 20 and 24
 * changes the symbol and moves nothing around it (SPEC §5). Every step is honestly an icon,
 * so no pose condition is needed.
 */
export function mount(root: HTMLElement): void {
  const grid = Array.from({ length: 5 }, (_, i) => {
    const at = (i * GRID) / 4;
    return `<line x1="${at}" y1="0" x2="${at}" y2="${GRID}" /><line x1="0" y1="${at}" x2="${GRID}" y2="${at}" />`;
  }).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading" style="font-size: 13px">One set, four meanings</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="sizer" data-axis="Size" data-value="${START}">
            ${SIZES.map((s) => `<button class="sp-segment" type="button" data-part="seg-${s}" value="${s}" style="padding: 4px 11px; font-size: 12px">${s}</button>`).join('')}
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 12px; gap: 14px; align-items: center">
          <div class="sp-surface" style="flex: 1 1 auto; min-width: 0; padding: 14px 8px">
            <div class="sp-row" data-part="row" data-size="${START}" style="gap: 6px">
              ${SET.map(cell).join('')}
            </div>
          </div>
          <div class="sp-stack sp-context" style="flex: 0 0 auto; align-items: center; gap: 5px">
            <div style="position: relative; width: ${BLOWN}px; height: ${BLOWN}px">
              <svg viewBox="0 0 ${GRID} ${GRID}" width="${BLOWN}" height="${BLOWN}" aria-hidden="true" style="position: absolute; inset: 0">
                <g stroke="var(--sp-line)" stroke-width="0.3">${grid}</g>
                <rect x="2" y="2" width="20" height="20" fill="none" stroke="var(--sp-accent)" stroke-width="0.4" stroke-dasharray="1.4 1.2" />
                <circle cx="12" cy="12" r="10" fill="none" stroke="var(--sp-muted)" stroke-width="0.35" />
              </svg>
              ${icon('trash').replace('<svg ', `<svg data-part="magnified" style="position: absolute; inset: 0; width: ${BLOWN}px; height: ${BLOWN}px; stroke-width: 1.6" `)}
            </div>
            <span class="sp-label" style="font-size: 11px">24 unit grid, 20 unit live area</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="note" style="margin: 10px 0 0; height: 36px; font-size: 12px"></p>
      </div>
    </div>
  `;

  const row = part(root, 'row');
  const note = part(root, 'note');
  const glyphs = SET.map((item) => part(root, `glyph-${item.key}`));

  const resize = (size: string) => {
    if (!SIZES.includes(size)) return;
    row.dataset.size = size;
    for (const glyph of glyphs) {
      glyph.style.width = `${size}px`;
      glyph.style.height = `${size}px`;
    }
    note.textContent = `Rendered at ${size} px. ${NOTES[size] ?? ''}`;
  };

  part(root, 'sizer').addEventListener('change', (event) => resize((event as CustomEvent<string>).detail));

  resize(START);
}
