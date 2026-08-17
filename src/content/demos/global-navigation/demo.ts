import { part } from '#src/kit/parts.ts';

type Destination = { key: string; label: string; blurb: string; local: string[] };

/** Four destinations, on every screen, in this order, forever. That is what makes them global. */
const DESTINATIONS: Destination[] = [
  { key: 'home', label: 'Home', blurb: 'Today', local: ['Activity', 'Pinned'] },
  { key: 'library', label: 'Library', blurb: 'Library', local: ['Vessels', 'Charts', 'Tags'] },
  { key: 'reports', label: 'Reports', blurb: 'Reports', local: ['Weekly', 'Exports'] },
  { key: 'settings', label: 'Settings', blurb: 'Settings', local: ['Profile', 'Access'] },
];

const LINES = [96, 88, 72, 91, 64];

/**
 * Global navigation specimen: a top bar of four destinations that never changes, over a
 * pane whose own section links change every time one of them is chosen.
 *
 * The subject is the bar, not the shell: the term names this strip of destinations and the
 * claim that it is the same strip everywhere. Everything below it is the scene the bar
 * outlives, so the pane wears the context register and its section links stay quiet
 * (SPEC §5). Those links are the demonstration's other half: the global row is byte for
 * byte identical across all four picks while the local row is rebuilt on each one, which is
 * the difference between the two words drawn rather than asserted.
 *
 * Each destination is an absolute pick rather than a step through a list (SPEC §8), and the
 * pane's rows are a fixed set at fixed widths, so choosing one never resizes anything.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 444px; height: 288px">
        <nav
          class="sp-topbar"
          data-part="global"
          data-subject
          data-current="home"
          aria-label="Site"
          style="gap: 14px; padding: 9px 12px"
        >
          <span class="sp-row" style="gap: 7px; flex: 0 0 auto">
            <span class="sp-swatch" style="width: 18px; height: 18px; --sp-swatch: var(--sp-accent)"></span>
            <span class="sp-heading" style="font-size: 13px">Harbour</span>
          </span>
          <span class="sp-row sp-grow" style="gap: 2px">
            ${DESTINATIONS.map(
              (d) => `<span class="sp-nav-item" role="link" data-part="nav-${d.key}" data-key="${d.key}">${d.label}</span>`,
            ).join('')}
          </span>
          <span class="sp-avatar" style="width: 24px; height: 24px; font-size: 10px">RN</span>
        </nav>
        <div class="sp-body sp-context" style="padding: 12px">
          <div class="sp-surface" style="display: flex; flex-direction: column; height: 100%; overflow: hidden">
            <div class="sp-row" data-part="local" style="gap: 3px; flex: 0 0 auto; padding: 7px 10px; border-bottom: 1px solid var(--sp-line)"></div>
            <div class="sp-stack" style="flex: 1 1 auto; gap: 10px; padding: 12px 14px">
              <span class="sp-heading" data-part="pane-title" style="font-size: 14px">Today</span>
              ${LINES.map((w) => `<div class="sp-line" style="flex: 0 0 auto; width: ${w}%"></div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const bar = part(root, 'global');
  const local = part(root, 'local');
  const title = part(root, 'pane-title');
  const items = DESTINATIONS.map((d) => part(root, `nav-${d.key}`));

  const apply = (key: string) => {
    const destination = DESTINATIONS.find((d) => d.key === key);
    if (!destination) return;
    bar.dataset.current = key;
    for (const item of items) {
      if (item.dataset.key === key) item.setAttribute('data-current', '');
      else item.removeAttribute('data-current');
    }
    title.textContent = destination.blurb;
    // The section links are rebuilt with the section: local navigation is what changes
    // when global navigation does not.
    local.innerHTML = destination.local
      .map(
        (name, i) =>
          `<span class="sp-nav-item" role="link" data-part="tab-${name.toLowerCase()}" style="font-size: 12px; padding: 4px 8px" ${i === 0 ? 'data-current' : ''}>${name}</span>`,
      )
      .join('');
  };

  for (const item of items) item.addEventListener('click', () => apply(item.dataset.key ?? 'home'));

  apply('home');
}
