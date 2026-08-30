/**
 * Letterpress specimen: the same word twice on one card, once pressed in and once raised,
 * so the only difference on show is which side of the glyph the one-pixel shadow sits on.
 *
 * The subject is the debossed line, which is the narrowest element the term names. The
 * raised twin is the comparison the effect only makes sense against.
 *
 * The card used to carry three notes of author voice: a dot captioned "Light from above, as
 * it always is", and a line under each word spelling out where its shadow sits. All three
 * described the effect the card is already showing, which the article does at length, so the
 * card is now just the two impressions and the rule between them.
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
        <div data-part="deboss" data-subject
             style="font-size: 33px; font-weight: 800; letter-spacing: 0.015em; line-height: 1.1;
                    color: ${DEBOSS_INK}; text-shadow: 0 1px 0 ${DEBOSS_LIGHT}">PRESSED IN</div>
        <div aria-hidden="true"
             style="height: 2px; margin: 13px 0; background: linear-gradient(#c0c0b6 0 1px, #eeeee6 1px 2px)"></div>

        <div data-part="emboss"
             style="font-size: 33px; font-weight: 800; letter-spacing: 0.015em; line-height: 1.1;
                    color: ${EMBOSS_INK}; text-shadow: 0 1px 1px ${EMBOSS_DARK}">RAISED UP</div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 306px; margin: 0; text-align: center">
        One pixel decides it, and only because the surface is neither white nor black.
      </p>
    </div>
  `;
}
