import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';

/** How far the contact mark grows, and how long it takes to fade out. */
const FLASH_PX = 84;
const FLASH_MS = 420;

const QUIET = [
  ['14:20', 'Kalkan', 'Full'],
  ['15:05', 'Kalkan', '6 seats'],
];

/**
 * Tap specimen: a phone screen where one finger down and up on a departure card
 * chooses it, leaving a contact mark where the finger landed. The screen carries
 * the touch persona (`data-touch`), because a tap is a finger's gesture and
 * nothing else: every step aimed at it performs as touch, the events carry
 * `pointerType: 'touch'`, no hover is dispatched, and the kit hides the native
 * cursor there, so a reader's own pointer is drawn as the same fingertip disc the
 * script presses with. The subject is the card the gesture lands on, since a tap
 * is what the reader does to a target and the target is the only part of the
 * scene the term names.
 *
 * The mark is drawn at the contact point rather than centred, because where the
 * finger touched is the one thing a tap knows that a click on a keyboard does not.
 * It is an `element.animate` move, so it asks `prefersReducedMotion` itself and is
 * simply not drawn when the reader has asked for less movement (SPEC §5). The
 * detail it opens sits in a slot reserved from the start, so choosing never moves
 * the cards above it, and dismissal is an explicit control rather than a second
 * tap on the card (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const quiet = QUIET.map(
    ([time, place, seats]) => `
      <li class="sp-list-item sp-context" style="padding: 8px 10px">
        <span class="sp-text sp-text--ink" style="width: 46px">${time}</span>
        <span class="sp-grow sp-text">${place}</span>
        <span class="sp-label">${seats}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 212px; height: 296px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Ferries</span>
          <span class="sp-label" data-part="readout">Nothing chosen</span>
        </div>
        <div class="sp-body" data-touch style="display: flex; flex-direction: column; gap: 10px">
          <div
            class="sp-surface"
            data-part="card"
            data-subject
            role="button"
            tabindex="0"
            aria-pressed="false"
            style="position: relative; overflow: hidden; padding: 10px 12px; user-select: none"
          >
            <div class="sp-row sp-row--between">
              <span class="sp-heading">13:40</span>
              <span class="sp-label">2 seats</span>
            </div>
            <div class="sp-text" style="margin-top: 2px">Kalkan, 35 min</div>
          </div>
          <ul class="sp-list sp-surface sp-context" style="overflow: hidden">${quiet}</ul>
          <div class="sp-grow"></div>
          <div style="position: relative; flex: 0 0 auto; height: 62px">
            <div
              class="sp-surface sp-context"
              data-part="detail-empty"
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--sp-muted)"
            >
              Tap a departure
            </div>
            <div
              class="sp-surface"
              data-part="detail"
              hidden
              style="position: absolute; inset: 0; display: flex; align-items: center; gap: 8px; padding: 0 10px"
            >
              <span class="sp-grow sp-text sp-text--ink">13:40 held</span>
              <button class="sp-button sp-button--ghost sp-button--sm sp-context" type="button" data-part="release">Release</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const card = part(root, 'card');
  const detail = part(root, 'detail');
  const empty = part(root, 'detail-empty');
  const readout = part(root, 'readout');

  card.addEventListener('pointerdown', (event) => {
    flag(card, 'data-pressed', true);
    if (prefersReducedMotion(root)) return;
    const rect = card.getBoundingClientRect();
    const mark = document.createElement('span');
    mark.style.cssText = [
      'position: absolute',
      `left: ${event.clientX - rect.left - FLASH_PX / 2}px`,
      `top: ${event.clientY - rect.top - FLASH_PX / 2}px`,
      `width: ${FLASH_PX}px`,
      `height: ${FLASH_PX}px`,
      'border-radius: 50%',
      'background: var(--sp-accent)',
      'pointer-events: none',
    ].join('; ');
    card.appendChild(mark);
    const flash = mark.animate(
      [
        { transform: 'scale(0.2)', opacity: 0.34 },
        { transform: 'scale(1)', opacity: 0 },
      ],
      { duration: FLASH_MS, easing: 'ease-out' },
    );
    flash.onfinish = () => mark.remove();
  });

  const lift = () => flag(card, 'data-pressed', false);
  card.addEventListener('pointerup', lift);
  card.addEventListener('pointercancel', lift);
  card.addEventListener('pointerleave', lift);

  // Press and lift on the same spot is the whole gesture, and `click` is the event
  // that reports it: it fires for a finger, for a mouse, and for Enter on the
  // focused control alike.
  card.addEventListener('click', () => {
    card.setAttribute('aria-pressed', 'true');
    flag(card, 'data-chosen', true);
    card.style.background = 'var(--sp-accent-soft)';
    card.style.borderColor = 'var(--sp-accent)';
    detail.hidden = false;
    empty.hidden = true;
    readout.textContent = '13:40 chosen';
  });

  part(root, 'release').addEventListener('click', () => {
    card.setAttribute('aria-pressed', 'false');
    flag(card, 'data-chosen', false);
    card.style.background = '';
    card.style.borderColor = '';
    detail.hidden = true;
    empty.hidden = false;
    readout.textContent = 'Nothing chosen';
  });
}
