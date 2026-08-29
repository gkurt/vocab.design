import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Token = { size: number; line: number; weight: number; track: string };
type Density = 'compact' | 'default' | 'large';
type Role = 'display' | 'heading' | 'body' | 'caption';

const ROLES: Role[] = ['display', 'heading', 'body', 'caption'];

const IS_DENSITY = (value: string): value is Density => value === 'compact' || value === 'default' || value === 'large';

/**
 * One token set resolved three ways. Only the values move: the role names, and
 * which part of the card consumes each of them, are the same at every setting.
 */
const SETS: Record<Density, Record<Role, Token>> = {
  compact: {
    display: { size: 18, line: 24, weight: 600, track: '-0.01em' },
    heading: { size: 14, line: 19, weight: 600, track: '0' },
    body: { size: 12, line: 17, weight: 400, track: '0' },
    caption: { size: 10, line: 14, weight: 500, track: '0.02em' },
  },
  default: {
    display: { size: 22, line: 28, weight: 600, track: '-0.01em' },
    heading: { size: 17, line: 23, weight: 600, track: '0' },
    body: { size: 13, line: 19, weight: 400, track: '0' },
    caption: { size: 11, line: 15, weight: 500, track: '0.02em' },
  },
  large: {
    display: { size: 27, line: 34, weight: 600, track: '-0.01em' },
    heading: { size: 21, line: 28, weight: 600, track: '0' },
    body: { size: 16, line: 23, weight: 400, track: '0' },
    caption: { size: 13, line: 18, weight: 500, track: '0.02em' },
  },
};

/** Room for the largest setting, so re-resolving the set moves nothing outside the card (SPEC §5). */
const CARD = { w: 190, h: 152 };
const TABLE_W = 204;

/**
 * Typography token specimen: a four-role token set in a table, driving a card
 * that names roles and never numbers. The density picker re-resolves every value
 * at once and the card follows with no per-element edit, which is the whole
 * argument for the indirection.
 *
 * The subject is one row, `type.heading`, the token the card's heading consumes.
 * The table is the set that row belongs to and the card is the consumer, so
 * neither is the term: marking the table would claim the term is a token *set*,
 * and marking the wrapper would withdraw identify (SPEC §5-6). Everything the
 * demo needs in order to be watchable (the picker, the card, the read-out) sits
 * in the context register.
 *
 * The card holds the room the largest setting needs, so the values changing
 * never moves the table beside it or the read-out below it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const rows = ROLES.map(
    (role, i) => `
        <tr data-part="row-${role}"${role === 'heading' ? ' data-subject data-density="default"' : ' class="sp-context"'}>
          <th scope="row" style="font-weight: 500${i === ROLES.length - 1 ? '; border-bottom: 0' : ''}">type.${role}</th>
          <td data-part="size-${role}" style="font-variant-numeric: tabular-nums"></td>
          <td data-part="weight-${role}" style="font-variant-numeric: tabular-nums"></td>
        </tr>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="Density" data-part="segmented" data-value="default">
            <button class="sp-segment" data-part="seg-compact" value="compact">compact</button>
            <button class="sp-segment" data-part="seg-default" value="default">default</button>
            <button class="sp-segment" data-part="seg-large" value="large">large</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 14px; align-items: flex-start; margin-top: 10px; height: ${CARD.h}px">
          <table class="sp-table" data-part="table" style="width: ${TABLE_W}px; --sp-cell-pad: 5px 8px">
            <thead class="sp-context">
              <tr>
                <th>token</th>
                <th>size / line</th>
                <th>wt</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="sp-surface sp-context" data-part="card"
               style="width: ${CARD.w}px; height: ${CARD.h}px; padding: 12px; display: flex; flex-direction: column; gap: 6px">
            <span data-part="card-display">1,284</span>
            <span data-part="card-heading">Weekly digest</span>
            <p data-part="card-body" style="margin: 0; color: var(--sp-muted)">Named, not typed.</p>
            <span data-part="card-caption" style="color: var(--sp-muted)">Updated 4 min ago</span>
          </div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px; height: 26px">
          <span class="sp-chip" data-part="readout" style="cursor: default; font-variant-numeric: tabular-nums"></span>
          <span class="sp-label">one family, four roles</span>
        </div>
      </div>
    </div>
  `;

  const row = part(root, 'row-heading');
  const readout = part(root, 'readout');
  const consumers: Record<Role, HTMLElement> = {
    display: part(root, 'card-display'),
    heading: part(root, 'card-heading'),
    body: part(root, 'card-body'),
    caption: part(root, 'card-caption'),
  };

  const apply = (value: string) => {
    if (!IS_DENSITY(value)) return;
    const set = SETS[value];
    row.dataset.density = value;
    for (const role of ROLES) {
      const token = set[role];
      part(root, `size-${role}`).textContent = `${token.size} / ${token.line}`;
      part(root, `weight-${role}`).textContent = String(token.weight);
      const el = consumers[role];
      el.style.fontSize = `${token.size}px`;
      el.style.lineHeight = `${token.line}px`;
      el.style.fontWeight = String(token.weight);
      el.style.letterSpacing = token.track;
    }
    const heading = set.heading;
    readout.textContent = `type.heading resolves to ${heading.size}px / ${heading.line}px / ${heading.weight}`;
  };

  apply('default');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
