import { localBox, localSize } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const BOX_W = 452;
const PAD = 8;
const GAP = 6;
const INNER = BOX_W - 2 * PAD;
/** Room for the taller of the two arrangements, so the box never changes size (SPEC §5). */
const BOX_H = 200;

/** Aspect ratios (width over height), the only input a justified layout needs. */
const PHOTOS = [1.5, 0.75, 1.2, 1.6, 1.3, 2.2, 0.9];
const ROWS = [
  [0, 1, 2, 3],
  [4, 5, 6],
];
const COLUMNS = [[1], [6, 5], [2, 3], [0, 4]];

const MODES = [
  { key: 'justified', label: 'justified' },
  { key: 'masonry', label: 'masonry' },
];

/** One justified row: the shared height that makes the widths sum to `INNER`, trim included. */
function justifyRow(indices: number[]): { height: number; widths: number[] } {
  const available = INNER - GAP * (indices.length - 1);
  const ratios = indices.map((i) => PHOTOS[i] ?? 1);
  const sum = ratios.reduce((total, ratio) => total + ratio, 0);
  const height = Math.floor(available / sum);
  const widths = ratios.map((ratio) => Math.floor(height * ratio));
  // The rounding error is spent on one image, which is the crop that lands the row flush.
  const last = widths.length - 1;
  widths[last] = available - widths.slice(0, last).reduce((total, width) => total + width, 0);
  return { height, widths };
}

/** Masonry columns: the widths are fixed, so each image's height is whatever its ratio says. */
function columnWidths(count: number): number[] {
  const available = INNER - GAP * (count - 1);
  const width = Math.floor(available / count);
  const widths = Array.from({ length: count }, () => width);
  widths[count - 1] = available - width * (count - 1);
  return widths;
}

