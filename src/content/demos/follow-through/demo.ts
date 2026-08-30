import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const ARENA_H = 92;
const CARD_H = 66;
/** How far off to the right the card starts, in the arena's own pixels. */
const ENTER = 300;
const BODY_MS = 520;

/**
 * The composition's parts, each with the beat it leaves on and how far it lets
 * itself be dragged behind the body while it catches up. The body is the leader:
 * zero of both, by definition.
 */
const PARTS = [
  { id: 'card', name: 'Card body', delay: 0, drag: 0 },
  { id: 'avatar', name: 'Avatar', delay: 70, drag: 22 },
  { id: 'chip', name: 'Badge', delay: 130, drag: 34 },
];

const LAST = Math.max(...PARTS.map((p) => p.delay));
/** The window the timeline is ruled against: the last part's landing, plus a beat. */
const SPAN = LAST + BODY_MS + 50;

const trailFrames = (drag: number): Keyframe[] => [
  { offset: 0, transform: `translateX(${drag}px)`, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  { offset: 0.82, transform: 'translateX(-3px)', easing: 'ease-out' },
  { offset: 1, transform: 'translateX(0)' },
];

/**
 * Follow-through specimen: a card sliding into place whose avatar and badge leave
 * a beat after the body and settle a beat after it, so the composition reads as
 * connected parts rather than as one slab. The Gantt rule underneath states the
 * offsets the eye is being asked to notice.
 *
 * The subject is the settling composition, which is the card and the parts riding
 * on it: the term names the relationship between them, and neither the arena that
 * clips the entrance nor the rule that measures it is the term. The heading, the
 * Replay control and the timeline are scenery.
 *
 * Two strings were the site talking inside the panel and both are gone: the heading
 * read "Nothing stops all at once" and now names the panel ("Notifications"), and a
 * line under the timeline read "One arrival, three departures: the badge is still
 * catching up after the body has stopped." The article says that at length, and the
 * timeline already rules the offsets it was pointing at.
 *
 * The trailing parts are extra transforms on children of a moving parent, so their
 * lag is real subtraction rather than a second path drawn by hand. They go to
 * `element.animate`, which `motion.css` cannot reach, so the demo asks
 * `prefersReducedMotion` itself and lands the whole composition at rest instead of
 * playing a drag at a reader who asked for less movement (SPEC §7). The card is
 * absolutely positioned inside a clipping arena, so an arrival from off stage moves
 * nothing in the panel (SPEC §5), and `data-running`/`data-settled` are timed on the
 * stage's clock, so a pose cannot let the run finish underneath a reader (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const rows = PARTS.map((p) => {
    const left = (p.delay / SPAN) * 100;
    const width = (BODY_MS / SPAN) * 100;
    return `
      <div class="sp-row" style="gap: 8px">
        <span class="sp-label" style="flex: 0 0 66px; font-size: 11px">${p.name}</span>
        <span style="position: relative; flex: 1 1 auto; height: 8px; border-radius: 999px; background: var(--sp-sunken)">
          <span
            style="position: absolute; top: 0; bottom: 0; left: ${left.toFixed(1)}%; width: ${width.toFixed(1)}%;
                   border-radius: 999px; background: var(--sp-accent)"
          ></span>
        </span>
        <span class="sp-label" style="flex: 0 0 48px; text-align: right; font-size: 11px">+${p.delay} ms</span>
      </div>`;
  }).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="scene" style="width: 404px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Notifications</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div
          style="position: relative; height: ${ARENA_H}px; margin-top: 10px; border-radius: 6px;
                 background: var(--sp-sunken); overflow: hidden"
        >
          <div
            class="sp-surface sp-row"
            data-part="card"
            data-subject
            style="position: absolute; left: 12px; right: 12px; top: ${(ARENA_H - CARD_H) / 2}px; height: ${CARD_H}px;
                   gap: 10px; padding: 0 12px; box-shadow: var(--sp-shadow); transform: translateX(0)"
          >
            <span class="sp-avatar" data-part="avatar">HR</span>
            <span class="sp-stack sp-grow" style="gap: 2px">
              <span class="sp-text sp-text--ink" style="font-size: 13px; font-weight: 600">Harbour report</span>
              <span class="sp-label">Tide table updated</span>
            </span>
            <span
              data-part="chip"
              style="flex: 0 0 auto; padding: 3px 9px; border-radius: 999px; background: var(--sp-accent-soft);
                     color: var(--sp-ink); font-size: 11px; font-weight: 600"
            >New</span>
          </div>
        </div>
        <div class="sp-stack sp-context" style="gap: 6px; margin-top: 12px">
          ${rows}
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const card = part(root, 'card');
  const trailers = PARTS.filter((p) => p.drag > 0);
  let settling: number | undefined;

  const settle = () => {
    scene.removeAttribute('data-running');
    scene.setAttribute('data-settled', '');
  };

  const play = () => {
    clock.clearTimeout(settling);
    scene.removeAttribute('data-settled');
    scene.setAttribute('data-running', '');
    for (const p of PARTS) {
      for (const animation of part(root, p.id).getAnimations()) animation.cancel();
    }

    if (prefersReducedMotion(root)) {
      settle();
      return;
    }

    card.animate([{ transform: `translateX(${ENTER}px)` }, { transform: 'translateX(0)' }], {
      duration: BODY_MS,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards',
    });
    for (const p of trailers) {
      part(root, p.id).animate(trailFrames(p.drag), { duration: BODY_MS, delay: p.delay, fill: 'forwards' });
    }
    settling = clock.setTimeout(settle, SPAN);
  };

  part(root, 'replay').addEventListener('click', play);
  play();
}
