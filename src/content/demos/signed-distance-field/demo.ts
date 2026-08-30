import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * The distinguishing content of this term is the field itself, so the field is
 * computed rather than illustrated: a simplified A is defined as three capsules,
 * every texel of a 14 by 16 texture stores its own signed distance to that
 * outline, and the three tiles are three readings of the same numbers. The
 * bitmap tile thresholds them at the texture's own resolution, the field tile
 * paints them as brightness, and the output tile does what a shader does,
 * sampling the field bilinearly at screen resolution and thresholding there.
 *
 * That last tile is why the zoom is honest rather than a trick: at 4x the two
 * texture tiles are the same 224 texels blown up, while the output tile is
 * repainted at the zoom's own pixel count, which is exactly the difference the
 * technique buys. Nothing here is drawn by hand.
 */
const W = 14;
const H = 16;
/** Texels the encoded range covers, half inside and half out: 0.5 is the edge. */
const SPREAD = 8;
const TILE = { w: 91, h: 104 };
const RADIUS = 1.15;

type Segment = { x0: number; y0: number; x1: number; y1: number };

/** A simplified A: two diagonals and the bar across them, in texel coordinates. */
const STROKES: Segment[] = [
  { x0: 3.2, y0: 13.6, x1: 7, y1: 2.6 },
  { x0: 10.8, y0: 13.6, x1: 7, y1: 2.6 },
  { x0: 4.6, y0: 9.9, x1: 9.4, y1: 9.9 },
];

type Zoom = { key: string; scale: number; cx: number; cy: number; read: string };

const ZOOMS: Zoom[] = [
  { key: 'fit', scale: 1, cx: W / 2, cy: H / 2, read: '1x: 224 texels, 6.5 px each' },
  { key: 'close', scale: 3, cx: 4, cy: 11.4, read: '3x: 224 texels, 19.5 px each' },
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function distanceToSegment(px: number, py: number, s: Segment): number {
  const dx = s.x1 - s.x0;
  const dy = s.y1 - s.y0;
  const t = clamp(((px - s.x0) * dx + (py - s.y0) * dy) / (dx * dx + dy * dy));
  const cx = s.x0 + t * dx;
  const cy = s.y0 + t * dy;
  return Math.hypot(px - cx, py - cy);
}

/** Signed distance to the glyph outline, in texels: negative inside. */
function signedDistance(px: number, py: number): number {
  let nearest = Number.POSITIVE_INFINITY;
  for (const stroke of STROKES) nearest = Math.min(nearest, distanceToSegment(px, py, stroke));
  return nearest - RADIUS;
}

/** The texture: one encoded distance per texel, 0.5 at the edge. */
const FIELD: number[] = (() => {
  const cells: number[] = [];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) cells.push(clamp(0.5 - signedDistance(x + 0.5, y + 0.5) / SPREAD));
  }
  return cells;
})();

/** Bilinear read of the field, the one operation the GPU is good at. */
function sampleField(u: number, v: number): number {
  const x = clamp(u - 0.5, 0, W - 1);
  const y = clamp(v - 0.5, 0, H - 1);
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = Math.min(W - 1, x0 + 1);
  const y1 = Math.min(H - 1, y0 + 1);
  const fx = x - x0;
  const fy = y - y0;
  const a = FIELD[y0 * W + x0] ?? 0;
  const b = FIELD[y0 * W + x1] ?? 0;
  const c = FIELD[y1 * W + x0] ?? 0;
  const d = FIELD[y1 * W + x1] ?? 0;
  return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
}

function inkOf(el: Element): [number, number, number] {
  const parsed = getComputedStyle(el).color.match(/[\d.]+/g);
  const [r, g, b] = (parsed ?? ['35', '38', '43']).map(Number);
  return [r ?? 35, g ?? 38, b ?? 43];
}

