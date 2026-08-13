import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const SHIPPING = [
  { key: 'standard', label: 'Standard, arrives Tuesday', note: 'Free' },
  { key: 'express', label: 'Express, arrives tomorrow', note: '6.00' },
  { key: 'pickup', label: 'Collect from the shop', note: 'Free' },
];

const VERDICT = {
  prefilled: 'Three answers already given, each one saying where it came from. Changing any of them is a single tap.',
  blank: 'The same form assuming nothing. Every answer is now the reader’s to find, including the ones they would have agreed with.',
} as const;

type Mode = keyof typeof VERDICT;

function fields(mode: Mode): string {
  const filled = mode === 'prefilled';
  const options = SHIPPING.map(
    ({ key, label, note }) => `
      <li
        class="sp-option"
        role="option"
        data-part="ship-${key}"
        data-ship="${key}"
        aria-selected="${String(filled && key === 'standard')}"
        style="display: flex; align-items: center; gap: 8px; height: 28px; padding: 0 8px"
      >
        <span class="sp-grow">${label}</span>
        ${
          filled && key === 'standard'
            ? '<span class="sp-chip" data-part="badge" style="padding: 1px 8px; font-size: 11px; cursor: default">Most common</span>'
            : `<span class="sp-label">${note}</span>`
        }
      </li>`,
  ).join('');

  return `
    <div class="sp-row sp-row--between" style="height: 26px">
      <span class="sp-label">Country</span>
      <span class="sp-row" style="gap: 8px">
        <span class="sp-text sp-text--ink" data-part="country" data-value="${filled ? 'gb' : ''}">${filled ? 'United Kingdom' : 'Not chosen'}</span>
        <span class="sp-label" style="font-size: 11px">${filled ? 'from your address' : ''}</span>
      </span>
    </div>
    <div class="sp-row sp-row--between" style="height: 26px">
      <span class="sp-label">Delivery date</span>
      <span class="sp-row" style="gap: 8px">
        <span class="sp-text sp-text--ink" data-part="date" data-value="${filled ? 'soonest' : ''}">${filled ? 'Tuesday 16 September' : 'Not chosen'}</span>
        <span class="sp-label" style="font-size: 11px">${filled ? 'soonest' : ''}</span>
      </span>
    </div>
    <span class="sp-label" style="margin-top: 2px">Delivery method</span>
    <ul
      class="sp-listbox sp-listbox--static"
      data-part="ships"
      role="listbox"
      aria-label="Delivery method"
      style="box-shadow: none; padding: 2px; margin-top: 4px"
    >${options}</ul>`;
}

/**
 * Smart defaults specimen: a checkout that arrives already answered the way most
 * readers would have answered it, beside the same form with nothing assumed. The
 * subject is the answered form region, not the frame around it, and it declares the
 * prefilled state as its honest condition (`data-pose`): identify refuses to ring the
 * blank version, which would be a picture of the opposite word (SPEC §6).
 *
 * The blank state is the counter-example, so the demo mounts prefilled and each state
 * control reaches its own state instead of flipping the other's (SPEC §8). Both states
 * fill the same box, so the swap moves nothing (SPEC §5), and every default says where
 * it came from, which is the difference between a guess and a stated one.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Checkout, delivery</span><span class="sp-label">Wilder &amp; Co</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column">
          <div
            class="sp-surface sp-grow"
            data-part="form"
            data-subject
            data-pose="[data-mode=prefilled]"
            data-mode="prefilled"
            style="display: flex; flex-direction: column; padding: 10px 12px"
          >${fields('prefilled')}</div>
        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-part="verdict" style="font-size: 11px; width: 300px">${VERDICT.prefilled}</span>
        <sp-segmented class="sp-segmented" data-part="mode" data-value="prefilled">
          <button class="sp-segment" data-part="mode-prefilled" value="prefilled">Defaulted</button>
          <button class="sp-segment" data-part="mode-blank" value="blank">Blank</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const form = part(root, 'form');
  const verdict = part(root, 'verdict');

  // Delegated, because the field block is rewritten whenever the state changes.
  form.addEventListener('click', (event) => {
    const picked = (event.target as HTMLElement).closest<HTMLElement>('[data-ship]')?.dataset.ship;
    if (!picked) return;
    for (const { key } of SHIPPING) part(root, `ship-${key}`).setAttribute('aria-selected', String(key === picked));
  });

  part(root, 'mode').addEventListener('change', (event) => {
    const next: Mode = (event as CustomEvent<string>).detail === 'blank' ? 'blank' : 'prefilled';
    form.dataset.mode = next;
    form.innerHTML = fields(next);
    verdict.textContent = VERDICT[next];
  });
}
