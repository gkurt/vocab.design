import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the rattle runs, and how long after it the system alert arrives. */
const SHAKE_MS = 620;
const ALERT_MS = 180;

const NOTE_LINES = ['Ask about the boiler', 'Bring the parcel slip'];

/**
 * Shake to undo specimen: a phone whose accelerometer gesture raises the system undo alert.
 * The subject is the device, because the term names a gesture made to the whole handset, the
 * way long press names the tile the finger is on rather than the menu it produces. The alert
 * is the answer to the gesture, and the panel beside the phone is instrumentation, so both
 * stay outside the subject and the panel sits in the context register.
 *
 * A shake is a SENSOR CONDITION rather than an input a pointer or a key can make, so the
 * labelled control here is the legitimate kind of simulation (SPEC §8): the same carve-out
 * that covers a network failure, a server delay or a permission state, none of which any
 * gesture could perform either. It runs the same rattle and the same alert the real gesture
 * would, and the honest label is what keeps it a simulation of a condition rather than a
 * costume worn by an input. The
 * rattle is an `element.animate`, out of reach of the kit's motion sheet, so it asks
 * `prefersReducedMotion` itself and lands on a static tilt instead of playing the move.
 *
 * The instrument panel once ended with a line explaining that the alert always asks first
 * because the gesture is easy to make by accident, and its readout opened by saying the
 * accelerometer is the trigger with nothing on screen to point at. Both were the site
 * talking beside the phone; the article carries them, and the readout now opens with the
 * idle state a motion instrument would really print.
 *
 * Undoing does not reflow the note: the undone line keeps its box and loses its ink, so the
 * lines above it hold still (SPEC §5), and the alert is drawn over the scene rather than
 * pushed into it.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-row" style="align-items: center; gap: 16px">
        <div
          class="sp-surface"
          data-part="device"
          data-state="rest"
          data-subject
          style="position: relative; display: flex; flex-direction: column; gap: 8px; width: 168px; height: 258px; padding: 12px 10px; border-radius: 22px; overflow: hidden"
        >
          <div class="sp-row sp-row--between" style="flex: 0 0 auto">
            <span class="sp-heading" style="font-size: 13px">Notes</span>
            <span class="sp-label" style="font-size: 11px">9:41</span>
          </div>
          <div
            data-part="note"
            style="flex: 1 1 auto; display: flex; flex-direction: column; gap: 7px; padding: 9px; border-radius: 10px; background: var(--sp-sunken); font-size: 12px; line-height: 1.35"
          >
            ${NOTE_LINES.map((line) => `<span>${line}</span>`).join('')}
            <span data-part="last-line" style="transition: opacity 0.2s">Call the landlord back</span>
          </div>
          <div class="sp-scrim" data-part="scrim" style="border-radius: 22px"></div>
          <div
            class="sp-dialog"
            data-part="alert"
            role="alertdialog"
            aria-label="Undo Typing"
            style="width: 146px; padding: 12px 10px 10px"
          >
            <div class="sp-stack" style="gap: 4px; text-align: center">
              <span class="sp-heading" style="font-size: 13px">Undo Typing</span>
              <span class="sp-text" style="font-size: 11px; line-height: 1.35">Take back the last line you typed?</span>
            </div>
            <div class="sp-row" style="gap: 6px; margin-top: 10px">
              <button class="sp-button sp-button--ghost sp-button--sm sp-grow" type="button" data-part="cancel" style="padding: 4px 6px; font-size: 12px">Cancel</button>
              <button class="sp-button sp-button--sm sp-grow" type="button" data-part="undo" style="padding: 4px 6px; font-size: 12px">Undo</button>
            </div>
          </div>
        </div>
        <div class="sp-stack sp-context" style="width: 244px; gap: 10px">
          <span class="sp-label">Simulated device motion</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="sim" style="align-self: flex-start">Shake the phone</button>
          <span
            class="sp-text"
            data-part="readout"
            data-mode="idle"
            style="min-height: 36px; font-size: 12px"
          >Idle. No motion above the threshold.</span>
        </div>
      </div>
    </div>
  `;

  const device = part(root, 'device');
  const note = part(root, 'note');
  const dialog = part(root, 'alert');
  const scrim = part(root, 'scrim');
  const readout = part(root, 'readout');

  let timer: number | undefined;

  const say = (mode: string, text: string) => {
    readout.dataset.mode = mode;
    readout.textContent = text;
  };

  const rattle = () => {
    if (prefersReducedMotion(root)) {
      // A held tilt rather than a rattle: the device still reads as moved, and nothing moves.
      device.style.rotate = '1.6deg';
      return;
    }
    device.animate(
      [
        { transform: 'translateX(0) rotate(0deg)' },
        { transform: 'translateX(-7px) rotate(-1.6deg)' },
        { transform: 'translateX(6px) rotate(1.4deg)' },
        { transform: 'translateX(-4px) rotate(-0.9deg)' },
        { transform: 'translateX(3px) rotate(0.6deg)' },
        { transform: 'translateX(0) rotate(0deg)' },
      ],
      { duration: SHAKE_MS, easing: 'ease-in-out' },
    );
  };

  const open = () => {
    device.dataset.state = 'alerting';
    flag(scrim, 'data-open', true);
    flag(dialog, 'data-open', true);
    say('alert', 'Shaken: the system offers the undo, and waits.');
  };

  // Reached, never flipped (SPEC §8): a shake always arrives at the same open alert, so a
  // resumed or fast-forwarded pass can never shake the alert away again.
  const shake = () => {
    clock.clearTimeout(timer);
    device.dataset.state = 'shaking';
    say('shake', 'Shaking: a motion past the threshold, not a control.');
    rattle();
    timer = clock.setTimeout(open, SHAKE_MS + ALERT_MS);
  };

  const dismiss = (mode: string, text: string) => {
    clock.clearTimeout(timer);
    timer = undefined;
    device.dataset.state = 'rest';
    device.style.rotate = '';
    flag(scrim, 'data-open', false);
    flag(dialog, 'data-open', false);
    say(mode, text);
  };

  part(root, 'sim').addEventListener('click', shake);

  part(root, 'cancel').addEventListener('click', () => {
    dismiss('cancelled', 'Cancelled: the shake was accidental and the note is untouched.');
  });

  part(root, 'undo').addEventListener('click', () => {
    flag(note, 'data-undone', true);
    part(root, 'last-line').style.opacity = '0';
    dismiss('undone', 'Undone: the last line is gone, and a second shake would redo it.');
  });
}
