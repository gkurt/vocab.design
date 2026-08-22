import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The artwork, written once on a 40 unit grid and handed to both rasterizers. */
const BADGE = 'M13 3H27A10 10 0 0 1 37 13V27A10 10 0 0 1 27 37H13A10 10 0 0 1 3 27V13A10 10 0 0 1 13 3Z';
const RING = 'M6.5 20A13.5 13.5 0 1 1 33.5 20A13.5 13.5 0 1 1 6.5 20';
const CHECK = 'M13.2 20.4L18.2 25.6L27.4 14.6';
const INK = '#3f6cd1';

/** The unit grid the paths above are written on, which both renderers scale from. */
const GRID = 40;
/**
 * The export size of the bitmap, in its own pixels, and the box both marks are shown in. The
 * pane has to hold the largest mark THROUGH the shake, and a square turned thirteen degrees
 * needs about 1.35 times its own side, so the export size is read off the pane rather than the
 * pane off the artwork: 3x of 30 swings inside 128, where 3x of 40 would have its corners cut.
 */
const ART = 30;
const PANE = 128;
const SIZES = { x1: ART, x2: ART * 2, x3: ART * 3 } as const;
type Scale = keyof typeof SIZES;

const PLAY_MS = 1150;
/** A shake: the kind of short authored motion an animator hands over as an asset. */
const SWING: Keyframe[] = [
  { offset: 0, transform: 'rotate(0deg) scale(1)', easing: 'cubic-bezier(0.3, 0, 0.4, 1)' },
  { offset: 0.22, transform: 'rotate(-13deg) scale(1.04)', easing: 'cubic-bezier(0.3, 0, 0.4, 1)' },
  { offset: 0.5, transform: 'rotate(10deg) scale(1.02)', easing: 'cubic-bezier(0.3, 0, 0.4, 1)' },
  { offset: 0.76, transform: 'rotate(-5deg) scale(1)', easing: 'cubic-bezier(0.3, 0, 0.4, 1)' },
  { offset: 1, transform: 'rotate(0deg) scale(1)' },
];

const pane = (label: string, note: string, art: string, context: boolean) => `
  <div class="sp-stack${context ? ' sp-context' : ''}" style="gap: 6px; align-items: center">
    <div
      class="sp-surface"
      style="width: ${PANE}px; height: ${PANE}px; display: flex; align-items: center; justify-content: center; overflow: hidden"
    >${art}</div>
    <span class="sp-label" style="font-size: 12px; color: var(--sp-ink)">${label}</span>
    <span class="sp-label" style="font-size: 11px">${note}</span>
  </div>`;

