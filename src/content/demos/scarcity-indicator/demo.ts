import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Level = 'plenty' | 'low' | 'out';

const STOCK: Record<Level, number> = { plenty: 24, low: 3, out: 0 };

const LINE: Record<Level, string> = {
  plenty: '',
  low: 'Only 3 left in size M',
  out: 'Sold out in size M',
};

const ACTION: Record<Level, string> = {
  plenty: 'Add to bag',
  low: 'Add to bag',
  out: 'Sold out',
};

const VERDICT: Record<Level, string> = {
  plenty: '24 in the warehouse, so there is nothing to report and the line stays away.',
  low: 'The line prints the number inventory holds, scoped to the size being bought.',
  out: 'At zero it says so. A count that never reaches sold out was never counting.',
};

/**
 * Scarcity indicator specimen: the honest one. A shop row with the warehouse figure
 * shown beside the line derived from it, and a segmented control that changes the
 * stock rather than the wording, so the reader watches the indicator appear only when
 * the real number is genuinely low and say sold out when it hits zero.
 *
 * The subject is the indicator line itself, the narrowest element the term names. The
 * product, the inventory readout, and the action it sits beside are scenery (SPEC §5).
 * No `data-pose`: there is no dishonest state here, because the counterfeit has its own
 * entry and this specimen deliberately does not build one.
 *
 * The line holds its box from mount and only its words change, so an indicator arriving
 * never moves the button under the reader's thumb (SPEC §5). Each segment is an
 * absolute pick, and the pass ends on the low state the specimen mounts in (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Kestrel Supply</span>
          <span class="sp-label" style="font-size: 11px">Bag (0)</span>
        </div>
        <div class="sp-body sp-row" style="align-items: stretch; gap: 12px">

          <div class="sp-context" style="display: flex; flex-direction: column; gap: 8px; flex: 0 0 auto; width: 118px">
            <div class="sp-swatch sp-grow" style="--sp-swatch: var(--sp-sunken); border: 1px solid var(--sp-line)"></div>
            <div class="sp-row sp-row--between" style="height: 16px">
              <span class="sp-label" style="font-size: 11px">Warehouse</span>
              <span class="sp-text sp-text--ink" data-part="inventory" data-count="3" style="font-size: 11px; font-variant-numeric: tabular-nums">3</span>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto; min-width: 0">
            <div class="sp-context" style="display: flex; flex-direction: column; gap: 2px">
              <span class="sp-heading" style="font-size: 14px">Cotton overshirt</span>
              <span class="sp-text" style="font-size: 12px">Ecru, size M &middot; 78.00</span>
            </div>
            <span class="sp-divider sp-context"></span>
            <div style="display: flex; flex-direction: column; justify-content: flex-end; gap: 8px; flex: 1 1 auto; min-height: 0">
              <span
                class="sp-row"
                data-part="stock-line"
                data-subject
                data-level="low"
                role="status"
                style="gap: 6px; height: 18px; font-size: 12px; font-weight: 500; color: var(--sp-warn)"
              >
                <span data-part="stock-dot" style="width: 7px; height: 7px; border-radius: 50%; background: currentcolor"></span>
                <span data-part="stock-text">${LINE.low}</span>
              </span>
              <button class="sp-button sp-context" data-part="buy" type="button" style="width: 100%">${ACTION.low}</button>
              <span class="sp-label sp-context" data-part="derived" style="height: 14px; font-size: 10px">Read from inventory when the page was built</span>
            </div>
          </div>

        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="width: 262px; font-size: 11px">${VERDICT.low}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Stock" data-part="level" data-value="low">
          <button class="sp-segment" data-part="level-plenty" value="plenty">24 left</button>
          <button class="sp-segment" data-part="level-low" value="low">3 left</button>
          <button class="sp-segment" data-part="level-out" value="out">0 left</button>
        </sp-segmented>
      
    </div>
  `;

  const line = part(root, 'stock-line');
  const lineText = part(root, 'stock-text');
  const dot = part(root, 'stock-dot');
  const inventory = part(root, 'inventory');
  const buy = part(root, 'buy');
  const verdict = part(root, 'verdict');

  const show = (level: Level) => {
    line.dataset.level = level;
    lineText.textContent = LINE[level];
    // Nothing to report is a state of the line, not a hole in the layout: the box stays.
    line.style.visibility = level === 'plenty' ? 'hidden' : 'visible';
    line.style.color = level === 'out' ? 'var(--sp-muted)' : 'var(--sp-warn)';
    // Left unset rather than set visible, so the dot inherits the line's own hidden
    // state instead of overriding it when there is nothing to report.
    dot.style.visibility = level === 'out' ? 'hidden' : '';
    inventory.textContent = String(STOCK[level]);
    inventory.dataset.count = String(STOCK[level]);
    buy.textContent = ACTION[level];
    buy.setAttribute('aria-disabled', String(level === 'out'));
    verdict.textContent = VERDICT[level];
  };

  part(root, 'level').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    show(value === 'plenty' ? 'plenty' : value === 'out' ? 'out' : 'low');
  });

  show('low');
}
