import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'false' | 'fixed';

/** The scroller's height, and the height the closing band takes to reach exactly to it. */
const HEAD_H = 123;
const VIEW_H = 208;

const BAND = {
  false: {
    height: VIEW_H - HEAD_H,
    inner: `
      <span style="width: 64px; height: 2px; border-radius: 1px; background: var(--sp-line)"></span>
      <span class="sp-heading" style="font-size: 12px">The Kestrel Review</span>
      <span class="sp-label" style="font-size: 10px">Issue 44, February</span>`,
    layout: 'flex-direction: column; align-items: center; justify-content: center; gap: 8px',
  },
  fixed: {
    height: 44,
    inner: `
      <span class="sp-divider sp-grow"></span>
      <span class="sp-label" style="font-size: 10px">Part one ends here</span>
      <span class="sp-divider sp-grow"></span>`,
    layout: 'flex-direction: row; align-items: center; gap: 10px; padding: 0 14px',
  },
} as const;

const NOTE = {
  false: 'The band fills the last of the screen and reads as an ending. Two sections sit under it.',
  fixed: 'The same band, cut short, plus a cue: the next section now breaks the bottom edge.',
} as const;

const card = (title: string, meta: string) => `
  <div class="sp-surface sp-row" style="height: 40px; gap: 10px; padding: 0 10px">
    <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 12px">${title}</span>
    <span class="sp-label" style="font-size: 10px">${meta}</span>
  </div>`;

/**
 * False bottom specimen: an article whose closing band lands exactly on the bottom edge of
 * the scroller, with two more sections underneath it that a reader has no reason to look
 * for. Scrolling proves the content is there; the segmented control then draws the same
 * page with the band cut short and a continuity cue under it, so the next section breaks
 * the edge instead of hiding behind an ending.
 *
 * The subject is the band, the narrowest element the term names (SPEC §5). Because one of
 * its states is the repair rather than the term, it carries `data-pose` for the false
 * condition and the specimen mounts in it, so identify never rings the fixed band and
 * calls it a false bottom (SPEC §6). The masthead, the article, the sections below and the
 * note row are scenery.
 *
 * Nothing above the band moves when the band is cut: the size change is the band's own,
 * and what it uncovers below is the demonstration rather than an incidental shift (SPEC
 * §5). The scroller hides its scrollbar inline, the way an overlay scrollbar behaves on
 * the platforms where this trap is most often sprung: a permanent thumb would give the
 * remaining content away and there would be nothing left to demonstrate.
 */
export function mount(root: HTMLElement): void {
  const lines = ['96%', '88%', '93%', '79%', '61%'].map((w) => `<span class="sp-line" style="width: ${w}"></span>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">The Kestrel Review</span>
          <span class="sp-label" style="font-size: 11px">Long read</span>
        </div>

        <div
          class="sp-scroll"
          data-part="page"
          data-at="top"
          style="flex: 1 1 auto; min-height: 0; background: var(--sp-surface); scrollbar-width: none"
        >
          <div class="sp-context sp-stack" style="height: ${HEAD_H}px; gap: 8px; padding: 12px 14px 0">
            <span class="sp-heading" style="font-size: 14px">The harbour that outlived its fleet</span>
            <div class="sp-stack" style="gap: 7px">${lines}</div>
          </div>

          <div
            data-part="band"
            data-subject
            data-mode="false"
            data-pose="[data-mode=false]"
            style="display: flex; height: ${BAND.false.height}px; background: var(--sp-sunken); ${BAND.false.layout}"
          >${BAND.false.inner}</div>

          <div class="sp-row sp-context" data-part="continue" hidden style="height: 26px; justify-content: center; gap: 6px">
            ${icon('chevronDown')}
            <span class="sp-label" style="font-size: 10px">Keep reading</span>
          </div>

          <div class="sp-context sp-stack" style="gap: 8px; padding: 12px 14px 16px">
            <span class="sp-heading" data-part="more-title" style="font-size: 12px">More in this issue</span>
            ${card('A ferry timetable, read as history', '6 min')}
            ${card('The last chandlery on the quay', '9 min')}
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-part="note" style="width: 272px; height: 34px; font-size: 11px">${NOTE.false}</span>
        <sp-segmented class="sp-segmented" data-axis="Closing band" data-term="false" data-part="pick" data-value="false">
          <button class="sp-segment" data-part="pick-false" value="false" style="padding: 5px 9px; font-size: 12px">False bottom</button>
          <button class="sp-segment" data-part="pick-fixed" value="fixed" style="padding: 5px 9px; font-size: 12px">Continuity cue</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const band = part(root, 'band');
  const carryOn = part(root, 'continue');
  const note = part(root, 'note');

  const show = (mode: Mode) => {
    const it = BAND[mode];
    band.dataset.mode = mode;
    band.setAttribute('style', `display: flex; height: ${it.height}px; background: var(--sp-sunken); ${it.layout}`);
    band.innerHTML = it.inner;
    carryOn.hidden = mode === 'false';
    note.textContent = NOTE[mode];
  };

  // How far the reader has gone, so the script can prove the page did not end where it
  // looked like it did.
  page.addEventListener('scroll', () => {
    page.dataset.at = page.scrollTop > 8 ? 'below' : 'top';
  });

  part(root, 'pick').addEventListener('change', (event) => {
    show((event as CustomEvent<string>).detail as Mode);
  });

  show('false');
}
