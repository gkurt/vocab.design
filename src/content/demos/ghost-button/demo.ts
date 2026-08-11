import { flag, part } from '#src/kit/parts.ts';

const LABEL = 'Add to shelf';

const PRESSED = {
  none: 'Nothing pressed yet',
  filled: 'Filled button pressed',
  outlined: 'Outlined button pressed',
  ghost: 'Ghost button pressed',
} as const;

type Level = keyof typeof PRESSED;

/**
 * Ghost button specimen: one action drawn three ways, so the term reads as a rung
 * on an emphasis ladder rather than as a control of its own. The subject is the
 * ghost rendering; the filled and outlined ones are the scale it is measured
 * against, which is scenery.
 *
 * Its hover fill is applied here rather than by the kit, because the appearing
 * background is the term: with no pointer on it the button is a label in a box,
 * and the wash is the moment it admits to being a control.
 *
 * The status line reports which rung was pressed, which is the demonstration that
 * all three do the same thing. Its height is reserved at mount (SPEC §5) so the
 * report cannot walk the ladder up the window.
 */
export function mount(root: HTMLElement): void {
  const rung = (level: Exclude<Level, 'none'>, name: string, modifier: string, subject = false) => `
    <div class="sp-row sp-row--between${subject ? '' : ' sp-context'}">
      <span class="sp-label sp-context">${name}</span>
      <button
        class="sp-button ${modifier} sp-button--sm"
        type="button"
        data-part="${level}"
        ${subject ? 'data-subject' : ''}
        style="border: 1px solid transparent"
      >${LABEL}</button>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-context">
          <div class="sp-heading">Emphasis</div>
          <div class="sp-text" style="margin-top: 4px">One action, three levels of emphasis.</div>
        </div>
        <div class="sp-stack" style="margin-top: 14px; gap: 8px">
          ${rung('filled', 'Filled', '')}
          ${rung('outlined', 'Outlined', 'sp-button--ghost')}
          ${rung('ghost', 'Ghost', 'sp-button--quiet', true)}
        </div>
        <div class="sp-divider" style="margin: 14px 0 10px"></div>
        <div class="sp-context" data-part="status-slot">
          <span class="sp-text" data-part="status" data-pressed="none" role="status">${PRESSED.none}</span>
        </div>
      </div>
    </div>
  `;

  const slot = part(root, 'status-slot');
  const status = part(root, 'status');

  let height = 0;
  for (const text of Object.values(PRESSED)) {
    status.textContent = text;
    height = Math.max(height, slot.offsetHeight);
  }
  status.textContent = PRESSED.none;
  slot.style.height = `${height}px`;

  const ghost = part(root, 'ghost');
  // The wash the term is named for the absence of. Hover is real input the player
  // carries with the ghost cursor, so a scripted pass sees the same state a reader does.
  ghost.addEventListener('pointerenter', () => {
    flag(ghost, 'data-hover', true);
    ghost.style.background = 'var(--sp-sunken)';
  });
  ghost.addEventListener('pointerleave', () => {
    flag(ghost, 'data-hover', false);
    ghost.style.background = '';
  });

  // Every rung answers, and each press lands on its own state rather than flipping
  // one: the three are the same action, and that is the point of the row (SPEC §8).
  for (const level of ['filled', 'outlined', 'ghost'] as Exclude<Level, 'none'>[]) {
    part(root, level).addEventListener('click', () => {
      status.dataset.pressed = level;
      status.textContent = PRESSED[level];
    });
  }
}
