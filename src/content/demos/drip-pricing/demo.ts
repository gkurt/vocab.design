import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'dripping' | 'honest';

const TICKET = 42;
const FEES = [
  { label: 'Service fee', amount: 9.6 },
  { label: 'Facility fee', amount: 5.5 },
  { label: 'Delivery, mobile ticket', amount: 4.99 },
] as const;

const STEPS = ['Seats', 'Delivery', 'Payment', 'Confirm'] as const;
const ALL_IN = TICKET + FEES.reduce((sum, fee) => sum + fee.amount, 0);

const CAPTION = {
  dripping: 'The total (as advertised)',
  honest: 'The total (all in, up front)',
} as const;

const VERDICT = {
  dripping: 'The advertised 42.00 won the click. Each step adds a fee nobody can decline.',
  honest: 'One number from the first screen, with the same lines under it. Nothing to reveal later.',
} as const;

const money = (value: number) => value.toFixed(2);

const line = (name: string, label: string, value: string, hidden: boolean) => `
  <div class="sp-row sp-row--between" data-part="${name}" style="height: 17px${hidden ? '; visibility: hidden' : ''}">
    <span class="sp-text" style="font-size: 12px">${label}</span>
    <span class="sp-text sp-text--ink" style="font-size: 12px; font-variant-numeric: tabular-nums">${value}</span>
  </div>`;

/**
 * Drip pricing specimen: the same four seats bought twice, once by a checkout that
 * discovers a fee per step and once by one that says the number on the first screen.
 * The advertised price stays on the panel the whole way through, struck out the moment
 * the total leaves it behind, so the gap the pattern is built on is always readable.
 *
 * The subject is the total panel, not the checkout around it: the term names what
 * happens to the number, and the step rail and its Continue control are the mechanism
 * that walks it, which makes them scenery (SPEC §5). The panel declares the dripping
 * checkout as its honest condition (`data-pose`), since ringing the all in version
 * would identify the opposite word (SPEC §6).
 *
 * Every fee row exists from mount and only becomes visible, so a drip changes numbers
 * and never geometry (SPEC §5). Continue reaches the next step rather than toggling,
 * and picking a mode restores that mode's first step, which is where the specimen
 * mounts (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const rail = STEPS.map(
    (name, i) => `
      <li class="sp-nav-item" data-part="step-${i}" ${i === 0 ? 'data-current' : ''} style="padding: 5px 8px; font-size: 12px">${name}</li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Riverside Arena</span><span class="sp-label">Checkout</span></div>
        <div class="sp-body sp-row" style="align-items: stretch; gap: 10px">

          <section class="sp-context" style="display: flex; flex-direction: column; gap: 7px; flex: 0 0 auto; width: 142px">
            <span class="sp-label" data-part="advert-label" style="height: 17px; font-size: 11px">Advertised: ${money(TICKET)}</span>
            <ul class="sp-nav" data-part="rail">${rail}</ul>
            <button class="sp-button" data-part="next" type="button" style="width: 100%; margin-top: auto">Continue</button>
          </section>

          <div style="display: flex; flex-direction: column; gap: 7px; flex: 1 1 auto; min-width: 0">
            <div class="sp-row sp-row--between sp-context" style="height: 17px">
              <span class="sp-label" data-part="caption" style="font-size: 11px">${CAPTION.dripping}</span>
              <span class="sp-label" data-part="stage-label" style="font-size: 11px">Step 1 of 4</span>
            </div>
            <section
              class="sp-surface"
              data-part="total"
              data-subject
              data-pose="[data-mode=dripping]"
              data-mode="dripping"
              data-step="0"
              style="display: flex; flex-direction: column; justify-content: center; gap: 5px; flex: 1 1 auto; min-height: 0; padding: 10px 12px"
            >
              ${line('line-ticket', 'Standard admission &times;2', money(TICKET), false)}
              ${FEES.map((fee, i) => line(`fee-${i}`, fee.label, money(fee.amount), true)).join('')}
              <span class="sp-divider" style="margin: 4px 0"></span>
              <div class="sp-row sp-row--between" style="height: 22px">
                <span class="sp-text sp-text--ink" style="font-weight: 600">Total</span>
                <span class="sp-heading" data-part="value-total" style="font-variant-numeric: tabular-nums">${money(TICKET)}</span>
              </div>
              <div class="sp-row sp-row--between" style="height: 16px">
                <span class="sp-text" style="font-size: 11px">What the advert said</span>
                <span class="sp-text" data-part="advertised" style="font-size: 11px; font-variant-numeric: tabular-nums">${money(TICKET)}</span>
              </div>
            </section>
          </div>

        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-part="verdict" style="width: 296px; font-size: 11px">${VERDICT.dripping}</span>
        <sp-segmented class="sp-segmented" data-part="mode" data-value="dripping" data-axis="Version" data-term="dripping">
          <button class="sp-segment" data-part="mode-dripping" value="dripping">As shipped</button>
          <button class="sp-segment" data-part="mode-honest" value="honest">Made fair</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const total = part(root, 'total');
  const caption = part(root, 'caption');
  const verdict = part(root, 'verdict');
  const stageLabel = part(root, 'stage-label');
  const value = part(root, 'value-total');
  const advertised = part(root, 'advertised');
  const advertLabel = part(root, 'advert-label');
  const next = part(root, 'next');
  const railItems = [...part(root, 'rail').children];
  const feeRows = FEES.map((_, i) => part(root, `fee-${i}`));

  const show = (mode: Mode, step: number) => {
    total.dataset.mode = mode;
    total.dataset.step = String(step);
    const shown = mode === 'honest' ? FEES.length : step;
    feeRows.forEach((row, i) => {
      row.style.visibility = i < shown ? 'visible' : 'hidden';
    });
    const sum = mode === 'honest' ? ALL_IN : TICKET + FEES.slice(0, step).reduce((acc, fee) => acc + fee.amount, 0);
    value.textContent = money(sum);
    const headline = mode === 'honest' ? ALL_IN : TICKET;
    advertised.textContent = money(headline);
    advertLabel.textContent = `Advertised: ${money(headline)}`;
    advertised.style.textDecoration = mode === 'dripping' && step > 0 ? 'line-through' : 'none';
    stageLabel.textContent = `Step ${step + 1} of ${STEPS.length}`;
    caption.textContent = CAPTION[mode];
    verdict.textContent = VERDICT[mode];
    for (const [i, item] of railItems.entries()) {
      if (i === step) item.setAttribute('data-current', '');
      else item.removeAttribute('data-current');
    }
    next.setAttribute('aria-disabled', String(step >= STEPS.length - 1));
  };

  next.addEventListener('click', () => {
    const mode: Mode = total.dataset.mode === 'honest' ? 'honest' : 'dripping';
    const step = Number(total.dataset.step ?? 0) + 1;
    if (step >= STEPS.length) return;
    show(mode, step);
  });

  part(root, 'mode').addEventListener('change', (event) => {
    show((event as CustomEvent<string>).detail === 'honest' ? 'honest' : 'dripping', 0);
  });

  show('dripping', 0);
}
