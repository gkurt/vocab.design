import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const TICK_MS = 1000;
/** A fresh session, and what the warning restores it to. */
const FULL_S = 300;
/** Where the simulated idle jump lands: comfortably above the criterion's twenty seconds. */
const SKIP_TO_S = 35;
/** The last minute is when the warning is raised, and when the readout says so. */
const WARN_S = 60;

const face = (total: number) => `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;

/**
 * Timeout warning specimen: a form somebody is halfway through, a session quietly running
 * out behind it, and the dialog that has to arrive before the session does. Extending
 * puts the full five minutes back and closes the dialog; signing out is the other
 * explicit answer, so neither exit is left to the clock (SPEC §8).
 *
 * The subject is the warning dialog, not the session readout and not the form: the term
 * names the thing that appears in time to be answered. It ships closed, so identify
 * summons it by fast-forwarding the script until it is raised (SPEC §6).
 *
 * The idle jump is instrumentation and says so in its own label: four minutes of nothing
 * happening is the one part of this that cannot be watched. Both clock faces are set in
 * tabular figures and always carry the same number of digits, so a second passing moves
 * no text (SPEC §5), and the tick is the stage's clock, which is what lets a pose hold the
 * dialog still while it is inspected.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 236px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 14px">Membership application</span>
          <span class="sp-label">Session</span>
          <span class="sp-text sp-text--ink" data-part="session" data-zone="ok"
                style="font-size: 13px; font-variant-numeric: tabular-nums">${face(FULL_S)}</span>
        </div>

        <div class="sp-body sp-context">
          <div data-part="form-view">
            <div class="sp-field">
              <label class="sp-label" for="vd-tw-why">Why are you applying?</label>
              <textarea class="sp-input" id="vd-tw-why" rows="3" spellcheck="false"
                        style="height: 92px; resize: none; line-height: 1.5">I have worked the harbour road since</textarea>
            </div>
            <p class="sp-text" style="margin: 8px 0 0; font-size: 11px">Page 3 of 4. Nothing on this page is saved yet.</p>
          </div>
          <div class="sp-empty" data-part="ended-view" hidden>
            <span class="sp-text sp-text--ink">Signed out. Your answers were not kept.</span>
          </div>
        </div>

        <div class="sp-scrim" data-part="scrim"></div>
        <div class="sp-dialog" data-part="dialog" data-subject role="alertdialog" aria-modal="true"
             aria-labelledby="vd-tw-title" style="width: 322px">
          <div class="sp-heading" id="vd-tw-title">Still there?</div>
          <p class="sp-text" style="margin: 6px 0 0">
            You will be signed out in
            <span class="sp-text--ink" data-part="dialog-clock"
                  style="font-weight: 600; font-variant-numeric: tabular-nums">${face(SKIP_TO_S)}</span>,
            and this page of your application is not saved yet.
          </p>
          <div class="sp-row" style="margin-top: 14px; gap: 8px; justify-content: flex-end">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="sign-out">Sign out now</button>
            <button class="sp-button sp-button--sm" type="button" data-part="extend">Keep me signed in</button>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" style="gap: 10px">
        <span class="sp-label">Instrument</span>
        <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="skip">Skip four idle minutes</button>
      </div>
    </div>
  `;

  const session = part(root, 'session');
  const dialogClock = part(root, 'dialog-clock');
  const dialog = part(root, 'dialog');
  const scrim = part(root, 'scrim');

  let left = FULL_S;
  let ended = false;

  const render = () => {
    session.textContent = face(left);
    session.dataset.zone = left <= WARN_S ? 'warn' : 'ok';
    dialogClock.textContent = face(left);
    const open = !ended && left <= WARN_S && left > 0;
    flag(dialog, 'data-open', open);
    flag(scrim, 'data-open', open);
  };

  const end = () => {
    ended = true;
    left = 0;
    part(root, 'form-view').hidden = true;
    part(root, 'ended-view').hidden = false;
    render();
  };

  const tick = () => {
    if (ended) return;
    left = Math.max(0, left - 1);
    render();
    if (left === 0) return end();
    clock.setTimeout(tick, TICK_MS);
  };

  clock.setTimeout(tick, TICK_MS);

  // Each control lands on an absolute state rather than flipping the one it finds.
  part(root, 'skip').addEventListener('click', () => {
    if (ended) return;
    left = SKIP_TO_S;
    render();
  });

  part(root, 'extend').addEventListener('click', () => {
    if (ended) return;
    left = FULL_S;
    render();
  });

  part(root, 'sign-out').addEventListener('click', end);
}
