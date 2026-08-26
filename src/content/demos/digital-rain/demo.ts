import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const FIELD = { w: 458, h: 204 };
/** Cell metrics: the character grid the effect is drawn on, monospace by definition. */
const CELL = { w: 11, h: 14, size: 13 };
const COLS = Math.floor(FIELD.w / CELL.w);
const ROWS = Math.ceil(FIELD.h / CELL.h) + 1;
/** How many cells behind the head still carry ink. Eight to ten is what reads as falling. */
const TRAIL = 9;
/** About fourteen frames a second: the reference is steppy, and a smooth rain is the wrong rain. */
const FRAME_MS = 70;
/** Warm-up steps run before the first paint, so mount shows a populated wall, not an empty one. */
const WARMUP = 46;

/**
 * The glyph set: half-width katakana with a few Latin numerals, drawn through a mirror. Latin
 * digits are in the set because the original had them and because they are the part of the wall
 * that renders on every machine.
 */
const GLYPHS = 'ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎ0123456789'.split('');

const HEAD_INK = '#DCFFE8';
const RAIN_INK = [64, 226, 122] as const;
const GROUND = '#04070A';

type Column = { head: number; speed: number; cells: string[] };

/** A written-down sequence, so every mount rains the same wall. */
function seeded(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * Digital rain specimen: the Matrix wall, drawn as the three things that actually make it
 * (a column per character cell falling at its own speed, a near white head with a fading green
 * trail behind it, and a cell that keeps whatever glyph the head wrote as it passed), with the
 * glyphs mirrored as the original's were.
 *
 * The subject is the rain FIELD, the canvas that traces it (SPEC §5). The window around it, its
 * title bar and the caption are scenery in the context register. The plate over the field is
 * scenery too, and it is opaque on purpose: a moving green-on-black wall gives no letter a
 * stable contrast ground, so the specimen shows the fix the article asks for instead of
 * pretending the problem away.
 *
 * `motion.css` cannot reach a canvas, so the demo asks `prefersReducedMotion` itself and paints
 * exactly one warmed-up frame instead of arming the loop, which is the whole accessible answer
 * for decorative motion (SPEC §5, §7). Otherwise the loop is a short `DemoClock` timeout that
 * reschedules itself, so the stage can freeze it for a pose and stop it on remount. Nothing in
 * the scene is positioned by the field, so the field cannot move anything.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-frame sp-frame--wide" data-part="window"
           style="height: 244px; background: ${GROUND}; border-color: rgb(64 226 122 / 0.3)">
        <div class="sp-topbar sp-context" data-part="titlebar"
             style="background: #080D12; border-bottom-color: rgb(64 226 122 / 0.22)">
          <span class="sp-grow" data-part="title"
                style="font-family: ui-monospace, monospace; font-size: 11px; letter-spacing: 0.04em;
                       color: #57E37E">construct / feed 09</span>
          <span style="font-family: ui-monospace, monospace; font-size: 11px; color: #3E8F5A">${COLS} cols</span>
        </div>
        <div style="position: relative; flex: 1 1 auto; min-height: 0; background: ${GROUND}">
          <canvas data-part="field" data-subject aria-hidden="true"
                  style="position: absolute; left: 0; top: 0; width: ${FIELD.w}px; height: ${FIELD.h}px;
                         pointer-events: none"></canvas>
          <div class="sp-context" data-part="plate"
               style="position: absolute; left: 14px; bottom: 14px; padding: 7px 11px; border-radius: 5px;
                      background: #05090D; box-shadow: inset 0 0 0 1px rgb(64 226 122 / 0.34)">
            <span data-part="plate-line"
                  style="font-family: ui-monospace, monospace; font-size: 11px; color: #9BFFBC">
              a line of type needs its own ground
            </span>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption"
         style="max-width: 458px; margin: 0; text-align: center; font-size: 10px">
        Each column falls at its own speed, the head near white and the trail fading back over nine cells.
      </p>
    </div>
  `;

  const canvas = part(root, 'field') as HTMLCanvasElement;
  const view = root.ownerDocument.defaultView ?? window;
  const ratio = Math.min(view.devicePixelRatio || 1, 2);
  canvas.width = Math.round(FIELD.w * ratio);
  canvas.height = Math.round(FIELD.h * ratio);
  const ctx = canvas.getContext('2d');

  const rand = seeded(19990331);
  const glyph = (): string => GLYPHS[Math.floor(rand() * GLYPHS.length)] as string;

  const columns: Column[] = Array.from({ length: COLS }, () => ({
    head: -rand() * ROWS,
    speed: 0.45 + rand() * 0.95,
    cells: Array.from({ length: ROWS }, glyph),
  }));

  const step = (): void => {
    for (const column of columns) {
      const was = Math.floor(column.head);
      column.head += column.speed;
      const now = Math.floor(column.head);
      // Only the head writes: a cell keeps the glyph it was given, which is what makes the
      // wall churn without the whole grid flickering.
      for (let r = was + 1; r <= now; r++) if (r >= 0 && r < ROWS) column.cells[r] = glyph();
      if (column.head - TRAIL > ROWS) {
        column.head = -rand() * ROWS * 0.7;
        column.speed = 0.45 + rand() * 0.95;
      }
    }
  };

  const draw = (): void => {
    if (!ctx) return;
    // The whole field is mirrored, exactly as the reference's glyphs were.
    ctx.setTransform(-ratio, 0, 0, ratio, FIELD.w * ratio, 0);
    ctx.fillStyle = GROUND;
    ctx.fillRect(0, 0, FIELD.w, FIELD.h);
    ctx.font = `${CELL.size}px ui-monospace, monospace`;
    ctx.textBaseline = 'top';

    for (let c = 0; c < columns.length; c++) {
      const column = columns[c] as Column;
      const x = c * CELL.w + 3;
      for (let k = 0; k <= TRAIL; k++) {
        const r = Math.floor(column.head) - k;
        if (r < 0 || r >= ROWS) continue;
        if (k === 0) ctx.fillStyle = HEAD_INK;
        else ctx.fillStyle = `rgba(${RAIN_INK[0]}, ${RAIN_INK[1]}, ${RAIN_INK[2]}, ${Math.max(0.05, 0.76 - k * 0.082)})`;
        ctx.fillText(column.cells[r] as string, x, r * CELL.h);
      }
    }
  };

  for (let i = 0; i < WARMUP; i++) step();
  draw();

  // One warmed-up frame, held still, is the accessible answer for idle decorative motion.
  if (prefersReducedMotion(root)) return;

  const tick = (): void => {
    step();
    draw();
    clock.setTimeout(tick, FRAME_MS);
  };
  clock.setTimeout(tick, FRAME_MS);
}
