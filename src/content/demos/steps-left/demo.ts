import { flag, part } from '#src/kit/parts.ts';

const STEPS = [
  { title: 'Your details', hint: 'Name and email' },
  { title: 'Delivery address', hint: 'Where it goes' },
  { title: 'Payment', hint: 'Card or transfer' },
  { title: 'Review', hint: 'Check and confirm' },
];

/** The reader arrives mid flow, which is where the count has something to say. */
const START = 2;

const FILL = {
  done: 'var(--sp-accent)',
  current: 'var(--sp-accent-soft)',
  todo: 'var(--sp-sunken)',
} as const;

/**
 * Steps left specimen: a checkout that states its own length, so the end of the task
 * is visible from inside it. The subject is the indicator block (the readout, the
 * remainder, and the segmented bar), not the form it sits above: the term names the
 * disclosure of remaining effort, and the fields underneath are only what the effort
 * is spent on. Topbar, form, and footer controls are scenery (SPEC §5).
 *
 * The count changes in both directions and the readout is written in words as well as
 * in fill, so the remainder never depends on colour alone. Readout, remainder line,
 * and form body all keep their box across every step, so advancing moves nothing that
 * did not change (SPEC §5).
 *
 * A caption under the frame once read "The flow says how long it is, and keeps saying it."
 * No checkout prints a note about its own indicator, and the readout restating itself at
 * every stop is the whole demonstration, so it went.
 */
export function mount(root: HTMLElement): void {
  const segments = STEPS.map(
    (_, index) => `
      <span
        data-part="seg-${index + 1}"
        data-state="todo"
        style="flex: 1 1 0; height: 6px; border-radius: 999px; background: ${FILL.todo}; transition: background-color 0.2s var(--sp-ease)"
      ></span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Checkout</span><span class="sp-label">Wilder &amp; Co</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div
            class="sp-surface"
            data-part="meter"
            data-subject
            data-step="${START}"
            role="group"
            aria-label="Progress through checkout"
            style="padding: 10px 12px"
          >
            <div class="sp-row sp-row--between">
              <span class="sp-heading" data-part="readout" style="font-size: 13px">Step ${START} of ${STEPS.length}</span>
              <span class="sp-text" data-part="left" data-remaining="${STEPS.length - START}" style="font-size: 12px"></span>
            </div>
            <div class="sp-row" style="gap: 4px; margin-top: 9px">${segments}</div>
          </div>
          <div class="sp-stack sp-context sp-grow" data-part="form" style="justify-content: center; gap: 10px">
            <span class="sp-heading" data-part="form-title" style="font-size: 13px"></span>
            <span class="sp-label" data-part="form-hint"></span>
            <div class="sp-line" style="width: 82%"></div>
            <div class="sp-line" style="width: 61%"></div>
          </div>
          <div class="sp-row sp-row--between sp-context">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="back">Back</button>
            <button class="sp-button sp-button--sm" type="button" data-part="continue">Continue</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const meter = part(root, 'meter');
  const readout = part(root, 'readout');
  const left = part(root, 'left');
  const title = part(root, 'form-title');
  const hint = part(root, 'form-hint');
  const back = part(root, 'back');
  const forward = part(root, 'continue');

  let index = START;

  const draw = () => {
    const remaining = STEPS.length - index;
    meter.dataset.step = String(index);
    readout.textContent = `Step ${index} of ${STEPS.length}`;
    left.dataset.remaining = String(remaining);
    left.textContent = remaining === 0 ? 'Last step' : `${remaining} step${remaining === 1 ? '' : 's'} left`;
    for (const [position, step] of STEPS.entries()) {
      const seg = part(root, `seg-${position + 1}`);
      const state = position + 1 < index ? 'done' : position + 1 === index ? 'current' : 'todo';
      seg.dataset.state = state;
      seg.style.background = FILL[state];
      seg.style.boxShadow = state === 'current' ? 'inset 0 0 0 1px var(--sp-accent)' : '';
      if (position + 1 !== index) continue;
      title.textContent = step.title;
      hint.textContent = step.hint;
    }
    back.setAttribute('aria-disabled', String(index === 1));
    forward.textContent = index === STEPS.length ? 'Place order' : 'Continue';
    flag(meter, 'data-last', index === STEPS.length);
  };

  forward.addEventListener('click', () => {
    if (index === STEPS.length) return;
    index += 1;
    draw();
  });

  back.addEventListener('click', () => {
    if (index === 1) return;
    index -= 1;
    draw();
  });

  draw();
}
