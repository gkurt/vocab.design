import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type FieldKey = 'none' | 'rating' | 'plays' | 'genre';
type OpKey = 'none' | 'is' | 'atleast' | 'isnot';

const FIELDS: { key: Exclude<FieldKey, 'none'>; label: string }[] = [
  { key: 'rating', label: 'Rating' },
  { key: 'plays', label: 'Play count' },
  { key: 'genre', label: 'Genre' },
];

const OPS: { key: Exclude<OpKey, 'none'>; label: string }[] = [
  { key: 'is', label: 'is' },
  { key: 'atleast', label: 'is at least' },
  { key: 'isnot', label: 'is not' },
];

interface Track {
  genre: string;
  rating: number;
  plays: number;
}

const LIBRARY: Track[] = [
  { genre: 'folk', rating: 5, plays: 40 },
  { genre: 'folk', rating: 5, plays: 9 },
  { genre: 'dub', rating: 4, plays: 22 },
  { genre: 'folk', rating: 4, plays: 14 },
  { genre: 'dub', rating: 4, plays: 3 },
  { genre: 'jazz', rating: 4, plays: 31 },
  { genre: 'jazz', rating: 3, plays: 18 },
  { genre: 'dub', rating: 3, plays: 2 },
  { genre: 'folk', rating: 2, plays: 11 },
  { genre: 'jazz', rating: 5, plays: 13 },
  { genre: 'dub', rating: 1, plays: 6 },
  { genre: 'folk', rating: 3, plays: 27 },
];

interface Clause {
  field: FieldKey;
  op: OpKey;
  value: string;
  live: boolean;
}

const labelOf = (key: FieldKey) => FIELDS.find((entry) => entry.key === key)?.label ?? 'Choose a field';
const opLabelOf = (key: OpKey) => OPS.find((entry) => entry.key === key)?.label ?? 'operator';

/**
 * Rule builder specimen: one smart playlist condition assembled clause by clause. A field is
 * picked from a menu, then an operator the field allows, then a value is typed, and a second
 * clause is added and joined with and or or. The match count and the sentence underneath both
 * answer every keystroke, which is how a reader knows the rule says what they meant.
 *
 * The subject is the rule, the set of clause rows and the join between them, since that
 * assembly is what the term names and what the product saves. The Add control, the match
 * count, the library dots, the readback sentence and the caption are the scene around it in
 * the context register (SPEC §5).
 *
 * The second clause and its join keep their room from mount (hidden but reserved), so adding a
 * clause moves nothing (SPEC §5). Each menu trigger opens rather than toggles, and a pick is
 * the dismissal, so a pass resumed at any point means the same thing; the evidence of a pick
 * is mirrored onto the trigger, which stays on stage after the menu closes (SPEC §8). The
 * second clause's menus open upward so they cannot leave the frame.
 */
