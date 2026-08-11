import { flag, part } from '#src/kit/parts.ts';

/** Four values a palette would actually hand over, each a plain six digit hex. */
const PRESETS = [
  { key: 'indigo', hex: '4F46E5' },
  { key: 'amber', hex: 'F59E0B' },
  { key: 'green', hex: '16A34A' },
  { key: 'rose', hex: 'E11D48' },
];
const START = '4F46E5';

/** One row per pair, painted in the channel it stands for so the digits and the bars line up. */
const CHANNELS = [
  { key: 'r', label: 'R', paint: '#d64545' },
  { key: 'g', label: 'G', paint: '#2f9e44' },
  { key: 'b', label: 'B', paint: '#3b6fd4' },
];

const pairsOf = (hex: string) => [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)];
const byteOf = (pair: string) => Number.parseInt(pair, 16);

/**
 * Hex colour specimen: the written value taken apart into the three bytes it is.
 *
 * The subject is the notation itself, the hash and its three pairs, not the panel
 * around it: the bars underneath are the demo explaining what the digits mean, and
 * the swatch beside it is the colour, which is a different thing from its spelling.
 * Every pair box is a fixed width, so changing the value cannot nudge the digits
 * after it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const presets = PRESETS.map(
    ({ key, hex }) => `
      <button data-part="preset-${key}" aria-label="#${hex}"
              style="width: 26px; height: 26px; padding: 0; border: 0; border-radius: 6px; cursor: pointer; background: #${hex}"></button>`,
  ).join('');

  const digits = CHANNELS.map(
    ({ key, paint }, index) => `
      <span data-part="digits-${key}"
            style="width: 34px; text-align: center; border-radius: 5px; background: color-mix(in oklab, ${paint} 16%, var(--sp-surface))"
            >${pairsOf(START)[index]}</span>`,
  ).join('');

  const rows = CHANNELS.map(
    ({ key, label, paint }, index) => `
      <div class="sp-row" data-part="chan-${key}">
        <span class="sp-label" style="width: 12px">${label}</span>
        <span class="sp-text sp-text--ink" data-part="pair-${key}" style="width: 24px">${pairsOf(START)[index]}</span>
        <span class="sp-grow" style="display: block; height: 8px; border-radius: 999px; background: var(--sp-sunken); overflow: hidden">
          <span data-part="bar-${key}"
                style="display: block; height: 100%; width: ${(byteOf(pairsOf(START)[index] ?? '00') / 255) * 100}%; background: ${paint}"></span>
        </span>
        <span class="sp-text" data-part="value-${key}" style="width: 30px; text-align: right">${byteOf(pairsOf(START)[index] ?? '00')}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 348px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Palette</span>
          <div class="sp-row" data-part="presets" style="gap: 6px">${presets}</div>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 14px">
          <span class="sp-swatch sp-context" data-part="preview"
                style="width: 52px; height: 44px; --sp-swatch: #${START}"></span>
          <span class="sp-row" data-part="hex" data-subject data-hex="${START}"
                style="gap: 1px; font-size: 22px; font-weight: 600; line-height: 1.2">
            <span style="color: var(--sp-muted)">#</span>${digits}
          </span>
        </div>

        <div class="sp-stack" style="gap: 9px; margin-top: 16px">${rows}</div>

        <div class="sp-row sp-context" style="margin-top: 14px">
          <span class="sp-text">Short forms: #f0c is #ff00cc, and #${START}CC is the same indigo at 80 percent.</span>
        </div>
      </div>
    </div>
  `;

  const hex = part(root, 'hex');
  const preview = part(root, 'preview');
  const picks = PRESETS.map((preset) => ({ preset, el: part(root, `preset-${preset.key}`) }));

  const show = (value: string) => {
    const pairs = pairsOf(value);
    hex.dataset.hex = value;
    preview.style.setProperty('--sp-swatch', `#${value}`);
    CHANNELS.forEach(({ key }, index) => {
      const pair = pairs[index] ?? '00';
      const byte = byteOf(pair);
      part(root, `digits-${key}`).textContent = pair;
      part(root, `pair-${key}`).textContent = pair;
      part(root, `bar-${key}`).style.width = `${(byte / 255) * 100}%`;
      part(root, `value-${key}`).textContent = String(byte);
    });
    for (const pick of picks) {
      const on = pick.preset.hex === value;
      flag(pick.el, 'data-selected', on);
      pick.el.style.boxShadow = on ? '0 0 0 2px var(--sp-surface), 0 0 0 4px var(--sp-ink)' : '';
    }
  };
  show(START);

  for (const pick of picks) pick.el.addEventListener('click', () => show(pick.preset.hex));
}
