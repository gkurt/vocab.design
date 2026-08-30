import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The window the timeline draws, and the wait the subject actually holds. */
const DELAY_MS = 600;
/** The strip covers a second of time, so the delay occupies the first 60 percent of it. */
const WINDOW_PERCENT = 60;

const PHASES: Record<string, string> = {
  idle: 'Idle',
  waiting: `Waiting ${DELAY_MS} ms`,
  shown: 'Shown',
};

/**
 * Delay specimen: two controls with the same label behind them, one that answers a
 * hover the instant it lands and one that holds the hover for 600 ms first. The strip
 * below draws the wait as a window with both of its ends marked, so the delay is a
 * measured stretch of time rather than a feeling that something was slow.
 *
 * The subject is the delayed tooltip: what the term names here is the label's own wait,
 * and the control, the twin, and the timeline are the scenery that make it legible.
 *
 * The wait is measured on the stage's clock, which is what lets identify pose the
 * specimen with the label up instead of watching it appear underneath the reader
 * (SPEC §6). Both tooltips are drawn out of flow into room reserved for them, so a
 * label arriving cannot move the controls it belongs to (SPEC §5).
 *
 * The timeline is an instrument, so it is labelled like one. Its two ticks read "0 ms · pointer
 * in" and "600 ms · label shown", and the line under it reports a state ("Idle", "Waiting 600 ms",
 * "Shown") rather than narrating the wait in sentences the article already writes. The two
 * controls are labelled with their parameter, "delay 600 ms" and "no delay", instead of with a
 * description of what each one is about to do.
 *
 * `data-loop="keep"`: every hover here undoes itself on leave, so the pass ends at its mount state, and attract
 * iterations reuse this tree instead of rebuilding it under a reader inspecting it.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const control = (id: string, note: string, subject: boolean) => `
    <div class="sp-stack${subject ? '' : ' sp-context'}" style="gap: 6px; align-items: flex-start">
      <span class="sp-label" style="font-size: 11px">${note}</span>
      <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="target-${id}">Duplicate</button>
    </div>`;

  root.innerHTML = `
    <div class="sp-app" data-loop="keep">
      <div class="sp-window" style="position: relative; width: 380px">
        <span class="sp-heading sp-context" data-stage-verdict data-part="caption">Time before anything moves</span>
        <div class="sp-row" style="gap: 28px; margin-top: 12px">
          ${control('delayed', `delay ${DELAY_MS} ms`, true)}
          ${control('instant', 'no delay', false)}
        </div>

        <!-- Room the labels are drawn into, so nothing below them moves when one arrives. -->
        <div style="height: 36px"></div>

        <div class="sp-stack sp-context" data-part="timeline" data-phase="idle" style="gap: 8px">
          <div style="position: relative; width: 336px; height: 30px">
            <span style="position: absolute; left: 0; right: 0; top: 8px; height: 2px; border-radius: 1px; background: var(--sp-line)"></span>
            <span
              data-part="window"
              style="position: absolute; left: 0; top: 4px; width: ${WINDOW_PERCENT}%; height: 10px; border-radius: 5px;
                     background: var(--sp-accent-soft); border: 1px solid var(--sp-accent)"
            ></span>
            <span style="position: absolute; left: 0; top: 1px; width: 2px; height: 16px; background: var(--sp-muted)"></span>
            <span style="position: absolute; left: ${WINDOW_PERCENT}%; top: 1px; width: 2px; height: 16px; background: var(--sp-muted)"></span>
            <span class="sp-label" style="position: absolute; left: 0; top: 19px; font-size: 10px">0 ms · pointer in</span>
            <span class="sp-label" style="position: absolute; left: ${WINDOW_PERCENT}%; top: 19px; font-size: 10px">${DELAY_MS} ms · label shown</span>
          </div>
          <span class="sp-label" data-part="phase" style="min-height: 16px; white-space: nowrap">${PHASES.idle}</span>
        </div>

        <span class="sp-tooltip" data-part="tip-delayed" data-subject role="tooltip" id="sp-delay-tip">Duplicate this page</span>
        <span class="sp-tooltip sp-context" data-part="tip-instant" role="tooltip" id="sp-instant-tip">Duplicate this page</span>
      </div>
    </div>
  `;

  const timeline = part(root, 'timeline');
  const phase = part(root, 'phase');

  const say = (name: keyof typeof PHASES) => {
    timeline.dataset.phase = name;
    phase.textContent = PHASES[name] ?? '';
  };

  /**
   * Anchored once, on the mount that will be measured: a tooltip is laid out even
   * while it is invisible, so both labels can be placed before either is asked for
   * and no reveal has to measure anything (SPEC §5, and the measurement gotcha).
   */
  const place = (trigger: HTMLElement, tip: HTMLElement) => {
    const center = trigger.offsetLeft + trigger.offsetWidth / 2;
    const left = Math.max(center - tip.offsetWidth / 2, 0);
    tip.style.left = `${left}px`;
    tip.style.top = `${trigger.offsetTop + trigger.offsetHeight + 8}px`;
    tip.style.setProperty('--sp-arrow-x', `${center - left}px`);
  };

  const wire = (id: string, delayed: boolean) => {
    const trigger = part(root, `target-${id}`);
    const tip = part(root, `tip-${id}`);
    place(trigger, tip);
    let pending: number | undefined;

    const reveal = () => {
      pending = undefined;
      trigger.setAttribute('aria-describedby', tip.id);
      flag(tip, 'data-open', true);
      if (delayed) say('shown');
    };

    trigger.addEventListener('pointerenter', () => {
      if (!delayed) {
        reveal();
        return;
      }
      clock.clearTimeout(pending);
      say('waiting');
      pending = clock.setTimeout(reveal, DELAY_MS);
    });

    trigger.addEventListener('pointerleave', () => {
      if (delayed) {
        clock.clearTimeout(pending);
        pending = undefined;
        say('idle');
      }
      trigger.removeAttribute('aria-describedby');
      flag(tip, 'data-open', false);
    });
  };

  wire('delayed', true);
  wire('instant', false);
}
