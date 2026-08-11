import { flag, part } from '#src/kit/parts.ts';

/**
 * The accents the swatch row offers. Written as raw colour values because that is
 * what the term is: the panel below owns exactly one of them at a time, and every
 * other colour in the panel is derived from it.
 */
const ACCENTS = [
  { name: 'indigo', label: 'Indigo', value: 'oklch(0.55 0.19 268)' },
  { name: 'teal', label: 'Teal', value: 'oklch(0.55 0.11 196)' },
  { name: 'crimson', label: 'Crimson', value: 'oklch(0.56 0.19 20)' },
  { name: 'amber', label: 'Amber', value: 'oklch(0.58 0.14 65)' },
];

/**
 * Accent colour specimen: one panel spending a single saturated colour on the
 * switch, the selected chip and the primary button, and nothing else. Picking a
 * different accent repoints one custom property, which is the whole argument for
 * having one.
 */
export function mount(root: HTMLElement): void {
  const swatches = ACCENTS.map(
    ({ name, label, value }) => `
      <button class="sp-chip" data-part="swatch-${name}">
        <span class="sp-swatch" style="width: 12px; height: 12px; --sp-swatch: ${value}"></span>${label}
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="panel" data-subject data-accent="indigo"
           style="width: 300px; --sp-accent: ${ACCENTS[0]?.value}; --sp-accent-ink: #ffffff; --sp-accent-soft: color-mix(in oklab, var(--sp-accent) 16%, var(--sp-surface))">
        <div class="sp-row sp-row--between">
          <span class="sp-heading">Weekly digest</span>
          <button class="sp-switch" role="switch" aria-checked="true" data-part="switch"></button>
        </div>
        <p class="sp-text" style="margin: 8px 0 0">Every Monday, the five posts you missed.</p>
        <div class="sp-row" style="margin-top: 12px">
          <span class="sp-chip" data-selected>Product</span>
          <span class="sp-chip">Design</span>
          <span class="sp-chip">Research</span>
        </div>
        <div class="sp-row" style="margin-top: 14px">
          <button class="sp-button" data-part="subscribe">Subscribe</button>
          <button class="sp-button sp-button--quiet" data-part="later">Not now</button>
        </div>
      </div>
      <div class="sp-row sp-context" data-part="swatches">${swatches}</div>
    </div>
  `;

  const panel = part(root, 'panel');
  const picks = ACCENTS.map((accent) => ({ accent, el: part(root, `swatch-${accent.name}`) }));

  const paint = (name: string) => {
    const chosen = ACCENTS.find((accent) => accent.name === name);
    if (!chosen) return;
    panel.dataset.accent = chosen.name;
    panel.style.setProperty('--sp-accent', chosen.value);
    for (const pick of picks) flag(pick.el, 'data-selected', pick.accent.name === chosen.name);
  };
  paint('indigo');

  for (const pick of picks) pick.el.addEventListener('click', () => paint(pick.accent.name));
}
