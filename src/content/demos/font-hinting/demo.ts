import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Measured in the browser before authoring: this machine's rasteriser ignores
 * hinting. `text-rendering: geometricPrecision` against `optimizeLegibility` at
 * 11px is pixel-for-pixel identical in every face the site loads, and macOS has
 * no hinting switch a page can reach at all. A specimen built on real text would
 * therefore be two identical panes.
 *
 * So the pixels here are DRAWN, and drawn honestly rather than faked: a
 * simplified `n` is defined as three rectangles in em units, scaled to the chosen
 * pixel size, and each cell's ink is the exact area of the outline that falls
 * inside that pixel (inclusion-exclusion over the rectangles). The unhinted
 * panel places the outline where the scale puts it, at a fractional offset; the
 * hinted panel rounds the stem edges and the x-height onto whole pixels and gives
 * both stems the same width, which is what a hinting program does. The caption
 * says the grid is a drawing of what a rasteriser does.
 */
type Rect = { x0: number; x1: number; y0: number; y1: number };

/** A simplified lowercase n in em units: two stems and the arch across their tops. */
const GLYPH = { stem: 0.088, xHeight: 0.52, left: 0.09, right: 0.4, arch: 0.088 };
/** Where the outline lands between pixel centres before anything rounds it. */
const OFFSET = { x: 1.42, y: 1.35 };
const PANEL = 96;
const SIZES = [11, 22] as const;

const area = (r: Rect) => Math.max(0, r.x1 - r.x0) * Math.max(0, r.y1 - r.y0);

const intersect = (a: Rect, b: Rect): Rect => ({
  x0: Math.max(a.x0, b.x0),
  x1: Math.min(a.x1, b.x1),
  y0: Math.max(a.y0, b.y0),
  y1: Math.min(a.y1, b.y1),
});

/** Exact covered area of a union of rectangles, by inclusion-exclusion. */
function unionArea(rects: Rect[]): number {
  let total = 0;
  for (let mask = 1; mask < 1 << rects.length; mask++) {
    let current: Rect | undefined;
    let bits = 0;
    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i];
      if (!(mask & (1 << i)) || !rect) continue;
      bits += 1;
      current = current ? intersect(current, rect) : rect;
    }
    if (!current) continue;
    total += (bits % 2 === 1 ? 1 : -1) * area(current);
  }
  return total;
}

type Fitted = { rects: Rect[]; stem: Rect; cols: number; rows: number };

/** The outline scaled to `ppem`, either as the scale left it or rounded onto the grid. */
function fit(ppem: number, hinted: boolean): Fitted {
  const stemW = GLYPH.stem * ppem;
  const xh = GLYPH.xHeight * ppem;
  const archH = GLYPH.arch * ppem;
  let lx = OFFSET.x + GLYPH.left * ppem;
  let rx = OFFSET.x + GLYPH.right * ppem;
  let top = OFFSET.y;
  let bottom = OFFSET.y + xh;
  let width = stemW;
  let arch = archH;
  if (hinted) {
    width = Math.max(1, Math.round(stemW));
    lx = Math.round(lx);
    rx = Math.round(rx + stemW) - width;
    top = Math.round(top);
    bottom = Math.round(bottom);
    arch = Math.max(1, Math.round(archH));
  }
  const stem: Rect = { x0: lx, x1: lx + width, y0: top, y1: bottom };
  const rects: Rect[] = [stem, { x0: rx, x1: rx + width, y0: top, y1: bottom }, { x0: lx, x1: rx + width, y0: top, y1: top + arch }];
  return { rects, stem, cols: Math.ceil(rx + width) + 1, rows: Math.ceil(bottom) + 1 };
}

/** Ink per pixel, row-major. */
function raster({ rects, cols, rows }: Fitted): number[] {
  const cells: number[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const pixel: Rect = { x0: x, x1: x + 1, y0: y, y1: y + 1 };
      cells.push(unionArea(rects.map((r) => intersect(r, pixel))));
    }
  }
  return cells;
}

/** What the stem measures across, in ink per column, at the row through its middle. */
function stemInk(fitted: Fitted, cells: number[]): string {
  const row = Math.floor((fitted.stem.y0 + fitted.stem.y1) / 2);
  const from = Math.floor(fitted.stem.x0);
  const to = Math.ceil(fitted.stem.x1);
  const parts: string[] = [];
  for (let x = from; x < to; x++) {
    const value = cells[row * fitted.cols + x] ?? 0;
    if (value > 0.005) parts.push(value.toFixed(2));
  }
  return parts.join(' + ');
}

