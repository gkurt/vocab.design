import { icon } from '#src/kit/icons.ts';

/**
 * Gloss specimen: one button and one app icon wearing the 2000s finish, with the same
 * two controls beside them matte, so the difference is a comparison rather than a claim.
 * Underneath, the finish is taken apart into the three layers the article names, each
 * drawn on its own so the hard specular edge is visible as an edge.
 *
 * The paint is stated inline because it is the term: the kit has one accent, no gradients
 * of its own, and `.sp-bevel` deliberately fades its highlight away rather than stopping
 * it dead, which is the one thing gloss does not do.
 *
 * The subject is the glossy pair, not the panel: the term names the finish those two
 * controls wear, and the matte pair, the legend, and the anatomy strip are the scenery
 * that makes it readable (SPEC §5). Static, like the poster it is.
 */
const RIM = 'rgb(0 0 0 / 0.32)';

/** The wash: pale over the top half, stopped dead at the waist, faint bounce below. */
const SHEEN =
  'linear-gradient(180deg, rgb(255 255 255 / 0.86) 0, rgb(255 255 255 / 0.34) 47%, rgb(255 255 255 / 0.03) 48%, rgb(255 255 255 / 0.2) 100%)';

/** Just the body colour, deepening downward: layer one of the three. */
const BODY = 'linear-gradient(180deg, rgb(0 0 0 / 0) 0, rgb(0 0 0 / 0.22) 100%)';

function glossy(core: string, radius: string): string {
  return [
    `background-color: ${core}`,
    `background-image: ${SHEEN}, ${BODY}`,
    `border: 1px solid ${RIM}`,
    `border-radius: ${radius}`,
    'box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.65), 0 2px 3px rgb(16 24 40 / 0.3)',
    'color: #ffffff',
    'text-shadow: 0 -1px 0 rgb(0 0 0 / 0.34)',
  ].join('; ');
}

function matte(core: string, radius: string): string {
  return [`background-color: ${core}`, `border: 1px solid ${RIM}`, `border-radius: ${radius}`, 'color: #ffffff'].join('; ');
}

/** One tile of the anatomy strip: a swatch of a single layer with its name under it. */
function layer(part: string, name: string, paint: string): string {
  return `
    <div class="sp-stack" style="gap: 5px; align-items: center">
      <span data-part="${part}" aria-hidden="true"
            style="width: 96px; height: 30px; border-radius: 6px; ${paint}"></span>
      <span class="sp-label" style="font-size: 11px">${name}</span>
    </div>`;
}

export function mount(root: HTMLElement): void {
  const blue = '#2f7fe8';
  const amber = '#e8842f';

  const pair = (mode: 'gloss' | 'matte', part: string) => {
    const paint = mode === 'gloss' ? glossy : matte;
    const mark = mode === 'gloss' ? ' data-subject' : '';
    return `
      <span class="sp-row" data-part="${part}"${mark} style="gap: 13px">
        <button type="button" data-part="${part}-button"
                style="${paint(blue, '999px')}; padding: 7px 17px 8px; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer">
          Download
        </button>
        <span data-part="${part}-icon" aria-hidden="true"
              style="${paint(amber, '11px')}; display: flex; align-items: center; justify-content: center; width: 42px; height: 42px">
          ${icon('star', 'sp-icon--filled')}
        </span>
      </span>`;
  };

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-window" style="width: 406px; padding: 14px 18px 16px">
        <div class="sp-row" style="align-items: flex-start; gap: 20px">
          <div class="sp-stack" style="flex: 1 1 0; gap: 8px">
            <span class="sp-label" data-part="title-gloss" style="color: var(--sp-ink)">Gloss</span>
            ${pair('gloss', 'glossy')}
          </div>
          <div class="sp-stack sp-context" style="flex: 1 1 0; gap: 8px">
            <span class="sp-label" data-part="title-matte">Matte</span>
            ${pair('matte', 'matte')}
          </div>
        </div>

        <div class="sp-divider" style="margin: 14px 0 11px"></div>

        <div class="sp-row sp-context" data-part="anatomy" style="gap: 10px; justify-content: space-between">
          ${layer('layer-body', 'Deep body', `background-color: ${blue}; background-image: ${BODY}; border: 1px solid ${RIM}`)}
          ${layer('layer-band', 'Specular band', `background-image: ${SHEEN}; border: 1px solid var(--sp-line); background-color: #9aa3b2`)}
          ${layer('layer-all', 'Both layers', `${glossy(blue, '6px')}`)}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 406px; margin: 0; text-align: center">
        The wash stops dead at the waist. Let it taper and the control is merely shaded.
      </p>
    </div>
  `;
}
