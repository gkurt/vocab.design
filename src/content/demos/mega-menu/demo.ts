import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const COLUMNS = [
  {
    heading: 'Platform',
    links: [
      { key: 'analytics', label: 'Analytics' },
      { key: 'automations', label: 'Automations' },
      { key: 'warehouse', label: 'Data warehouse' },
    ],
  },
  {
    heading: 'By industry',
    links: [
      { key: 'retail', label: 'Retail' },
      { key: 'fintech', label: 'Fintech' },
      { key: 'logistics', label: 'Logistics' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { key: 'docs', label: 'Documentation' },
      { key: 'changelog', label: 'Changelog' },
      { key: 'community', label: 'Community' },
    ],
  },
];

const HEADER_LINKS = [
  { key: 'pricing', label: 'Pricing' },
  { key: 'company', label: 'Company' },
];

/**
 * Mega menu specimen: a site header whose Products item drops a wide panel of
 * grouped links. The subject is the panel, not the header and not the trigger:
 * the word names the thing that comes down, and its columns with headings are
 * the whole distinction from a plain dropdown.
 *
 * The panel is out of flow and anchored under the header once on mount, so
 * opening it moves nothing in the page behind it (SPEC §5). The trigger only
 * opens; dismissal is choosing a link, Escape, or a press outside (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const columns = COLUMNS.map(
    ({ heading, links }) => `
      <div>
        <span class="sp-label" style="display: block; padding: 0 10px 2px">${heading}</span>
        <ul class="sp-nav" style="margin-top: 4px">
          ${links.map(({ key, label }) => `<li><a class="sp-nav-item" href="#" data-part="link-${key}" data-key="${key}">${label}</a></li>`).join('')}
        </ul>
      </div>`,
  ).join('');

  const headerLinks = HEADER_LINKS.map(
    ({ key, label }) => `<button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="nav-${key}">${label}</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading">Northwind</span>
          <div class="sp-row sp-grow" style="gap: 2px; justify-content: flex-end">
            <button
              class="sp-button sp-button--quiet sp-button--sm sp-row"
              type="button"
              data-part="nav-products"
              aria-expanded="false"
              aria-controls="vd-mega-panel"
              style="gap: 4px"
            >
              Products
              ${icon('chevronDown')}
            </button>
            ${headerLinks}
          </div>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack" style="gap: 10px">
            <div class="sp-line" style="width: 58%; height: 12px"></div>
            <div class="sp-line" style="width: 86%"></div>
            <div class="sp-line" style="width: 74%"></div>
            <div class="sp-line" style="width: 80%"></div>
          </div>
          <div class="sp-divider" style="margin: 14px 0"></div>
          <div class="sp-row sp-row--between">
            <span class="sp-label">Went to</span>
            <span class="sp-text" data-part="status" data-page="none">Home</span>
          </div>
        </div>
        <div
          class="sp-menu"
          id="vd-mega-panel"
          data-part="panel"
          data-subject
          aria-label="Products"
          style="left: 10px; right: 10px; padding: 14px; transform-origin: top center"
        >
          <div class="sp-grid" style="grid-template-columns: repeat(3, 1fr); gap: 12px">${columns}</div>
        </div>
      </div>
    </div>
  `;

  const trigger = part(root, 'nav-products');
  const panel = part(root, 'panel');
  const status = part(root, 'status');
  const topbar = root.querySelector('.sp-topbar') as HTMLElement;

  // Anchored once, from the header's real height: the panel is out of flow, so this
  // is the only measurement it needs and nothing in the page ever makes room for it.
  panel.style.top = `${topbar.offsetHeight + 6}px`;

  const setOpen = (open: boolean) => {
    flag(panel, 'data-open', open);
    flag(trigger, 'data-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };

  trigger.addEventListener('click', () => setOpen(true));

  for (const link of panel.querySelectorAll<HTMLAnchorElement>('.sp-nav-item')) {
    link.addEventListener('click', (event) => {
      // A specimen never navigates: the link is the destination the panel offers,
      // and going there is the site's job, not the exhibit's.
      event.preventDefault();
      status.dataset.page = link.dataset.key ?? 'none';
      status.textContent = (link.textContent ?? '').trim();
      setOpen(false);
    });
  }

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    if (!panel.contains(target) && !trigger.contains(target)) setOpen(false);
  });
}
