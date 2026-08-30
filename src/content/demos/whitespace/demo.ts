import { flag, part } from '#src/kit/parts.ts';

type Spacing = { key: 'cramped' | 'roomy'; pad: number; within: number; between: number };

const CRAMPED: Spacing = { key: 'cramped', pad: 8, within: 4, between: 4 };
const ROOMY: Spacing = { key: 'roomy', pad: 16, within: 4, between: 22 };

/**
 * One box for both cards, sized for the roomy one: it carries the same content with the
 * space between its groups spent five times over, so it is the card that says how much
 * room the pair needs. The width holds every line of that content on one line (SPEC §5).
 */
const CARD_W = 210;
const CARD_H = 198;

/** One card's content, set twice: only the spacing differs between the two. */
function card({ key, pad, within, between }: Spacing, subject: boolean): string {
  return `
    <div
      class="sp-surface sp-stack"
      data-part="${key}"
      ${subject ? 'data-subject' : ''}
      style="width: ${CARD_W}px; height: ${CARD_H}px; padding: ${pad}px; gap: ${between}px"
    >
      <div class="sp-stack" data-part="${key}-group-1" style="gap: ${within}px">
        <span class="sp-heading">Kestrel</span>
        <span class="sp-text">Berth A1, 18 metres</span>
      </div>
      <div class="sp-stack" data-part="${key}-group-2" style="gap: ${within}px">
        <span class="sp-label">Nightly</span>
        <span class="sp-text sp-text--ink">42.00, water and power</span>
      </div>
      <div class="sp-stack" data-part="${key}-group-3" style="gap: ${within}px">
        <span class="sp-label">Available</span>
        <span class="sp-text sp-text--ink">Tonight until Sunday</span>
      </div>
    </div>`;
}

/**
 * Whitespace specimen: one card's content set twice, once with every gap the same and
 * once with the space between groups spent five times over. Nothing else differs, so
 * the only thing doing the grouping in the second card is the emptiness.
 *
 * The subject is the roomy card, because that is the narrowest element whose space is
 * the term: the cramped card is what it has to be read against, so it is scenery
 * (SPEC §5). Marking the space itself is not available, which is exactly why the term
 * is hard to point at and worth demonstrating.
 *
 * Both cards take the same box and it is the roomy card's own content that sizes it, spent
 * gaps included, so the card holds what it carries instead of pushing it into the caption
 * underneath (SPEC §5). What the cramped card leaves empty at the bottom is the difference.
 *
 * The frame's title used to read "Same words, same size, same order" and each card sat
 * under a label ("every gap alike, so nothing groups", "space carries the grouping").
 * All three were the site describing its own comparison inside a berth listing that would
 * never print them, so they are gone and the bar carries the product's own name.
 *
 * The claim a static specimen would otherwise leave unproven is measured at mount, on
 * the state it mounts in: the ratio between the space around a group and the space
 * inside it, published as `data-ratio` and flagged as `data-grouped` once the outer
 * space is at least double the inner.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Moorings</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; gap: 18px">
          <div class="sp-stack sp-context" style="gap: 8px">
            ${card(CRAMPED, false)}
          </div>
          <div class="sp-stack" style="gap: 8px">
            ${card(ROOMY, true)}
          </div>
        </div>
      </div>
    </div>
  `;

  for (const key of ['cramped', 'roomy'] as const) {
    const group = part(root, `${key}-group-1`);
    const head = group.children[0]?.getBoundingClientRect();
    const sub = group.children[1]?.getBoundingClientRect();
    const next = part(root, `${key}-group-2`).getBoundingClientRect();
    if (!head || !sub) continue;
    const within = sub.top - head.bottom;
    const between = next.top - group.getBoundingClientRect().bottom;
    const element = part(root, key);
    element.dataset.ratio = within > 0 ? String(Math.round((between / within) * 10) / 10) : '0';
    flag(element, 'data-grouped', within > 0 && between >= within * 2);
  }
}
