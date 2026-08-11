import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const MARKS = 5;
const LABELS = ['Not rated', '1 star', '2 stars', '3 stars', '4 stars', '5 stars'];

/**
 * Rating specimen: five stars that take a score, one press per value. The subject
 * is the row of marks itself, since that row is the control the word names: the
 * product above it and the readout beside it are the page it was collected on.
 *
 * Every press is an absolute value rather than a step, so a pass interrupted or
 * fast-forwarded reaches the same score it did last time (SPEC §8). The readout
 * holds a fixed width, so "Not rated" becoming "4 stars" moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const stars = Array.from(
    { length: MARKS },
    (_, i) => `
      <button
        class="sp-icon-button"
        type="button"
        data-part="star-${i + 1}"
        role="radio"
        aria-checked="false"
        aria-label="${LABELS[i + 1]}"
        style="width: 26px; height: 26px"
      >${icon('star')}</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-row sp-context" style="gap: 10px">
          <div class="sp-swatch" style="width: 40px; height: 40px; --sp-swatch: var(--sp-sunken)"></div>
          <div class="sp-stack" style="gap: 6px; flex: 1 1 auto">
            <span class="sp-heading">Aurora headphones</span>
            <div class="sp-line" style="width: 64%"></div>
          </div>
        </div>
        <div class="sp-divider" style="margin: 14px 0"></div>
        <span class="sp-label sp-context">How would you rate these?</span>
        <div class="sp-row sp-row--between" style="margin-top: 8px">
          <div class="sp-row" data-part="stars" data-subject role="radiogroup" aria-label="Rate these headphones" style="gap: 0">
            ${stars}
          </div>
          <span
            class="sp-text sp-context"
            data-part="readout"
            data-value="0"
            role="status"
            style="width: 76px; text-align: right"
          >Not rated</span>
        </div>
      </div>
    </div>
  `;

  const group = part(root, 'stars');
  const readout = part(root, 'readout');
  const marks = Array.from({ length: MARKS }, (_, i) => part(root, `star-${i + 1}`));

  let value = 0;
  /** What the pointer is promising, which is never the score until it is pressed. */
  let preview = 0;

  const draw = () => {
    const shown = preview || value;
    marks.forEach((mark, i) => {
      const filled = i < shown;
      flag(mark, 'data-filled', filled);
      mark.setAttribute('aria-checked', String(i + 1 === value));
      mark.style.color = filled ? 'var(--sp-accent)' : '';
      mark.querySelector('svg')?.classList.toggle('sp-icon--filled', filled);
    });
    readout.dataset.value = String(value);
    readout.textContent = LABELS[value] ?? 'Not rated';
  };

  const set = (next: number) => {
    value = next;
    draw();
  };

  marks.forEach((mark, i) => {
    mark.addEventListener('click', () => set(i + 1));
    // Bubbles, so the row hears the ghost cursor arrive on any mark.
    mark.addEventListener('pointerover', () => {
      preview = i + 1;
      draw();
    });
  });

  // A real pointer leaving takes its promise with it. Attract never sends this,
  // since a synthetic leave lands on the mark rather than on the row.
  group.addEventListener('pointerleave', () => {
    preview = 0;
    draw();
  });

  group.addEventListener('keydown', (event) => {
    const delta =
      event.key === 'ArrowRight' || event.key === 'ArrowUp' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowDown' ? -1 : 0;
    if (delta === 0) return;
    event.preventDefault();
    set(Math.min(MARKS, Math.max(0, value + delta)));
  });

  draw();
}
