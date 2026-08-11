import { flag, part } from '#src/kit/parts.ts';

const REST = { top: '26px', fontSize: '13px' };
const FLOATED = { top: '14px', fontSize: '11px' };

/**
 * Floating label specimen: the label rests where a placeholder would sit and
 * rises to the top edge once the field has focus or a value. The subject is the
 * label, since the field around it is an ordinary text input.
 *
 * The raised position is headroom the box owned from mount (SPEC §5): the label
 * is out of flow and the input's padding already accounts for it, so the travel
 * moves nothing but the word itself.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-heading sp-context">Book a table</div>
        <div data-part="box" style="position: relative; margin-top: 14px">
          <label
            class="sp-label"
            for="vd-name"
            data-part="label"
            data-subject
            style="
              position: absolute;
              left: 11px;
              top: ${REST.top};
              transform: translateY(-50%);
              font-size: ${REST.fontSize};
              color: var(--sp-muted);
              pointer-events: none;
              transition: top 0.18s var(--sp-ease), font-size 0.18s var(--sp-ease);
            "
          >Full name</label>
          <input
            class="sp-input sp-context"
            id="vd-name"
            data-part="input"
            type="text"
            autocomplete="off"
            spellcheck="false"
            style="height: 52px; padding: 22px 11px 6px"
          />
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 14px">
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="clear" type="button">Clear</button>
          <span class="sp-text">Party of two, 7pm</span>
        </div>
      </div>
    </div>
  `;

  const input = part(root, 'input') as HTMLInputElement;
  const label = part(root, 'label');

  let focused = false;

  /** Derived from the field, never flipped: focus or content puts the label up. */
  const settle = () => {
    const up = focused || input.value !== '';
    label.style.top = up ? FLOATED.top : REST.top;
    label.style.fontSize = up ? FLOATED.fontSize : REST.fontSize;
    flag(label, 'data-floated', up);
  };

  input.addEventListener('input', settle);
  input.addEventListener('focus', () => {
    focused = true;
    settle();
  });
  input.addEventListener('blur', () => {
    focused = false;
    settle();
  });
  part(root, 'clear').addEventListener('click', () => {
    input.value = '';
    settle();
  });
}
