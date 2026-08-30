import { part } from '#src/kit/parts.ts';

const PHONE_TEMPLATE = '(___) ___-____';
const CARD_TEMPLATE = '____ ____ ____ ____';

/** The one font that lets a template drawn behind a field line up with the text in it. */
const TYPE = 'font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; line-height: 20px; letter-spacing: 0.02em';

const formatPhone = (digits: string): string => {
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const formatCard = (digits: string): string => (digits.match(/.{1,4}/g) ?? []).join(' ');

const field = (name: string, label: string, id: string, subject: boolean, hint: string): string => `
  <div class="sp-field">
    <label class="sp-label sp-context" for="${id}">${label}</label>
    <div data-part="${name}-field" ${subject ? 'data-subject' : ''} data-state="empty" data-value="" style="position: relative">
      <span
        aria-hidden="true"
        data-part="${name}-ghost"
        style="position: absolute; inset: 0; padding: 7px 11px; color: var(--sp-muted);
               white-space: pre; pointer-events: none; ${TYPE}"
      ></span>
      <input
        class="sp-input"
        id="${id}"
        data-part="${name}"
        type="text"
        inputmode="numeric"
        autocomplete="off"
        spellcheck="false"
        style="position: relative; background: transparent; ${TYPE}"
      />
    </div>
    <span class="sp-label sp-context">${hint}</span>
  </div>`;

/**
 * Input mask specimen: two fields that supply their own punctuation, with the shape
 * they are going to take drawn in grey ahead of the caret.
 *
 * The subject is the phone field: the input together with the template behind it,
 * exactly as the search field specimen takes its adornments with it. A bare input
 * would be a text field, and the template is the thing this term adds. The card field
 * beside it is a second instance rather than scenery, mounted part typed so the
 * remaining groups of four are visible without waiting for anything.
 *
 * The helper line under each field used to describe the demonstration ("Type digits. The
 * field adds the rest." and "Same idea, grouped in fours."). Both are now the helper text a
 * checkout would really print under a phone and a card number.
 *
 * The template is a span under a transparent-backed input, carrying the same face,
 * size and padding, with the part already typed rendered in transparent ink so the
 * two never draw the same characters twice. Formatting happens on every `input`
 * event, which is the gesture a person actually makes and the one the stage
 * synthesizes, a character at a time (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 324px">
        <div class="sp-heading sp-context">Delivery details</div>
        <div class="sp-stack" style="margin-top: 14px; gap: 14px">
          ${field('phone', 'Mobile number', 'vd-mask-phone', true, 'For delivery updates')}
          ${field('card', 'Card number', 'vd-mask-card', false, 'Visa, Mastercard or Amex')}
        </div>
      </div>
    </div>
  `;

  const wire = (name: string, template: string, format: (digits: string) => string, max: number, seed: string) => {
    const box = part(root, `${name}-field`);
    const input = part(root, name) as HTMLInputElement;
    const ghost = part(root, `${name}-ghost`);

    const apply = () => {
      const digits = input.value.replace(/\D/g, '').slice(0, max);
      const shaped = format(digits);
      input.value = shaped;
      // What is left of the template, with the typed part held in transparent ink so
      // the two layers keep the same rhythm without printing the same glyph twice.
      ghost.innerHTML = `<span style="color: transparent">${shaped}</span>${template.slice(shaped.length)}`;
      box.dataset.value = shaped;
      box.dataset.state = digits.length === 0 ? 'empty' : digits.length === max ? 'complete' : 'typing';
    };

    input.addEventListener('input', apply);
    input.value = seed;
    apply();
  };

  wire('phone', PHONE_TEMPLATE, formatPhone, 10, '');
  wire('card', CARD_TEMPLATE, formatCard, 16, '4242424242');
}
