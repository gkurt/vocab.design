import { flag, part } from '#src/kit/parts.ts';

const OPTIONS = [
  { id: 'standard', label: 'Standard', note: 'Three to five working days', price: 'Free' },
  { id: 'express', label: 'Express', note: 'Next working day by 6pm', price: '£4.95' },
  { id: 'collect', label: 'Collect in store', note: 'Ready from Tuesday morning', price: 'Free' },
];

/**
 * Radio group specimen: one question, three answers, exactly one of them held. The
 * subject is the GROUP rather than any one option, because a lone radio is not a
 * smaller version of this term, it is a broken one: nothing unchecks it.
 *
 * Two things the group has that a segmented control does not are visible on purpose:
 * the question above it (its group label, named through `aria-labelledby`) and the
 * single tab stop, spelled as a roving tabindex over the three options.
 *
 * A keyboard hint in the title bar ("↑ ↓ move and choose") told the reader how to drive the
 * group, and the summary line ended "One question, one answer, one tab stop." Both were the
 * site talking inside a checkout, so the hint is gone and the summary now says only what a
 * checkout would say about the choice.
 *
 * Nothing moves when the choice moves (SPEC §5): the dot inside each circle changes
 * opacity in a box that is always the same size, and the summary line below is sized
 * for its longest wording rather than for the one on screen at mount.
 */
export function mount(root: HTMLElement): void {
  const option = (o: (typeof OPTIONS)[number], i: number) => `
    <button
      class="sp-row"
      type="button"
      role="radio"
      data-part="opt-${o.id}"
      aria-checked="${i === 0}"
      tabindex="${i === 0 ? 0 : -1}"
      style="width: 100%; gap: 10px; padding: 6px 8px; border: 0; border-radius: 6px; background: transparent; font: inherit; color: inherit; text-align: left; cursor: pointer"
    >
      <span
        data-part="dot-${o.id}"
        style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 16px; height: 16px; border: 1px solid var(--sp-line); border-radius: 50%; background: var(--sp-surface)"
      ><span style="width: 8px; height: 8px; border-radius: 50%; background: var(--sp-accent); opacity: 0"></span></span>
      <span class="sp-grow" style="display: flex; flex-direction: column; gap: 1px; min-width: 0">
        <span class="sp-text sp-text--ink" style="font-size: 13px">${o.label}</span>
        <span class="sp-text" style="font-size: 12px">${o.note}</span>
      </span>
      <span class="sp-text" style="flex: 0 0 auto; font-size: 12px; white-space: nowrap">${o.price}</span>
    </button>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 298px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Checkout</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column">
          <div
            class="sp-surface"
            role="radiogroup"
            aria-labelledby="rg-legend"
            data-part="group"
            data-subject
            style="padding: 10px 10px 8px"
          >
            <span class="sp-label" id="rg-legend" data-part="legend" style="display: block; padding: 0 8px 4px">Delivery speed</span>
            <div class="sp-stack" style="gap: 2px">${OPTIONS.map(option).join('')}</div>
          </div>
          <p class="sp-text sp-context" data-part="summary" style="margin: auto 0 0 2px; font-size: 12px; white-space: nowrap">
            Chosen: Standard.
          </p>
        </div>
      </div>
    </div>
  `;

  const buttons = OPTIONS.map((o) => part(root, `opt-${o.id}`));
  const dots = OPTIONS.map((o) => part(root, `dot-${o.id}`));
  const summary = part(root, 'summary');
  const group = part(root, 'group');
  let current = 0;

  const draw = () => {
    for (const [i, button] of buttons.entries()) {
      const on = i === current;
      button.setAttribute('aria-checked', String(on));
      button.tabIndex = on ? 0 : -1;
      // Background is left to the demo's own paint here rather than to a kit hover
      // rule, because the chosen row is the one thing the group has to keep saying.
      button.style.background = on ? 'var(--sp-accent-soft)' : 'transparent';
      const ring = dots[i];
      if (!ring) continue;
      ring.style.borderColor = on ? 'var(--sp-accent)' : 'var(--sp-line)';
      const fill = ring.firstElementChild;
      if (fill instanceof HTMLElement) fill.style.opacity = on ? '1' : '0';
      flag(button, 'data-selected', on);
    }
    summary.textContent = `Chosen: ${OPTIONS[current]?.label}.`;
  };

  const move = (delta: number, real: boolean) => {
    current = (current + delta + OPTIONS.length) % OPTIONS.length;
    draw();
    // Attract never moves real focus (SPEC §7); a real reader's focus rides the
    // roving tabindex the way the platform convention says it should.
    if (real) buttons[current]?.focus({ preventScroll: true });
  };

  group.addEventListener('keydown', (event) => {
    const forward = event.key === 'ArrowDown' || event.key === 'ArrowRight';
    const back = event.key === 'ArrowUp' || event.key === 'ArrowLeft';
    if (!forward && !back) return;
    event.preventDefault();
    // Arrows choose as they move: inside a radio group selection follows focus by
    // platform convention, not by preference.
    move(forward ? 1 : -1, event.isTrusted);
  });

  for (const [i, button] of buttons.entries()) {
    button.addEventListener('click', () => {
      current = i;
      draw();
    });
  }

  draw();
}
