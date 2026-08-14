import { part } from '#src/kit/parts.ts';

const CODE = 'SPRING10';
const TAX_RATE = 0.06;
const SHIPPING = 4.5;

const ITEMS = [
  { name: 'Reading lamp, brass', qty: 1, price: 48 },
  { name: 'Linen shade', qty: 2, price: 7 },
] as const;

const SUBTOTAL = ITEMS.reduce((sum, item) => sum + item.qty * item.price, 0);

const money = (value: number) => value.toFixed(2);

function costRow(key: string, label: string, value: string, extra = ''): string {
  return `
    <div class="sp-row sp-row--between" data-part="line-${key}" style="height: 17px${extra}">
      <span class="sp-text" style="font-size: 12px">${label}</span>
      <span class="sp-text sp-text--ink" data-part="value-${key}" style="font-size: 12px; font-variant-numeric: tabular-nums">${value}</span>
    </div>`;
}

/**
 * Order summary specimen: the receipt in progress, standing beside a checkout that is
 * still being filled in. Every cost has a named row, and applying a code inserts a
 * discount row and moves the tax and the total with it, in the open.
 *
 * The subject is the summary panel, not the checkout around it. The payment column and
 * the frame are the setting the term needs in order to be a summary *of* something
 * (SPEC §5). The promo field lives inside the panel because a discount is one of the
 * lines this panel is responsible for, not instrumentation bolted to the demo.
 *
 * The discount row keeps its height from mount and only becomes visible, so a code
 * changes numbers and nothing else moves (SPEC §5). Apply reaches one state however
 * often it is pressed (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const items = ITEMS.map(
    ({ name, qty, price }) => `
      <div class="sp-row sp-row--between" style="gap: 8px; height: 18px">
        <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${name}</span>
        <span class="sp-text" style="font-size: 12px">&times;${qty}</span>
        <span class="sp-text sp-text--ink" style="font-size: 12px; font-variant-numeric: tabular-nums">${money(qty * price)}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 306px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Checkout</span><span class="sp-label">Step 3 of 3</span></div>
        <div class="sp-body" style="display: flex; flex-direction: row; gap: 10px">

          <section class="sp-context" style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto; min-width: 0">
            <span class="sp-heading" style="font-size: 14px">Payment</span>
            <span class="sp-text" style="font-size: 12px">Contact and delivery are done. Card details next.</span>
            <input class="sp-input" data-part="card" type="text" value="4242 4242 4242 4242" readonly aria-label="Card number" />
            <div class="sp-row" style="gap: 8px">
              <input class="sp-input" type="text" value="04/29" readonly aria-label="Expiry" style="width: 70px" />
              <input class="sp-input" type="text" value="123" readonly aria-label="Security code" style="width: 62px" />
            </div>
            <button class="sp-button" data-part="pay" type="button" style="margin-top: auto">Pay <span data-part="pay-total">${money(SUBTOTAL + SHIPPING + SUBTOTAL * TAX_RATE)}</span></button>
          </section>

          <section class="sp-surface" data-part="summary" data-subject
                   style="display: flex; flex-direction: column; gap: 5px; flex: 0 0 auto; width: 214px; padding: 9px 10px">
            <span class="sp-label">Order summary</span>
            ${items}
            <span class="sp-divider"></span>
            ${costRow('subtotal', 'Subtotal', money(SUBTOTAL))}
            ${costRow('shipping', 'Shipping, 2 to 4 days', money(SHIPPING))}
            ${costRow('tax', 'Tax at 6%', money(SUBTOTAL * TAX_RATE))}
            ${costRow('discount', `Discount, ${CODE}`, '0.00', '; visibility: hidden')}
            <span class="sp-divider"></span>
            <div class="sp-row sp-row--between" data-part="line-total" style="height: 20px">
              <span class="sp-text sp-text--ink" style="font-weight: 600">Total</span>
              <span class="sp-text sp-text--ink" data-part="value-total" style="font-weight: 600; font-variant-numeric: tabular-nums">${money(SUBTOTAL + SHIPPING + SUBTOTAL * TAX_RATE)}</span>
            </div>
            <div class="sp-row" style="gap: 6px; margin-top: auto">
              <input class="sp-input sp-grow" data-part="promo" type="text" spellcheck="false" placeholder="Promo code" aria-label="Promo code" style="min-width: 0; font-size: 12px" />
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="apply" type="button" style="padding: 5px 8px; font-size: 12px">Apply</button>
            </div>
          </section>

        </div>
      </div>
    </div>
  `;

  const summary = part(root, 'summary');
  const promo = part(root, 'promo') as HTMLInputElement;
  const discountRow = part(root, 'line-discount');

  const total = (discount: number) => {
    const taxed = SUBTOTAL - discount;
    return taxed + SHIPPING + taxed * TAX_RATE;
  };

  part(root, 'apply').addEventListener('click', () => {
    if (summary.hasAttribute('data-discounted')) return;
    if (promo.value.trim().toUpperCase() !== CODE) return;
    const discount = SUBTOTAL * 0.1;
    summary.setAttribute('data-discounted', '');
    discountRow.style.visibility = 'visible';
    part(root, 'value-discount').textContent = `-${money(discount)}`;
    // The tax moves with the thing it is charged on, in the open: a total that changed
    // for a reason the reader can follow is the whole point of the panel.
    part(root, 'value-tax').textContent = money((SUBTOTAL - discount) * TAX_RATE);
    part(root, 'value-total').textContent = money(total(discount));
    part(root, 'pay-total').textContent = money(total(discount));
    promo.readOnly = true;
  });
}
