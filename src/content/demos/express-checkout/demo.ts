import { flag, part } from '#src/kit/parts.ts';

const WALLETS = {
  kestrel: { name: 'Kestrel Pay', paint: '#1d2330', ink: '#ffffff', card: 'Card ending 4417' },
  harbour: { name: 'Harbour Pay', paint: '#2f5bd0', ink: '#ffffff', card: 'Card ending 8102' },
  tern: { name: 'Tern Wallet', paint: '#0f7a63', ink: '#ffffff', card: 'Card ending 6635' },
} as const;

type Wallet = keyof typeof WALLETS;

const NOTE = {
  idle: 'The wallet row sits above the card form, not inside it. Nothing below has been typed.',
  open: 'The sheet arrives carrying the name, address and card the wallet already holds.',
  paid: 'Paid from the wallet. The four fields under the rule were never reached.',
} as const;

const FIELD = [
  'height: 24px',
  'display: flex',
  'align-items: center',
  'padding: 0 8px',
  'border: 1px solid var(--sp-line)',
  'border-radius: 5px',
  'background: var(--sp-surface)',
  'color: var(--sp-muted)',
  'font-size: 11px',
].join('; ');

const field = (label: string, grow = true) => `<span style="${FIELD}; ${grow ? 'flex: 1 1 0; min-width: 0' : ''}">${label}</span>`;

/**
 * Express checkout specimen: three wallet buttons above an "or pay by card" rule, with the
 * ordinary card form underneath them. Choosing a wallet raises a payment sheet that already
 * carries the name, address and card that wallet holds, against the four empty fields the
 * same order would otherwise have cost. The sheet is opened by a wallet and left by its own
 * Cancel, so nothing here flips a state it found (SPEC §8).
 *
 * The subject is the wallet row, the narrowest element the term names (SPEC §5): the sheet
 * belongs to the wallet, and the card form below is the thing express checkout is measured
 * against. The shop chrome, the rule, the form and the note row are scenery.
 *
 * The sheet is drawn over the lower part of the frame rather than inserted into the column,
 * and it stops short of the wallet row, so raising it moves nothing and never covers the
 * subject (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const buttons = (Object.keys(WALLETS) as Wallet[])
    .map((key) => {
      const { name, paint, ink } = WALLETS[key];
      return `
        <button class="sp-button" data-part="wallet-${key}" type="button"
                style="flex: 1 1 0; min-width: 0; height: 34px; padding: 0 8px; font-size: 12px; background: ${paint}; color: ${ink}">
          ${name}
        </button>`;
    })
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 258px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Wren &amp; Halliday</span>
          <span class="sp-label" style="font-size: 11px">Checkout, 52.50</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">

          <div class="sp-row" data-part="wallets" data-subject style="flex: 0 0 auto; height: 34px; gap: 8px">${buttons}</div>

          <div class="sp-row sp-context" style="flex: 0 0 auto; height: 14px; gap: 8px">
            <span class="sp-divider sp-grow"></span>
            <span class="sp-label" style="font-size: 10px">or pay by card</span>
            <span class="sp-divider sp-grow"></span>
          </div>

          <div class="sp-stack sp-context" data-part="form" style="flex: 0 0 auto; gap: 6px">
            ${field('Card number')}
            <div class="sp-row" style="gap: 6px">${field('Expiry')}${field('Security code')}</div>
            ${field('Name on card')}
            ${field('Billing address')}
          </div>

        </div>

        <div
          data-part="sheet"
          style="position: absolute; left: 0; right: 0; bottom: 0; height: 140px; display: flex; flex-direction: column; gap: 6px;
                 padding: 12px; background: var(--sp-surface); border-top: 1px solid var(--sp-line);
                 border-radius: var(--sp-radius) var(--sp-radius) 0 0; box-shadow: var(--sp-shadow);
                 transform: translateY(100%); visibility: hidden;
                 transition: transform 0.26s var(--sp-ease), visibility 0.26s"
        >
          <div class="sp-row sp-row--between" style="height: 18px">
            <span class="sp-heading" data-part="sheet-title" style="font-size: 13px">Kestrel Pay</span>
            <span class="sp-label" style="font-size: 11px">Total 52.50</span>
          </div>
          <span class="sp-text sp-text--ink" data-part="sheet-name" style="font-size: 12px">Ivy Marchetti</span>
          <span class="sp-text" data-part="sheet-address" style="font-size: 12px">12 Mill Lane, Whitby, YO21 3PU</span>
          <span class="sp-text" data-part="sheet-card" style="font-size: 12px">Card ending 4417</span>
          <div class="sp-row" style="margin-top: auto; gap: 8px">
            <button class="sp-button sp-button--sm sp-grow" data-part="sheet-pay" type="button">Pay 52.50</button>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="sheet-close" type="button">Cancel</button>
          </div>
        </div>

      </div>
              <span class="sp-text" data-stage-verdict data-part="note" style="width: 440px; height: 34px; font-size: 11px">${NOTE.idle}</span>
      
    </div>
  `;

  const sheet = part(root, 'sheet');
  const title = part(root, 'sheet-title');
  const card = part(root, 'sheet-card');
  const note = part(root, 'note');

  const open = (wallet: Wallet) => {
    title.textContent = WALLETS[wallet].name;
    card.textContent = WALLETS[wallet].card;
    sheet.dataset.wallet = wallet;
    flag(sheet, 'data-open', true);
    sheet.style.transform = 'translateY(0)';
    sheet.style.visibility = 'visible';
    note.textContent = NOTE.open;
  };

  const close = (outcome: 'idle' | 'paid' = 'idle') => {
    flag(sheet, 'data-open', false);
    sheet.style.transform = 'translateY(100%)';
    sheet.style.visibility = 'hidden';
    note.textContent = NOTE[outcome];
  };

  // A wallet only ever opens the sheet and Cancel only ever closes it, so a pass resumed
  // anywhere reaches the state its step names (SPEC §8).
  for (const key of Object.keys(WALLETS) as Wallet[]) {
    part(root, `wallet-${key}`).addEventListener('click', () => open(key));
  }
  part(root, 'sheet-close').addEventListener('click', () => close('idle'));
  part(root, 'sheet-pay').addEventListener('click', () => close('paid'));

  close();
}
