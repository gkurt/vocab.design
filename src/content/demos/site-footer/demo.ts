import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const COLUMNS = [
  { heading: 'Product', links: ['Tides', 'Charts', 'Pricing'] },
  { heading: 'Company', links: ['About', 'Careers', 'Press'] },
  { heading: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
];

/**
 * Site footer specimen: the closing region of a page, shown as the sitemap-sized version
 * with headed link columns, a newsletter field, a social row and the legal line, and as
 * the collapsed one-line version the same region becomes when a site has less to say.
 * Both are the term: the footer is defined by what it holds, not by how tall it is.
 *
 * The subject is the footer itself. The page above it is scenery and carries the context
 * register (SPEC §5).
 *
 * The footer is docked to the bottom of a page box of fixed height, so growing and
 * collapsing it moves nothing above it: the content keeps its place and the empty middle
 * takes the change (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const columns = COLUMNS.map(
    (column, index) => `
      <div class="sp-stack" data-part="column-${index + 1}" style="flex: 0 0 auto; width: 76px; gap: 4px">
        <span class="sp-label" style="color: var(--sp-ink)">${column.heading}</span>
        ${column.links.map((link) => `<span class="sp-text" style="font-size: 12px">${link}</span>`).join('')}
      </div>`,
  ).join('');

  const social = `
    <div class="sp-row" data-part="social" style="gap: 4px">
      <span style="display: flex; color: var(--sp-muted)">${icon('share')}</span>
      <span style="display: flex; color: var(--sp-muted)">${icon('heart')}</span>
      <span style="display: flex; color: var(--sp-muted)">${icon('bell')}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 292px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Footer</span>
          <sp-segmented class="sp-segmented" data-part="switcher" data-value="full">
            <button class="sp-segment" type="button" data-part="seg-full" value="full">sitemap</button>
            <button class="sp-segment" type="button" data-part="seg-thin" value="thin">one line</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="padding: 12px">
          <div
            data-part="page"
            style="display: flex; flex-direction: column; height: 100%; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <main class="sp-context" data-part="main" style="flex: 1 1 auto; min-height: 0; padding: 12px 14px">
              <span class="sp-heading" style="font-size: 13px">Harbour Press</span>
              <div class="sp-stack" style="margin-top: 8px; gap: 6px">
                <div class="sp-line" style="width: 92%"></div>
                <div class="sp-line" style="width: 74%"></div>
              </div>
            </main>
            <footer
              data-part="footer"
              data-subject
              data-mode="full"
              style="flex: 0 0 auto; padding: 12px 14px; border-top: 1px solid var(--sp-line); background: var(--sp-sunken)"
            >
              <div data-part="footer-full">
                <div class="sp-row" style="align-items: flex-start; gap: 12px">
                  ${columns}
                  <div class="sp-stack" data-part="newsletter" style="flex: 1 1 auto; min-width: 0; gap: 4px">
                    <span class="sp-label" style="color: var(--sp-ink)">Newsletter</span>
                    <div class="sp-row" style="gap: 6px">
                      <span
                        class="sp-input sp-grow"
                        data-part="newsletter-field"
                        style="padding: 3px 8px; font-size: 12px; color: var(--sp-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
                        >your address</span
                      >
                      <button class="sp-button sp-button--sm" type="button" data-part="join" style="flex: 0 0 auto; padding: 3px 10px">Join</button>
                    </div>
                  </div>
                </div>
                <div class="sp-divider" style="margin: 10px 0"></div>
              </div>
              <div class="sp-row sp-row--between" data-part="legal">
                <span class="sp-label" data-part="copyright">Harbour Press, 2026</span>
                ${social}
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  `;

  const footer = part(root, 'footer');
  const full = part(root, 'footer-full');
  const copyright = part(root, 'copyright');

  const apply = (key: string) => {
    const thin = key === 'thin';
    footer.dataset.mode = thin ? 'thin' : 'full';
    full.hidden = thin;
    // Collapsed, the legal line carries the few links that cannot be dropped.
    copyright.textContent = thin ? 'Harbour Press, 2026 · Privacy · Terms · Contact' : 'Harbour Press, 2026';
  };

  // Each segment names a footer, so the switch lands on that one rather than
  // flipping whichever it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('full');
}
