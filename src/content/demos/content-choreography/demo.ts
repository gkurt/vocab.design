import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const CANVAS = 452;
const HEIGHT = 196;
const NARROW = 264;
const GAP = 6;

const MODES = [
  { key: 'wide', label: 'two columns' },
  { key: 'source', label: 'source order' },
  { key: 'choreographed', label: 'choreographed' },
];

/**
 * Content choreography specimen: one page whose four blocks are laid out either in two columns or
 * stacked in one, with the stacked order picked absolutely. Wide, the promo and the related list
 * sit in a sidebar beside the article. Collapsed in source order, the promo lands above the
 * article body, because the sidebar was authored first. Choreographed, the article keeps the top
 * of the page and the promo follows it: the same four blocks, a different sequence.
 *
 * The subject is the promo, `data-part="promo"`, the block whose position the choreography
 * decides. The related list, the article, the viewport outline, the picker and the readout are
 * scenery in the context register, block by block rather than by wrapper, so the promo keeps the
 * full palette in the sidebar as well as in the stack. Source order is the outcome the term exists
 * to avoid, so the promo declares the honest condition in `data-pose` and the demo mounts
 * choreographed, which satisfies it (SPEC §6).
 *
 * The four blocks are the same elements in every arrangement, moved between the sidebar wrappers
 * and the single column rather than duplicated, which is the demonstration: nothing about the
 * content changes, only where it lands. `data-order` is measured, not declared: the demo reads the
 * promo's own box against the article body's. Nothing here transitions a position, so the read
 * after the write is the real one (SPEC §5), and every arrangement is sized to the same reserved
 * box, so nothing outside it moves.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 8px">
      <div class="sp-row sp-context" style="width: ${CANVAS}px">
        <span class="sp-heading sp-grow" style="font-size: 13px">Layout</span>
        <sp-segmented class="sp-segmented" data-part="modes" data-axis="Reflow" data-term="choreographed" data-value="choreographed">
          ${MODES.map(
            (mode) => `
            <button class="sp-segment" type="button" data-part="seg-${mode.key}" value="${mode.key}" style="padding: 4px 9px; font-size: 11px; white-space: nowrap">${mode.label}</button>`,
          ).join('')}
        </sp-segmented>
      </div>

      <div style="display: flex; justify-content: center; width: ${CANVAS}px; height: ${HEIGHT}px">
        <div
          data-part="viewport"
          style="display: flex; gap: ${GAP}px; width: ${CANVAS}px; height: ${HEIGHT}px; padding: 8px;
                 background: var(--sp-sunken); border: 2px dashed var(--sp-line); border-radius: var(--sp-radius)"
        >
          <div data-part="rail" style="display: flex; flex-direction: column; gap: ${GAP}px; flex: 0 0 124px"></div>
          <div data-part="main" style="display: flex; flex-direction: column; gap: ${GAP}px; flex: 1 1 auto; min-width: 0"></div>

          <div
            data-part="promo"
            data-subject
            data-order="choreographed"
            data-pose="[data-order=choreographed]"
            style="display: flex; flex-direction: column; justify-content: center; gap: 5px; flex: 0 0 auto; padding: 6px 8px;
                   background: var(--sp-accent-soft); border: 1px solid var(--sp-accent); border-radius: 6px"
          >
            <span style="font-size: 11px; font-weight: 600; color: var(--sp-ink); white-space: nowrap">Subscribe</span>
            <span class="sp-line" style="width: 84%; height: 5px"></span>
          </div>

          <div
            class="sp-context"
            data-part="related"
            style="display: flex; flex-direction: column; justify-content: center; gap: 5px; flex: 0 0 auto; padding: 6px 8px;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px"
          >
            <span class="sp-label" style="font-size: 10px; white-space: nowrap">Related</span>
            <span class="sp-line" style="width: 90%; height: 5px"></span>
            <span class="sp-line" style="width: 68%; height: 5px"></span>
          </div>

          <div
            class="sp-context"
            data-part="title"
            style="display: flex; align-items: center; flex: 0 0 auto; padding: 0 8px; font-size: 13px; font-weight: 600;
                   white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
          >Trail conditions</div>

          <div
            class="sp-context"
            data-part="body"
            style="display: flex; flex-direction: column; gap: 6px; padding: 8px; background: var(--sp-surface);
                   border: 1px solid var(--sp-line); border-radius: 6px"
          >
            ${[96, 88, 94, 74, 90]
              .map((width, i) => `<span class="sp-line" data-part="body-line-${i + 1}" style="width: ${width}%; height: 5px"></span>`)
              .join('')}
          </div>
        </div>
      </div>

      <span
        class="sp-text sp-context"
        data-part="note"
        role="status"
        style="display: block; width: ${CANVAS}px; height: 32px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const rail = part(root, 'rail');
  const main = part(root, 'main');
  const promo = part(root, 'promo');
  const related = part(root, 'related');
  const title = part(root, 'title');
  const body = part(root, 'body');
  const note = part(root, 'note');
  const extraLines = [4, 5].map((i) => part(root, `body-line-${i}`));

  const apply = (key: string) => {
    const wide = key === 'wide';
    viewport.style.width = `${wide ? CANVAS : NARROW}px`;
    viewport.style.flexDirection = wide ? 'row' : 'column';
    rail.style.display = wide ? 'flex' : 'none';
    main.style.display = wide ? 'flex' : 'none';
    for (const line of extraLines) line.style.display = wide ? 'block' : 'none';

    promo.style.height = wide ? '46px' : '40px';
    related.style.height = wide ? '' : '42px';
    related.style.flex = wide ? '1 1 auto' : '0 0 auto';
    title.style.height = '22px';
    body.style.flex = '1 1 auto';

    if (wide) {
      rail.append(promo, related);
      main.append(title, body);
    } else if (key === 'source') {
      // Source order: the sidebar was authored first, so it stacks first.
      viewport.append(promo, related, title, body);
    } else {
      viewport.append(title, body, promo, related);
    }

    // Read back on boxes nothing transitions: where the promo landed against the article body.
    const promoBox = promo.getBoundingClientRect();
    const bodyBox = body.getBoundingClientRect();
    const beside = promoBox.right <= bodyBox.left + 1;
    const order = beside ? 'columns' : promoBox.top > bodyBox.top ? 'choreographed' : 'source';
    promo.dataset.order = order;
    note.textContent =
      order === 'columns'
        ? 'Two columns: the promo sits in the sidebar, beside the article it belongs to.'
        : order === 'source'
          ? 'Collapsed in source order: the promo lands above the article, because the sidebar came first.'
          : 'Choreographed: the article keeps the top of the page and the promo follows it down.';
  };

  part(root, 'modes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('choreographed');
}