export function mount(root: HTMLElement): void {
  const menuItems = (index: number) => `
    <div class="sp-menu" data-part="fieldmenu-${index}" role="menu" style="${index === 2 ? 'bottom: calc(100% + 4px)' : 'top: calc(100% + 4px)'}; left: 0; min-width: 132px; width: 132px; z-index: 3">
      ${FIELDS.map(
        (entry) => `
        <button class="sp-menu-item" data-part="f-${index}-${entry.key}" type="button" style="font-size: 12px">${entry.label}</button>`,
      ).join('')}
    </div>`;

  const opItems = (index: number) => `
    <div class="sp-menu" data-part="opmenu-${index}" role="menu" style="${index === 2 ? 'bottom: calc(100% + 4px)' : 'top: calc(100% + 4px)'}; left: 0; min-width: 128px; width: 128px; z-index: 3">
      ${OPS.map(
        (entry) => `
        <button class="sp-menu-item" data-part="o-${index}-${entry.key}" type="button" style="font-size: 12px">${entry.label}</button>`,
      ).join('')}
    </div>`;

  const clauseRow = (index: number) => `
    <div class="sp-row" data-part="clause-${index}" style="gap: 6px; height: 30px; ${index === 2 ? 'visibility: hidden' : ''}">
      <span style="position: relative; flex: 0 0 auto">
        <button
          class="sp-button sp-button--ghost sp-button--sm"
          data-part="field-${index}"
          data-field="none"
          type="button"
          aria-haspopup="true"
          style="display: inline-flex; align-items: center; gap: 6px; width: 132px; height: 28px; padding: 0 9px; font-size: 12px; white-space: nowrap"
        >
          <span class="sp-grow" data-part="field-label-${index}" style="overflow: hidden; text-overflow: ellipsis; text-align: left">Choose a field</span>
          ${icon('chevronDown')}
        </button>
        ${menuItems(index)}
      </span>
      <span style="position: relative; flex: 0 0 auto">
        <button
          class="sp-button sp-button--ghost sp-button--sm"
          data-part="op-${index}"
          data-op="none"
          type="button"
          aria-haspopup="true"
          style="display: inline-flex; align-items: center; gap: 6px; width: 118px; height: 28px; padding: 0 9px; font-size: 12px; white-space: nowrap"
        >
          <span class="sp-grow" data-part="op-label-${index}" style="overflow: hidden; text-overflow: ellipsis; text-align: left; color: var(--sp-muted)">operator</span>
          ${icon('chevronDown')}
        </button>
        ${opItems(index)}
      </span>
      <input
        class="sp-input sp-grow"
        data-part="value-${index}"
        type="text"
        autocomplete="off"
        placeholder="value"
        aria-label="Value for condition ${index}"
        style="height: 28px; padding: 0 9px; font-size: 12px"
      />
      <button class="sp-icon-button" data-part="remove-${index}" type="button" aria-label="Remove this condition" style="flex: 0 0 auto; width: 24px; height: 24px">${icon('close')}</button>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 264px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Smart playlist: Long walks</span>
          <span class="sp-chip" data-part="count" data-hits="12" style="flex: 0 0 auto; padding: 1px 9px; font-size: 11px; cursor: default; white-space: nowrap">12 of 12 match</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div class="sp-surface" style="flex: 0 0 auto; padding: 10px; background: var(--sp-surface)">
            <div data-part="rule" data-subject data-clauses="1" style="display: flex; flex-direction: column; gap: 6px">
              ${clauseRow(1)}
              <sp-segmented class="sp-segmented" data-part="join" data-value="and" style="align-self: flex-start; visibility: hidden">
                <button class="sp-segment" data-part="join-and" type="button" value="and" style="padding: 2px 10px; font-size: 11px">and</button>
                <button class="sp-segment" data-part="join-or" type="button" value="or" style="padding: 2px 10px; font-size: 11px">or</button>
              </sp-segmented>
              ${clauseRow(2)}
            </div>
          </div>

          <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 8px; height: 28px">
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="add" type="button" style="flex: 0 0 auto; white-space: nowrap">Add condition</button>
            <span class="sp-label sp-grow" style="font-size: 10.5px">Saved with the playlist, applied whenever the library changes.</span>
          </div>

          <div class="sp-surface sp-context" style="flex: 1 1 auto; min-height: 0; padding: 8px 10px">
            <span class="sp-text sp-text--ink" data-part="readback" style="display: block; height: 16px; line-height: 16px; font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">Every track in the library.</span>
            <div class="sp-row" data-part="dots" style="gap: 5px; margin-top: 7px">
              ${LIBRARY.map((_, index) => `<span data-part="dot-${index}" style="flex: 0 0 auto; width: 10px; height: 10px; border-radius: 50%; background: var(--sp-accent)"></span>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" style="width: 452px; height: 30px; font-size: 11px; line-height: 1.35">
        Five picks and a join, and the condition is expressed without writing one. The count answers every keystroke.
      </span>
    </div>
  `;

  const clauses: Record<1 | 2, Clause> = {
    1: { field: 'none', op: 'none', value: '', live: true },
    2: { field: 'none', op: 'none', value: '', live: false },
  };

  const rule = part(root, 'rule');
  const count = part(root, 'count');
  const readback = part(root, 'readback');
  const join = part(root, 'join') as HTMLElement & { value: string };

  const closeMenus = () => {
    for (const index of [1, 2]) {
      part(root, `fieldmenu-${index}`).removeAttribute('data-open');
      part(root, `opmenu-${index}`).removeAttribute('data-open');
    }
  };

  const complete = (clause: Clause) => clause.live && clause.field !== 'none' && clause.op !== 'none' && clause.value.trim() !== '';

  const test = (track: Track, clause: Clause): boolean => {
    if (clause.field === 'genre') {
      const wanted = clause.value.trim().toLowerCase();
      return clause.op === 'isnot' ? track.genre !== wanted : track.genre === wanted;
    }
    const number = Number(clause.value);
    if (Number.isNaN(number)) return true;
    const held = clause.field === 'rating' ? track.rating : track.plays;
    if (clause.op === 'atleast') return held >= number;
    if (clause.op === 'isnot') return held !== number;
    return held === number;
  };

  const sentence = (clause: Clause) => `${labelOf(clause.field)} ${opLabelOf(clause.op)} ${clause.value.trim()}`;

  const render = () => {
    const active = [clauses[1], clauses[2]].filter(complete);
    const matches = LIBRARY.map((track) => {
      if (active.length === 0) return true;
      if (active.length === 1) return test(track, active[0] as Clause);
      const [first, second] = active as [Clause, Clause];
      return join.value === 'or' ? test(track, first) || test(track, second) : test(track, first) && test(track, second);
    });
    const hits = matches.filter(Boolean).length;
    count.dataset.hits = String(hits);
    count.textContent = `${hits} of ${LIBRARY.length} match`;
    for (const [index, matched] of matches.entries()) {
      part(root, `dot-${index}`).style.background = matched ? 'var(--sp-accent)' : 'var(--sp-line)';
    }
    readback.textContent = active.length === 0 ? 'Every track in the library.' : active.map(sentence).join(` ${join.value} `).concat('.');
  };

  const paintClause = (index: 1 | 2) => {
    const clause = clauses[index];
    const field = part(root, `field-${index}`);
    const op = part(root, `op-${index}`);
    field.dataset.field = clause.field;
    op.dataset.op = clause.op;
    part(root, `field-label-${index}`).textContent = labelOf(clause.field);
    const opLabel = part(root, `op-label-${index}`);
    opLabel.textContent = clause.op === 'none' ? 'operator' : opLabelOf(clause.op);
    opLabel.style.color = clause.op === 'none' ? 'var(--sp-muted)' : 'var(--sp-ink)';
    (part(root, `value-${index}`) as HTMLInputElement).value = clause.value;
    render();
  };

  const setLive = (live: boolean) => {
    clauses[2].live = live;
    rule.dataset.clauses = live ? '2' : '1';
    part(root, 'clause-2').style.visibility = live ? 'visible' : 'hidden';
    join.style.visibility = live ? 'visible' : 'hidden';
    render();
  };

  for (const index of [1, 2] as const) {
    // A trigger opens its own menu and closes every other, rather than flipping its own.
    part(root, `field-${index}`).addEventListener('click', () => {
      closeMenus();
      flag(part(root, `fieldmenu-${index}`), 'data-open', true);
    });
    part(root, `op-${index}`).addEventListener('click', () => {
      closeMenus();
      flag(part(root, `opmenu-${index}`), 'data-open', true);
    });

    for (const entry of FIELDS) {
      part(root, `f-${index}-${entry.key}`).addEventListener('click', () => {
        clauses[index].field = entry.key;
        if (clauses[index].op === 'none') clauses[index].op = 'is';
        closeMenus();
        paintClause(index);
      });
    }
    for (const entry of OPS) {
      part(root, `o-${index}-${entry.key}`).addEventListener('click', () => {
        clauses[index].op = entry.key;
        closeMenus();
        paintClause(index);
      });
    }

    part(root, `value-${index}`).addEventListener('input', (event) => {
      clauses[index].value = (event.target as HTMLInputElement).value;
      render();
    });

    part(root, `remove-${index}`).addEventListener('click', () => {
      clauses[index] = { field: 'none', op: 'none', value: '', live: index === 1 };
      if (index === 2) setLive(false);
      paintClause(index);
    });
  }

  // Adding reaches the two-clause state rather than flipping between one and two.
  part(root, 'add').addEventListener('click', () => {
    if (clauses[2].live) return;
    setLive(true);
  });

  join.addEventListener('change', () => render());

  paintClause(1);
  paintClause(2);
}
