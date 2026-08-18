import { part } from '#src/kit/parts.ts';

const ROW_H = 28;

const ITEMS = [
  { key: 'mug', name: 'Enamel mug, speckled', price: '14.00' },
  { key: 'tote', name: 'Cotton tote, natural', price: '22.00' },
] as const;

type Key = (typeof ITEMS)[number]['key'];

const NOTE = {
  basket: 'A basket is an intention to buy now. Saving moves the item sideways instead, and the row it left keeps the undo.',
  saved: 'The item is parked, not bought and not deleted, and the basket total no longer counts it.',
} as const;

/** One reserved slot: whichever of its two children is currently on shows, and the height never changes. */
const slot = (inner: string) => `<div style="height: ${ROW_H}px">${inner}</div>`;

const basketRow = ({ key, name, price }: { key: string; name: string; price: string }) => `
  <div class="sp-surface sp-context sp-row" data-part="cart-${key}" style="height: ${ROW_H}px; gap: 8px; padding: 0 8px">
    <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 12px">${name}</span>
    <span class="sp-text" style="font-size: 12px">${price}</span>
    <button class="sp-button sp-button--ghost sp-button--sm" data-part="save-${key}" type="button" style="padding: 2px 8px; font-size: 11px">
      Save for later
    </button>
  </div>`;

const undoRow = ({ key, name }: { key: string; name: string }) => `
  <div
    class="sp-surface sp-context sp-row"
    data-part="undo-${key}"
    hidden
    style="height: ${ROW_H}px; gap: 8px; padding: 0 8px; border-style: dashed"
  >
    <span class="sp-text sp-grow" style="min-width: 0; font-size: 11px">${name} moved to Saved for later</span>
    <button class="sp-button sp-button--ghost sp-button--sm" data-part="undo-btn-${key}" type="button" style="padding: 2px 8px; font-size: 11px">
      Undo
    </button>
  </div>`;

const savedRow = (key: string, name: string, price: string, when: string, hidden: boolean, extra: string) => `
  <div
    class="sp-surface sp-row"
    data-part="saved-${key}"
    ${hidden ? 'hidden' : ''}
    ${extra}
    style="height: ${ROW_H}px; gap: 8px; padding: 0 8px"
  >
    <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 12px">${name}</span>
    <span class="sp-text" style="font-size: 12px">${price}</span>
    <span class="sp-label" style="font-size: 10px">${when}</span>
  </div>`;

/**
 * Save for later specimen: a small basket where each row can be parked into the saved list
 * underneath it. Saving moves the item out of the basket, drops the basket count, and
 * leaves an undo on the row the item vacated; undo puts it back. Neither control ever
 * flips what it finds, so the script can be resumed anywhere (SPEC §8).
 *
 * The subject is a parked item, the notebook that was already saved when the specimen
 * mounted. The Save control was the other candidate and loses on stability: it leaves with
 * the row it saves, so identify would have nothing to ring for half the states this
 * specimen passes through, and the term is a place an item is in as much as a button
 * (SPEC §5). The parked rows carry no control of their own for the same reason: a subject
 * that can be moved out of the saved list is a subject that can stop being the term.
 *
 * Every row in both lists sits in a slot of fixed height, and the undo strip is exactly
 * as tall as the row it replaces, so an item crossing between the lists moves nothing
 * else (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const basket = ITEMS.map((item) => slot(`${basketRow(item)}${undoRow(item)}`)).join('');
  const parked = [
    savedRow('notebook', 'Field notebook, ruled', '9.00', 'Saved 3 Feb', false, 'data-subject'),
    savedRow('mug', 'Enamel mug, speckled', '14.00', 'Saved just now', true, 'class="sp-context"'),
    savedRow('tote', 'Cotton tote, natural', '22.00', 'Saved just now', true, 'class="sp-context"'),
  ]
    .map(slot)
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 260px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Basket</span>
          <span class="sp-label" data-part="basket-count" style="font-size: 11px">2 items</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">

          <div class="sp-stack" data-part="basket" style="flex: 0 0 auto; gap: 6px">${basket}</div>

          <div class="sp-divider sp-context" style="flex: 0 0 auto"></div>

          <div class="sp-stack" style="flex: 0 0 auto; gap: 6px">
            <span class="sp-label sp-context" data-part="saved-label" style="height: 12px; font-size: 11px">Saved for later (1)</span>
            <div class="sp-stack" data-part="saved-list" data-count="1" style="gap: 6px">${parked}</div>
          </div>

        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-part="note" style="width: 440px; font-size: 11px">${NOTE.basket}</span>
      </div>
    </div>
  `;

  const savedList = part(root, 'saved-list');
  const savedLabel = part(root, 'saved-label');
  const basketCount = part(root, 'basket-count');
  const note = part(root, 'note');

  const saved = new Set<Key>();
  /** Items that changed lists during this mount: only those get an undo on the row they left. */
  const moved = new Set<Key>();

  const show = () => {
    for (const { key } of ITEMS) {
      const isSaved = saved.has(key);
      part(root, `cart-${key}`).hidden = isSaved;
      part(root, `undo-${key}`).hidden = !(isSaved && moved.has(key));
      part(root, `saved-${key}`).hidden = !isSaved;
    }
    const count = saved.size + 1;
    savedList.dataset.count = String(count);
    savedLabel.textContent = `Saved for later (${count})`;
    const inBasket = ITEMS.length - saved.size;
    basketCount.textContent = inBasket === 1 ? '1 item' : `${inBasket} items`;
    note.textContent = saved.size > 0 ? NOTE.saved : NOTE.basket;
  };

  // Save only ever parks and Undo only ever restores, so neither can land the specimen in
  // a state the script did not ask for (SPEC §8).
  for (const { key } of ITEMS) {
    part(root, `save-${key}`).addEventListener('click', () => {
      if (saved.has(key)) return;
      saved.add(key);
      moved.add(key);
      show();
    });
    part(root, `undo-btn-${key}`).addEventListener('click', () => {
      if (!saved.has(key)) return;
      saved.delete(key);
      moved.delete(key);
      show();
    });
  }

  show();
}
