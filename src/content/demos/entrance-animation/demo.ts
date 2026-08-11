import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const ENTER_MS = 300;
/** Decelerating, because an arrival that settles is what reads as having landed. */
const ENTER = `opacity ${ENTER_MS}ms var(--sp-ease), transform ${ENTER_MS}ms var(--sp-ease), visibility ${ENTER_MS}ms`;
const OFFSCREEN = 'translateY(-14px) scale(0.97)';

/**
 * Entrance specimen: a notification card that arrives from the edge it belongs to,
 * sliding down and fading up into a slot that was already its size. The slot is a
 * fixed-height box the card is absolutely positioned inside, so the arrival cannot
 * push the legend below it around (SPEC §5).
 *
 * Only the arrival is animated. Dismiss writes `transition: none` before it hides the
 * card, so the demo never accidentally demonstrates the term next door: leaving is
 * `exit-animation`'s claim, and a specimen that fades both ways proves neither.
 *
 * Show and Dismiss are two controls rather than one trigger, so a fast-forwarded or
 * resumed pass reaches the state it named instead of flipping whatever it found
 * (SPEC §8). The transition is a CSS one, so `motion.css` gates it for a reader who
 * asked for less movement: the card still arrives, it just arrives already there.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 350px; height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Inbox</span>
          <span class="sp-label">Team</span>
        </div>
        <div class="sp-body sp-stack" style="gap: 10px">
          <div style="position: relative; height: 92px; flex: 0 0 auto">
            <article
              class="sp-surface sp-row"
              data-part="card"
              data-subject
              style="position: absolute; inset: 0; gap: 10px; padding: 12px; box-shadow: var(--sp-shadow);
                     opacity: 0; visibility: hidden; transform: ${OFFSCREEN}; transition: ${ENTER}"
            >
              <span class="sp-avatar">RK</span>
              <span class="sp-stack sp-grow" style="gap: 7px">
                <span class="sp-row sp-row--between">
                  <span class="sp-heading" style="font-size: 13px">Rana Kaur</span>
                  <span class="sp-label">now</span>
                </span>
                <span class="sp-line" style="width: 92%"></span>
                <span class="sp-line" style="width: 58%"></span>
              </span>
            </article>
          </div>
          <div class="sp-row sp-context" style="gap: 6px">
            <button
              class="sp-button sp-button--sm"
              type="button"
              data-part="send"
              style="display: inline-flex; align-items: center; gap: 7px"
            >${icon('bell')} New message</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="dismiss">Dismiss</button>
          </div>
          <p class="sp-text sp-context" style="margin: 0">
            Down from the edge it lives on, and its space was reserved before it arrived.
          </p>
        </div>
      </div>
    </div>
  `;

  const card = part(root, 'card');

  const show = (on: boolean) => {
    card.style.transition = on ? ENTER : 'none';
    card.style.opacity = on ? '1' : '0';
    card.style.visibility = on ? 'visible' : 'hidden';
    card.style.transform = on ? 'none' : OFFSCREEN;
    card.setAttribute('aria-hidden', String(!on));
  };

  part(root, 'send').addEventListener('click', () => show(true));
  part(root, 'dismiss').addEventListener('click', () => show(false));
}
