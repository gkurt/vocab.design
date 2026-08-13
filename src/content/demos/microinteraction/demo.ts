import { icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const START = 127;

/** How long each of the four parts stays lit, and the beat between them. */
const BEAT_MS = 260;
const CLEAR_MS = 1500;

const PARTS = [
  { key: 'trigger', name: 'Trigger', note: 'the press that starts it' },
  { key: 'rules', name: 'Rules', note: 'one press adds, the next takes it back' },
  { key: 'feedback', name: 'Feedback', note: 'the heart pops, the count ticks over' },
  { key: 'loops', name: 'Loops and modes', note: 'the state holds until it is pressed again' },
];

/**
 * Microinteraction specimen: a like button whose press runs one whole loop, with Saffer's
 * four parts lighting in the order the loop reaches them. The subject is the button, not
 * the post it sits under and not the legend beside it: the term names the small complete
 * interaction, and the button is the narrowest thing that owns all four of its parts.
 *
 * The legend is instrumentation, so it stays in the context register, and the parts light
 * on the stage's clock rather than on a timer of their own, so a pose freezes the loop
 * wherever the reader caught it instead of clearing it mid-inspection.
 *
 * The pop is `element.animate`, which `motion.css` cannot reach, so it asks
 * `prefersReducedMotion` itself and lands on the end state instead of playing (SPEC §7).
 * Nothing in the loop changes a box: the count is tabular and the readout holds its width,
 * so a like moves the heart and nothing else (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const legend = PARTS.map(
    ({ key, name, note }) => `
      <li class="sp-row" data-part="step-${key}" style="gap: 8px; height: 17px; opacity: 0.55; transition: opacity 0.18s ease">
        <span class="sp-label" style="width: 106px; color: var(--sp-ink); font-size: 11px">${name}</span>
        <span class="sp-label" style="font-size: 11px">${note}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field notes</span>
          <span class="sp-text" data-part="readout" style="width: 188px; text-align: right; white-space: nowrap">Press the heart</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-context" style="display: flex; gap: 10px; padding: 10px 12px">
            <span class="sp-avatar">RN</span>
            <span class="sp-stack sp-grow" style="gap: 6px; justify-content: center">
              <span class="sp-line" style="width: 100%"></span>
              <span class="sp-line" style="width: 72%"></span>
            </span>
          </div>
          <div class="sp-row" style="gap: 8px">
            <button
              class="sp-button sp-button--ghost sp-button--sm"
              type="button"
              data-part="like"
              data-subject
              data-count="${START}"
              aria-pressed="false"
              style="display: inline-flex; align-items: center; gap: 7px"
            >
              <span data-part="heart" style="display: flex">${icon('heart')}</span>
              <span data-part="count" data-value="${START}" style="font-variant-numeric: tabular-nums">${START}</span>
            </button>
            <span class="sp-context" style="display: flex">
              <button class="sp-icon-button" type="button" aria-label="Share">${icon('share')}</button>
            </span>
          </div>
          <div class="sp-divider sp-context"></div>
          <ul class="sp-list sp-context" data-part="legend" style="gap: 5px; padding: 0">${legend}</ul>
        </div>
      </div>
    </div>
  `;

  const like = part(root, 'like');
  const heart = part(root, 'heart');
  const glyph = heart.firstElementChild as SVGElement;
  const count = part(root, 'count');
  const readout = part(root, 'readout');

  let liked = false;
  let timers: number[] = [];

  const light = (key: string, on: boolean) => {
    const row = part(root, `step-${key}`);
    row.style.opacity = on ? '1' : '0.55';
    flag(row, 'data-lit', on);
  };

  const clearAll = () => {
    for (const timer of timers) clock.clearTimeout(timer);
    timers = [];
    for (const { key } of PARTS) light(key, false);
  };

  const runLegend = () => {
    clearAll();
    PARTS.forEach(({ key }, index) => {
      timers.push(clock.setTimeout(() => light(key, true), index * BEAT_MS));
    });
    timers.push(clock.setTimeout(clearAll, PARTS.length * BEAT_MS + CLEAR_MS));
  };

  const pop = () => {
    if (prefersReducedMotion(root)) return;
    heart.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.45)', offset: 0.4 }, { transform: 'scale(1)' }], {
      duration: 360,
      easing: 'cubic-bezier(0.3, 0.9, 0.3, 1)',
    });
  };

  like.addEventListener('click', () => {
    liked = !liked;
    const total = START + (liked ? 1 : 0);
    flag(like, 'data-liked', liked);
    like.setAttribute('aria-pressed', String(liked));
    like.dataset.count = String(total);
    like.style.color = liked ? 'var(--sp-accent)' : '';
    like.style.borderColor = liked ? 'var(--sp-accent)' : '';
    glyph.classList.toggle('sp-icon--filled', liked);
    count.dataset.value = String(total);
    count.textContent = String(total);
    readout.textContent = liked ? 'Liked: one loop, start to finish' : 'Unliked: the same loop, run back';
    if (liked) pop();
    runLegend();
  });
}
