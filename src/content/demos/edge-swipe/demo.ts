import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

/** The screen, the band the system has booked along its left side, and the commit point. */
const SCREEN = { w: 200, h: 210 };
const ZONE = 18;
const TOP_ZONE = 16;
const COMMIT = 70;

const HATCH = 'repeating-linear-gradient(45deg, var(--sp-line) 0 4px, transparent 4px 9px)';

const dot = (name: string, x: number, y: number) => `
  <span
    data-part="${name}"
    style="position: absolute; left: ${x - 4}px; top: ${y - 4}px; width: 8px; height: 8px; border-radius: 50%; background: var(--sp-ink); opacity: 0.6"
  ></span>`;

const row = (text: string) => `<div class="sp-row" style="gap: 6px"><span class="sp-label">${text}</span></div>`;

/**
 * Edge swipe specimen: a phone whose left band is drawn as the strip the system has booked,
 * where a stroke that starts inside it peels the current screen back and one that starts
 * further in does nothing at all.
 *
 * The subject is that band. The gesture this term names is told apart from an ordinary
 * swipe by where it begins and by nothing else, so the narrowest element that is the term
 * is the region the first contact has to land in; the peeling screen is what answers the
 * gesture rather than what the word means. The device, the readout, the legend and the
 * reopen control are the scene around it and carry the context register.
 *
 * The screen carries the touch persona (`data-touch`), because the gesture is a finger's:
 * every step aimed inside the device performs as touch, the strokes carry
 * `pointerType: 'touch'`, no hover is dispatched or mirrored there, and the kit hides the
 * native cursor, which is why neither the band nor the screen states one. The reopen
 * control sits outside the device with the rest of the legend, so it stays a control a
 * pointer clicks rather than a part of the screen.
 *
 * The origin test is real and is made the way a system makes it, on the coordinate the
 * press landed at rather than on which node it hit, so the three fixed dots are the three
 * strokes worth seeing: one starting inside the screen, one starting at the edge and
 * released short of the commit point, one starting at the edge and carried past it.
 * Release animates by transition, and the drag itself runs with none, so the screen tracks
 * the pointer instead of lagging it.
 *
 * The screen moves by a transform inside a clipped device and the readouts hold their
 * widths, so a peel moves nothing but the screen (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 296px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Reader</span>
          <span class="sp-text" data-part="readout" style="width: 244px; text-align: right; white-space: nowrap">Pull in from the left edge</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; gap: 14px">
          <div
            class="sp-context"
            data-part="phone"
            data-history="article"
            data-outcome="none"
            style="flex: 0 0 auto; padding: 8px; background: var(--sp-ink); border-radius: 26px"
          >
            <div
              data-touch
              style="position: relative; width: ${SCREEN.w}px; height: ${SCREEN.h}px; background: var(--sp-sunken); border-radius: 19px; overflow: hidden; touch-action: none; user-select: none"
            >
              <div style="position: absolute; inset: 0; padding: ${TOP_ZONE + 8}px 12px 12px ${ZONE + 8}px">
                <span class="sp-heading" style="font-size: 13px">Inbox</span>
                <div class="sp-stack" style="margin-top: 10px; gap: 8px">
                  <div class="sp-line" style="width: 84%"></div>
                  <div class="sp-line" style="width: 66%"></div>
                  <div class="sp-line" style="width: 74%"></div>
                </div>
              </div>

              <div
                data-part="screen"
                style="position: absolute; inset: 0; padding: ${TOP_ZONE + 8}px 12px 12px ${ZONE + 8}px; background: var(--sp-surface); box-shadow: -8px 0 16px rgb(16 24 40 / 0.22); transform: translateX(0px)"
              >
                <div class="sp-row" style="gap: 4px; color: var(--sp-muted)">
                  ${icon('chevronLeft')}
                  <span class="sp-text sp-text--ink" style="font-size: 13px">Ferry timetable</span>
                </div>
                <div class="sp-stack" style="margin-top: 10px; gap: 8px">
                  <div class="sp-line" style="width: 92%"></div>
                  <div class="sp-line" style="width: 78%"></div>
                  <div class="sp-line" style="width: 88%"></div>
                  <div class="sp-line" style="width: 54%"></div>
                </div>
              </div>

              <span
                data-part="threshold"
                style="position: absolute; left: ${COMMIT}px; top: ${TOP_ZONE}px; bottom: 0; width: 0; border-left: 1px dashed var(--sp-muted); z-index: 3; pointer-events: none"
              ><span class="sp-label" style="position: absolute; left: 3px; bottom: 2px; font-size: 10px; white-space: nowrap">${COMMIT} px</span></span>

              <span
                data-part="top-zone"
                style="position: absolute; left: 0; right: 0; top: 0; height: ${TOP_ZONE}px; z-index: 4; background: ${HATCH}; pointer-events: none"
              ><span class="sp-label" style="position: absolute; right: 6px; top: -1px; font-size: 10px">shade</span></span>

              <span
                data-part="edge-zone"
                data-subject
                style="position: absolute; left: 0; top: 0; bottom: 0; width: ${ZONE}px; z-index: 5; display: flex; align-items: center; justify-content: center; background: ${HATCH}; border-right: 1px dashed var(--sp-muted)"
              >
                <span class="sp-label" style="writing-mode: vertical-rl; font-size: 10px; letter-spacing: 0.4px">back</span>
                ${dot('edge-dot', ZONE / 2, SCREEN.h / 2 + 20)}
              </span>

              <span class="sp-context" style="position: absolute; inset: 0; z-index: 6; pointer-events: none">
                ${dot('short-dot', 48, SCREEN.h / 2 + 20)}
                ${dot('far-dot', 168, SCREEN.h / 2 + 20)}
                ${dot('inside-dot', 96, 62)}
                ${dot('inside-end', 176, 62)}
              </span>
            </div>
          </div>

          <div class="sp-stack sp-context" style="width: 178px; gap: 6px">
            <span class="sp-label sp-text--ink">The system booked two edges</span>
            ${row(`left ${ZONE} px: back`)}
            ${row(`top ${TOP_ZONE} px: the shade`)}
            <div class="sp-divider"></div>
            <span class="sp-label" data-part="travel" style="font-variant-numeric: tabular-nums">0 px in, ${COMMIT} px commits</span>
            <span class="sp-label">A stroke starting further in belongs to the page.</span>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reopen" style="margin-top: 2px">Reopen the article</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const phone = part(root, 'phone');
  const screen = part(root, 'screen');
  const readout = part(root, 'readout');
  const travel = part(root, 'travel');
  const zone = part(root, 'edge-zone');

  let origin: number | undefined;
  let carried = 0;

  const say = (outcome: string, text: string) => {
    phone.dataset.outcome = outcome;
    readout.textContent = text;
  };

  const place = (dx: number, animated: boolean) => {
    carried = Math.max(0, Math.min(SCREEN.w, dx));
    screen.style.transition = animated ? 'transform 0.28s var(--sp-ease)' : 'none';
    screen.style.transform = `translateX(${carried}px)`;
    travel.textContent = `${Math.round(carried)} px in, ${COMMIT} px commits`;
  };

  const show = (history: string) => {
    phone.dataset.history = history;
    place(history === 'article' ? 0 : SCREEN.w, true);
  };

  root.addEventListener('pointerdown', (event) => {
    if (!phone.contains(event.target as Node)) return;
    // The origin test the system itself makes: where the contact landed, not what it hit.
    const from = event.clientX - zone.getBoundingClientRect().left;
    if (from > ZONE) {
      origin = undefined;
      return say('inside', `Started ${Math.round(from)} px in: the page keeps it`);
    }
    if (phone.dataset.history !== 'article') return say('none', 'Nothing left to go back to');
    // Capture keeps the peel tracking, and the release landing here, once the swipe has left the
    // phone. A synthetic pointer has none to capture and the call would throw, so only a real
    // one asks.
    if (event.isTrusted) phone.setPointerCapture(event.pointerId);
    origin = event.clientX;
    say('peeling', 'Peeling the screen back');
  });

  root.addEventListener('pointermove', (event) => {
    if (origin === undefined) return;
    place(event.clientX - origin, false);
    say('peeling', `Peeled ${Math.round(carried)} px of ${COMMIT}`);
  });

  const release = () => {
    if (origin === undefined) return;
    origin = undefined;
    const travelled = Math.round(carried);
    // Past the commit point the screen leaves; short of it, it falls back where it was.
    if (travelled >= COMMIT) {
      show('inbox');
      return say('committed', `Past ${COMMIT} px: went back to Inbox`);
    }
    place(0, true);
    say('cancelled', `Let go at ${travelled} px: snapped back`);
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  part(root, 'reopen').addEventListener('click', () => {
    show('article');
    say('none', 'Article pushed back on top');
  });
}
