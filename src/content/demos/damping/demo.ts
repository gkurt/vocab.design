import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const RAIL_W = 200;
const RAIL_H = 30;
const TILE_W = 40;
const INSET = 4;
const DISTANCE = RAIL_W - TILE_W - INSET * 2;
/** One stiffness for all three, so what is being compared is the friction and nothing else. */
const STIFFNESS = 180;
const MASS = 1;
/** Long enough for the overdamped one to finish, which is the whole reason it is here. */
const RUN_MS = 1400;
const SAMPLES = 72;

const REGIMES = [
  { id: 'under', name: 'Underdamped', zeta: 0.35, note: 'crosses, corrects, settles' },
  { id: 'critical', name: 'Critically damped', zeta: 1, note: 'fastest arrival with no crossing' },
  { id: 'over', name: 'Overdamped', zeta: 1.8, note: 'never crosses, and is late' },
];

/**
 * Position of a spring released from rest, as a fraction of the distance, for any
 * damping ratio. The three regimes are three different closed forms, which is exactly
 * the point: at a ratio of one the oscillating solution stops existing.
 */
function springAt(seconds: number, zeta: number): number {
  const w = Math.sqrt(STIFFNESS / MASS);
  if (zeta < 1) {
    const wd = w * Math.sqrt(1 - zeta * zeta);
    const decay = Math.exp(-zeta * w * seconds);
    return 1 - decay * (Math.cos(wd * seconds) + ((zeta * w) / wd) * Math.sin(wd * seconds));
  }
  if (zeta === 1) return 1 - (1 + w * seconds) * Math.exp(-w * seconds);
  const root = w * Math.sqrt(zeta * zeta - 1);
  const r1 = -zeta * w + root;
  const r2 = -zeta * w - root;
  return 1 - (r2 * Math.exp(r1 * seconds) - r1 * Math.exp(r2 * seconds)) / (r2 - r1);
}

function frames(zeta: number): Keyframe[] {
  const list: Keyframe[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const offset = i / SAMPLES;
    list.push({ offset, transform: `translateX(${(springAt((offset * RUN_MS) / 1000, zeta) * DISTANCE).toFixed(2)}px)` });
  }
  return list;
}

/**
 * Damping specimen: one stiffness, one distance, three damping ratios, run together so the
 * regimes can be read against each other rather than remembered one at a time. The dashed
 * rule on each rail is the resting value, so the underdamped tile crossing it is a fact on
 * screen rather than a claim in a caption.
 *
 * The subject is the sprung comparison, the three rails together: a single tile arriving is
 * just a move, and what the term names is the difference between the three arrivals. It is
 * marked on the group rather than on the demo's wrapper, so identify still has a part to
 * point at; the heading, the Replay control, and the caption stay outside it.
 *
 * The curves are generated from the ratio and handed to `element.animate`, which
 * `motion.css` cannot reach, so the demo asks `prefersReducedMotion` itself and leaves all
 * three tiles on their rest positions (SPEC §7). `data-running`/`data-settled` are timed on
 * the stage's clock, so a pose cannot let the run finish underneath a reader (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const rows = REGIMES.map(
    (regime) => `
      <div class="sp-row" style="gap: 12px">
        <span class="sp-stack" style="width: 150px; gap: 1px">
          <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">${regime.name}</span>
          <span class="sp-label" style="font-size: 11px">ratio ${regime.zeta.toFixed(2)}, ${regime.note}</span>
        </span>
        <div
          data-part="rail-${regime.id}"
          style="position: relative; flex: 0 0 auto; width: ${RAIL_W}px; height: ${RAIL_H}px;
                 border-radius: 6px; background: var(--sp-sunken)"
        >
          <span
            style="position: absolute; top: 3px; bottom: 3px; left: ${INSET + DISTANCE}px; width: 0;
                   border-left: 1px dashed var(--sp-muted); opacity: 0.85"
          ></span>
          <span
            data-part="tile-${regime.id}"
            style="position: absolute; top: ${INSET}px; left: ${INSET}px; width: ${TILE_W}px;
                   height: ${RAIL_H - INSET * 2}px; border-radius: 5px; background: var(--sp-accent);
                   transform: translateX(0)"
          ></span>
        </div>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 424px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">One spring, three temperaments</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-stack" data-part="compare" data-subject data-settled style="gap: 10px; margin-top: 14px">
          ${rows}
        </div>
        <p class="sp-text sp-context" style="margin: 12px 0 0">
          Same stiffness, same distance. Only the friction differs, and the dashed rule is where all three end up.
        </p>
      </div>
    </div>
  `;

  const compare = part(root, 'compare');
  let settling: number | undefined;

  const settle = () => {
    compare.removeAttribute('data-running');
    compare.setAttribute('data-settled', '');
  };

  const play = () => {
    clock.clearTimeout(settling);
    compare.removeAttribute('data-settled');
    compare.setAttribute('data-running', '');
    for (const regime of REGIMES) {
      const tile = part(root, `tile-${regime.id}`);
      for (const animation of tile.getAnimations()) animation.cancel();
    }

    if (prefersReducedMotion(root)) {
      for (const regime of REGIMES) part(root, `tile-${regime.id}`).style.transform = `translateX(${DISTANCE}px)`;
      settle();
      return;
    }

    for (const regime of REGIMES) {
      const tile = part(root, `tile-${regime.id}`);
      tile.style.transform = 'translateX(0)';
      tile.animate(frames(regime.zeta), { duration: RUN_MS, easing: 'linear', fill: 'forwards' });
    }
    settling = clock.setTimeout(settle, RUN_MS + 80);
  };

  part(root, 'replay').addEventListener('click', play);
  play();
}
