import '#src/kit/combobox.ts';
import { part } from '#src/kit/parts.ts';

const STATIONS = [
  'Manchester',
  'Margate',
  'Maidstone',
  'Birmingham',
  'Bristol',
  'Cardiff',
  'Dover',
  'Norwich',
  'Salisbury',
  'York',
] as const;

/** The mark on the part of a row that earned its place in the list. */
const HIT = 'background: var(--sp-accent-soft); border-radius: 3px; font-weight: 600';

function slug(name: string): string {
  return name.toLowerCase();
}

/**
 * Typeahead specimen: suggestions that are re-drawn on every keystroke, with the
 * matched characters marked so it is clear why each row is there. The subject is the
 * field and its list together, since the term names the loop between them rather than
 * either part: the input alone is a text field and the list alone is a listbox.
 *
 * The widget underneath is the kit's `<sp-combobox>`, written once against the ARIA
 * authoring practices and reused (SPEC §5), so this demo adds only what the pattern
 * itself is about: the live filter and the mark on the match. The list is drawn over
 * the scene, and the row that reports the choice keeps its height from mount, so
 * neither arriving nor choosing moves anything (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 250px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Departures</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <sp-combobox data-part="field" data-subject>
            <input class="sp-input" data-part="query" type="text" spellcheck="false" aria-label="Station" placeholder="Search stations" />
            <ul class="sp-listbox" data-part="suggestions">
              ${STATIONS.map((name) => `<li class="sp-option" data-part="opt-${slug(name)}" data-label="${name}">${name}</li>`).join('')}
            </ul>
          </sp-combobox>
          <div class="sp-row sp-surface" data-part="result" style="flex: 0 0 auto; gap: 8px; padding: 8px 10px">
            <span class="sp-text" data-part="result-text">No station chosen</span>
          </div>
          <span class="sp-label sp-context" data-stage-verdict data-part="hint" role="status">Type two letters, then pick from what came back.</span>
        </div>
      </div>
    </div>
  `;

  const input = part(root, 'query') as HTMLInputElement;
  const field = part(root, 'field');
  const result = part(root, 'result');
  const resultText = part(root, 'result-text');
  const hint = part(root, 'hint');
  const options = [...root.querySelectorAll<HTMLElement>('.sp-option')];

  // The result row keeps the room it will need, so a choice never re-lays the body.
  result.style.height = `${result.offsetHeight}px`;

  const query = () => input.value.trim().toLowerCase();

  /** Mark the characters that earned each surviving row its place. */
  const markMatches = () => {
    const q = query();
    for (const option of options) {
      const label = option.dataset.label ?? '';
      const at = q ? label.toLowerCase().indexOf(q) : -1;
      if (at < 0) {
        option.textContent = label;
        continue;
      }
      option.innerHTML = `${label.slice(0, at)}<span style="${HIT}">${label.slice(at, at + q.length)}</span>${label.slice(at + q.length)}`;
    }
  };

  const countMatches = () => options.filter((option) => !option.hidden).length;

  // The kit combobox has already filtered by the time this runs, so the count is the
  // one a live region should report: how many suggestions this keystroke left.
  input.addEventListener('input', () => {
    markMatches();
    const q = query();
    if (q.length === 0) {
      hint.textContent = 'Type two letters, then pick from what came back.';
      return;
    }
    const matches = countMatches();
    hint.textContent = matches === 0 ? `No stations match "${q}"` : `${matches} station${matches === 1 ? '' : 's'} match "${q}"`;
  });

  field.addEventListener('select', (event) => {
    const chosen = (event as CustomEvent<string>).detail;
    result.dataset.chosen = slug(chosen);
    resultText.className = 'sp-text sp-text--ink';
    resultText.textContent = `Departures from ${chosen}`;
  });
}
