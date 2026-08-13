import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part, partsOf } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const CYAN = '#63e7ff';
const DIM = 'rgb(99 231 255 / 0.32)';
const MONO = "'Courier New', ui-monospace, monospace";
const GRID =
  'repeating-linear-gradient(0deg, rgb(99 231 255 / 0.07) 0 1px, transparent 1px 14px), ' +
  'repeating-linear-gradient(90deg, rgb(99 231 255 / 0.07) 0 1px, transparent 1px 14px)';

/** Readouts that scramble while the scan runs, then land on values that never change. */
const POOL = ['0x7C1D', '0xA34B', '0x0F92', '0xD6E8', '0x38B5', '0xC94F', '0x51A0'];
const FINAL = ['0x4F2A', '0x91C7', '0xB03E', '0x2D55', '0xE7A1'];
const FRAMES = 7;
const FRAME_MS = 90;

/** Arc lengths on a 24px radius ring (circumference 150.8), idle and locked. */
const ARCS = {
  idle: ['118', '132'],
  locked: ['41', '68'],
};

const RETICLE = { idle: '-40px 20px', locked: '0 0' };

/**
 * FUI specimen: the movie computer. A near-black screen ruled with a faint grid carries two
 * radial gauges, a column of hex telemetry, a reticle that hunts across the field, and a
 * spectrum strip along the bottom. None of it computes anything, which is the term.
 *
 * The screen is the subject; the Scan control and the caption below it are instrumentation,
 * and stay in the context register. Every colour is stated inline because a luminous palette
 * on black is this term's own claim.
 *
 * The scan is scripted, so `motion.css` cannot reach it: it asks `prefersReducedMotion`
 * itself and lands straight on the locked readings instead of playing the frames. It runs
 * once per press and stops, since telemetry that loops forever is the trope this specimen
 * describes rather than performs. The reticle and the arcs move on inline transitions, which
 * reduced motion switches off, so those writes land at once on that path too.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const gauge = (name: string, offset: string) => `
    <svg data-part="${name}" viewBox="0 0 60 60" aria-hidden="true" style="width: 52px; height: 52px">
      <circle cx="30" cy="30" r="24" fill="none" stroke="${DIM}" stroke-width="1"/>
      <circle cx="30" cy="30" r="17" fill="none" stroke="${DIM}" stroke-width="1" stroke-dasharray="2 5"/>
      <circle data-part="arc" cx="30" cy="30" r="24" fill="none" stroke="${CYAN}" stroke-width="3" stroke-linecap="round"
              stroke-dasharray="150.8" stroke-dashoffset="${offset}" transform="rotate(-90 30 30)"
              style="transition: stroke-dashoffset 0.6s cubic-bezier(0.3, 0.9, 0.3, 1)"/>
    </svg>`;

  const rows = FINAL.map(
    (_, i) =>
      `<div data-part="hex-row" style="font-family: ${MONO}; font-size: 9px; line-height: 1.5; color: ${CYAN}">${POOL[i] ?? ''}</div>`,
  ).join('');

  const bars = [6, 11, 4, 15, 9, 18, 7, 13, 5, 16, 10, 8, 14, 6, 12, 9, 17, 5]
    .map((h) => `<span style="width: 2px; height: ${h}px; background: ${CYAN}; opacity: 0.7"></span>`)
    .join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="screen" data-subject data-state="idle"
           style="position: relative; width: 268px; padding: 10px; overflow: hidden; background-color: #05080e;
                  background-image: ${GRID}; border: 1px solid rgb(99 231 255 / 0.28); color: ${CYAN}">

        <div data-part="header" class="sp-row sp-row--between"
             style="font-family: ${MONO}; font-size: 8.5px; letter-spacing: 0.18em; text-transform: uppercase">
          <span>ORB-7 // telemetry</span>
          <span style="opacity: 0.6">sector 4F</span>
        </div>

        <div class="sp-row" style="gap: 8px; margin-top: 8px; align-items: stretch">
          <div class="sp-stack" style="gap: 4px; flex: 0 0 auto">
            ${gauge('gauge-a', ARCS.idle[0] ?? '118')}
            ${gauge('gauge-b', ARCS.idle[1] ?? '132')}
          </div>

          <div data-part="field"
               style="position: relative; flex: 1 1 auto; overflow: hidden; border: 1px solid ${DIM}; background: rgb(99 231 255 / 0.04)">
            <span data-part="target" aria-hidden="true"
                  style="position: absolute; left: 62px; top: 48px; width: 5px; height: 5px; border-radius: 50%; background: #ff5ea8"></span>
            <span data-part="reticle" aria-hidden="true"
                  style="position: absolute; left: 50px; top: 36px; width: 29px; height: 29px; border: 1px solid ${CYAN};
                         border-radius: 50%; translate: ${RETICLE.idle};
                         transition: translate 0.6s cubic-bezier(0.3, 0.9, 0.3, 1)">
              <span style="position: absolute; left: 50%; top: -5px; bottom: -5px; width: 1px; background: ${CYAN}; opacity: 0.8"></span>
              <span style="position: absolute; top: 50%; left: -5px; right: -5px; height: 1px; background: ${CYAN}; opacity: 0.8"></span>
            </span>
          </div>

          <div data-part="hex" style="flex: 0 0 54px">${rows}</div>
        </div>

        <div class="sp-row sp-row--between" style="margin-top: 8px; align-items: flex-end">
          <div class="sp-row" style="gap: 2px; align-items: flex-end">${bars}</div>
          <span data-part="lock"
                style="padding: 1px 6px; border: 1px solid #ff5ea8; color: #ff5ea8; font-family: ${MONO}; font-size: 8.5px;
                       letter-spacing: 0.16em; opacity: 0; transition: opacity 0.2s linear">LOCK</span>
        </div>
      </div>

      <div class="sp-stack sp-context" style="align-items: center; gap: 6px">
        <button class="sp-button sp-button--sm" data-part="scan" type="button">Scan</button>
        <p class="sp-text" style="max-width: 268px; margin: 0; text-align: center; font-size: 11px">
          Readouts, gauges and a reticle: none of it computes anything.
        </p>
      </div>
    </div>
  `;

  const screen = part(root, 'screen');
  const reticle = part(root, 'reticle');
  const lock = part(root, 'lock');
  const arcs = partsOf(root, 'arc');
  const hexRows = partsOf(root, 'hex-row');
  let pending: number[] = [];

  const setArcs = (values: readonly string[]): void => {
    arcs.forEach((arc, i) => {
      arc.setAttribute('stroke-dashoffset', values[i] ?? '0');
    });
  };

  const setHex = (frame: number | undefined): void => {
    hexRows.forEach((row, i) => {
      row.textContent = frame === undefined ? (FINAL[i] ?? '') : (POOL[(i + frame) % POOL.length] ?? '');
    });
  };

  const land = (): void => {
    screen.dataset.state = 'locked';
    setArcs(ARCS.locked);
    setHex(undefined);
    reticle.style.translate = RETICLE.locked;
    lock.style.opacity = '1';
  };

  part(root, 'scan').addEventListener('click', () => {
    for (const id of pending) clock.clearTimeout(id);
    pending = [];
    if (prefersReducedMotion(root)) {
      land();
      return;
    }
    screen.dataset.state = 'scanning';
    lock.style.opacity = '0';
    setArcs(ARCS.idle);
    reticle.style.translate = RETICLE.idle;
    pending = Array.from({ length: FRAMES }, (_, frame) => clock.setTimeout(() => setHex(frame), frame * FRAME_MS));
    pending.push(clock.setTimeout(land, FRAMES * FRAME_MS));
  });
}
