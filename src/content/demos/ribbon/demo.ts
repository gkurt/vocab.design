import type { IconName } from '#src/kit/icons.ts';
import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/** The band is one height for every tab, sized for the tallest group, so switching tabs
 *  cannot move the document under it (SPEC §5). */
const BAND_H = 86;
const GROUP_W = 138;
const BIG = 50;

interface Group {
  key: string;
  label: string;
  big: { glyph: IconName; label: string };
  small: string[];
}

interface Tab {
  key: string;
  label: string;
  groups: Group[];
}

const TABS: Tab[] = [
  {
    key: 'home',
    label: 'Home',
    groups: [
      { key: 'clipboard', label: 'Clipboard', big: { glyph: 'copy', label: 'Paste' }, small: ['Cut', 'Copy', 'Format'] },
      { key: 'font', label: 'Font', big: { glyph: 'pencil', label: 'Styles' }, small: ['Bold', 'Italic', 'Colour'] },
      { key: 'paragraph', label: 'Paragraph', big: { glyph: 'menu', label: 'Align' }, small: ['Bullets', 'Numbers', 'Spacing'] },
    ],
  },
  {
    key: 'insert',
    label: 'Insert',
    groups: [
      { key: 'pages', label: 'Pages', big: { glyph: 'plus', label: 'Page' }, small: ['Cover', 'Break'] },
      { key: 'tables', label: 'Tables', big: { glyph: 'menu', label: 'Table' }, small: ['Rows', 'Cells'] },
      { key: 'media', label: 'Illustrations', big: { glyph: 'star', label: 'Picture' }, small: ['Chart', 'Shape', 'Icon'] },
    ],
  },
  {
    key: 'layout',
    label: 'Layout',
    groups: [
      { key: 'setup', label: 'Page setup', big: { glyph: 'sliders', label: 'Margins' }, small: ['Size', 'Columns'] },
      { key: 'arrange', label: 'Arrange', big: { glyph: 'share', label: 'Position' }, small: ['Wrap', 'Align'] },
    ],
  },
];

const START = 'home';

/**
 * Ribbon specimen: a document window whose commands live on a tall tabbed surface instead of in
 * menus. Picking a tab swaps the whole band; inside each band the commands are gathered into
 * named groups, and the one command per group that people reach for most is drawn large with the
 * rest kept small beside it.
 *
 * The subject is the ribbon, meaning the tab strip and the band together: the tabs alone are a
 * tab set and the band alone is a toolbar, and it is the pairing that the word names. The title
 * bar and the page below are scenery. Every state is honestly a ribbon, so no `data-pose`
 * condition is needed.
 *
 * The whole specimen is scaled down, because the term is defined by height and the stage is 320px
 * tall: the band is 86px here where a real one is nearer 130. It is one fixed height for every
 * tab and its groups are one fixed width, so a tab with two groups cannot resize the surface or
 * shift the document (SPEC §5), and every control is a single line sized for its own widest
 * label. Tabs are absolute picks rather than toggles, so a pass resumed at any point lands on a
 * tab instead of undoing one (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const smallButton = (label: string) => `
    <span
      class="sp-button sp-button--quiet"
      style="display: block; padding: 2px 6px; border-radius: 4px; font-size: 10.5px; font-weight: 400; line-height: 1.5;
             white-space: nowrap; text-align: left"
      >${label}</span
    >`;

  const group = (entry: Group, index: number) => `
    <div
      data-part="group-${entry.key}"
      style="display: flex; flex-direction: column; flex: 0 0 auto; width: ${GROUP_W}px; height: 100%; padding: 6px 8px 4px;
             ${index > 0 ? 'border-left: 1px solid var(--sp-line);' : ''}"
    >
      <div class="sp-row" style="gap: 6px; flex: 1 1 auto; align-items: stretch">
        <span
          class="sp-button sp-button--quiet"
          data-part="big-${entry.key}"
          style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; flex: 0 0 auto;
                 width: ${BIG}px; padding: 4px 2px; font-size: 10.5px; font-weight: 500; white-space: nowrap"
        >${icon(entry.big.glyph)}<span>${entry.big.label}</span></span>
        <div class="sp-stack" style="gap: 2px; flex: 1 1 auto; min-width: 0; justify-content: center">
          ${entry.small.map(smallButton).join('')}
        </div>
      </div>
      <span class="sp-label" data-part="label-${entry.key}" style="flex: 0 0 auto; font-size: 10px; text-align: center">${entry.label}</span>
    </div>`;

  const band = (tab: Tab) => `
    <div
      data-part="band-${tab.key}"
      ${tab.key === START ? '' : 'hidden'}
      style="display: flex; align-items: stretch; height: 100%"
    >${tab.groups.map(group).join('')}</div>`;

  const tabButton = (tab: Tab) => `
    <button
      type="button"
      role="tab"
      data-part="tab-${tab.key}"
      data-tab="${tab.key}"
      aria-selected="${tab.key === START}"
      ${tab.key === START ? 'data-current' : ''}
      style="flex: 0 0 auto; padding: 4px 12px; border: 0; border-radius: 5px 5px 0 0; background: transparent; color: var(--sp-muted);
             font: inherit; font-size: 11.5px; font-weight: 500; white-space: nowrap; cursor: pointer"
    >${tab.label}</button>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 8px; padding: 6px 12px; border-bottom: 1px solid var(--sp-line)">
          <span class="sp-heading" style="font-size: 12px">Harbour report.docx</span>
          <span class="sp-grow"></span>
          <span class="sp-label" style="font-size: 10.5px">Saved</span>
        </div>

        <div data-part="ribbon" data-subject style="flex: 0 0 auto; background: var(--sp-surface)">
          <div class="sp-row" data-part="tabs" role="tablist" aria-label="Commands" style="gap: 2px; padding: 4px 8px 0">
            ${TABS.map(tabButton).join('')}
          </div>
          <div
            data-part="band"
            data-tab="${START}"
            style="height: ${BAND_H}px; border-top: 1px solid var(--sp-line); border-bottom: 1px solid var(--sp-line);
                   background: var(--sp-sunken); overflow: hidden"
          >${TABS.map(band).join('')}</div>
        </div>

        <div class="sp-body sp-context" style="display: flex; align-items: flex-start; justify-content: center; padding: 12px">
          <div class="sp-surface" data-part="page" style="width: 260px; padding: 12px 14px">
            <div class="sp-stack" style="gap: 7px">
              <span class="sp-line" style="width: 62%"></span>
              <span class="sp-line" style="width: 100%"></span>
              <span class="sp-line" style="width: 94%"></span>
              <span class="sp-line" style="width: 78%"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const bandRegion = part(root, 'band');
  const tabs = TABS.map((tab) => part(root, `tab-${tab.key}`));
  const bands = TABS.map((tab) => part(root, `band-${tab.key}`));

  const show = (key: string) => {
    for (const tab of tabs) {
      const on = tab.dataset.tab === key;
      tab.setAttribute('aria-selected', String(on));
      flag(tab, 'data-current', on);
      // The current tab is joined to the band: same fill, and the muted label goes to ink.
      tab.style.background = on ? 'var(--sp-sunken)' : 'transparent';
      tab.style.color = on ? 'var(--sp-ink)' : 'var(--sp-muted)';
    }
    for (const [index, region] of bands.entries()) region.toggleAttribute('hidden', TABS[index]?.key !== key);
    bandRegion.dataset.tab = key;
  };

  for (const tab of tabs) tab.addEventListener('click', () => show(tab.dataset.tab ?? START));

  show(START);
}
