import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const STATUSES = [
  { key: 'queued', label: 'Queued', runs: 4 },
  { key: 'running', label: 'Running', runs: 2 },
  { key: 'passed', label: 'Passed', runs: 31 },
  { key: 'failed', label: 'Failed', runs: 6 },
  { key: 'skipped', label: 'Skipped', runs: 3 },
];

const START = ['failed'];

const chip = (key: string, label: string) => `
  <span class="sp-chip" data-part="chip-${key}" style="cursor: default">
    ${label}
    <button class="sp-chip-remove" type="button" data-part="chip-${key}-remove" data-remove="${key}" aria-label="Remove ${label.toLowerCase()}">✕</button>
  </span>`;

/**
 * Multi select specimen: one field holding several answers, chosen from a listbox of
 * checkbox rows and shown back as removable tokens. The subject is the control (the
 * field and the list it owns), since the list is part of the select rather than a
 * surface that merely sits nearby; the filter panel around it is scenery.
 *
 * The field is held at two rows of tokens from mount (SPEC §5), so a third answer
 * fills room that was already reserved instead of pushing the summary down. The
 * trigger only ever opens, and the list stays open as picks accumulate: dismissal is
 * Escape or a press outside, which is what a control that is not finished after one
 * choice has to do (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const options = STATUSES.map(
    ({ key, label, runs }) => `
      <li
        class="sp-option sp-row"
        role="option"
        data-part="opt-${key}"
        data-key="${key}"
        aria-selected="${START.includes(key)}"
        style="gap: 8px"
      >
        <span class="sp-checkbox" data-part="box-${key}" aria-hidden="true"${START.includes(key) ? ' data-checked' : ''}></span>
        <span class="sp-grow">${label}</span>
        <span class="sp-text" style="font-size: 12px">${runs}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 340px; height: 320px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" data-part="outside">Test runs</span>
          <span class="sp-label" data-part="count" style="width: 62px; text-align: right">6 runs</span>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-label" style="margin-bottom: 6px" id="vd-ms-label">Status</div>
          <div data-part="control" data-subject style="position: relative">
            <div
              class="sp-input sp-row"
              data-part="trigger"
              role="combobox"
              tabindex="0"
              aria-controls="vd-ms-list"
              aria-haspopup="listbox"
              aria-expanded="false"
              aria-labelledby="vd-ms-label"
              style="align-items: flex-start; flex-wrap: wrap; gap: 6px; min-height: 62px; padding: 8px; cursor: pointer"
            >
              <span class="sp-row sp-row--wrap sp-grow" data-part="chips" style="gap: 6px"></span>
              <span class="sp-text" data-part="placeholder" hidden>Any status</span>
              ${icon('chevronDown')}
            </div>
            <ul
              class="sp-listbox"
              data-part="list"
              id="vd-ms-list"
              role="listbox"
              aria-multiselectable="true"
              aria-labelledby="vd-ms-label"
              style="max-height: 160px"
            >${options}</ul>
          </div>
        </div>
      </div>
    </div>
  `;

  const control = part(root, 'control');
  const trigger = part(root, 'trigger');
  const list = part(root, 'list');
  const chips = part(root, 'chips');
  const placeholder = part(root, 'placeholder');
  const count = part(root, 'count');

  const chosen = new Set(START);

  const draw = () => {
    chips.innerHTML = STATUSES.filter(({ key }) => chosen.has(key))
      .map(({ key, label }) => chip(key, label))
      .join('');
    placeholder.hidden = chosen.size > 0;
    for (const { key } of STATUSES) {
      const option = part(root, `opt-${key}`);
      option.setAttribute('aria-selected', String(chosen.has(key)));
      flag(part(root, `box-${key}`), 'data-checked', chosen.has(key));
    }
    const total = STATUSES.filter(({ key }) => chosen.has(key)).reduce((sum, { runs }) => sum + runs, 0);
    count.textContent = chosen.size === 0 ? '46 runs' : `${total} runs`;
    // Stated in the list's own order, so the set reads the same however it was built.
    control.dataset.chosen = STATUSES.filter(({ key }) => chosen.has(key))
      .map(({ key }) => key)
      .join(' ');
  };

  const setOpen = (open: boolean) => {
    flag(list, 'data-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };

  trigger.addEventListener('click', (event) => {
    // A press on a token's remove button is not a press on the field.
    if ((event.target as HTMLElement).closest('[data-remove]')) return;
    setOpen(true);
  });

  trigger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
    }
  });

  // Delegated, because the tokens are rewritten whenever the set changes.
  chips.addEventListener('click', (event) => {
    const key = (event.target as HTMLElement).closest<HTMLElement>('[data-remove]')?.dataset.remove;
    if (!key) return;
    chosen.delete(key);
    draw();
  });

  for (const { key } of STATUSES) {
    const option = part(root, `opt-${key}`);
    const pick = () => {
      // Checking a row is the term: the set is what a multi select answers with, so a
      // row reports in or out and the list stays open either way.
      if (chosen.has(key)) chosen.delete(key);
      else chosen.add(key);
      draw();
    };
    option.addEventListener('click', pick);
    option.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      pick();
    });
  }

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    if (!control.contains(target)) setOpen(false);
  });

  draw();
}
