import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const MIN = 1;
const MAX = 8;
const UNIT_PRICE = 24;

/**
 * Stepper specimen: a quantity nudged one unit at a time. The subject is the
 * three part control (minus, value, plus) and nothing else, since the line item
 * it belongs to and the total it drives are the order, not the control.
 *
 * Stepping is what the term is, so the script drives both directions itself and
 * every pass starts from the same mounted value (SPEC §8). The readout is a fixed
 * width column of tabular figures, so 8 is exactly as wide as 1 and nothing in the
 * row moves as the number changes (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-row sp-context" style="gap: 10px">
          <div class="sp-swatch" style="width: 40px; height: 40px; --sp-swatch: var(--sp-sunken)"></div>
          <div class="sp-stack" style="gap: 6px; flex: 1 1 auto">
            <span class="sp-heading">Enamel mug</span>
            <span class="sp-text">$${UNIT_PRICE}.00 each</span>
          </div>
        </div>
        <div class="sp-row sp-row--between" style="margin-top: 16px">
          <span class="sp-label sp-context" id="vd-qty-label">Quantity</span>
          <div
            class="sp-surface sp-row"
            data-part="stepper"
            data-subject
            role="group"
            aria-labelledby="vd-qty-label"
            style="gap: 0; padding: 2px"
          >
            <button class="sp-icon-button" type="button" data-part="decrease" aria-label="Fewer">${icon('minus')}</button>
            <span
              class="sp-text sp-text--ink"
              data-part="value"
              data-value="${MIN}"
              role="spinbutton"
              tabindex="0"
              aria-labelledby="vd-qty-label"
              aria-valuemin="${MIN}"
              aria-valuemax="${MAX}"
              aria-valuenow="${MIN}"
              style="width: 30px; text-align: center; font-variant-numeric: tabular-nums"
            >${MIN}</span>
            <button class="sp-icon-button" type="button" data-part="increase" aria-label="More">${icon('plus')}</button>
          </div>
        </div>
        <div class="sp-divider sp-context" style="margin: 16px 0 10px"></div>
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-text">Subtotal</span>
          <span class="sp-text sp-text--ink" data-part="subtotal" style="width: 64px; text-align: right; font-variant-numeric: tabular-nums">$${UNIT_PRICE}.00</span>
        </div>
      </div>
    </div>
  `;

  const stepper = part(root, 'stepper');
  const value = part(root, 'value');
  const decrease = part(root, 'decrease');
  const increase = part(root, 'increase');
  const subtotal = part(root, 'subtotal');

  let quantity = MIN;

  const draw = () => {
    value.textContent = String(quantity);
    value.dataset.value = String(quantity);
    value.setAttribute('aria-valuenow', String(quantity));
    subtotal.textContent = `$${(quantity * UNIT_PRICE).toFixed(2)}`;
    // An end of the range says so rather than going quietly inert.
    for (const [button, spent] of [
      [decrease, quantity === MIN],
      [increase, quantity === MAX],
    ] as const) {
      button.setAttribute('aria-disabled', String(spent));
      button.style.opacity = spent ? '0.35' : '';
    }
  };

  const step = (delta: number) => {
    const next = Math.min(MAX, Math.max(MIN, quantity + delta));
    if (next === quantity) return;
    quantity = next;
    draw();
  };

  decrease.addEventListener('click', () => step(-1));
  increase.addEventListener('click', () => step(1));

  // The spinbutton's own keyboard, listened for on the group so a press that lands
  // on the readout is heard as well.
  stepper.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowRight') step(1);
    else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') step(-1);
    else if (event.key === 'Home') step(MIN - quantity);
    else if (event.key === 'End') step(MAX - quantity);
    else return;
    event.preventDefault();
  });

  draw();
}
