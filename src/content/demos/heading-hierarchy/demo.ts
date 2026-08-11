import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Section = { level: number; text: string };
type Mode = 'nested' | 'skipped';

/** Sizes by position, not by level: both variants look identical on the page, which is
    the whole trap. Only the outline can tell them apart. */
const SIZES = [15, 13, 12, 12];

const VARIANTS: Record<Mode, Section[]> = {
  nested: [
    { level: 1, text: 'Brewing guide' },
    { level: 2, text: 'Grind size' },
    { level: 3, text: 'Burr settings' },
    { level: 2, text: 'Water' },
  ],
  skipped: [
    { level: 1, text: 'Brewing guide' },
    { level: 3, text: 'Grind size' },
    { level: 4, text: 'Burr settings' },
    { level: 3, text: 'Water' },
  ],
};

function pageMarkup(sections: Section[]): string {
  return sections
    .map((section, index) => {
      const tag = `h${section.level}`;
      const top = index === 0 ? 0 : 12;
      return `
        <${tag} style="margin: ${top}px 0 5px; font-size: ${SIZES[index]}px; font-weight: 600; line-height: 1.3">${section.text}</${tag}>
        <div class="sp-line" style="width: ${index % 2 === 0 ? 100 : 74}%"></div>`;
    })
    .join('');
}

/** The outline is read off the rendered headings rather than answered from the table
    that produced them, so the panel is a computation and not a caption. */
function readOutline(page: HTMLElement): Section[] {
  return [...page.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6')].map((heading) => ({
    level: Number(heading.tagName[1]),
    text: heading.textContent?.trim() ?? '',
  }));
}

function outlineMarkup(sections: Section[]): string {
  let previous = 0;
  return sections
    .map((section) => {
      const jump = previous > 0 && section.level - previous > 1;
      previous = section.level;
      const edge = jump ? 'var(--sp-accent)' : 'transparent';
      return `
        <li class="sp-row" data-part="row" ${jump ? 'data-jump' : ''}
          style="gap: 6px; height: 22px; margin-left: ${(section.level - 1) * 13}px; padding-left: 6px; border-left: 2px dashed ${edge}">
          <span class="sp-label">h${section.level}</span>
          <span class="sp-text sp-text--ink" style="font-size: 12px">${section.text}</span>
        </li>`;
    })
    .join('');
}

function noteFor(sections: Section[]): string {
  const levels = new Set(sections.map((section) => section.level));
  const deepest = Math.max(...levels);
  for (let level = 2; level <= deepest; level += 1) {
    if (!levels.has(level)) return `Level ${level} never appears, so a reader counting depth cannot tell a child from a sibling.`;
  }
  return 'No holes: every step down goes one level, so the depth of a section is readable.';
}

/**
 * Heading hierarchy specimen: one article whose headings are set at two different sets
 * of levels, and the headings list a screen reader would offer beside it. The page
 * looks the same either way, because the sizes are fixed by position, so the outline
 * is the only place the difference shows: the skipped variant drops from h1 to h3 and
 * the list opens a hole where level 2 should be.
 *
 * The subject is the outline itself. The term names the nested structure the levels
 * form, and the headings list is that structure made visible, which is also how
 * assistive technology hands it to a reader. The article, the level switcher, and the
 * note under the list are scenery (SPEC §5). Both variants render the same number of
 * rows at the same heights, so switching moves nothing.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading" style="font-size: 14px">Article</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="nested">
            <button class="sp-segment" data-part="seg-nested" value="nested">Nested</button>
            <button class="sp-segment" data-part="seg-skipped" value="skipped">Skipped</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="align-items: flex-start; gap: 16px; margin-top: 12px">
          <div class="sp-context" data-part="page" style="width: 180px"></div>
          <div class="sp-grow">
            <span class="sp-label sp-context">Headings list</span>
            <ul class="sp-list" data-part="outline" data-state="nested" data-subject style="margin-top: 6px; gap: 2px"></ul>
            <p class="sp-text sp-context" data-part="note" style="margin: 10px 0 0; height: 34px; font-size: 12px"></p>
          </div>
        </div>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const outline = part(root, 'outline');
  const note = part(root, 'note');

  const show = (mode: Mode) => {
    page.innerHTML = pageMarkup(VARIANTS[mode]);
    const sections = readOutline(page);
    outline.dataset.state = mode;
    outline.innerHTML = outlineMarkup(sections);
    note.textContent = noteFor(sections);
  };

  show('nested');

  part(root, 'segmented').addEventListener('change', (event) => {
    show((event as CustomEvent<string>).detail as Mode);
  });
}