/**
 * Hinting specimen: one glyph rasterised twice at the same pixel size, once from
 * the outline where the scale left it and once with its stems and x-height
 * rounded onto the grid, over a drawn pixel grid at large magnification.
 *
 * The subject is the hinted raster (SPEC §5): the pixels hinting actually
 * produces, which is the narrowest thing the term names. The unhinted raster
 * beside it is the counter-example, scenery in the context register rather than a
 * state the subject passes through, so no `data-pose` is needed: every state the
 * script visits is a hinted rendering.
 *
 * Nothing is measured after a write. Both panels are fixed boxes and the cell
 * size is arithmetic on the grid the chosen size needs, so switching size
 * repaints inside the same two boxes and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const panel = (key: 'unhinted' | 'hinted', title: string) => `
    <div class="sp-stack${key === 'unhinted' ? ' sp-context' : ''}" style="gap: 6px; flex: 0 0 190px; align-items: center">
      <span class="sp-label" style="white-space: nowrap">${title}</span>
      <div data-part="raster-${key}"${key === 'hinted' ? ' data-subject' : ''} data-ppem="${SIZES[0]}"
           style="position: relative; width: ${PANEL}px; height: ${PANEL}px; background: var(--sp-surface);
                  border: 1px solid var(--sp-line); border-radius: 4px; overflow: hidden"></div>
      <span class="sp-chip" data-part="read-${key}" style="cursor: default; white-space: nowrap">stem</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Rendered at" data-value="${SIZES[0]}">
            ${SIZES.map((size) => `<button class="sp-segment" data-part="seg-${size}" value="${size}">${size} px</button>`).join('')}
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="panels" style="gap: 24px; margin-top: 10px; align-items: flex-start">
          ${panel('unhinted', 'outline as scaled')}
          ${panel('hinted', 'hinted onto the grid')}
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">
          The pixels are drawn, because this machine's rasteriser ignores hinting. Each cell holds the exact
          ink the outline puts there, so the readouts are measured rather than invented.
        </p>
      </div>
    </div>
  `;

  const panels = (['unhinted', 'hinted'] as const).map((key) => ({
    key,
    box: part(root, `raster-${key}`),
    readout: part(root, `read-${key}`),
  }));

  const draw = (ppem: number) => {
    for (const { key, box, readout } of panels) {
      const fitted = fit(ppem, key === 'hinted');
      const cells = raster(fitted);
      const cell = Math.min(PANEL / fitted.cols, PANEL / fitted.rows);
      const grid = cells
        .map((ink, index) => {
          const x = (index % fitted.cols) * cell;
          const y = Math.floor(index / fitted.cols) * cell;
          return `<span style="position: absolute; left: ${x.toFixed(2)}px; top: ${y.toFixed(2)}px;
                  width: ${cell.toFixed(2)}px; height: ${cell.toFixed(2)}px;
                  box-shadow: inset 0 0 0 0.5px var(--sp-line);
                  background: color-mix(in srgb, var(--sp-ink) ${(ink * 100).toFixed(1)}%, transparent)"></span>`;
        })
        .join('');
      // The stem's own outline, drawn over its pixels: the same feature, once
      // where the scale put it and once rounded onto the grid.
      const stem = fitted.stem;
      const outline = `<span data-part="outline-${key}" style="position: absolute;
        left: ${(stem.x0 * cell).toFixed(2)}px; top: ${(stem.y0 * cell).toFixed(2)}px;
        width: ${((stem.x1 - stem.x0) * cell).toFixed(2)}px; height: ${((stem.y1 - stem.y0) * cell).toFixed(2)}px;
        border: 2px solid var(--sp-accent); border-radius: 1px"></span>`;
      box.innerHTML = grid + outline;
      box.dataset.ppem = String(ppem);
      readout.textContent = `stem ink: ${stemInk(fitted, cells)}`;
    }
  };

  draw(SIZES[0]);

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = Number((event as CustomEvent<string>).detail);
    if (SIZES.some((size) => size === value)) draw(value);
  });
}