/**
 * Lottie specimen. Nothing here parses or plays a Lottie file, and the demo never claims to: there
 * is no runtime in this page and no JSON to feed it. What it shows is the format's actual claim, and
 * the claim can be shown honestly with two genuine exports of one mark.
 *
 * The left pane is a real raster export: a canvas whose backing store is 30 by 30 pixels, drawn once
 * at mount, so asking the browser to display it at 90 px is a true three times upscale and softens
 * exactly as a bitmap does. The right pane is the same geometry as vector paths, redrawn by the
 * browser at whatever size it is given. Both are the same path strings, both play the same shake, so
 * the only difference between the panes at 3x is the one the format exists to remove.
 *
 * The subject is the vector artwork, the thing that stays sharp. The bitmap pane, the labels, the
 * scale picker and Replay are the scene: Replay is the demo's own instrumentation and never part of
 * the term (SPEC §5).
 *
 * Each scale is an absolute state named by its own segment, and Replay always reaches the same
 * state, played (SPEC §8). Both marks are centred in a box that holds the largest of them at the
 * widest point of its shake, so changing scale moves nothing else and the swing is never cut
 * (SPEC §5), and nothing is measured. `motion.css` cannot reach
 * an `element.animate` keyframe set, so the demo asks `prefersReducedMotion` itself and leaves both
 * marks at rest, which is the honest answer for a decorative shake; the settle beat comes from the
 * stage's clock so a pose cannot let a play finish under an inspection.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const start = SIZES.x2;
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 278px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Badge</span>
          <sp-segmented class="sp-segmented" data-part="scale" data-value="x2">
            <button class="sp-segment" type="button" data-part="seg-x1" value="x1">1x</button>
            <button class="sp-segment" type="button" data-part="seg-x2" value="x2">2x</button>
            <button class="sp-segment" type="button" data-part="seg-x3" value="x3">3x</button>
          </sp-segmented>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>

        <div class="sp-body sp-stack" style="align-items: center; justify-content: center; gap: 10px">
          <div class="sp-row" data-part="scene" data-scale="x2" style="gap: 18px; align-items: flex-start">
            ${pane(
              'Raster export',
              `${ART} px bitmap`,
              `<canvas
                 data-part="raster" width="${ART}" height="${ART}"
                 style="width: ${start}px; height: ${start}px; transform-origin: 50% 70%;
                        transition: width 220ms var(--sp-ease), height 220ms var(--sp-ease)"
               ></canvas>`,
              true,
            )}
            ${pane(
              'Vector animation',
              'shapes, no pixels',
              `<svg
                 data-part="vector" data-subject data-state="settled" data-plays="0"
                 viewBox="0 0 ${GRID} ${GRID}" aria-hidden="true"
                 style="width: ${start}px; height: ${start}px; display: block; transform-origin: 50% 70%;
                        transition: width 220ms var(--sp-ease), height 220ms var(--sp-ease)"
               >
                 <path d="${BADGE}" fill="${INK}"></path>
                 <path d="${RING}" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.75"></path>
                 <path d="${CHECK}" fill="none" stroke="#ffffff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"></path>
               </svg>`,
              false,
            )}
          </div>
          <span class="sp-label sp-context" data-part="say" style="font-size: 12px">Both marks drawn at ${start} px</span>
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 460px; margin: 0; text-align: center">
        One export is pixels and gets soft. One is shapes and does not.
      </p>
    </div>
  `;

  const scene = part(root, 'scene');
  const canvas = part(root, 'raster') as HTMLCanvasElement;
  const vector = part(root, 'vector');
  const say = part(root, 'say');
  const reduced = prefersReducedMotion(root);
  let plays = 0;
  let settling: number | undefined;
  /** Held so a replay cancels its own keyframes and never the size transition beside them. */
  let running: Animation[] = [];

  // The bitmap is drawn once, at its export size, and never again: that is what makes the left pane
  // an export rather than a second vector renderer.
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.scale(ART / GRID, ART / GRID);
    ctx.fillStyle = INK;
    ctx.fill(new Path2D(BADGE));
    ctx.strokeStyle = 'rgb(255 255 255 / 0.75)';
    ctx.lineWidth = 1.2;
    ctx.stroke(new Path2D(RING));
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3.4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke(new Path2D(CHECK));
  }

  const setScale = (next: Scale): void => {
    const px = SIZES[next];
    for (const el of [canvas, vector]) {
      el.style.width = `${px}px`;
      el.style.height = `${px}px`;
    }
    scene.dataset.scale = next;
    say.textContent = `Both marks drawn at ${px} px`;
  };

  const play = (): void => {
    clock.clearTimeout(settling);
    plays += 1;
    vector.dataset.plays = String(plays);
    if (reduced) {
      vector.dataset.state = 'settled';
      return;
    }
    vector.dataset.state = 'playing';
    for (const animation of running) animation.cancel();
    running = [canvas, vector].map((el) => el.animate(SWING, { duration: PLAY_MS, easing: 'linear' }));
    settling = clock.setTimeout(() => {
      vector.dataset.state = 'settled';
    }, PLAY_MS + 80);
  };

  part(root, 'replay').addEventListener('click', play);
  part(root, 'scale').addEventListener('change', (event) => {
    setScale((event as CustomEvent<string>).detail as Scale);
  });
}
