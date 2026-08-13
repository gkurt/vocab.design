import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

type PageKey = 'inbox' | 'settings' | 'archive';

const PAGES: { key: PageKey; label: string; blurb: string }[] = [
  { key: 'inbox', label: 'Inbox', blurb: '12 conversations' },
  { key: 'settings', label: 'Settings', blurb: 'Signature, filters, forwarding' },
  { key: 'archive', label: 'Archive', blurb: 'Everything older than a year' },
];

const SITE = 'Mail';
const DELIVERY_MS = 1400;
const ARRIVING = 2;

/**
 * Page title specimen: a browser tab watched while somebody moves around the app behind it.
 * The tab is the only place the page's name exists once the window is not the one you are
 * looking at, so the title carries the page first and the product last, and it picks up the
 * unread count when two messages land while the reader is on another screen.
 *
 * The subject is the title text in the tab, and nothing wider. The tab pill, the browser
 * frame, the navigation, the page pane, and the announcement strip are all scenery: the term
 * names the string, not the chrome that displays it, and the string is the narrowest element
 * on stage that is it (SPEC §5).
 *
 * The delivery is scheduled on the clock the stage handed this mount, so a pose freezes it
 * rather than letting a message arrive under an inspection (SPEC §6). The tab holds one
 * width and the unread badge's room is reserved in the navigation, so neither the arrival nor
 * a navigation moves anything (SPEC §5). Every navigation reaches an absolute page, and
 * opening the inbox clears the count, so the pass ends where it began (SPEC §8).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 216px">
        <div class="sp-topbar" style="gap: 6px; padding: 8px 10px; background: var(--sp-sunken)">
          <div class="sp-surface" data-part="tab"
               style="display: flex; align-items: center; gap: 8px; width: 176px; padding: 5px 9px">
            <span aria-hidden="true" style="flex: 0 0 auto; width: 8px; height: 8px; border-radius: 2px; background: var(--sp-accent)"></span>
            <span class="sp-text sp-text--ink" data-part="tab-title" data-subject data-page="inbox"
                  style="font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">Inbox, ${SITE}</span>
          </div>
          <div class="sp-surface sp-context"
               style="display: flex; align-items: center; gap: 8px; width: 122px; padding: 5px 9px; opacity: 0.7">
            <span aria-hidden="true" style="flex: 0 0 auto; width: 8px; height: 8px; border-radius: 2px; background: var(--sp-muted)"></span>
            <span class="sp-text" style="font-size: 12px; white-space: nowrap">Notes, Studio</span>
          </div>
        </div>

        <div class="sp-row sp-context" style="flex: 1 1 auto; min-height: 0; align-items: stretch; gap: 0">
          <nav aria-label="Mail" style="flex: 0 0 auto; width: 140px; padding: 10px; border-right: 1px solid var(--sp-line)">
            <ul class="sp-nav">
              ${PAGES.map(
                ({ key, label }) => `
                <li>
                  <span class="sp-nav-item" data-part="nav-${key}" role="link" tabindex="0"
                        style="display: flex; align-items: center; justify-content: space-between; gap: 8px">
                    <span>${label}</span>
                    <span data-part="badge-${key}" style="visibility: hidden; font-size: 11px; font-weight: 600">${ARRIVING}</span>
                  </span>
                </li>`,
              ).join('')}
            </ul>
          </nav>
          <div class="sp-body sp-grow">
            <span class="sp-heading" data-part="pane-title" style="font-size: 14px">Inbox</span>
            <p class="sp-text" data-part="pane-blurb" style="margin: 3px 0 0; font-size: 12px">12 conversations</p>
            <div class="sp-stack" style="margin-top: 10px; gap: 7px">
              <span class="sp-line" style="width: 86%"></span>
              <span class="sp-line" style="width: 72%"></span>
              <span class="sp-line" style="width: 79%"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="sp-surface sp-context" style="width: 460px; padding: 8px 10px">
        <div class="sp-row sp-row--between" style="height: 18px">
          <span class="sp-label">Spoken first on arrival</span>
          <span class="sp-text sp-text--ink" data-part="heard" style="font-size: 12px; white-space: nowrap"></span>
        </div>
      </div>
    </div>
  `;

  const tabTitle = part(root, 'tab-title');
  const paneTitle = part(root, 'pane-title');
  const paneBlurb = part(root, 'pane-blurb');
  const heard = part(root, 'heard');

  let page: PageKey = 'inbox';
  let unread = 0;
  let delivery: number | undefined;

  const render = () => {
    const current = PAGES.find((p) => p.key === page) ?? PAGES[0];
    const label = current?.label ?? 'Inbox';
    const title = `${unread > 0 ? `(${unread}) ` : ''}${label}, ${SITE}`;
    tabTitle.textContent = title;
    tabTitle.dataset.page = page;
    flag(tabTitle, 'data-unread', unread > 0);
    heard.textContent = `“${title}”`;
    paneTitle.textContent = label;
    paneBlurb.textContent = current?.blurb ?? '';
    for (const { key } of PAGES) {
      flag(part(root, `nav-${key}`), 'data-current', key === page);
      part(root, `badge-${key}`).style.visibility = key === 'inbox' && unread > 0 ? 'visible' : 'hidden';
    }
  };

  const go = (key: PageKey) => {
    page = key;
    // Opening the inbox is what reads the messages, so the count leaves the title there
    // and nowhere else.
    if (key === 'inbox') unread = 0;
    else {
      clock.clearTimeout(delivery);
      delivery = clock.setTimeout(() => {
        unread = ARRIVING;
        render();
      }, DELIVERY_MS);
    }
    render();
  };

  render();

  for (const { key } of PAGES) {
    part(root, `nav-${key}`).addEventListener('click', () => go(key));
  }
}
