import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

/**
 * Minimalism specimen: the same feature card twice. The subject is the reduced one,
 * where one typeface, one accent, and space carry the whole hierarchy; the scenery
 * copy beside it says the same thing with a gradient band, a badge, an icon, a rule,
 * two buttons, and a shadow. The comparison is the demonstration, since minimalism is
 * defined by how much is absent rather than by any mark it makes.
 *
 * The decorated card is built from kit tokens rather than colours of its own, so the
 * context register genuinely quiets it: what separates the two is the count of
 * elements, not one of them shouting louder.
 *
 * The note under the link keeps room for both of its lines from mount, so reading the
 * longer one does not grow the quiet card by a few pixels (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-row" style="align-items: flex-start; gap: 26px">
        <div class="sp-stack" style="gap: 10px">
          <div data-part="minimal" data-subject
               style="width: 190px; min-height: 232px; padding: 22px; background: var(--sp-surface)">
            <div class="sp-label" data-part="eyebrow"
                 style="color: var(--sp-accent); letter-spacing: 0.1em; text-transform: uppercase">Focus</div>
            <div style="margin-top: 16px; font-size: 18px; font-weight: 500; line-height: 1.25; letter-spacing: -0.01em">
              One idea, all the room it needs.
            </div>
            <p style="margin: 14px 0 0; font-size: 13px; line-height: 1.6; color: var(--sp-muted)">
              Nothing here is decoration.
            </p>
            <button data-part="start" type="button"
                    style="margin-top: 20px; padding: 0; border: 0; background: none; font: inherit; font-size: 13px; font-weight: 500; color: var(--sp-accent); cursor: pointer">
              Start reading
            </button>
            <div data-part="note" style="min-height: 36px; margin-top: 10px; font-size: 12px; line-height: 1.5; color: var(--sp-muted)">
              Free while it stays quiet.
            </div>
          </div>
          <span class="sp-label" style="text-align: center">one face, one accent, space</span>
        </div>

        <div class="sp-stack sp-context" style="gap: 10px">
          <div data-part="decorated"
               style="width: 190px; min-height: 232px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 10px; box-shadow: var(--sp-shadow); overflow: hidden">
            <div class="sp-row sp-row--between"
                 style="padding: 8px 10px; background-image: linear-gradient(120deg, var(--sp-accent-soft), var(--sp-sunken)); border-bottom: 1px solid var(--sp-line)">
              <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">FS</span>
              <span class="sp-chip" style="padding: 2px 8px; font-size: 10px">NEW</span>
            </div>
            <div style="padding: 10px 12px 12px">
              <div class="sp-row" style="gap: 6px">
                ${icon('star', 'sp-icon--filled')}
                <span style="font-size: 15px; font-weight: 700">Focus Suite</span>
              </div>
              <div class="sp-divider" style="margin: 8px 0"></div>
              <p style="margin: 0; font-size: 12px; line-height: 1.5; color: var(--sp-muted)">
                One idea, a band, a badge, a rule, and eleven other things asking at once.
              </p>
              <div class="sp-row" style="margin-top: 10px; gap: 6px">
                <button class="sp-button sp-button--sm" type="button" style="font-size: 12px">Start</button>
                <button class="sp-button sp-button--sm sp-button--ghost" type="button" style="font-size: 12px">Tour</button>
              </div>
              <div class="sp-row" style="margin-top: 12px; gap: 5px">
                <span class="sp-line" style="width: 30px"></span>
                <span class="sp-line" style="width: 44px"></span>
                <span class="sp-line" style="width: 20px"></span>
              </div>
            </div>
          </div>
          <span class="sp-label" style="text-align: center">band, badge, icon, rule, shadow</span>
        </div>
      </div>
    </div>
  `;

  const start = part(root, 'start');
  const note = part(root, 'note');

  start.addEventListener('click', () => {
    // Absolute, so a fast-forwarded or resumed pass lands on the same state.
    note.textContent = 'Saved. One letter a week, no images.';
    note.setAttribute('data-done', '');
  });
}
