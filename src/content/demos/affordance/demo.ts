import { flag, part } from '#src/kit/parts.ts';

/** Both candidates are real buttons; only one of them says so. */
const FLAT = [
  'appearance: none',
  'border: 0',
  'background: transparent',
  'padding: 7px 4px',
  'font: inherit',
  'font-size: 13px',
  'color: var(--sp-ink)',
  'cursor: default',
].join('; ');

/**
 * Affordance specimen: two controls that do exactly the same thing, one drawn so
 * that a reader can see it is a control and one drawn as a line of text. The
 * subject is the control that advertises itself, since that is the one the term is
 * a compliment about; the flat twin beside it is the comparison.
 *
 * Both carry the same click handler, so the difference on show is entirely what
 * each one looks like it allows. The pointer readout names what the element is
 * saying rather than what it does, and the receipt below sits in a slot reserved
 * from the start, so an export never moves the two candidates (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Quarter report</span>
          <span class="sp-text" data-part="readout" data-reads="away" style="width: 140px; text-align: right">Pointer away</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 14px">
          <span class="sp-label sp-context" style="text-align: center">Both of these export the report.</span>
          <div class="sp-row" style="align-items: flex-start; gap: 28px">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; width: 150px">
              <button class="sp-button sp-button--sm" type="button" data-part="raised" data-subject>Export CSV</button>
              <span class="sp-label sp-context" style="text-align: center">Edge, fill, label, press state</span>
            </div>
            <div class="sp-context" style="display: flex; flex-direction: column; align-items: center; gap: 8px; width: 150px">
              <button type="button" data-part="flat" style="${FLAT}">Export CSV</button>
              <span class="sp-label" style="text-align: center">A possibility with nothing to signify it</span>
            </div>
          </div>
          <div style="position: relative; width: 100%; height: 34px">
            <div
              class="sp-surface sp-context"
              data-part="receipt-empty"
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--sp-muted)"
            >
              Nothing exported yet
            </div>
            <div
              class="sp-surface"
              data-part="receipt"
              hidden
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 13px"
            >
              quarter-report.csv exported
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const raised = part(root, 'raised');
  const flat = part(root, 'flat');
  const readout = part(root, 'readout');

  const says = (reads: string, text: string) => {
    readout.dataset.reads = reads;
    readout.textContent = text;
  };

  // The flat control admits what it is only once a pointer is already on it, which is
  // the failure this pair is here to show: a reader with no pointer never finds out.
  flat.addEventListener('pointerenter', () => {
    flag(flat, 'data-hovered', true);
    flat.style.textDecoration = 'underline';
    flat.style.cursor = 'pointer';
    says('label', 'Reads as a label');
  });

  flat.addEventListener('pointerleave', () => {
    flag(flat, 'data-hovered', false);
    flat.style.textDecoration = '';
    flat.style.cursor = 'default';
    says('away', 'Pointer away');
  });

  raised.addEventListener('pointerenter', () => {
    flag(raised, 'data-hovered', true);
    says('pressable', 'Reads as pressable');
  });

  raised.addEventListener('pointerleave', () => {
    flag(raised, 'data-hovered', false);
    flag(raised, 'data-pressed', false);
    says('away', 'Pointer away');
  });

  raised.addEventListener('pointerdown', () => flag(raised, 'data-pressed', true));
  raised.addEventListener('pointerup', () => flag(raised, 'data-pressed', false));

  const exported = () => {
    part(root, 'receipt').hidden = false;
    part(root, 'receipt-empty').hidden = true;
  };

  for (const control of [raised, flat]) control.addEventListener('click', exported);
}
