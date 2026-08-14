import { flag, part } from '#src/kit/parts.ts';

const TABS = [
  { id: 'overview', label: 'Overview', body: 'Two berths and a tender' },
  { id: 'details', label: 'Details', body: 'Draft 1.4 m, beam 3.2 m' },
  { id: 'history', label: 'History', body: 'Refitted in the spring' },
];

const tabRow = (key: string) =>
  TABS.map(
    (tab, i) =>
      `<button
         class="sp-segment"
         type="button"
         role="tab"
         tabindex="-1"
         data-part="${key}-tab-${tab.id}"
         aria-selected="${i === 0}"
         style="padding: 5px 12px"
       >${tab.label}</button>`,
  ).join('');

/**
 * One row of the comparison. The quiet one is the counter-example, so its whole block sits
 * in the context register; the subject's own block keeps the full palette and hands the
 * register to the label and the panel around it, since neither of those is the term.
 */
const block = (key: string, title: string, quiet: boolean) => `
  <div class="sp-stack${quiet ? ' sp-context' : ''}" style="gap: 6px">
    <div class="sp-row sp-row--between${quiet ? '' : ' sp-context'}">
      <span class="sp-label">${title}</span>
      <span class="sp-label" data-part="${key}-state" style="width: 236px; text-align: right; white-space: nowrap">focus Overview, showing Overview</span>
    </div>
    <div
      class="sp-row"
      role="tablist"
      aria-label="${title}"
      data-part="${key}-tabs"
      ${quiet ? '' : 'data-subject'}
      tabindex="0"
      style="gap: 2px"
    >${tabRow(key)}</div>
    <div class="sp-surface${quiet ? '' : ' sp-context'}" data-part="${key}-panel" style="height: 32px; padding: 6px 10px; font-size: 12px">${TABS[0]?.body ?? ''}</div>
  </div>`;

/**
 * Selection follows focus specimen: the same three tabs twice, once where arrowing the
 * simulated focus selects as it goes and once where the selection waits for Enter, each row
 * reporting where its focus is and what its panel is showing. The subject is the automatic
 * row, since the term names the widget whose selection travels with its focus; the manual
 * row is the counter-example and stays in the context register, as do the labels and the
 * panels.
 *
 * Focus here is simulated throughout (`data-sim-focus`), never real: attract mode may not
 * move a reader's focus (SPEC §7), and a term about the difference between focus and
 * selection has to be able to show the two of them on different items, which is exactly what
 * the manual row does between the arrow and the Enter.
 *
 * Selection is painted as a background and focus as the kit's ring, so neither of them moves
 * anything, and both panels keep their height whatever they are showing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 284px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Boat</span>
          <span class="sp-row" style="gap: 6px">
            <span class="sp-kbd">Arrow</span>
            <span class="sp-label">moves focus</span>
            <span class="sp-kbd" style="margin-left: 6px">Enter</span>
            <span class="sp-label">selects</span>
          </span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          ${block('auto', 'Selection follows focus', false)}
          <div class="sp-divider sp-context"></div>
          ${block('manual', 'Manual activation', true)}
        </div>
      </div>
    </div>
  `;

  const wire = (key: string, follows: boolean) => {
    const list = part(root, `${key}-tabs`);
    const state = part(root, `${key}-state`);
    const panel = part(root, `${key}-panel`);
    const tabs = TABS.map((tab) => part(root, `${key}-tab-${tab.id}`));
    let focused = 0;
    let selected = 0;

    const draw = () => {
      for (const [i, tab] of tabs.entries()) {
        flag(tab, 'data-sim-focus', i === focused);
        tab.setAttribute('aria-selected', String(i === selected));
        tab.style.background = i === selected ? 'var(--sp-accent-soft)' : '';
        // Selection is drawn as fill plus an underline so it stays legible beside the focus
        // ring, and in the quiet row, where the accent has gone chroma-free.
        tab.style.boxShadow = i === selected ? 'inset 0 -2px 0 var(--sp-accent)' : '';
      }
      panel.textContent = TABS[selected]?.body ?? '';
      state.textContent = `focus ${TABS[focused]?.label}, showing ${TABS[selected]?.label}`;
      // The one fact the manual row can hold and the automatic row cannot.
      flag(list, 'data-split', focused !== selected);
    };

    const move = (delta: number) => {
      focused = (focused + delta + tabs.length) % tabs.length;
      if (follows) selected = focused;
      draw();
    };

    list.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1);
        return;
      }
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      // What the manual row was waiting for; in the automatic row it has already happened.
      selected = focused;
      draw();
    });

    for (const [i, tab] of tabs.entries()) {
      // A pointer picks a tab outright in either mode, which is the one thing the two
      // activations agree about.
      tab.addEventListener('click', () => {
        focused = i;
        selected = i;
        draw();
      });
    }

    draw();
  };

  wire('auto', true);
  wire('manual', false);
}
