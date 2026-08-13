import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const FACES = ['AR', 'MK', 'JD', 'SB'];

const VERDICT = {
  specific: 'A count behind the rating, a number that could be checked, faces of real accounts, and a quote with a name on it.',
  vague: 'The same four claims with every checkable part removed. Nothing here could be shown to be false.',
} as const;

type Mode = keyof typeof VERDICT;

function stars(filled: number): string {
  return Array.from({ length: 5 }, (_, i) => icon('star', i < filled ? 'sp-icon--filled' : ''))
    .map((svg) => `<span style="display: flex; color: var(--sp-accent)">${svg}</span>`)
    .join('');
}

function avatars(mode: Mode): string {
  const labels = mode === 'specific' ? FACES : ['', '', '', ''];
  return labels
    .map(
      (initials, index) => `
        <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px; margin-left: ${index === 0 ? 0 : -8}px; box-shadow: 0 0 0 2px var(--sp-surface)">
          ${initials}
        </span>`,
    )
    .join('');
}

function cluster(mode: Mode): string {
  const specific = mode === 'specific';
  return `
    <div class="sp-row" data-part="rating" style="gap: 6px; height: 18px">
      <span class="sp-row" style="gap: 1px">${stars(specific ? 4 : 5)}</span>
      <span class="sp-text sp-text--ink" style="font-size: 12px">${specific ? '4.6' : 'Five stars'}</span>
      <span class="sp-label" data-part="reviews" data-count="${specific ? '1284' : '0'}" style="font-size: 11px">
        ${specific ? 'from 1,284 reviews' : 'from our customers'}
      </span>
    </div>
    <div class="sp-text sp-text--ink" data-part="usage" data-value="${specific ? '12400' : ''}" style="height: 16px; font-size: 12px">
      ${specific ? '12,400 teams ship with Harbour' : 'Loved by thousands of teams'}
    </div>
    <div class="sp-row" data-part="faces" style="height: 24px">
      ${avatars(mode)}
      <span class="sp-label" style="margin-left: 8px; font-size: 11px">${specific ? '9 people from Kestrel Freight' : 'and many more'}</span>
    </div>
    <figure data-part="quote" data-attributed="${specific ? 'named' : 'anon'}" style="margin: 0; height: 30px">
      <blockquote class="sp-text sp-text--ink" style="margin: 0; font-size: 12px">
        ${specific ? '“We moved forty drivers over in a weekend.”' : '“Best tool we have ever used!”'}
      </blockquote>
      <figcaption class="sp-label" style="font-size: 11px">${specific ? 'Ana Reyes, operations lead, Kestrel Freight' : 'A happy customer'}</figcaption>
    </figure>`;
}

/**
 * Social proof specimen: the trust cluster on a plan card, drawn once with everything
 * checkable and once with every checkable part removed. The subject is the cluster,
 * not the card: the term names the borrowed judgement, and the price and the trial
 * button are the decision it is lent to.
 *
 * Both states are social proof, which is why neither needs a pose: the vague version
 * is not the opposite of the term, it is the term with its evidence deleted. They fill
 * the same box, so switching moves nothing (SPEC §5), and each state control reaches
 * its own state rather than flipping the other's (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 264px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Plans</span><span class="sp-label">Harbour</span></div>
        <div class="sp-body">
          <div class="sp-surface" style="padding: 10px 12px">
            <div class="sp-row sp-row--between sp-context">
              <span class="sp-heading" style="font-size: 14px">Team plan</span>
              <span class="sp-text sp-text--ink">12.00 per seat</span>
            </div>
            <div
              class="sp-stack"
              data-part="cluster"
              data-subject
              data-mode="specific"
              style="gap: 6px; margin-top: 10px"
            >${cluster('specific')}</div>
            <button class="sp-button sp-button--sm sp-context" type="button" data-part="trial" style="width: 100%; margin-top: 10px">
              Start a free trial
            </button>
          </div>
        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-part="verdict" style="font-size: 11px; width: 300px">${VERDICT.specific}</span>
        <sp-segmented class="sp-segmented" data-part="mode" data-value="specific">
          <button class="sp-segment" data-part="mode-specific" value="specific">Checkable</button>
          <button class="sp-segment" data-part="mode-vague" value="vague">Vague</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const block = part(root, 'cluster');
  const verdict = part(root, 'verdict');

  part(root, 'mode').addEventListener('change', (event) => {
    const next: Mode = (event as CustomEvent<string>).detail === 'vague' ? 'vague' : 'specific';
    block.dataset.mode = next;
    block.innerHTML = cluster(next);
    verdict.textContent = VERDICT[next];
  });
}
