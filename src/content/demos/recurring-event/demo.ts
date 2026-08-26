import { part } from '#src/kit/parts.ts';

/** The first six occurrences the rule generates. Nothing here is stored as a copy. */
const OCCURRENCES = [
  { id: 1, day: 'Tue', date: '2 Sep' },
  { id: 2, day: 'Tue', date: '16 Sep' },
  { id: 3, day: 'Tue', date: '30 Sep' },
  { id: 4, day: 'Tue', date: '14 Oct' },
  { id: 5, day: 'Tue', date: '28 Oct' },
  { id: 6, day: 'Tue', date: '11 Nov' },
];

/** The three answers an edit to a series can have, and none of them is a safe default. */
const SCOPES = [
  { id: 'this', label: 'This event' },
  { id: 'following', label: 'This and following' },
  { id: 'all', label: 'All events' },
];

const CELL_W = 64;

const cells = OCCURRENCES.map(
  (one) => `
    <button
      type="button"
      data-part="occ-${one.id}"
      data-state="kept"
      data-scope="out"
      aria-label="${one.day} ${one.date}"
      style="flex: 0 0 auto; width: ${CELL_W}px; height: 34px; padding: 0; border: 1px solid var(--sp-line); border-radius: 6px;
             background: var(--sp-surface); color: var(--sp-ink); font: inherit; cursor: pointer"
    >
      <span style="display: block; font-size: 9px; color: var(--sp-muted); line-height: 1.2">${one.day}</span>
      <span data-part="date-${one.id}" style="display: block; font-size: 11px; line-height: 1.3">${one.date}</span>
    </button>`,
).join('');

const chips = SCOPES.map(
  (scope) =>
    `<button type="button" class="sp-chip" data-part="scope-${scope.id}" style="flex: 0 0 auto; font-size: 11px">${scope.label}</button>`,
).join('');

/**
 * Recurring event specimen: one event, one rule, and the six occurrences the rule makes.
 * The subject is the RULE LINE, not the strip below it and not the card around it: the
 * strip is the expansion, the card is an event like any other, and the one thing that
 * makes this event recurring is the sentence that says how it repeats and what has been
 * excepted from it. Identify therefore rings the sentence that answers the question.
 *
 * The demonstration is the edit every series has to ask about. Picking an occurrence and
 * then a scope PREVIEWS which occurrences the change would touch, which is the honest
 * version of a dialog that cannot be designed away; applying it writes one exception, and
 * the rule line says so while the other five occurrences stay exactly as they were.
 *
 * Every pick is absolute rather than a toggle (SPEC §8): a scope chip sets the scope, it
 * never inverts it, so a pass interrupted anywhere still ends in a state that means what
 * it looks like. The scope row and the exception note are both in the layout from mount,
 * their room reserved, so nothing moves when they fill (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 306px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Event</span>
          <span class="sp-label" style="flex: 0 0 auto; white-space: nowrap">Series</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center">
          <div class="sp-surface" style="flex: 0 0 auto; width: 442px; padding: 12px">
            <div class="sp-heading" style="font-size: 14px">Team standup</div>
            <div
              data-part="rule"
              data-subject
              data-exceptions="0"
              style="display: flex; align-items: baseline; gap: 6px; margin-top: 4px; font-size: 12px; color: var(--sp-muted)"
            >
              <span>Every second Tuesday at 9:30, until 16 Dec</span>
              <span data-part="rule-exceptions" style="flex: 0 0 auto; width: 84px; color: var(--sp-warn)"></span>
            </div>
            <div class="sp-divider" style="margin: 10px 0"></div>
            <span class="sp-label" style="font-size: 10px">Next six occurrences</span>
            <div style="display: flex; gap: 6px; margin-top: 5px">${cells}</div>
            <div class="sp-divider" style="margin: 10px 0"></div>
            <span class="sp-label" style="font-size: 10px">This change applies to</span>
            <div class="sp-row" style="margin-top: 5px; gap: 6px">
              ${chips}
              <span class="sp-grow"></span>
              <button type="button" class="sp-button sp-button--sm" data-part="apply" style="flex: 0 0 auto">Skip it</button>
            </div>
          </div>
          <span class="sp-text sp-context" style="width: 442px; margin-top: 8px; font-size: 11px; line-height: 1.35; text-align: center">
            One rule, not six copies. An edit has to say which occurrences it means.
          </span>
        </div>
      </div>
    </div>
  `;

  const rule = part(root, 'rule');
  const note = part(root, 'rule-exceptions');
  const cellOf = new Map(OCCURRENCES.map((one) => [one.id, part(root, `occ-${one.id}`)]));
  const chipOf = new Map(SCOPES.map((scope) => [scope.id, part(root, `scope-${scope.id}`)]));

  let picked: number | undefined;
  let scope = 'this';
  const skipped = new Set<number>();

  const inScope = (id: number) => {
    if (picked === undefined) return false;
    if (scope === 'all') return true;
    if (scope === 'following') return id >= picked;
    return id === picked;
  };

  const render = () => {
    for (const one of OCCURRENCES) {
      const el = cellOf.get(one.id);
      const date = part(root, `date-${one.id}`);
      if (!el) continue;
      const gone = skipped.has(one.id);
      const lit = inScope(one.id);
      el.dataset.state = gone ? 'skipped' : 'kept';
      el.dataset.scope = lit ? 'in' : 'out';
      if (one.id === picked) el.setAttribute('data-selected', '');
      else el.removeAttribute('data-selected');
      el.style.background = gone ? 'transparent' : lit ? 'var(--sp-accent-soft)' : 'var(--sp-surface)';
      el.style.borderStyle = gone ? 'dashed' : 'solid';
      el.style.borderColor = gone ? 'var(--sp-line)' : lit ? 'var(--sp-accent)' : 'var(--sp-line)';
      el.style.boxShadow = one.id === picked ? 'inset 0 0 0 2px var(--sp-accent)' : 'none';
      el.style.color = gone ? 'var(--sp-muted)' : 'var(--sp-ink)';
      date.style.textDecoration = gone ? 'line-through' : 'none';
    }
    for (const one of SCOPES) {
      const chip = chipOf.get(one.id);
      if (!chip) continue;
      if (one.id === scope) chip.setAttribute('data-selected', '');
      else chip.removeAttribute('data-selected');
    }
    rule.dataset.exceptions = String(skipped.size);
    note.textContent = skipped.size ? `${skipped.size} skipped` : '';
  };

  for (const one of OCCURRENCES) {
    cellOf.get(one.id)?.addEventListener('click', () => {
      picked = one.id;
      render();
    });
  }

  for (const one of SCOPES) {
    // An absolute pick, never an inversion: the scope is set to this chip's answer.
    chipOf.get(one.id)?.addEventListener('click', () => {
      scope = one.id;
      render();
    });
  }

  part(root, 'apply').addEventListener('click', () => {
    if (picked === undefined) return;
    // The exception is written against the rule; the rule itself is untouched, which is why
    // the other occurrences do not move.
    for (const one of OCCURRENCES) {
      if (inScope(one.id)) skipped.add(one.id);
    }
    render();
  });

  render();
}
