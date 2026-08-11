import { type IconName, icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const NAV: { key: string; label: string; glyph: IconName }[] = [
  { key: 'inbox', label: 'Inbox', glyph: 'inbox' },
  { key: 'starred', label: 'Starred', glyph: 'star' },
  { key: 'schedule', label: 'Schedule', glyph: 'calendar' },
  { key: 'settings', label: 'Settings', glyph: 'sliders' },
];

/** Wide enough for labels, narrow enough that only the glyphs fit. */
const WIDE = 152;
const RAIL = 52;

/**
 * Sidebar specimen: a persistent left region beside the content, with its footer
 * pinned to the bottom, that collapses to an icon rail. The subject is the region
 * itself, not the scene: the content pane it sits beside is scenery, and the term
 * names one column rather than the pair.
 *
 * Two controls instead of one toggle, each reaching an absolute state (SPEC §8),
 * and they share one 28px slot so the header row holds still either way. Only the
 * sidebar's own width changes; the frame around it never moves.
 */
export function mount(root: HTMLElement): void {
  const items = NAV.map(
    ({ key, label, glyph }, index) => `
      <li>
        <span class="sp-nav-item" data-part="nav-${key}" style="display: flex; align-items: center; gap: 8px"${index === 0 ? ' data-current' : ''}>
          ${icon(glyph)}
          <span data-part="label-${key}" style="white-space: nowrap">${label}</span>
        </span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px; flex-direction: row">
        <aside
          data-part="sidebar"
          data-subject
          data-mode="wide"
          style="width: ${WIDE}px; flex: 0 0 auto; display: flex; flex-direction: column; gap: 12px; padding: 10px 8px; border-right: 1px solid var(--sp-line); background: var(--sp-surface); overflow: hidden; transition: width 0.24s var(--sp-ease)"
        >
          <div class="sp-row sp-row--between" style="min-height: 28px">
            <span class="sp-label" data-part="label-brand" style="padding-left: 2px; white-space: nowrap">Harbour</span>
            <button class="sp-icon-button" data-part="collapse" aria-label="Collapse sidebar">${icon('chevronLeft')}</button>
            <button class="sp-icon-button" data-part="expand" aria-label="Expand sidebar" hidden>${icon('chevronRight')}</button>
          </div>
          <nav aria-label="Sections">
            <ul class="sp-nav">${items}</ul>
          </nav>
          <div class="sp-row" data-part="footer" style="margin-top: auto; min-height: 28px">
            <span class="sp-avatar">MK</span>
            <span class="sp-label" data-part="label-account" style="white-space: nowrap">Mira K.</span>
          </div>
        </aside>
        <main class="sp-context sp-grow" style="padding: 14px 16px; background: var(--sp-sunken)">
          <span class="sp-heading">Inbox</span>
          <div class="sp-stack" style="margin-top: 12px">
            <div class="sp-line" style="width: 92%"></div>
            <div class="sp-line" style="width: 84%"></div>
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 62%"></div>
          </div>
        </main>
      </div>
    </div>
  `;

  const sidebar = part(root, 'sidebar');
  const collapse = part(root, 'collapse');
  const expand = part(root, 'expand');
  const labels = [part(root, 'label-brand'), part(root, 'label-account'), ...NAV.map(({ key }) => part(root, `label-${key}`))];

  const setMode = (mode: 'wide' | 'rail') => {
    const rail = mode === 'rail';
    sidebar.dataset.mode = mode;
    sidebar.style.width = `${rail ? RAIL : WIDE}px`;
    for (const label of labels) label.hidden = rail;
    collapse.hidden = rail;
    expand.hidden = !rail;
  };

  collapse.addEventListener('click', () => setMode('rail'));
  expand.addEventListener('click', () => setMode('wide'));
}
