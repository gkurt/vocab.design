import { flag, part } from '#src/kit/parts.ts';

const PANELS = [
  {
    id: 'overview',
    label: 'Overview',
    heading: 'Loft above the bakery',
    lines: ['Sleeps four, one bathroom, second floor.', 'Ten minutes on foot to the harbour.'],
  },
  {
    id: 'amenities',
    label: 'Amenities',
    heading: 'What is in the flat',
    lines: ['Washer, dishwasher, air conditioning.', 'Desk under the window, wired internet.'],
  },
  {
    id: 'rules',
    label: 'House rules',
    heading: 'Before you book',
    lines: ['No smoking, no parties, pets by request.', 'Quiet hours from eleven until seven.'],
  },
];

/**
 * Tabs specimen: three labels over ONE region, which is the half of the term its
 * lookalikes do not have. A segmented control switches a mode and a scope bar
 * narrows a query; a tab set owns the panel beneath it, so the subject here is the
 * whole widget (tablist plus panel) rather than the row of labels alone.
 *
 * The panel box is a fixed height sized for the tallest panel, so swapping never
 * moves the frame around it (SPEC §5), and only one panel is ever in the flow.
 *
 * The keyboard contract is real rather than drawn: the tabs carry a roving tabindex,
 * so a reader Tabs into the set once and then arrows along it, which is what makes
 * the whole row a single tab stop. The arrow keys move real focus only for a real
 * reader (`event.isTrusted`); attract may never move focus itself (SPEC §7).
 */
export function mount(root: HTMLElement): void {
  const tab = (p: (typeof PANELS)[number], i: number) => `
    <button
      class="sp-button sp-button--quiet sp-button--sm"
      type="button"
      role="tab"
      id="tabs-tab-${p.id}"
      data-part="tab-${p.id}"
      aria-selected="${i === 0}"
      aria-controls="tabs-panel-${p.id}"
      tabindex="${i === 0 ? 0 : -1}"
      style="flex: 0 0 auto; white-space: nowrap; padding: 7px 12px; border-radius: 6px 6px 0 0"
    >${p.label}</button>`;

  const panel = (p: (typeof PANELS)[number], i: number) => `
    <div
      class="sp-stack"
      role="tabpanel"
      id="tabs-panel-${p.id}"
      data-part="panel-${p.id}"
      aria-labelledby="tabs-tab-${p.id}"
      ${i === 0 ? '' : 'hidden'}
      style="gap: 6px"
    >
      <span class="sp-heading" style="font-size: 14px">${p.heading}</span>
      ${p.lines.map((line) => `<span class="sp-text">${line}</span>`).join('')}
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Listing</span>
          <span class="sp-row" style="gap: 6px">
            <span class="sp-kbd">←</span>
            <span class="sp-kbd">→</span>
            <span class="sp-label">between tabs</span>
          </span>
        </div>
        <div class="sp-body">
          <div class="sp-stack" data-part="widget" data-subject style="gap: 0">
            <div
              class="sp-row"
              role="tablist"
              aria-label="Listing details"
              data-part="tablist"
              style="gap: 4px; padding: 0 2px"
            >${PANELS.map(tab).join('')}</div>
            <div
              class="sp-surface"
              data-part="panels"
              style="height: 106px; padding: 12px 14px; border-top-left-radius: 0"
            >${PANELS.map(panel).join('')}</div>
          </div>
          <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin: 12px 0 0; font-size: 12px">
            One region, three panels. The labels only say which one is on top.
          </p>
        </div>
      </div>
    </div>
  `;

  const tabs = PANELS.map((p) => part(root, `tab-${p.id}`));
  const panels = PANELS.map((p) => part(root, `panel-${p.id}`));
  const list = part(root, 'tablist');
  let current = 0;

  const draw = () => {
    for (const [i, el] of tabs.entries()) {
      const on = i === current;
      el.setAttribute('aria-selected', String(on));
      el.tabIndex = on ? 0 : -1;
      // Selection is an underline on the label, painted rather than laid out, so
      // nothing in the row moves when the choice does. The background is left to the
      // kit's own hover rule: an inline colour here would outrank it and the row
      // would stop answering the pointer.
      el.style.color = on ? 'var(--sp-ink)' : 'var(--sp-muted)';
      el.style.boxShadow = on ? 'inset 0 -2px 0 var(--sp-accent)' : '';
      flag(el, 'data-selected', on);
    }
    for (const [i, el] of panels.entries()) el.hidden = i !== current;
  };

  const move = (delta: number, real: boolean) => {
    current = (current + delta + PANELS.length) % PANELS.length;
    draw();
    if (real) tabs[current]?.focus({ preventScroll: true });
  };

  list.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    move(event.key === 'ArrowRight' ? 1 : -1, event.isTrusted);
  });

  for (const [i, el] of tabs.entries()) {
    el.addEventListener('click', () => {
      current = i;
      draw();
    });
  }

  draw();
}
