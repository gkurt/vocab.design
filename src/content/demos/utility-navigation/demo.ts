import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/** The panel is one fixed box that every utility control fills, so opening one moves nothing. */
const PANEL_W = 214;
const PANEL_H = 132;
/**
 * Where the popover's arrow sits, stated rather than measured: the cluster is right
 * aligned against a fixed frame and every control in it is a fixed width, so the
 * distance from the panel's content edge to the cluster's centre is arithmetic.
 */
const ARROW_X = 89;

const PANELS: Record<string, { title: string; body: string }> = {
  search: {
    title: 'Search',
    body: `
      <input class="sp-input" data-part="search-input" style="width: 100%" value="" placeholder="Berth, dock, or rate" aria-label="Search" />
      <span class="sp-text" style="font-size: 12px">Searches the site, not orders.</span>`,
  },
  help: {
    title: 'Help',
    body: `
      <span class="sp-text sp-text--ink" style="font-size: 13px">Mooring guide</span>
      <span class="sp-text sp-text--ink" style="font-size: 13px">Contact the office</span>
      <span class="sp-text" style="font-size: 12px">Open 07:00 to 19:00.</span>`,
  },
  basket: {
    title: 'Basket',
    body: `
      <span class="sp-text sp-text--ink" style="font-size: 13px">Berth 2, two nights</span>
      <span class="sp-text sp-text--ink" style="font-size: 13px">Shore power, two nights</span>
      <span class="sp-text" style="font-size: 12px">Subtotal 180.00</span>`,
  },
  account: {
    title: 'Account',
    body: `
      <span class="sp-text sp-text--ink" style="font-size: 13px">Signed in as R. Okonjo</span>
      <span class="sp-text" style="font-size: 12px">Bookings and receipts.</span>
      <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="sign-out" style="align-self: flex-start">Sign out</button>`,
  },
};

/** Stand-in copy at hand-written widths, so every identify run draws the same page. */
const CARDS: [string, number][] = [
  ['Berth 1', 62],
  ['Berth 2', 74],
  ['Berth 3', 58],
  ['Berth 4', 69],
];

const card = ([label, width]: [string, number]) => `
  <span class="sp-surface" style="display: flex; flex-direction: column; justify-content: space-between; height: 62px; padding: 8px 9px">
    <span style="font-size: 12px; font-weight: 500">${label}</span>
    <span class="sp-line" style="width: ${width}%; height: 6px"></span>
  </span>`;

/**
 * Utility navigation specimen: a header carrying two navigation systems at once, so the
 * smaller right hand cluster can be told from the content links beside it.
 *
 * The subject is the utility cluster, not the strip it sits in and not the header: the
 * term names the group of controls, and the empty run of strip to its left is not part of
 * it. Everything else (the brand, the primary nav, the page below) is scenery in the
 * context register, which is also what makes the two navigation systems read as different
 * weights (SPEC §5).
 *
 * Every control opens its own panel by name rather than toggling one, and dismissal is an
 * explicit Close, so a script resumed at any point still reaches the state it asked for
 * (SPEC §8). The panel is one fixed box anchored over the page, so opening it never moves
 * the header or the content underneath.
 */
export function mount(root: HTMLElement): void {
  const navItem = (key: string, label: string, current = false) =>
    `<span class="sp-nav-item" data-part="nav-${key}"${current ? ' data-current' : ''}>${label}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div
          style="display: flex; justify-content: flex-end; flex: 0 0 auto; padding: 4px 12px;
                 background: var(--sp-sunken); border-bottom: 1px solid var(--sp-line)"
        >
          <div data-part="cluster" data-subject data-panel="none" style="display: flex; align-items: center; gap: 4px">
            <button class="sp-icon-button" type="button" data-part="util-search" aria-label="Search">${icon('search')}</button>
            <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="util-help" style="width: 46px; padding: 5px 0; font-size: 12px">Help</button>
            <button
              class="sp-button sp-button--quiet sp-button--sm"
              type="button"
              data-part="util-basket"
              style="display: inline-flex; align-items: center; justify-content: center; gap: 5px; width: 68px; padding: 5px 0; font-size: 12px"
            >
              Basket
              <span style="display: inline-flex; align-items: center; justify-content: center; min-width: 16px; height: 16px; padding: 0 4px;
                           border-radius: 999px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 10px; font-weight: 600">2</span>
            </button>
            <button class="sp-button sp-button--quiet sp-button--sm" type="button" data-part="util-account" style="width: 62px; padding: 5px 0; font-size: 12px">Account</button>
          </div>
        </div>

        <div class="sp-topbar sp-context" style="gap: 12px">
          <span class="sp-heading" style="flex: 0 0 auto; font-size: 14px">Harbour</span>
          <div class="sp-grow" style="display: flex; gap: 2px">
            ${navItem('berths', 'Berths', true)}${navItem('rates', 'Rates')}${navItem('guide', 'Guide')}
          </div>
        </div>

        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px; padding: 14px 12px">
          <span class="sp-label">Berths in Marina Bay</span>
          <div class="sp-grid" style="grid-template-columns: 1fr 1fr">${CARDS.map(card).join('')}</div>
        </div>

        <div
          class="sp-popover"
          data-part="panel"
          data-panel="none"
          style="top: 41px; right: 12px; width: ${PANEL_W}px; height: ${PANEL_H}px; padding: 10px; --sp-arrow-x: ${ARROW_X}px"
        >
          <div style="display: flex; align-items: center; gap: 8px; height: 22px">
            <span class="sp-label sp-grow" data-part="panel-title">Search</span>
            <button class="sp-icon-button" type="button" data-part="panel-close" aria-label="Close" style="width: 22px; height: 22px">${icon('close')}</button>
          </div>
          <div data-part="panel-body" style="display: flex; flex-direction: column; gap: 6px; height: 84px; margin-top: 6px"></div>
        </div>
      </div>
    </div>
  `;

  const cluster = part(root, 'cluster');
  const panel = part(root, 'panel');
  const title = part(root, 'panel-title');
  const body = part(root, 'panel-body');
  const triggers = Object.keys(PANELS).map((key) => [key, part(root, `util-${key}`)] as const);

  const close = () => {
    cluster.dataset.panel = 'none';
    panel.dataset.panel = 'none';
    flag(panel, 'data-open', false);
    for (const [, trigger] of triggers) flag(trigger, 'data-open', false);
  };

  const open = (key: string) => {
    const content = PANELS[key];
    if (!content) return;
    title.textContent = content.title;
    body.innerHTML = content.body;
    cluster.dataset.panel = key;
    panel.dataset.panel = key;
    flag(panel, 'data-open', true);
    for (const [name, trigger] of triggers) flag(trigger, 'data-open', name === key);
  };

  // Each control names its own panel, so a scripted step opens that panel rather than
  // flipping whatever the previous step left behind (SPEC §8).
  for (const [key, trigger] of triggers) trigger.addEventListener('click', () => open(key));
  part(root, 'panel-close').addEventListener('click', close);

  close();
}
