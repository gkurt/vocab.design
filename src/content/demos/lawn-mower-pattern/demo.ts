import { flag, part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import { localBox } from '#src/kit/measure.ts';

/** The page under the traces, at a size the demo states rather than measures. */
const PAGE_W = 444;
const PAGE_H = 184;

type View = 'table' | 'cards';

const HEAD = ['Plan', 'Berth', 'Power', 'Night rate'];
const ROWS = [
  ['Short stay', '8 m', '16 A', '£22'],
  ['Weekly', '10 m', '16 A', '£96'],
  ['Monthly', '12 m', '32 A', '£310'],
  ['Season', '14 m', '32 A', '£1,240'],
];

const NOTES: Record<View, string> = {
  table: 'Across row one, down, then back the other way: every second row is read right to left.',
  cards: 'Stacked into cards there are no rows to mow, and the four plans read as one serial run.',
};

const VIEWS: Record<View, () => string> = {
  table: () => `
    <table class="sp-table" data-part="table" style="--sp-cell-pad: 8px 12px">
      <thead><tr>${HEAD.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>
        ${ROWS.map((row) => `<tr data-part="row">${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table>`,
  cards: () => `
    <div class="sp-stack" style="gap: 7px; padding: 8px 12px 8px 24px">
      ${ROWS.map(
        (row) => `
        <div class="sp-surface" data-part="card" style="display: flex; align-items: center; gap: 10px; padding: 7px 10px">
          <span class="sp-heading" style="flex: 1 1 auto; font-size: 12px">${row[0]}</span>
          ${row
            .slice(1)
            .map((cell, index) => `<span class="sp-label">${HEAD[index + 1]} <span style="color: var(--sp-ink)">${cell}</span></span>`)
            .join('')}
        </div>`,
      ).join('')}
    </div>`,
};

/**
 * Lawn mower pattern specimen: a comparison table with the mowing trace drawn over it, and
 * the same four plans stacked into cards where the mow has nothing to run along.
 *
 * The subject is the mowing trace, the decision the F pattern and Z pattern specimens made:
 * the term names where fixations travel rather than a component, so the narrowest element it
 * names is the figure tracing them, and the table underneath is the scene (SPEC §5). The
 * cards view carries its own serial trace as context, so nothing pretends a stack is mowed.
 * Neither overlay takes pointer events, so a reader's click reaches the table beneath.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Four plans, one page</span>
          <sp-segmented class="sp-segmented" data-axis="Layout" data-part="switcher" data-value="table">
            <button class="sp-segment" type="button" data-part="seg-table" value="table">table</button>
            <button class="sp-segment" type="button" data-part="seg-cards" value="cards">stacked</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="page" style="position: relative; flex: 0 0 auto; width: ${PAGE_W}px; height: ${PAGE_H}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div class="sp-context" data-part="view"></div>
            <svg data-part="mow" data-subject aria-hidden="true" style="position: absolute; pointer-events: none; overflow: visible"></svg>
            <svg data-part="serial" hidden aria-hidden="true" style="position: absolute; pointer-events: none; overflow: visible"></svg>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 40px; max-width: 434px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const view = part(root, 'view');
  const mow = part(root, 'mow') as unknown as SVGSVGElement;
  const serial = part(root, 'serial') as unknown as SVGSVGElement;
  const readout = part(root, 'readout');

  /**
   * Both traces are measured rather than stated: the mow turns at the ends of the rows the
   * table actually rendered, and the serial run passes through the cards it actually laid
   * out. Row boxes are static layout with nothing transitioned on them, and the read happens
   * after the view carries the rows being measured.
   */
  const trace = (svg: SVGElement, boxes: HTMLElement[], serpentine: boolean) => {
    const inset = serpentine ? 16 : 6;
    const points: [number, number][] = [];

    boxes.forEach((box, index) => {
      const r = localBox(box, page);
      const y = r.top + r.height / 2;
      const left = r.left + inset;
      const right = r.left + r.width - inset;
      if (!serpentine) {
        points.push([left, y]);
        return;
      }
      // Odd rows are travelled right to left: that reversal is the whole pattern.
      if (index % 2 === 0) points.push([left, y], [right, y]);
      else points.push([right, y], [left, y]);
    });

    const xs = points.map(([x]) => x);
    const ys = points.map(([, y]) => y);
    const pad = 12;
    const minX = Math.min(...xs) - pad;
    const minY = Math.min(...ys) - pad;
    const w = Math.max(...xs) - minX + pad;
    const h = Math.max(...ys) - minY + pad;

    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.style.left = `${minX}px`;
    svg.style.top = `${minY}px`;
    svg.style.width = `${w}px`;
    svg.style.height = `${h}px`;

    const local = points.map(([x, y]) => [x - minX, y - minY] as [number, number]);
    const path = local.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');
    const starts = serpentine ? local.filter((_, index) => index % 2 === 0) : local;

    svg.innerHTML = `
      <path d="${path}" fill="none" stroke="var(--sp-accent)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" opacity="0.32" />
      ${starts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="var(--sp-accent)" />`).join('')}
      ${starts
        .map(
          ([x, y], index) =>
            `<text x="${x}" y="${y + 4}" fill="var(--sp-accent-ink)" font-size="11" font-weight="600" text-anchor="middle" font-family="inherit">${index + 1}</text>`,
        )
        .join('')}`;
  };

  const apply = (next: View) => {
    view.innerHTML = VIEWS[next]();
    readout.textContent = NOTES[next];
    flag(mow, 'hidden', next !== 'table');
    flag(serial, 'hidden', next !== 'cards');
    if (next === 'table') trace(mow, partsOf(view, 'row'), true);
    else trace(serial, partsOf(view, 'card'), false);
  };

  // Each segment names a layout, so the switch lands on that layout rather than flipping
  // whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail as View));

  apply('table');
}
