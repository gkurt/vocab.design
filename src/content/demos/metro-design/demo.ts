import { type IconName, icon } from '#src/kit/icons.ts';

/**
 * Metro specimen: a start screen of flat tiles. An oversized light lowercase heading runs
 * off the right edge the way a panorama title does, the tiles are flat blocks of colour
 * with a glyph and a lowercase label, and there is no gradient, bevel, shadow, or texture
 * anywhere in the panel.
 *
 * The panel is the subject; the caption below it is scenery. The tile colours are stated
 * inline because a palette of flat blocks is this term's own claim, and the kit has one
 * accent on purpose. Glyphs come from the kit's icon set, which is what it is for.
 *
 * Static: a start screen full of live tiles would be demonstrating the tiles' updates
 * rather than the language, and the language is the term.
 */
const FACE = "'Segoe UI Light', 'Segoe UI', 'Helvetica Neue', var(--sp-font)";
const GROUND = '#101112';

export function mount(root: HTMLElement): void {
  const tile = (part: string, color: string, name: IconName, label: string, span = 1) => `
    <div data-part="${part}"
         style="position: relative; grid-column: span ${span}; background: ${color}; color: #ffffff">
      <span aria-hidden="true" style="position: absolute; left: 11px; top: 11px; transform: scale(1.55); transform-origin: 0 0">
        ${icon(name)}
      </span>
      <span style="position: absolute; left: 9px; bottom: 6px; font-family: ${FACE}; font-size: 11px; font-weight: 400">${label}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="panel" data-subject
           style="position: relative; width: 238px; height: 244px; padding: 12px; background: ${GROUND}; overflow: hidden">

        <div data-part="title"
             style="font-family: ${FACE}; font-weight: 200; font-size: 42px; line-height: 1.05; letter-spacing: -0.012em;
                    color: #ffffff; white-space: nowrap; margin-right: -12px">
          collections <span style="color: rgb(255 255 255 / 0.32)">photos</span>
        </div>
        <div data-part="subtitle"
             style="margin-top: 1px; font-family: ${FACE}; font-size: 11px; color: rgb(255 255 255 / 0.55)">tuesday, 14 march</div>

        <div data-part="tiles"
             style="display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 66px; gap: 7px; margin-top: 10px">
          ${tile('tile-mail', '#00a4ef', 'inbox', 'mail')}
          ${tile('tile-photos', '#7cbb00', 'star', 'photos')}
          ${tile('tile-alerts', '#f65314', 'bell', 'alerts')}
          ${tile('tile-people', '#7b3f9d', 'heart', 'people', 2)}
          ${tile('tile-agenda', '#ffbb00', 'calendar', 'agenda')}
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 238px; margin: 0; text-align: center">
        Flat blocks, one light heading running off the edge, no chrome at all.
      </p>
    </div>
  `;
}
