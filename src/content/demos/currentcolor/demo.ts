import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

type Ink = { hex: string; label: string };

const INKS: Record<string, Ink> = {
  slate: { hex: '#23262B', label: 'slate' },
  accent: { hex: '#3557E8', label: 'accent blue' },
  plum: { hex: '#8A2C6E', label: 'plum' },
};

const ORDER = ['slate', 'accent', 'plum'] as const;
const START = 'slate';

/**
 * currentColor specimen: the same control twice, once written so that its border, its
 * icon stroke, and its underline all read `currentColor`, and once with those three
 * values hardcoded. Choosing a text colour moves one declaration on each; only the first
 * one keeps its parts together.
 *
 * The subject is the inheriting control, not the pair: the hardcoded twin is the
 * counterexample the specimen is read against, so it stays in the context register. Both
 * controls are the same size and the swatch row is fixed, so choosing a colour repaints
 * and moves nothing (SPEC §5).
 *
 * The two labels under the controls used to narrate the comparison ("border, stroke,
 * underline: currentColor" and "the same three, written out as hex"). They now print only
 * the value each control was written with, which is the same identification without the
 * article's sentence inside the frame.
 */
export function mount(root: HTMLElement): void {
  const swatches = ORDER.map(
    (name) => `
      <button data-part="swatch-${name}" type="button" aria-label="${INKS[name]?.label}"
              style="width: 24px; height: 24px; padding: 0; border-radius: 50%; cursor: pointer;
                     border: 2px solid transparent; background: ${INKS[name]?.hex};
                     box-shadow: 0 0 0 1px var(--sp-line)"></button>`,
  ).join('');

  const control = (name: string, subject: boolean) => {
    const hex = INKS[START]?.hex ?? '#23262B';
    const fixed = subject ? 'currentColor' : hex;
    return `
      <button data-part="${name}" ${subject ? 'data-subject' : ''} data-ink="${START}" type="button"
              style="display: inline-flex; align-items: center; gap: 8px; padding: 9px 13px; border-radius: var(--sp-radius);
                     border: 1px solid ${fixed}; background: transparent; color: ${hex}; font: inherit; font-size: 13px;
                     font-weight: 500; cursor: pointer">
        ${icon('share')}
        <span data-part="${name}-label" style="border-bottom: 1px solid ${fixed}; padding-bottom: 1px">Share file</span>
      </button>`;
  };

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">color</span>
          <div class="sp-row" data-part="swatches" style="gap: 8px">${swatches}</div>
        </div>

        <div class="sp-row" style="gap: 12px; margin-top: 16px; align-items: flex-start">
          <div class="sp-stack" style="flex: 1 1 0; min-width: 0; gap: 7px; align-items: flex-start">
            ${control('control', true)}
            <span class="sp-label">currentColor</span>
          </div>
          <div class="sp-context sp-stack" style="flex: 1 1 0; min-width: 0; gap: 7px; align-items: flex-start">
            ${control('twin', false)}
            <span class="sp-label">${INKS[START]?.hex}</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 16px 0 0; min-height: 40px">
          One declaration moved on each control. On the left the parts that said currentColor came with it; on the right they stayed where they were written.
        </p>
      </div>
    </div>
  `;

  const inheriting = part(root, 'control');
  const twin = part(root, 'twin');
  const twinIcon = twin.querySelector('svg');
  const twinLabel = part(root, 'twin-label');
  const startHex = INKS[START]?.hex ?? '#23262B';

  // The twin's three parts are stated once, in the colour the pair started in, and never
  // touched again: falling behind is what it is here to show.
  twinIcon?.setAttribute('style', `stroke: ${startHex}`);
  twinLabel.style.borderBottomColor = startHex;

  const paint = (name: string) => {
    const ink = INKS[name];
    if (!ink) return;
    for (const el of [inheriting, twin]) {
      el.dataset.ink = name;
      el.style.color = ink.hex;
    }
    for (const key of ORDER) {
      const swatch = part(root, `swatch-${key}`);
      swatch.style.borderColor = key === name ? 'var(--sp-ink)' : 'transparent';
      if (key === name) swatch.setAttribute('data-selected', '');
      else swatch.removeAttribute('data-selected');
    }
  };
  paint(START);

  for (const key of ORDER) part(root, `swatch-${key}`).addEventListener('click', () => paint(key));
}
