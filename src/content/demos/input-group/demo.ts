import { flag, part } from '#src/kit/parts.ts';

/** The addon's own paint: a field's box, filled like the sunken register, borders
    collapsed against the field it is welded to. */
const ADDON =
  'display: flex; align-items: center; flex: 0 0 auto; width: auto; background: var(--sp-sunken); color: var(--sp-muted); white-space: nowrap';

/**
 * Input group specimen: one amount field with a currency prefix and a unit suffix, and
 * a second group below where the addon is a Search button instead of text.
 *
 * The subject is the amount group, the whole welded control rather than the input in
 * the middle of it: an outline that stopped at the field would be exactly the mistake
 * the term is about. The search variant beneath is scenery, and so is the card.
 *
 * The second group was labelled "The other end is an action", which named the lesson
 * rather than the field; it is labelled "Search listings", which is what it searches.
 *
 * The weld is inline paint because it is this term's own claim: the parts share one
 * outline (each seam drops the border on one side), the ends keep the kit radius and
 * the middle goes square. The ring is drawn on the group with `data-sim-focus`, never
 * with real focus (SPEC §7), and pressing a static addon puts it there, since an addon
 * that is part of the control has to behave like part of it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 260px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Listing</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px; padding: 14px 16px">
          <div class="sp-field">
            <label class="sp-label sp-context" id="vd-ig-label" for="vd-ig-amount">Nightly rate</label>
            <div class="sp-row" data-part="group" data-subject style="gap: 0; align-items: stretch; width: 236px">
              <span class="sp-input" data-part="prefix" style="${ADDON}; border-radius: 6px 0 0 6px; border-right: 0">£</span>
              <input
                class="sp-input sp-grow"
                type="text"
                id="vd-ig-amount"
                data-part="amount"
                inputmode="numeric"
                placeholder="0"
                aria-describedby="vd-ig-prefix-note"
                style="border-radius: 0; text-align: right"
              />
              <span class="sp-input" data-part="suffix" style="${ADDON}; border-radius: 0 6px 6px 0; border-left: 0">per night</span>
            </div>
            <span class="sp-text sp-context" id="vd-ig-prefix-note" style="font-size: 12px">
              Pounds, before the cleaning fee.
            </span>
          </div>
          <div class="sp-divider sp-context"></div>
          <div class="sp-stack sp-context" data-part="aside" style="gap: 6px">
            <span class="sp-label">Search listings</span>
            <div class="sp-row" data-part="search" style="gap: 0; align-items: stretch; width: 236px">
              <input
                class="sp-input sp-grow"
                type="text"
                value="harbour"
                aria-label="Search listings"
                style="border-radius: 6px 0 0 6px; border-right: 0"
                readonly
              />
              <button class="sp-button" type="button" data-part="search-go" style="border-radius: 0 6px 6px 0; padding: 6px 12px">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const group = part(root, 'group');
  const amount = part(root, 'amount') as HTMLInputElement;

  const hold = () => flag(group, 'data-sim-focus', true);

  // A static addon hands the press to the field: pressing "£" or "per night" is
  // pressing the control, which is the claim the shared outline makes.
  for (const name of ['prefix', 'suffix', 'amount']) part(root, name).addEventListener('pointerdown', hold);

  amount.addEventListener('input', () => flag(amount, 'data-filled', amount.value.trim() !== ''));

  // Leaving is explicit: a press anywhere outside the group gives the ring up (SPEC §8).
  root.addEventListener('pointerdown', (event) => {
    if (!group.contains(event.target as Node)) flag(group, 'data-sim-focus', false);
  });
}
