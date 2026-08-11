import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const DESTINATIONS = [
  { key: 'overview', label: 'Overview' },
  { key: 'berths', label: 'Berths' },
  { key: 'tides', label: 'Tides' },
] as const;

type Key = (typeof DESTINATIONS)[number]['key'];

const lines = (widths: number[]) => widths.map((w) => `<div class="sp-line" style="width: ${w}%"></div>`).join('');

/** Each destination renders a region of its own, so a swap really does replace the content. */
const VIEWS: Record<Key, string> = {
  overview: `
    <div data-part="view-overview">
      <span class="sp-heading">Overview</span>
      <div class="sp-row" style="gap: 8px; margin-top: 10px">
        <div class="sp-surface" style="flex: 1 1 0; padding: 8px 10px">
          <div class="sp-label">Occupied</div>
          <div class="sp-heading" style="margin-top: 2px">38</div>
        </div>
        <div class="sp-surface" style="flex: 1 1 0; padding: 8px 10px">
          <div class="sp-label">Free</div>
          <div class="sp-heading" style="margin-top: 2px">11</div>
        </div>
      </div>
      <div class="sp-stack" style="margin-top: 12px">${lines([92, 78, 84])}</div>
    </div>`,
  berths: `
    <div data-part="view-berths">
      <span class="sp-heading">Berths</span>
      <ul class="sp-list" style="margin-top: 6px">
        <li class="sp-list-item"><span class="sp-grow">A1 Kestrel</span><span class="sp-text">18 m</span></li>
        <li class="sp-list-item"><span class="sp-grow">A2 Marlin</span><span class="sp-text">12 m</span></li>
        <li class="sp-list-item"><span class="sp-grow">B4 Petrel</span><span class="sp-text">9 m</span></li>
        <li class="sp-list-item"><span class="sp-grow">C7 Gannet</span><span class="sp-text">22 m</span></li>
      </ul>
    </div>`,
  tides: `
    <div data-part="view-tides">
      <span class="sp-heading">Tides</span>
      <div class="sp-stack" style="margin-top: 10px; gap: 10px">
        <div class="sp-surface" style="padding: 9px 10px">
          <div class="sp-label">High water</div>
          <div class="sp-text sp-text--ink" style="margin-top: 2px">04:12 and 16:38</div>
        </div>
        <div class="sp-surface" style="padding: 9px 10px">
          <div class="sp-label">Low water</div>
          <div class="sp-text sp-text--ink" style="margin-top: 2px">10:25 and 22:51</div>
        </div>
      </div>
    </div>`,
};

/**
 * App shell specimen: a top bar, a navigation rail and a status footer that hold their
 * ground while the region between them is thrown away and rebuilt on every move.
 *
 * The subject is the shell frame rather than the whole scene, so identify still has
 * something to point at (SPEC §6). The content region sits inside it in the context
 * register, which is the claim exactly: the frame is the term, the view passing
 * through it is what the frame is not.
 *
 * Two things the shell publishes make persistence provable rather than merely
 * plausible. `data-loads` counts how many times the content region has been rebuilt,
 * and the footer's uptime keeps counting on the clock the stage handed this mount, so
 * a script (and a reader) can see the frame outliving the views it hosts.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const rail = DESTINATIONS.map(
    ({ key, label }) =>
      `<li><span class="sp-nav-item" data-part="nav-${key}"${key === 'overview' ? ' data-current' : ''}>${label}</span></li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="shell" data-subject data-view="overview" data-loads="1" style="height: 266px">
        <div class="sp-topbar" data-part="topbar">
          <span class="sp-heading sp-grow">Harbour office</span>
          <span class="sp-avatar">JK</span>
        </div>
        <div class="sp-row" style="flex: 1 1 auto; min-height: 0; gap: 0; align-items: stretch">
          <nav data-part="rail" aria-label="Sections" style="flex: 0 0 118px; padding: 10px 8px; border-right: 1px solid var(--sp-line)">
            <ul class="sp-nav">${rail}</ul>
          </nav>
          <main class="sp-context" data-part="view" style="flex: 1 1 auto; min-width: 0; padding: 12px; background: var(--sp-sunken); overflow: hidden">
            ${VIEWS.overview}
          </main>
        </div>
        <div class="sp-row sp-row--between" data-part="footer" style="flex: 0 0 auto; padding: 7px 12px; border-top: 1px solid var(--sp-line)">
          <span class="sp-label">Shell up <span data-part="uptime" style="display: inline-block; min-width: 30px; font-variant-numeric: tabular-nums">0:00</span></span>
          <span class="sp-label">views loaded <span data-part="loads" style="font-variant-numeric: tabular-nums">1</span></span>
        </div>
      </div>
    </div>
  `;

  const shell = part(root, 'shell');
  const view = part(root, 'view');
  const loads = part(root, 'loads');
  const uptime = part(root, 'uptime');
  const items = DESTINATIONS.map(({ key }) => [key, part(root, `nav-${key}`)] as const);

  // Each item names a destination, so a click lands on that destination rather than
  // stepping to the next one (SPEC §8).
  for (const [key, item] of items) {
    item.addEventListener('click', () => {
      if (shell.dataset.view === key) return;
      shell.dataset.view = key;
      shell.dataset.loads = String(Number(shell.dataset.loads) + 1);
      loads.textContent = shell.dataset.loads;
      view.innerHTML = VIEWS[key];
      for (const [, other] of items) flag(other, 'data-current', other === item);
    });
  }

  let seconds = 0;
  const tick = (): void => {
    seconds++;
    uptime.textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
    clock.setTimeout(tick, 1000);
  };
  clock.setTimeout(tick, 1000);
}
