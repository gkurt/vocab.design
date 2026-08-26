import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Kind = 'person' | 'brand' | 'both';

const FROM: Record<Kind, { name: string; initials: string; verdict: string }> = {
  person: {
    name: 'Ana Ruiz',
    initials: 'AR',
    verdict: 'Reads as correspondence and invites a reply. A reader who does not know Ana has nothing to recognise.',
  },
  brand: {
    name: 'Quay Books',
    initials: 'QB',
    verdict: 'Recognised at a glance, which is also the risk: it files cleanly as marketing before it is read.',
  },
  both: {
    name: 'Ana at Quay Books',
    initials: 'A',
    verdict: 'Recognition from the brand and a person to answer, and the longest of the three in the tightest field.',
  },
};

/**
 * Sender name specimen: one mail, unchanged, arriving under each of the three names a
 * team actually argues about. The subject, the preview and the time are the same in
 * every state, so the only variable is the name and the initials the client derives
 * from it, which is the term's second half: the name is also artwork.
 *
 * The subject is the from name itself, not the row and not the avatar. The avatar is
 * drawn FROM the name, so it is a consequence rather than the thing named, and the
 * rest of the row is the composition the name is scanned inside (SPEC §5).
 *
 * The name sits in a growing slot beside a fixed avatar and a fixed time, and the
 * verdict has a fixed box, so no state moves anything (SPEC §5). Each segment reaches
 * its own state rather than flipping another's (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 190px">
        <div class="sp-topbar sp-context">
          ${icon('inbox')}<span class="sp-heading sp-grow">Inbox</span><span class="sp-label">Thursday</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-row" data-part="row" style="flex: 0 0 auto; gap: 11px; padding: 11px 12px; align-items: flex-start">
            <span class="sp-avatar" data-part="avatar" data-initials="${FROM.person.initials}" style="width: 34px; height: 34px; font-size: 13px">${FROM.person.initials}</span>
            <span class="sp-grow" style="min-width: 0">
              <span class="sp-row" style="gap: 8px">
                <span
                  class="sp-text sp-text--ink sp-grow"
                  data-part="from"
                  data-kind="person"
                  data-subject
                  style="min-width: 0; font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
                >${FROM.person.name}</span>
                <span class="sp-text sp-context" style="flex: 0 0 auto; font-size: 11px">07:41</span>
              </span>
              <span class="sp-text sp-text--ink sp-context" style="display: block; margin-top: 2px; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">Your September picks are ready</span>
              <span class="sp-text sp-context" style="display: block; margin-top: 1px; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">Three titles chosen for you, and the shop closes early on the 14th.</span>
            </span>
          </div>
          <span class="sp-text sp-context" data-part="verdict" style="flex: 0 0 auto; height: 32px; font-size: 11px; line-height: 1.35">${FROM.person.verdict}</span>
        </div>
      </div>
      <sp-segmented class="sp-segmented" data-part="kind" data-value="person">
        <button class="sp-segment" data-part="kind-person" value="person">Person</button>
        <button class="sp-segment" data-part="kind-brand" value="brand">Brand</button>
        <button class="sp-segment" data-part="kind-both" value="both">Person at brand</button>
      </sp-segmented>
    </div>
  `;

  const from = part(root, 'from');
  const avatar = part(root, 'avatar');
  const verdict = part(root, 'verdict');

  part(root, 'kind').addEventListener('change', (event) => {
    const detail = (event as CustomEvent<string>).detail;
    const next: Kind = detail === 'brand' ? 'brand' : detail === 'both' ? 'both' : 'person';
    const spec = FROM[next];
    from.dataset.kind = next;
    from.textContent = spec.name;
    // The initials are derived from the name rather than published beside it, which is
    // why a rename changes the shape a reader had learned to spot.
    avatar.dataset.initials = spec.initials;
    avatar.textContent = spec.initials;
    verdict.textContent = spec.verdict;
  });
}
