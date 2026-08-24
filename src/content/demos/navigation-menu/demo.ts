import { icon } from '#src/kit/icons.ts';
import { localBox } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';

const SECTIONS = [
  {
    key: 'product',
    label: 'Product',
    links: [
      { key: 'analytics', label: 'Analytics', note: 'What happened last week' },
      { key: 'automations', label: 'Automations', note: 'Rules that run without you' },
      { key: 'warehouse', label: 'Warehouse', note: 'Your data, queryable' },
    ],
  },
  {
    key: 'learn',
    label: 'Learn',
    links: [
      { key: 'docs', label: 'Documentation', note: 'Guides and reference' },
      { key: 'changelog', label: 'Changelog', note: 'What shipped, and when' },
      { key: 'community', label: 'Community', note: 'Forum and office hours' },
    ],
  },
] as const;

/**
 * Navigation menu specimen: a site header whose items open panels of links, each
 * link a destination rather than a command. The subject is the menu itself, the
 * row of items together with the panels they own, since neither half is the term
 * on its own; the page behind it is the scene.
 *
 * Every trigger resolves to an absolute selection through one `open()` (SPEC §8),
 * so a pass picked up anywhere shows the panel named rather than the opposite of
 * whatever it found, and only one panel is ever down. The panels are out of flow
 * and anchored once on mount, so opening one moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const triggers = SECTIONS.map(
    ({ key, label }) => `
      <button
        class="sp-button sp-button--quiet sp-button--sm sp-row"
        type="button"
        data-part="nav-${key}"
        data-key="${key}"
        aria-expanded="false"
        aria-controls="vd-nav-panel-${key}"
        style="gap: 4px"
      >${label}${icon('chevronDown')}</button>`,
  ).join('');

  const panels = SECTIONS.map(
    ({ key, label, links }) => `
      <div class="sp-menu" id="vd-nav-panel-${key}" data-part="panel-${key}" aria-label="${label}" style="width: 208px; padding: 6px">
        <ul class="sp-nav">
          ${links
            .map(
              ({ key: linkKey, label: linkLabel, note }) => `
            <li>
              <a class="sp-nav-item" href="#${linkKey}" data-part="link-${linkKey}" data-key="${linkKey}" style="padding: 7px 10px">
                <span class="sp-text sp-text--ink" style="display: block">${linkLabel}</span>
                <span class="sp-label" style="display: block; margin-top: 1px">${note}</span>
              </a>
            </li>`,
            )
            .join('')}
        </ul>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="frame" style="height: 268px">
        <div class="sp-topbar" data-part="topbar">
          <span class="sp-heading sp-context">Northwind</span>
          <nav class="sp-row sp-grow" data-part="menu" data-subject aria-label="Main" style="gap: 2px; justify-content: flex-end">
            ${triggers}
            <a class="sp-button sp-button--quiet sp-button--sm" data-part="link-pricing" data-key="pricing" href="#pricing">Pricing</a>
            ${panels}
          </nav>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack" style="gap: 10px">
            <div class="sp-line" style="width: 54%; height: 12px"></div>
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 76%"></div>
            <div class="sp-line" style="width: 82%"></div>
          </div>
          <div class="sp-divider" style="margin: 14px 0"></div>
          <div class="sp-row sp-row--between">
            <span class="sp-label">Now showing</span>
            <span class="sp-text" data-part="status" data-page="home">Home</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const frame = part(root, 'frame');
  const topbar = part(root, 'topbar');
  const status = part(root, 'status');
  const sections = SECTIONS.map(({ key }) => ({
    key,
    trigger: part(root, `nav-${key}`),
    panel: part(root, `panel-${key}`),
  }));

  // Anchored once from the real geometry, on the state the panels mount in: they
  // are out of flow, so this is the only measurement the header ever needs.
  const top = topbar.offsetHeight + 6;
  for (const { trigger, panel } of sections) {
    const { left } = localBox(trigger, frame);
    panel.style.top = `${top}px`;
    panel.style.left = `${Math.min(Math.max(left, 10), frame.offsetWidth - panel.offsetWidth - 10)}px`;
  }

  /** One panel at a time, named absolutely: null closes the header. */
  const open = (key: string | null) => {
    for (const section of sections) {
      const on = section.key === key;
      flag(section.panel, 'data-open', on);
      flag(section.trigger, 'data-open', on);
      section.trigger.setAttribute('aria-expanded', String(on));
    }
  };

  for (const { key, trigger } of sections) trigger.addEventListener('click', () => open(key));

  for (const link of root.querySelectorAll<HTMLAnchorElement>('a[data-key]')) {
    link.addEventListener('click', (event) => {
      // A specimen never navigates: the link is the destination the menu offers,
      // and going there is the site's job, not the exhibit's.
      event.preventDefault();
      status.dataset.page = link.dataset.key ?? 'home';
      status.textContent = (link.querySelector('.sp-text')?.textContent ?? link.textContent ?? '').trim();
      open(null);
    });
  }

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') open(null);
  });
  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    const inside = sections.some(({ trigger, panel }) => trigger.contains(target) || panel.contains(target));
    if (!inside) open(null);
  });
}
