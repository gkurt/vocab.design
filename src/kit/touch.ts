/**
 * Touch-input helpers (SPEC §7-8). The attract player performs a `hold` step by
 * dispatching PointerEvents whose `pressure` ramps toward 1; a real reader on a
 * mouse has no pressure to give, so the same gesture is simulated from hold
 * duration instead. `pressureHold` unifies the two into one force signal, so a
 * demo wires its pressure response once and answers the script, a finger, and a
 * held mouse button identically. `pinchSpread` does the same for the two-contact
 * pinch: the script's `pinch` step and a real two-finger pinch both arrive as two
 * pointer streams, and a mouse maps Ctrl+drag onto a virtual mirrored second
 * contact, so one wiring reports one scale signal for all three.
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

/**
 * Half the virtual pair's spread when a Ctrl+drag stands in for a second finger,
 * along the same diagonal the ghost's twin discs use: the pair starts ~59px
 * apart, so a drag has room to close the pinch as well as open it.
 */
const MIRROR_HALF = { x: 21, y: 21 };

/**
 * The Ctrl+drag pinch model, shared with the stage's TouchMirror so the disc it
 * draws and the scale a demo computes can never disagree. The pressed point is
 * one contact and stays under the pointer; the centre sits MIRROR_HALF away, and
 * the second contact mirrors the pointer across it. Dragging down-right opens
 * the pinch, back up-left closes it.
 */
export function mirrorPinch(
  down: { x: number; y: number },
  at: { x: number; y: number },
): { scale: number; center: { x: number; y: number }; other: { x: number; y: number } } {
  const center = { x: down.x - MIRROR_HALF.x, y: down.y - MIRROR_HALF.y };
  return {
    scale: Math.hypot(at.x - center.x, at.y - center.y) / Math.hypot(MIRROR_HALF.x, MIRROR_HALF.y),
    center,
    other: { x: 2 * center.x - at.x, y: 2 * center.y - at.y },
  };
}

export interface PinchHandlers {
  /** A pinch engaged (second finger down, or a Ctrl+drag began), centred here in client coordinates. */
  onStart?: (center: { x: number; y: number }) => void;
  /** The live scale, relative to the separation the gesture began at (1 as it engages). */
  onPinch: (scale: number) => void;
  /** The gesture ended (a finger lifted, the button released), at the scale it reached. */
  onEnd: (scale: number) => void;
}

/**
 * Report one scale signal for a pinch on `el`, whichever way it arrives: two
 * touch contacts (the script's `pinch` step and a real two-finger pinch are the
 * same two pointer streams) are tracked by pointerId and reported as the ratio
 * of their separation to the one they engaged at; a mouse or pen pressing with
 * Ctrl held maps the drag onto `mirrorPinch`'s virtual pair. A trackpad pinch
 * arrives as a ctrl+wheel event, not as pointers, and stays the demo's own to
 * wire. Purely event geometry — no clock, so a pose freezes it with the events.
 */
export function pinchSpread(el: HTMLElement, handlers: PinchHandlers): void {
  const contacts = new Map<number, { x: number; y: number }>();
  let base = 0;
  let scale = 1;
  let mouseFrom: { x: number; y: number } | null = null;

  const spread = () => {
    const [a, b] = [...contacts.values()];
    return a && b ? Math.hypot(a.x - b.x, a.y - b.y) : 0;
  };
  const settle = () => {
    if (base === 0 && !mouseFrom) return;
    base = 0;
    mouseFrom = null;
    handlers.onEnd(scale);
    scale = 1;
  };

  el.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') {
      // A third finger neither joins nor breaks the gesture the first two hold.
      if (contacts.size >= 2) return;
      contacts.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (contacts.size < 2) return;
      base = spread();
      scale = 1;
      const [a, b] = [...contacts.values()];
      if (a && b) handlers.onStart?.({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
      return;
    }
    if (!event.ctrlKey) return;
    // A pinch that drags outward leaves a small surface fast: capture the pointer
    // so it keeps reporting outside. Trusted only — a synthetic pointer has no
    // active pointer to capture and the call throws (SPEC §7).
    if (event.isTrusted) el.setPointerCapture(event.pointerId);
    mouseFrom = { x: event.clientX, y: event.clientY };
    scale = 1;
    handlers.onStart?.(mirrorPinch(mouseFrom, mouseFrom).center);
  });
  el.addEventListener('pointermove', (event) => {
    if (mouseFrom) {
      scale = mirrorPinch(mouseFrom, { x: event.clientX, y: event.clientY }).scale;
      handlers.onPinch(scale);
      return;
    }
    if (!contacts.has(event.pointerId)) return;
    contacts.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (base === 0) return;
    scale = spread() / base;
    handlers.onPinch(scale);
  });
  for (const type of ['pointerup', 'pointercancel'] as const) {
    el.addEventListener(type, (event) => {
      // Only a pointer that is part of the gesture may end it.
      if (event.pointerType === 'touch') {
        if (contacts.delete(event.pointerId)) settle();
      } else if (mouseFrom) settle();
    });
  }
  el.addEventListener('pointerleave', (event) => {
    if (event.pointerType !== 'touch' && mouseFrom) settle();
  });
}
