import { part } from '#src/kit/parts.ts';

type Page = { key: string; label: string };
type Section = { key: string; label: string; pages: Page[] };

/** Four sections, each with its own set of pages. The rail is one of them, never a union. */
const SECTIONS: Section[] = [
  {
    key: 'home',
    label: 'Home',
    pages: [
      { key: 'activity', label: 'Activity' },
      { key: 'pinned', label: 'Pinned' },
    ],
  },
  {
    key: 'library',
    label: 'Library',
    pages: [
      { key: 'vessels', label: 'Vessels' },
      { key: 'charts', label: 'Charts' },
      { key: 'tags', label: 'Tags' },
    ],
  },
  {
    key: 'team',
    label: 'Team',
    pages: [
      { key: 'overview', label: 'Overview' },
      { key: 'members', label: 'Members' },
      { key: 'billing', label: 'Billing' },
      { key: 'audit', label: 'Audit log' },
    ],
  },
  {
    key: 'settings',
    label: 'Settings',
    pages: [
      { key: 'profile', label: 'Profile' },
      { key: 'access', label: 'Access' },
    ],
  },
];

/** The global bar, present here only so the nesting is visible. Its four links never change. */
const GLOBAL = SECTIONS.map((s) => s.label);

const LINES = [94, 86, 71, 90, 62];

/**
 * Local navigation specimen: a rail listing the pages inside one section, under a global
 * bar that is scenery.
 *
 * The subject is the rail, not the shell and not the page it sits beside: the term names
 * this list and the fact that its contents belong to the section the reader is in. The
 * global bar and the content pane wear the context register, which is the visual half of
 * the round's contrast, since the global navigation specimen puts the accent on the top bar
 * and keeps its section links quiet (SPEC §5).
 *
 * Picking a page is absolute, and so is picking a section (SPEC §8). Changing section
 * rebuilds the rail's items wholesale, which is the term's definition drawn rather than
 * stated; the rail element itself, its heading, and its box all hold still while that
 * happens, so nothing on the page moves that did not change.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 444px; height: 288px">
        <div class="sp-topbar sp-context" style="gap: 12px; padding: 9px 12px">
          <span class="sp-row" style="gap: 7px; flex: 0 0 auto">
            <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: var(--sp-accent)"></span>
            <span class="sp-heading" style="font-size: 12px">Harbour</span>
          </span>
          <span class="sp-row sp-grow" style="gap: 2px">
            ${GLOBAL.map(
              (label) =>
                `<span class="sp-nav-item" role="link" data-part="global-${label.toLowerCase()}" style="font-size: 12px; padding: 5px 8px">${label}</span>`,
            ).join('')}
          </span>
          <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">RN</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px; padding: 12px">
          <nav
            class="sp-stack"
            data-part="local"
            data-subject
            data-section="team"
            aria-label="Section"
            style="flex: 0 0 auto; width: 132px; gap: 5px; padding: 9px 8px; background: var(--sp-surface);
                   border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <span class="sp-label" data-part="section-name" style="padding: 0 8px">Team</span>
            <span class="sp-nav" data-part="pages" style="gap: 3px"></span>
          </nav>
          <div class="sp-surface sp-context" style="display: flex; flex-direction: column; gap: 10px; flex: 1 1 auto; min-width: 0; padding: 12px 14px">
            <span class="sp-heading" data-part="pane-title" style="font-size: 14px">Overview</span>
            ${LINES.map((w) => `<div class="sp-line" style="flex: 0 0 auto; width: ${w}%"></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  const rail = part(root, 'local');
  const pages = part(root, 'pages');
  const sectionName = part(root, 'section-name');
  const title = part(root, 'pane-title');

  const openPage = (key: string) => {
    const found = [...pages.children].find((el) => (el as HTMLElement).dataset.key === key) as HTMLElement | undefined;
    if (!found) return;
    for (const el of pages.children) el.removeAttribute('data-current');
    found.setAttribute('data-current', '');
    title.textContent = found.textContent ?? '';
  };

  const openSection = (key: string) => {
    const section = SECTIONS.find((s) => s.key === key);
    if (!section) return;
    rail.dataset.section = section.key;
    sectionName.textContent = section.label;
    // A rail that swapped its contents without saying which section it now describes reads
    // as the interface losing the reader's place, so the heading is rewritten with it.
    pages.innerHTML = section.pages
      .map((page) => `<span class="sp-nav-item" role="link" data-part="item-${page.key}" data-key="${page.key}">${page.label}</span>`)
      .join('');
    for (const el of pages.children) {
      const item = el as HTMLElement;
      item.addEventListener('click', () => openPage(item.dataset.key ?? ''));
    }
    openPage(section.pages[0]?.key ?? '');
  };

  for (const label of GLOBAL) {
    const item = part(root, `global-${label.toLowerCase()}`);
    const section = SECTIONS.find((s) => s.label === label);
    item.addEventListener('click', () => {
      for (const other of GLOBAL) part(root, `global-${other.toLowerCase()}`).removeAttribute('data-current');
      item.setAttribute('data-current', '');
      if (section) openSection(section.key);
    });
  }

  part(root, 'global-team').setAttribute('data-current', '');
  openSection('team');
}
