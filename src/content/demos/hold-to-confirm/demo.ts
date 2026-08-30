import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The wait the guard is made of, and how often the fill is repainted while it runs. */
const HOLD_MS = 900;
const TICK_MS = 60;

/**
 * Hold to confirm specimen: a destructive action that commits only if the press outlasts
 * a threshold, with the fill saying how much of the threshold is left. The subject is
 * that one button, since the term names the guarded control rather than the panel it
 * guards or the receipt it leaves behind.
 *
 * The hold is really wired, on `pointerdown` plus a clock timer, and really cancelled by
 * an early lift, so a reader who takes the stage over gets the guard rather than a mime
 * of it. Nothing is re-parented between the press and the release: the fill and the
 * receipt are in the tree from mount and only their attributes change, because rebuilding
 * a node under the finger cancels the gesture halfway through.
 *
 * The scripted pass holds the press for real: the `hold` step (SPEC §8) is a pointerdown
 * that stays down, so the script commits through the same wiring a finger does, and a
 * short hold is refused by it the same way. The button holds one width and the receipt
 * sits in a slot reserved from mount, so committing moves nothing (SPEC §5). The readout
 * is one nowrap line sized for its longest verdict, so a wordier outcome never grows the
 * topbar and pushes the button down.
 *
 * That readout used to open by reading "Hold the button to delete", which is the site
 * instructing the reader over the top of a button that already says "Hold to delete". It
 * starts empty now and fills in with what the press did; its width is still reserved, so
 * nothing moves when it does.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Workspace settings</span>
          <span class="sp-text" data-part="readout" data-outcome="idle" style="width: 270px; text-align: right; white-space: nowrap"></span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 14px">
          <div class="sp-surface sp-context" style="width: 100%; padding: 10px 12px">
            <div class="sp-heading" style="font-size: 13px">Delete this workspace</div>
            <div class="sp-text" style="font-size: 12px">Removes 14 projects, every build log, and the deploy keys.</div>
          </div>
          <button
            class="sp-button sp-button--ghost"
            type="button"
            data-part="hold"
            data-subject
            data-state="idle"
            style="position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 186px; touch-action: none; user-select: none"
          >
            <span
              data-part="fill"
              aria-hidden="true"
              style="position: absolute; left: 0; top: 0; bottom: 0; width: 0%; background: var(--sp-accent-soft)"
            ></span>
            <span style="position: relative; display: inline-flex; align-items: center; gap: 8px">
              ${icon('trash')}
              <span data-part="label">Hold to delete</span>
            </span>
          </button>
          <div style="position: relative; width: 100%; height: 32px">
            <div
              class="sp-surface sp-context"
              data-part="receipt-empty"
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--sp-muted)"
            >
              Nothing has been deleted
            </div>
            <div
              class="sp-surface"
              data-part="receipt"
              hidden
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 13px"
            >
              Workspace deleted after a ${HOLD_MS} ms hold
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const button = part(root, 'hold');
  const fill = part(root, 'fill');
  const label = part(root, 'label');
  const readout = part(root, 'readout');

  let timer: number | undefined;
  let elapsed = 0;
  let confirmed = false;

  const say = (outcome: string, text: string) => {
    readout.dataset.outcome = outcome;
    readout.textContent = text;
  };

  const clearHold = () => {
    clock.clearTimeout(timer);
    timer = undefined;
    elapsed = 0;
    fill.style.width = '0%';
  };

  const commit = () => {
    clearHold();
    confirmed = true;
    button.dataset.state = 'confirmed';
    flag(button, 'data-confirmed', true);
    fill.style.width = '100%';
    label.textContent = 'Deleted';
    part(root, 'receipt').hidden = false;
    part(root, 'receipt-empty').hidden = true;
    say('confirmed', `Held ${HOLD_MS} ms: deleted`);
  };

  const tick = () => {
    elapsed += TICK_MS;
    fill.style.width = `${Math.min(elapsed / HOLD_MS, 1) * 100}%`;
    if (elapsed >= HOLD_MS) return commit();
    timer = clock.setTimeout(tick, TICK_MS);
  };

  /** Start the countdown, and answer the press at once: the fill is the cancel affordance. */
  const beginHold = () => {
    if (confirmed) return;
    clearHold();
    button.dataset.state = 'holding';
    say('holding', 'Holding: keep pressing to commit');
    timer = clock.setTimeout(tick, TICK_MS);
  };

  /** An early lift is the guard doing its job, so it has to be said out loud. */
  const cancelHold = () => {
    if (confirmed || timer === undefined) return;
    const held = elapsed;
    clearHold();
    button.dataset.state = 'idle';
    say('cancelled', `Released after ${held} ms: nothing deleted`);
  };

  button.addEventListener('pointerdown', beginHold);
  for (const event of ['pointerup', 'pointerleave', 'pointercancel'] as const) button.addEventListener(event, cancelHold);

  // The keyboard cannot hold a key without repeating it, so the guard is spelled out
  // there instead: the space bar arms nothing and says so.
  button.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    if (!confirmed) say('idle', 'Keys repeat rather than hold: use a pointer');
  });
}
