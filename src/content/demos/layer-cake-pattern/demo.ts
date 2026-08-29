import { flag, part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import { localBox } from '#src/kit/measure.ts';

/** The page under the traces, at a size the demo states rather than measures. */
const PAGE_W = 444;
const PAGE_H = 202;

type Mode = 'subheads' | 'flat';

const SECTIONS: [string, string[]][] = [
  ['What you need', ['96%', '88%']],
  ['Fees and deposits', ['92%', '78%']],
  ['After you apply', ['90%', '84%']],
];

const NOTES: Record<Mode, string> = {
  subheads: 'The headings get read. The paragraphs between them do not.',
  flat: 'Take the subheadings out and the same page gets scanned as an F.',
};

const line = (width: string) => `<div class="sp-line" data-part="line" style="width: ${width}; height: 8px"></div>`;

const VIEWS: Record<Mode, () => string> = {
  subheads: () => `
    <span class="sp-heading" data-part="head" style="align-self: flex-start; font-size: 13px">Applying for a berth</span>
    ${SECTIONS.map(
      ([title, widths]) => `
      <span class="sp-heading" data-part="head" style="align-self: flex-start; font-size: 12px; margin-top: 4px">${title}</span>
      ${widths.map(line).join('')}`,
    ).join('')}`,
  // The same words of body text, run together: the subheadings are what was removed.
  flat: () => `
    <span class="sp-heading" data-part="head" style="align-self: flex-start; font-size: 13px">Applying for a berth</span>
    ${['98%', '94%', '96%', '86%', '92%', '78%', '90%', '96%', '88%', '92%', '74%'].map(line).join('')}`,
};

/**
 * Layer cake specimen: a page of subheaded prose with the fixations drawn as bands on the
 * headings, and the same page with its subheadings taken out, where the bands collapse into
 * an F down the left edge.
 *
 * The subject is the banded trace, the decision the F pattern and Z pattern specimens made:
 * the term names where fixations land rather than a component, so the narrowest element it
 * names is the figure tracing them, and the page underneath is the scene (SPEC §5). The
 * flattened page carries its own trace as context, so nothing pretends a wall of text is
 * layered. Neither overlay takes pointer events, so a reader's click reaches the page below.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Page structure</span>
          <sp-segmented class="sp-segmented" data-axis="Version" data-part="switcher" data-value="subheads">
            <button class="sp-segment" type="button" data-part="seg-subheads" value="subheads">subheadings</button>
            <button class="sp-segment" type="button" data-part="seg-flat" value="flat">none</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="page" style="position: relative; flex: 0 0 auto; width: ${PAGE_W}px; height: ${PAGE_H}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div class="sp-context" data-part="view" style="display: flex; flex-direction: column; gap: 5px; padding: 10px 16px"></div>
            <div data-part="bands" data-subject style="position: absolute; pointer-events: none"></div>
            <div data-part="fshape" hidden style="position: absolute; pointer-events: none"></div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 22px; max-width: 434px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const view = part(root, 'view');
  const bands = part(root, 'bands');
  const fshape = part(root, 'fshape');
  const readout = part(root, 'readout');

  const bar = (x: number, y: number, w: number, h: number) =>
    `<span style="position: absolute; left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px; border-radius: ${Math.min(w, h) / 2}px; background: var(--sp-accent); opacity: 0.34"></span>`;

  const dot = (x: number, y: number) =>
    `<span style="position: absolute; left: ${x - 5}px; top: ${y - 5}px; width: 10px; height: 10px; border-radius: 50%; background: var(--sp-accent)"></span>`;

  /**
   * Both traces are measured rather than stated: a band sits on the heading the page
   * actually rendered, and the F runs down the lines it actually laid out. These are static
   * text and rule boxes with nothing transitioned on them, and the read happens after the
   * view carries the content being measured.
   */
  const geometry = (parts: HTMLElement[]) => {
    return parts.map((el) => {
      const box = localBox(el, page);
      return { x: box.left, y: box.top, w: box.width, h: box.height };
    });
  };

  const place = (host: HTMLElement, boxes: { x: number; y: number; w: number; h: number }[], paint: (dx: number, dy: number) => string) => {
    const pad = 8;
    const left = Math.min(...boxes.map((b) => b.x)) - pad;
    const top = Math.min(...boxes.map((b) => b.y)) - pad;
    const right = Math.max(...boxes.map((b) => b.x + b.w)) + pad;
    const bottom = Math.max(...boxes.map((b) => b.y + b.h)) + pad;
    host.style.left = `${left}px`;
    host.style.top = `${top}px`;
    host.style.width = `${right - left}px`;
    host.style.height = `${bottom - top}px`;
    host.innerHTML = paint(left, top);
  };

  const drawBands = () => {
    const heads = geometry(partsOf(view, 'head'));
    place(bands, heads, (dx, dy) =>
      heads
        .map(({ x, y, w, h }) => {
          const cy = y + h / 2 - dy;
          return bar(x - dx - 4, cy - 6, w + 8, 12) + dot(x - dx, cy);
        })
        .join(''),
    );
  };

  const drawF = () => {
    const rows = geometry([...partsOf(view, 'head'), ...partsOf(view, 'line')]);
    const first = rows[0];
    const second = rows[1];
    const last = rows[rows.length - 1];
    if (!first || !second || !last) return;
    place(fshape, rows, (dx, dy) => {
      const x = first.x - dx;
      const topY = first.y + first.h / 2 - dy;
      const midY = second.y + second.h / 2 - dy;
      const endY = last.y + last.h / 2 - dy;
      return (
        bar(x - 4, topY - 5, first.w + 8, 11) +
        bar(x - 4, midY - 5, second.w * 0.72, 11) +
        bar(x - 5, topY, 11, endY - topY) +
        dot(x, topY) +
        dot(x, endY)
      );
    });
  };

  const apply = (mode: Mode) => {
    view.innerHTML = VIEWS[mode]();
    readout.textContent = NOTES[mode];
    flag(bands, 'hidden', mode !== 'subheads');
    flag(fshape, 'hidden', mode !== 'flat');
    if (mode === 'subheads') drawBands();
    else drawF();
  };

  // Each segment names a version of the page, so the switch lands on that version rather
  // than flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail as Mode));

  apply('subheads');
}
