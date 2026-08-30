import { part } from '#src/kit/parts.ts';

type Child = { key: string; label: string; meta: string; checked: boolean };

const CHILDREN: Child[] = [
  { key: 'tokens', label: 'Design tokens', meta: '12 files', checked: true },
  { key: 'icons', label: 'Icons', meta: '86 files', checked: false },
  { key: 'type', label: 'Type scale', meta: '4 files', checked: false },
];

const CAPTION = {
  mixed: 'Some but not all: the parent reports "mixed", which is a summary of the group and not an answer of its own.',
  true: 'Every child is checked, so the parent says so. Pressing it again clears the whole group.',
  false: 'Nothing is checked. Pressing the parent takes the group all the way to checked.',
} as const;

/**
 * Mixed state checkbox specimen: a "Select all" box over three children, showing the third
 * state a governing checkbox needs. The parent is derived from the children on every
 * change, so it can never claim more than the group says, and the readout prints the
 * `aria-checked` value the control actually carries.
 *
 * The subject is the parent checkbox: the narrowest element the term names. The children,
 * the readout and the caption are scenery (SPEC §5). All-checked and none-checked are
 * states the parent itself passes through and neither of them is this term, so the honest
 * condition is declared in `data-pose` and the mount state satisfies it: identify refuses
 * to ring a plain checked box (SPEC §6).
 *
 * The readout used to be introduced by a label reading "The parent announces", which is
 * the site explaining its own instrument. The attribute line names itself, so the label
 * went and the readout keeps its place at the right edge.
 *
 * Pressing the parent toggles the group, which is the one sanctioned toggle here: the
 * cycle from mixed to all and from all to none IS the behaviour this term names (SPEC §8).
 * The parent carries `data-aim` so the ghost cursor parks at its corner instead of over a
 * 16 pixel box; nothing here resolves input by coordinate.
 */
export function mount(root: HTMLElement): void {
  const row = (c: Child) => `
    <div class="sp-row" data-part="row-${c.key}" style="gap: 10px; height: 30px">
      <button class="sp-checkbox" type="button" role="checkbox" data-part="child-${c.key}" data-aim
              aria-checked="${c.checked}" aria-label="${c.label}"></button>
      <span class="sp-text sp-text--ink sp-grow" style="font-size: 13px">${c.label}</span>
      <span class="sp-text" style="font-size: 11px">${c.meta}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 408px; padding: 12px 16px">
        <div class="sp-row" style="gap: 10px; height: 30px">
          <button class="sp-checkbox" type="button" role="checkbox" data-part="parent" data-subject
                  data-pose="[aria-checked=mixed]" data-aim aria-checked="mixed" aria-label="Select all"></button>
          <span class="sp-text sp-text--ink sp-grow" style="font-size: 13px; font-weight: 600">Select all</span>
          <span class="sp-text sp-context" data-part="count" style="font-size: 11px">1 of 3</span>
        </div>
        <div class="sp-divider" style="margin: 4px 0 6px"></div>

        <div class="sp-context">
          ${CHILDREN.map(row).join('')}
        </div>

        <div class="sp-row sp-context" style="margin-top: 8px; height: 18px; justify-content: flex-end">
          <span class="sp-text sp-text--ink" data-part="readout" data-state="mixed"
                style="font-size: 12px; white-space: nowrap">aria-checked = mixed</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-case="mixed"
           style="margin: 6px 0 0; height: 30px; font-size: 11px">${CAPTION.mixed}</p>
      </div>
    </div>
  `;

  const parent = part(root, 'parent');
  const count = part(root, 'count');
  const readout = part(root, 'readout');
  const caption = part(root, 'caption');
  const boxes = CHILDREN.map((c) => ({ child: c, el: part(root, `child-${c.key}`) }));

  const isChecked = (el: HTMLElement) => el.getAttribute('aria-checked') === 'true';

  /** The parent is never set directly: it is read off the children, every time. */
  const derive = () => {
    const checked = boxes.filter(({ el }) => isChecked(el)).length;
    const state = checked === boxes.length ? 'true' : checked === 0 ? 'false' : 'mixed';
    parent.setAttribute('aria-checked', state);
    count.textContent = `${checked} of ${boxes.length}`;
    readout.dataset.state = state;
    readout.textContent = `aria-checked = ${state}`;
    caption.dataset.case = state;
    caption.textContent = CAPTION[state];
  };

  for (const { el } of boxes)
    el.addEventListener('click', () => {
      el.setAttribute('aria-checked', String(!isChecked(el)));
      derive();
    });

  // The sanctioned cycle: a mixed or empty parent takes the group to all, a full one
  // clears it. Mixed only ever arrives from below, when a child changes.
  parent.addEventListener('click', () => {
    const all = parent.getAttribute('aria-checked') !== 'true';
    for (const { el } of boxes) el.setAttribute('aria-checked', String(all));
    derive();
  });

  derive();
}
