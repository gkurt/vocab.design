import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const RAIL_W = 244;
const RAIL_H = 38;
const TILE_W = 62;
const INSET = 4;
const DISTANCE = RAIL_W - TILE_W - INSET * 2;

const SPRING = { mass: 1, stiffness: 180, damping: 20 };
/** The tween the spring is being quoted against: a number somebody wrote down. */
const TWEEN_MS = 400;
const TWEEN_EASE = 'cubic-bezier(0.2, 0, 0, 1)';
/** How far the ruler runs, which is well past the point the spring stops looking busy. */
const SPAN = 900;
/** The threshold this specimen measures to: the last percent of the travel is not visible. */
const THRESHOLD = 0.01;
const SAMPLES = 60;

/** An underdamped spring released from rest, as a fraction of the distance covered. */
function springAt(seconds: number): number {
  const w = Math.sqrt(SPRING.stiffness / SPRING.mass);
  const zeta = SPRING.damping / (2 * Math.sqrt(SPRING.stiffness * SPRING.mass));
  const wd = w * Math.sqrt(1 - zeta * zeta);
  const decay = Math.exp(-zeta * w * seconds);
  return 1 - decay * (Math.cos(wd * seconds) + ((zeta * w) / wd) * Math.sin(wd * seconds));
}

/** The last millisecond at which the spring is still further than the threshold from its
    target. Everything after it is arrival as far as an eye is concerned. */
function perceptualMs(): number {
  for (let ms = SPAN; ms > 0; ms--) {
    if (Math.abs(1 - springAt(ms / 1000)) >= THRESHOLD) return ms;
  }
  return 0;
}

function springFrames(): Keyframe[] {
  const frames: Keyframe[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const offset = i / SAMPLES;
    frames.push({ offset, transform: `translateX(${(springAt((offset * SPAN) / 1000) * DISTANCE).toFixed(2)}px)` });
  }
  return frames;
}