/**
 * Signed distance field specimen: one glyph held three ways, as a bitmap of its
 * coverage, as the field of its distances, and as the edge a shader recovers from
 * that field, with a zoom that magnifies all three at once.
 *
 * The subject is the field texture (SPEC §5), the thing the term names and the
 * thing neither of its neighbours has: the bitmap beside it is the counter-example
 * and the output is the consequence, both scenery in the context register. Both
 * zooms are honest states of the field, so no `data-pose` is needed.
 *
 * The chip under the tiles is a plain measurement of the texture at the zoom on show.
 * It used to argue the point instead ("1x: 224 texels, and the same 224 on the GPU",
 * "3x: the texels are 19 px wide, the edge is still one"), which the verdict above the
 * controls already makes, so it now reports only the texel count and the texel size.
 *
 * Nothing is measured after a write: every tile is a fixed box, and the crop is
 * arithmetic on the zoom (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const tile = (key: string, title: string, subject: boolean) => `
    <div class="sp-stack${subject ? '' : ' sp-context'}" style="gap: 6px; flex: 0 0 124px; align-items: center">
      <span class="sp-label" style="white-space: nowrap">${title}</span>
      <div data-part="tile-${key}"${subject ? ' data-subject' : ''} data-zoom="${ZOOMS[0]?.key}"
           style="position: relative; width: ${TILE.w}px; height: ${TILE.h}px; overflow: hidden;
                  background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 4px">
        <canvas data-part="canvas-${key}" style="position: absolute; image-rendering: pixelated"></canvas>
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Magnification" data-value="${ZOOMS[0]?.key}">
            ${ZOOMS.map(
              (zoom) => `<button class="sp-segment" data-part="seg-${zoom.key}" value="${zoom.key}">${zoom.scale}x</button>`,
            ).join('')}
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="tiles" style="gap: 12px; margin-top: 10px; justify-content: center">
          ${tile('bitmap', 'bitmap of coverage', false)}
          ${tile('field', 'the distance field', true)}
          ${tile('output', 'thresholded per pixel', false)}
        </div>
        <div class="sp-row sp-context" style="height: 30px; margin-top: 8px; justify-content: center">
          <span class="sp-chip" data-part="readout" style="cursor: default; white-space: nowrap">${ZOOMS[0]?.read ?? ''}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 4px">
          Brightness in the middle tile is distance to the edge, so interpolating it returns a distance rather
          than a blur. Magnify, and the texture is still those texels while the threshold is recomputed per pixel.
        </p>
      </div>
    </div>
  `;

  const tiles = ['bitmap', 'field', 'output'].map((key) => ({
    key,
    box: part(root, `tile-${key}`),
    canvas: part(root, `canvas-${key}`) as HTMLCanvasElement,
  }));
  const readout = part(root, 'readout');
  const ink = inkOf(root);

  /** The two texture tiles: painted once at texture resolution, scaled by CSS. */
  const paintTexture = (canvas: HTMLCanvasElement, kind: 'bitmap' | 'field') => {
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const image = ctx.createImageData(W, H);
    for (let i = 0; i < FIELD.length; i++) {
      const value = FIELD[i] ?? 0;
      const at = i * 4;
      if (kind === 'field') {
        const level = Math.round(255 * value);
        image.data[at] = level;
        image.data[at + 1] = level;
        image.data[at + 2] = level;
        image.data[at + 3] = 255;
      } else {
        image.data[at] = ink[0];
        image.data[at + 1] = ink[1];
        image.data[at + 2] = ink[2];
        image.data[at + 3] = value >= 0.5 ? 255 : 0;
      }
    }
    ctx.putImageData(image, 0, 0);
  };

  /** The output tile: sampled and thresholded at the zoom's own pixel count. */
  const paintOutput = (canvas: HTMLCanvasElement, zoom: Zoom) => {
    const width = TILE.w * 2;
    const height = TILE.h * 2;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const image = ctx.createImageData(width, height);
    /** Canvas pixels per texel at this zoom, and the ramp's width in those pixels. */
    const perTexel = (TILE.w / W) * zoom.scale * 2;
    const ramp = 1.4 / (SPREAD * perTexel);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = zoom.cx + (x - width / 2) / perTexel;
        const v = zoom.cy + (y - height / 2) / perTexel;
        const value = sampleField(u, v);
        const alpha = clamp(0.5 + (value - 0.5) / ramp);
        const at = (y * width + x) * 4;
        image.data[at] = ink[0];
        image.data[at + 1] = ink[1];
        image.data[at + 2] = ink[2];
        image.data[at + 3] = Math.round(255 * alpha);
      }
    }
    ctx.putImageData(image, 0, 0);
  };

  const place = (canvas: HTMLCanvasElement, zoom: Zoom, textured: boolean) => {
    if (!textured) {
      canvas.style.width = `${TILE.w}px`;
      canvas.style.height = `${TILE.h}px`;
      canvas.style.left = '0px';
      canvas.style.top = '0px';
      return;
    }
    const width = TILE.w * zoom.scale;
    const height = TILE.h * zoom.scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.style.left = `${TILE.w / 2 - (zoom.cx / W) * width}px`;
    canvas.style.top = `${TILE.h / 2 - (zoom.cy / H) * height}px`;
  };

  const apply = (zoom: Zoom) => {
    for (const { key, box, canvas } of tiles) {
      if (key === 'output') paintOutput(canvas, zoom);
      else paintTexture(canvas, key === 'field' ? 'field' : 'bitmap');
      place(canvas, zoom, key !== 'output');
      box.dataset.zoom = zoom.key;
    }
    readout.textContent = zoom.read;
  };

  apply(ZOOMS[0] as Zoom);

  part(root, 'segmented').addEventListener('change', (event) => {
    const zoom = ZOOMS.find((z) => z.key === (event as CustomEvent<string>).detail);
    if (zoom) apply(zoom);
  });
}
