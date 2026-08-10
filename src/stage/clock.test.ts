import { describe, expect, test } from 'bun:test';
import { DemoClock } from '#src/stage/clock.ts';

const tick = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('DemoClock', () => {
  test('runs a timer the stage never touched', async () => {
    const clock = new DemoClock();
    let fired = false;
    clock.setTimeout(() => {
      fired = true;
    }, 10);
    await tick(30);
    expect(fired).toBe(true);
  });

  test('a frozen timer does not fire, however long the pose lasts', async () => {
    const clock = new DemoClock();
    let fired = false;
    clock.setTimeout(() => {
      fired = true;
    }, 10);
    clock.freeze();
    await tick(60);
    expect(fired).toBe(false);
  });

  test('thawing gives back the time that was left, not the whole delay', async () => {
    const clock = new DemoClock();
    let fired = false;
    clock.setTimeout(() => {
      fired = true;
    }, 60);
    await tick(50);
    clock.freeze();
    await tick(60);
    clock.thaw();
    // Roughly 10ms was left, so this is well short of a restarted 60.
    await tick(40);
    expect(fired).toBe(true);
  });

  test('a timer scheduled during a pose waits for the thaw to start counting', async () => {
    const clock = new DemoClock();
    clock.freeze();
    let fired = false;
    clock.setTimeout(() => {
      fired = true;
    }, 20);
    await tick(60);
    expect(fired).toBe(false);
    clock.thaw();
    await tick(60);
    expect(fired).toBe(true);
  });

  test('clearing works whether the timer is running or held', async () => {
    const clock = new DemoClock();
    let ran = 0;
    const running = clock.setTimeout(() => ran++, 20);
    clock.clearTimeout(running);
    clock.freeze();
    const held = clock.setTimeout(() => ran++, 20);
    clock.clearTimeout(held);
    clock.thaw();
    await tick(60);
    expect(ran).toBe(0);
  });

  test('clearing an undefined handle is the no-op demos rely on', () => {
    expect(() => new DemoClock().clearTimeout(undefined)).not.toThrow();
  });

  test('stop cancels everything, so nothing outlives its mount', async () => {
    const clock = new DemoClock();
    let ran = 0;
    clock.setTimeout(() => ran++, 20);
    clock.freeze();
    clock.setTimeout(() => ran++, 20);
    clock.stop();
    clock.thaw();
    await tick(60);
    expect(ran).toBe(0);
  });
});
