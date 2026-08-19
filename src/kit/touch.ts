/**
 * Touch-input helpers (SPEC §7-8). The attract player performs a `hold` step by
 * dispatching PointerEvents whose `pressure` ramps toward 1; a real reader on a
 * mouse has no pressure to give, so the same gesture is simulated from hold
 * duration instead. `pressureHold` unifies the two into one force signal, so a
 * demo wires its pressure response once and answers the script, a finger, and a
 * held mouse button identically.
 */

/** The clock a demo already holds (src/stage/clock.ts), kept structural so the kit does not depend on the stage. */
interface ClockLike {
  setTimeout(fn: () => void, ms: number): number;
  clearTimeout(id: number | undefined): void;
}

/** How long a pressureless hold takes to reach full force. */
export const FORCE_RAMP_MS = 900;
const TICK_MS = 60;
/**
 * Event pressures at or below the hardware default (0.5, what a mouse reports
 * for the whole hold) carry no signal and never outrank the duration ramp.
 */
const DEFAULT_PRESSURE = 0.5;

export interface PressureHoldHandlers {
  /** A rising force in (0, 1] while the press is held. Never fired twice with the same value. */
  onForce: (force: number) => void;
  /** The press ended (up, cancel, or the pointer left), at the force it reached. */
  onEnd: (force: number) => void;
}

/**
 * Report one rising force signal for a press-and-hold on `el`, whichever way the
 * press arrives: the player's synthesized ramp and real force hardware drive it
 * through event pressure; a plain mouse or pressureless touch drives it by hold
 * duration on the demo's own clock (so a pose freezes the ramp with everything
 * else). Force only ever rises within one press — hardware jitter never walks a
 * peek back on its own.
 */
export function pressureHold(el: HTMLElement, clock: ClockLike, handlers: PressureHoldHandlers): void {
  let held = false;
  let force = 0;
  let timer: number | undefined;
  const report = (value: number) => {
    const next = Math.min(1, value);
    if (!held || next <= force) return;
    force = next;
    handlers.onForce(force);
  };
  const tick = () => {
    if (!held) return;
    report(force + TICK_MS / FORCE_RAMP_MS);
    if (force < 1) timer = clock.setTimeout(tick, TICK_MS);
  };
  const end = () => {
    if (!held) return;
    held = false;
    clock.clearTimeout(timer);
    handlers.onEnd(force);
    force = 0;
  };
  el.addEventListener('pointerdown', (event) => {
    held = true;
    force = 0;
    report(Math.max(event.pressure > DEFAULT_PRESSURE ? event.pressure : 0, TICK_MS / FORCE_RAMP_MS));
    timer = clock.setTimeout(tick, TICK_MS);
  });
  el.addEventListener('pointermove', (event) => {
    if (event.pressure > DEFAULT_PRESSURE) report(event.pressure);
  });
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
  el.addEventListener('pointerleave', end);
}
