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

/** Fold an angle delta into (-180, 180], so a gesture's turn never wraps into a spin. */
function foldTurn(deg: number): number {
  const folded = ((deg + 540) % 360) - 180;
  return folded === -180 ? 180 : folded;
}

/**
 * The Ctrl+drag pinch model, shared with the stage's TouchMirror so the disc it
 * draws and the signal a demo computes can never disagree. The pressed point is
 * one contact and stays under the pointer; the centre sits MIRROR_HALF away, and
 * the second contact mirrors the pointer across it. Dragging down-right opens
 * the pinch, back up-left closes it, and swinging around the centre turns it —
 * `turn` is the pair's rotation in degrees, clockwise, from where it began.
 */
export function mirrorPinch(
  down: { x: number; y: number },
  at: { x: number; y: number },
): { scale: number; turn: number; center: { x: number; y: number }; other: { x: number; y: number } } {
  const center = { x: down.x - MIRROR_HALF.x, y: down.y - MIRROR_HALF.y };
  const dx = at.x - center.x;
  const dy = at.y - center.y;
  return {
    scale: Math.hypot(dx, dy) / Math.hypot(MIRROR_HALF.x, MIRROR_HALF.y),
    turn: foldTurn(((Math.atan2(dy, dx) - Math.atan2(MIRROR_HALF.y, MIRROR_HALF.x)) * 180) / Math.PI),
    center,
    other: { x: 2 * center.x - at.x, y: 2 * center.y - at.y },
  };
}

export interface PinchHandlers {
  /** A pinch engaged (second finger down, or a Ctrl+drag began), centred here in client coordinates. */
  onStart?: (center: { x: number; y: number }) => void;
  /**
   * The live signal, relative to where the gesture engaged: `scale` is the
   * separation ratio (1 as it engages), `turn` the pair's rotation in degrees,
   * clockwise. A demo uses the half it names and ignores the other.
   */
  onPinch: (scale: number, turn: number) => void;
  /** The gesture ended (a finger lifted, the button released), at the signal it reached. */
  onEnd: (scale: number, turn: number) => void;
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
  let baseAngle = 0;
  let scale = 1;
  let turn = 0;
  let mouseFrom: { x: number; y: number } | null = null;

  const pair = () => {
    const [a, b] = [...contacts.values()];
    if (!a || !b) return null;
    return { spread: Math.hypot(a.x - b.x, a.y - b.y), angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI };
  };
  const settle = () => {
    if (base === 0 && !mouseFrom) return;
    base = 0;
    mouseFrom = null;
    handlers.onEnd(scale, turn);
    scale = 1;
    turn = 0;
  };

