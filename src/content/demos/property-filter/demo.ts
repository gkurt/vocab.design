import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const FIELD_H = 36;
const LIST_H = 150;

const PROPERTIES = [
  { key: 'state', label: 'state', hint: 'open or closed' },
  { key: 'label', label: 'label', hint: 'bug, chore, docs' },
  { key: 'assignee', label: 'assignee', hint: 'a person' },
  { key: 'updated', label: 'updated', hint: 'a date' },
] as const;

const OPERATORS = [
  { key: 'eq', glyph: '=', label: 'equals' },
  { key: 'neq', glyph: '≠', label: 'does not equal' },
] as const;

const VALUES = [
  { key: 'open', label: 'open' },
  { key: 'closed', label: 'closed' },
] as const;

const ISSUES = [
  { key: 'r1', title: 'Harbour survey misses the tide', state: 'open', who: 'A. Okafor' },
  { key: 'r2', title: 'Chart legend overlaps the axis', state: 'open', who: 'M. Idris' },
  { key: 'r3', title: 'Harbour map colours are wrong', state: 'closed', who: 'R. Vance' },
  { key: 'r4', title: 'Add a scope bar to search', state: 'closed', who: 'J. Perez' },
] as const;

type Step = 'idle' | 'property' | 'operator' | 'value' | 'free';

const option = (name: string, label: string, hint: string) => `
  <button class="sp-menu-item" type="button" data-part="opt-${name}" hidden>
    <span class="sp-grow" style="font-size: 12.5px">${label}</span>
    <span class="sp-label" style="flex: 0 0 auto; font-size: 10.5px">${hint}</span>
  </button>`;

/**
 * Property filter specimen: one field that assembles a query out of what it offers. Clicking
 * in it lists the properties it knows, typing narrows them, and picking one walks the reader
 * through an operator and then a value, at which point the finished triple lands in the field
 * as a token. Free text is still allowed after it, and removing the token leaves that free
 * text standing, which is the honest picture of a query made of parts.
 *
 * The subject is the field, not the tokens. A chip on its own is a chip, and a menu on its own
 * is a menu; what this term names is the control that turns four gestures into a structured
 * query, so the pin belongs on the box the tokens land in. The issue list and the count are
 * the scene around it in the context register.
 *
 * A caption under the list once read "One token is one property, one operator, one value.",
 * which is the site defining its own term inside an issue tracker. It is gone, and the frame
 * is shorter by its height; the assembly on screen shows the same thing three clicks running.
 *
 * The menu is anchored under the field and overlays the list, so opening and closing it moves
 * nothing (SPEC §5), and the list keeps a fixed box with room for every row. Each step of the
 * assembly reaches a named state rather than flipping one (SPEC §8): the field opens on the
 * property step whatever it finds, and the token is dismissed by its own remove control. The
 * evidence of a pick is mirrored onto the token chip, which stays on stage after the menu that
 * offered it has closed.
 */
