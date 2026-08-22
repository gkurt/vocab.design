import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long one card holds before the run moves on by itself. */
const DWELL_MS = 2600;

const CARDS = [
  { wash: 'linear-gradient(160deg, #24406e, #7d5aa6 55%, #d98f6a)', caption: 'Left the quay at six' },
  { wash: 'linear-gradient(160deg, #17544a, #46937c 52%, #cfd489)', caption: 'Channel was flat all morning' },
  { wash: 'linear-gradient(160deg, #6b2f3f, #c26a5c 55%, #f0c184)', caption: 'Fog came in past the light' },
  { wash: 'linear-gradient(160deg, #1d2340, #4a5a94 55%, #a8b6dc)', caption: 'Back before the tide turned' },
] as const;

const bar = (n: number) => `
  <span data-part="bar-${n}" style="flex: 1 1 0; height: 3px; border-radius: 999px; background: rgb(255 255 255 / 0.32); overflow: hidden">
    <span data-part="fill-${n}" style="display: block; width: 0; height: 100%; border-radius: inherit; background: #ffffff"></span>
  </span>`;

/**
 * Stories specimen: four cards, one author, a bar per card across the top. The
 * subject is the viewer with its bars, because the term is the whole grammar and
 * not any one card in it: a card on its own is a picture, and what makes it a story
 * is the run it belongs to and the meter that says where in the run you are.
 *
 * The viewer is a touch surface (`data-touch`), so the script taps and holds it with
 * a fingertip, which is the grammar's own two inputs: a tap on the right half is the
 * next card, and a finger held anywhere on the card stops the run where it is and
 * lets go of it on release. Holding to pause is the term rather than a state to pick,
 * so the toggling here is the thing being demonstrated (SPEC §8). A reader's own
 * press does exactly the same, and a tap is a press that ends immediately, so it
 * borrows the pause for a breath and hands it straight back.
 *
 * The run is a clock timer, so identify can hold a card open instead of watching it
 * expire (SPEC §6). The bar fills on a transition whose duration is the dwell, and
 * pausing reads where the fill got to and pins it there before restarting it with
 * the time that was left; under reduced motion the transition is gone and the bar
 * simply reads full, which is the honest still of a card that is being held.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div data-part="viewer" data-subject data-touch
           style="position: relative; width: 178px; height: 252px; border-radius: 14px; overflow: hidden; color: #ffffff; touch-action: none; background: ${CARDS[0]?.wash}">
        <div class="sp-row" data-part="bars" style="position: absolute; top: 8px; left: 8px; right: 8px; gap: 4px">
          ${CARDS.map((_, i) => bar(i + 1)).join('')}
        </div>
        <div class="sp-row" style="position: absolute; top: 20px; left: 10px; right: 10px; gap: 8px">
          <span class="sp-avatar" style="width: 24px; height: 24px; background: rgb(255 255 255 / 0.26); color: #ffffff">R</span>
          <span class="sp-grow" style="font-size: 12px; font-weight: 500">rosa.at.sea</span>
          <span style="font-size: 11px; opacity: 0.8">4h</span>
        </div>
        <span data-part="caption" style="position: absolute; left: 12px; right: 12px; bottom: 14px; font-size: 13px; line-height: 1.4">${CARDS[0]?.caption}</span>
        <button data-part="prev" type="button" aria-label="Previous card"
                style="position: absolute; top: 40px; left: 0; bottom: 0; width: 36%; border: 0; background: transparent"></button>
        <button data-part="next" type="button" aria-label="Next card"
                style="position: absolute; top: 40px; right: 0; bottom: 0; width: 64%; border: 0; background: transparent"></button>
      </div>
      <span class="sp-label sp-context" style="width: 178px; text-align: center; line-height: 1.4">
        Tap the right side for the next card. Hold the card to stop the run where it is.
      </span>
    </div>
  `;

  const viewer = part(root, 'viewer');
  const caption = part(root, 'caption');
  const bars = CARDS.map((_, i) => part(root, `bar-${i + 1}`));
  const fills = CARDS.map((_, i) => part(root, `fill-${i + 1}`));
  const last = CARDS.length - 1;

  let index = 0;
  let paused = false;
  let left = DWELL_MS;
  let since = 0;
  let timer: number | undefined;

  function start(ms: number): void {
    left = ms;
    since = performance.now();
    clock.clearTimeout(timer);
    if (index < last) timer = clock.setTimeout(() => show(index + 1), ms);
    const fill = fills[index];
    if (!fill) return;
    // A tick later, so the width the transition starts from is the one on screen.
    clock.setTimeout(() => {
      fill.style.transition = `width ${ms}ms linear`;
      fill.style.width = '100%';
    }, 0);
  }

  function hold(): void {
    clock.clearTimeout(timer);
    timer = undefined;
    left = Math.max(0, left - (performance.now() - since));
    const fill = fills[index];
    if (!fill) return;
    // Read where the fill got to, then pin it: a read of a running transition,
    // never a read of a width this line has just written (SPEC §5 gotcha).
    const at = getComputedStyle(fill).width;
    fill.style.transition = 'none';
    fill.style.width = at;
  }

  function show(next: number): void {
    index = next;
    const card = CARDS[next];
    if (card) {
      viewer.style.background = card.wash;
      caption.textContent = card.caption;
    }
    bars.forEach((track, i) => {
      flag(track, 'data-current', i === next);
      flag(track, 'data-seen', i < next);
      const fill = fills[i];
      if (!fill) return;
      fill.style.transition = 'none';
      fill.style.width = i < next ? '100%' : '0';
    });
    clock.clearTimeout(timer);
    timer = undefined;
    left = DWELL_MS;
    if (!paused) start(DWELL_MS);
  }

  part(root, 'next').addEventListener('click', () => {
    if (index < last) show(index + 1);
  });
  part(root, 'prev').addEventListener('click', () => {
    if (index > 0) show(index - 1);
  });

  // Hold to pause, which is the grammar's own gesture: the script's `hold`, a finger,
  // and a reader's held mouse button all arrive as the same press. The halves that
  // advance the run sit on top of the viewer, so the press is read where it bubbles to.
  // The pointer is not captured (a press is not a drag), so a press that wanders off
  // ends at the boundary rather than leaving the run stopped for good.
  const setPaused = (next: boolean) => {
    if (next === paused) return;
    paused = next;
    flag(viewer, 'data-paused', next);
    if (next) hold();
    else start(left);
  };
  viewer.addEventListener('pointerdown', () => setPaused(true));
  for (const type of ['pointerup', 'pointercancel', 'pointerleave'] as const) {
    viewer.addEventListener(type, () => setPaused(false));
  }

  show(0);
}
