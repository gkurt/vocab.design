import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'announced' | 'silent';
type Page = 'wallet' | 'statements';

const PAGES = {
  wallet: {
    heading: 'Wallet',
    title: 'Wallet · Ledger',
    path: 'app.example/wallet',
    body: 'Two accounts, one card, nothing due this week.',
  },
  statements: {
    heading: 'Statements',
    title: 'Statements · Ledger',
    path: 'app.example/statements',
    body: 'Eleven months of statements, newest first.',
  },
} as const satisfies Record<Page, unknown>;

const CAPTION = {
  announced:
    'The router does by hand what a page load did for free: the title is rewritten, the new heading takes focus, and the region posts where the reader has arrived.',
  silent:
    'The URL and the view changed and nothing was said. Focus is still on the link, and the title still names the page the reader left, so asking for it lies.',
} as const;

/**
 * Route announcement specimen: two client-side navigations, with a pick between announcing the
 * arrival and staying silent.
 *
 * This is the specimen that needs `demo: iframe` (SPEC §5-6). Its subject is what a route change
 * has to put right at document scope: `document.title`, and the element the document's focus is
 * moved to. A shadow root has neither, so inline the term could only have been mimed. Here the
 * title written is the real title of this specimen's own document, read back out of it rather than
 * printed from a variable, and the heading is a real focus target with `tabindex="-1"`.
 *
 * The subject is the live region's post, the element that carries the announcement: it exists only
 * when an arrival was actually announced, so every state it is on stage in is honest and no
 * `data-pose` is needed, and identify summons it out of the silent state (SPEC §6). The browser
 * chrome, the nav, the views, the two readouts and the caption are scenery.
 *
 * Real focus is moved only for a real reader's click (`isTrusted`); a scripted press paints the
 * kit's simulated ring instead, because attract mode never moves real focus (SPEC §7). No timers:
 * every state here is reached by a press.
 */
