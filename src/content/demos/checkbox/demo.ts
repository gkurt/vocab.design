import { part } from '#src/kit/parts.ts';

type Option = { id: string; label: string; checked: boolean };

/** One option starts on, so the group opens on the state only a checkbox has: mixed. */
const OPTIONS: Option[] = [
  { id: 'contacts', label: 'Contacts', checked: true },
  { id: 'invoices', label: 'Invoices', checked: false },
  { id: 'messages', label: 'Messages', checked: false },
];

/** The one box the term names, out of four that behave alike. */
const SUBJECT = 'contacts';

function optionRow(option: Option): string {
  return `
    <div class="sp-row" data-part="row-${option.id}">
      <button class="sp-checkbox" type="button" role="checkbox" aria-checked="${option.checked}" aria-labelledby="cb-${option.id}-label" data-part="opt-${option.id}"${option.id === SUBJECT ? ' data-subject' : ''}></button>
      <span class="sp-text sp-text--ink" id="cb-${option.id}-label">${option.label}</span>
    </div>
  `;
}

/**
 * Checkbox specimen: three options that answer for themselves, under a "Select all"
 * that can only report what they say. The subject is one box, not the row and not
 * the group, since the group is a set of checkboxes rather than a checkbox.
 *
 * Nothing here moves when a box changes (SPEC §5): the check is drawn inside a fixed
 * square, and the tally below never changes its digit count, so the count of chosen
 * options can change without the scene shifting under it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 252px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Export data</span></div>
        <div class="sp-body">
          <div class="sp-surface" style="padding: 10px 12px">
            <div class="sp-row" data-part="row-all">
              <button class="sp-checkbox" type="button" role="checkbox" aria-checked="mixed" aria-labelledby="cb-all-label" data-part="select-all"></button>
              <span class="sp-text sp-text--ink" id="cb-all-label">Select all</span>
            </div>
            <div class="sp-divider" style="margin: 9px 0"></div>
            <div class="sp-stack" style="gap: 9px">${OPTIONS.map(optionRow).join('')}</div>
          </div>
          <div class="sp-row sp-row--between sp-context" style="margin-top: 10px">
            <span class="sp-text" data-part="count">1 of 3 selected</span>
            <button class="sp-button sp-button--sm" type="button">Export</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const all = part(root, 'select-all');
  const count = part(root, 'count');
  const options = OPTIONS.map((option) => ({ option, box: part(root, `opt-${option.id}`) }));

  const isChecked = (box: HTMLElement) => box.getAttribute('aria-checked') === 'true';
  const setChecked = (box: HTMLElement, checked: boolean) => box.setAttribute('aria-checked', String(checked));

  const sync = () => {
    const chosen = options.filter(({ box }) => isChecked(box)).length;
    // "mixed" is what the parent reports, never what a person picks: it is the answer
    // to "some of them", which is a state only an independent set can produce.
    all.setAttribute('aria-checked', chosen === 0 ? 'false' : chosen === options.length ? 'true' : 'mixed');
    count.textContent = `${chosen} of ${options.length} selected`;
  };

  // The row listens, not the box: a checkbox's label is part of its hit target, and a
  // synthesized click gets none of the activation a real <label> would hand it (SPEC §8).
  for (const { option, box } of options) {
    part(root, `row-${option.id}`).addEventListener('click', () => {
      setChecked(box, !isChecked(box));
      sync();
    });
  }

  // Select all completes the set from mixed rather than emptying it, and clears only
  // from full. The toggling is the term here, so both directions are the demonstration.
  part(root, 'row-all').addEventListener('click', () => {
    const next = all.getAttribute('aria-checked') !== 'true';
    for (const { box } of options) setChecked(box, next);
    sync();
  });

  sync();
}
