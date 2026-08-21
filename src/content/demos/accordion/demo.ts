import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const SECTIONS = [
  { id: 'delivery', label: 'Delivery and returns', body: 'Free over £40, returned within 30 days.' },
  { id: 'sizing', label: 'Sizing', body: 'Runs one size small. Half sizes are rounded up.' },
  { id: 'care', label: 'Care', body: 'Cold wash, dry flat, no tumble drying at all.' },
];

/**
 * Accordion specimen: three headers presented as one component, each owning its own
 * region. The subject is the STACK, because the stack is what the word names: a
 * single header over a single region is a disclosure, and the arithmetic is the
 * whole discrimination.
 *
 * Any number of sections may be open at once, which is the policy the article
 * commits to, so opening the third leaves the second where it was.
 *
 * Expanding pushes the sections below it down, which is inherent to the term, so the
 * frame is sized for the tallest state (all three open) and the caption is pinned to
 * the bottom of the body: the stage never shifts around the growth (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const section = (s: (typeof SECTIONS)[number], i: number) => `
    <div style="${i === 0 ? '' : 'border-top: 1px solid var(--sp-line)'}">
      <button
        class="sp-button sp-button--quiet sp-row"
        type="button"
        id="acc-header-${s.id}"
        data-part="header-${s.id}"
        aria-expanded="false"
        aria-controls="acc-region-${s.id}"
        style="width: 100%; gap: 8px; padding: 8px 12px; border-radius: 0; font-size: 13px; text-align: left"
      >
        ${icon('chevronRight', 'sp-icon--chevron')}
        <span class="sp-grow" style="white-space: nowrap">${s.label}</span>
      </button>
      <div
        class="sp-text"
        role="region"
        id="acc-region-${s.id}"
        data-part="region-${s.id}"
        aria-labelledby="acc-header-${s.id}"
        hidden
        style="padding: 0 12px 10px 34px"
      >${s.body}</div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 290px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Product help</span>
          <span class="sp-label">any number may be open</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column">
          <div class="sp-surface" data-part="stack" data-subject style="overflow: hidden">
            ${SECTIONS.map(section).join('')}
          </div>
          <p class="sp-text sp-context" data-part="caption" style="margin: auto 0 0 2px; font-size: 12px">
            One header over one region is a disclosure. A stack of them is this.
          </p>
        </div>
      </div>
    </div>
  `;

  for (const s of SECTIONS) {
    const header = part(root, `header-${s.id}`);
    const region = part(root, `region-${s.id}`);
    // The toggling is the term, so a header flips its own section (SPEC §8), and
    // `hidden` is the state: a region the header calls collapsed must be gone from
    // the accessibility tree as well as from the picture.
    header.addEventListener('click', () => {
      const open = region.hidden;
      region.hidden = !open;
      header.setAttribute('aria-expanded', String(open));
    });
  }
}
