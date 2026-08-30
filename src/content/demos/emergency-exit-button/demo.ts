import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How many Shift presses leave, and how long the run of presses has to arrive in. */
const SHIFTS = 3;
const RUN_MS = 6000;

const HINT = `or press Shift ${SHIFTS} times`;

/**
 * Emergency exit button specimen: a support page with the exit control pinned to the top right,
 * where it cannot scroll away, and the same control reachable from the keyboard by pressing Shift
 * three times. The press counter beside it says how far through the run a reader is, because the
 * gesture is otherwise invisible.
 *
 * Leaving is shown as a STATE, never as a real navigation: a demo may not send the page it sits in
 * anywhere (SPEC §5), so the destination is a panel of its own inside the frame, carrying the note
 * a real implementation earns the right to make. The "Show the page again" control on that panel is
 * demo instrumentation, not part of the term: a real exit is one way.
 *
 * A footer band under the frame used to read "Shown as a state: a specimen never navigates the page
 * it sits in." That was the site explaining its own staging rules to a reader inside a support page,
 * which no support page would ever print, so it is gone; the constraint it described is recorded in
 * this comment instead.
 *
 * The subject is the exit control, the narrowest element the term names. The support prose, the
 * destination panel, the counter and the reset are scenery in the context register. The control is
 * honestly an emergency exit button in the one state it appears in, so no `data-pose` condition is
 * needed, and it is on stage at mount, which is the state identify poses.
 *
 * Both panels are absolutely positioned in the same reserved box, so leaving moves nothing, and the
 * counter's slot is sized for its longest string. The keyboard run is counted on the DemoClock, so a
 * pose freezes it rather than letting a half-finished run expire under inspection. The page carries
 * `tabindex="0"` so a real reader can focus it and their own Shift presses reach the same handler
 * the script drives (SPEC §8).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 296px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Support</span>
          <span class="sp-label" style="font-size: 11px; white-space: nowrap">This device may not be private</span>
        </div>

        <div class="sp-body" data-part="view" data-state="page" style="position: relative">
          <div data-part="page" tabindex="0" style="position: absolute; inset: 12px; transition: opacity 0.18s, visibility 0.18s">
            <div class="sp-stack sp-context" style="gap: 7px; padding: 44px 4px 0">
              <span class="sp-heading" style="font-size: 13px">If you are being controlled or hurt at home</span>
              <p class="sp-text" style="margin: 0; font-size: 11.5px; line-height: 1.5">
                You can call the helpline at any hour. It is free, it does not appear on a phone bill, and you do not
                have to give your name.
              </p>
              <p class="sp-text" style="margin: 0; font-size: 11.5px; line-height: 1.5">
                Whoever controls this device may be able to see this page later. There are instructions further down
                for clearing your browser history, and the button above leaves now.
              </p>
            </div>

            <div style="position: absolute; top: 0; right: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 4px">
              <button
                class="sp-button"
                type="button"
                data-part="exit"
                data-subject
                style="display: inline-flex; align-items: center; gap: 6px; flex: 0 0 auto; padding: 6px 12px; font-size: 12.5px; white-space: nowrap"
              >${icon('share')}Exit this page</button>
              <span
                class="sp-label sp-context"
                data-part="counter"
                data-count="0"
                style="height: 14px; font-size: 10.5px; line-height: 14px; white-space: nowrap"
                >${HINT}</span
              >
            </div>
          </div>

          <div
            class="sp-context"
            data-part="dest"
            style="position: absolute; inset: 12px; display: flex; flex-direction: column; justify-content: center; gap: 10px;
                   opacity: 0; visibility: hidden; transition: opacity 0.18s, visibility 0.18s"
          >
            <span class="sp-heading" style="font-size: 13px">Weather for the week</span>
            <div class="sp-row" style="gap: 8px">
              ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
                .map(
                  (day) => `
                    <span class="sp-surface" style="display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1 1 auto; padding: 8px 0">
                      <span class="sp-label" style="font-size: 10.5px">${day}</span>
                      <span class="sp-line" style="width: 26px"></span>
                    </span>`,
                )
                .join('')}
            </div>
            <p class="sp-text" data-stage-verdict data-part="note" style="margin: 0; font-size: 11.5px; line-height: 1.5">
              The support page was replaced in this tab's history rather than added to it, so going back does not
              return to it. That is all this control can promise: it cannot clear a synced history, a monitoring
              app, or a network log.
            </p>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reset" style="align-self: flex-start; font-size: 12px">
              Show the page again
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  const view = part(root, 'view');
  const page = part(root, 'page');
  const dest = part(root, 'dest');
  const counter = part(root, 'counter');

  let presses = 0;
  let runTimer: number | undefined;

  const setCount = (next: number) => {
    presses = next;
    counter.dataset.count = String(next);
    counter.textContent = next === 0 ? HINT : `Shift ${next} of ${SHIFTS}`;
  };

  const show = (left: boolean) => {
    view.dataset.state = left ? 'left' : 'page';
    page.style.opacity = left ? '0' : '1';
    page.style.visibility = left ? 'hidden' : 'visible';
    dest.style.opacity = left ? '1' : '0';
    dest.style.visibility = left ? 'visible' : 'hidden';
    clock.clearTimeout(runTimer);
    runTimer = undefined;
    setCount(0);
  };

  // Both triggers reach the same state rather than flipping one (SPEC §8): the button and the
  // completed key run leave, and only the demo's own reset comes back.
  part(root, 'exit').addEventListener('click', () => show(true));
  part(root, 'reset').addEventListener('click', () => show(false));

  // Keys land on the player's current target and bubble, and a real reader's presses bubble from
  // the focused page, so one listener on the root answers both.
  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Shift' || event.repeat) return;
    if (view.dataset.state === 'left') return;
    if (presses + 1 >= SHIFTS) return show(true);
    setCount(presses + 1);
    // The run has to arrive together: a stray press hours ago is not a request to leave.
    clock.clearTimeout(runTimer);
    runTimer = clock.setTimeout(() => setCount(0), RUN_MS);
  });

  show(false);
}
