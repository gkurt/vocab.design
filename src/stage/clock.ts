/**
 * The only timer a demo may keep (SPEC §6–7).
 *
 * A pose is the live specimen with its clock held, not a copy of it, so a reader
 * can press the demo they are looking at and have the press land on the element
 * they aimed at. That only holds while the stage can reach every timer the demo
 * set: a bare `setTimeout` keeps running under the pose and dismisses the subject
 * mid-inspection, and it outlives the mount that scheduled it. `bun validate`
 * rejects one in a demo for both reasons.
 *
 * Freezing keeps the time each timer has left rather than restarting it, so a
 * toast inspected a second in still has the rest of its second when it is handed
 * back, and a timer scheduled while frozen waits for the thaw to start counting.
 */
export class DemoClock {
  #frozen = false;
  #next = 1;
  #running = new Map<number, { fn: () => void; due: number; handle: ReturnType<typeof globalThis.setTimeout> }>();
  #held = new Map<number, { fn: () => void; left: number }>();

  setTimeout(fn: () => void, ms: number): number {
    const id = this.#next++;
    if (this.#frozen) this.#held.set(id, { fn, left: ms });
    else this.#start(id, fn, ms);
    return id;
  }

  clearTimeout(id: number | undefined): void {
    if (id === undefined) return;
    const running = this.#running.get(id);
    if (running) globalThis.clearTimeout(running.handle);
    this.#running.delete(id);
    this.#held.delete(id);
  }

  /** Hold every pending timer where it stands. */
  freeze(): void {
    if (this.#frozen) return;
    this.#frozen = true;
    const now = performance.now();
    for (const [id, timer] of this.#running) {
      globalThis.clearTimeout(timer.handle);
      this.#held.set(id, { fn: timer.fn, left: Math.max(0, timer.due - now) });
    }
    this.#running.clear();
  }

  /** Hand the demo back its time. */
  thaw(): void {
    if (!this.#frozen) return;
    this.#frozen = false;
    const held = [...this.#held];
    this.#held.clear();
    for (const [id, timer] of held) this.#start(id, timer.fn, timer.left);
  }

  /** The mount this clock belongs to is gone; nothing it scheduled may still fire. */
  stop(): void {
    for (const timer of this.#running.values()) globalThis.clearTimeout(timer.handle);
    this.#running.clear();
    this.#held.clear();
    this.#frozen = false;
  }

  #start(id: number, fn: () => void, ms: number): void {
    const handle = globalThis.setTimeout(() => {
      this.#running.delete(id);
      fn();
    }, ms);
    this.#running.set(id, { fn, due: performance.now() + ms, handle });
  }
}
