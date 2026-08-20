import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

type Answer = 'none' | 'happy' | 'meh';

const VERDICT: Record<Answer, string> = {
  none: 'The ask arrives on a good day, seconds after something the reader wanted actually worked.',
  happy: 'The happy answer is handed straight to the store, where the rating counts towards the listing.',
  meh: 'The unhappy answer is routed to a private form instead, so the public average never hears it. Both major app stores forbid exactly this.',
};

const STARS = `${icon('star', 'sp-icon--filled')}${icon('star', 'sp-icon--filled')}${icon('star', 'sp-icon--filled')}${icon('star', 'sp-icon--filled')}${icon('star', 'sp-icon--filled')}`;

/**
 * Rating prompt specimen: a save completes, the prompt asks how it is going, and the
 * answer decides where the answer goes. The happy branch reaches the public store
 * sheet; the unhappy branch reaches a private form that never does.
 *
 * The subject is the prompt panel, the narrowest element the term names, and it stays
 * a rating prompt in both branches, so no `data-pose` is needed: neither answer turns
 * the panel into a picture of a different word. The saved-route line above it and the
 * verdict line below are scenery (SPEC §5).
 *
 * Both answers are always on the panel and each reaches its own state rather than
 * flipping the other's (SPEC §8), and the destination slot holds one height in all
 * three states, so answering moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 270px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Trailhead</span><span class="sp-text">Saved</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-row sp-context" style="gap: 8px; padding: 7px 10px">
            ${icon('check')}
            <span class="sp-text sp-text--ink sp-grow">Coast path saved to your trips</span>
            <span class="sp-text">5th this month</span>
          </div>
          <div
            class="sp-surface"
            data-part="prompt"
            data-subject
            data-answer="none"
            style="display: flex; flex-direction: column; height: 154px; padding: 12px 14px; background: var(--sp-surface)"
          >
            <span class="sp-heading" style="font-size: 14px">Enjoying Trailhead?</span>
            <span class="sp-text" style="margin-top: 3px; font-size: 11px">You have saved five routes this month.</span>
            <div class="sp-row" style="gap: 8px; margin-top: 10px">
              <button class="sp-button sp-button--sm" data-part="answer-happy" type="button" style="flex: 0 0 auto; white-space: nowrap">Loving it</button>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="answer-meh" type="button" style="flex: 0 0 auto; white-space: nowrap">Not really</button>
            </div>
            <div style="position: relative; flex: 0 0 auto; height: 44px; margin-top: 11px; border-top: 1px solid var(--sp-line)">
              <span class="sp-label" data-part="route-rest" style="position: absolute; inset: 11px 0 auto 0">Where this goes depends on the answer</span>
              <div class="sp-row" data-part="route-store" hidden style="position: absolute; inset: 8px 0 auto 0; gap: 8px">
                <span class="sp-chip" style="flex: 0 0 auto; white-space: nowrap">App Store</span>
                <span class="sp-row" style="gap: 1px; color: var(--sp-accent)">${STARS}</span>
                <span class="sp-text" style="font-size: 11px">Public review sheet</span>
              </div>
              <div class="sp-row" data-part="route-private" hidden style="position: absolute; inset: 8px 0 auto 0; gap: 8px">
                <span class="sp-chip" style="flex: 0 0 auto; white-space: nowrap">Private form</span>
                <span class="sp-text" style="font-size: 11px">Sent to the team. The store never hears it.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sp-context" data-part="verdict" style="width: 440px; height: 30px; color: var(--sp-muted); font-size: 11px; line-height: 1.35">${VERDICT.none}</div>
    </div>
  `;

  const prompt = part(root, 'prompt');
  const verdict = part(root, 'verdict');
  const rest = part(root, 'route-rest');
  const store = part(root, 'route-store');
  const priv = part(root, 'route-private');

  const answer = (next: Answer) => {
    prompt.dataset.answer = next;
    rest.hidden = next !== 'none';
    store.hidden = next !== 'happy';
    priv.hidden = next !== 'meh';
    verdict.textContent = VERDICT[next];
  };

  part(root, 'answer-happy').addEventListener('click', () => answer('happy'));
  part(root, 'answer-meh').addEventListener('click', () => answer('meh'));
}
