import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'none' | 'fine' | 'labelled';

const NOTE: Record<Mode, string> = {
  none: 'The middle card is an advertisement. Nothing in its type, its layout or its byline says so, and that resemblance is the thing being sold.',
  fine: 'Now there is a disclosure: eight pixels, grey on grey, at the end of a line nobody reads. It exists for the compliance review, not for the reader.',
  labelled:
    'A disclosure that works costs contrast, position and a name. The label comes first, the card stops matching the column, and the advertiser sits where the publisher would.',
};

/** The label itself: the same words at three levels of legibility. */
const BADGE =
  '<span data-part="badge" style="display: inline-flex; align-items: center; padding: 1px 7px; border-radius: 999px; background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 10px; font-weight: 600">Sponsored</span>';

/** The advertisement's byline, which is the whole of what changes between the three states. */
const BYLINE: Record<Mode, string> = {
  none: '<span class="sp-text" style="font-size: 11px">Kew Review · 3 min read</span>',
  fine: '<span class="sp-text" style="font-size: 11px">Kew Review · 3 min read<span data-part="fine-print" style="font-size: 8px"> · sponsored</span></span>',
  labelled: `${BADGE}<span class="sp-text" style="font-size: 11px">Paid post by Verso Tools</span>`,
};

const STORIES = [
  { byline: 'The Ferry Post · 4 min read', title: 'Ferry timetable changes from Monday' },
  { byline: 'The Ferry Post · 6 min read', title: 'Kew paper mill reopens its yard to visitors' },
];

const START: Mode = 'none';

/**
 * Disguised ad specimen: a three card feed whose middle card is an advertisement, drawn
 * with no disclosure, then with the disclosure it usually ships with (eight grey pixels at
 * the end of the byline), then with one a reader can act on. The two stories around it never
 * change, which is the point: a disguise is a resemblance, so it is made of the neighbours
 * as much as of the ad.
 *
 * The subject is the ad card, the narrowest element the term names, and the feed around it
 * is the scenery it hides in. The honest state is a counter-example the subject itself
 * passes through, so the card declares the disguised condition in `data-pose`
 * (`[data-disguise=on]`, which the fine print state satisfies too, since a disclosure nobody
 * can read is still a disguise) and mounts disguised (SPEC §6).
 *
 * Every card keeps one byline line of fixed height above one title, in all three states, so
 * the label arrives without moving anything in the column (SPEC §5). Each segment names an
 * absolute state rather than flipping the one it finds (SPEC §8).
 *
 * A line under the feed used to grade each state in the site's voice ("No disclosure at all",
 * "Disclosure present: 8px, grey, last in the line"). It said what the note in the strip already
 * says, so it went along with the two asserts that read it: the card's own disguise flag and the
 * badge are what the pass claims now.
 */
export function mount(root: HTMLElement): void {
  const card = (inner: string, extra = '', attrs = '') => `
    <div class="sp-surface sp-row" ${attrs} style="gap: 10px; padding: 8px 10px; background: var(--sp-surface); ${extra}">
      <span class="sp-swatch" style="flex: 0 0 auto; width: 34px; height: 34px; --sp-swatch: var(--sp-line)"></span>
      <span class="sp-stack" style="gap: 3px; flex: 1 1 auto; min-width: 0">${inner}</span>
    </div>`;

  const storyInner = (byline: string, title: string) => `
    <span class="sp-row" style="height: 15px; gap: 6px"><span class="sp-text" style="font-size: 11px">${byline}</span></span>
    <span class="sp-text sp-text--ink" style="font-size: 13px; font-weight: 500">${title}</span>`;

  const adInner = (mode: Mode) => `
    <span class="sp-row" style="height: 15px; gap: 6px">${BYLINE[mode]}</span>
    <span class="sp-text sp-text--ink" style="font-size: 13px; font-weight: 500">The three tools every bookbinder keeps sharp</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 231px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">The Ferry Post</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-axis="Disclosure" data-value="${START}">
            <button class="sp-segment" type="button" data-part="mode-none" value="none" style="padding: 5px 9px; font-size: 12px">No label</button>
            <button class="sp-segment" type="button" data-part="mode-fine" value="fine" style="padding: 5px 9px; font-size: 12px">Fine print</button>
            <button class="sp-segment" type="button" data-part="mode-labelled" value="labelled" style="padding: 5px 9px; font-size: 12px">Labelled</button>
          </sp-segmented>
        </div>
        <div class="sp-body sp-stack" data-part="feed" style="gap: 8px; justify-content: center">
          <div class="sp-context">${card(storyInner(STORIES[0]?.byline ?? '', STORIES[0]?.title ?? ''))}</div>
          ${card(adInner(START), 'transition: background-color 0.2s', 'data-part="ad" data-subject data-pose="[data-disguise=on]" data-disguise="on" data-mode="none"')}
          <div class="sp-context">${card(storyInner(STORIES[1]?.byline ?? '', STORIES[1]?.title ?? ''))}</div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="note" style="width: 452px; height: 32px; font-size: 11px">${NOTE[START]}</span>
    </div>
  `;

  const ad = part(root, 'ad');
  const stack = ad.querySelector<HTMLElement>('.sp-stack');
  const note = part(root, 'note');

  part(root, 'mode').addEventListener('change', (event) => {
    const mode = (event as CustomEvent<string>).detail as Mode;
    ad.dataset.mode = mode;
    ad.dataset.disguise = mode === 'labelled' ? 'off' : 'on';
    ad.style.background = mode === 'labelled' ? 'var(--sp-accent-soft)' : 'var(--sp-surface)';
    // The tinted card also stops sharing the column's edge, which is half of what makes a
    // label readable: a border it does not share with its neighbours.
    ad.style.boxShadow = mode === 'labelled' ? 'inset 3px 0 0 0 var(--sp-accent)' : 'none';
    if (stack) stack.innerHTML = adInner(mode);
    note.textContent = NOTE[mode];
  });
}
