import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const ROWS = [
  ['Harbour ferry pass', '4 Mar'],
  ['Bookbinder, Kew', '4 Mar'],
  ['Kaffa Roast', '3 Mar'],
  ['Hardware store', '2 Mar'],
  ['Paper mill', '1 Mar'],
  ['Cinema, late show', '28 Feb'],
  ['Kaffa Roast', '27 Feb'],
  ['Bookbinder, Kew', '26 Feb'],
  ['Harbour ferry pass', '25 Feb'],
  ['Paper mill', '24 Feb'],
  ['Kaffa Roast', '23 Feb'],
  ['Cinema, matinee', '22 Feb'],
  ['Hardware store', '21 Feb'],
  ['Harbour ferry pass', '20 Feb'],
];

/** Below this the scroller counts as at the top, where every behaviour shows the bar. */
const TOP_ZONE = 48;
/** A dead zone in each direction: a trackpad never travels one way for long. */
const DEAD = 2;

type Mode = 'sticky' | 'hide' | 'quick-return';

const NOTE: Record<Mode, string> = {
  sticky: 'A sticky bar never leaves, so its strip of the viewport is spent on every screen the reader will ever scroll past.',
  hide: 'A plain hiding bar leaves on the way down and returns only at the very top, so a reader who wants it has to throw away everything they scrolled through.',
  'quick-return':
    'The first upward flick brings the bar back where the reader is standing. The room it costs is only spent while they are moving away from it.',
};

const DEPTH = { top: 'At the top of the list', deep: 'Part way down the list' } as const;

/**
 * Quick return header specimen: one scroller whose bar is governed three ways. Sticky never
 * leaves. Hide on scroll leaves going down and comes back only at the top. Quick return
 * leaves going down and returns on the first upward scroll, from wherever the reader is,
 * which is the term and the whole of the difference.
 *
 * The subject is the bar, the narrowest element the term names: the list under it is the
 * scenery it hides from, and the picker and the read-out below the frame are apparatus. The
 * two comparison behaviours are counter-examples the subject itself passes through, so the
 * bar declares the quick return condition as a selector in `data-pose` and mounts there;
 * identify refuses to ring a bar that is currently being a sticky header (SPEC §6).
 *
 * The picker sits below the frame rather than in a topbar, because a second bar above the
 * one being demonstrated is the one piece of scenery this specimen cannot afford. The bar
 * leaves by transform and opacity together: translated alone it would still report a box
 * to the stage, and a ring drawn around a bar the reader cannot see is a false claim
 * (SPEC §8). Nothing reflows, since the bar is sticky and the rows never move (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const rows = ROWS.map(
    ([name, date]) => `
      <li class="sp-list-item">
        <span class="sp-grow">${name}</span>
        <span class="sp-text">${date}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 460px; height: 208px">
        <div class="sp-scroll" data-part="page" data-bar="rest" style="flex: 1 1 auto; position: relative">
          <div
            class="sp-row sp-row--between"
            data-part="header"
            data-subject
            data-pose="[data-behaviour=quick-return]"
            data-behaviour="quick-return"
            data-at="rest"
            style="position: sticky; top: 0; z-index: 1; padding: 9px 12px; background: var(--sp-surface); border-bottom: 1px solid var(--sp-line); transform: translateY(0); opacity: 1; transition: transform 0.22s var(--sp-ease), opacity 0.22s"
          >
            <span class="sp-heading" style="font-size: 14px">Statements</span>
            <span class="sp-row" style="gap: 6px">
              <span class="sp-label">Feb to Mar</span>
              <span class="sp-icon-button" style="cursor: default">${icon('search')}</span>
            </span>
          </div>
          <ul class="sp-list sp-context" data-part="rows" style="padding: 0 6px 14px">${rows}</ul>
        </div>
      </div>
      <div class="sp-row sp-row--between sp-context" style="width: 452px; gap: 12px">
        <span class="sp-label" data-part="depth" style="font-size: 11px; color: var(--sp-ink)">${DEPTH.top}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="quick-return" data-axis="Header" data-term="quick-return">
          <button class="sp-segment" type="button" data-part="mode-sticky" value="sticky" style="padding: 5px 9px; font-size: 12px">Sticky</button>
          <button class="sp-segment" type="button" data-part="mode-hide" value="hide" style="padding: 5px 9px; font-size: 12px">Hide on scroll</button>
          <button class="sp-segment" type="button" data-part="mode-quick" value="quick-return" style="padding: 5px 9px; font-size: 12px">Quick return</button>
        </sp-segmented>
      </div>
      <span class="sp-text sp-context" data-part="note" style="width: 452px; height: 32px; font-size: 11px">${NOTE['quick-return']}</span>
    </div>
  `;

  const page = part(root, 'page');
  const header = part(root, 'header');
  const depth = part(root, 'depth');
  const note = part(root, 'note');

  let mode: Mode = 'quick-return';
  let away = false;
  let last = 0;

  const apply = () => {
    header.dataset.at = away ? 'away' : 'rest';
    header.style.transform = away ? 'translateY(-100%)' : 'translateY(0)';
    header.style.opacity = away ? '0' : '1';
    // The bar's own state, mirrored onto the scroller: a bar that has left is invisible, and
    // an invisible element cannot carry a `visible` assert, so the claim rides the scroller
    // it left behind (SPEC §8).
    page.dataset.bar = away ? 'away' : 'rest';
  };

  page.addEventListener('scroll', () => {
    const y = page.scrollTop;
    const deep = y > TOP_ZONE;
    flag(page, 'data-deep', deep);
    depth.textContent = deep ? DEPTH.deep : DEPTH.top;
    if (mode === 'sticky') away = false;
    else if (mode === 'hide') away = deep;
    else if (!deep) away = false;
    else if (y > last + DEAD) away = true;
    else if (y < last - DEAD) away = false;
    last = y;
    apply();
  });

  part(root, 'mode').addEventListener('change', (event) => {
    mode = (event as CustomEvent<string>).detail as Mode;
    header.dataset.behaviour = mode;
    note.textContent = NOTE[mode];
    // A behaviour arrives with no gesture behind it, so it starts from its resting answer:
    // only the plain hiding bar is away while the reader is part way down.
    away = mode === 'hide' && page.scrollTop > TOP_ZONE;
    apply();
  });
}
