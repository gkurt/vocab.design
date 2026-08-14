import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long Ada is shown composing before the message she promised arrives. */
const COMPOSE_MS = 1700;
/** The row both the indicator and the arriving message are drawn in, at one height. */
const SLOT_H = 34;

const dot = (index: number) => `
  <span
    class="sp-pulse"
    style="width: 6px; height: 6px; border-radius: 50%; background: var(--sp-accent); animation-delay: -${(index * 0.6).toFixed(1)}s"
  ></span>`;

/**
 * Typing indicator specimen: a thread where Ada starts composing, holds the reader
 * for a beat, and then lands the message she promised. The subject is the indicator
 * bubble, the narrowest element the term names: not the thread, not the row it is
 * drawn in, and not any one dot.
 *
 * The row is reserved at a fixed height and both states are laid inside it, so the
 * message replacing the dots moves nothing above it (SPEC §5). The dots breathe with
 * the kit's own pulse, out of phase, which is what keeps the one endless animation
 * here answerable to reduced motion and to the stage's pause: under a stated motion
 * preference the dots simply hold still, and the indicator still says what it says.
 *
 * The button is instrumentation and lives in the context register, and it reaches a
 * state rather than flipping one (SPEC §8): pressing it always means "compose from
 * nothing", whenever in the run the press arrives.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 248px">
        <div class="sp-topbar sp-context">
          <span class="sp-avatar">AM</span>
          <span class="sp-heading sp-grow">Ada M.</span>
          <span class="sp-label">Harbour survey</span>
        </div>
        <div class="sp-body sp-stack" style="gap: 10px">
          <div class="sp-row sp-context" data-part="msg-ask" style="justify-content: flex-end">
            <span style="max-width: 74%; padding: 7px 11px; border-radius: 12px 12px 4px 12px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 13px">
              Can you take the survey tomorrow?
            </span>
          </div>
          <div class="sp-row sp-context" data-part="msg-seen" style="justify-content: flex-start">
            <span style="max-width: 74%; padding: 7px 11px; border-radius: 12px 12px 12px 4px; background: var(--sp-surface); border: 1px solid var(--sp-line); font-size: 13px">
              Checking the tide table.
            </span>
          </div>
          <div data-part="slot" style="position: relative; height: ${SLOT_H}px">
            <span
              class="sp-row"
              data-part="indicator"
              data-subject
              role="status"
              aria-label="Ada is typing"
              hidden
              style="position: absolute; left: 0; top: 0; gap: 5px; padding: 11px 13px; border-radius: 12px 12px 12px 4px;
                     background: var(--sp-surface); border: 1px solid var(--sp-line)"
            >${dot(0)}${dot(1)}${dot(2)}</span>
            <span
              class="sp-context"
              data-part="reply"
              hidden
              style="position: absolute; left: 0; top: 0; max-width: 74%; padding: 7px 11px; border-radius: 12px 12px 12px 4px;
                     background: var(--sp-surface); border: 1px solid var(--sp-line); font-size: 13px"
            >Tomorrow works. Low water at six.</span>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="flex: 0 0 auto; padding: 8px 12px; border-top: 1px solid var(--sp-line)">
          <span class="sp-text" style="font-size: 12px">The promise, then the message.</span>
          <button class="sp-button sp-button--sm" type="button" data-part="ask">Ada replies</button>
        </div>
      </div>
    </div>
  `;

  const indicator = part(root, 'indicator');
  const reply = part(root, 'reply');
  let timer: number | undefined;

  part(root, 'ask').addEventListener('click', () => {
    clock.clearTimeout(timer);
    reply.hidden = true;
    indicator.hidden = false;
    timer = clock.setTimeout(() => {
      indicator.hidden = true;
      reply.hidden = false;
    }, COMPOSE_MS);
  });
}
