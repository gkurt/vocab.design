import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const VIEW = { w: 434, h: 140 };
const MOVE_MS = 1400;
/** One beat, so the reset to the neutral pose is a written state rather than a value the browser
    is still holding a transition against. */
const BEAT = 60;

/** How far away each plane is, in whatever unit the camera is measured in. */
const DEPTH = { near: 1, mid: 2.2, far: 5 };

type Move = 'dolly' | 'zoom' | 'plain';

/** A dolly by `t` (positive is forward) and a zoom by `z`. Apparent scale of a plane at distance D
    under a camera that has moved `t` toward it is D / (D - t); the zoom multiplies every plane
    alike. Matching z to the near plane is what holds the subject and warps everything else. */
const MOVES: Record<Move, { t: number; z: number; held: boolean; note: string }> = {
  dolly: { t: 0.45, z: 0.55, held: true, note: 'Dolly in, zoom out: the front plane holds and the space behind it falls away.' },
  zoom: { t: -0.45, z: 1.45, held: true, note: 'Zoom in, dolly out: the front plane holds again and the space behind it looms in.' },
  plain: { t: 0, z: 1.45, held: false, note: 'A plain zoom: every plane grows by the same 1.45, so nothing about the depth changes.' },
};

const scaleOf = (move: Move, depth: number): number => {
  const spec = MOVES[move];
  return spec.z * (depth / (depth - spec.t));
};

const bar = (w: number, h: number, paint: string) =>
  `<span style="flex: 0 0 auto; width: ${w}px; height: ${h}px; border-radius: 3px; background: ${paint}"></span>`;

const legend = (key: string, name: string, paint: string) => `
  <div class="sp-row" style="gap: 6px; width: 128px">
    <span style="flex: 0 0 auto; width: 10px; height: 10px; border-radius: 3px; background: var(${paint})"></span>
    <span class="sp-label" style="font-size: 11px">${name}</span>
    <span class="sp-label sp-text--ink" data-part="read-${key}" style="margin-left: auto; font-size: 11px; font-variant-numeric: tabular-nums">1.00</span>
  </div>`;

