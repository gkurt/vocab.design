import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** Long enough that a reader, or a script, can genuinely catch the sheet in flight. */
const MOVE_MS = 1500;
/** The rail's width, less its padding and the sheet's own width. */
const TRAVEL = 192;
const STOPS = { left: 0, right: TRAVEL };

type Stop = keyof typeof STOPS;

/**
 * Interruptible animation specimen: one destination pair, two sheets, and a second press
 * that arrives while the first move is still running. The upper sheet takes the new
 * destination immediately and travels on from wherever it had reached; the lower one is the
 * lockout, which finishes the move it was given and only then plays the press it stored.
 *
 * The subject is the redirecting sheet, since the term names the motion that can be caught
 * and not the comparison around it. The queueing twin below is scenery in the context
 * register: the counter-example is a different element rather than a state this sheet passes
 * through, so nothing here needs a `data-pose`.
 *
 * The redirect itself is a plain CSS transition and deliberately so: writing a new value
 * while one is running makes the browser start a fresh transition from the currently
 * computed value, which is interruption already handled. What CSS cannot carry across is
 * velocity, and that is the prose's business rather than the demo's. `motion.css` therefore
 * flattens both sheets for a reader who asked for less movement, and the twin's queue is
 * asked the same question so its lockout does not outlive a move that no longer takes any
 * time (SPEC §7). Both controls name an absolute destination rather than a direction, so a
 * fast-forwarded or resumed pass lands where it said (SPEC §8). Two lines of the site's own
 * voice used to sit in the frame: a rail caption reading "turns from where it is" and a
 * footer reading "Press one edge, then the other before the move ends." Neither is anything
 * a product would print, and the article already says both, so both are gone. Both sheets travel with
 * `translate` inside rails that hold their own size, so nothing else in the window moves
 * (SPEC §5). The twin's timer is the stage's, so a pose stops its queue where it stands.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const rail = (id: string, subject: boolean) => `
    <div style="position: relative; height: 34px; padding: 4px; border-radius: 8px; background: var(--sp-sunken)">
      <span
        data-part="${id}"
        ${subject ? 'data-subject' : ''}
        data-at="left"
        style="position: absolute; top: 4px; left: 4px; display: flex; align-items: center; justify-content: center;
               width: 64px; height: 26px; border-radius: 6px; background: var(--sp-accent); color: var(--sp-accent-ink);
               font-size: 12px; font-weight: 500; translate: 0 0; transition: translate ${MOVE_MS}ms var(--sp-ease)"
      >Sheet</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 312px">
        <div class="sp-row sp-context" style="gap: 8px">
          <span class="sp-label sp-grow">Send the sheet</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="to-left">Left</button>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="to-right">Right</button>
        </div>

        <div class="sp-stack" style="gap: 6px; margin-top: 14px">
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-label">Interruptible</span>
          </div>
          ${rail('live', true)}
        </div>

        <div class="sp-stack sp-context" style="gap: 6px; margin-top: 14px">
          <div class="sp-row sp-row--between">
            <span class="sp-label">Locked out</span>
            <span class="sp-label" data-part="queue-note" style="flex: 0 0 118px; text-align: right">nothing waiting</span>
          </div>
          ${rail('queued', false)}
        </div>
      </div>
    </div>
  `;

  const live = part(root, 'live');
  const queued = part(root, 'queued');
  const note = part(root, 'queue-note');
  let holding: number | undefined;
  let waiting: Stop | undefined;

  const settle = () => (prefersReducedMotion(root) ? 20 : MOVE_MS + 40);

  const place = (el: HTMLElement, stop: Stop) => {
    el.style.translate = `${STOPS[stop]}px 0`;
    el.dataset.at = stop;
  };

  /** The lockout: the move that is running owns the sheet until it is over. */
  const enqueue = (stop: Stop) => {
    if (holding !== undefined) {
      waiting = stop;
      queued.dataset.pending = stop;
      note.textContent = `${stop} is waiting`;
      return;
    }
    place(queued, stop);
    holding = clock.setTimeout(() => {
      holding = undefined;
      const next = waiting;
      waiting = undefined;
      queued.removeAttribute('data-pending');
      note.textContent = 'nothing waiting';
      if (next) enqueue(next);
    }, settle());
  };

  const send = (stop: Stop) => {
    place(live, stop);
    enqueue(stop);
  };

  part(root, 'to-left').addEventListener('click', () => send('left'));
  part(root, 'to-right').addEventListener('click', () => send('right'));
}
