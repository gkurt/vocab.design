import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const CLAMP_LINES = '3';

const COPY = `Booked the smaller of the two rooms and it was exactly what the listing said:
quiet, warm, and a five minute walk from the station. The host left a note about the
boiler and the bins, which sounds dull until you need it at eleven at night. Kitchen
is shared but nobody was ever in it, and the shop on the corner opens at seven.`;

/**
 * Show more toggle specimen: a clamped review with the control that gives it its
 * full length back. The subject is the control, since the term names the toggle
 * and not the paragraph it acts on.
 *
 * Room is reserved rather than taken (SPEC §5): the block is pinned to the bottom
 * of the frame with the slack above it, so the text grows up into space that was
 * always empty and the control itself never moves. The paragraph is capped and
 * scrolls internally, so a longer review cannot push the control off the frame.
 * The toggling is the term here, so the trigger flips and the script drives both
 * directions (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 300px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Reviews</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <div class="sp-row" style="gap: 10px">
            <span class="sp-avatar">RK</span>
            <div class="sp-stack" style="gap: 1px">
              <span class="sp-text sp-text--ink">Rosa K.</span>
              <span class="sp-label">Stayed in March</span>
            </div>
          </div>
          <div class="sp-stack" style="margin-top: auto; gap: 8px">
            <div class="sp-scroll" data-part="copy" style="max-height: 120px">
              <p
                class="sp-text"
                data-part="text"
                id="vd-review"
                style="margin: 0; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: ${CLAMP_LINES}; overflow: hidden"
              >${COPY}</p>
            </div>
            <button
              class="sp-button sp-button--quiet sp-button--sm sp-row"
              type="button"
              data-part="toggle"
              data-subject
              aria-expanded="false"
              aria-controls="vd-review"
              style="align-self: flex-start; padding-left: 0"
            >
              ${icon('chevronRight', 'sp-icon--chevron')}
              <span data-part="label-more">Show more</span>
              <span data-part="label-less" hidden>Show less</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  const toggle = part(root, 'toggle');
  const text = part(root, 'text');
  const copy = part(root, 'copy');
  const more = part(root, 'label-more');
  const less = part(root, 'label-less');

  const setExpanded = (open: boolean) => {
    text.style.setProperty('-webkit-line-clamp', open ? 'unset' : CLAMP_LINES);
    if (open) text.setAttribute('data-expanded', '');
    else text.removeAttribute('data-expanded');
    toggle.setAttribute('aria-expanded', String(open));
    more.hidden = open;
    less.hidden = !open;
    // Collapsing has to put the reader back at the top of the passage, not leave the
    // clamp showing whichever three lines the scroll happened to stop on.
    if (!open) copy.scrollTop = 0;
  };

  toggle.addEventListener('click', () => setExpanded(!text.hasAttribute('data-expanded')));
}
