import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const HEADLINE = 'The ferry contract nobody was allowed to read';
const DECK = 'Three bidders, one signature, and a clause letting the winner set its own fares for a decade.';

/**
 * Deck specimen: a full article header stack, eyebrow over headline over deck
 * over byline, with the deck taken out of the stack and put back. The deck's copy
 * is a real second sentence carrying facts the headline has no room for, since a
 * line that only restates the headline is the thing a deck is supposed not to be.
 *
 * The subject is the deck line, which is what the term names. It is a deck at
 * every setting where it can be seen, so it needs no `data-pose`; the setting that
 * removes it hides the line and keeps its room, so the byline and everything under
 * it hold still and the comparison stays about the line rather than about the gap
 * (SPEC §5). The eyebrow, the headline and the byline are the stack the term is
 * defined against and stay in the context register.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Article header" data-value="with">
            <button class="sp-segment" data-part="seg-with" value="with">with deck</button>
            <button class="sp-segment" data-part="seg-without" value="without">without</button>
          </sp-segmented>
        </div>
        <div data-part="article" data-mode="with" style="margin-top: 10px">
          <span class="sp-context" data-part="eyebrow"
                style="display: block; font-size: 11px; font-weight: 600; letter-spacing: 0.09em;
                       text-transform: uppercase; color: var(--sp-accent)">Investigation</span>
          <h3 class="sp-context" data-part="headline"
              style="margin: 4px 0 0; font-size: 24px; line-height: 1.2; font-weight: 650">${HEADLINE}</h3>
          <p data-part="deck" data-subject
             style="margin: 8px 0 0; font-size: 15px; line-height: 1.4; font-weight: 400; color: var(--sp-ink)">${DECK}</p>
          <div class="sp-row sp-context" data-part="byline" style="gap: 8px; margin-top: 10px">
            <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">AM</span>
            <span class="sp-label">By A. Moreno</span>
            <span class="sp-label">12 min read</span>
          </div>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 10px">
          An eyebrow categorises above the headline; a deck expands below it, carrying facts the
          headline had no room for. Taking it away leaves its space, so nothing under it moves.
        </p>
      </div>
    </div>
  `;

  const article = part(root, 'article');
  const deck = part(root, 'deck');

  const apply = (value: string) => {
    if (value !== 'with' && value !== 'without') return;
    article.dataset.mode = value;
    deck.style.visibility = value === 'with' ? 'visible' : 'hidden';
  };

  apply('with');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
