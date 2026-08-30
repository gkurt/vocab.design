import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const DECLINE = {
  shaming: 'No thanks, I like paying full price',
  fair: 'No thanks',
} as const;

const VERDICT = {
  shaming: 'Only the wording changed, and refusing now means signing a sentence about yourself.',
  fair: 'The same offer, the same weight, the same glow. The decline says what it does and nothing about the reader.',
} as const;

type Mode = keyof typeof DECLINE;

/**
 * Confirmshaming specimen: a discount offer whose way out is written as a confession.
 * The subject is the decline control itself, since the term names the copy on that one
 * button and not the offer around it, and it declares the shaming wording as its honest
 * condition (`data-pose`): identify refuses to ring the polite version, which would be
 * a picture of the opposite word (SPEC §6).
 *
 * A label at the top of the dialog once read "Newsletter offer (the mistake)", which is the
 * site grading its own scene from inside a shop's modal. The strip's verdict already says
 * which wording is on screen, so the label went rather than moving.
 *
 * Nothing but the words moves between the two states. The accept keeps its glow and the
 * decline keeps its size, place, and colour, so the specimen isolates the one variable
 * the term is about. The decline sits in a fixed row, so a longer sentence widens the
 * control without moving anything around it (SPEC §5), and each state control reaches
 * its own state rather than flipping the other's (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Wilder &amp; Co</span><span class="sp-label">Shop</span></div>
        <div class="sp-body" style="position: relative; padding: 0">
          <div class="sp-context" style="height: 100%; padding: 10px 12px">
            <div class="sp-stack">
              <div class="sp-line" style="width: 88%"></div>
              <div class="sp-line" style="width: 74%"></div>
              <div class="sp-line" style="width: 81%"></div>
            </div>
          </div>
          <div class="sp-scrim" data-open></div>
          <div
            class="sp-dialog"
            data-part="offer"
            data-open
            role="dialog"
            aria-label="Get 10 percent off"
            style="width: 300px; padding: 16px; text-align: center"
          >
            <div class="sp-heading" style="margin-top: 8px; font-size: 15px">Take 10% off your first order</div>
            <input class="sp-input" data-part="email" type="email" placeholder="you@example.com" aria-label="Email address" style="margin-top: 10px" />
            <button
              class="sp-button"
              data-part="accept"
              type="button"
              style="width: 100%; margin-top: 8px; padding: 9px 16px; box-shadow: 0 0 0 4px var(--sp-accent-soft), 0 6px 14px rgb(53 87 232 / 0.35)"
            >Send me the code</button>
            <div style="display: flex; align-items: center; justify-content: center; height: 30px; margin-top: 4px">
              <button
                class="sp-button sp-button--quiet sp-button--sm"
                data-part="decline"
                data-subject
                data-pose="[data-mode=shaming]"
                data-mode="shaming"
                type="button"
                style="color: var(--sp-muted); font-size: 12px"
              >${DECLINE.shaming}</button>
            </div>
          </div>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="font-size: 11px; width: 300px">${VERDICT.shaming}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="shaming" data-axis="Confirmshaming" data-term="shaming">
          <button class="sp-segment" data-part="mode-shaming" value="shaming">With</button>
          <button class="sp-segment" data-part="mode-fair" value="fair">Without</button>
        </sp-segmented>
      
    </div>
  `;

  const decline = part(root, 'decline');
  const verdict = part(root, 'verdict');

  part(root, 'mode').addEventListener('change', (event) => {
    const next: Mode = (event as CustomEvent<string>).detail === 'fair' ? 'fair' : 'shaming';
    decline.dataset.mode = next;
    decline.textContent = DECLINE[next];
    verdict.textContent = VERDICT[next];
  });
}
