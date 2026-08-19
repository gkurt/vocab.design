import { describe, expect, test } from 'bun:test';
import { FORCE_RAMP_MS, mirrorPinch, pinchSpread, pressureHold } from '#src/kit/touch.ts';
import { DemoClock } from '#src/stage/clock.ts';

const tick = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** pressureHold needs only addEventListener, so a bare EventTarget stands in for the element. */
function rig() {
  const el = new EventTarget() as unknown as HTMLElement;
  const forces: number[] = [];
  let ended: number | undefined;
  pressureHold(el, new DemoClock(), {
    onForce: (force) => forces.push(force),
    onEnd: (force) => {
      ended = force;
    },
  });
  const fire = (type: string, pressure: number) => el.dispatchEvent(Object.assign(new Event(type), { pressure }));
  return { fire, forces, ended: () => ended };
}

describe('pressureHold', () => {
  test('the scripted ramp drives force through event pressure', () => {
    const { fire, forces, ended } = rig();
    fire('pointerdown', 0.3);
    for (const pressure of [0.53, 0.65, 0.88, 1]) fire('pointermove', pressure);
    fire('pointerup', 0);
    expect(forces.at(-1)).toBe(1);
    expect(ended()).toBe(1);
    // Rising throughout: each report above the one before it.
    for (let i = 1; i < forces.length; i++) expect(forces[i]).toBeGreaterThan(forces[i - 1] as number);
  });

  test('pressures at the hardware default carry no signal', () => {
    const { fire, forces } = rig();
    fire('pointerdown', 0.5);
    fire('pointermove', 0.5);
    fire('pointermove', 0.5);
    // Only the initial nudge reported; the constant 0.5 a mouse sends is ignored.
    expect(forces.length).toBe(1);
    expect(forces[0]).toBeLessThan(0.2);
  });

  test('force never walks back within one press', () => {
    const { fire, forces } = rig();
    fire('pointerdown', 0.3);
    fire('pointermove', 0.9);
    fire('pointermove', 0.7);
    expect(forces.at(-1)).toBe(0.9);
  });

  test('a pressureless hold ramps on the clock and ends where it got to', async () => {
    const { fire, forces, ended } = rig();
    fire('pointerdown', 0.5);
    await tick(FORCE_RAMP_MS / 3);
    fire('pointerup', 0);
    const reached = ended();
    expect(reached).toBeDefined();
    expect(reached as number).toBeGreaterThan(0.15);
    expect(reached as number).toBeLessThan(0.7);
    // Nothing reports after the press ended.
    const count = forces.length;
    await tick(150);
    expect(forces.length).toBe(count);
  });

  test('a full-length hold reaches full force', async () => {
    const { fire, ended } = rig();
    fire('pointerdown', 0.5);
    await tick(FORCE_RAMP_MS + 200);
    fire('pointerup', 0);
    expect(ended()).toBe(1);
  });
});

/** pinchSpread needs only addEventListener too, so the same bare-EventTarget rig works. */
function pinchRig() {
  const el = new EventTarget() as unknown as HTMLElement;
  const starts: { x: number; y: number }[] = [];
  const scales: number[] = [];
  const turns: number[] = [];
  const ends: number[] = [];
  const endTurns: number[] = [];
  pinchSpread(el, {
    onStart: (center) => starts.push(center),
    onPinch: (scale, turn) => {
      scales.push(scale);
      turns.push(turn);
    },
    onEnd: (scale, turn) => {
      ends.push(scale);
      endTurns.push(turn);
    },
  });
  const fire = (type: string, init: Record<string, unknown>) => el.dispatchEvent(Object.assign(new Event(type), init));
  return { fire, starts, scales, turns, ends, endTurns };
}

