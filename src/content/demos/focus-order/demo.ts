import { part } from '#src/kit/parts.ts';

type Field = { key: string; id: string; label: string; stop: number; order?: number };

/** Source order and reading order agree: the ring walks straight down the column. */
const ORDERED: Field[] = [
  { key: 'field-name', id: 'vd-fo-name', label: 'Full name', stop: 1 },
  { key: 'field-email', id: 'vd-fo-email', label: 'Email', stop: 2 },
  { key: 'field-phone', id: 'vd-fo-phone', label: 'Phone', stop: 3 },
];

/** The same three fields, moved by CSS only: `order` paints them 2, 3, 1 down the page. */
const REORDERED: Field[] = [
  { key: 'field-city', id: 'vd-fo-city', label: 'City', stop: 1, order: 3 },
  { key: 'field-postcode', id: 'vd-fo-postcode', label: 'Postcode', stop: 2, order: 1 },
  { key: 'field-country', id: 'vd-fo-country', label: 'Country', stop: 3, order: 2 },
];

function field({ key, id, label, stop, order }: Field): string {
  return `
    <div class="sp-row" style="gap: 8px; align-items: flex-end${order ? `; order: ${order}` : ''}">
      <span aria-hidden="true"
            style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 18px; height: 18px;
                   border-radius: 50%; background: var(--sp-accent-soft); color: var(--sp-ink); font-size: 11px; font-weight: 600">${stop}</span>
      <div class="sp-field sp-grow">
        <label class="sp-label" for="${id}">${label}</label>
        <input class="sp-input" id="${id}" data-part="${key}" data-stop="${stop}" autocomplete="off" />
      </div>
    </div>`;
}

/**
 * Focus order specimen: the same three fields twice, once where the source and the screen
 * agree and once where CSS `order` has moved them and nothing else has. The badges are the
 * tab stop each field actually is, so the broken column reads 2, 3, 1 down the page while
 * Tab still walks 1, 2, 3 and the ring jumps.
 *
 * The subject is the well-ordered region, since the term names a sequence and the
 * narrowest thing that has one is the group the sequence runs through. The counterexample
 * beside it is scenery (SPEC §5).
 *
 * The two groups are headed the way a real form heads them, "Contact" and "Address". They
 * were headed "Tab follows reading order" and "Reordered in CSS (the mistake)", each over a
 * paragraph explaining what its column proved, which is the site talking inside somebody's
 * address form. The badges still print the tab stop each field is, so the broken column
 * reads 2, 3, 1 down the page and the ring is seen to jump; the article does the explaining.
 *
 * The specimen deliberately owns no controls of its own: the ring is the stage's simulated
 * focus, which walks the focusable elements it finds in source order (SPEC §7), so a
 * switch or a replay button would put itself in the very sequence being demonstrated. The
 * first field carries the ring from mount because the player's first Tab lands there too,
 * which gives the pose a drawn ring to be inspected in (SPEC §6). Nothing here resizes,
 * and an outline takes no room, so no state of this specimen moves another (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row" style="align-items: flex-start; gap: 18px">
          <div class="sp-grow" data-part="ordered" data-subject>
            <span class="sp-label">Contact</span>
            <div class="sp-stack" style="margin-top: 8px; gap: 10px">${ORDERED.map(field).join('')}</div>
          </div>
          <div class="sp-grow sp-context" data-part="reordered">
            <span class="sp-label">Address</span>
            <div class="sp-stack" style="margin-top: 8px; gap: 10px">${REORDERED.map(field).join('')}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // The stage sets `data-sim-focus` itself on every Tab; the specimen only states where the
  // walk starts, and the player's first Tab agrees with it.
  const first = ORDERED[0];
  if (first) part(root, first.key).setAttribute('data-sim-focus', '');
}
