import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The advert's height, which is exactly how far the unreserved article moves. */
const SLOT = 32;
/** How long the advert takes to arrive after a reload. */
const ARRIVE_MS = 900;

/**
 * Layout shift specimen: the same article twice, loading the same late advert. The left
 * article has reserved nothing, so the arrival shoves the paragraph and the pay control down
 * by the advert's own height; the right article reserved the box up front, so the arrival
 * fills a slot that was already there and nothing moves.
 *
 * The subject is the unreserved article, which is the narrowest element the term names: the
 * reloading control, the labels and the reserved twin are the scene it is read
 * against and carry the context register (SPEC §5). The twin is a separate article rather
 * than a state of the subject, so the subject never stops being the term and needs no
 * `data-pose` (SPEC §6).
 *
 * A caption under the pair used to narrate the state ("Neither advert has arrived yet. Only
 * the article on the right has set room aside for one."), which is the article's job and not
 * the page's, so it is gone and the frame is shorter by the room it held. The two column
 * labels stay, because with nothing naming them the pair is two identical articles: they now
 * name the treatment only, "no slot reserved" against "slot reserved".
 *
 * Both articles keep a fixed box, so the shift the specimen is about is contained inside the
 * article that suffers it and nothing outside either panel can move (SPEC §5). The advert's
 * arrival is instant, because that is what a layout shift looks like; the only thing on the
 * clock is the wait before it, so a pose can stop it (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const lines = (a: string, b: string) => `
    <div class="sp-stack" style="gap: 5px">
      <div class="sp-line" style="width: ${a}"></div>
      <div class="sp-line" style="width: ${b}"></div>
    </div>`;

  const article = (side: 'article' | 'steady', mark: string) => `
    <div
      class="sp-surface"
      data-part="${side}"
      data-state="waiting"
      ${mark}
      style="display: flex; flex-direction: column; gap: 6px; width: 205px; height: 162px; padding: 8px; overflow: hidden"
    >
      <span class="sp-heading" style="font-size: 13px">Harbour dues</span>
      ${lines('94%', '78%')}
      <div
        data-part="slot-${side}"
        style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; overflow: hidden; border-radius: 5px"
      >
        <span class="sp-label" data-part="slot-label-${side}" style="white-space: nowrap"></span>
      </div>
      ${lines('88%', '66%')}
      <span
        class="sp-button sp-button--sm"
        data-part="pay-${side}"
        style="align-self: flex-start; cursor: default"
      >Pay now</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Late advert</span>
          <button class="sp-button sp-button--sm sp-button--ghost" type="button" data-part="reload">Reload</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 16px 8px">
          <div class="sp-row" style="align-items: flex-start; gap: 26px">
            <div class="sp-stack" style="gap: 6px; align-items: flex-start">
              <div class="sp-row sp-context" style="height: 26px; gap: 8px">
                <span class="sp-label" style="color: var(--sp-ink)">no slot reserved</span>
                <span class="sp-chip" data-part="badge" hidden>${icon('alert')} moved ${SLOT}px</span>
              </div>
              ${article('article', 'data-subject')}
            </div>
            <div class="sp-stack sp-context" style="gap: 6px; align-items: flex-start">
              <div class="sp-row" style="height: 26px">
                <span class="sp-label">slot reserved</span>
              </div>
              ${article('steady', '')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const shifting = part(root, 'article');
  const steady = part(root, 'steady');
  const slotShifting = part(root, 'slot-article');
  const slotSteady = part(root, 'slot-steady');
  const labelShifting = part(root, 'slot-label-article');
  const labelSteady = part(root, 'slot-label-steady');
  const badge = part(root, 'badge');

  const apply = (state: 'waiting' | 'arrived') => {
    const arrived = state === 'arrived';
    shifting.dataset.state = state;
    steady.dataset.state = state;

    // The unreserved slot has no height at all until the advert exists, which is the
    // whole mistake: the room appears only once something is in it.
    slotShifting.style.height = arrived ? `${SLOT}px` : '0';
    slotShifting.style.background = arrived ? 'var(--sp-accent-soft)' : 'transparent';
    labelShifting.textContent = arrived ? 'advert' : '';

    // The reserved slot is the same box in both states, so filling it moves nothing.
    slotSteady.style.height = `${SLOT}px`;
    slotSteady.style.background = arrived ? 'var(--sp-accent-soft)' : 'transparent';
    slotSteady.style.boxShadow = arrived ? 'none' : 'inset 0 0 0 1px var(--sp-line)';
    labelSteady.textContent = arrived ? 'advert' : 'reserved';

    flag(badge, 'hidden', !arrived);
  };

  let timer: number | undefined;
  // Reload names the state it lands on (the page before the advert), and the arrival that
  // follows is the demonstration, so a pass joined halfway still starts from the same
  // place (SPEC §8).
  part(root, 'reload').addEventListener('click', () => {
    clock.clearTimeout(timer);
    apply('waiting');
    timer = clock.setTimeout(() => apply('arrived'), ARRIVE_MS);
  });

  apply('waiting');
}
