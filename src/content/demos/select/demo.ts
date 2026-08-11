import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const SIZES = [
  { key: 'a5', label: 'A5', estimate: '1.1 MB' },
  { key: 'a4', label: 'A4', estimate: '2.4 MB' },
  { key: 'a3', label: 'A3', estimate: '4.8 MB' },
  { key: 'poster', label: 'Poster', estimate: '9.2 MB' },
];

const CURRENT = 'a4';

/**
 * Select specimen: a control that rests closed on its current value and lifts the
 * alternatives over the layout when pressed. The subject is the control as a whole
 * (the closed value plus the list it owns), since the popup is part of the select
 * rather than a surface that merely happens to be nearby.
 *
 * The list is out of flow, so opening it moves nothing in the panel (SPEC §5), and
 * the trigger only ever opens: dismissal is choosing an option, Escape, or a click
 * outside (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const current = SIZES.find((size) => size.key === CURRENT) ?? SIZES[0];
  const options = SIZES.map(
    ({ key, label }) =>
      `<li class="sp-option" role="option" id="size-${key}" data-part="opt-${key}" data-key="${key}" aria-selected="${key === CURRENT}">${label}</li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Export</span></div>
        <div class="sp-body">
          <div class="sp-row sp-row--between">
            <span class="sp-label sp-context" id="size-label">Paper size</span>
            <div data-part="select" data-subject style="position: relative; width: 150px">
              <button
                class="sp-button sp-button--ghost sp-row sp-row--between"
                data-part="trigger"
                data-value="${CURRENT}"
                role="combobox"
                aria-controls="size-list"
                aria-haspopup="listbox"
                aria-expanded="false"
                aria-labelledby="size-label size-value"
                style="width: 100%"
              >
                <span data-part="value" id="size-value">${current?.label ?? ''}</span>
                ${icon('chevronDown')}
              </button>
              <ul class="sp-listbox" id="size-list" role="listbox" aria-label="Paper size" data-part="list">${options}</ul>
            </div>
          </div>
          <div class="sp-divider sp-context" style="margin: 14px 0"></div>
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-label">Estimated file</span>
            <span class="sp-text" data-part="estimate">${current?.estimate ?? ''}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const trigger = part(root, 'trigger');
  const list = part(root, 'list');
  const value = part(root, 'value');
  const estimate = part(root, 'estimate');

  const setOpen = (open: boolean) => {
    flag(list, 'data-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };

  const choose = (option: HTMLElement) => {
    const size = SIZES.find((entry) => entry.key === option.dataset.key);
    if (!size) return;
    for (const other of list.children) other.setAttribute('aria-selected', String(other === option));
    trigger.dataset.value = size.key;
    value.textContent = size.label;
    estimate.textContent = size.estimate;
    setOpen(false);
  };

  trigger.addEventListener('click', () => setOpen(true));
  for (const option of list.children) option.addEventListener('click', () => choose(option as HTMLElement));

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    if (!list.contains(target) && !trigger.contains(target)) setOpen(false);
  });
}
