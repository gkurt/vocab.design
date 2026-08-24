import { localSize } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

interface Section {
  id: string;
  name: string;
}

const SECTIONS: Section[] = [
  { id: 'species', name: 'Species' },
  { id: 'habitats', name: 'Habitats' },
  { id: 'tracks', name: 'Tracks' },
  { id: 'notes', name: 'Notes' },
];

const START = 'species';

function linkMarkup(section: Section): string {
  const current = section.id === START ? ' data-current aria-current="page"' : '';
  return `<li><span class="sp-nav-item" role="link" tabindex="0" data-part="nav-${section.id}"${current}>${section.name}</span></li>`;
}

/**
 * Navigation bar specimen: the strip across the top of a site, carrying the
 * wordmark, the site's top level destinations, and an account control. The bar is
 * the subject with all three inside it, because the term names the strip rather
 * than the list of links alone. The page beneath is scenery: it exists so the
 * current marker has somewhere to point.
 *
 * Choosing a destination is absolute (SPEC §8). The item clicked becomes the
 * current one wherever the script joins in, and nothing here toggles.
 */
export function mount(root: HTMLElement): void {
  const start = SECTIONS.find((section) => section.id === START);
  if (!start) return;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <header class="sp-topbar" data-part="bar" data-subject>
          <span class="sp-heading" data-part="wordmark">Fieldbook</span>
          <nav class="sp-grow" aria-label="Main">
            <ul class="sp-nav" data-part="links" style="flex-direction: row; gap: 2px">
              ${SECTIONS.map(linkMarkup).join('')}
            </ul>
          </nav>
          <span class="sp-avatar" data-part="account">GK</span>
        </header>
        <div class="sp-body sp-context">
          <div class="sp-heading" data-part="page-title" data-section="${start.id}">${start.name}</div>
          <div class="sp-stack" style="margin-top: 12px">
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 96%"></div>
            <div class="sp-line" style="width: 72%"></div>
            <div class="sp-line" style="width: 84%"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const items = SECTIONS.map((section) => part(root, `nav-${section.id}`));
  const title = part(root, 'page-title');

  // The kit sets the current destination in a heavier weight, which would otherwise
  // nudge every item to its right each time the marker moves. Only the browser knows
  // how wide each label gets, so each one is measured while current, once, on mount,
  // and then held at that width for good (SPEC §5).
  for (const item of items) {
    const wasCurrent = item.hasAttribute('data-current');
    item.setAttribute('data-current', '');
    const widest = Math.ceil(localSize(item).width);
    if (widest > 0) item.style.width = `${widest}px`;
    if (!wasCurrent) item.removeAttribute('data-current');
  }

  const goTo = (section: Section) => {
    for (const item of items) {
      item.removeAttribute('data-current');
      item.removeAttribute('aria-current');
    }
    const item = part(root, `nav-${section.id}`);
    item.setAttribute('data-current', '');
    item.setAttribute('aria-current', 'page');
    title.textContent = section.name;
    title.dataset.section = section.id;
  };

  for (const section of SECTIONS) {
    const item = part(root, `nav-${section.id}`);
    item.addEventListener('click', () => goTo(section));
    item.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      goTo(section);
    });
  }
}
