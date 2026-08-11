import { part } from '#src/kit/parts.ts';

type Job = { title: string; meta: string; tags: string[] };
type Value = { id: string; label: string };
type Group = { id: string; label: string; values: Value[] };

const JOBS: Job[] = [
  { title: 'Product designer', meta: 'Design, Remote', tags: ['remote', 'design', 'full-time'] },
  { title: 'Design engineer', meta: 'Design, Remote', tags: ['remote', 'design', 'contract'] },
  { title: 'Staff designer', meta: 'Design, Berlin', tags: ['berlin', 'design', 'full-time'] },
  { title: 'Backend engineer', meta: 'Platform, Remote', tags: ['remote', 'platform', 'full-time'] },
  { title: 'Platform lead', meta: 'Platform, Berlin', tags: ['berlin', 'platform', 'full-time'] },
  { title: 'Design researcher', meta: 'Design, Berlin', tags: ['berlin', 'design', 'contract'] },
];

const GROUPS: Group[] = [
  {
    id: 'place',
    label: 'Location',
    values: [
      { id: 'remote', label: 'Remote' },
      { id: 'berlin', label: 'Berlin' },
    ],
  },
  {
    id: 'team',
    label: 'Team',
    values: [
      { id: 'design', label: 'Design' },
      { id: 'platform', label: 'Platform' },
    ],
  },
  {
    id: 'type',
    label: 'Contract',
    values: [
      { id: 'full-time', label: 'Full time' },
      { id: 'contract', label: 'Contract' },
    ],
  },
];

const VALUES = GROUPS.flatMap((group) => group.values);

function facetRow(value: Value): string {
  return `
    <div class="sp-row" data-part="facet-${value.id}" data-value="${value.id}" style="cursor: pointer">
      <button class="sp-checkbox" type="button" role="checkbox" aria-checked="false" aria-labelledby="af-${value.id}" data-part="box-${value.id}"></button>
      <span class="sp-text sp-text--ink sp-grow" id="af-${value.id}">${value.label}</span>
    </div>`;
}

function groupBlock(group: Group): string {
  return `
    <div>
      <div class="sp-label">${group.label}</div>
      <div class="sp-stack" style="gap: 6px; margin-top: 4px">${group.values.map(facetRow).join('')}</div>
    </div>`;
}

/**
 * Applied filters specimen: three constraints already in force, each one a token
 * that takes itself back off, with Clear all set apart at the end. The subject is
 * the token row and nothing else in the frame: the rail on the left is where a
 * filter is set, and what this term names is the summary that says which ones are.
 *
 * The row reserves two lines of height from the start, so emptying it never slides
 * the results up (SPEC §5). A chip removes and Clear all empties, both of which
 * reach a stated end rather than flipping whatever they find, and the rail selects
 * without unselecting, so the row stays the only way back out (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Open roles</span>
          <span class="sp-text" data-part="total" role="status">6 of ${JOBS.length}</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px">
          <div class="sp-surface sp-context" style="flex: 0 0 auto; width: 134px; padding: 8px 11px; display: flex; flex-direction: column; gap: 9px">
            ${GROUPS.map(groupBlock).join('')}
          </div>
          <div class="sp-grow" style="display: flex; flex-direction: column; gap: 8px; min-width: 0">
            <div class="sp-row sp-row--wrap" data-part="applied" data-subject
                 style="flex: 0 0 auto; height: 64px; gap: 6px; align-items: flex-start; align-content: flex-start; overflow: hidden"></div>
            <ul class="sp-list sp-scroll sp-surface sp-context sp-grow" data-part="results" data-shown="${JOBS.length}" style="padding: 0 4px"></ul>
          </div>
        </div>
      </div>
    </div>
  `;

  const applied = part(root, 'applied');
  const results = part(root, 'results');
  const total = part(root, 'total');
  const chosen = new Set(['remote', 'design', 'full-time']);

  const matches = (job: Job): boolean =>
    GROUPS.every((group) => {
      const picked = group.values.filter((value) => chosen.has(value.id));
      return picked.length === 0 || picked.some((value) => job.tags.includes(value.id));
    });

  const paint = () => {
    const shown = JOBS.filter(matches);
    results.dataset.shown = String(shown.length);
    results.innerHTML = shown
      .map(
        (job) => `
          <li class="sp-list-item">
            <span class="sp-grow">${job.title}</span>
            <span class="sp-text">${job.meta}</span>
          </li>`,
      )
      .join('');
    total.textContent = `${shown.length} of ${JOBS.length}`;

    for (const value of VALUES) part(root, `box-${value.id}`).setAttribute('aria-checked', String(chosen.has(value.id)));

    // Declaration order, always: a token must not move under the pointer because a
    // neighbour was just taken off.
    const tokens = VALUES.filter((value) => chosen.has(value.id));
    applied.innerHTML = tokens.length
      ? `${tokens
          .map(
            (value) => `
              <button class="sp-chip" type="button" data-part="chip-${value.id}" data-value="${value.id}" data-selected
                      aria-label="Remove filter: ${value.label}">
                ${value.label}<span class="sp-chip-remove" aria-hidden="true">✕</span>
              </button>`,
          )
          .join('')}
         <button class="sp-button sp-button--quiet sp-button--sm" data-part="clear" type="button">Clear all</button>`
      : '<span class="sp-text" data-part="applied-empty">No filters applied</span>';
  };

  for (const value of VALUES) {
    // The row listens, not the box: a synthesized click gets none of the activation
    // a real label would hand a checkbox (SPEC §8).
    part(root, `facet-${value.id}`).addEventListener('click', () => {
      if (chosen.has(value.id)) return;
      chosen.add(value.id);
      paint();
    });
  }

  applied.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-part=clear]')) {
      chosen.clear();
      paint();
      return;
    }
    const chip = target.closest<HTMLElement>('[data-value]');
    if (!chip?.dataset.value) return;
    chosen.delete(chip.dataset.value);
    paint();
  });

  paint();
}
