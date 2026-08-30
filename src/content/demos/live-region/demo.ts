import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The beat between the page changing and a polite queue getting to read it out. */
const SPEAK_MS = 600;

const ITEMS = [
  { key: 'espresso', name: 'Espresso, 250 g', price: 18 },
  { key: 'filter', name: 'Filter blend, 500 g', price: 22 },
];

/**
 * Live region specimen: adding to a cart writes into a status line that no one is
 * looking at and nobody was sent to. Focus never moves, which is the whole promise
 * of the term, and what a polite queue reads out a moment later is drawn in the
 * stage's say lane.
 *
 * The subject is the status line itself, not the message and not the panel: the term
 * names the marked container, which is why it ships empty and stays in the layout.
 * The line's room is reserved from mount, so a message arriving cannot move the panel
 * under it.
 *
 * The utterance used to sit inside the shop as a panel headed "Screen reader, polite
 * queue", which is a stage direction wearing a product's clothes: no roastery prints
 * one. It carries `data-stage-announce` now, so the stage speaks it in the lane above
 * the specimen, and the choreography still finds it because the lane mirrors the
 * source's data attributes.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const rows = ITEMS.map(
    (item) => `
      <li class="sp-list-item">
        <span class="sp-grow">${item.name}</span>
        <span class="sp-label">$${item.price}</span>
        <button class="sp-button sp-button--sm" type="button" data-part="add-${item.key}">Add</button>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Roastery</span>
          <span class="sp-chip" data-part="cart">Cart: 0 items</span>
        </div>
        <ul class="sp-list sp-context" style="margin-top: 8px">${rows}</ul>
        <div style="height: 20px; margin-top: 12px">
          <p class="sp-text sp-text--ink" role="status" data-part="status" data-state="idle" data-subject style="margin: 0"></p>
        </div>
        <p class="sp-text" data-stage-announce data-part="heard" data-state="idle"
           style="margin: 10px 0 0; height: 20px; line-height: 20px">Nothing announced yet</p>
      </div>
    </div>
  `;

  const status = part(root, 'status');
  const heard = part(root, 'heard');
  const cart = part(root, 'cart');

  let count = 0;
  let total = 0;
  let pending: number | undefined;

  for (const item of ITEMS) {
    part(root, `add-${item.key}`).addEventListener('click', () => {
      count += 1;
      total += item.price;
      cart.textContent = `Cart: ${count} item${count === 1 ? '' : 's'}`;
      const message = `${item.name.split(',')[0]} added. Cart: ${count}, $${total}.`;
      status.dataset.state = 'updated';
      status.textContent = message;
      // The queue is not the page: the reader hears it once the current utterance
      // is out of the way, which is the difference between polite and assertive.
      clock.clearTimeout(pending);
      heard.dataset.state = 'queued';
      pending = clock.setTimeout(() => {
        heard.dataset.state = 'spoken';
        heard.textContent = `“${message}”`;
      }, SPEAK_MS);
    });
  }
}
