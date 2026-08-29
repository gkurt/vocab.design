/**
 * The same six words, set twice. Kept in one place so the two panels cannot drift apart: the
 * whole claim is that nothing changes except the size the words are set at.
 */
const WORDS = 'The tide comes in';

/**
 * Oversized typography specimen: one headline at reading size, needing a picture beside it to
 * hold the top of a page, and the same headline set far past reading size, holding it alone.
 * Both panels carry identical words, so the only variable in the picture is the scale.
 *
 * The large setting also shows what a display size actually costs: the tracking is pulled in by
 * a small negative amount and the leading well under one line height, because a text face's own
 * spacing reads loose and gappy up there (SPEC §5 lets a demo state its own paint inline, and
 * this paint IS the term's claim).
 *
 * The subject is the OVERSIZED HEADLINE, the narrowest element the term names (SPEC §5). The
 * reading-size panel above it is what it is read against, so it sits in the context register
 * along with the labels and the caption. The term's whole claim is visible at rest, so the
 * choreography is waits and asserts only: there is no second state here, and a hover with no
 * consequence would be theater rather than demonstration (SPEC §8).
 *
 * Nothing in the scene is sized at runtime and nothing changes state, so no room needs
 * reserving and nothing can shift.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 18px 14px">
        <div class="sp-context">
          <span class="sp-label" data-part="label-small">At reading size, the picture holds the page</span>
          <div class="sp-row" style="gap: 12px; margin-top: 7px; align-items: flex-start">
            <div data-part="art"
                 style="flex: 0 0 auto; width: 96px; height: 54px; border-radius: 5px;
                        background: linear-gradient(150deg, #B9C0CC, #8A93A3 62%, #6F7889 100%)"></div>
            <div class="sp-grow">
              <p data-part="headline-small"
                 style="margin: 0; font-size: 15px; font-weight: 600; line-height: 1.24">${WORDS}</p>
              <div class="sp-stack" style="gap: 5px; margin-top: 8px">
                <div class="sp-line" style="height: 6px"></div>
                <div class="sp-line" style="height: 6px"></div>
                <div class="sp-line" style="height: 6px; width: 62%"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="sp-divider sp-context" style="margin: 12px 0 11px"></div>

        <span class="sp-label sp-context" data-part="label-large">Set past it, the words are the picture</span>
        <p data-part="headline-large" data-subject
           style="margin: 5px 0 0; font-size: 52px; font-weight: 700; line-height: 0.9;
                  letter-spacing: -0.03em; text-wrap: balance">${WORDS}</p>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption"
           style="margin: 9px 0 0; font-size: 10px; line-height: 1.45">
          Same words, same face. At this size the tracking is pulled in and the leading set under one line,
          because a text face's own spacing reads loose up here.
        </p>
      </div>
    </div>
  `;
}