export function mount(root: HTMLElement): void {
  const doc = root.ownerDocument;

  const view = (page: Page) => `
    <div data-part="view-${page}" style="position: absolute; inset: 0; opacity: ${page === 'wallet' ? 1 : 0};
                                         transition: opacity 0.18s ease">
      <h2 class="sp-heading" data-part="heading-${page}" tabindex="-1"
          style="margin: 0; font-size: 14px; outline-offset: 3px">${PAGES[page].heading}</h2>
      <p class="sp-text sp-context" style="margin: 3px 0 0; font-size: 11px">${PAGES[page].body}</p>
    </div>`;

  const readout = (name: string, label: string, text: string) => `
    <div class="sp-row" style="gap: 8px; height: 17px">
      <span class="sp-label sp-context" style="flex: 0 0 auto; width: 96px; font-size: 10px">${label}</span>
      <span class="sp-text sp-text--ink" data-part="${name}"
            style="flex: 1 1 auto; min-width: 0; font-size: 11px; line-height: 17px; white-space: nowrap">${text}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Client-side route, no reload</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Announcement" data-part="mode" data-value="announced" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-announced" value="announced"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Announced</button>
            <button class="sp-segment" type="button" data-part="seg-silent" value="silent"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Silent</button>
          </sp-segmented>
        </div>

        <div class="sp-frame" style="margin-top: 8px; width: auto; height: 108px; overflow: hidden">
          <div class="sp-topbar sp-context" style="padding: 4px 10px">
            <span class="sp-label" data-part="url" data-page="wallet"
                  style="font-size: 10.5px">${PAGES.wallet.path}</span>
          </div>
          <div class="sp-nav sp-context" style="flex-direction: row; padding: 4px 8px; gap: 4px">
            <button class="sp-nav-item" type="button" data-part="nav-wallet" data-current
                    style="padding: 3px 10px; font-size: 11.5px">Wallet</button>
            <button class="sp-nav-item" type="button" data-part="nav-statements"
                    style="padding: 3px 10px; font-size: 11.5px">Statements</button>
          </div>
          <div style="position: relative; height: 44px; padding: 8px 10px 0">
            <div style="position: relative; height: 100%">
              ${view('wallet')}
              ${view('statements')}
            </div>
          </div>
        </div>

        <div class="sp-surface" style="margin-top: 8px; padding: 7px 10px">
          ${readout('title', 'document.title', PAGES.wallet.title)}
          ${readout('focus', 'Focus', 'On the nav, where the reader left it.')}
          <div class="sp-row" style="gap: 8px; height: 17px">
            <span class="sp-label sp-context" style="flex: 0 0 auto; width: 96px; font-size: 10px">Live region</span>
            <span style="position: relative; flex: 1 1 auto; min-width: 0; height: 17px">
              <span class="sp-text sp-context" data-part="empty"
                    style="position: absolute; inset: 0; font-size: 11px; line-height: 17px; white-space: nowrap">Nothing posted.</span>
              <span class="sp-text sp-text--ink" data-part="post" data-subject role="status" aria-live="polite"
                    style="position: absolute; inset: 0; font-size: 11px; line-height: 17px; white-space: nowrap;
                           opacity: 0; visibility: hidden; transition: opacity 0.18s, visibility 0.18s"></span>
            </span>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-mode="announced"
           style="margin: 8px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${CAPTION.announced}</p>
      </div>
    </div>
  `;

  const url = part(root, 'url');
  const titleOut = part(root, 'title');
  const focusOut = part(root, 'focus');
  const post = part(root, 'post');
  const empty = part(root, 'empty');
  const caption = part(root, 'caption');
  const views = { wallet: part(root, 'view-wallet'), statements: part(root, 'view-statements') };
  const headings = { wallet: part(root, 'heading-wallet'), statements: part(root, 'heading-statements') };
  const navs = { wallet: part(root, 'nav-wallet'), statements: part(root, 'nav-statements') };

  let mode: Mode = 'announced';

  const show = (el: HTMLElement, on: boolean) => {
    el.style.opacity = on ? '1' : '0';
    el.style.visibility = on ? 'visible' : 'hidden';
  };

  const go = (page: Page, trusted: boolean) => {
    for (const key of ['wallet', 'statements'] as const) {
      views[key].style.opacity = key === page ? '1' : '0';
      flag(navs[key], 'data-current', key === page);
    }
    url.dataset.page = page;
    url.textContent = PAGES[page].path;

    if (mode === 'silent') {
      // Nothing else happens, which is the whole of the failure: the title still names the page
      // that was left, and focus is still sitting on the link.
      flag(titleOut, 'data-stale', page !== 'wallet');
      focusOut.dataset.moved = 'no';
      focusOut.textContent = 'Unchanged. Still on the link that was clicked.';
      return;
    }

    // The real title of this specimen's own document, then read back out of it.
    doc.title = PAGES[page].title;
    titleOut.dataset.page = page;
    titleOut.textContent = doc.title;
    flag(titleOut, 'data-stale', false);
    focusOut.dataset.moved = 'yes';
    focusOut.textContent = `The “${PAGES[page].heading}” heading, tabindex -1.`;
    for (const key of ['wallet', 'statements'] as const) flag(headings[key], 'data-sim-focus', key === page);
    post.textContent = `“${PAGES[page].title}”`;
    show(post, true);
    show(empty, false);
    // Only a reader's own click moves real focus; a scripted one paints the simulated ring.
    if (trusted) headings[page].focus();
  };

  const apply = (next: Mode) => {
    mode = next;
    caption.dataset.mode = next;
    caption.textContent = CAPTION[next];
    for (const key of ['wallet', 'statements'] as const) {
      views[key].style.opacity = key === 'wallet' ? '1' : '0';
      flag(navs[key], 'data-current', key === 'wallet');
      flag(headings[key], 'data-sim-focus', false);
    }
    url.dataset.page = 'wallet';
    url.textContent = PAGES.wallet.path;
    doc.title = PAGES.wallet.title;
    titleOut.dataset.page = 'wallet';
    titleOut.textContent = doc.title;
    flag(titleOut, 'data-stale', false);
    focusOut.dataset.moved = 'none';
    focusOut.textContent = 'On the nav, where the reader left it.';
    show(post, false);
    show(empty, true);
  };

  for (const page of ['wallet', 'statements'] as const) {
    navs[page].addEventListener('click', (event) => go(page, event.isTrusted));
  }

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });

  apply('announced');
}
