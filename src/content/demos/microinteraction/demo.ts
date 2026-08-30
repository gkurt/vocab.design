import { icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';

const START = 127;

/**
 * Microinteraction specimen: a like button under a post, whose press runs one whole small
 * interaction and whose second press runs it back. The subject is the button, not the post
 * it sits under: the term names the small complete interaction, and the button is the
 * narrowest thing that owns the trigger, the rule, the feedback and the state it holds.
 *
 * The four parts used to be spelled out beside it, a legend of Saffer's names with a note
 * each ("Trigger: the press that starts it", "Rules: one press adds, the next takes it
 * back", "Feedback: the heart pops, the count ticks over", "Loops and modes: the state
 * holds until it is pressed again"), lighting in turn on the stage's clock. No feed prints
 * a diagram of its own like button, and the article names the four parts at length, so the
 * legend went and the button performs them instead. The topbar's line went with it: it read
 * "Press the heart" at rest and narrated the loop after, which is a stage direction.
 *
 * The pop is `element.animate`, which `motion.css` cannot reach, so it asks
 * `prefersReducedMotion` itself and lands on the end state instead of playing (SPEC §7).
 * Nothing in the loop changes a box: the count is tabular, so a like moves the heart and
 * nothing else (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 168px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field notes</span>
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
        </div>
      </div>
    </div>
  `;

  const like = part(root, 'like');
  const heart = part(root, 'heart');
  const glyph = heart.firstElementChild as SVGElement;
  const count = part(root, 'count');

  let liked = false;

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
    if (liked) pop();
  });
}
