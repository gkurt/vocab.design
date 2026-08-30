import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** When the script finally lands. Long enough that a press can be made before it. */
const HYDRATE_MS = 2600;

/**
 * Hydration specimen: a card that is fully painted from the first frame and answers
 * nothing until the pass lands. The same press is made twice, once on either side of
 * it, and the two outcomes are the demonstration. There is no simulation switch: the
 * script arriving is a condition no input could perform, so the demo's own clock
 * lands it (SPEC §8).
 *
 * The subject is the like button, not the card. The card is what the server sent and
 * it is readable throughout; the button is the one element that goes from painted to
 * answering, which is what the term names. It carries `data-pose` so identify can only
 * ever ring it in the window the term is about: a hydrated button is just a button.
 *
 * Before the pass the button has no behaviour handler at all. The one listener on it
 * is the specimen's own log, which records that a press was made, since that is the
 * only observable thing a reader gets out of pressing a picture of a control.
 *
 * A note beside the button used to read "Painted by the server, listener or not", which is
 * the site explaining the card from inside it, and is gone. The status line below it kept the
 * same habit for longer: it read "Not interactive yet" and, on a press, "Pressed. No listener
 * yet, so nothing happened.", which is the article's sentence set in a status bar's type. The
 * line is an instrument the specimen really draws, so it stayed and its wording did not: it
 * names the script's state and the last press, and nothing else.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field notes</span>
          <span class="sp-label">server-rendered</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center">
          <div class="sp-surface" style="width: 100%; padding: 12px 14px">
            <div class="sp-row sp-context">
              <span class="sp-avatar">AM</span>
              <span class="sp-grow">
                <span class="sp-text sp-text--ink" style="font-weight: 600">Ada M.</span>
                <p class="sp-text" style="margin: 2px 0 0">Pushed the new colour ramp</p>
              </span>
            </div>
            <div class="sp-row" style="margin-top: 12px">
              <button
                class="sp-button sp-button--ghost sp-button--sm sp-row"
                data-part="like"
                data-subject
                data-phase="inert"
                data-pose="[data-phase=inert]"
                aria-pressed="false"
              >${icon('heart')} <span data-part="count" data-count="18">18</span></button>
            </div>
          </div>
        </div>
        <div
          class="sp-context"
          style="flex: 0 0 auto; display: flex; flex-direction: column; gap: 3px; padding: 8px 12px; border-top: 1px solid var(--sp-line)"
        >
          <span class="sp-row" style="gap: 7px">
            <span class="sp-pending" data-part="dot" style="width: 8px; height: 8px; border-radius: 50%; background: var(--sp-muted)"></span>
            <span class="sp-text sp-text--ink" data-part="phase" data-phase="inert">Script not loaded</span>
          </span>
          <span class="sp-text" data-part="readout" data-state="idle">Last press: none</span>
        </div>
      </div>
    </div>
  `;

  const like = part(root, 'like');
  const count = part(root, 'count');
  const phase = part(root, 'phase');
  const dot = part(root, 'dot');
  const readout = part(root, 'readout');
  let hydrated = false;
  let value = 18;

  const log = (state: string, text: string) => {
    readout.dataset.state = state;
    readout.textContent = text;
  };

  // Instrumentation, not the card's behaviour: a press before the pass reaches
  // nothing, and this line is the specimen saying so out loud.
  like.addEventListener('click', () => {
    if (!hydrated) log('dead', 'Last press: ignored, no handler');
  });

  const likeHandler = () => {
    value += 1;
    count.textContent = String(value);
    count.dataset.count = String(value);
    like.setAttribute('aria-pressed', 'true');
    flag(like, 'data-selected', true);
    log('applied', `Last press: liked, count ${value}`);
  };

  clock.setTimeout(() => {
    // The pass: behaviour is attached to markup that was already on screen.
    hydrated = true;
    like.addEventListener('click', likeHandler);
    like.dataset.phase = 'live';
    phase.dataset.phase = 'live';
    phase.textContent = 'Script loaded';
    dot.className = '';
    dot.style.background = 'var(--sp-accent)';
  }, HYDRATE_MS);
}
