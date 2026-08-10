import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/**
 * Card specimen: one item on a shelf, previewed on a surface of its own. The card
 * is the subject; the library around it and the page it opens are scenery.
 *
 * The demonstration is the tension the term is really about: the whole surface is
 * one target (clicking the media or the title opens the item), while the single
 * action it carries acts in place and stops the click there. Saving reaches a
 * state rather than flipping one (SPEC §8), and the button holds a reserved width
 * so "Saved" cannot resize the row it sits in.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field library</span>
          <span class="sp-text">24 items</span>
        </div>
        <div class="sp-body">
          <div class="sp-grid" data-part="shelf" style="grid-template-columns: repeat(2, 1fr); gap: 12px">
            <div
              class="sp-surface"
              data-part="card"
              data-subject
              role="link"
              tabindex="0"
              aria-label="Open Coastal shelf survey"
              style="padding: 10px; cursor: pointer"
            >
              <div class="sp-swatch" data-part="card-media" aria-hidden="true" style="height: 56px"></div>
              <div class="sp-stack" style="gap: 2px; margin-top: 8px">
                <span class="sp-heading" data-part="card-title">Coastal shelf survey</span>
                <span class="sp-text">Field guide · 12 pages</span>
              </div>
              <div class="sp-row" style="margin-top: 10px">
                <button
                  class="sp-button sp-button--ghost sp-button--sm sp-row"
                  type="button"
                  data-part="save"
                  aria-pressed="false"
                  style="min-width: 92px"
                >
                  ${icon('heart')}<span data-part="save-label">Save</span>
                </button>
              </div>
            </div>
            <div class="sp-surface sp-context" style="padding: 10px">
              <div class="sp-swatch" aria-hidden="true" style="height: 56px"></div>
              <div class="sp-stack" style="gap: 2px; margin-top: 8px">
                <span class="sp-heading">Estuary sediment log</span>
                <span class="sp-text">Field guide · 8 pages</span>
              </div>
              <div class="sp-row" style="margin-top: 10px">
                <button class="sp-button sp-button--ghost sp-button--sm sp-row" type="button" aria-pressed="false" style="min-width: 92px">
                  ${icon('heart')}<span>Save</span>
                </button>
              </div>
            </div>
          </div>
          <div class="sp-stack sp-context" data-part="detail" hidden style="gap: 10px">
            <div class="sp-row">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="back">Back</button>
              <span class="sp-text">Field library / Coastal shelf survey</span>
            </div>
            <div class="sp-swatch" aria-hidden="true" style="height: 62px"></div>
            <div class="sp-stack" style="gap: 8px">
              <span class="sp-heading">Coastal shelf survey</span>
              <div class="sp-line" style="width: 94%"></div>
              <div class="sp-line" style="width: 86%"></div>
              <div class="sp-line" style="width: 58%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const shelf = part(root, 'shelf');
  const detail = part(root, 'detail');
  const card = part(root, 'card');
  const save = part(root, 'save');
  const saveLabel = part(root, 'save-label');

  // The shelf and the page it leads to share one fixed body, so arriving somewhere
  // moves nothing that stayed (SPEC §5).
  const show = (opened: boolean) => {
    shelf.hidden = opened;
    detail.hidden = !opened;
  };

  card.addEventListener('click', () => show(true));
  card.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    show(true);
  });

  // The one action inside the card acts here: it must not also follow the surface.
  save.addEventListener('click', (event) => {
    event.stopPropagation();
    flag(save, 'data-selected', true);
    save.setAttribute('aria-pressed', 'true');
    saveLabel.textContent = 'Saved';
  });

  part(root, 'back').addEventListener('click', () => show(false));
}
