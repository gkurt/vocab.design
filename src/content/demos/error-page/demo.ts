import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

interface Picker extends HTMLElement {
  value: string;
}

/**
 * The two registers the sources disagree about, composed from the same three jobs: say
 * what happened, do not blame the reader, hand back the shortest route out. The plain
 * one is the GOV.UK Design System's page-not-found register (no informal copy, no red,
 * the number 404 never printed); the playful one is the Nielsen Norman Group's advice to
 * mitigate total failure with novelty.
 */
const REGISTERS = {
  plain: {
    headline: 'Page not found',
    body: 'If you typed the web address, check it is correct. If you pasted it, check you copied the whole address.',
    home: 'Go to the home page',
    search: 'Search this site',
    note: 'No informal copy, no red text, no "404".',
    align: 'flex-start',
    text: 'left',
    mark: false,
  },
  playful: {
    headline: 'We looked everywhere',
    body: 'That page is not here, and nothing is broken at your end. The address just does not lead anywhere any more.',
    home: 'Take me home',
    search: 'Search the site',
    note: 'Novelty softens a dead end. Same ways back.',
    align: 'center',
    text: 'center',
    mark: true,
  },
} as const;

/**
 * Error page specimen: one page-not-found composed twice, in the two registers the
 * literature actually disagrees about, picked by a segmented control. Both states do the
 * same three jobs, so the switch shows a change of voice rather than a change of duty.
 *
 * The subject is the page-shaped region, which is the narrowest element this term names:
 * the word is the whole screen served in place of the one that was asked for, so the
 * browser frame and its address bar around it are scenery, and the top-level wrapper
 * would have claimed the picker and the note as part of the term. Both registers are
 * honestly an error page, so no `data-pose` condition is needed.
 *
 * The register recomposes the page (that is the demonstration), but everything outside it
 * holds: the frame, the address bar, the picker and the note slot are all fixed, the copy
 * slot is sized for the longer of the two bodies, and the illustration slot is the same
 * height in both, so nothing below the page ever moves (SPEC §5). The two ways back are
 * inert, as a way off this page has to be inside a specimen.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 250px">

        <div class="sp-topbar sp-context" style="padding: 7px 10px; gap: 8px">
          <span style="display: flex; color: var(--sp-muted)">${icon('chevronLeft')}</span>
          <span
            class="sp-text"
            style="flex: 1 1 auto; min-width: 0; padding: 3px 10px; border: 1px solid var(--sp-line); border-radius: 999px; background: var(--sp-sunken); font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
          >example.test/guides/setting-up-a-workspace</span>
        </div>

        <div class="sp-body" style="padding: 0">
          <div
            data-part="page"
            data-subject
            data-register="plain"
            style="height: 100%; display: flex; flex-direction: column; justify-content: center; gap: 8px; padding: 14px 24px; background: var(--sp-surface)"
          >
            <span
              class="sp-empty-mark"
              data-part="mark"
              style="align-self: center; background: var(--sp-accent-soft); border-color: var(--sp-accent-soft); color: var(--sp-accent)"
            >${icon('search')}</span>
            <span class="sp-heading" data-part="headline" style="font-size: 17px">${REGISTERS.plain.headline}</span>
            <p class="sp-text" data-part="copy" style="margin: 0; width: 100%; max-width: 46ch; height: 58px">${REGISTERS.plain.body}</p>
            <div class="sp-row" data-part="ways" style="gap: 8px">
              <button class="sp-button sp-button--sm" data-part="home" type="button">${REGISTERS.plain.home}</button>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="find" type="button">${REGISTERS.plain.search}</button>
            </div>
          </div>
        </div>

      </div>

      <div class="sp-row sp-context" style="width: 476px; gap: 12px">
        <sp-segmented class="sp-segmented" data-part="picker" data-value="plain">
          <button class="sp-segment" type="button" data-part="seg-plain" value="plain" style="padding: 4px 12px; font-size: 12px">Plain</button>
          <button class="sp-segment" type="button" data-part="seg-playful" value="playful" style="padding: 4px 12px; font-size: 12px">Playful</button>
        </sp-segmented>
        <span class="sp-text sp-grow" data-part="note" style="font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${REGISTERS.plain.note}</span>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const mark = part(root, 'mark');
  const headline = part(root, 'headline');
  const copy = part(root, 'copy');
  const home = part(root, 'home');
  const find = part(root, 'find');
  const note = part(root, 'note');
  const picker = part(root, 'picker') as Picker;

  const render = (key: keyof typeof REGISTERS) => {
    const register = REGISTERS[key];
    page.dataset.register = key;
    page.style.alignItems = register.align;
    page.style.textAlign = register.text;
    headline.textContent = register.headline;
    copy.textContent = register.body;
    home.textContent = register.home;
    find.textContent = register.search;
    note.textContent = register.note;
    flag(mark, 'hidden', !register.mark);
  };

  // The picker names an absolute register, so a pass picked up anywhere lands the same
  // way rather than flipping whatever it found (SPEC §8).
  picker.addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (value === 'plain' || value === 'playful') render(value);
  });

  render('plain');
}
