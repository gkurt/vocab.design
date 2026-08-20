import { part } from '#src/kit/parts.ts';
import { twoFingerTap } from '#src/kit/touch.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/**
 * Magic tap specimen: a call screen whose one obvious action is answering, reached by a
 * two-finger double tap anywhere on the screen rather than by finding the button. The
 * transcript reports what the gesture fired, and a second double tap hangs up, which is
 * the same gesture reaching the screen's new most-likely action.
 *
 * The subject is the announcement of what the gesture did (SPEC §5): the term names the
 * shortcut's outcome rather than the button it stands in for, and the button is reachable
 * the ordinary way in every state, so it is not the thing this word is about. Every
 * resting state is an honest one, so no `data-pose` is needed.
 *
 * The gesture is PORTRAYED as itself: `twoFingerTap` from the kit reads the script's
 * `twoFingerTap` step, a real pair of fingers, and a reader's Ctrl+tap through one
 * wiring (SPEC §7). What the article has to say, and the demo cannot, is that VoiceOver
 * routes this gesture natively and a web page never sees the contacts at all.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div style="display: grid; gap: 10px; width: 420px; margin: 0 auto">
      <div class="sp-frame sp-frame--wide" data-touch style="display: grid; gap: 12px; padding: 16px; place-items: center">
        <div class="sp-text sp-text--quiet" style="font-size: 12px">Incoming call</div>
        <div class="sp-text sp-text--ink" style="font-size: 17px; font-weight: 600" data-part="who">Priya Raman</div>
        <div class="sp-row" style="gap: 10px">
          <button class="sp-button sp-button--sm" type="button" data-part="answer">Answer</button>
          <button class="sp-button sp-button--sm sp-button--quiet" type="button" data-part="decline">Decline</button>
        </div>
        <div class="sp-text sp-text--quiet" data-part="surface" style="font-size: 11px; text-align: center; max-width: 260px">
          Two-finger double tap anywhere on this screen
        </div>
      </div>
      <div class="sp-context sp-stack" style="gap: 4px; padding: 8px 10px">
        <span class="sp-label">Announced</span>
        <p class="sp-text sp-text--ink" data-part="spoken" data-subject data-state="idle" style="margin: 0; min-height: 17px; font-size: 13px">“Incoming call from Priya Raman”</p>
      </div>
    </div>`;

  const spoken = part(root, 'spoken');
  const who = part(root, 'who');
  const answer = part(root, 'answer') as HTMLButtonElement;
  const decline = part(root, 'decline') as HTMLButtonElement;
  let live = false;

  const say = (text: string, state: string) => {
    spoken.textContent = `“${text}”`;
    spoken.dataset.state = state;
  };
  /* The screen's most-likely action changes once the call connects, and the gesture
     follows it: that shift is the whole reason the shortcut is worth having. */
  const connect = () => {
    live = true;
    who.textContent = 'Priya Raman · connected';
    answer.textContent = 'Hang up';
    decline.disabled = true;
    say('Answered. Call connected', 'answered');
  };
  const hangUp = () => {
    live = false;
    who.textContent = 'Call ended';
    answer.textContent = 'Answer';
    answer.disabled = true;
    say('Call ended', 'ended');
  };
  const fire = () => (live ? hangUp() : connect());

  answer.addEventListener('click', fire);
  // A magic tap is a DOUBLE two-finger tap, so a single one is not the gesture.
  twoFingerTap(part(root, 'surface').parentElement as HTMLElement, clock, {
    onTap: (count) => {
      if (count === 1) return say('Two fingers down', 'waiting');
      if (count === 2) fire();
    },
  });
}
