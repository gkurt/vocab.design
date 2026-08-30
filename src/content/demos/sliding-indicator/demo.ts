import { localBox } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'catalogue', label: 'Catalogue' },
  { id: 'loans', label: 'Loans' },
  { id: 'holds', label: 'Holds' },
];

const SLIDE = 'left 0.22s var(--sp-ease), width 0.22s var(--sp-ease)';

/**
 * Sliding indicator specimen: four tabs and one bar that travels between them. Each
 * pick measures the target tab's box and writes that geometry onto the single bar, so
 * the trip between two tabs is the whole demonstration.
 *
 * The subject is the bar alone, not the tab row: the term names the travelling marker,
 * and the tabs and the panel are the scenery it moves along. Marking the row would claim
 * the whole control is the term and withdraw identify (SPEC §5-6).
 *
 * A row under the panel used to print the bar's own geometry, headed "Measured" and reading
 * "86px wide, at x 0". Nothing in the scene is a ruler, so that was the site measuring its
 * exhibit out loud, and the bar arriving under the new tab at the new tab's width is the
 * measurement. The row is gone.
 *
 * The bar mounts in the state it measures: the first placement writes `transition: none`
 * alongside the geometry, and every later move writes the slide back before the new
 * numbers, which is the same first-paint rule `<sp-segmented>` follows without needing a
 * frame to wait for. Reads always come before writes, so nothing is measured out of a
 * value that a transition has not finished delivering. The rail holds its own height, so
 * a bar that is 74 pixels wide in one place and 62 in another never moves the panel
 * below it (SPEC §5). Each tab resolves to an absolute position rather than stepping
 * along the row, so a fast-forwarded or resumed pass lands where it said (SPEC §8), and
 * the slide is a CSS transition, so `motion.css` flattens it for a reader who asked for
 * less movement.
 */
export function mount(root: HTMLElement): void {
  const tabs = TABS.map(
    (tab) =>
      `<button class="sp-segment" type="button" role="tab" aria-selected="false" data-part="tab-${tab.id}" value="${tab.id}">${tab.label}</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 392px">
        <div class="sp-row sp-context" role="tablist" style="gap: 2px" data-part="tabs">${tabs}</div>
        <div data-part="rail" style="position: relative; height: 3px; margin-top: 2px">
          <span
            data-part="indicator"
            data-subject
            data-at="overview"
            style="position: absolute; top: 0; left: 0; width: 0; height: 3px; border-radius: 999px; background: var(--sp-accent)"
          ></span>
        </div>
        <div class="sp-divider sp-context"></div>
        <div class="sp-stack sp-context" style="gap: 8px; margin-top: 12px; min-height: 62px">
          <span class="sp-heading" data-part="panel-title" style="font-size: 14px">Overview</span>
          <span class="sp-line" style="width: 92%"></span>
          <span class="sp-line" style="width: 74%"></span>
        </div>
      </div>
    </div>
  `;

  const indicator = part(root, 'indicator');
  const rail = part(root, 'rail');
  const title = part(root, 'panel-title');

  const place = (id: string, animate: boolean) => {
    const tab = TABS.find((entry) => entry.id === id);
    if (!tab) return;
    const target = part(root, `tab-${tab.id}`);

    // Read first, in the rail's own pixels, before a single style is written: a listing
    // shows this specimen at half size, and these numbers go back out as lengths.
    const box = localBox(target, rail);
    const left = Math.round(box.left);
    const width = Math.round(box.width);

    indicator.style.transition = animate ? SLIDE : 'none';
    indicator.style.left = `${left}px`;
    indicator.style.width = `${width}px`;
    indicator.dataset.at = tab.id;

    for (const entry of TABS) part(root, `tab-${entry.id}`).setAttribute('aria-selected', String(entry.id === tab.id));
    title.textContent = tab.label;
  };

  for (const tab of TABS) {
    part(root, `tab-${tab.id}`).addEventListener('click', () => place(tab.id, true));
  }

  place('overview', false);
}
