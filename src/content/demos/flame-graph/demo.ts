import { part } from '#src/kit/parts.ts';

type Frame = { key: string; name: string; depth: number; x: number; w: number; hue: string };

/**
 * A flame graph's hues carry no information, which is a fact about the picture rather
 * than a licence to invent one: implementations pick a warm range so the block reads as
 * a flame and so neighbouring frames stay apart. Painted here for that reason, since the
 * kit has one accent on purpose (SPEC §5).
 */
const HUES = ['#d08a3d', '#cd7444', '#c9963b', '#d2794f', '#bd8248', '#d59a55'];

/** The whole profile the widths are shares of. */
const TOTAL_MS = 1240;

const FRAMES: Frame[] = [
  { key: 'all', name: 'all stacks', depth: 0, x: 0, w: 100, hue: HUES[0] as string },
  { key: 'render', name: 'render()', depth: 1, x: 0, w: 62, hue: HUES[1] as string },
  { key: 'layout', name: 'layout()', depth: 1, x: 62, w: 24, hue: HUES[2] as string },
  { key: 'gc', name: 'gc()', depth: 1, x: 86, w: 14, hue: HUES[3] as string },
  { key: 'paint', name: 'paint()', depth: 2, x: 0, w: 40, hue: HUES[4] as string },
  { key: 'styles', name: 'styles()', depth: 2, x: 40, w: 22, hue: HUES[5] as string },
  { key: 'reflow', name: 'reflow()', depth: 2, x: 62, w: 24, hue: HUES[0] as string },
  { key: 'mark', name: 'mark()', depth: 2, x: 86, w: 14, hue: HUES[1] as string },
  { key: 'raster', name: 'raster()', depth: 3, x: 0, w: 36, hue: HUES[2] as string },
  { key: 'match', name: 'match()', depth: 3, x: 40, w: 14, hue: HUES[3] as string },
  { key: 'measure', name: 'measure()', depth: 3, x: 62, w: 18, hue: HUES[4] as string },
  { key: 'encode', name: 'encode()', depth: 4, x: 0, w: 8, hue: HUES[5] as string },
  { key: 'hash', name: 'hash()', depth: 4, x: 40, w: 12, hue: HUES[0] as string },
  { key: 'text', name: 'text()', depth: 4, x: 62, w: 10, hue: HUES[1] as string },
  { key: 'crc', name: 'crc()', depth: 5, x: 0, w: 4, hue: HUES[2] as string },
  { key: 'intern', name: 'intern()', depth: 5, x: 40, w: 10, hue: HUES[3] as string },
  { key: 'utf8', name: 'utf8()', depth: 6, x: 40, w: 8, hue: HUES[4] as string },
];

const DEPTHS = 7;
const ROW_H = 17;

const ms = (w: number) => Math.round((w / 100) * TOTAL_MS);

function frameBox(frame: Frame): string {
  const label = frame.w >= 12 ? `${frame.name}` : '';
  return `
    <button
      type="button"
      data-part="frame-${frame.key}"
      style="position: absolute; left: ${frame.x}%; width: calc(${frame.w}% - 1px); top: 0; height: ${ROW_H - 2}px; padding: 0 4px; margin: 0;
             display: flex; align-items: center; border: 0; border-radius: 2px; background: ${frame.hue}; color: #241503;
             font: inherit; font-size: 9px; line-height: 1; white-space: nowrap; overflow: hidden; text-align: left; cursor: pointer;
             box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.28)"
    >${label}</button>`;
}

/**
 * Flame graph specimen: one merged profile seven frames deep, with a 36% plateau three
 * levels down and a six-level tower beside it that is worth 8%. Pointing at a frame
 * reads out its share, which is the whole interpretive move the picture asks for: the
 * widest block is the cost, the tallest column is only depth.
 *
 * The subject is the stack block itself rather than the window around it, since the term
 * names that drawing and not the profiler holding it; the readout below is
 * instrumentation and stays outside it (SPEC §5). Every frame stays a frame in every
 * state the script visits, so no `data-pose` condition is needed.
 *
 * Selection is absolute rather than a toggle (SPEC §8): each frame names itself, and the
 * readout holds its height from mount, so filling it moves nothing.
 */
export function mount(root: HTMLElement): void {
  const rows = Array.from({ length: DEPTHS }, (_, depth) => {
    const boxes = FRAMES.filter((frame) => frame.depth === depth)
      .map(frameBox)
      .join('');
    return `<div style="position: relative; height: ${ROW_H}px">${boxes}</div>`;
  }).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 292px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">worker.cpuprofile</span>
          <span class="sp-label" style="font-size: 11px">1.24 s &middot; stacks merged</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center; gap: 8px; padding: 10px">
          <div class="sp-surface" data-part="flame" data-subject style="padding: 5px 6px">
            ${rows}
          </div>

          <div class="sp-surface" data-part="readout" data-frame="all" style="flex: 0 0 auto; height: 50px; padding: 7px 10px">
            <div class="sp-row" style="gap: 8px">
              <span class="sp-text sp-text--ink sp-grow" data-part="readout-name" style="font-size: 12px; font-weight: 600">all stacks</span>
              <span class="sp-label" data-part="readout-share" style="font-size: 11px; color: var(--sp-ink)">100% of samples</span>
            </div>
            <div class="sp-row" style="gap: 14px; margin-top: 5px">
              <span class="sp-label" style="font-size: 10px">width <span data-part="readout-ms" style="color: var(--sp-ink)">1240 ms</span></span>
              <span class="sp-label" style="font-size: 10px">depth <span data-part="readout-depth" style="color: var(--sp-ink)">0</span></span>
            </div>
          </div>

          <p class="sp-label" style="margin: 0; font-size: 11px">
            Width is total time in that frame. Left to right is alphabetical, never a clock.
          </p>
        </div>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');
  const name = part(root, 'readout-name');
  const share = part(root, 'readout-share');
  const width = part(root, 'readout-ms');
  const depth = part(root, 'readout-depth');

  const select = (frame: Frame) => {
    readout.dataset.frame = frame.key;
    name.textContent = frame.name;
    share.textContent = `${frame.w}% of samples`;
    width.textContent = `${ms(frame.w)} ms`;
    depth.textContent = String(frame.depth);
    for (const other of FRAMES) {
      const el = part(root, `frame-${other.key}`);
      const on = other.key === frame.key;
      if (on) el.setAttribute('data-active', '');
      else el.removeAttribute('data-active');
      el.style.boxShadow = on ? 'inset 0 0 0 2px var(--sp-ink)' : 'inset 0 0 0 1px rgb(255 255 255 / 0.28)';
    }
  };

  for (const frame of FRAMES) {
    const el = part(root, `frame-${frame.key}`);
    // Pointing at a frame is how a flame graph is read, so the hover carries the
    // readout; the click is the same answer for a finger, which has no hover.
    el.addEventListener('pointerenter', () => select(frame));
    el.addEventListener('click', () => select(frame));
  }

  // The root frame is read out from mount, so the panel is never empty and never
  // resizes when another frame takes its place (SPEC §5).
  select(FRAMES[0] as Frame);
}