  el.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') {
      // A third finger neither joins nor breaks the gesture the first two hold.
      if (contacts.size >= 2) return;
      contacts.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (contacts.size < 2) return;
      const engaged = pair();
      if (!engaged) return;
      base = engaged.spread;
      baseAngle = engaged.angle;
      scale = 1;
      turn = 0;
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
    turn = 0;
    handlers.onStart?.(mirrorPinch(mouseFrom, mouseFrom).center);
  });
  el.addEventListener('pointermove', (event) => {
    if (mouseFrom) {
      ({ scale, turn } = mirrorPinch(mouseFrom, { x: event.clientX, y: event.clientY }));
      handlers.onPinch(scale, turn);
      return;
    }
    if (!contacts.has(event.pointerId)) return;
    contacts.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (base === 0) return;
    const live = pair();
    if (!live) return;
    scale = live.spread / base;
    turn = foldTurn(live.angle - baseAngle);
    handlers.onPinch(scale, turn);
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

/** How far a two-contact press may drift and still count as a tap rather than a drag. */
const TAP_SLOP = 10;
/** How long a two-contact press may last and still count as a tap. */
const TAP_MAX_MS = 320;
/** The gap within which a second two-finger tap joins the first as one double tap. */
const TAP_GAP_MS = 400;

export interface TwoFingerTapHandlers {
  /** `count` is how many two-finger taps landed in quick succession: 1, then 2, and so on. */
  onTap: (count: number) => void;
}

/**
 * Report a two-finger tap on `el`, whichever way it arrives: the script's
 * `twoFingerTap` step and a real pair of fingers both land as two touch pointer
 * streams that go down and up without travelling, and a reader on a mouse taps
 * the pair with Ctrl held (the same modifier `pinchSpread` reads as a virtual
 * second contact, and the stage's TouchMirror already draws the twin disc for
 * it). Consecutive taps within TAP_GAP_MS report a rising count, so a demo can
 * answer the double tap the platform gesture actually is.
 *
 * A tap is the no-travel half of the Ctrl mapping and a pinch is the travelling
 * half, so a demo wires whichever one its term names, never both on one element.
 */
export function twoFingerTap(el: HTMLElement, clock: ClockLike, handlers: TwoFingerTapHandlers): void {
  const contacts = new Map<number, { x: number; y: number; at: number }>();
  let travelled = false;
  let count = 0;
  let settle: ReturnType<ClockLike['setTimeout']> | undefined;

  const land = () => {
    count += 1;
    handlers.onTap(count);
    clock.clearTimeout(settle);
    settle = clock.setTimeout(() => {
      count = 0;
    }, TAP_GAP_MS);
  };

  el.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') {
      if (contacts.size >= 2) return;
      contacts.set(event.pointerId, { x: event.clientX, y: event.clientY, at: performance.now() });
      if (contacts.size === 2) travelled = false;
      return;
    }
    if (!event.ctrlKey) return;
    // The mouse stands in for both fingers, so one pointer is the whole gesture.
    contacts.set(event.pointerId, { x: event.clientX, y: event.clientY, at: performance.now() });
    travelled = false;
  });
  el.addEventListener('pointermove', (event) => {
    const from = contacts.get(event.pointerId);
    if (!from) return;
    if (Math.hypot(event.clientX - from.x, event.clientY - from.y) > TAP_SLOP) travelled = true;
  });
  const lift = (event: PointerEvent) => {
    const from = contacts.get(event.pointerId);
    if (!from) return;
    contacts.delete(event.pointerId);
    if (performance.now() - from.at > TAP_MAX_MS) travelled = true;
    // One tap, however many contacts made it: a pair lifts twice and the gesture is
    // only over when the last one leaves, so the count rises per TAP, not per finger.
    if (contacts.size > 0) return;
    if (!travelled) land();
    travelled = false;
  };
  el.addEventListener('pointerup', lift);
  el.addEventListener('pointercancel', lift);
}

/** Direction reversals that make a sideways sweep a scrub rather than a drag. */
const SCRUB_TURNS = 2;
/** How far the pair must travel between reversals for one to count. */
const SCRUB_LEG = 18;

export interface TwoFingerScrubHandlers {
  /** Fired once the sweep has reversed often enough to be a scrub, not a drag. */
  onScrub: () => void;
}

/**
 * Report a two-finger scrub on `el`: the back-and-forth sideways sweep, counted
 * by its direction reversals rather than its shape, so the script's
 * `twoFingerScrub` step, a real pair of fingers, and a reader's Ctrl+drag
 * swept side to side all arrive as one signal. It fires once per press, at the
 * reversal that settles it, so a longer scrub does not report twice.
 */
export function twoFingerScrub(el: HTMLElement, handlers: TwoFingerScrubHandlers): void {
  let active = false;
  let fired = false;
  let last = 0;
  let dir = 0;
  let turns = 0;

  const begin = (x: number) => {
    active = true;
    fired = false;
    last = x;
    dir = 0;
    turns = 0;
  };
  el.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch' || event.ctrlKey) {
      if (event.pointerType !== 'touch' && event.isTrusted) el.setPointerCapture(event.pointerId);
      if (!active) begin(event.clientX);
    }
  });
  el.addEventListener('pointermove', (event) => {
    if (!active || fired) return;
    const step = event.clientX - last;
    if (Math.abs(step) < SCRUB_LEG) return;
    const way = step > 0 ? 1 : -1;
    if (dir !== 0 && way !== dir) turns += 1;
    dir = way;
    last = event.clientX;
    if (turns >= SCRUB_TURNS) {
      fired = true;
      handlers.onScrub();
    }
  });
  const lift = () => {
    active = false;
    fired = false;
  };
  el.addEventListener('pointerup', lift);
  el.addEventListener('pointercancel', lift);
}
