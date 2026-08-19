import { describe, expect, test } from 'bun:test';
import { FORCE_RAMP_MS, pressureHold } from '#src/kit/touch.ts';
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
