import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';
import '#src/kit/segmented.ts';

const RAIL_W = 356;
const RAIL_H = 38;
const TILE_W = 62;
const INSET = 4;
/** The element's own style puts it at 0; the keyframes run between these two, so the gap
    between the resting mark and the first keyframe is what a fill mode is visible in. */
const FROM = 96;
const TO = RAIL_W - INSET * 2 - TILE_W;
const DELAY = 900;
const DURATION = 700;
const FILLS = ['none', 'forwards', 'backwards', 'both'] as const;

type Fill = (typeof FILLS)[number];

const holdsFirst = (fill: Fill) => fill === 'backwards' || fill === 'both';
const holdsLast = (fill: Fill) => fill === 'forwards' || fill === 'both';

/**
 * Fill mode specimen: one short move, replayed under each of the four values, with the two
 * positions the answer is read at drawn on the rail. The element's own style parks the tile at
 * the resting mark and the keyframes run between the other two, so the delay before the run and
 * the beat after it are exactly where a fill mode can be seen: `backwards` pulls the tile onto
 * the first keyframe while it waits, `forwards` leaves it on the last, `none` shows neither and
 * produces the flash of start state on the way in and the snap back on the way out.
 *
 * The subject is the tile: fill mode names where this element rests outside the animation's own
 * window, and the rail, the marks, the readout and the picker are the instrumentation that makes
 * that resting position readable. The tile is the term under every one of the four values, so
 * nothing here needs a `data-pose`.
 *
 * The panel reads as an animation inspector and prints only what one would print. A paragraph
 * under the picker used to explain what `none` does ("the tile is drawn from its own styles
 * right up to the first frame and again the moment the last one is over"), and the readout used
 * to narrate the same lesson in sentences; the paragraph is gone and the readout now names the
 * phase (idle, delay, running, finished) with the rail's own marks doing the teaching.
 *
 * The move goes to `element.animate` because the browser's own fill handling is the thing being
 * demonstrated, and `motion.css` cannot reach a keyframe set, so `prefersReducedMotion` is asked
 * directly and the tile is placed at the resting position the picked fill would have left it in
 * (SPEC §7). The phase beats come from the stage's clock, so a pose stops the run where it
 * stands (SPEC §6), and the tile travels inside a rail that already holds its size (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const segments = FILLS.map((fill) => `<button class="sp-segment" data-part="seg-${fill}" value="${fill}">${fill}</button>`).join('');

  const mark = (x: number, label: string) => `
    <span style="position: absolute; left: ${INSET + x}px; top: 0; bottom: 0; width: 1px; background: var(--sp-line)"></span>
    <span class="sp-label" style="position: absolute; left: ${INSET + x}px; top: ${RAIL_H + 3}px; font-size: 10px">${label}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-fill="none" data-phase="rest" data-rest="own" style="width: 400px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Animation</span>
          <button class="sp-button sp-button--sm" type="button" data-part="play">Play</button>
        </div>

        <div style="position: relative; width: ${RAIL_W}px; height: ${RAIL_H + 18}px; margin-top: 14px">
          <div
            style="position: absolute; inset: 0 0 18px 0; border-radius: var(--sp-radius); background: var(--sp-sunken)"
          ></div>
          <div class="sp-context">
            ${mark(0, 'own style')}
            ${mark(FROM, 'first frame')}
            ${mark(TO, 'last frame')}
          </div>
          <span
            class="sp-surface"
            data-part="tile"
            data-subject
            style="position: absolute; top: ${INSET}px; left: ${INSET}px; display: flex; align-items: center;
                   justify-content: center; width: ${TILE_W}px; height: ${RAIL_H - INSET * 2}px;
                   border-color: var(--sp-accent); background: var(--sp-accent-soft); font-size: 11px;
                   font-weight: 600; transform: translateX(0)"
          >Sheet</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px; min-height: 20px">
          <span class="sp-label">${DELAY} ms delay, ${DURATION} ms run</span>
          <span class="sp-label sp-text--ink" data-part="readout" style="flex: 0 0 196px; text-align: right">
            idle
          </span>
        </div>

        <div class="sp-row sp-context" style="margin-top: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="picker" data-axis="Fill" data-value="none">${segments}</sp-segmented>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const tile = part(root, 'tile');
  const readout = part(root, 'readout');
  const pending: number[] = [];

  const fill = () => (scene.dataset.fill ?? 'none') as Fill;

  const say = (phase: 'rest' | 'delay' | 'running' | 'after') => {
    scene.dataset.phase = phase;
    if (phase === 'rest') {
      scene.dataset.rest = 'own';
      readout.textContent = 'idle';
      return;
    }
    if (phase === 'delay') {
      readout.textContent = holdsFirst(fill()) ? 'delay, first frame held' : 'delay';
      return;
    }
    if (phase === 'running') {
      readout.textContent = 'running';
      return;
    }
    const kept = holdsLast(fill());
    scene.dataset.rest = kept ? 'keyframe' : 'own';
    readout.textContent = kept ? 'finished, last frame held' : 'finished';
  };

  const play = () => {
    for (const id of pending) clock.clearTimeout(id);
    pending.length = 0;
    for (const animation of tile.getAnimations()) animation.cancel();

    if (prefersReducedMotion(root)) {
      tile.style.transform = `translateX(${holdsLast(fill()) ? TO : 0}px)`;
      say('after');
      return;
    }

    tile.style.transform = 'translateX(0)';
    scene.dataset.rest = 'own';
    say('delay');
    tile.animate([{ transform: `translateX(${FROM}px)` }, { transform: `translateX(${TO}px)` }], {
      delay: DELAY,
      duration: DURATION,
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
      fill: fill(),
    });

    pending.push(clock.setTimeout(() => say('running'), DELAY));
    pending.push(clock.setTimeout(() => say('after'), DELAY + DURATION + 40));
  };

  part(root, 'picker').addEventListener('change', (event) => {
    for (const animation of tile.getAnimations()) animation.cancel();
    for (const id of pending) clock.clearTimeout(id);
    pending.length = 0;
    scene.dataset.fill = (event as CustomEvent<string>).detail;
    tile.style.transform = 'translateX(0)';
    say('rest');
  });

  part(root, 'play').addEventListener('click', play);
}
