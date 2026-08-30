import { part } from '#src/kit/parts.ts';

/** How much black is mixed into the base at each step. */
const BLACK = [25, 45, 65, 85];
const START = 45;

const fillFor = (black: number) => `color-mix(in oklab, var(--sd-base) ${100 - black}%, #000000)`;

/**
 * Shade specimen: the same base hue as the tint specimen, stepped toward black
 * instead of white, and the sample those shades are for. Ink on the sample stays
 * light because every shade of this base is dark in either theme.
 *
 * The sample row once read "Pressed, bordered, or dark theme", which listed the uses
 * for the reader instead of naming the swatch; it names the token role a palette tool
 * would print, and the article keeps the list of uses.
 */
export function mount(root: HTMLElement): void {
  const steps = BLACK.map(
    (black) => `
      <button data-part="shade-${black}" style="display: flex; flex-direction: column; gap: 5px; width: 60px; padding: 0; border: 0; background: transparent; cursor: pointer">
        <span class="sp-swatch" style="height: 40px; --sp-swatch: ${fillFor(black)}"></span>
        <span class="sp-label" style="text-align: center; font-size: 11px">${black}%</span>
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 340px; --sd-base: oklch(0.55 0.17 262)">
        <div class="sp-row sp-context">
          <span class="sp-label" style="width: 34px">Base</span>
          <span class="sp-swatch" style="width: 36px; height: 22px; --sp-swatch: var(--sd-base)"></span>
          <span class="sp-text">oklch(0.55 0.17 262), plus black</span>
        </div>

        <div class="sp-row" data-part="shades" data-subject style="gap: 8px; margin-top: 14px; align-items: flex-start">${steps}</div>

        <div class="sp-row sp-context" data-part="sample" data-shade="${START}"
             style="margin-top: 16px; padding: 10px 12px; border-radius: var(--sp-radius); background: ${fillFor(START)}; color: #ffffff">
          <span class="sp-swatch" style="width: 14px; height: 14px; border-radius: 50%; --sp-swatch: var(--sd-base)"></span>
          <span class="sp-grow">Primary, pressed</span>
          <span data-part="sample-label" style="font-size: 12px">${START}% black</span>
        </div>
      </div>
    </div>
  `;

  const sample = part(root, 'sample');
  const sampleLabel = part(root, 'sample-label');

  for (const black of BLACK) {
    part(root, `shade-${black}`).addEventListener('click', () => {
      sample.dataset.shade = String(black);
      sample.style.background = fillFor(black);
      sampleLabel.textContent = `${black}% black`;
    });
  }
}
