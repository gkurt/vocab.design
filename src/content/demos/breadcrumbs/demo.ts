import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

interface Level {
  id: string;
  name: string;
  items: string[];
}

/** One branch of a file tree: every level lists the same number of rows, so moving between them shifts nothing. */
const PATH: Level[] = [
  { id: 'home', name: 'Home', items: ['Projects', 'Archive', 'Notes.md', 'Shared'] },
  { id: 'projects', name: 'Projects', items: ['Field guide', 'Talks', 'Ideas.md', 'Sketches'] },
  { id: 'field-guide', name: 'Field guide', items: ['Photos', 'Draft.md', 'Refs.md', 'Cover.png'] },
  { id: 'photos', name: 'Photos', items: ['Coast.jpg', 'Ridge.jpg', 'Fog.jpg', 'Dunes.jpg'] },
];

const START = PATH.length - 1;
const CRUMB_STYLE = 'padding: 3px 6px';
const chevron = `<span class="sp-text" style="display: flex" aria-hidden="true">${icon('chevronRight')}</span>`;

/** The last crumb is the page you are on: named as current, and not a link out of itself. */
function crumbMarkup(level: Level, current: boolean): string {
  const state = current
    ? ` aria-current="page" style="${CRUMB_STYLE}; color: var(--sp-ink); font-weight: 500; cursor: default"`
    : ` role="link" tabindex="0" style="${CRUMB_STYLE}"`;
  return `<span class="sp-nav-item" data-part="crumb-${level.id}"${state}>${level.name}</span>`;
}

function trailMarkup(depth: number): string {
  return PATH.slice(0, depth + 1)
    .map((level, index) => `<li class="sp-row" style="gap: 0">${index === 0 ? '' : chevron}${crumbMarkup(level, index === depth)}</li>`)
    .join('');
}

function listingMarkup(depth: number): string {
  const level = PATH[depth];
  if (!level) return '';
  const child = PATH[depth + 1];
  return level.items
    .map((name) =>
      child && child.name === name
        ? `<li class="sp-list-item">
             <span class="sp-grow sp-text sp-text--ink" role="link" tabindex="0" data-part="open-${child.id}" style="cursor: pointer">${name}</span>
             ${chevron}
           </li>`
        : `<li class="sp-list-item"><span class="sp-grow sp-text sp-text--ink">${name}</span></li>`,
    )
    .join('');
}

/**
 * Breadcrumbs specimen: a file browser opened four levels deep. The trail is the
 * term; the pane below it is the scenery that gives the trail something to be
 * about. Clicking a crumb goes to that level absolutely (a state reached, never a
 * toggle), the trail truncates there, and opening the folder in the pane goes back
 * down again.
 */
export function mount(root: HTMLElement): void {
  const start = PATH[START];
  if (!start) return;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 260px">
        <div class="sp-topbar">
          <nav class="sp-grow" data-part="trail" data-subject aria-label="Breadcrumb">
            <ol class="sp-row" data-part="crumbs" style="list-style: none; margin: 0; padding: 0; gap: 2px; white-space: nowrap">
              ${trailMarkup(START)}
            </ol>
          </nav>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-row sp-row--between">
            <span class="sp-heading" data-part="folder-name" data-level="${start.id}">${start.name}</span>
            <span class="sp-text">${start.items.length} items</span>
          </div>
          <ul class="sp-list" data-part="listing" style="margin-top: 6px">${listingMarkup(START)}</ul>
        </div>
      </div>
    </div>
  `;

  const crumbs = part(root, 'crumbs');
  const heading = part(root, 'folder-name');
  const listing = part(root, 'listing');
  let depth = START;

  const goTo = (next: number) => {
    const level = PATH[next];
    if (!level || next === depth) return;
    depth = next;
    crumbs.innerHTML = trailMarkup(depth);
    heading.textContent = level.name;
    heading.dataset.level = level.id;
    listing.innerHTML = listingMarkup(depth);
  };

  /** Both a crumb and a folder row name the level they lead to, so both resolve the same way. */
  const levelOf = (target: Element | null): number => {
    const name = target?.getAttribute('data-part') ?? '';
    const id = name.startsWith('crumb-') ? name.slice(6) : name.startsWith('open-') ? name.slice(5) : '';
    return id ? PATH.findIndex((level) => level.id === id) : -1;
  };

  const activate = (event: Event) => {
    const next = levelOf((event.target as HTMLElement | null)?.closest('[data-part]') ?? null);
    if (next >= 0) goTo(next);
  };

  root.addEventListener('click', activate);
  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    activate(event);
  });
}
