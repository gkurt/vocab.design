import { part } from '#src/kit/parts.ts';

type Entry = { id: string; title: string; number: string; sub?: boolean; lines: number };

const ENTRIES: Entry[] = [
  { id: 'overview', title: 'Overview', number: '1', lines: 4 },
  { id: 'install', title: 'Install', number: '2', lines: 4 },
  { id: 'package', title: 'Package managers', number: '2.1', sub: true, lines: 3 },
  { id: 'tokens', title: 'Tokens', number: '3', lines: 4 },
  { id: 'theming', title: 'Theming', number: '4', lines: 4 },
];

/**
 * Table of contents specimen: the list itself, above the document it enumerates.
 * Clicking an entry jumps the prose to that section, and nothing in the list ever
 * lights up on its own, which is the whole line between this term and scroll spy.
 *
 * The pane's `data-top` is the section currently under the pane's top edge,
 * computed from the scroll position and painted nowhere: invisible proof for the
 * choreography that a jump actually landed. A visible version of it would be the
 * neighbouring term.
 */
export function mount(root: HTMLElement): void {
  const list = ENTRIES.map(
    (entry) => `
      <li>
        <span class="sp-nav-item" data-part="entry-${entry.id}"
              style="display: flex; gap: 8px; padding: 3px 8px; padding-left: ${entry.sub ? 26 : 8}px">
          <span style="flex: 0 0 22px; color: var(--sp-muted); font-variant-numeric: tabular-nums">${entry.number}</span>
          <span>${entry.title}</span>
        </span>
      </li>`,
  ).join('');

  const doc = ENTRIES.map(
    (entry) => `
      <section data-part="section-${entry.id}" style="padding-bottom: 16px">
        <div class="${entry.sub ? 'sp-label' : 'sp-heading'}">${entry.title}</div>
        <div class="sp-stack" style="margin-top: 8px">
          ${Array.from({ length: entry.lines }, (_, i) => `<div class="sp-line" style="width: ${[94, 80, 88, 62][i % 4]}%"></div>`).join('')}
        </div>
      </section>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 452px; height: 296px">
        <div data-part="toc" data-subject
             style="flex: 0 0 auto; padding: 10px 12px 12px; border-bottom: 1px solid var(--sp-line)">
          <span class="sp-label">Contents</span>
          <ol class="sp-nav" style="margin-top: 6px; list-style: none">${list}</ol>
        </div>
        <div class="sp-scroll sp-context" data-part="doc" data-top="overview"
             style="flex: 1 1 auto; min-height: 0; padding: 12px; background: var(--sp-sunken)">${doc}</div>
      </div>
    </div>
  `;

  const pane = part(root, 'doc');

  const sync = (): void => {
    const threshold = pane.getBoundingClientRect().top + 24;
    let top = ENTRIES[0]?.id;
    for (const entry of ENTRIES) {
      if (part(root, `section-${entry.id}`).getBoundingClientRect().top <= threshold) top = entry.id;
    }
    if (top) pane.setAttribute('data-top', top);
  };

  pane.addEventListener('scroll', sync);

  for (const entry of ENTRIES) {
    part(root, `entry-${entry.id}`).addEventListener('click', () => {
      const offset = part(root, `section-${entry.id}`).getBoundingClientRect().top - pane.getBoundingClientRect().top;
      pane.scrollBy({ top: offset, behavior: 'smooth' });
    });
  }
}