describe('pinchSpread', () => {
  test('two touch contacts report their separation ratio and the centre they engaged at', () => {
    const { fire, starts, scales, ends } = pinchRig();
    fire('pointerdown', { pointerType: 'touch', pointerId: 1, clientX: 100, clientY: 100 });
    fire('pointerdown', { pointerType: 'touch', pointerId: 2, clientX: 140, clientY: 100 });
    expect(starts).toEqual([{ x: 120, y: 100 }]);
    fire('pointermove', { pointerType: 'touch', pointerId: 2, clientX: 180, clientY: 100 });
    expect(scales.at(-1)).toBe(2);
    fire('pointermove', { pointerType: 'touch', pointerId: 1, clientX: 120, clientY: 100 });
    expect(scales.at(-1)).toBe(1.5);
    fire('pointerup', { pointerType: 'touch', pointerId: 1, clientX: 120, clientY: 100 });
    expect(ends).toEqual([1.5]);
  });

  test('one finger is not a pinch', () => {
    const { fire, scales, ends } = pinchRig();
    fire('pointerdown', { pointerType: 'touch', pointerId: 1, clientX: 100, clientY: 100 });
    fire('pointermove', { pointerType: 'touch', pointerId: 1, clientX: 160, clientY: 100 });
    fire('pointerup', { pointerType: 'touch', pointerId: 1, clientX: 160, clientY: 100 });
    expect(scales).toEqual([]);
    expect(ends).toEqual([]);
  });

  test('a Ctrl+drag maps onto the mirrored pair', () => {
    const { fire, scales, ends } = pinchRig();
    fire('pointerdown', { pointerType: 'mouse', ctrlKey: true, pointerId: 1, clientX: 100, clientY: 100 });
    // Along the mirror diagonal, one MIRROR_HALF further out doubles the spread.
    fire('pointermove', { pointerType: 'mouse', pointerId: 1, clientX: 121, clientY: 121 });
    expect(scales.at(-1)).toBeCloseTo(2);
    fire('pointerup', { pointerType: 'mouse', pointerId: 1, clientX: 121, clientY: 121 });
    expect(ends[0]).toBeCloseTo(2);
  });

  test('a plain mouse press is not a pinch', () => {
    const { fire, scales, ends } = pinchRig();
    fire('pointerdown', { pointerType: 'mouse', pointerId: 1, clientX: 100, clientY: 100 });
    fire('pointermove', { pointerType: 'mouse', pointerId: 1, clientX: 160, clientY: 160 });
    fire('pointerup', { pointerType: 'mouse', pointerId: 1, clientX: 160, clientY: 160 });
    expect(scales).toEqual([]);
    expect(ends).toEqual([]);
  });

  test('two contacts orbiting report their turn in degrees, clockwise', () => {
    const { fire, turns, scales, endTurns } = pinchRig();
    fire('pointerdown', { pointerType: 'touch', pointerId: 1, clientX: 100, clientY: 100 });
    fire('pointerdown', { pointerType: 'touch', pointerId: 2, clientX: 140, clientY: 100 });
    // The second finger swings a quarter turn around the first at the same distance.
    fire('pointermove', { pointerType: 'touch', pointerId: 2, clientX: 100, clientY: 140 });
    expect(turns.at(-1)).toBeCloseTo(90);
    expect(scales.at(-1)).toBeCloseTo(1);
    fire('pointerup', { pointerType: 'touch', pointerId: 2, clientX: 100, clientY: 140 });
    expect(endTurns).toEqual([90]);
  });

  test('a Ctrl+drag swinging around the mirror centre turns the pair', () => {
    const { fire, turns } = pinchRig();
    fire('pointerdown', { pointerType: 'mouse', ctrlKey: true, pointerId: 1, clientX: 100, clientY: 100 });
    // From the 45deg base diagonal to straight down off the centre at (79, 79): a 45deg turn.
    fire('pointermove', { pointerType: 'mouse', pointerId: 1, clientX: 79, clientY: 109 });
    expect(turns.at(-1)).toBeCloseTo(45);
  });

  test('a stray pointerup never ends a gesture it is not part of', () => {
    const { fire, ends } = pinchRig();
    fire('pointerdown', { pointerType: 'touch', pointerId: 1, clientX: 100, clientY: 100 });
    fire('pointerdown', { pointerType: 'touch', pointerId: 2, clientX: 140, clientY: 100 });
    fire('pointerup', { pointerType: 'touch', pointerId: 9, clientX: 0, clientY: 0 });
    expect(ends).toEqual([]);
    fire('pointerup', { pointerType: 'touch', pointerId: 2, clientX: 140, clientY: 100 });
    expect(ends).toEqual([1]);
  });
});

describe('mirrorPinch', () => {
  test('the pressed point is one contact and the other mirrors it across the centre', () => {
    const rest = mirrorPinch({ x: 100, y: 100 }, { x: 100, y: 100 });
    expect(rest.scale).toBe(1);
    expect(rest.center).toEqual({ x: 79, y: 79 });
    expect(rest.other).toEqual({ x: 58, y: 58 });
    // Dragging back through the centre closes the pinch.
    const closed = mirrorPinch({ x: 100, y: 100 }, { x: 89.5, y: 89.5 });
    expect(closed.scale).toBeCloseTo(0.5);
  });
});