export function mount(root: HTMLElement): void {
  const rows = ISSUES.map(
    (issue) => `
      <li class="sp-list-item" data-part="row-${issue.key}" style="gap: 9px; padding: 3px 10px">
        <span class="sp-grow" style="font-size: 12.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${issue.title}</span>
        <span class="sp-label" style="flex: 0 0 auto; width: 46px; font-size: 10.5px">${issue.state}</span>
        <span class="sp-label" style="flex: 0 0 auto; width: 62px; font-size: 10.5px; text-align: right">${issue.who}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 279px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Issues</span>
          <span class="sp-text" data-part="readout" style="width: 250px; text-align: right; white-space: nowrap; font-size: 12px">No query yet</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; position: relative">
          <div
            class="sp-input"
            data-part="field"
            data-subject
            data-step="idle"
            data-free="none"
            style="display: flex; align-items: center; gap: 7px; flex: 0 0 auto; height: ${FIELD_H}px; padding: 0 10px"
          >
            <span style="display: flex; flex: 0 0 auto; color: var(--sp-muted)">${icon('filter')}</span>
            <span class="sp-chip" data-part="token" data-state="none" hidden style="flex: 0 0 auto; gap: 5px; cursor: default">
              <span data-part="token-text">state</span>
              <button class="sp-chip-remove" type="button" data-part="token-remove" aria-label="Remove this condition" hidden>✕</button>
            </span>
            <input
              data-part="input"
              type="text"
              autocomplete="off"
              placeholder="Filter by property or free text"
              aria-label="Filter issues"
              style="flex: 1 1 90px; min-width: 90px; padding: 0; border: 0; outline: none; background: transparent; font: inherit; font-size: 13px; color: inherit"
            />
          </div>

          <div
            class="sp-menu"
            data-part="menu"
            role="listbox"
            aria-label="Suggestions"
            style="top: ${FIELD_H + 4}px; left: 26px; width: 232px; z-index: 2"
          >
            ${PROPERTIES.map((property) => option(property.key, property.label, property.hint)).join('')}
            ${OPERATORS.map((operator) => option(operator.key, operator.glyph, operator.label)).join('')}
            ${VALUES.map((value) => option(value.key, value.label, 'value')).join('')}
          </div>

          <div class="sp-surface sp-context" style="display: flex; flex-direction: column; flex: 0 0 auto; height: ${LIST_H}px; overflow: hidden; padding: 3px 4px">
            <ul class="sp-list sp-grow" style="flex: 1 1 auto">${rows}</ul>
            <span class="sp-label" data-part="count" data-hits="4" style="flex: 0 0 auto; padding: 4px 8px 2px; font-size: 11px; white-space: nowrap">4 of 4 issues match</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const field = part(root, 'field');
  const input = part(root, 'input') as HTMLInputElement;
  const menu = part(root, 'menu');
  const token = part(root, 'token');
  const tokenText = part(root, 'token-text');
  const tokenRemove = part(root, 'token-remove');
  const count = part(root, 'count');
  const readout = part(root, 'readout');

  let step: Step = 'idle';
  let property: string | undefined;
  let operator: (typeof OPERATORS)[number] | undefined;
  let value: string | undefined;
  let free = '';

  const optionsFor = (next: Step): string[] => {
    if (next === 'property') {
      const typed = input.value.trim().toLowerCase();
      return PROPERTIES.filter((entry) => entry.key.startsWith(typed)).map((entry) => entry.key);
    }
    if (next === 'operator') return OPERATORS.map((entry) => entry.key);
    if (next === 'value') return VALUES.map((entry) => entry.key);
    return [];
  };

  const committed = () => property !== undefined && operator !== undefined && value !== undefined;

  const query = () => {
    const parts: string[] = [];
    if (committed()) parts.push(`${property} ${operator?.glyph} ${value}`);
    if (free) parts.push(free);
    return parts.length ? parts.join('  ') : 'No query yet';
  };

  const filter = () => {
    let hits = 0;
    for (const issue of ISSUES) {
      const byToken = !committed() || (operator?.key === 'eq' ? issue.state === value : issue.state !== value);
      const byText = !free || issue.title.toLowerCase().includes(free.toLowerCase());
      const shown = byToken && byText;
      part(root, `row-${issue.key}`).toggleAttribute('hidden', !shown);
      if (shown) hits += 1;
    }
    count.dataset.hits = String(hits);
    count.textContent = `${hits} of ${ISSUES.length} issues match`;
    readout.textContent = query();
  };

  const render = (next: Step) => {
    step = next;
    field.dataset.step = next;
    const open = next === 'property' || next === 'operator' || next === 'value';
    flag(menu, 'data-open', open);
    const shown = new Set(optionsFor(next));
    for (const key of [...PROPERTIES, ...OPERATORS, ...VALUES].map((entry) => entry.key)) {
      part(root, `opt-${key}`).toggleAttribute('hidden', !shown.has(key));
    }

    const label = property === undefined ? '' : `${property}${operator ? ` ${operator.glyph}` : ''}${value ? ` ${value}` : ''}`;
    const state = committed() ? 'committed' : property === undefined ? 'none' : 'pending';
    token.toggleAttribute('hidden', state === 'none');
    token.dataset.state = state;
    token.style.borderStyle = state === 'committed' ? 'solid' : 'dashed';
    tokenRemove.toggleAttribute('hidden', state !== 'committed');
    tokenText.textContent = label;
    filter();
  };

  // Clicking into the field always opens on the property step rather than flipping the menu,
  // so a pass resumed at any point means the same thing (SPEC §8).
  input.addEventListener('click', () => render('property'));

  input.addEventListener('input', () => {
    if (step === 'free') {
      free = input.value.trim();
      field.dataset.free = free === '' ? 'none' : free;
      filter();
      return;
    }
    render('property');
  });

  for (const entry of PROPERTIES) {
    part(root, `opt-${entry.key}`).addEventListener('click', () => {
      property = entry.key;
      operator = undefined;
      value = undefined;
      input.value = '';
      render('operator');
    });
  }

  for (const entry of OPERATORS) {
    part(root, `opt-${entry.key}`).addEventListener('click', () => {
      operator = entry;
      value = undefined;
      render('value');
    });
  }

  for (const entry of VALUES) {
    part(root, `opt-${entry.key}`).addEventListener('click', () => {
      value = entry.key;
      // The triple is complete, so the token lands in the field and the menu is done with.
      render('free');
    });
  }

  tokenRemove.addEventListener('click', () => {
    property = undefined;
    operator = undefined;
    value = undefined;
    render(free ? 'free' : 'idle');
  });

  render('idle');
}
