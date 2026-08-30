import { localBox } from '#src/kit/measure.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const PLAY_MS = 700;
const SLOT_H = 78;

/**
 * FLIP specimen: one card and two slots of different sizes. Clicking a slot moves the
 * card into it for real, in one layout pass, and the four lines below name what the
 * demo did in the four words the acronym is made of: the rect it measured First, the
 * rect it measured Last, the transform that Inverts the difference, and the run that
 * Plays it away.
 *
 * The subject is the moving card. The slots and the readout are scenery: the term
 * names the technique the card is moved by, and the numbers are there so the technique
 * is legible when nothing is moving.
 *
 * The window had a header reading "Click a slot" beside "the layout moves once": an
 * instruction to the reader and a claim about the technique, neither of which belongs in
 * the frame. Both are gone, and the four measured lines say what happened instead.
 *
 * Both reads happen before either write, which is the rule the technique lives by, and
 * the card carries no transition of its own, so the inverting transform lands in the
 * same tick it is written (the measurement gotcha). `element.animate` is out of reach
 * of `motion.css`, so the demo asks `prefersReducedMotion` itself and lets the card
 * simply be in its new slot (SPEC §5). `data-phase` is timed on the stage's clock, so a
 * pose cannot let the run finish underneath a reader inspecting it (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const slot = (id: string, label: string, width: number) => `
    <div class="sp-stack sp-context" style="gap: 6px; flex: 0 0 auto">
      <span class="sp-label" style="font-size: 11px">Slot ${label}</span>
      <div
        data-part="slot-${id}"
        style="width: ${width}px; height: ${SLOT_H}px; border: 1px dashed var(--sp-line); border-radius: 10px;
               background: var(--sp-sunken); cursor: pointer"
      ></div>
    </div>`;

  const line = (id: string, label: string) => `
    <div class="sp-row" style="gap: 8px">
      <span class="sp-label" style="width: 46px; flex: 0 0 auto">${label}</span>
      <span class="sp-text" style="font-size: 12px; white-space: nowrap" data-part="value-${id}">not measured yet</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 402px">
        <div class="sp-row" style="align-items: flex-end; gap: 20px">
          ${slot('a', 'A', 128)}
          ${slot('b', 'B', 190)}
        </div>
        <div class="sp-stack sp-context" data-part="readout" data-phase="idle" style="gap: 3px; margin-top: 14px; min-height: 76px">
          ${line('first', 'First')}
          ${line('last', 'Last')}
          ${line('invert', 'Invert')}
          ${line('play', 'Play')}
        </div>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');
  const slots = { a: part(root, 'slot-a'), b: part(root, 'slot-b') };

  const card = document.createElement('div');
  card.setAttribute('data-part', 'card');
  card.setAttribute('data-subject', '');
  card.textContent = 'Card';
  card.style.cssText = `width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
    border-radius: 10px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 13px; font-weight: 600;
    transform-origin: top left`;
  slots.a.append(card);

  const say = (id: string, text: string) => {
    part(root, `value-${id}`).textContent = text;
  };

  let settling: number | undefined;

  const moveTo = (target: HTMLElement) => {
    if (card.parentElement === target) return;
    clock.clearTimeout(settling);
    for (const animation of card.getAnimations()) animation.cancel();
    card.style.transform = 'none';

    // First: where it is, read before anything is written, and in the specimen's own
    // pixels, because the difference is about to be written back as a transform (SPEC §5).
    const first = localBox(card, root);
    target.append(card);
    // Last: where the real layout put it. One pass, and every read is done with.
    const last = localBox(card, root);

    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const sx = first.width / last.width;
    const sy = first.height / last.height;
    const invert = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;

    say('first', `${Math.round(first.width)} x ${Math.round(first.height)} at x ${Math.round(first.left)}`);
    say('last', `${Math.round(last.width)} x ${Math.round(last.height)} at x ${Math.round(last.left)}`);
    say('invert', invert);

    if (prefersReducedMotion(root)) {
      say('play', 'skipped, reduced motion');
      readout.dataset.phase = 'done';
      return;
    }

    say('play', `${PLAY_MS} ms of transform, no layout`);
    readout.dataset.phase = 'playing';
    card.animate([{ transform: invert }, { transform: 'none' }], {
      duration: PLAY_MS,
      easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)',
    });
    settling = clock.setTimeout(() => {
      readout.dataset.phase = 'done';
    }, PLAY_MS + 60);
  };

  slots.a.addEventListener('click', () => moveTo(slots.a));
  slots.b.addEventListener('click', () => moveTo(slots.b));
}
