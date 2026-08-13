import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** A beat of clearance before the first card moves, so a replay is not already underway
    by the time the reset has been painted. */
const LEAD = 80;
/** The ruler's full width in milliseconds: every bar is drawn against this. */
const SCALE = 1000;

/**
 * The plan itself, as data. Two summary cards lead because they are the answer the reader
 * came for, the chart follows them, and the three list cards trail. Each card starts before
 * the one ahead of it has finished, which is the overlap that keeps six arrivals reading as
 * one event instead of a queue.
 */
const CARDS = [
  { id: 'total', name: 'Total', value: '1,284', delay: 0, dur: 300 },
  { id: 'today', name: 'Today', value: '96', delay: 120, dur: 300 },
  { id: 'trend', name: 'Trend', value: '+4.2%', delay: 240, dur: 300 },
  { id: 'queue', name: 'Queue', value: '18', delay: 360, dur: 300 },
  { id: 'errors', name: 'Errors', value: '2', delay: 480, dur: 300 },
  { id: 'notes', name: 'Notes', value: '7', delay: 600, dur: 300 },
];

const LAST = Math.max(...CARDS.map((card) => card.delay + card.dur));

/**
 * Choreography specimen: six cards arriving on one plan. Each card plays the same entrance,
 * a rise and a fade, and the demonstration is entirely in the offsets between them: the two
 * summary cards lead, the rest follow, and every card is in flight before its predecessor
 * has landed. The ruler beside them draws that plan as bars, so what the eye reads as a
 * cascade can also be read as the numbers it was written from.
 *
 * The subject is the choreographed group, not any one card and not the whole scene: a
 * single card's arrival is an entrance animation, and the term names what the group does
 * together. The ruler and the Replay control are instrumentation, and instrumentation is
 * never part of the term (SPEC §5).
 *
 * Every card occupies its slot from the first frame, opacity and transform only, so the
 * cascade cannot reflow the grid under itself (SPEC §5). The offsets are the stage's clock
 * rather than CSS animation delays, so a pose stops the plan where it stands instead of
 * letting it finish under a reader inspecting it (SPEC §6). Reduced motion is asked about
 * directly, because a plan whose transitions have been flattened would still deal its cards
 * out one timer at a time: the whole point of the plan is dropped and the group is simply
 * present (SPEC §7).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const cards = CARDS.map(
    (card) => `
      <div
        class="sp-surface"
        data-part="card-${card.id}"
        style="display: flex; flex-direction: column; justify-content: center; gap: 5px; height: 56px; padding: 8px 10px;
               opacity: 0; transform: translateY(12px)"
      >
        <span class="sp-label">${card.name}</span>
        <span class="sp-heading" style="font-size: 15px">${card.value}</span>
      </div>`,
  ).join('');

  const bars = CARDS.map(
    (card) => `
      <div class="sp-row" style="gap: 8px">
        <span class="sp-label" style="flex: 0 0 42px">${card.name}</span>
        <span style="position: relative; flex: 1 1 auto; height: 6px; border-radius: 999px; background: var(--sp-sunken)">
          <span
            data-part="bar-${card.id}"
            style="position: absolute; top: 0; bottom: 0; left: ${(card.delay / SCALE) * 100}%;
                   width: ${(card.dur / SCALE) * 100}%; border-radius: 999px; background: var(--sp-accent); opacity: 0.35"
          ></span>
        </span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 424px; height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Fleet dashboard</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body sp-row" style="align-items: flex-start; gap: 14px">
          <div
            class="sp-grid"
            data-part="group"
            data-subject
            data-state="settled"
            style="flex: 0 0 224px; grid-template-columns: repeat(2, 1fr)"
          >
            ${cards}
          </div>
          <div class="sp-stack sp-context" style="flex: 1 1 auto; gap: 6px">
            <span class="sp-label">Plan</span>
            ${bars}
            <span class="sp-label" style="align-self: flex-end">0 to ${SCALE} ms</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const group = part(root, 'group');
  const pending: number[] = [];

  const arrive = (id: string, dur: number) => {
    const card = part(root, `card-${id}`);
    card.style.transition = dur > 0 ? `opacity ${dur}ms var(--sp-ease), transform ${dur}ms var(--sp-ease)` : 'none';
    card.style.opacity = '1';
    card.style.transform = 'none';
    card.dataset.arrived = '';
    part(root, `bar-${id}`).style.opacity = '1';
  };

  const play = () => {
    for (const id of pending) clock.clearTimeout(id);
    pending.length = 0;

    if (prefersReducedMotion(root)) {
      for (const card of CARDS) arrive(card.id, 0);
      group.dataset.state = 'settled';
      return;
    }

    // Back to the first frame, with no transition to carry the cards there: the reset is
    // committed in this task, and every arrival is scheduled for a later one.
    for (const card of CARDS) {
      const el = part(root, `card-${card.id}`);
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      el.removeAttribute('data-arrived');
      part(root, `bar-${card.id}`).style.opacity = '0.35';
    }
    group.dataset.state = 'playing';

    for (const card of CARDS) pending.push(clock.setTimeout(() => arrive(card.id, card.dur), LEAD + card.delay));
    const settle = () => {
      group.dataset.state = 'settled';
    };
    pending.push(clock.setTimeout(settle, LEAD + LAST + 40));
  };

  part(root, 'replay').addEventListener('click', play);
  play();
}
