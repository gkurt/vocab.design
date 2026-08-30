import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'fake' | 'fair';

/** The crowd, reseeded on every refresh. A range and a random draw, exactly as shipped. */
const VIEWERS = [14, 27, 6, 19];
/** The one number that comes from inventory, so it is the same number every time. */
const STOCK = 12;

const CHIP = 'display: inline-flex; align-items: center; gap: 6px; cursor: default';
const DOT = (color: string) => `<span style="width: 6px; height: 6px; border-radius: 50%; background: ${color}"></span>`;

const VERDICT = {
  fake: 'Refresh the page and the crowd changes size. Nothing was counted, so nothing can run out.',
  fair: 'A count read from inventory holds still, names its unit, and can reach zero.',
} as const;

function body(mode: Mode, viewers: number): string {
  if (mode === 'fair')
    return `
      <span class="sp-chip" data-part="stock" style="${CHIP}">${DOT('var(--sp-accent)')}${STOCK} rooms left for these dates</span>
      <span class="sp-chip" style="${CHIP}">Free cancellation until 28 May</span>`;
  return `
    <span class="sp-chip" data-part="only-two" style="${CHIP}; border-color: var(--sp-warn); color: var(--sp-warn)">
      ${DOT('var(--sp-warn)')}Only 2 left at this price
    </span>
    <span class="sp-chip" data-part="viewers" style="${CHIP}">${DOT('var(--sp-warn)')}${viewers} people are viewing this now</span>
    <span class="sp-chip" style="${CHIP}">Booked 6 times in the last hour</span>`;
}

/**
 * Fake scarcity specimen: a room listing with the pressure chips a booking site prints
 * under it, and the page's own refresh control put where a reader can reach it. Pressing
 * it is the demonstration: the crowd is redrawn from a range every time, while the stock
 * count in the honest state is the same number it was before, because it is read from
 * inventory.
 *
 * The subject is the chip row, not the listing: the term names the supply claim, and the
 * room it sits under is only what the claim is about (SPEC §5). The row declares the fake
 * state as its honest condition (`data-pose`), since ringing a real availability count
 * would be a picture of the opposite word (SPEC §6). The row holds one height for both
 * states and the chips wrap inside it, so a redraw moves nothing around it (SPEC §5).
 *
 * A label used to sit over the row, reading "Availability chips (as shipped)" and
 * "(made honest)" with the pick. No booking page annotates its own chips like that, and the
 * strip's verdict already says which state is up, which a specimen may not say twice. It is
 * gone; the row now stands on its own under the listing.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Stays in Lisbon</span>
          <span class="sp-label" data-part="refresh-count" style="font-size: 11px">Refreshes: 0</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="refresh" type="button">Refresh</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-context" style="padding: 8px 10px">
            <div class="sp-row sp-row--between">
              <span class="sp-text sp-text--ink">Casa Amarela, Alfama</span><span class="sp-text">128.00 a night</span>
            </div>
            <div class="sp-text" style="margin-top: 2px; font-size: 12px">Double room, 2 nights, breakfast included</div>
          </div>
          <div
            class="sp-row sp-row--wrap"
            data-part="chips"
            data-subject
            data-pose="[data-mode=fake]"
            data-mode="fake"
            data-count="${VIEWERS[0]}"
            data-refreshes="0"
            style="align-content: flex-start; gap: 6px; height: 66px; padding: 8px 10px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >${body('fake', VIEWERS[0] as number)}</div>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="width: 292px; font-size: 11px">${VERDICT.fake}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="fake" data-axis="Fake scarcity" data-term="fake">
          <button class="sp-segment" data-part="mode-fake" value="fake">With</button>
          <button class="sp-segment" data-part="mode-fair" value="fair">Without</button>
        </sp-segmented>
      
    </div>
  `;

  const chips = part(root, 'chips');
  const verdict = part(root, 'verdict');
  const refreshCount = part(root, 'refresh-count');

  let seed = 0;

  const show = (mode: Mode) => {
    const viewers = VIEWERS[seed % VIEWERS.length] as number;
    chips.dataset.mode = mode;
    chips.innerHTML = body(mode, viewers);
    // The number the row currently claims: redrawn from a range, or read from inventory.
    chips.dataset.count = String(mode === 'fake' ? viewers : STOCK);
    verdict.textContent = VERDICT[mode];
  };

  part(root, 'refresh').addEventListener('click', () => {
    const refreshes = Number(chips.dataset.refreshes ?? 0) + 1;
    chips.dataset.refreshes = String(refreshes);
    refreshCount.textContent = `Refreshes: ${refreshes}`;
    // The generated number is redrawn; the inventory number is asked again and answers the same.
    seed += 1;
    show(chips.dataset.mode === 'fair' ? 'fair' : 'fake');
  });

  part(root, 'mode').addEventListener('change', (event) => {
    show((event as CustomEvent<string>).detail === 'fair' ? 'fair' : 'fake');
  });
}
