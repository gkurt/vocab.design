/**
 * Aqua specimen: a Mac OS X dialog from 2001, drawn rather than remembered. Pinstriped
 * chrome, three gumdrop window controls, a blue glass scrollbar in a sunken trough, and
 * two gel buttons where the default one is the only blue thing in the row.
 *
 * The gel is stated inline as the four layers the article names: a saturated core, a
 * specular band across the upper half, a glow bounced back through the lower body, and a
 * thin dark rim. None of it can be spelled with kit tokens, which is the point of the
 * term; the kit has one accent and no gloss at all.
 *
 * Static. The period's own default-button pulse is described in prose instead of played,
 * since a looping brightness change beside text is the accessibility complaint the
 * article makes about it.
 */
const RIM = 'rgb(0 0 0 / 0.34)';
const PINSTRIPE_BODY = 'repeating-linear-gradient(180deg, #fbfcff 0 3px, #e6edfb 3px 4px)';
const PINSTRIPE_CHROME = 'repeating-linear-gradient(180deg, #fdfdfe 0 2px, #e2e5ea 2px 3px)';
const CHROME_SHEEN = 'linear-gradient(180deg, rgb(255 255 255 / 0.9), rgb(255 255 255 / 0) 58%, rgb(0 0 0 / 0.08))';

/** One gumdrop: a coloured lozenge with a hot specular dot near the top left. */
function light(colour: string, edge: string): string {
  return `<span style="width: 12px; height: 12px; border-radius: 50%; background: radial-gradient(circle at 34% 26%, rgb(255 255 255 / 0.95) 0 12%, ${colour} 46%, ${edge} 100%); border: 1px solid rgb(0 0 0 / 0.28); box-shadow: inset 0 -2px 3px rgb(0 0 0 / 0.2)"></span>`;
}

/** The gel: core colour, specular band, lower glow, dark rim. Swap the core for grey. */
function gel(core: string, glow: string, ink: string, shadow: string): string {
  return [
    `background-color: ${core}`,
    `background-image: linear-gradient(180deg, rgb(255 255 255 / 0.92) 0, rgb(255 255 255 / 0.34) 44%, rgb(255 255 255 / 0.02) 46%, ${glow} 100%)`,
    `border: 1px solid ${RIM}`,
    'border-radius: 999px',
    `box-shadow: inset 0 -5px 7px rgb(255 255 255 / 0.3), 0 1px 2px rgb(16 24 40 / 0.32)`,
    `color: ${ink}`,
    `text-shadow: ${shadow}`,
    'padding: 4px 16px 5px',
    'font-size: 12px',
    'font-weight: 600',
    'cursor: pointer',
  ].join('; ');
}

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="window" data-subject
           style="width: 306px; border-radius: 9px; overflow: hidden; border: 1px solid ${RIM};
                  box-shadow: 0 12px 26px rgb(16 24 40 / 0.4); color: #26303c">

        <div data-part="titlebar"
             style="display: flex; align-items: center; gap: 8px; height: 26px; padding: 0 9px;
                    background-image: ${CHROME_SHEEN}, ${PINSTRIPE_CHROME}; border-bottom: 1px solid #a6acb5">
          <span data-part="lights" aria-hidden="true" style="display: flex; gap: 5px">
            ${light('#ff6f61', '#c8392c')}${light('#ffce55', '#c99512')}${light('#6fce4b', '#3d8f24')}
          </span>
          <span style="flex: 1 1 auto; margin-right: 51px; text-align: center; font-size: 11px; font-weight: 700;
                       color: #3a4048; text-shadow: 0 1px 0 rgb(255 255 255 / 0.9)">Preferences</span>
        </div>

        <div style="display: flex; background-image: ${PINSTRIPE_BODY}">
          <div data-part="pinstripes" style="flex: 1 1 auto; min-width: 0; padding: 12px 12px 10px">
            <div style="font-size: 12px; font-weight: 700">Appearance</div>
            <div style="margin-top: 7px; font-size: 11px; line-height: 1.5; color: #4d5763">
              Highlight colour and scrollbar arrow placement, the two knobs a 2001 desktop
              gave you over its own gloss.
            </div>
            <div style="display: flex; align-items: center; gap: 7px; margin-top: 9px">
              <span aria-hidden="true"
                    style="width: 13px; height: 13px; border-radius: 3px; border: 1px solid ${RIM};
                           background-image: linear-gradient(180deg, #7fb4f2, #1f5fc4); box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.7)"></span>
              <span style="font-size: 11px">Use smooth scrolling</span>
            </div>
          </div>

          <div data-part="scrollbar" aria-hidden="true"
               style="flex: 0 0 auto; width: 15px; padding: 2px; background: #dfe3ea; border-left: 1px solid #b7bcc4;
                      box-shadow: inset 1px 0 2px rgb(16 24 40 / 0.18)">
            <span style="display: block; height: 52px; border-radius: 999px; border: 1px solid ${RIM};
                         background-color: #2f7fe8;
                         background-image: linear-gradient(90deg, rgb(255 255 255 / 0.85) 0, rgb(255 255 255 / 0.2) 46%, rgb(255 255 255 / 0) 48%, rgb(120 180 255 / 0.6) 100%)"></span>
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: flex-end; gap: 9px; padding: 9px 12px;
                    background-image: ${CHROME_SHEEN}, ${PINSTRIPE_CHROME}; border-top: 1px solid #b7bcc4">
          <button data-part="gel-cancel" type="button"
                  style="${gel('#e4e7ec', 'rgb(150 160 175 / 0.5)', '#2b323b', '0 1px 0 rgb(255 255 255 / 0.8)')}">Cancel</button>
          <span data-part="gel-default"
                style="display: inline-block; border-radius: 999px; box-shadow: 0 0 0 3px rgb(84 148 232 / 0.34)">
            <button data-part="gel-default-button" type="button"
                    style="${gel('#2f7fe8', 'rgb(120 180 255 / 0.62)', '#ffffff', '0 -1px 0 rgb(0 0 0 / 0.32)')}">Save</button>
          </span>
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 306px; margin: 0; text-align: center">
        Gel core, specular band, a glow bounced back through the bottom, one dark rim.
      </p>
    </div>
  `;
}
