import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Room for every result the widest scope shows, so narrowing moves nothing below (SPEC §5). */
const LIST_H = 158;

const SCOPES = [
  { key: 'all', label: 'All' },
  { key: 'mail', label: 'Mail' },
  { key: 'files', label: 'Files' },
  { key: 'people', label: 'People' },
] as const;

type ScopeKey = (typeof SCOPES)[number]['key'];

/** A person's result carries a face rather than a glyph, which is what makes the People scope legible. */
const FACE = '<span class="sp-avatar" style="width: 18px; height: 18px; font-size: 8px">DH</span>';

const RESULTS = [
  { key: 'r1', scope: 'mail', title: 'Re: harbour survey', note: 'A. Okafor', glyph: icon('inbox') },
  { key: 'r2', scope: 'files', title: 'harbour-survey.pdf', note: '2.4 MB', glyph: icon('copy') },
  { key: 'r3', scope: 'people', title: 'Dana Harbour', note: 'Coastal team', glyph: FACE },
  { key: 'r4', scope: 'mail', title: 'Harbour fees, Q3', note: 'Billing', glyph: icon('inbox') },
  { key: 'r5', scope: 'files', title: 'harbour-map.png', note: '860 KB', glyph: icon('copy') },
] as const;

const COUNTS: Record<ScopeKey, number> = {
  all: RESULTS.length,
  mail: RESULTS.filter((r) => r.scope === 'mail').length,
  files: RESULTS.filter((r) => r.scope === 'files').length,
  people: RESULTS.filter((r) => r.scope === 'people').length,
};

interface Picker extends HTMLElement {
  value: string;
}

/**
 * Scope bar specimen: one query typed once, and a row of category buttons under the field
 * that changes where it looks. Picking a scope leaves the field exactly as it was and
 * shortens the list below, which is the whole difference between this and a set of tabs.
 *
 * The subject is the bar itself, the `<sp-segmented>` row under the field: the narrowest
 * element the term names. The field, the results and the count line are the scene around it
 * in the context register, which is also the honest reading, since the bar is a modifier on
 * a search that already exists.
 *
 * The title bar carried "One query, four places to look" beside the app's name, which is
 * the article's sentence in a search window. The four buttons and the count line under the
 * list make the same point as themselves, so it went.
 *
 * The scopes are absolute picks routed through the kit's segmented control, so a pass
 * resumed at any point lands in the same place and no demo code synthesizes a second click
 * (SPEC §8). The list keeps a fixed height with room for every row the widest scope shows,
 * so narrowing changes what is in the list and never where the list is.
 */
export function mount(root: HTMLElement): void {
  const rows = RESULTS.map(
    (result) => `
      <li
        class="sp-list-item"
        data-part="row-${result.key}"
        data-scope="${result.scope}"
        style="gap: 9px; padding: 3px 10px"
      >
        <span style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 18px; height: 18px; color: var(--sp-muted)">${result.glyph}</span>
        <span class="sp-grow" style="font-size: 12.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${result.title}</span>
        <span class="sp-label" style="flex: 0 0 auto; font-size: 11px">${result.note}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 302px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Spotlight</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div class="sp-row sp-context" style="gap: 8px; padding: 0 1px">
            <span style="display: flex; flex: 0 0 auto; color: var(--sp-muted)">${icon('search')}</span>
            <input
              class="sp-input sp-grow"
              data-part="query"
              type="text"
              value="harbour"
              readonly
              aria-label="Search everything"
              style="font-size: 13px"
            />
          </div>

          <sp-segmented class="sp-segmented" data-part="bar" data-subject data-value="all" data-axis="Scope" aria-label="Search scope" style="align-self: flex-start">
            ${SCOPES.map(
              (scope) => `
              <button class="sp-segment" type="button" data-part="seg-${scope.key}" value="${scope.key}" style="padding: 4px 14px; font-size: 12px; white-space: nowrap">${scope.label}</button>`,
            ).join('')}
          </sp-segmented>

          <div class="sp-surface sp-context" style="display: flex; flex-direction: column; height: ${LIST_H}px; overflow: hidden; padding: 3px 4px">
            <ul class="sp-list sp-grow" data-part="results" style="flex: 1 1 auto">${rows}</ul>
            <span class="sp-label" data-part="count" data-scope="all" style="flex: 0 0 auto; padding: 4px 8px 2px; font-size: 11px; white-space: nowrap">5 matches for “harbour”, everywhere</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const bar = part(root, 'bar') as Picker;
  const count = part(root, 'count');

  const apply = (scope: ScopeKey) => {
    for (const result of RESULTS) {
      const row = part(root, `row-${result.key}`);
      row.toggleAttribute('hidden', scope !== 'all' && result.scope !== scope);
    }
    count.dataset.scope = scope;
    const label = SCOPES.find((s) => s.key === scope)?.label ?? '';
    count.textContent =
      scope === 'all'
        ? `${COUNTS.all} matches for “harbour”, everywhere`
        : `${COUNTS[scope]} of ${COUNTS.all} matches for “harbour”, in ${label}`;
  };

  bar.addEventListener('change', (event) => apply((event as CustomEvent<string>).detail as ScopeKey));

  apply('all');
}
