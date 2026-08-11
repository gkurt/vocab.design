import { flag, part } from '#src/kit/parts.ts';

const CELLS = 4;
const WAITING = 'Enter the code to continue';
const COMPLETE = 'Code complete';

/**
 * PIN input specimen: four boxes over one value. Whatever a box is handed is
 * spread along the row from that box onward, which is the same code path that
 * serves a keystroke, an autofilled code, and a pasted one.
 *
 * The subject is the row of boxes rather than any single box: one cell is a
 * character, and the term names the group that reads as one field.
 */
export function mount(root: HTMLElement): void {
  const boxes = Array.from(
    { length: CELLS },
    (_, i) => `
      <input
        class="sp-input"
        data-part="cell-${i + 1}"
        type="text"
        inputmode="numeric"
        autocomplete="${i === 0 ? 'one-time-code' : 'off'}"
        aria-label="Digit ${i + 1} of ${CELLS}"
        style="width: 46px; height: 52px; padding: 0; text-align: center; font-size: 20px; font-variant-numeric: tabular-nums"
      />`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-heading sp-context">Confirm it is you</div>
        <p class="sp-text sp-context" style="margin: 6px 0 0">We sent a 4 digit code to ada@example.com</p>
        <div
          class="sp-row"
          data-part="group"
          data-subject
          role="group"
          aria-label="Verification code"
          style="margin-top: 14px; justify-content: space-between"
        >${boxes}</div>
        <div data-part="status-slot" style="margin-top: 12px">
          <span class="sp-text sp-context" data-part="status" data-state="waiting" role="status">${WAITING}</span>
        </div>
      </div>
    </div>
  `;

  const cells = Array.from({ length: CELLS }, (_, i) => part(root, `cell-${i + 1}`) as HTMLInputElement);
  const status = part(root, 'status');
  const slot = part(root, 'status-slot');

  // Measured once (SPEC §5): the status line swaps text under a fixed row, so the
  // longer message cannot push the window taller mid-entry.
  let reserved = 0;
  for (const text of [WAITING, COMPLETE]) {
    status.textContent = text;
    reserved = Math.max(reserved, slot.offsetHeight);
  }
  status.textContent = WAITING;
  slot.style.height = `${reserved}px`;

  const paint = (active: number) => {
    cells.forEach((cell, i) => {
      flag(cell, 'data-filled', cell.value !== '');
      flag(cell, 'data-active', i === active);
      cell.style.borderColor = i === active ? 'var(--sp-accent)' : '';
    });
    const filled = cells.every((cell) => cell.value !== '');
    status.textContent = filled ? COMPLETE : WAITING;
    status.dataset.state = filled ? 'complete' : 'waiting';
  };

  const firstEmpty = () => {
    const index = cells.findIndex((cell) => cell.value === '');
    return index === -1 ? CELLS - 1 : index;
  };

  // One value, four views. The code lives here as a single string and the boxes
  // only display it, so a keystroke, a pasted code, and an autofilled one all
  // travel the same path: extract what arrived, append it, lay it out again.
  let code = '';

  const lay = () => {
    cells.forEach((cell, i) => {
      cell.value = code[i] ?? '';
    });
    paint(firstEmpty());
  };

  cells.forEach((cell, index) => {
    cell.addEventListener('input', (event) => {
      // What this box shows beyond the digit it was drawn with is what was inserted.
      const digits = cell.value.replace(/\D/g, '');
      const drawn = code[index] ?? '';
      const inserted = drawn && digits.startsWith(drawn) ? digits.slice(drawn.length) : digits;
      code = (code + inserted).slice(0, CELLS);
      lay();
      // Real typing keeps the caret with the row; synthesized typing must not move
      // the page's focus, so the pass is driven by the value alone (SPEC §7).
      if (event.isTrusted) cells[firstEmpty()]?.focus();
    });

    cell.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace') {
        event.preventDefault();
        const at = cell.value !== '' ? index : index - 1;
        if (at < 0) return;
        code = code.slice(0, at) + code.slice(at + 1);
        lay();
        if (event.isTrusted) cells[at]?.focus();
        return;
      }
      const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (step === 0) return;
      event.preventDefault();
      const target = Math.min(Math.max(index + step, 0), CELLS - 1);
      paint(target);
      if (event.isTrusted) cells[target]?.focus();
    });

    cell.addEventListener('pointerdown', () => paint(index));
  });

  paint(0);
}
