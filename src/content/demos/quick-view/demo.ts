import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const PRODUCTS = [
  { id: 'kettle', name: 'Enamel kettle', price: '$48', note: 'Two sizes, ships in 2 days.', swatch: '#8fb6c9' },
  { id: 'crate', name: 'Ash crate', price: '$120', note: 'Stacks three high, oiled finish.', swatch: '#c7a878' },
  { id: 'throw', name: 'Wool throw', price: '$85', note: 'Undyed lambswool, 130 by 180cm.', swatch: '#b3838f' },
] as const;

const FIRST = PRODUCTS[0];

/**
 * Quick view specimen: a summary of one product opened over the list it came from.
 * The subject is that summary panel, and the list stays behind it on purpose: the
 * filter is still applied and every row is still where the reader left it, which is
 * the whole reason the pattern exists rather than a link to a detail page.
 *
 * Dismissal is explicit (close, or the primary action taken), never a toggle on the
 * row's own button, so a pass picked up anywhere opens rather than closes (SPEC §8).
 * The panel is absolutely positioned, so nothing under it moves when it appears.
 */
export function mount(root: HTMLElement): void {
  const rows = PRODUCTS.map(
    (product) => `
      <li class="sp-row sp-surface" data-part="row-${product.id}" style="gap: 10px; padding: 8px 10px">
        <span class="sp-swatch" style="width: 38px; height: 38px; --sp-swatch: ${product.swatch}"></span>
        <span class="sp-stack sp-grow" style="gap: 2px">
          <span class="sp-text sp-text--ink">${product.name}</span>
          <span class="sp-text" style="font-size: 12px">${product.price}</span>
        </span>
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="open-${product.id}" data-open-id="${product.id}" type="button">
          Quick view
        </button>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 272px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Kitchen</span>
          <span class="sp-chip" data-part="filter" data-selected>In stock</span>
          <span class="sp-row sp-text" data-part="bag" data-count="0" style="gap: 6px">${icon('inbox')}<span data-part="bag-text">Bag 0</span></span>
        </div>
        <div class="sp-body sp-context">
          <ul class="sp-list" data-part="list" style="gap: 8px">${rows}</ul>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div
          class="sp-surface"
          data-part="quickview"
          data-subject
          role="dialog"
          aria-label="Quick view"
          hidden
          style="position: absolute; left: 40px; right: 40px; top: 52px; padding: 14px; box-shadow: var(--sp-shadow)"
        >
          <div class="sp-row" style="gap: 12px; align-items: flex-start">
            <span class="sp-swatch" data-part="qv-thumb" style="width: 64px; height: 64px; --sp-swatch: ${FIRST?.swatch}"></span>
            <span class="sp-stack sp-grow" style="gap: 3px">
              <span class="sp-heading" data-part="qv-name">${FIRST?.name}</span>
              <span class="sp-text sp-text--ink" data-part="qv-price">${FIRST?.price}</span>
              <span class="sp-text" data-part="qv-note" style="font-size: 12px">${FIRST?.note}</span>
              <button class="sp-button sp-button--sm" data-part="qv-add" type="button" style="margin-top: 5px; align-self: flex-start">Add to bag</button>
            </span>
            <button class="sp-icon-button" data-part="qv-close" type="button" aria-label="Close quick view">${icon('close')}</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const panel = part(root, 'quickview');
  const scrim = part(root, 'scrim');
  const thumb = part(root, 'qv-thumb');
  const name = part(root, 'qv-name');
  const price = part(root, 'qv-price');
  const note = part(root, 'qv-note');
  const bag = part(root, 'bag');
  const bagText = part(root, 'bag-text');
  let inBag = 0;

  const close = () => {
    panel.hidden = true;
    flag(scrim, 'data-open', false);
  };

  part(root, 'list').addEventListener('click', (event) => {
    const id = (event.target as HTMLElement).closest<HTMLElement>('[data-open-id]')?.dataset.openId;
    const product = PRODUCTS.find((candidate) => candidate.id === id);
    if (!product) return;
    thumb.style.setProperty('--sp-swatch', product.swatch);
    name.textContent = product.name;
    price.textContent = product.price;
    note.textContent = product.note;
    panel.hidden = false;
    flag(scrim, 'data-open', true);
  });

  part(root, 'qv-close').addEventListener('click', close);
  part(root, 'qv-add').addEventListener('click', () => {
    inBag += 1;
    bag.dataset.count = String(inBag);
    bagText.textContent = `Bag ${inBag}`;
    close();
  });
  scrim.addEventListener('click', close);
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
}
