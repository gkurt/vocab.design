import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/**
 * Chip specimen: compact, self-contained values sitting in a filter bar. Two
 * behaviours make the term: a chip can be toggled, and a chip can be taken off
 * the board entirely.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 210px">
        <div class="sp-topbar sp-context">
          <span class="sp-row sp-grow" style="gap: 6px">${icon('search')}<span class="sp-text">Search issues</span></span>
        </div>
        <div class="sp-body">
          <div class="sp-row sp-row--wrap">
            <button class="sp-chip" data-part="chip-open" data-subject data-selected>Status: open</button>
            <button class="sp-chip" data-part="chip-mine">Assigned to me</button>
            <span class="sp-chip" data-part="chip-label">
              label: docs
              <button class="sp-chip-remove" data-part="chip-label-remove" aria-label="Remove label filter">✕</button>
            </span>
          </div>
          <div class="sp-stack sp-context" style="margin-top: 12px">
            <div class="sp-line" style="width: 68%"></div>
            <div class="sp-line" style="width: 84%"></div>
            <div class="sp-line" style="width: 55%"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  for (const name of ['chip-open', 'chip-mine']) {
    const chip = part(root, name);
    chip.addEventListener('click', () => flag(chip, 'data-selected', !chip.hasAttribute('data-selected')));
  }
  part(root, 'chip-label-remove').addEventListener('click', () => part(root, 'chip-label').remove());
}