/**
 * Justified gallery specimen: seven photos of clearly different shapes, laid out either justified
 * or masonry, picked absolutely. Justified, the top row's four images are scaled to one shared
 * height and the last one is trimmed by the rounding error, so the row lands flush on both edges;
 * guides above and below the row draw that shared height. Masonry, the same seven photos keep
 * equal column widths and take whatever height their shape asks for, so the bottom edge is ragged.
 *
 * The subject is the top justified row, `data-part="row-1"`, since the row landing on a shared
 * height is the mechanism the term names. The second row, the masonry columns, the guides, the
 * picker and the readout are scenery in the context register; the photos inherit their register
 * from the container they are in, because the same seven elements are moved between the two
 * arrangements rather than duplicated.
 *
 * `data-fit` is measured, not declared: the demo reads the row's images back and reports whether
 * they share a height and end flush against both edges. Nothing here transitions a size, so the
 * read after the write is the real one (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 8px">
      <div class="sp-row sp-context" style="width: ${BOX_W}px">
        <span class="sp-heading sp-grow" style="font-size: 13px">Gallery</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-axis="Layout" data-value="justified">
          ${MODES.map(
            (mode) => `
            <button class="sp-segment" type="button" data-part="seg-${mode.key}" value="${mode.key}" style="padding: 4px 10px; font-size: 11px; white-space: nowrap">${mode.label}</button>`,
          ).join('')}
        </sp-segmented>
      </div>

      <div
        data-part="box"
        style="position: relative; width: ${BOX_W}px; height: ${BOX_H}px; padding: ${PAD}px; overflow: hidden;
               background: var(--sp-sunken); border-radius: var(--sp-radius)"
      >
        <div data-part="rows" style="display: flex; flex-direction: column; gap: ${GAP}px">
          <div data-part="row-1" data-subject data-fit="flush" style="display: flex; gap: ${GAP}px"></div>
          <div class="sp-context" data-part="row-2" style="display: flex; gap: ${GAP}px"></div>
        </div>

        <div class="sp-context" data-part="columns" style="display: none; gap: ${GAP}px; align-items: flex-start"></div>

        <span class="sp-context" data-part="guide-top" style="position: absolute; left: 0; right: 0; height: 3px; background: var(--sp-accent)"></span>
        <span class="sp-context" data-part="guide-bottom" style="position: absolute; left: 0; right: 0; height: 3px; background: var(--sp-accent)"></span>
      </div>

      <span
        class="sp-text sp-context"
        data-part="note"
        role="status"
        style="display: block; width: ${BOX_W}px; height: 32px; font-size: 12px; line-height: 16px; text-align: center"
      ></span>
    </div>
  `;

  const rows = part(root, 'rows');
  const columns = part(root, 'columns');
  const guideTop = part(root, 'guide-top');
  const guideBottom = part(root, 'guide-bottom');
  const row1 = part(root, 'row-1');
  const note = part(root, 'note');

  // The seven photos are made once and moved between the two arrangements, so a photo is the
  // same element in both and picks up its register from whichever container holds it.
  const photos = PHOTOS.map((ratio, i) => {
    const photo = document.createElement('div');
    photo.dataset.part = `photo-${i + 1}`;
    photo.style.cssText = `flex: 0 0 auto; border-radius: 4px; background: linear-gradient(${
      120 + i * 22
    }deg, var(--sp-accent-soft), var(--sp-accent) 150%)`;
    photo.dataset.ratio = String(ratio);
    return photo;
  });

  const columnEls = COLUMNS.map(() => {
    const column = document.createElement('div');
    column.style.cssText = `display: flex; flex-direction: column; gap: ${GAP}px; flex: 0 0 auto`;
    columns.append(column);
    return column;
  });

  const apply = (key: string) => {
    const justified = key === 'justified';
    rows.style.display = justified ? 'flex' : 'none';
    columns.style.display = justified ? 'none' : 'flex';
    guideTop.style.display = justified ? 'block' : 'none';
    guideBottom.style.display = justified ? 'block' : 'none';

    if (justified) {
      let top = PAD;
      for (const [r, indices] of ROWS.entries()) {
        const { height, widths } = justifyRow(indices);
        const row = r === 0 ? row1 : part(root, 'row-2');
        for (const [i, index] of indices.entries()) {
          const photo = photos[index];
          if (!photo) continue;
          photo.style.width = `${widths[i]}px`;
          photo.style.height = `${height}px`;
          row.append(photo);
        }
        // The guides bracket the top row, drawn in the padding and in the gap below it.
        if (r === 0) {
          guideTop.style.top = `${top - 5}px`;
          guideBottom.style.top = `${top + height + 2}px`;
        }
        top += height + GAP;
      }
    } else {
      const widths = columnWidths(COLUMNS.length);
      for (const [c, indices] of COLUMNS.entries()) {
        const column = columnEls[c];
        if (!column) continue;
        const width = widths[c] ?? 0;
        column.style.width = `${width}px`;
        for (const index of indices) {
          const photo = photos[index];
          if (!photo) continue;
          photo.style.width = `${width}px`;
          photo.style.height = `${Math.round(width / (PHOTOS[index] ?? 1))}px`;
          column.append(photo);
        }
      }
    }

    // Read back on boxes nothing transitions: does the top row share a height and land flush?
    if (justified) {
      const rowBox = localSize(row1);
      const boxes = [...row1.children].map((child) => localBox(child, row1));
      const first = boxes[0];
      const last = boxes[boxes.length - 1];
      const shared = boxes.every((box) => Math.abs(box.height - (first?.height ?? 0)) < 1);
      const flush = !!first && !!last && Math.abs(first.left) < 1 && Math.abs(last.left + last.width - rowBox.width) < 1;
      row1.dataset.fit = shared && flush ? 'flush' : 'loose';
      note.textContent = `Four shapes scaled to one ${Math.round(first?.height ?? 0)}px row, flush at both edges. The last one pays the rounding error.`;
    } else {
      const bottoms = columnEls.map((column) => Math.round(localSize(column).height));
      const ragged = Math.max(...bottoms) - Math.min(...bottoms);
      columns.dataset.edge = ragged > 4 ? 'ragged' : 'level';
      note.textContent = `Masonry instead: equal column widths, heights left alone, and a bottom edge ${ragged}px out of level.`;
    }
  };

  part(root, 'modes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('justified');
}
