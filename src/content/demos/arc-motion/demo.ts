import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const LANE_W = 192;
const LANE_H = 132;
const CARD_W = 40;
const CARD_H = 28;
const EDGE = 12;
/** The two corners both cards are given, as the travel between them. */
const DX = LANE_W - CARD_W - EDGE * 2;
const DY = -(LANE_H - CARD_H - EDGE * 2);
const TRAVEL_MS = 900;
const LEAD = 70;

/** Card centres, so the drawn track and the transformed card resolve in one coordinate system. */
const SX = EDGE + CARD_W / 2;
const SY = LANE_H - EDGE - CARD_H / 2;
const EX = SX + DX;
const EY = SY + DY;

/** One timing for the whole move, which is what produces the diagonal. */
const STRAIGHT = 'cubic-bezier(0.4, 0, 0.2, 1)';
/** A timing per axis: the vertical is spent early and the horizontal late, which bows the
    composed path up and left, the shape Material calls leaving vertically. */
const ARC_Y = 'cubic-bezier(0, 0, 0.2, 1)';
const ARC_X = 'cubic-bezier(0.8, 0, 0.6, 1)';

/**
 * Arc motion specimen: the same two corners, covered twice in the same 900 ms. The left card is
 * given one timing for the whole move, so it takes the diagonal. The right card is two nested
 * elements, one transformed on each axis with a timing of its own, so the composed route bows:
 * the vertical travel is spent early and the horizontal late, which is Material's vertical-out
 * arc built from nothing but two easing curves. Both routes are drawn under their cards as faint
 * tracks, so the shape is readable when nothing is moving.
 *
 * The subject is the arcing lane, its track included: a card crossing a box is just a move, and
 * what the term names is the curve it was given. Following the motion path specimen, the route
 * and its traveller are marked together rather than the card alone. The straight lane is the
 * counter-example and a separate element, so no `data-pose` is needed, and the heading, the
 * Replay control and the caption stay outside the subject.
 *
 * Nothing here is scripted animation: both cards move on transitions, which `motion.css` gates
 * for a reader who asked for less movement, and the settle beat comes from the stage's clock so
 * a pose stops the trip where it stands (SPEC §6). `prefersReducedMotion` is still asked
 * directly, because with transitions off the reset and the trip would land in the same tick and
 * there would be no trip at all. Each card is absolutely placed inside a lane that already holds
 * its size, so nothing in the panel moves as they travel (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const track = (d: string) => `
    <svg width="${LANE_W}" height="${LANE_H}" viewBox="0 0 ${LANE_W} ${LANE_H}" aria-hidden="true" style="display: block">
      <path d="${d}" fill="none" stroke="var(--sp-muted)" stroke-width="1.6" stroke-dasharray="5 5" opacity="0.65" />
      <circle cx="${SX}" cy="${SY}" r="3" fill="var(--sp-muted)" />
      <circle cx="${EX}" cy="${EY}" r="3" fill="var(--sp-muted)" />
    </svg>`;

  const card = (label: string) => `
    <span
      class="sp-surface"
      style="display: flex; align-items: center; justify-content: center; width: ${CARD_W}px; height: ${CARD_H}px;
             border-color: var(--sp-accent); background: var(--sp-accent-soft); font-size: 10px; font-weight: 600"
    >${label}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-state="rest" style="width: 440px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">One diagonal, two routes</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>

        <div class="sp-row" style="gap: 12px; align-items: flex-start; margin-top: 12px">
          <div class="sp-stack sp-context" style="gap: 5px">
            <span class="sp-label sp-text--ink" style="font-size: 11px">Straight, one timing</span>
            <div
              data-part="lane-line"
              style="position: relative; width: ${LANE_W}px; height: ${LANE_H}px; border-radius: 6px;
                     background: var(--sp-sunken); overflow: hidden"
            >
              ${track(`M ${SX} ${SY} L ${EX} ${EY}`)}
              <span
                data-part="card-line"
                style="position: absolute; left: ${EDGE}px; top: ${LANE_H - EDGE - CARD_H}px;
                       translate: 0 0; transition: translate ${TRAVEL_MS}ms ${STRAIGHT} ${LEAD}ms"
              >${card('Card')}</span>
            </div>
          </div>

          <div class="sp-stack" style="gap: 5px">
            <span class="sp-label sp-text--ink" style="font-size: 11px">Arc, a timing per axis</span>
            <div
              data-part="lane-arc"
              data-subject
              style="position: relative; width: ${LANE_W}px; height: ${LANE_H}px; border-radius: 6px;
                     background: var(--sp-sunken); overflow: hidden"
            >
              ${track(`M ${SX} ${SY} Q ${SX} ${EY} ${EX} ${EY}`)}
              <span
                data-part="card-arc-x"
                style="position: absolute; left: ${EDGE}px; top: ${LANE_H - EDGE - CARD_H}px;
                       transform: translateX(0); transition: transform ${TRAVEL_MS}ms ${ARC_X} ${LEAD}ms"
              ><span
                  data-part="card-arc-y"
                  style="display: block; transform: translateY(0); transition: transform ${TRAVEL_MS}ms ${ARC_Y} ${LEAD}ms"
                >${card('Card')}</span></span>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" style="margin: 10px 0 0; font-size: 12px">
          The same two corners and the same ${TRAVEL_MS} ms. Only the shape in between is different.
        </p>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const line = part(root, 'card-line');
  const arcX = part(root, 'card-arc-x');
  const arcY = part(root, 'card-arc-y');
  let settling: number | undefined;

  const send = (out: boolean) => {
    line.style.translate = out ? `${DX}px ${DY}px` : '0 0';
    arcX.style.transform = `translateX(${out ? DX : 0}px)`;
    arcY.style.transform = `translateY(${out ? DY : 0}px)`;
  };

  const play = () => {
    clock.clearTimeout(settling);

    if (prefersReducedMotion(root)) {
      send(true);
      scene.dataset.state = 'landed';
      return;
    }

    // Back to the start with nothing to carry either card there, then a reflow so the reset
    // and the trip cannot be folded into one change.
    for (const el of [line, arcX, arcY]) el.style.transition = 'none';
    send(false);
    void line.offsetWidth;

    line.style.transition = `translate ${TRAVEL_MS}ms ${STRAIGHT} ${LEAD}ms`;
    arcX.style.transition = `transform ${TRAVEL_MS}ms ${ARC_X} ${LEAD}ms`;
    arcY.style.transition = `transform ${TRAVEL_MS}ms ${ARC_Y} ${LEAD}ms`;
    send(true);
    scene.dataset.state = 'travelling';
    settling = clock.setTimeout(
      () => {
        scene.dataset.state = 'landed';
      },
      LEAD + TRAVEL_MS + 60,
    );
  };

  part(root, 'replay').addEventListener('click', play);
  play();
}
