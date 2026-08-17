import type { IconName } from '#src/kit/icons.ts';
import { icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const SLOT = { w: 124, h: 156 };
const CARD_H = 100;

/** Amplitude in pixels and the length of one leg of the bob; a full cycle is twice that. */
const AMPS: Record<string, { rise: number; leg: number; note: string }> = {
  still: { rise: 0, leg: 0, note: 'Still: nothing moves' },
  subtle: { rise: 6, leg: 1900, note: 'Subtle: 6px over 3.8s' },
  lively: { rise: 14, leg: 1250, note: 'Lively: 14px over 2.5s' },
};

/** Resting heights and phase offsets, both different per card so the group drifts (see the article). */
const CARDS = [
  { part: 'card-1', top: 16, phase: 0, glyph: 'heart' as IconName, title: 'Saved', value: '128' },
  { part: 'card-2', top: 36, phase: 640, glyph: 'star' as IconName, title: 'Rating', value: '4.9' },
  { part: 'card-3', top: 26, phase: 1280, glyph: 'bell' as IconName, title: 'Alerts', value: '3' },
];

/**
 * Float animation specimen: three cards of a hero composition, resting at three different heights
 * and bobbing slowly on their own timings. Each card is absolutely placed inside a slot that
 * already holds the room the bob needs, and the bob is a `translateY` only, so a floating card can
 * never move the cards beside it or the caption below (SPEC §5). Every card runs a different leg
 * length and starts at a different point in its own cycle, which is what makes the row read as
 * drifting rather than pulsing in unison.
 *
 * The subject is the middle card, the narrowest thing the term names: a float is a property of one
 * element, not of the row. The two cards either side are the composition and stay in the context
 * register, and the amplitude picker, heading and caption are instrumentation.
 *
 * `motion.css` cannot reach an `element.animate` keyframe set, so the demo asks
 * `prefersReducedMotion` itself and simply never starts the bob for a reader who asked for less
 * movement: the composition rests flat, which is the whole accessible answer for idle motion.
 * `data-float` reports the setting rather than whether pixels are moving, so the subject is still
 * the term under that preference. Picking `Still` is the counter-example, so the subject declares
 * the honest condition in `data-pose` and identify plays on rather than ringing a card at rest.
 */
export function mount(root: HTMLElement): void {
  const card = (c: (typeof CARDS)[number], subject: boolean) => `
    <div style="position: relative; width: ${SLOT.w}px; height: ${SLOT.h}px">
      <div
        class="sp-surface${subject ? '' : ' sp-context'}"
        data-part="${c.part}"
        ${subject ? 'data-subject data-pose="[data-float=on]"' : ''}
        data-float="on"
        data-amp="subtle"
        style="position: absolute; left: 0; right: 0; top: ${c.top}px; height: ${CARD_H}px; padding: 12px;
               display: flex; flex-direction: column; gap: 8px; box-shadow: var(--sp-shadow); will-change: transform"
      >
        <span
          style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px;
                 border-radius: 50%; background: var(--sp-accent-soft); color: var(--sp-accent)"
        >${icon(c.glyph)}</span>
        <span class="sp-label" style="font-size: 11px">${c.title}</span>
        <span class="sp-heading" style="font-variant-numeric: tabular-nums">${c.value}</span>
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 258px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Hero</span>
          <sp-segmented class="sp-segmented" data-part="amp" data-value="subtle">
            <button class="sp-segment" type="button" data-part="seg-still" value="still">Still</button>
            <button class="sp-segment" type="button" data-part="seg-subtle" value="subtle">Subtle</button>
            <button class="sp-segment" type="button" data-part="seg-lively" value="lively">Lively</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px">
          <div class="sp-row" data-part="row" style="gap: 16px; align-items: flex-start">
            ${card(CARDS[0] as (typeof CARDS)[number], false)}
            ${card(CARDS[1] as (typeof CARDS)[number], true)}
            ${card(CARDS[2] as (typeof CARDS)[number], false)}
          </div>
          <span class="sp-label sp-context" data-part="note" style="font-size: 11px">Subtle: 6px over 3.8s</span>
        </div>
      </div>
    </div>
  `;

  const note = part(root, 'note');
  const reduced = prefersReducedMotion(root);
  const running = new Map<HTMLElement, Animation>();

  const apply = (key: string) => {
    const amp = AMPS[key];
    if (!amp) return;
    note.textContent = amp.note;

    for (const spec of CARDS) {
      const el = part(root, spec.part);
      el.dataset.amp = key;
      el.dataset.float = amp.rise > 0 ? 'on' : 'off';
      running.get(el)?.cancel();
      running.delete(el);
      el.style.transform = 'translateY(0px)';
      if (amp.rise === 0 || reduced) continue;

      // Alternating between the two ends means the loop returns to the frame it started on,
      // so a float can never leave the composition somewhere it was not drawn.
      const anim = el.animate([{ transform: 'translateY(0px)' }, { transform: `translateY(-${amp.rise}px)` }], {
        duration: amp.leg,
        iterations: Number.POSITIVE_INFINITY,
        direction: 'alternate',
        easing: 'ease-in-out',
      });
      // Started partway through its own cycle, which is what keeps the three cards out of step.
      anim.currentTime = spec.phase % (amp.leg * 2);
      running.set(el, anim);
    }
  };

  // Each segment names an amplitude, so the switch lands on that amplitude rather than
  // stepping to the next one (SPEC §8).
  part(root, 'amp').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('subtle');
}
