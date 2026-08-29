/**
 * Letterpress specimen: the same word twice on one card, once pressed in and once raised,
 * so the only difference on show is which side of the glyph the one-pixel shadow sits on.
 *
 * The subject is the debossed line, which is the narrowest element the term names. The
 * raised twin is the comparison the effect only makes sense against, and the labels naming
 * each shadow are scenery in `.sp-context`.
 *
 * The card colour is stated inline and deliberately mid-tone: the kit's surface is white on
 * purpose, and on white a highlight has nothing to be lighter than, which would leave the
 * specimen demonstrating nothing at all.
 *
 * Static: an impression in paper has no states, so the specimen is looked at, not watched.
 */
const CARD = '#d9d9d1';
const DEBOSS_INK = '#adada2';
const DEBOSS_LIGHT = 'rgb(255 255 255 / 0.95)';
const EMBOSS_INK = '#eeeee6';
const EMBOSS_DARK = 'rgb(38 38 32 / 0.45)';

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="card"
           style="width: 306px; padding: 18px 20px 16px; background: ${CARD}; border-radius: 6px;
                  border: 1px solid #c2c2b8; box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.7)">

        <div class="sp-context" data-part="lightmark"
             style="display: flex; align-items: center; gap: 7px; font-size: 11px; color: #7b7b71">
          <span aria-hidden="true"
                style="width: 13px; height: 13px; border-radius: 50%; background: #fbfbf4;
                       box-shadow: 0 1px 2px rgb(40 40 32 / 0.4)"></span>
          Light from above, as it always is
        </div>

        <div data-part="deboss" data-subject
             style="margin-top: 14px; font-size: 33px; font-weight: 800; letter-spacing: 0.015em; line-height: 1.1;
                    color: ${DEBOSS_INK}; text-shadow: 0 1px 0 ${DEBOSS_LIGHT}">PRESSED IN</div>
        <div class="sp-context" data-part="label-deboss" style="margin-top: 2px; font-size: 11px; color: #7b7b71">
          Fill darker than the card, highlight one pixel below.
        </div>

        <div aria-hidden="true"
             style="height: 2px; margin: 13px 0; background: linear-gradient(#c0c0b6 0 1px, #eeeee6 1px 2px)"></div>

        <div data-part="emboss"
             style="font-size: 33px; font-weight: 800; letter-spacing: 0.015em; line-height: 1.1;
                    color: ${EMBOSS_INK}; text-shadow: 0 1px 1px ${EMBOSS_DARK}">RAISED UP</div>
        <div class="sp-context" data-part="label-emboss" style="margin-top: 2px; font-size: 11px; color: #7b7b71">
          Fill lighter than the card, shadow one pixel below.
        </div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 306px; margin: 0; text-align: center">
        One pixel decides it, and only because the surface is neither white nor black.
      </p>
    </div>
  `;
}
