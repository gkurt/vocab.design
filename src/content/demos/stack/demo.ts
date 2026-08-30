import { localBox } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * One rule for every gap, against four margins that each had their own idea. The
 * ragged margins sum to the same total as three even gaps do, so switching modes
 * redistributes the space without moving the readout below it (SPEC §5).
 */
const GAP = 12;
const SOUP = [0, 4, 22, 10];

/**
 * Stack specimen: the same four blocks spaced two ways. Under "per item" each
 * block carries its own top margin and the rhythm is ragged; under "one rule" the
 * gaps come from the parent and every one of them is identical.
 *
 * The subject is the column, since that is what the term names: the parent that
 * owns the spacing. The switcher and the readout are the specimen's own
 * instrumentation and stay scenery (SPEC §5).
 *
 * `data-rhythm` is measured, not asserted by hand. The demo reads the gaps between
 * the boxes and says how many distinct ones it found, which is the only claim that
 * could catch a stack whose spacing was even in the markup and not on screen.
 *
 * The frame is as tall as the four boxes, so neither arrangement is cut by the
 * window it is shown in (SPEC §5).
 *
 * The readout ("one rule on the parent: gap 12px" against "four margins, three
 * different gaps") is the author reading the arrangement out, not the product
 * labelling itself, and it changes with the switch, so it carries
 * `data-stage-verdict` and the stage draws it in the strip (SPEC §5.1). It used to
 * sit under the column, which is why the frame is 26px shorter.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 246px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Spacing</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Approach" data-part="segmented" data-value="stack">
            <button class="sp-segment" data-part="seg-soup" value="soup">Per item</button>
            <button class="sp-segment" data-part="seg-stack" value="stack">One rule</button>
          </sp-segmented>
        </div>
        <div class="sp-body">
          <div data-part="column" data-subject data-mode="stack" data-rhythm="even" style="padding: 0 10px">
            <div class="sp-surface" data-part="item-1" style="padding: 6px 10px; margin-top: 0px">
              <span class="sp-heading" style="font-size: 13px">Tide tables</span>
            </div>
            <div class="sp-surface" data-part="item-2" style="padding: 8px 10px; margin-top: 0px">
              <div class="sp-stack" style="gap: 6px">
                <div class="sp-line" style="width: 88%"></div>
                <div class="sp-line" style="width: 72%"></div>
              </div>
            </div>
            <div class="sp-surface" data-part="item-3" style="padding: 8px 10px; margin-top: 0px">
              <div class="sp-line" style="width: 54%"></div>
            </div>
            <div class="sp-surface" data-part="item-4" style="padding: 6px 10px; margin-top: 0px">
              <span class="sp-label">Revised in March</span>
            </div>
          </div>
          <p class="sp-text sp-context" data-stage-verdict data-part="readout" style="margin: 8px 0 0; text-align: center"></p>
        </div>
      </div>
    </div>
  `;

  const column = part(root, 'column');
  const readout = part(root, 'readout');
  const items = [1, 2, 3, 4].map((n) => part(root, `item-${n}`));

  /** How many different gaps a reader would actually see between the boxes. */
  const measure = () => {
    const gaps = new Set<number>();
    for (let i = 1; i < items.length; i++) {
      const previous = items[i - 1];
      const item = items[i];
      if (!previous || !item) continue;
      const above = localBox(previous, column);
      const box = localBox(item, column);
      gaps.add(Math.round(box.top - (above.top + above.height)));
    }
    column.dataset.rhythm = gaps.size === 1 ? 'even' : 'ragged';
  };

  const setMode = (mode: string) => {
    const stacked = mode === 'stack';
    column.dataset.mode = stacked ? 'stack' : 'soup';
    column.style.display = stacked ? 'flex' : 'block';
    column.style.flexDirection = stacked ? 'column' : '';
    column.style.gap = stacked ? `${GAP}px` : '';
    items.forEach((item, index) => {
      item.style.marginTop = stacked ? '0px' : `${SOUP[index] ?? 0}px`;
    });
    readout.textContent = stacked ? `one rule on the parent: gap ${GAP}px` : 'four margins, three different gaps';
    measure();
  };

  part(root, 'segmented').addEventListener('change', (event) => setMode((event as CustomEvent<string>).detail));
  // Mounts on the term itself: the identify pose is the mount state, and a stack
  // posed as margin soup would claim the counter-example (SPEC §6).
  setMode('stack');
}
