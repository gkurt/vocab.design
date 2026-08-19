import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Page = 'home' | 'plans' | 'cart';
type Policy = 'consistent' | 'wandering';
type Slot = 'bar' | 'footer' | 'float';

const PAGES: { key: Page; label: string; title: string }[] = [
  { key: 'home', label: 'Home', title: 'Welcome back' },
  { key: 'plans', label: 'Plans', title: 'Choose a plan' },
  { key: 'cart', label: 'Cart', title: 'Your basket' },
];

/** Where the help control lands, per policy and page. Consistent means one answer. */
const WHERE: Record<Policy, Record<Page, Slot>> = {
  consistent: { home: 'bar', plans: 'bar', cart: 'bar' },
  wandering: { home: 'bar', plans: 'footer', cart: 'float' },
};

const SITS_IN: Record<Slot, string> = {
  bar: 'the header, last item',
  footer: 'the footer, last item',
  float: 'floating over the page',
};

const VERDICT: Record<Policy, string> = { consistent: 'Meets 3.2.6', wandering: 'Fails 3.2.6' };

const CAPTION: Record<Policy, string> = {
  consistent:
    'Help holds its place in the header from page to page, so finding it once is finding it for good. The rule asks for the same relative order, not the same pixels.',
  wandering:
    'Header, then footer, then floating over the content. Every page starts the search again, which is the cost criterion 3.2.6 exists to remove.',
};

/** Every slot reserves the control's room, so moving it cannot move anything else. */
const SLOT = 'width: 64px; height: 22px; display: flex; align-items: center; justify-content: flex-end; flex: 0 0 auto';

/**
 * Consistent help specimen: one site, three pages, and a policy picker that either keeps the
 * help control in the header on every page or moves it to the footer and then out over the
 * content. Only the page title and the current nav item change with the page, so the one thing
 * a reader sees move is the thing the criterion is about.
 *
 * The subject is the help control itself, the narrowest element the term names. The page
 * silhouette, the pickers, the readout and the caption are scenery (SPEC §5), marked on the
 * individual scenery elements rather than on a wrapper, since the context register would
 * otherwise reach through the frame and quiet the subject sitting inside it. A wandering help
 * route is a state the control itself passes through, so the honest condition is declared in
 * `data-pose` and the mount state satisfies it (SPEC §6).
 *
 * All three slots reserve the same box whether or not they hold the control, so a page change
 * moves nothing but the control (SPEC §5), which in a specimen about position is the whole
 * point. No timer is needed.
 */
export function mount(root: HTMLElement): void {
  const navItem = (page: { key: Page; label: string }) => `
    <span class="sp-nav-item" data-part="nav-${page.key}" ${page.key === 'home' ? 'data-current' : ''}
          style="font-size: 11px; padding: 3px 8px; cursor: default">${page.label}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between" style="gap: 10px">
          <div class="sp-row sp-context" style="gap: 8px; flex: 0 0 auto">
            <span class="sp-label">Page</span>
            <sp-segmented class="sp-segmented" data-part="page-picker" data-value="home">
              ${PAGES.map(
                (page) => `
                <button class="sp-segment" type="button" data-part="seg-${page.key}" value="${page.key}"
                        style="padding: 4px 9px; font-size: 11.5px">${page.label}</button>`,
              ).join('')}
            </sp-segmented>
          </div>
          <sp-segmented class="sp-segmented sp-context" data-part="policy-picker" data-value="consistent">
            <button class="sp-segment" type="button" data-part="seg-consistent" value="consistent"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Consistent</button>
            <button class="sp-segment" type="button" data-part="seg-wandering" value="wandering"
                    style="padding: 4px 9px; font-size: 11.5px; white-space: nowrap">Wandering</button>
          </sp-segmented>
        </div>

        <div class="sp-frame" data-part="site" style="margin-top: 10px; width: 424px; height: 140px">
          <div class="sp-topbar" style="padding: 8px 12px">
            <span class="sp-heading sp-context" style="font-size: 12px; flex: 0 0 auto">Northwind</span>
            <div class="sp-row sp-grow sp-context" style="gap: 2px">
              ${PAGES.map(navItem).join('')}
            </div>
            <div data-part="slot-bar" style="${SLOT}"></div>
          </div>

          <div class="sp-body" style="position: relative; padding: 10px 12px">
            <span class="sp-heading sp-context" data-part="title" data-page="home" style="font-size: 12px">${PAGES[0]?.title}</span>
            <div class="sp-stack sp-context" style="margin-top: 9px; gap: 7px">
              <div class="sp-line" style="width: 88%"></div>
              <div class="sp-line" style="width: 64%"></div>
            </div>
            <div data-part="slot-float" style="${SLOT}; position: absolute; right: 12px; bottom: 8px"></div>
          </div>

          <div class="sp-row sp-row--between"
               style="flex: 0 0 auto; height: 34px; padding: 0 12px; border-top: 1px solid var(--sp-line)">
            <div class="sp-row sp-context" style="gap: 12px; flex: 0 0 auto">
              <span class="sp-label" style="font-size: 10px">Terms</span>
              <span class="sp-label" style="font-size: 10px">Privacy</span>
            </div>
            <div data-part="slot-footer" style="${SLOT}"></div>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Help sits in <span data-part="sits" data-slot="bar"
                style="color: var(--sp-ink); font-weight: 500">${SITS_IN.bar}</span></span>
          <span class="sp-text sp-text--ink" data-part="verdict" data-policy="consistent"
                style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">${VERDICT.consistent}</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-policy="consistent"
           style="margin: 7px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${CAPTION.consistent}</p>
      </div>
    </div>
  `;

  // The control is one element that moves between slots, never three copies: a specimen has
  // exactly one subject, and the term is about this control being the same control.
  const help = root.ownerDocument.createElement('button');
  help.className = 'sp-chip';
  help.type = 'button';
  help.textContent = 'Help';
  help.dataset.part = 'help';
  help.dataset.where = 'bar';
  help.dataset.policy = 'consistent';
  help.setAttribute('data-subject', '');
  help.setAttribute('data-pose', '[data-policy=consistent]');
  help.style.cssText = 'font-size: 10.5px; padding: 3px 9px; cursor: default';

  const title = part(root, 'title');
  const sits = part(root, 'sits');
  const verdict = part(root, 'verdict');
  const caption = part(root, 'caption');

  let page: Page = 'home';
  let policy: Policy = 'consistent';

  const apply = () => {
    const slot = WHERE[policy][page];
    part(root, `slot-${slot}`).append(help);
    help.dataset.where = slot;
    help.dataset.policy = policy;

    const current = PAGES.find((item) => item.key === page) ?? PAGES[0];
    title.dataset.page = page;
    title.textContent = current?.title ?? '';
    for (const item of PAGES) {
      const nav = part(root, `nav-${item.key}`);
      if (item.key === page) nav.setAttribute('data-current', '');
      else nav.removeAttribute('data-current');
    }

    sits.dataset.slot = slot;
    sits.textContent = SITS_IN[slot];
    verdict.dataset.policy = policy;
    verdict.textContent = VERDICT[policy];
    caption.dataset.policy = policy;
    caption.textContent = CAPTION[policy];
  };

  part(root, 'page-picker').addEventListener('change', (event) => {
    page = (event as CustomEvent<string>).detail as Page;
    apply();
  });

  part(root, 'policy-picker').addEventListener('change', (event) => {
    policy = (event as CustomEvent<string>).detail as Policy;
    apply();
  });

  apply();
}
