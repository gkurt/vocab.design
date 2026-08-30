import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The trip both movers are given, and the cadence a frame is owed. */
const DURATION = 2600;
const FRAME = 17;
/** Track width, and how far a mover travels inside it: the track minus its padding and its own size. */
const TRACK = 358;
const PAD = 3;
const SIZE = 14;
const TRAVEL = TRACK - PAD * 2 - SIZE;
/** Clearance so a replay's reset is painted before the first frame lands on top of it. */
const LEAD = 70;
/** When the main thread is taken away, and for how long. */
const STALL_AT = 700;
const STALL_MS = 1000;

/** The times the scripted mover is actually drawn at: the steady cadence with every frame
    inside the stall simply missing, so it holds and then pays the hold off with a jump. */
const FRAMES = (() => {
  const list: number[] = [];
  for (let time = FRAME; time < DURATION; time += FRAME) {
    if (time >= STALL_AT && time < STALL_AT + STALL_MS) continue;
    list.push(time);
  }
  list.push(DURATION);
  return list;
})();

/**
 * Compositor-only animation specimen: one trip, run twice, with the main thread taken away
 * in the middle of it. The upper mover animates `translate`, which the compositor can advance
 * on its own; the lower one animates `left` from a chain of timers, which is the main thread's
 * work and therefore stops when the main thread does. Both are given the same distance and the
 * same 2600 ms, and a ruled bar over the tracks marks the window the stall occupies.
 *
 * The subject is the mover riding `translate`: the term names the animation that survives the
 * stall, not the comparison and not the run. The scripted mover is the counter-example, and it
 * is a different element rather than a state the subject passes through, so nothing needs a
 * `data-pose`: the subject is the term at rest, mid-stall, and landed alike.
 *
 * The stall is simulated: a specimen may not actually block the thread the stage is running on.
 * What is real is the shape of the failure, which is the frames the scripted mover never gets.
 * A paragraph under the tracks used to say so out loud ("The stall is simulated..."), and two
 * labels glossed the tracks ("the compositor's alone", "stepped on the main thread") beside a
 * heading reading "Same trip, two threads". All four were the site narrating its own diagram,
 * so they went; what is left names only what is drawn, and the article carries the argument.
 *
 * The scripted mover's steps come from the stage's clock, so a pose stops the run where it
 * stands (SPEC §6), and `prefersReducedMotion` is asked directly, since no stylesheet reaches
 * a chain of timers (SPEC §7). Both movers sit inside tracks that already hold their size, so
 * a stall can never move the row it happens in (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const track = (id: string, subject: boolean, property: string) => `
    <div style="position: relative; width: ${TRACK}px; height: ${SIZE + PAD * 2}px; padding: ${PAD}px;
                border-radius: 999px; background: var(--sp-sunken)">
      <span
        data-part="mover-${id}"
        data-state="rest"
        ${subject ? 'data-subject' : ''}
        style="position: absolute; top: ${PAD}px; left: ${PAD}px; width: ${SIZE}px; height: ${SIZE}px;
               border-radius: 50%; background: var(--sp-accent); ${property}"
      ></span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-state="rest" data-thread="idle" style="width: 400px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>

        <div class="sp-stack sp-context" style="gap: 4px; margin-top: 12px">
          <div class="sp-row sp-row--between">
            <span class="sp-label">Main thread</span>
            <span class="sp-label" data-part="thread" style="flex: 0 0 130px; text-align: right">idle</span>
          </div>
          <div style="position: relative; width: ${TRACK}px; height: 6px; border-radius: 999px; background: var(--sp-sunken)">
            <span
              style="position: absolute; top: 0; bottom: 0; left: ${((STALL_AT / DURATION) * 100).toFixed(1)}%;
                     width: ${((STALL_MS / DURATION) * 100).toFixed(1)}%; border-radius: 999px; background: var(--sp-warn)"
            ></span>
          </div>
        </div>

        <div class="sp-stack" style="gap: 6px; margin-top: 14px">
          <div class="sp-row sp-context">
            <span class="sp-label sp-text--ink">translate</span>
          </div>
          ${track('gpu', true, `translate: 0 0; transition: translate ${DURATION}ms linear ${LEAD}ms`)}
        </div>

        <div class="sp-stack sp-context" style="gap: 6px; margin-top: 12px">
          <div class="sp-row">
            <span class="sp-label sp-text--ink">left</span>
          </div>
          ${track('main', false, 'transition: none')}
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const gpu = part(root, 'mover-gpu');
  const main = part(root, 'mover-main');
  const thread = part(root, 'thread');
  const pending: number[] = [];

  const setThread = (busy: boolean) => {
    scene.dataset.thread = busy ? 'busy' : 'idle';
    thread.textContent = busy ? `blocked for ${STALL_MS} ms` : 'idle';
    main.dataset.state = busy ? 'stalled' : 'rolling';
  };

  const land = () => {
    gpu.style.transition = 'none';
    gpu.style.translate = `${TRAVEL}px 0`;
    gpu.dataset.state = 'landed';
    main.style.left = `${PAD + TRAVEL}px`;
    main.dataset.state = 'landed';
    scene.dataset.state = 'landed';
    scene.dataset.thread = 'idle';
    thread.textContent = 'idle';
  };

  const step = (index: number) => {
    const time = FRAMES[index];
    if (time === undefined) return;
    main.style.left = `${PAD + (time / DURATION) * TRAVEL}px`;
    const next = FRAMES[index + 1];
    if (next === undefined) return;
    pending.push(clock.setTimeout(() => step(index + 1), next - time));
  };

  const play = () => {
    for (const id of pending) clock.clearTimeout(id);
    pending.length = 0;

    if (prefersReducedMotion(root)) {
      land();
      return;
    }

    // Back to the start with nothing to carry either mover there, then a reflow so the
    // browser cannot fold the reset and the trip into one change.
    gpu.style.transition = 'none';
    gpu.style.translate = '0 0';
    main.style.left = `${PAD}px`;
    void gpu.offsetWidth;

    gpu.style.transition = `translate ${DURATION}ms linear ${LEAD}ms`;
    gpu.style.translate = `${TRAVEL}px 0`;
    gpu.dataset.state = 'gliding';
    main.dataset.state = 'rolling';
    scene.dataset.state = 'running';
    setThread(false);

    pending.push(clock.setTimeout(() => step(0), LEAD + FRAME));
    pending.push(clock.setTimeout(() => setThread(true), LEAD + STALL_AT));
    pending.push(clock.setTimeout(() => setThread(false), LEAD + STALL_AT + STALL_MS));
    pending.push(
      clock.setTimeout(
        () => {
          gpu.dataset.state = 'landed';
          main.dataset.state = 'landed';
          scene.dataset.state = 'landed';
        },
        LEAD + DURATION + 80,
      ),
    );
  };

  part(root, 'replay').addEventListener('click', play);
  play();
}