/**
 * Dolly and zoom specimen: three planes at three distances, and a camera that can reach the same
 * apparent size for the front plane in two completely different ways. Dolly in while zooming out and
 * the front plane holds while the middle and far planes shrink away; zoom in while dollying out and
 * it holds again while they loom. The third setting is a plain zoom, where every plane is multiplied
 * by the same number and the picture simply gets bigger, which is the comparison the other two exist
 * to be read against.
 *
 * The subject is the scene: a camera move is a property of the viewpoint, not of any one plane, and
 * ringing the front plane would claim the term was about the thing that happens to hold still. It is
 * the narrowest element that is genuinely the term, and it is the camera's view rather than the whole
 * specimen, so identify still has something to say. Nothing inside it carries the context register,
 * since there is no part of a camera move that could be dimmed without dimming the move; the picker,
 * the replay control and the read-out sit outside the scene and are the instrumentation.
 *
 * Every plane's scale is computed from its distance rather than typed in, so the three numbers in the
 * read-out are the numbers the planes are actually using. The move itself is a CSS transition on
 * `transform`, which `motion.css` switches off wholesale for a reader who has asked for less
 * movement; the demo asks `prefersReducedMotion` as well, so that reader is put straight on the end
 * pose instead of being told a move is in flight that will never be drawn. Every plane is absolutely
 * placed inside a viewport fixed at mount and the read-out holds tabular widths, so a camera move
 * moves nothing but the picture (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const farBars = Array.from({ length: 27 }, () => bar(12, 44, 'var(--dz-far)')).join('');
  const midBars = [
    bar(30, 82, 'var(--dz-mid)'),
    bar(30, 82, 'var(--dz-mid)'),
    '<span style="flex: 0 0 auto; width: 130px"></span>',
    bar(30, 82, 'var(--dz-mid)'),
    bar(30, 82, 'var(--dz-mid)'),
  ].join('');

  root.innerHTML = `
    <div class="sp-app">
      <div
        class="sp-frame sp-frame--wide"
        style="height: 284px; --dz-near: var(--sp-accent); --dz-mid: var(--sp-muted); --dz-far: var(--sp-line)"
      >
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Camera</span>
          <sp-segmented class="sp-segmented" data-part="move" data-axis="Move" data-value="dolly">
            <button class="sp-segment" type="button" data-part="seg-dolly" value="dolly">Dolly in</button>
            <button class="sp-segment" type="button" data-part="seg-zoom" value="zoom">Zoom in</button>
            <button class="sp-segment" type="button" data-part="seg-plain" value="plain">Plain</button>
          </sp-segmented>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 12px">
          <div
            data-part="scene" data-subject data-move="dolly" data-held="yes" data-state="posed"
            style="position: relative; flex: 0 0 auto; width: ${VIEW.w}px; height: ${VIEW.h}px; overflow: hidden;
                   border-radius: 6px; border: 1px solid var(--sp-line);
                   background: linear-gradient(var(--sp-surface), var(--sp-sunken))"
          >
            <div
              data-part="plane-far"
              style="position: absolute; left: 50%; top: 50%; width: 900px; height: 420px; margin: -210px 0 0 -450px;
                     display: flex; align-items: center; justify-content: center; gap: 16px; transform-origin: 50% 50%;
                     will-change: transform"
            >
              ${farBars}
              <span style="position: absolute; left: 0; right: 0; top: 62%; height: 2px; background: var(--sp-line)"></span>
            </div>

            <div
              data-part="plane-mid"
              style="position: absolute; left: 50%; top: 50%; width: 700px; height: 320px; margin: -160px 0 0 -350px;
                     display: flex; align-items: center; justify-content: center; gap: 26px; transform-origin: 50% 50%;
                     will-change: transform"
            >
              ${midBars}
              <span style="position: absolute; left: 0; right: 0; top: 68%; height: 3px; background: var(--sp-muted); opacity: 0.45"></span>
            </div>

            <div
              data-part="plane-near"
              style="position: absolute; left: 50%; top: 50%; width: 300px; height: 200px; margin: -100px 0 0 -150px;
                     display: flex; align-items: center; justify-content: center; transform-origin: 50% 50%;
                     will-change: transform"
            >
              <span
                style="display: flex; align-items: center; justify-content: center; width: 104px; height: 66px;
                       border-radius: 8px; background: var(--sp-accent); color: var(--sp-accent-ink);
                       font-size: 12px; font-weight: 600"
              >front plane</span>
            </div>
          </div>

          <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 16px">
            ${legend('near', 'front', '--dz-near')}
            ${legend('mid', 'middle', '--dz-mid')}
            ${legend('far', 'far', '--dz-far')}
          </div>
          <span class="sp-text sp-context" data-part="note" style="flex: 0 0 auto; height: 30px; font-size: 12px; line-height: 1.3">${MOVES.dolly.note}</span>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const note = part(root, 'note');
  const reduced = prefersReducedMotion(root);
  const planes = [
    { el: part(root, 'plane-near'), read: part(root, 'read-near'), depth: DEPTH.near },
    { el: part(root, 'plane-mid'), read: part(root, 'read-mid'), depth: DEPTH.mid },
    { el: part(root, 'plane-far'), read: part(root, 'read-far'), depth: DEPTH.far },
  ];

  let move: Move = 'dolly';
  let beat: number | undefined;
  let settling: number | undefined;

  const paint = (factor: (depth: number) => number, ms: number) => {
    for (const plane of planes) {
      const s = factor(plane.depth);
      plane.el.style.transition = ms > 0 ? `transform ${ms}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none';
      plane.el.style.transform = `scale(${s.toFixed(4)})`;
      plane.read.textContent = s.toFixed(2);
    }
  };

  const play = () => {
    clock.clearTimeout(beat);
    clock.clearTimeout(settling);
    scene.dataset.move = move;
    scene.dataset.held = MOVES[move].held ? 'yes' : 'no';
    note.textContent = MOVES[move].note;

    // Reduced motion never sees the travel, so it is put on the end pose rather than told a move
    // is in flight: `motion.css` has already turned the transition off underneath.
    if (reduced) {
      paint((depth) => scaleOf(move, depth), 0);
      scene.dataset.state = 'posed';
      return;
    }

    paint(() => 1, 0);
    scene.dataset.state = 'neutral';
    beat = clock.setTimeout(() => {
      paint((depth) => scaleOf(move, depth), MOVE_MS);
      scene.dataset.state = 'moving';
      settling = clock.setTimeout(() => {
        scene.dataset.state = 'posed';
      }, MOVE_MS + 80);
    }, BEAT);
  };

  // Each segment names a camera move outright and Replay names a run of the current one, so no step
  // flips whatever state it happens to find (SPEC §8).
  part(root, 'move').addEventListener('change', (event) => {
    move = (event as CustomEvent<string>).detail as Move;
    play();
  });
  part(root, 'replay').addEventListener('click', play);

  play();
}
