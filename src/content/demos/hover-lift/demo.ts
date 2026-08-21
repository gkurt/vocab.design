import { part } from '#src/kit/parts.ts';

const CARDS = [
  { id: 'one', initials: 'SP', title: 'Sprint notes', meta: 'Edited 2h ago' },
  { id: 'two', initials: 'RM', title: 'Roadmap', meta: 'Edited yesterday' },
  { id: 'three', initials: 'RT', title: 'Retro', meta: 'Edited Monday' },
];

const SUBJECT = 'two';
const RESTING_SHADOW = '0 1px 2px rgb(16 24 40 / 0.09)';

/**
 * Hover lift specimen: three peers with the same behaviour, so the difference on
 * screen is made by where the pointer is rather than by how the cards were
 * built. The two flanking it are scenery, which is also why their elevation is
 * gone: the context register drops shadow, and a lift is half shadow.
 *
 * The rise is a `translate`, never a margin or a `top`, so a card coming forward
 * cannot nudge the two beside it (SPEC §5). The pair of changes is deliberate:
 * moving without deepening the shadow reads as a slide, deepening without moving
 * reads as the light source jumping.
 *
 * Hovering alone is the whole interaction here, nothing is ever pressed, so every
 * card carries `data-hover-driven`: a reader's dwell on one takes the stage over
 * without a click, and the card they are pointing at is the card that stays up
 * (SPEC §7). Each card owns its own listeners, so the marking goes on each of them
 * rather than on the row, which answers no pointer.
 *
 * State is held on `data-lifted` and driven by `pointerenter`/`pointerleave`
 * rather than by `:hover`, because attract's synthesized pointer is real input
 * the demo has to answer and is not a cursor the browser will light `:hover` for
 * (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const cards = CARDS.map(
    ({ id, initials, title, meta }) => `
      <article
        class="sp-surface sp-stack${id === SUBJECT ? '' : ' sp-context'}"
        data-part="card-${id}"
        data-hover-driven
        ${id === SUBJECT ? 'data-subject' : ''}
        style="width: 108px; gap: 8px; padding: 12px; box-shadow: ${RESTING_SHADOW}; translate: 0 0; transition: translate 0.18s var(--sp-ease), box-shadow 0.22s var(--sp-ease)"
      >
        <span class="sp-avatar">${initials}</span>
        <span class="sp-heading" style="font-size: 13px">${title}</span>
        <span class="sp-label">${meta}</span>
      </article>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-stack" style="gap: 10px">
        <span class="sp-label sp-context" data-part="caption">Recently opened</span>
        <div class="sp-row" style="gap: 12px; padding: 8px 0">${cards}</div>
      </div>
    </div>
  `;

  for (const { id } of CARDS) {
    const el = part(root, `card-${id}`);
    const set = (lifted: boolean) => {
      el.toggleAttribute('data-lifted', lifted);
      el.style.translate = lifted ? '0 -6px' : '0 0';
      el.style.boxShadow = lifted ? 'var(--sp-shadow)' : RESTING_SHADOW;
    };
    el.addEventListener('pointerenter', () => set(true));
    el.addEventListener('pointerleave', () => set(false));
  }
}
