import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const HELP_W = 178;

interface StepCopy {
  label: string;
  first: { label: string; placeholder: string };
  second: { label: string; placeholder: string };
}

const STEPS: Record<'1' | '2', StepCopy> = {
  '1': {
    label: 'Step 1 of 2 · Identity',
    first: { label: 'Registered name', placeholder: 'Marlow Mills Ltd' },
    second: { label: 'Tax ID', placeholder: 'GB 000 0000 00' },
  },
  '2': {
    label: 'Step 2 of 2 · Terms',
    first: { label: 'Payment terms', placeholder: '30 days from invoice' },
    second: { label: 'Settlement currency', placeholder: 'GBP' },
  },
};

/**
 * Help drawer specimen: a two-step supplier form whose help opens beside the fields rather
 * than over them. Opening the panel takes width from the form, which narrows and stays
 * live (the choreography types into it with the panel open, which is the whole claim), and
 * moving to step two leaves the panel exactly where it was.
 *
 * The subject is the panel itself, the narrowest element the term names. The form, its
 * fields, the step buttons and the caption are the task the panel sits beside, so they
 * carry the context register (SPEC §5). While the panel is shut its box is zero wide, so
 * identify summons it by playing the script forward rather than ringing nothing (SPEC §6).
 *
 * The frame's width never changes: the form pane is the flexible half and the panel the
 * fixed one, so the fields reflow into a narrower column instead of anything being pushed
 * off the frame (SPEC §5). The panel's own content keeps its full width behind
 * `overflow: hidden`, so opening reveals a laid-out panel rather than reflowing text. The
 * trigger opens and the panel's own close button closes; neither toggles (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const field = (which: 'first' | 'second', copy: StepCopy['first']) => `
    <div class="sp-field" data-part="field-${which}" style="gap: 3px">
      <span class="sp-label" data-part="label-${which}" style="font-size: 10.5px">${copy.label}</span>
      <input
        class="sp-input"
        data-part="input-${which}"
        type="text"
        autocomplete="off"
        placeholder="${copy.placeholder}"
        aria-label="${copy.label}"
        style="height: 28px; padding: 0 9px; font-size: 12px"
      />
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 254px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Add a supplier</span>
          <button
            class="sp-button sp-button--quiet sp-button--sm"
            data-part="open"
            type="button"
            style="flex: 0 0 auto; font-size: 12px; white-space: nowrap"
          >Help</button>
        </div>

        <div style="display: flex; flex: 1 1 auto; min-height: 0">
          <div
            class="sp-body sp-context"
            data-part="form"
            data-step="1"
            data-typed="no"
            style="display: flex; flex-direction: column; gap: 9px; flex: 1 1 auto; min-width: 0"
          >
            <span class="sp-label" data-part="step-label" style="height: 16px; line-height: 16px; font-size: 10.5px">${STEPS['1'].label}</span>
            ${field('first', STEPS['1'].first)}
            ${field('second', STEPS['1'].second)}
            <span class="sp-text" data-part="echo" style="flex: 1 1 auto; font-size: 11px; line-height: 1.35">Both numbers are on the supplier's invoice header.</span>
            <div class="sp-row sp-row--between" style="flex: 0 0 auto; gap: 8px">
              <button
                class="sp-button sp-button--ghost sp-button--sm"
                data-part="back"
                type="button"
                aria-disabled="true"
                style="flex: 0 0 auto; white-space: nowrap"
              >Back</button>
              <button class="sp-button sp-button--sm" data-part="next" type="button" style="flex: 0 0 auto; white-space: nowrap">Next</button>
            </div>
          </div>

          <div
            data-part="help"
            data-subject
            style="flex: 0 0 auto; width: 0; overflow: hidden; background: var(--sp-surface); transition: width 0.26s var(--sp-ease)"
          >
            <div style="display: flex; flex-direction: column; gap: 6px; width: ${HELP_W}px; height: 100%; padding: 11px 12px; border-left: 1px solid var(--sp-line)">
              <div class="sp-row sp-row--between" style="flex: 0 0 auto; gap: 6px">
                <span class="sp-heading" style="font-size: 12px; white-space: nowrap">Tax ID</span>
                <button
                  class="sp-icon-button"
                  data-part="close"
                  type="button"
                  aria-label="Close help"
                  style="flex: 0 0 auto; width: 22px; height: 22px"
                >${icon('close')}</button>
              </div>
              <span class="sp-text" style="font-size: 11px; line-height: 1.4">
                Two letters for the country, then nine digits. Group them however the invoice does; we strip the spaces.
              </span>
              <span class="sp-text" style="font-size: 11px; line-height: 1.4">
                Sole traders outside the scheme leave it blank and we bill without it.
              </span>
            </div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-stage-verdict data-part="caption" style="width: 452px; height: 30px; font-size: 11px; line-height: 1.35">
        The panel takes width from the form instead of covering it, so the field stays typeable while the answer is read, and the step change leaves it open.
      </span>
    </div>
  `;

  const form = part(root, 'form');
  const help = part(root, 'help');
  const stepLabel = part(root, 'step-label');
  const back = part(root, 'back');
  const echo = part(root, 'echo');
  const inputs = {
    first: part(root, 'input-first') as HTMLInputElement,
    second: part(root, 'input-second') as HTMLInputElement,
  };
  const labels = { first: part(root, 'label-first'), second: part(root, 'label-second') };

  const setOpen = (open: boolean) => {
    flag(help, 'data-open', open);
    help.style.width = open ? `${HELP_W}px` : '0px';
  };

  // The trigger opens and the panel's own control closes, so neither depends on the state
  // it finds (SPEC §8).
  part(root, 'open').addEventListener('click', () => setOpen(true));
  part(root, 'close').addEventListener('click', () => setOpen(false));

  part(root, 'next').addEventListener('click', () => {
    if (form.dataset.step === '2') return;
    const copy = STEPS['2'];
    form.dataset.step = '2';
    stepLabel.textContent = copy.label;
    for (const which of ['first', 'second'] as const) {
      labels[which].textContent = copy[which].label;
      inputs[which].placeholder = copy[which].placeholder;
      inputs[which].value = '';
    }
    echo.textContent = 'Terms apply from the first invoice we receive.';
    back.removeAttribute('aria-disabled');
  });

  for (const input of Object.values(inputs)) {
    // Evidence that the form answered a keystroke while the panel was open, mirrored onto
    // the form so the claim survives whatever the panel is doing.
    input.addEventListener('input', () => {
      form.dataset.typed = input.value.trim() === '' ? 'no' : 'yes';
    });
  }
}
