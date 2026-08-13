import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const PAGES = [
  { key: 'overview', label: 'Overview' },
  { key: 'invoices', label: 'Invoices' },
  { key: 'members', label: 'Members' },
  { key: 'settings', label: 'Settings' },
] as const;

type PageKey = (typeof PAGES)[number]['key'];

const START: PageKey = 'overview';

function item({ key, label }: { key: string; label: string }): string {
  return `
    <li>
      <span class="sp-nav-item" data-part="nav-${key}" data-page="${key}" role="link" tabindex="0"
            style="display: flex; align-items: center; gap: 8px">
        <span data-part="bar-${key}" aria-hidden="true"
              style="flex: 0 0 auto; width: 3px; height: 13px; border-radius: 2px; background: var(--sp-accent); visibility: hidden"></span>
        <span>${label}</span>
      </span>
    </li>`;
}

/**
 * Current page indicator specimen: a sidebar where the page being viewed is marked three
 * ways at once, with `aria-current="page"` for the reader's software, a weight change and a
 * left bar for everyone else. The greyscale state is the review that matters: with the hue
 * gone, the bar and the weight still say which item you are on, and the tinted background
 * on its own would not have.
 *
 * The subject is the marked item, and it travels with the marking rather than staying on the
 * item that happened to be current at mount: the term names the marking, so the honest
 * subject is wherever it currently is. Exactly one exists at every moment (SPEC §5). The
 * page pane, the reader strip, and the review control are scenery.
 *
 * Every item reserves the bar's room whether it shows one or not, so marking moves nothing
 * (SPEC §5). Each pick reaches an absolute page and each segment its own review, so a pass
 * joined halfway demonstrates the same thing (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 198px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading" style="font-size: 14px">Ledger</span>
        </div>
        <div class="sp-row" style="flex: 1 1 auto; min-height: 0; align-items: stretch; gap: 0">
          <nav data-part="navlist" data-review="colour" aria-label="Sections"
               style="flex: 0 0 auto; width: 148px; padding: 10px; border-right: 1px solid var(--sp-line)">
            <ul class="sp-nav">${PAGES.map(item).join('')}</ul>
          </nav>
          <div class="sp-body sp-context sp-grow">
            <span class="sp-heading" data-part="pane-title" style="font-size: 14px">Overview</span>
            <div class="sp-stack" style="margin-top: 10px; gap: 7px">
              <span class="sp-line" style="width: 88%"></span>
              <span class="sp-line" style="width: 74%"></span>
              <span class="sp-line" style="width: 81%"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="sp-surface sp-context" style="width: 460px; padding: 8px 10px">
        <div class="sp-row sp-row--between" style="height: 20px">
          <span class="sp-label">Screen reader</span>
          <span class="sp-text sp-text--ink" data-part="heard" data-page="${START}"
                style="font-size: 12px; white-space: nowrap">“Overview, current page, link”</span>
        </div>
        <div class="sp-row sp-row--between" style="margin-top: 6px">
          <span class="sp-label">Colour-only review</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="colour">
            <button class="sp-segment" data-part="seg-colour" value="colour">Colour</button>
            <button class="sp-segment" data-part="seg-grey" value="grey">Greyscale</button>
          </sp-segmented>
        </div>
      </div>
    </div>
  `;

  const navlist = part(root, 'navlist');
  const paneTitle = part(root, 'pane-title');
  const heard = part(root, 'heard');

  const select = (key: PageKey) => {
    const page = PAGES.find((p) => p.key === key) ?? PAGES[0];
    for (const { key: other, label } of PAGES) {
      const el = part(root, `nav-${other}`);
      const current = other === page.key;
      flag(el, 'data-current', current);
      flag(el, 'data-subject', current);
      if (current) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
      el.style.fontWeight = current ? '600' : '';
      part(root, `bar-${other}`).style.visibility = current ? 'visible' : 'hidden';
      if (current) heard.textContent = `“${label}, current page, link”`;
    }
    heard.dataset.page = page.key;
    paneTitle.textContent = page.label;
  };

  select(START);

  for (const { key } of PAGES) {
    part(root, `nav-${key}`).addEventListener('click', () => select(key));
  }

  // The review is a simulation and says so in its own label: nothing here reads a real
  // vision setting, it just takes the hue away so the shape has to carry the marking.
  part(root, 'segmented').addEventListener('change', (event) => {
    const grey = (event as CustomEvent<string>).detail === 'grey';
    navlist.dataset.review = grey ? 'grey' : 'colour';
    navlist.style.filter = grey ? 'grayscale(1)' : '';
  });
}
