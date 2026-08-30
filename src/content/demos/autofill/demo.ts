import { flag, part } from '#src/kit/parts.ts';

const FIELDS = [
  { key: 'name', label: 'Full name', value: 'Rowan Ellis' },
  { key: 'email', label: 'Email', value: 'rowan.ellis@fernway.co.uk' },
  { key: 'postcode', label: 'Postcode', value: 'YO21 3PU' },
] as const;

const STATUS = {
  empty: 'Add a postcode for delivery dates.',
  filled: 'Delivering to YO21 3PU, 2 to 3 working days.',
} as const;

/**
 * Autofill specimen: a short delivery form, the browser's own saved-profile list, and
 * the three fields it writes in one go. Putting the caret in the first field opens the
 * user agent's dropdown (scenery, since the page neither draws it nor is asked about
 * it), and choosing the profile closes the list and answers every field at once, each
 * one arriving with the tint the browser paints over a value it filled.
 *
 * The subject is the EMAIL field, one of the three that arrived answered without being
 * touched, rather than the form: the term names a field the browser filled, and the
 * other two are peer instances of the same thing (SPEC §5). It carries `data-pose`, so
 * identify refuses to ring it while it is still an ordinary empty field and plays the
 * fill forward first (SPEC §6).
 *
 * There is no reset and no toggle: the list is opened by the field and left by a choice
 * (SPEC §8), and the loop's remount is the only way back to an empty form. Every row
 * holds its height whether it carries a value or not, and the dropdown is drawn over the
 * fields rather than inserted above them, so neither opening nor filling moves anything
 * (SPEC §5).
 *
 * Two lines of site voice were removed. A caption under the frame explained that the list
 * and the tint were the browser's own paint, which the article already says, and the
 * status line counted the fields the browser had written ("Three fields written by the
 * browser. None of them typed."). The status stays, because the pass reads its count, but
 * it now prints what a delivery form really prints once it knows a postcode.
 */
export function mount(root: HTMLElement): void {
  const rows = FIELDS.map(({ key, label }) => {
    const anchored = key === 'name';
    const subject = key === 'email' ? ' data-subject data-pose="[data-state=filled]"' : '';
    return `
      <div class="sp-field" style="flex: 0 0 auto; gap: 3px${anchored ? '; position: relative; z-index: 2' : ''}">
        <span class="sp-label sp-context" style="font-size: 11px">${label}</span>
        <input
          class="sp-input"
          data-part="in-${key}"
          data-state="empty"
          type="text"
          aria-label="${label}"
          autocomplete="off"
          style="height: 28px; font-size: 12px"${subject}
        />
        ${
          anchored
            ? `<div class="sp-menu sp-context" data-part="ua-menu" role="listbox" aria-label="Saved profile"
                 style="top: calc(100% + 4px); left: 0; right: 0; min-width: 0">
                 <span class="sp-label" style="display: block; padding: 3px 8px 5px; font-size: 10px">Saved profile</span>
                 <button class="sp-menu-item" data-part="profile" type="button"
                   style="flex-direction: column; align-items: flex-start; gap: 1px">
                   <span class="sp-text sp-text--ink" style="font-size: 12px">Rowan Ellis</span>
                   <span class="sp-text" style="font-size: 11px">rowan.ellis@fernway.co.uk, YO21 3PU</span>
                 </button>
               </div>`
            : ''
        }
      </div>`;
  }).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 254px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Fernway Books</span>
          <span class="sp-label" style="font-size: 11px">Delivery details</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          ${rows}
          <span class="sp-label sp-context" data-part="status" data-count="0" role="status" style="flex: 0 0 auto; height: 17px; font-size: 11px">
            ${STATUS.empty}
          </span>
        </div>
      </div>
    </div>
  `;

  const menu = part(root, 'ua-menu');
  const status = part(root, 'status');
  const fields = FIELDS.map((field) => ({ field, input: part(root, `in-${field.key}`) as HTMLInputElement }));

  // Opening is absolute, never a toggle (SPEC §8): a resumed pass that lands here finds
  // the list open either way, and the only way out is choosing the profile.
  part(root, 'in-name').addEventListener('click', () => flag(menu, 'data-open', true));

  part(root, 'profile').addEventListener('click', () => {
    flag(menu, 'data-open', false);
    fields.forEach(({ field, input }) => {
      input.value = field.value;
      input.dataset.state = 'filled';
      // The tint a user agent paints over a field it filled. Stated in kit tokens so it
      // follows the theme, since a real one does; the page could not write it at all.
      input.style.background = 'var(--sp-accent-soft)';
      input.style.borderColor = 'var(--sp-accent)';
    });
    status.textContent = STATUS.filled;
    status.dataset.count = String(FIELDS.length);
  });
}
