import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Ranked, not merely ordered: the cut is always made from the bottom of this list. */
const ITEMS = ['Overview', 'Orders', 'Stock', 'Reports', 'Settings'] as const;

const ITEM_W = 76;
const MORE_W = 70;
const NAV_PAD = 10;

const WIDTHS = { wide: 434, medium: 302, narrow: 196 } as const;

type Size = keyof typeof WIDTHS;

const NOTE = {
  wide: 'Everything fits, so nothing is hidden and there is no More control at all.',
  medium: 'Two of five fit. Ranks three to five moved into More, in that order.',
  narrow: 'One fits. The top priority keeps the bar and the rest are one press away.',
} as const;

const BADGE = [
  'display: inline-flex',
  'align-items: center',
  'justify-content: center',
  'flex: 0 0 auto',
  'width: 14px',
  'height: 14px',
  'border-radius: 50%',
  'background: var(--sp-sunken)',
  'font-size: 9px',
  'font-weight: 600',
].join('; ');

const IN_BAR = `flex: 0 0 ${ITEM_W}px; display: flex; align-items: center; gap: 5px; padding: 6px; font-size: 11px`;
const IN_MENU = 'display: flex; align-items: center; gap: 6px; width: 100%; padding: 6px 8px; font-size: 12px';

/** How many items survive at this width: all of them, or as many as fit beside More. */
function survivors(width: number): number {
  const room = width - NAV_PAD * 2;
  if (ITEMS.length * ITEM_W <= room) return ITEMS.length;
  return Math.max(1, Math.floor((room - MORE_W) / ITEM_W));
}

/**
 * Priority plus navigation specimen: one ranked nav inside a window whose width the
 * segmented control sets. The count is worked out from the width every time rather than
 * looked up, which is what the pattern actually does, and the items that do not survive are
 * the same elements re-homed into the More menu in the same rank order. Choosing a page in
 * the menu lights the current item, and lights More itself when the current page has fallen
 * into the overflow.
 *
 * The subject is the nav bar (SPEC §5). The window around it, the page under it, the width
 * read-out and the note row are scenery. No `data-pose`: the bar is a priority plus nav at
 * every width, including the widest, where the rule's answer happens to be "all of them".
 *
 * The window is anchored to the left of a frame that never changes size, and the page below
 * the bar holds its own height, so a width change moves only the window's own right edge
 * (SPEC §5). The menu is opened by More and left by choosing a page, never by a toggle
 * (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 224px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Kestrel Supply</span>
          <span class="sp-label" data-part="width-label" style="font-size: 11px">Window 434px</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px; align-items: flex-start">

          <div class="sp-surface" data-part="window" style="flex: 0 0 auto; width: ${WIDTHS.wide}px; height: 140px">

            <div
              class="sp-row"
              data-part="nav"
              data-subject
              data-visible="5"
              style="position: relative; height: 40px; gap: 0; padding: 0 ${NAV_PAD}px; border-bottom: 1px solid var(--sp-line)"
            >
              <span data-part="bar" style="display: flex; align-items: center; gap: 0; min-width: 0"></span>
              <button class="sp-button sp-button--quiet sp-button--sm" data-part="more" type="button"
                      style="flex: 0 0 ${MORE_W}px; margin-left: auto; display: flex; align-items: center; justify-content: center; gap: 4px; padding: 6px; font-size: 11px">
                More ${icon('chevronDown')}
              </button>
              <div class="sp-menu" data-part="menu" role="menu" aria-label="More pages"
                   style="top: 36px; right: 6px; min-width: 148px"></div>
            </div>

            <div class="sp-context sp-stack" style="gap: 8px; padding: 12px">
              <span class="sp-heading" data-part="page-title" style="font-size: 13px">Overview</span>
              <span class="sp-line" style="width: 88%"></span>
              <span class="sp-line" style="width: 74%"></span>
              <span class="sp-line" style="width: 81%"></span>
            </div>

          </div>

        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-part="note" style="width: 262px; height: 34px; font-size: 11px">${NOTE.wide}</span>
        <sp-segmented class="sp-segmented" data-part="pick" data-axis="Width" data-value="wide">
          <button class="sp-segment" data-part="pick-wide" value="wide" style="padding: 5px 9px; font-size: 12px">Wide</button>
          <button class="sp-segment" data-part="pick-medium" value="medium" style="padding: 5px 9px; font-size: 12px">Medium</button>
          <button class="sp-segment" data-part="pick-narrow" value="narrow" style="padding: 5px 9px; font-size: 12px">Narrow</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const frame = part(root, 'window');
  const nav = part(root, 'nav');
  const bar = part(root, 'bar');
  const menu = part(root, 'menu');
  const more = part(root, 'more');
  const widthLabel = part(root, 'width-label');
  const pageTitle = part(root, 'page-title');
  const note = part(root, 'note');

  /** The same five elements all the way through: what changes is which side of the cut they land on. */
  const links = ITEMS.map((label, index) => {
    // Spans, not buttons: `.sp-nav-item` is the kit's link register and a UA button would
    // arrive carrying its own border and fill, which no inline style could remove without
    // also cancelling the current-page background the class provides.
    const link = document.createElement('span');
    link.className = 'sp-nav-item';
    link.dataset.part = `item-${index + 1}`;
    link.dataset.rank = String(index + 1);
    link.innerHTML = `<span style="${BADGE}">${index + 1}</span><span class="sp-grow" style="min-width: 0; text-align: left">${label}</span>`;
    return link;
  });

  let current = 0;
  let size: Size = 'wide';

  const show = () => {
    const width = WIDTHS[size];
    const visible = survivors(width);
    frame.style.width = `${width}px`;
    widthLabel.textContent = `Window ${width}px`;
    nav.dataset.visible = String(visible);
    links.forEach((link, index) => {
      const onBar = index < visible;
      link.setAttribute('style', onBar ? IN_BAR : IN_MENU);
      (onBar ? bar : menu).append(link);
      flag(link, 'data-current', index === current);
    });
    more.hidden = visible === ITEMS.length;
    flag(more, 'data-current', current >= visible);
    flag(menu, 'data-open', false);
    flag(more, 'data-open', false);
    pageTitle.textContent = ITEMS[current] ?? ITEMS[0];
    note.textContent = NOTE[size];
  };

  // More only ever opens the menu and a page choice only ever closes it, so a pass resumed
  // anywhere reaches the state its step names (SPEC §8).
  more.addEventListener('click', () => {
    flag(menu, 'data-open', true);
    flag(more, 'data-open', true);
  });

  links.forEach((link, index) => {
    link.addEventListener('click', () => {
      current = index;
      show();
    });
  });

  part(root, 'pick').addEventListener('change', (event) => {
    size = (event as CustomEvent<string>).detail as Size;
    show();
  });

  show();
}