/**
 * Perceptual duration specimen: a spring and a 400 ms tween covering one distance, with a
 * ruler underneath that marks the two numbers being compared. The tween's number was given
 * to it. The spring's is measured here, by walking its own curve back from the end until
 * the remaining travel exceeds one percent, which is the definition stated as arithmetic
 * rather than asserted as lore. The playhead crossing the second flag is the moment the
 * spring becomes quotable.
 *
 * The subject is the comparison, not either tile: a tile crossing a rail is just a move, and
 * the term names the figure that lets one be quoted against the other. Like the frame rate
 * specimen it is marked on the group rather than on the demo's wrapper, so identify still
 * has a part to point at; the heading, the Replay control, and the caption stay outside it.
 *
 * The spring is sampled into `element.animate` keyframes, which `motion.css` cannot reach, so
 * the demo asks `prefersReducedMotion` itself and shows the arrived state with the ruler
 * fully read out (SPEC §7). Both flags are stated as timeouts on the stage's clock, so a pose
 * stops the run where it stands (SPEC §6), and the tiles are absolutely placed inside rails
 * that already hold their room, so nothing in the panel moves as they travel (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const settleMs = perceptualMs();
  const readable = Math.round(settleMs / 10) * 10;
  const at = (ms: number) => ((ms / SPAN) * RAIL_W).toFixed(1);

  const rail = (id: string, subject: boolean) => `
    <div
      data-part="rail-${id}"
      style="position: relative; flex: 0 0 auto; width: ${RAIL_W}px; height: ${RAIL_H}px;
             border-radius: var(--sp-radius); background: var(--sp-sunken)"
    >
      <span
        class="sp-surface"
        data-part="tile-${id}"
        style="position: absolute; top: ${INSET}px; left: ${INSET}px; display: flex; align-items: center;
               justify-content: center; width: ${TILE_W}px; height: ${RAIL_H - INSET * 2}px;
               border-color: var(--sp-accent); background: var(--sp-accent-soft); font-size: 11px;
               font-weight: 600; transform: translateX(0)"
      >${subject ? 'Spring' : 'Tween'}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 424px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">How long did that take?</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-stack" data-part="compare" data-subject data-state="settled" style="gap: 12px; margin-top: 14px">
          <div class="sp-row" style="gap: 12px">
            <span class="sp-stack" style="width: 116px; gap: 2px">
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">Spring</span>
              <span class="sp-label" style="font-size: 11px">reads as ${readable} ms</span>
            </span>
            ${rail('spring', true)}
          </div>
          <div class="sp-row" style="gap: 12px">
            <span class="sp-stack" style="width: 116px; gap: 2px">
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">Tween</span>
              <span class="sp-label" style="font-size: 11px">told ${TWEEN_MS} ms</span>
            </span>
            ${rail('tween', false)}
          </div>
          <div class="sp-row" style="gap: 12px">
            <span class="sp-label" style="width: 116px; font-size: 11px">Measured against</span>
            <div data-part="ruler" style="position: relative; width: ${RAIL_W}px; height: 30px">
              <span class="sp-label" style="position: absolute; left: 0; top: 0; font-size: 10px">0</span>
              <span
                class="sp-label"
                style="position: absolute; left: ${at(TWEEN_MS)}px; top: 0; font-size: 10px; transform: translateX(-50%)"
              >${TWEEN_MS}</span>
              <span
                class="sp-label"
                style="position: absolute; left: ${at(settleMs)}px; top: 0; font-size: 10px; transform: translateX(-50%);
                       color: var(--sp-ink); font-weight: 600"
              >${readable}</span>
              <span class="sp-label" style="position: absolute; right: 0; top: 0; font-size: 10px">${SPAN} ms</span>
              <span style="position: absolute; left: 0; right: 0; top: 22px; height: 2px; background: var(--sp-line)"></span>
              <span style="position: absolute; left: ${at(TWEEN_MS)}px; top: 15px; width: 1px; height: 9px; background: var(--sp-muted)"></span>
              <span
                data-part="flag"
                style="position: absolute; left: ${at(settleMs)}px; top: 13px; width: 2px; height: 11px; background: var(--sp-ink)"
              ></span>
              <span
                data-part="playhead"
                style="position: absolute; left: 0; top: 14px; width: 2px; height: 16px; background: var(--sp-accent);
                       transform: translateX(0); transition: transform ${SPAN}ms linear"
              ></span>
            </div>
          </div>
        </div>
        <p class="sp-text sp-context" style="margin: 12px 0 0">
          The tween was handed its number. The spring's is measured: last visible movement at ${readable} ms,
          and formally it never rests.
        </p>
      </div>
    </div>
  `;

  const compare = part(root, 'compare');
  const spring = part(root, 'tile-spring');
  const tween = part(root, 'tile-tween');
  const playhead = part(root, 'playhead');
  const pending: number[] = [];

  const land = () => {
    for (const tile of [spring, tween]) tile.style.transform = `translateX(${DISTANCE}px)`;
    playhead.style.transform = `translateX(${RAIL_W - 2}px)`;
  };

  const play = () => {
    for (const id of pending) clock.clearTimeout(id);
    pending.length = 0;
    for (const tile of [spring, tween]) {
      for (const animation of tile.getAnimations()) animation.cancel();
    }

    if (prefersReducedMotion(root)) {
      land();
      compare.dataset.state = 'settled';
      return;
    }

    for (const tile of [spring, tween]) tile.style.transform = 'translateX(0)';
    playhead.style.transition = 'none';
    playhead.style.transform = 'translateX(0)';
    void playhead.offsetWidth;
    playhead.style.transition = `transform ${SPAN}ms linear`;
    playhead.style.transform = `translateX(${RAIL_W - 2}px)`;

    compare.dataset.state = 'running';
    spring.animate(springFrames(), { duration: SPAN, easing: 'linear', fill: 'forwards' });
    tween.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${DISTANCE}px)` }], {
      duration: TWEEN_MS,
      easing: TWEEN_EASE,
      fill: 'forwards',
    });

    pending.push(
      clock.setTimeout(() => {
        compare.dataset.state = 'quotable';
      }, settleMs),
    );
    pending.push(
      clock.setTimeout(() => {
        compare.dataset.state = 'settled';
      }, SPAN + 60),
    );
  };

  part(root, 'replay').addEventListener('click', play);
  play();
}
