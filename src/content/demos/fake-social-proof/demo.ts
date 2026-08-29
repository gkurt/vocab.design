import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

type Mode = 'fabricated' | 'genuine';

/** The whole population of buyers this page has: four, on a loop. */
const NAMES = ['Amira in Leeds', 'Tom in Bristol', 'Sana in Derby', 'Ray in Hull'] as const;

/** The cycle: how long before the first message, how long each one stays, and the gap after. */
const FIRST = 350;
const ON = 2200;
const OFF = 700;

const PROOF = {
  fabricated: { rating: '4.8', count: '1,284 reviews' },
  genuine: { rating: '4.2', count: '2 reviews' },
} as const;

const VERDICT = {
  fabricated: 'Twelve hundred reviews claimed, two on file, and the buyers are four names on a timer.',
  genuine: 'The count is the number of reviews that exist, and no strangers are announced.',
} as const;

const REVIEWS = [
  ['JM', 'J. Mercer', 'Comfortable on the road, noisy on gravel.'],
  ['PD', 'P. Doyle', 'Sizing runs small. Ordered a half size up.'],
] as const;

const reviews = REVIEWS.map(
  ([initials, name, body]) => `
    <div class="sp-row" style="gap: 8px; align-items: flex-start">
      <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">${initials}</span>
      <span class="sp-stack" style="gap: 2px">
        <span class="sp-text sp-text--ink" style="font-size: 11px; font-weight: 500">${name}</span>
        <span class="sp-text" style="font-size: 11px">${body}</span>
      </span>
    </div>`,
).join('');

const stars = Array.from({ length: 5 }, () => icon('star', 'sp-icon--filled')).join('');

/**
 * Fake social proof specimen: a product page whose approval is manufactured twice over. The
 * review count claims twelve hundred while the page holds two, and the activity message
 * cycles four hardcoded names on a timer, so watching it long enough shows Amira in Leeds
 * buying the same shoe twice.
 *
 * The subject is the invented review count, the narrowest element carrying the fabrication
 * and the one on stage in every resting state of the deceptive mode. The toast is the same
 * lie told in the other dialect and stays scenery, because a subject that exists only between
 * two timers would be a subject identify has to wait for. The honest condition is declared in
 * `data-pose` (SPEC §6): the genuine state prints the count that matches the reviews, and
 * ringing that would be pointing at the opposite of the term, so the specimen mounts
 * fabricated and the caption says which state is which.
 *
 * Every timer comes from the DemoClock, so identify can freeze the cycle mid-message instead
 * of having it dismissed under inspection (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Cascade Trail Runner</span>
          <span class="sp-text">129.00</span>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" style="display: flex; flex-direction: column; gap: 8px; padding: 10px">
            <div class="sp-row" style="gap: 8px">
              <span class="sp-row" data-part="stars" style="gap: 1px; color: var(--sp-muted)">${stars}</span>
              <span class="sp-text sp-text--ink" data-part="rating" style="font-size: 12px; font-weight: 600">${PROOF.fabricated.rating}</span>
              <span
                class="sp-text"
                data-part="review-count"
                data-subject
                data-mode="fabricated"
                data-pose="[data-mode=fabricated]"
                style="font-size: 12px"
              >${PROOF.fabricated.count}</span>
            </div>
            <div class="sp-divider"></div>
            ${reviews}
          </div>
        </div>
        <div
          class="sp-context"
          data-part="activity"
          style="position: absolute; left: 12px; bottom: 12px; display: flex; align-items: center; gap: 8px;
                 padding: 7px 10px; background: var(--sp-surface); border: 1px solid var(--sp-line);
                 border-radius: var(--sp-radius); box-shadow: var(--sp-shadow); font-size: 11px;
                 opacity: 0; visibility: hidden; transition: opacity 0.24s var(--sp-ease), visibility 0.24s"
        >
          <span class="sp-avatar" data-part="activity-mark" style="width: 20px; height: 20px; font-size: 9px">A</span>
          <span data-part="activity-text">Amira in Leeds just bought this</span>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="font-size: 11px; width: 292px">${VERDICT.fabricated}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="fabricated" data-axis="Fake social proof" data-term="fabricated">
          <button class="sp-segment" data-part="mode-fabricated" value="fabricated">With</button>
          <button class="sp-segment" data-part="mode-genuine" value="genuine">Without</button>
        </sp-segmented>
      
    </div>
  `;

  const count = part(root, 'review-count');
  const rating = part(root, 'rating');
  const activity = part(root, 'activity');
  const activityText = part(root, 'activity-text');
  const activityMark = part(root, 'activity-mark');
  const verdict = part(root, 'verdict');

  let mode: Mode = 'fabricated';
  let next = 0;
  let timer: number | undefined;

  const paint = (open: boolean) => {
    activity.style.opacity = open ? '1' : '0';
    activity.style.visibility = open ? 'visible' : 'hidden';
  };

  // One loop, four names, in order and forever: watch it long enough and the same buyer
  // buys the same shoe again.
  const step = (open: boolean) => {
    if (open) {
      const name = NAMES[next % NAMES.length] ?? NAMES[0];
      next += 1;
      activityText.textContent = `${name} just bought this`;
      activityMark.textContent = name.slice(0, 1);
    }
    paint(open);
    timer = clock.setTimeout(() => step(!open), open ? ON : OFF);
  };

  part(root, 'mode').addEventListener('change', (event) => {
    mode = (event as CustomEvent<string>).detail === 'genuine' ? 'genuine' : 'fabricated';
    count.dataset.mode = mode;
    count.textContent = PROOF[mode].count;
    rating.textContent = PROOF[mode].rating;
    verdict.textContent = VERDICT[mode];
    clock.clearTimeout(timer);
    timer = undefined;
    if (mode === 'genuine') {
      // Nothing to announce: the honest page has no buyers to invent.
      paint(false);
      return;
    }
    timer = clock.setTimeout(() => step(true), FIRST);
  });

  timer = clock.setTimeout(() => step(true), FIRST);
}
