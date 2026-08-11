import { part } from '#src/kit/parts.ts';

/** A documented palette: every entry is a fill, a name, and the value it stands for. */
const PALETTE = [
  { key: 'ink', name: 'Ink', hex: '#1F2933' },
  { key: 'slate', name: 'Slate', hex: '#52606D' },
  { key: 'sky', name: 'Sky', hex: '#2F80ED' },
  { key: 'moss', name: 'Moss', hex: '#2F9E44' },
  { key: 'amber', name: 'Amber', hex: '#E8A33D' },
  { key: 'ember', name: 'Ember', hex: '#D9480F' },
  { key: 'plum', name: 'Plum', hex: '#7C3AED' },
  { key: 'rose', name: 'Rose', hex: '#E64980' },
];
const START = 'sky';

/**
 * Swatch specimen: a palette as a design tool shows one, and the inspector row that
 * reports which sample is applied.
 *
 * The subject is one block of flat colour, not the cell around it and not the grid:
 * the name and the value under a swatch are labels for it, and the term names the
 * block. Selection is drawn as a ring outside the block rather than as a change to
 * the fill, since a sample that restyles itself stops being a sample (see the article).
 */
export function mount(root: HTMLElement): void {
  const chips = PALETTE.map(
    ({ key, name, hex }, index) => `
      <button data-part="sw-${key}" role="option" aria-selected="${key === START}" aria-label="${name} ${hex}"
              style="display: flex; flex-direction: column; gap: 5px; padding: 0; border: 0; background: transparent; cursor: pointer; text-align: left">
        <span class="sp-swatch" data-part="block-${key}" ${index === 0 ? 'data-subject' : ''}
              style="height: 34px; border: 1px solid rgb(16 24 40 / 0.14); --sp-swatch: ${hex}"></span>
        <span class="sp-text sp-text--ink" style="font-size: 12px">${name}</span>
        <span class="sp-label" style="font-size: 11px; margin-top: -3px">${hex}</span>
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 360px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Brand palette</span>
          <span class="sp-label">8 samples</span>
        </div>

        <div class="sp-grid" data-part="palette" role="listbox" aria-label="Brand palette"
             style="grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 12px">${chips}</div>

        <div class="sp-divider" style="margin: 14px 0"></div>

        <div class="sp-row sp-context" data-part="sample" data-swatch="${START}">
          <span class="sp-label" style="width: 74px">Label colour</span>
          <span class="sp-swatch" data-part="applied"
                style="width: 26px; height: 26px; border: 1px solid rgb(16 24 40 / 0.14); --sp-swatch: #2F80ED"></span>
          <span class="sp-grow sp-text sp-text--ink" data-part="applied-name">Sky</span>
          <span class="sp-text" data-part="applied-hex" style="width: 66px; text-align: right">#2F80ED</span>
        </div>
      </div>
    </div>
  `;

  const sample = part(root, 'sample');
  const applied = part(root, 'applied');
  const appliedName = part(root, 'applied-name');
  const appliedHex = part(root, 'applied-hex');
  const chosen = PALETTE.map((entry) => ({ entry, el: part(root, `sw-${entry.key}`), block: part(root, `block-${entry.key}`) }));

  const apply = (key: string) => {
    const picked = PALETTE.find((entry) => entry.key === key);
    if (!picked) return;
    sample.dataset.swatch = key;
    applied.style.setProperty('--sp-swatch', picked.hex);
    appliedName.textContent = picked.name;
    appliedHex.textContent = picked.hex;
    for (const chip of chosen) {
      const on = chip.entry.key === key;
      chip.el.setAttribute('aria-selected', String(on));
      chip.block.style.boxShadow = on ? '0 0 0 2px var(--sp-surface), 0 0 0 4px var(--sp-ink)' : '';
    }
  };
  apply(START);

  for (const chip of chosen) chip.el.addEventListener('click', () => apply(chip.entry.key));
}
