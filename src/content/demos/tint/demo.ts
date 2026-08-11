import { part } from '#src/kit/parts.ts';

/** How much white is mixed into the base at each step. */
const WHITE = [40, 60, 80, 92];
const START = 60;

const fillFor = (white: number) => `color-mix(in oklab, var(--tn-base) ${100 - white}%, #ffffff)`;

/**
 * Tint specimen: one base hue stepped toward white, and the sample those tints are
 * actually for. The base itself never moves, which is the point: a tint is a
 * derivation of it, not a second colour decision.
 */
export function mount(root: HTMLElement): void {
  const steps = WHITE.map(
    (white) => `
      <button data-part="tint-${white}" style="display: flex; flex-direction: column; gap: 5px; width: 60px; padding: 0; border: 0; background: transparent; cursor: pointer">
        <span class="sp-swatch" style="height: 40px; --sp-swatch: ${fillFor(white)}"></span>
        <span class="sp-label" style="text-align: center; font-size: 11px">${white}%</span>
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 340px; --tn-base: oklch(0.55 0.17 262)">
        <div class="sp-row sp-context">
          <span class="sp-label" style="width: 34px">Base</span>
          <span class="sp-swatch" style="width: 36px; height: 22px; --sp-swatch: var(--tn-base)"></span>
          <span class="sp-text">oklch(0.55 0.17 262), plus white</span>
        </div>

        <div class="sp-row" data-part="tints" data-subject style="gap: 8px; margin-top: 14px; align-items: flex-start">${steps}</div>

        <div class="sp-row sp-context" data-part="sample" data-tint="${START}"
             style="margin-top: 16px; padding: 10px 12px; border-radius: var(--sp-radius); background: ${fillFor(START)}; color: #23262b">
          <span class="sp-swatch" style="width: 14px; height: 14px; border-radius: 50%; --sp-swatch: var(--tn-base)"></span>
          <span class="sp-grow">Draft saved to your library</span>
          <span data-part="sample-label" style="font-size: 12px">${START}% white</span>
        </div>
      </div>
    </div>
  `;

  const sample = part(root, 'sample');
  const sampleLabel = part(root, 'sample-label');

  for (const white of WHITE) {
    part(root, `tint-${white}`).addEventListener('click', () => {
      sample.dataset.tint = String(white);
      sample.style.background = fillFor(white);
      sampleLabel.textContent = `${white}% white`;
    });
  }
}
