import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'preselected' | 'fair';

const FARE = 36;
const INSURANCE = 12;

const OPTIONS = [
  { key: 'insurance', label: 'Travel insurance for this crossing', price: '12.00', subject: true },
  { key: 'offers', label: 'Email me offers from ferry partners', price: '', subject: false },
  { key: 'card', label: 'Remember this card for next time', price: '', subject: false },
] as const;

const START: Record<Mode, Record<string, boolean>> = {
  preselected: { insurance: true, offers: true, card: false },
  fair: { insurance: false, offers: false, card: false },
};

const VERDICT = {
  preselected: 'Two answers were given before the reader got here, and one of them costs 12.00.',
  fair: 'Every box starts empty, so a yes on this screen is something somebody actually did.',
} as const;

const money = (value: number) => value.toFixed(2);

function optionRow(key: string, label: string, price: string, subject: boolean): string {
  const marks = subject ? ' data-subject data-pose="[data-mode=preselected][data-state=checked]" data-mode="preselected"' : '';
  return `
    <div class="sp-row" data-part="opt-${key}" data-state="clear"${marks} style="flex: 0 0 auto; gap: 10px; height: 28px; padding: 0 8px; border-radius: 6px">
      <button class="sp-checkbox" data-part="box-${key}" type="button" role="checkbox" aria-checked="false" aria-label="${label}"></button>
      <span class="sp-text sp-text--ink sp-grow" style="font-size: 12px">${label}</span>
      <span class="sp-text sp-text--ink" style="font-size: 12px; font-variant-numeric: tabular-nums">${price}</span>
    </div>`;
}

/**
 * Preselected opt-in specimen: the extras step of a ferry booking, arriving with two
 * answers already given. Paying prints what was agreed to, which is where a preselection
 * stops being a checkbox and becomes a charge and a mailing list.
 *
 * The subject is the insurance row, the narrowest element the term names and the one
 * that costs money: not the group (the third row is honestly unticked and is not the
 * term), not the checkbox alone (the term is the answer arriving given, which is the row
 * with its label and its price). The row declares its honest condition as both the
 * shipped mode and a ticked state (`data-pose`), so identify refuses to ring an empty
 * box or a box the reader ticked themselves (SPEC §6).
 *
 * The receipt line keeps its space from mount and only becomes visible, so paying moves
 * nothing (SPEC §5). Pay reaches one state however often it is pressed, and each mode
 * control restores that mode's own starting answers (SPEC §8); the boxes stay toggleable
 * for a reader who takes over, which is the gesture the pattern is counting on nobody
 * making.
 *
 * The section header used to editorialise with the switch ("Extras (as the step arrives)",
 * then "Extras (asked, not assumed)"), which is a second verdict printed in the booking's
 * own type. A specimen gets one, and this one has it in the strip, so the header is now the
 * word a ferry site would put there: "Extras".
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Harbour Ferries</span><span class="sp-label">Step 2 of 3</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 6px">

          <div class="sp-row sp-row--between sp-context" style="flex: 0 0 auto; height: 17px">
            <span class="sp-label" style="font-size: 11px">Extras</span>
            <span class="sp-label" style="font-size: 11px">2 adults, Friday</span>
          </div>

          <div class="sp-surface" style="display: flex; flex-direction: column; justify-content: center; gap: 5px; flex: 1 1 auto; min-height: 0; padding: 8px">
            ${OPTIONS.map((o) => optionRow(o.key, o.label, o.price, o.subject)).join('')}
          </div>

          <div class="sp-row sp-context" style="flex: 0 0 auto; height: 34px; gap: 10px">
            <span class="sp-text sp-text--ink" style="font-weight: 600; font-variant-numeric: tabular-nums">Total <span data-part="total">${money(FARE)}</span></span>
            <span class="sp-grow"></span>
            <button class="sp-button" data-part="pay" type="button">Pay and book</button>
          </div>

          <span class="sp-text sp-context" data-part="receipt" style="flex: 0 0 auto; height: 16px; font-size: 11px; visibility: hidden"></span>

        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="width: 296px; font-size: 11px">${VERDICT.preselected}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="preselected" data-axis="Preselected opt-in" data-term="preselected">
          <button class="sp-segment" data-part="mode-preselected" value="preselected">With</button>
          <button class="sp-segment" data-part="mode-fair" value="fair">Without</button>
        </sp-segmented>
      
    </div>
  `;

  const verdict = part(root, 'verdict');
  const totalValue = part(root, 'total');
  const receipt = part(root, 'receipt');
  const rows = OPTIONS.map((o) => ({ key: o.key, row: part(root, `opt-${o.key}`), box: part(root, `box-${o.key}`) }));

  const checked = (key: string) => rows.find((r) => r.key === key)?.box.getAttribute('aria-checked') === 'true';

  const retotal = () => {
    totalValue.textContent = money(FARE + (checked('insurance') ? INSURANCE : 0));
  };

  const setBox = (key: string, on: boolean) => {
    const entry = rows.find((r) => r.key === key);
    if (!entry) return;
    entry.box.setAttribute('aria-checked', String(on));
    entry.row.dataset.state = on ? 'checked' : 'clear';
    retotal();
  };

  const show = (mode: Mode) => {
    const insurance = rows.find((r) => r.key === 'insurance');
    if (insurance) insurance.row.dataset.mode = mode;
    for (const { key } of rows) setBox(key, START[mode][key] === true);
    verdict.textContent = VERDICT[mode];
    receipt.textContent = '';
    receipt.removeAttribute('data-sold');
    receipt.style.visibility = 'hidden';
  };

  for (const { key, box } of rows) {
    box.addEventListener('click', () => setBox(key, box.getAttribute('aria-checked') !== 'true'));
  }

  part(root, 'pay').addEventListener('click', () => {
    if (receipt.hasAttribute('data-sold')) return;
    const total = money(FARE + (checked('insurance') ? INSURANCE : 0));
    const extras = checked('insurance') ? 'Insurance charged. ' : 'No insurance. ';
    const list = checked('offers') ? 'Added to partner offers.' : 'No mailing list.';
    receipt.textContent = `Charged ${total}. ${extras}${list}`;
    receipt.setAttribute('data-sold', '');
    receipt.style.visibility = 'visible';
  });

  part(root, 'mode').addEventListener('change', (event) => {
    show((event as CustomEvent<string>).detail === 'fair' ? 'fair' : 'preselected');
  });

  show('preselected');
}
