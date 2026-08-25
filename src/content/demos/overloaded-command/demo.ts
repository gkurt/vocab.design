import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const VIEWS = {
  brief: { title: 'Harbour brief', body: 'A document, opened from a link somebody sent this morning.' },
  dashboard: { title: 'Workspace dashboard', body: 'Every project the team has, most recently touched first.' },
  files: { title: 'Home folder', body: 'Your own files, the ones nobody else on the team can see.' },
} as const;

const DESTINATIONS = {
  none: 'Nothing pressed yet.',
  dashboard: 'Home in the toolbar went to the workspace dashboard.',
  files: 'Home in the sidebar went to your own files.',
} as const;

const NAV = [
  { key: 'home', label: 'Home', context: false },
  { key: 'shared', label: 'Shared', context: true },
  { key: 'recent', label: 'Recent', context: true },
] as const;

/**
 * Overloaded command specimen: one small workspace carrying the word Home twice, once
 * in the toolbar and once in the sidebar, wired to two different places. Pressing each
 * one moves the pane and names where it went, so the demonstration is the same label
 * producing two answers rather than any commentary about it.
 *
 * The subject is the toolbar's Home, ONE of the two peer instances, never the frame
 * holding both: accent on peer instances is itself the comparison, and ringing the
 * container would claim the whole application is the term (SPEC §5). The sidebar's Home
 * therefore keeps its ordinary paint too, since a peer dimmed into scenery would stop
 * being the other half of the collision; the app name, the other sidebar entries, the
 * pane and the readout are the scenery.
 *
 * Each press is an absolute pick rather than a toggle (SPEC §8): one sets the view to
 * the dashboard, the other to the files, so a pass resumed anywhere lands on the same
 * two outcomes. The pane and the readout hold their boxes in every state, so nothing
 * moves as the view changes (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const rail = NAV.map(
    ({ key, label, context }) => `<li><span class="sp-nav-item${context ? ' sp-context' : ''}" data-part="nav-${key}">${label}</span></li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar" style="padding: 8px 10px">
          <span class="sp-heading sp-grow sp-context" style="font-size: 13px">Meridian</span>
          <button class="sp-button sp-button--quiet sp-button--sm" data-part="bar-home" type="button" data-subject>Home</button>
          <button class="sp-icon-button sp-context" data-part="bar-search" type="button" aria-label="Search">${icon('search')}</button>
        </div>
        <div class="sp-row" style="flex: 1 1 auto; min-height: 0; gap: 0; align-items: stretch">
          <nav aria-label="Sections" style="flex: 0 0 116px; padding: 10px 8px; border-right: 1px solid var(--sp-line)">
            <ul class="sp-nav">${rail}</ul>
          </nav>
          <main class="sp-context" data-part="view" data-view="brief"
            style="flex: 1 1 auto; min-width: 0; padding: 12px; background: var(--sp-sunken); overflow: hidden">
            <span class="sp-heading" data-part="view-title" style="display: block; height: 22px; font-size: 14px">${VIEWS.brief.title}</span>
            <span class="sp-text" data-part="view-body" style="display: block; height: 36px; margin-top: 6px; font-size: 12px">
              ${VIEWS.brief.body}
            </span>
            <div class="sp-stack" style="margin-top: 12px; gap: 7px">
              <span class="sp-line" style="width: 100%"></span>
              <span class="sp-line" style="width: 84%"></span>
              <span class="sp-line" style="width: 62%"></span>
            </div>
          </main>
        </div>
        <div class="sp-row" style="flex: 0 0 auto; height: 32px; padding: 0 12px; border-top: 1px solid var(--sp-line)">
          <span class="sp-label sp-context" data-part="dest" data-where="none" role="status"
            style="font-size: 11px; white-space: nowrap">${DESTINATIONS.none}</span>
        </div>
      </div>
      <span class="sp-text sp-context" style="width: 440px; height: 16px; font-size: 11px">
        The same word in two places, wired to two different destinations.
      </span>
    </div>
  `;

  const view = part(root, 'view');
  const title = part(root, 'view-title');
  const body = part(root, 'view-body');
  const dest = part(root, 'dest');

  const go = (where: 'dashboard' | 'files') => {
    view.dataset.view = where;
    title.textContent = VIEWS[where].title;
    body.textContent = VIEWS[where].body;
    dest.dataset.where = where;
    dest.textContent = DESTINATIONS[where];
  };

  part(root, 'bar-home').addEventListener('click', () => go('dashboard'));
  part(root, 'nav-home').addEventListener('click', () => go('files'));
}
